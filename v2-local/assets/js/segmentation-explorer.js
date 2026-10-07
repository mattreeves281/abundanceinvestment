(function () {
  var root = document.querySelector("[data-segmentation-explorer]");
  if (!root) return;

  var state = {
    metric: "people",
    filters: {},
    activeSegmentFilters: {},
    activeSegmentId: "",
    selectedNode: null
  };

  var config = {
    universe: { label: "Universe", all: "All universes" },
    local_source: { label: "Local source", all: "All sources" },
    holding_type: { label: "Holding type", all: "All holding types" },
    amount_band: { label: "Avg per council", all: "All avg per council bands" },
    imd_group: { label: "IMD", all: "All IMD groups" },
    depth_band: { label: "Council depth", all: "All council depths" },
    invested_6m: { label: "Investment recency", all: "All investment recency" },
    deposited_6m: { label: "Deposit recency", all: "All deposit recency" }
  };

  var flowLabels = {
    universe: "Universe",
    local_source: "Source",
    holding_type: "Holding",
    amount_band: "Avg per council",
    imd_group: "IMD",
    depth_band: "Depth",
    invested_6m: "Invested",
    deposited_6m: "Deposited"
  };

  var data = null;

  fetch("/assets/data/segmentation-explorer.json")
    .then(function (response) {
      if (!response.ok) throw new Error("Could not load segmentation data.");
      return response.json();
    })
    .then(function (payload) {
      data = payload;
      render();
    })
    .catch(function (error) {
      root.innerHTML = '<section class="seg-panel"><p class="seg-subtitle">' + escapeHtml(error.message) + "</p></section>";
    });

  root.addEventListener("change", function (event) {
    var select = event.target.closest("[data-filter]");
    if (!select) return;
    var key = select.getAttribute("data-filter");
    state.filters[key] = select.value;
    state.selectedNode = null;
    render();
  });

  root.addEventListener("click", function (event) {
    var metric = event.target.closest("[data-metric]");
    if (metric) {
      state.metric = metric.getAttribute("data-metric");
      render();
      return;
    }

    if (event.target.closest("[data-reset]")) {
      state.filters = {};
      state.activeSegmentFilters = {};
      state.activeSegmentId = "";
      state.selectedNode = null;
      render();
      return;
    }

    var segment = event.target.closest("[data-action-segment]");
    if (segment) {
      var id = segment.getAttribute("data-action-segment");
      var item = data.actionSegments.find(function (candidate) { return candidate.id === id; });
      if (!item) return;
      state.filters = {};
      state.activeSegmentFilters = Object.assign({}, item.filters);
      state.activeSegmentId = id;
      state.selectedNode = null;
      render();
      return;
    }

    var node = event.target.closest("[data-node-key]");
    if (node) {
      var key = node.getAttribute("data-node-key");
      var value = node.getAttribute("data-node-value");
      state.filters[key] = state.filters[key] === value ? "" : value;
      state.selectedNode = state.filters[key] ? { key: key, value: value } : null;
      render();
    }
  });

  function render() {
    if (!data) return;
    var filtered = filteredRecords();
    var totals = summarise(filtered);
    var overallTotals = summarise(data.records || []);

    renderControls();
    renderKpis(overallTotals);
    renderBigBucketSummary();
    renderActionSegments();
    renderActionSegmentSummary();
    renderSegmentDefinition();
    renderFlow(filtered);
    renderDetail(filtered, totals);
    renderTable(filtered);
  }

  function filteredRecords() {
    return (data.records || []).filter(function (record) {
      if (!matchesFilters(record, state.activeSegmentFilters)) return false;
      return Object.keys(config).every(function (key) {
        var value = state.filters[key];
        return !value || record[key] === value;
      });
    });
  }

  function renderControls() {
    var controls = root.querySelector("[data-controls]");
    if (!controls) {
      root.querySelectorAll("[data-metric]").forEach(function (button) {
        button.classList.toggle("is-active", button.getAttribute("data-metric") === state.metric);
      });
      return;
    }
    controls.innerHTML = Object.keys(config).map(function (key) {
      var values = uniqueValues(key);
      var segmentValue = state.activeSegmentFilters[key];
      return [
        '<div class="seg-field">',
        '<label for="seg-', key, '">', escapeHtml(config[key].label), '</label>',
        '<select class="seg-select" id="seg-', key, '" data-filter="', key, '">',
        '<option value="">', escapeHtml(config[key].all), '</option>',
        values.map(function (value) {
          return '<option value="' + escapeAttribute(value) + '"' + (state.filters[key] === value ? " selected" : "") + ">" + escapeHtml(value) + "</option>";
        }).join(""),
        "</select>",
        segmentValue ? '<p class="seg-lock">Segment: ' + escapeHtml(filterValueLabel(segmentValue)) + '</p>' : '',
        "</div>"
      ].join("");
    }).join("");

    root.querySelectorAll("[data-metric]").forEach(function (button) {
      button.classList.toggle("is-active", button.getAttribute("data-metric") === state.metric);
    });
  }

  function renderKpis(totals) {
    root.querySelector("[data-kpis]").innerHTML = [
      stat("People", number(totals.people)),
      stat("Lifetime sales", money(totals.total_lifetime_sales)),
      stat("Average portfolio", money(totals.avgPortfolio)),
      stat("Average councils", decimal(totals.avgCouncils)),
      stat("3+ councils", countAndPct(totals.people_3plus_councils, totals.people)),
      stat("Invested 6m", countAndPct(totals.invested_past_6m, totals.people)),
      stat("Deposited 6m", countAndPct(totals.deposited_past_6m, totals.people)),
      stat("Cells", number(totals.cells))
    ].join("");
  }

  function renderActionSegments() {
    var wrap = root.querySelector("[data-action-segments]");
    wrap.innerHTML = (data.actionSegments || []).map(function (segment) {
      var records = data.records.filter(function (record) {
        return matchesFilters(record, segment.filters || {});
      });
      var totals = summarise(records);
      return [
        '<button class="seg-segment', state.activeSegmentId === segment.id ? " is-active" : "", '" type="button" data-action-segment="', escapeAttribute(segment.id), '">',
        '<h3>', escapeHtml(segment.name), '</h3>',
        '<p>', number(totals.people), ' people · ', money(totals.total_lifetime_sales), '</p>',
        '</button>'
      ].join("");
    }).join("");
  }

  function renderBigBucketSummary() {
    var table = root.querySelector("[data-big-bucket-summary]");
    var buckets = [
      { section: "Universe", name: "Local", filters: { universe: "Local" } },
      { section: "Universe", name: "Category", filters: { universe: "Category" } },
      { section: "Local source", name: "Local / New", filters: { universe: "Local", local_source: "New" } },
      { section: "Local source", name: "Local / Legacy", filters: { universe: "Local", local_source: "Legacy" } },
      { section: "Category holding", name: "Category / Council only", filters: { universe: "Category", holding_type: "Council only" } },
      { section: "Category holding", name: "Category / Company + council", filters: { universe: "Category", holding_type: "Company + council" } },
      { section: "Council depth", name: "1-2 councils", filters: { depth_band: "1-2 councils" } },
      { section: "Council depth", name: "3+ councils", filters: { depth_band: "3+ councils" } },
      { section: "Local IMD", name: "Local / IMD 1-5", filters: { universe: "Local", imd_group: "IMD 1-5" } },
      { section: "Local IMD", name: "Local / IMD 6-10", filters: { universe: "Local", imd_group: "IMD 6-10" } },
      { section: "Avg per council", name: "Local / <£250", filters: { universe: "Local", amount_band: "<£250" } },
      { section: "Avg per council", name: "Local / £250+", filters: { universe: "Local", amount_band: "£250+" } },
      { section: "Avg per council", name: "Category / <£250", filters: { universe: "Category", amount_band: "<£250" } },
      { section: "Avg per council", name: "Category / £250+", filters: { universe: "Category", amount_band: "£250+" } }
    ];

    table.innerHTML = [
      '<thead><tr>',
      '<th>Group</th>',
      '<th>Bucket</th>',
      '<th data-align="right">People</th>',
      '<th data-align="right"><£250</th>',
      '<th data-align="right">£250+</th>',
      '<th data-align="right">Sales</th>',
      '<th data-align="right">Avg portfolio</th>',
      '<th data-align="right">Avg councils</th>',
      '<th data-align="right">3+ councils</th>',
      '<th data-align="right">Invested 6m</th>',
      '<th data-align="right">Deposited 6m</th>',
      '</tr></thead>',
      '<tbody>',
      buckets.map(function (bucket) {
        var records = data.records.filter(function (record) {
          return matchesFilters(record, bucket.filters);
        });
        var totals = summarise(records);
        var isAmountBucket = Boolean(bucket.filters.amount_band);
        var under250 = isAmountBucket ? "" : amountBandPct(bucket.filters, "<£250", totals.people);
        var over250 = isAmountBucket ? "" : amountBandPct(bucket.filters, "£250+", totals.people);
        return [
          '<tr>',
          '<td>', escapeHtml(bucket.section), '</td>',
          '<td>', escapeHtml(bucket.name), '</td>',
          '<td data-align="right">', number(totals.people), '</td>',
          '<td data-align="right">', isAmountBucket ? '<span class="seg-muted">—</span>' : escapeHtml(under250), '</td>',
          '<td data-align="right">', isAmountBucket ? '<span class="seg-muted">—</span>' : escapeHtml(over250), '</td>',
          '<td data-align="right">', money(totals.total_lifetime_sales), '</td>',
          '<td data-align="right">', money(totals.avgPortfolio), '</td>',
          '<td data-align="right">', decimal(totals.avgCouncils), '</td>',
          '<td data-align="right">', countAndPct(totals.people_3plus_councils, totals.people), '</td>',
          '<td data-align="right">', countAndPct(totals.invested_past_6m, totals.people), '</td>',
          '<td data-align="right">', countAndPct(totals.deposited_past_6m, totals.people), '</td>',
          '</tr>'
        ].join("");
      }).join(""),
      '</tbody>'
    ].join("");
  }

  function amountBandPct(filters, amountBand, totalPeople) {
    var amountFilters = Object.assign({}, filters, { amount_band: amountBand });
    var records = data.records.filter(function (record) {
      return matchesFilters(record, amountFilters);
    });
    var people = summarise(records).people;
    var pct = totalPeople ? (people / totalPeople) * 100 : 0;
    return pct.toLocaleString("en-GB", { maximumFractionDigits: 1 }) + "%";
  }

  function renderActionSegmentSummary() {
    var table = root.querySelector("[data-action-segment-summary]");
    table.innerHTML = [
      '<thead><tr>',
      '<th>Action segment</th>',
      '<th>Definition</th>',
      '<th data-align="right">People</th>',
      '<th data-align="right">Sales</th>',
      '<th data-align="right">Avg portfolio</th>',
      '<th data-align="right">Avg councils</th>',
      '<th data-align="right">3+ councils</th>',
      '<th data-align="right">Invested 6m</th>',
      '<th data-align="right">Deposited 6m</th>',
      '</tr></thead>',
      '<tbody>',
      (data.actionSegments || []).map(function (segment) {
        var records = data.records.filter(function (record) {
          return matchesFilters(record, segment.filters || {});
        });
        var totals = summarise(records);
        return [
          '<tr>',
          '<td>', escapeHtml(segment.name), '</td>',
          '<td>', escapeHtml(formatFilterDefinition(segment.filters || {})), '</td>',
          '<td data-align="right">', number(totals.people), '</td>',
          '<td data-align="right">', money(totals.total_lifetime_sales), '</td>',
          '<td data-align="right">', money(totals.avgPortfolio), '</td>',
          '<td data-align="right">', decimal(totals.avgCouncils), '</td>',
          '<td data-align="right">', countAndPct(totals.people_3plus_councils, totals.people), '</td>',
          '<td data-align="right">', countAndPct(totals.invested_past_6m, totals.people), '</td>',
          '<td data-align="right">', countAndPct(totals.deposited_past_6m, totals.people), '</td>',
          '</tr>'
        ].join("");
      }).join(""),
      '</tbody>'
    ].join("");
  }

  function renderSegmentDefinition() {
    var wrap = root.querySelector("[data-segment-definition]");
    var activeSegment = data.actionSegments.find(function (segment) { return segment.id === state.activeSegmentId; });
    if (!activeSegment) {
      wrap.classList.remove("is-visible");
      wrap.innerHTML = "";
      return;
    }

    var filters = activeSegment.filters || {};
    wrap.classList.add("is-visible");
    wrap.innerHTML = [
      '<div class="seg-definition__top">',
      '<h3>', escapeHtml(activeSegment.name), '</h3>',
      '<p>Named segment definition</p>',
      '</div>',
      '<div class="seg-chips">',
      Object.keys(filters).map(function (key) {
        var label = (config[key] && config[key].label) || flowLabels[key] || key;
        return [
          '<div class="seg-chip">',
          '<span>', escapeHtml(label), '</span>',
          escapeHtml(filterValueLabel(filters[key])),
          '</div>'
        ].join("");
      }).join(""),
      '</div>'
    ].join("");
  }

  function renderFlow(records) {
    var keys = flowKeys(records);
    var maxMetric = Math.max.apply(null, keys.map(function (key) {
      return sumByValue(records, key).reduce(function (max, item) {
        return Math.max(max, metricValue(item));
      }, 0);
    }).concat([1]));

    root.querySelector("[data-flow]").innerHTML = [
      '<div class="seg-flow__inner">',
      keys.map(function (key) {
        var rows = sumByValue(records, key).sort(function (a, b) {
          return metricValue(b) - metricValue(a);
        });
        return [
          '<div class="seg-flow-col">',
          '<h3>', escapeHtml(flowLabels[key] || key), '</h3>',
          rows.map(function (row) {
            var active = state.filters[key] === row.value;
            var width = maxMetric ? (metricValue(row) / maxMetric) * 100 : 0;
            return [
              '<button class="seg-node', active ? " is-active" : "", '" type="button" data-node-key="', key, '" data-node-value="', escapeAttribute(row.value), '">',
              '<span class="seg-node__top"><span>', escapeHtml(row.value), '</span><span>', formatMetric(row), '</span></span>',
              '<span class="seg-node__meta">', number(row.people), ' people · ', money(row.total_lifetime_sales), '</span>',
              '<span class="seg-bar"><span style="--seg-width:', width.toFixed(2), '%"></span></span>',
              '</button>'
            ].join("");
          }).join(""),
          '</div>'
        ].join("");
      }).join(""),
      '</div>'
    ].join("");
  }

  function renderDetail(records, totals) {
    var activeSegment = data.actionSegments.find(function (segment) { return segment.id === state.activeSegmentId; });
    var title = activeSegment ? activeSegment.name : "Current selection";
    var description = activeSegment
      ? activeSegment.description
      : "The selected filters define this cell group. Use the flow nodes or selectors to narrow the segment.";
    var strategy = activeSegment ? activeSegment.strategy : "";
    var definition = activeSegment ? formatFilterDefinition(activeSegment.filters || {}) : "";

    root.querySelector("[data-detail]").innerHTML = [
      '<h3>', escapeHtml(title), '</h3>',
      '<p>', escapeHtml(description), '</p>',
      strategy ? '<p>' + escapeHtml(strategy) + '</p>' : '',
      definition ? '<p><strong>Definition:</strong> ' + escapeHtml(definition) + '</p>' : '',
      '<div class="seg-mini-grid">',
      mini("People", number(totals.people)),
      mini("Sales", money(totals.total_lifetime_sales)),
      mini("Average", money(totals.avgPortfolio)),
      mini("3+ councils", countAndPct(totals.people_3plus_councils, totals.people)),
      mini("Invested 6m", countAndPct(totals.invested_past_6m, totals.people)),
      mini("Deposited 6m", countAndPct(totals.deposited_past_6m, totals.people)),
      '</div>'
    ].join("");
  }

  function renderTable(records) {
    var rows = records.slice().sort(function (a, b) {
      return b.people - a.people || b.total_lifetime_sales - a.total_lifetime_sales;
    });
    root.querySelector("[data-table]").innerHTML = [
      '<thead><tr>',
      '<th>Universe</th>',
      '<th>Source / holding</th>',
      '<th>Avg per council</th>',
      '<th>IMD</th>',
      '<th>Depth</th>',
      '<th>Activity</th>',
      '<th data-align="right">People</th>',
      '<th data-align="right">Sales</th>',
      '<th data-align="right">Avg portfolio</th>',
      '<th data-align="right">Avg councils</th>',
      '</tr></thead>',
      '<tbody>',
      rows.map(function (row) {
        return [
          '<tr>',
          '<td>', escapeHtml(row.universe), '</td>',
          '<td>', escapeHtml(row.universe === "Local" ? row.local_source : row.holding_type), '</td>',
          '<td>', escapeHtml(row.amount_band), '</td>',
          '<td>', escapeHtml(row.imd_group), '</td>',
          '<td>', escapeHtml(row.depth_band), '</td>',
          '<td>', escapeHtml(row.invested_6m), ' · ', escapeHtml(row.deposited_6m), '</td>',
          '<td data-align="right">', number(row.people), '</td>',
          '<td data-align="right">', money(row.total_lifetime_sales), '</td>',
          '<td data-align="right">', money(Number(row.total_lifetime_sales || 0) / Math.max(Number(row.people || 0), 1)), '</td>',
          '<td data-align="right">', decimal(Number(row.councils_total || 0) / Math.max(Number(row.people || 0), 1)), '</td>',
          '</tr>'
        ].join("");
      }).join(""),
      '</tbody>'
    ].join("");
  }

  function flowKeys(records) {
    var universe = state.filters.universe;
    if (!universe) {
      var universes = unique(records.map(function (record) { return record.universe; }));
      if (universes.length === 1) universe = universes[0];
    }

    if (universe === "Local") {
      return ["universe", "local_source", "amount_band", "imd_group", "depth_band", "invested_6m", "deposited_6m"];
    }

    if (universe === "Category") {
      return ["universe", "holding_type", "amount_band", "depth_band", "invested_6m", "deposited_6m"];
    }

    return ["universe", "amount_band", "depth_band", "invested_6m", "deposited_6m"];
  }

  function sumByValue(records, key) {
    var map = {};
    records.forEach(function (record) {
      var value = record[key] || "Not available";
      if (!map[value]) {
        map[value] = emptySummary();
        map[value].value = value;
      }
      addRecord(map[value], record);
    });
    return Object.keys(map).map(function (key) { return finaliseSummary(map[key]); });
  }

  function summarise(records) {
    var summary = emptySummary();
    records.forEach(function (record) { addRecord(summary, record); });
    return finaliseSummary(summary);
  }

  function emptySummary() {
    return {
      people: 0,
      total_lifetime_sales: 0,
      councils_total: 0,
      people_3plus_councils: 0,
      invested_past_6m: 0,
      deposited_past_6m: 0,
      cells: 0
    };
  }

  function addRecord(summary, record) {
    summary.people += Number(record.people || 0);
    summary.total_lifetime_sales += Number(record.total_lifetime_sales || 0);
    summary.councils_total += Number(record.councils_total || 0);
    summary.people_3plus_councils += Number(record.people_3plus_councils || 0);
    summary.invested_past_6m += Number(record.invested_past_6m || 0);
    summary.deposited_past_6m += Number(record.deposited_past_6m || 0);
    summary.cells += 1;
  }

  function finaliseSummary(summary) {
    summary.avgPortfolio = summary.people ? summary.total_lifetime_sales / summary.people : 0;
    summary.avgCouncils = summary.people ? summary.councils_total / summary.people : 0;
    return summary;
  }

  function metricValue(summary) {
    return state.metric === "total_lifetime_sales" ? Number(summary.total_lifetime_sales || 0) : Number(summary.people || 0);
  }

  function formatMetric(summary) {
    return state.metric === "total_lifetime_sales" ? money(summary.total_lifetime_sales) : number(summary.people);
  }

  function uniqueValues(key) {
    return unique((data.records || []).map(function (record) { return record[key]; })).filter(Boolean);
  }

  function matchesFilters(record, filters) {
    return Object.keys(filters).every(function (key) {
      var expected = filters[key];
      if (Array.isArray(expected)) return expected.indexOf(record[key]) !== -1;
      return record[key] === expected;
    });
  }

  function filterValueLabel(value) {
    if (Array.isArray(value)) return value.join(" or ");
    return String(value);
  }

  function formatFilterDefinition(filters) {
    return Object.keys(filters).map(function (key) {
      var label = (config[key] && config[key].label) || flowLabels[key] || key;
      return label + " = " + filterValueLabel(filters[key]);
    }).join("; ");
  }

  function stat(label, value) {
    return [
      '<div class="seg-card">',
      '<p class="seg-card__label">', escapeHtml(label), '</p>',
      '<p class="seg-card__value">', escapeHtml(String(value)), '</p>',
      '</div>'
    ].join("");
  }

  function mini(label, value) {
    return '<div class="seg-mini"><span>' + escapeHtml(label) + '</span><strong>' + escapeHtml(String(value)) + '</strong></div>';
  }

  function number(value) {
    return Number(value || 0).toLocaleString("en-GB", { maximumFractionDigits: 0 });
  }

  function decimal(value) {
    return Number(value || 0).toLocaleString("en-GB", { minimumFractionDigits: 1, maximumFractionDigits: 2 });
  }

  function money(value) {
    var number = Number(value || 0);
    if (Math.abs(number) >= 1000000) {
      return "£" + (number / 1000000).toLocaleString("en-GB", { maximumFractionDigits: 1 }) + "m";
    }
    if (Math.abs(number) >= 1000) {
      return "£" + (number / 1000).toLocaleString("en-GB", { maximumFractionDigits: 0 }) + "k";
    }
    return number.toLocaleString("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 });
  }

  function countAndPct(count, total) {
    var pct = total ? (Number(count || 0) / Number(total)) * 100 : 0;
    return number(count) + " / " + pct.toLocaleString("en-GB", { maximumFractionDigits: 1 }) + "%";
  }

  function unique(values) {
    return Array.from(new Set(values)).sort(function (a, b) {
      return String(a).localeCompare(String(b), "en-GB", { numeric: true });
    });
  }

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function escapeAttribute(value) {
    return escapeHtml(value).replace(/`/g, "&#096;");
  }
})();
