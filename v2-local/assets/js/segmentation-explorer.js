(function () {
  var root = document.querySelector("[data-segmentation-explorer]");
  if (!root) return;

  var state = {
    metric: "people",
    actionStackMetric: "people",
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

  var actionStackColours = ["#c1658b", "#4f7f9f", "#e0a23c", "#688f4e", "#8f6fb3", "#d66a4d", "#6d777d"];

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
    var bucketSelect = event.target.closest("[data-big-bucket-select]");
    if (bucketSelect) {
      if (bucketSelect.value === "") return;
      var bucketItem = getBigBuckets()[Number(bucketSelect.value)];
      if (!bucketItem) return;
      state.filters = Object.assign({}, bucketItem.filters);
      state.activeSegmentFilters = {};
      state.activeSegmentId = "";
      state.selectedNode = null;
      render();
      return;
    }

    var select = event.target.closest("[data-filter]");
    if (!select) return;
    var key = select.getAttribute("data-filter");
    state.filters[key] = select.value;
    state.selectedNode = null;
    render();
  });

  root.addEventListener("click", function (event) {
    var actionStackMetric = event.target.closest("[data-action-stack-metric]");
    if (actionStackMetric) {
      state.actionStackMetric = actionStackMetric.getAttribute("data-action-stack-metric");
      render();
      return;
    }

    var actionStackSegment = event.target.closest("[data-action-stack-segment]");
    if (actionStackSegment) {
      var stackSegmentId = actionStackSegment.getAttribute("data-action-stack-segment");
      var stackItem = data.actionSegments.find(function (candidate) { return candidate.id === stackSegmentId; });
      if (!stackItem) return;
      state.filters = {};
      state.activeSegmentFilters = Object.assign({}, stackItem.filters);
      state.activeSegmentId = stackSegmentId;
      state.selectedNode = null;
      render();
      return;
    }

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

    var bucket = event.target.closest("[data-big-bucket]");
    if (bucket) {
      var bucketIndex = Number(bucket.getAttribute("data-big-bucket"));
      var bucketItem = getBigBuckets()[bucketIndex];
      if (!bucketItem) return;
      state.filters = Object.assign({}, bucketItem.filters);
      state.activeSegmentFilters = {};
      state.activeSegmentId = "";
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

    renderControls();
    renderKpis(totals);
    renderBigBucketSelector();
    renderActionStack();
    renderActionSegments();
    renderActionSegmentSummary();
    renderSegmentDefinition();
    renderDetail(filtered, totals);
    renderAutoInvestStrategy();
    renderCurrentView();
    renderFlow(filtered);
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
    var base = summarise(data.records || []);
    var showComparison = !isTotalBaseSelection();
    root.querySelector("[data-kpis]").innerHTML = [
      stat("People", number(totals.people), showComparison ? relativeDelta(totals.people, base.people) + " vs base" : ""),
      stat("Lifetime sales", money(totals.total_lifetime_sales), showComparison ? relativeDelta(totals.total_lifetime_sales, base.total_lifetime_sales) + " vs base" : ""),
      stat("2026 sales", money(totals.sales_2026), showComparison ? shareOf2026(totals, base) + " of 2026 sales" : ""),
      stat("2026 sales share", shareOf2026(totals, base), showComparison ? money(totals.sales_2026) + " in 2026" : ""),
      stat("2026 sales index", sales2026Index(totals, base), "sales share / people share"),
      stat("Average portfolio", money(totals.avgPortfolio), showComparison ? relativeDelta(totals.avgPortfolio, base.avgPortfolio) + " vs base" : ""),
      stat("Average councils", decimal(totals.avgCouncils), showComparison ? relativeDelta(totals.avgCouncils, base.avgCouncils) + " vs base" : ""),
      stat("<£250 avg/council", amountBandSplitValue("<£250"), showComparison ? pointDelta(amountBandRate("<£250"), amountBandRate("<£250", {})) + " vs base" : ""),
      stat("£250+ avg/council", amountBandSplitValue("£250+"), showComparison ? pointDelta(amountBandRate("£250+"), amountBandRate("£250+", {})) + " vs base" : ""),
      stat("Invested in target council", targetCouncilValue(totals), showComparison && totals.local_people ? pointDelta(targetCouncilRate(totals), targetCouncilRate(base)) + " vs base" : ""),
      stat("3+ councils", countAndPct(totals.people_3plus_councils, totals.people), showComparison ? pointDelta(rate(totals.people_3plus_councils, totals.people), rate(base.people_3plus_councils, base.people)) + " vs base" : ""),
      stat("Invested 6m", countAndPct(totals.invested_past_6m, totals.people), showComparison ? pointDelta(rate(totals.invested_past_6m, totals.people), rate(base.invested_past_6m, base.people)) + " vs base" : ""),
      stat("Deposited 6m", countAndPct(totals.deposited_past_6m, totals.people), showComparison ? pointDelta(rate(totals.deposited_past_6m, totals.people), rate(base.deposited_past_6m, base.people)) + " vs base" : "")
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
        '<p class="seg-segment__description">', escapeHtml(segment.description || ""), '</p>',
        '<div class="seg-chips seg-segment__criteria">', filterChips(segment.filters || {}), '</div>',
        '<p>', number(totals.people), ' people · ', money(totals.total_lifetime_sales), ' · ', shareOf2026(totals), ' of 2026 sales · ', sales2026Index(totals), ' index</p>',
        '</button>'
      ].join("");
    }).join("");
  }

  function renderActionStack() {
    var wrap = root.querySelector("[data-action-stack]");
    if (!wrap) return;

    var metric = state.actionStackMetric || "people";
    var base = summarise(data.records || []);
    var baseValue = actionStackMetricValue(base, metric);
    var segments = (data.actionSegments || []).map(function (segment, index) {
      var records = data.records.filter(function (record) {
        return matchesFilters(record, segment.filters || {});
      });
      var totals = summarise(records);
      return {
        segment: segment,
        totals: totals,
        colour: actionStackColours[index % actionStackColours.length],
        value: actionStackMetricValue(totals, metric),
        share: baseValue ? actionStackMetricValue(totals, metric) / baseValue : 0
      };
    });

    wrap.innerHTML = [
      '<div class="seg-action-stack__top">',
      '<h3>Action segment proportions</h3>',
      '<div class="seg-toggle-group" aria-label="Action segment proportion metric">',
      '<span class="seg-toggle-label">Show proportions by</span>',
      actionStackToggle("people", "People"),
      actionStackToggle("total_lifetime_sales", "Lifetime sales"),
      actionStackToggle("sales_2026", "2026 sales"),
      '</div>',
      '</div>',
      '<div class="seg-action-stack__bar" role="img" aria-label="Action segment proportions">',
      segments.map(function (item) {
        var width = Math.max(item.share * 100, item.value ? 0.4 : 0);
        return [
          '<button class="seg-action-stack__slice', state.activeSegmentId === item.segment.id ? " is-active" : "", '" type="button" ',
          'style="--seg-colour:', item.colour, '; width:', width.toFixed(2), '%" ',
          'title="', escapeAttribute(item.segment.name + " - " + actionStackValueLabel(item.value, metric) + " / " + percent(item.share)), '" ',
          'aria-label="', escapeAttribute(item.segment.name + " - " + percent(item.share)), '" ',
          'data-action-stack-segment="', escapeAttribute(item.segment.id), '"></button>'
        ].join("");
      }).join(""),
      '</div>',
      '<div class="seg-action-stack__legend">',
      segments.map(function (item) {
        return [
          '<button class="', state.activeSegmentId === item.segment.id ? "is-active" : "", '" type="button" data-action-stack-segment="', escapeAttribute(item.segment.id), '">',
          '<i class="seg-action-stack__dot" style="--seg-colour:', item.colour, '" aria-hidden="true"></i>',
          '<span><strong>', escapeHtml(item.segment.name), '</strong>',
          '<span>', escapeHtml(actionStackValueLabel(item.value, metric)), ' · ', escapeHtml(percent(item.share)), '</span></span>',
          '</button>'
        ].join("");
      }).join(""),
      '</div>'
    ].join("");
  }

  function actionStackToggle(metric, label) {
    return [
      '<button class="seg-button', state.actionStackMetric === metric ? " is-active" : "", '" type="button" data-action-stack-metric="', metric, '">',
      escapeHtml(label),
      '</button>'
    ].join("");
  }

  function getBigBuckets() {
    return [
      { section: "Base", name: "Total base", filters: {} },
      { section: "Universe", name: "Local", filters: { universe: "Local" } },
      { section: "Universe", name: "Category", filters: { universe: "Category" } },
      { section: "Local source", name: "Local / New", filters: { universe: "Local", local_source: "New" } },
      { section: "Local source", name: "Local / Legacy", filters: { universe: "Local", local_source: "Legacy" } },
      { section: "Category holding", name: "Category / Council only", filters: { universe: "Category", holding_type: "Council only" } },
      { section: "Category holding", name: "Category / Company + council", filters: { universe: "Category", holding_type: "Company + council" } },
      { section: "Council depth", name: "1-2 councils", filters: { depth_band: "1-2 councils" } },
      { section: "Council depth", name: "3+ councils", filters: { depth_band: "3+ councils" } },
      { section: "Local new IMD", name: "Local / New / IMD 1-5", filters: { universe: "Local", local_source: "New", imd_group: "IMD 1-5" } },
      { section: "Local new IMD", name: "Local / New / IMD 6-10", filters: { universe: "Local", local_source: "New", imd_group: "IMD 6-10" } },
      { section: "Avg per council", name: "Local / <£250", filters: { universe: "Local", amount_band: "<£250" } },
      { section: "Avg per council", name: "Local / £250+", filters: { universe: "Local", amount_band: "£250+" } },
      { section: "Avg per council", name: "Category / <£250", filters: { universe: "Category", amount_band: "<£250" } },
      { section: "Avg per council", name: "Category / £250+", filters: { universe: "Category", amount_band: "£250+" } }
    ];
  }

  function renderBigBucketSelector() {
    var select = root.querySelector("[data-big-bucket-select]");
    if (!select) return;
    var hasMatch = getBigBuckets().some(function (bucket) {
      return matchesStateFilters(bucket.filters);
    });
    select.innerHTML = (hasMatch ? "" : '<option value="" selected>Current custom selection</option>') + getBigBuckets().map(function (bucket, index) {
        var active = matchesStateFilters(bucket.filters);
        return '<option value="' + index + '"' + (active ? " selected" : "") + ">" + escapeHtml(bucket.section + " - " + bucket.name) + "</option>";
      }).join("");
  }

  function matchesStateFilters(filters) {
    var keys = Object.keys(config);
    var hasActiveSegment = Object.keys(state.activeSegmentFilters).length > 0;
    if (hasActiveSegment) return false;
    return keys.every(function (key) {
      return (state.filters[key] || "") === (filters[key] || "");
    });
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

  function amountBandSplitValue(amountBand) {
    var baseFilters = Object.assign({}, state.activeSegmentFilters, state.filters);
    var records = data.records.filter(function (record) {
      return matchesFilters(record, baseFilters);
    });
    var totalPeople = summarise(records).people;
    var amountFilters = Object.assign({}, baseFilters, { amount_band: amountBand });
    var amountPeople = summarise(data.records.filter(function (record) {
      return matchesFilters(record, amountFilters);
    })).people;
    return countAndPct(amountPeople, totalPeople);
  }

  function amountBandRate(amountBand, filters) {
    var baseFilters = filters || Object.assign({}, state.activeSegmentFilters, state.filters);
    var records = data.records.filter(function (record) {
      return matchesFilters(record, baseFilters);
    });
    var totalPeople = summarise(records).people;
    var amountFilters = Object.assign({}, baseFilters, { amount_band: amountBand });
    var amountPeople = summarise(data.records.filter(function (record) {
      return matchesFilters(record, amountFilters);
    })).people;
    return rate(amountPeople, totalPeople);
  }

  function renderActionSegmentSummary() {
    var table = root.querySelector("[data-action-segment-summary]");
    table.innerHTML = [
      '<thead><tr>',
      '<th>Action segment</th>',
      '<th>Definition</th>',
      '<th data-align="right">People</th>',
      '<th data-align="right">Sales</th>',
      '<th data-align="right">2026 sales</th>',
      '<th data-align="right">2026 share</th>',
      '<th data-align="right">2026 index</th>',
      '<th data-align="right">Target council</th>',
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
          '<td data-align="right">', money(totals.sales_2026), '</td>',
          '<td data-align="right">', shareOf2026(totals), '</td>',
          '<td data-align="right">', sales2026Index(totals), '</td>',
          '<td data-align="right">', targetCouncilValue(totals), '</td>',
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

  function renderCurrentView() {
    var wrap = root.querySelector("[data-current-view]");
    if (!wrap) return;
    wrap.innerHTML = 'Currently viewing: <strong>' + escapeHtml(currentViewLabel()) + '</strong>';
  }

  function currentViewLabel() {
    var activeSegment = data.actionSegments.find(function (segment) { return segment.id === state.activeSegmentId; });
    var filterLabel = currentFilterDefinition();

    if (activeSegment) {
      return filterLabel ? activeSegment.name + " + " + filterLabel : activeSegment.name;
    }

    if (isTotalBaseSelection()) {
      return "Whole customer base";
    }

    var matchingBucket = getBigBuckets().find(function (bucket) {
      return matchesStateFilters(bucket.filters);
    });

    if (matchingBucket) {
      return matchingBucket.name === "Total base" ? "Whole customer base" : matchingBucket.name;
    }

    return filterLabel || "Custom selection";
  }

  function currentFilterDefinition() {
    var filters = {};
    Object.keys(config).forEach(function (key) {
      if (state.filters[key]) filters[key] = state.filters[key];
    });
    return Object.keys(filters).length ? formatFilterDefinition(filters) : "";
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
    var base = summarise(data.records || []);
    var showComparison = !isTotalBaseSelection();
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
      mini("People", number(totals.people), showComparison ? relativeDelta(totals.people, base.people) + " vs base" : ""),
      mini("Sales", money(totals.total_lifetime_sales), showComparison ? relativeDelta(totals.total_lifetime_sales, base.total_lifetime_sales) + " vs base" : ""),
      mini("2026 sales", money(totals.sales_2026), showComparison ? shareOf2026(totals, base) + " of 2026 sales" : ""),
      mini("2026 share", shareOf2026(totals, base), showComparison ? money(totals.sales_2026) + " in 2026" : ""),
      mini("2026 index", sales2026Index(totals, base), "sales share / people share"),
      mini("Average", money(totals.avgPortfolio), showComparison ? relativeDelta(totals.avgPortfolio, base.avgPortfolio) + " vs base" : ""),
      mini("Target council", targetCouncilValue(totals), showComparison && totals.local_people ? pointDelta(targetCouncilRate(totals), targetCouncilRate(base)) + " vs base" : ""),
      mini("3+ councils", countAndPct(totals.people_3plus_councils, totals.people), showComparison ? pointDelta(rate(totals.people_3plus_councils, totals.people), rate(base.people_3plus_councils, base.people)) + " vs base" : ""),
      mini("Invested 6m", countAndPct(totals.invested_past_6m, totals.people), showComparison ? pointDelta(rate(totals.invested_past_6m, totals.people), rate(base.invested_past_6m, base.people)) + " vs base" : ""),
      mini("Deposited 6m", countAndPct(totals.deposited_past_6m, totals.people), showComparison ? pointDelta(rate(totals.deposited_past_6m, totals.people), rate(base.deposited_past_6m, base.people)) + " vs base" : ""),
      '</div>'
    ].join("");
  }

  function renderAutoInvestStrategy() {
    var activeSegment = data.actionSegments.find(function (segment) { return segment.id === state.activeSegmentId; });
    var wrap = root.querySelector("[data-auto-invest]");
    if (!wrap) return;

    if (!activeSegment) {
      wrap.innerHTML = [
        '<h3>Auto-invest launch strategy</h3>',
        '<p>Select an action segment to show the proposed auto-invest benefit and launch messaging angle for that audience.</p>',
        '<div class="seg-strategy-block">',
        '<span>Benefit</span>',
        '<p>Choose a named action segment above.</p>',
        '</div>',
        '<div class="seg-strategy-block">',
        '<span>Comms strategy</span>',
        '<p>Choose a named action segment above.</p>',
        '</div>'
      ].join("");
      return;
    }

    wrap.innerHTML = [
      '<h3>Auto-invest launch strategy</h3>',
      '<p>', escapeHtml(activeSegment.name), '</p>',
      '<div class="seg-strategy-block">',
      '<span>Benefit</span>',
      '<p>', escapeHtml(activeSegment.autoInvestBenefit || "Add benefit copy in the segment JSON."), '</p>',
      '</div>',
      '<div class="seg-strategy-block">',
      '<span>Comms strategy</span>',
      '<p>', escapeHtml(activeSegment.autoInvestStrategy || "Add comms strategy copy in the segment JSON."), '</p>',
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
      '<th data-align="right">2026 share</th>',
      '<th data-align="right">2026 index</th>',
      '<th data-align="right">Target council</th>',
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
          '<td data-align="right">', shareOf2026(row), '</td>',
          '<td data-align="right">', sales2026Index(row), '</td>',
          '<td data-align="right">', targetCouncilValue(row), '</td>',
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
      sales_2026: 0,
      local_people: 0,
      councils_total: 0,
      people_3plus_councils: 0,
      people_invested_target_council: 0,
      invested_past_6m: 0,
      deposited_past_6m: 0,
      cells: 0
    };
  }

  function addRecord(summary, record) {
    summary.people += Number(record.people || 0);
    summary.total_lifetime_sales += Number(record.total_lifetime_sales || 0);
    summary.sales_2026 += Number(record.sales_2026 || 0);
    if (record.universe === "Local") {
      summary.local_people += Number(record.people || 0);
    }
    summary.councils_total += Number(record.councils_total || 0);
    summary.people_3plus_councils += Number(record.people_3plus_councils || 0);
    summary.people_invested_target_council += Number(record.people_invested_target_council || 0);
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

  function actionStackMetricValue(summary, metric) {
    return Number(summary[metric] || 0);
  }

  function actionStackValueLabel(value, metric) {
    return metric === "people" ? number(value) + " people" : money(value);
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

  function filterChips(filters) {
    return Object.keys(filters).map(function (key) {
      var label = (config[key] && config[key].label) || flowLabels[key] || key;
      return [
        '<span class="seg-chip">',
        '<span>', escapeHtml(label), '</span>',
        escapeHtml(filterValueLabel(filters[key])),
        '</span>'
      ].join("");
    }).join("");
  }

  function stat(label, value, comparison) {
    return [
      '<div class="seg-card">',
      '<p class="seg-card__label">', escapeHtml(label), '</p>',
      '<p class="seg-card__value">', escapeHtml(String(value)), '</p>',
      comparison ? '<p class="seg-card__delta">' + escapeHtml(comparison) + '</p>' : '',
      '</div>'
    ].join("");
  }

  function mini(label, value, comparison) {
    return [
      '<div class="seg-mini">',
      '<span>', escapeHtml(label), '</span>',
      '<strong>', escapeHtml(String(value)), '</strong>',
      comparison ? '<em>' + escapeHtml(comparison) + '</em>' : '',
      '</div>'
    ].join("");
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

  function shareOf2026(summary, baseSummary) {
    var base = baseSummary || summarise(data.records || []);
    return percent(rate(Number(summary.sales_2026 || 0), Number(base.sales_2026 || 0)));
  }

  function sales2026Index(summary, baseSummary) {
    var base = baseSummary || summarise(data.records || []);
    var salesShare = rate(Number(summary.sales_2026 || 0), Number(base.sales_2026 || 0));
    var peopleShare = rate(Number(summary.people || 0), Number(base.people || 0));
    if (!peopleShare) return "n/a";
    return (salesShare / peopleShare).toLocaleString("en-GB", { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + "x";
  }

  function targetCouncilValue(summary) {
    if (!Number(summary.local_people || 0)) return "n/a";
    return countAndPct(summary.people_invested_target_council, summary.local_people);
  }

  function targetCouncilRate(summary) {
    return rate(summary.people_invested_target_council, summary.local_people);
  }

  function rate(count, total) {
    return total ? Number(count || 0) / Number(total) : 0;
  }

  function percent(value) {
    return (Number(value || 0) * 100).toLocaleString("en-GB", { maximumFractionDigits: 1 }) + "%";
  }

  function relativeDelta(value, base) {
    if (!base) return "n/a";
    var pct = ((Number(value || 0) - Number(base)) / Number(base)) * 100;
    return signed(pct) + "%";
  }

  function pointDelta(value, base) {
    var points = (Number(value || 0) - Number(base || 0)) * 100;
    return signed(points) + "pts";
  }

  function signed(value) {
    var rounded = Number(value || 0).toLocaleString("en-GB", { maximumFractionDigits: 1 });
    return Number(value || 0) > 0 ? "+" + rounded : rounded;
  }

  function isTotalBaseSelection() {
    return Object.keys(state.activeSegmentFilters).length === 0 && Object.keys(config).every(function (key) {
      return !state.filters[key];
    });
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
