(function () {
  var root = document.querySelector("[data-sidecar-audit]");
  if (!root) return;

  var tokenKey = "abundance_sidecar_audit_token";
  var authPanel = root.querySelector("[data-auth-panel]");
  var lookupPanel = root.querySelector("[data-lookup-panel]");
  var authForm = root.querySelector("[data-auth-form]");
  var lookupForm = root.querySelector("[data-lookup-form]");
  var authMessage = root.querySelector("[data-auth-message]");
  var lookupMessage = root.querySelector("[data-lookup-message]");
  var results = root.querySelector("[data-results]");

  var token = sessionStorage.getItem(tokenKey) || "";
  if (token) showLookup();

  authForm.addEventListener("submit", function (event) {
    event.preventDefault();
    var password = root.querySelector("#audit-password").value;
    setBusy(authForm, true);
    authMessage.textContent = "Checking password...";
    authMessage.classList.remove("audit-message--error");

    fetch("/.netlify/functions/audit-login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ password: password })
    })
      .then(function (response) {
        if (!response.ok) throw new Error("Password not accepted");
        return response.json();
      })
      .then(function (payload) {
        token = payload.token;
        sessionStorage.setItem(tokenKey, token);
        showLookup();
      })
      .catch(function (error) {
        authMessage.textContent = error.message;
        authMessage.classList.add("audit-message--error");
      })
      .finally(function () {
        setBusy(authForm, false);
      });
  });

  lookupForm.addEventListener("submit", function (event) {
    event.preventDefault();
    var investorId = root.querySelector("#audit-investor-id").value.trim();
    if (!investorId) return;
    loadInvestor(investorId);
  });

  function showLookup() {
    authPanel.classList.add("audit-hidden");
    lookupPanel.classList.remove("audit-hidden");
  }

  function loadInvestor(investorId) {
    setBusy(lookupForm, true);
    lookupMessage.textContent = "Loading investor preview...";
    lookupMessage.classList.remove("audit-message--error");
    results.classList.add("audit-hidden");

    fetch("/.netlify/functions/audit-user?investor_id=" + encodeURIComponent(investorId), {
      headers: { authorization: "Bearer " + token }
    })
      .then(function (response) {
        if (response.status === 401) {
          sessionStorage.removeItem(tokenKey);
          throw new Error("Session expired. Refresh the page and unlock again.");
        }
        return response.json().then(function (payload) {
          if (!response.ok) {
            throw new Error(payload.message || payload.error || "Could not load this investor.");
          }
          return payload;
        });
      })
      .then(function (payload) {
        renderResults(payload);
        lookupMessage.textContent = payload.found
          ? "Preview loaded."
          : "No matching sidecar preview rows found for this investor.";
      })
      .catch(function (error) {
        lookupMessage.textContent = error.message;
        lookupMessage.classList.add("audit-message--error");
      })
      .finally(function () {
        setBusy(lookupForm, false);
      });
  }

  function renderResults(payload) {
    var holdings = payload.holdings || {};
    var impact = payload.impact || {};
    var demographics = payload.demographics || {};

    results.innerHTML = [
      payload.found ? "" : renderNotFound(payload),
      renderSummary(payload, holdings, impact, demographics),
      renderCouncilTiles(payload.councils || []),
      renderHoldings(holdings),
      renderImpact(impact),
      renderDemographics(demographics),
      renderAllViewData(payload),
      renderRaw(payload)
    ].join("");

    results.classList.remove("audit-hidden");
  }

  function renderNotFound(payload) {
    var diagnostics = payload.diagnostics || {};
    return [
      '<section class="audit-section audit-panel">',
      '<h2>No preview rows found</h2>',
      '<p class="audit-message">The lookup reached the database, but this investor did not return data from the published sidecar views.</p>',
      '<div class="audit-grid">',
      stat("Raw holding rows", diagnostics.raw_holding_rows || "0"),
      stat("Mapped holding rows", diagnostics.mapped_holding_rows || "0"),
      stat("Raw current value", money(diagnostics.raw_current_value)),
      stat("Mapped current value", money(diagnostics.mapped_current_value)),
      '</div>',
      '</section>'
    ].join("");
  }

  function renderSummary(payload, holdings, impact, demographics) {
    return [
      '<section class="audit-section">',
      '<h2>Investor summary</h2>',
      '<div class="audit-grid">',
      stat("Investor ID", payload.investor_id || "n.a."),
      stat("Drip ID", holdings.drip_id || impact.drip_id || demographics.dripid || "n.a."),
      stat("Current value", money(holdings.investor_current_value || impact.investor_current_value)),
      stat("Original investment value", money(holdings.investor_original_value || impact.investor_original_value)),
      stat("Councils", holdings.council_count || impact.council_count || "0"),
      stat("Loans", holdings.loan_count || impact.loan_count || "0"),
      stat("Latest investment", date(holdings.latest_investment_created_at || impact.latest_investment_created_at)),
      stat("Current-weighted spend", money(impact.attributed_spent_amount)),
      stat("Spent proportion", pct(impact.weighted_spent_pct_of_current_portfolio)),
      '</div>',
      '</section>'
    ].join("");
  }

  function renderHoldings(holdings) {
    return [
      '<section class="audit-section">',
      '<h2>Holdings</h2>',
      '<div class="audit-columns">',
      '<div><h3 class="audit-card__label">Top loans</h3>',
      renderRankedList(holdings.top_loans || [], "loan_name", "current_value", "pct_of_current_portfolio", "council_name"),
      '</div>',
      '<div><h3 class="audit-card__label">Top councils</h3>',
      renderRankedList(holdings.top_councils || [], "council_name", "current_value", "pct_of_current_portfolio", "loan_count", "loans"),
      '</div>',
      '</div>',
      renderLatestInvestment(holdings.latest_investment),
      '</section>'
    ].join("");
  }

  function renderImpact(impact) {
    var categories = [
      ["Renewable Energy", impact.renewable_energy_spent_amount, impact.renewable_energy_pct_of_current_portfolio || impact.renewable_energy_pct_of_original_investment],
      ["Energy Efficiency", impact.energy_efficiency_spent_amount, impact.energy_efficiency_pct_of_current_portfolio || impact.energy_efficiency_pct_of_original_investment],
      ["Clean Transportation", impact.clean_transportation_spent_amount, impact.clean_transportation_pct_of_current_portfolio || impact.clean_transportation_pct_of_original_investment],
      ["Pollution Prevention", impact.pollution_prevention_spent_amount, impact.pollution_prevention_pct_of_current_portfolio || impact.pollution_prevention_pct_of_original_investment],
      ["Climate Change Adaptation", impact.climate_change_adaptation_spent_amount, impact.climate_change_adaptation_pct_of_current_portfolio || impact.climate_change_adaptation_pct_of_original_investment],
      ["Living Natural Resources", impact.living_natural_resources_spent_amount, impact.living_natural_resources_pct_of_current_portfolio || impact.living_natural_resources_pct_of_original_investment]
    ];
    return [
      '<section class="audit-section">',
      '<h2>Impact</h2>',
      '<div class="audit-columns">',
      '<div><h3 class="audit-card__label">Category allocation</h3>',
      categories.map(function (item) {
        return barRow(item[0], money(item[1]), item[2]);
      }).join(""),
      '</div>',
      '<div><h3 class="audit-card__label">Top projects</h3>',
      renderProjects(impact.top_projects || []),
      '</div>',
      '</div>',
      renderMostRecentProject(impact),
      '</section>'
    ].join("");
  }

  function renderDemographics(demographics) {
    return [
      '<section class="audit-section">',
      '<h2>Demographics</h2>',
      '<div class="audit-grid">',
      stat("Home council", demographics.council_name || "n.a."),
      stat("Local investor, not council recruited", formatBooleanish(demographics.local_investor_not_council_recruited)),
      stat("Council recruited investor", formatBooleanish(demographics.council_recruited_investor)),
      stat("Registration date", date(demographics.registrationdate)),
      stat("Found from", demographics.foundfrom || "n.a."),
      stat("Councils invested in", demographics.councilsinvestedin || "0"),
      '</div>',
      '</section>'
    ].join("");
  }

  function renderCouncilTiles(councils) {
    if (!councils.length) return "";

    return [
      '<section class="audit-section">',
      '<h2>Councils</h2>',
      '<div class="audit-council-tiles">',
      councils.map(renderCouncilTile).join(""),
      '</div>',
      '</section>'
    ].join("");
  }

  function renderCouncilTile(council) {
    var background = normaliseHex(council.hex) || "#363635";
    var logo = council.white_logo_url || "";
    var name = council.issuing_council || "Council";
    var hub = council.council_hub || "";

    return [
      '<article class="audit-council-tile" style="--audit-council-bg:', escapeHtml(background), '">',
      logo ? '<img src="' + escapeAttribute(logo) + '" alt="' + escapeAttribute(name) + ' logo">' : '<span class="audit-council-tile__fallback">' + escapeHtml(name.slice(0, 2)) + '</span>',
      '<div>',
      '<h3>', escapeHtml(name), '</h3>',
      hub ? '<p>' + escapeHtml(hub) + '</p>' : '',
      '</div>',
      '</article>'
    ].join("");
  }

  function renderRaw(payload) {
    return [
      '<section class="audit-section">',
      '<h2>Raw payload</h2>',
      '<pre class="audit-json">',
      escapeHtml(JSON.stringify(payload, null, 2)),
      '</pre>',
      '</section>'
    ].join("");
  }

  function renderAllViewData(payload) {
    return [
      '<section class="audit-section">',
      '<h2>All view data</h2>',
      '<div class="audit-full-data">',
      renderFieldDump("Holdings summary view", payload.holdings),
      renderFieldDump("Impact summary view", payload.impact),
      renderFieldDump("Demographics view", payload.demographics),
      renderFieldDump("Council enrichments", payload.councils),
      renderFieldDump("Lookup diagnostics", payload.diagnostics),
      '</div>',
      '</section>'
    ].join("");
  }

  function renderFieldDump(title, record) {
    if (record == null || (Array.isArray(record) && record.length === 0)) {
      return [
        '<details class="audit-dump" open>',
        '<summary>', escapeHtml(title), '</summary>',
        '<p class="audit-message">No data returned.</p>',
        '</details>'
      ].join("");
    }

    if (Array.isArray(record)) {
      return [
        '<details class="audit-dump" open>',
        '<summary>', escapeHtml(title), ' <span>', record.length, ' rows</span></summary>',
        record.map(function (item, index) {
          return [
            '<div class="audit-dump__group">',
            '<h3>Row ', index + 1, '</h3>',
            renderFieldTable(item),
            '</div>'
          ].join("");
        }).join(""),
        '</details>'
      ].join("");
    }

    return [
      '<details class="audit-dump" open>',
      '<summary>', escapeHtml(title), '</summary>',
      renderFieldTable(record),
      '</details>'
    ].join("");
  }

  function renderFieldTable(record) {
    var entries = Object.entries(record || {});
    if (!entries.length) return '<p class="audit-message">No fields returned.</p>';

    return [
      '<div class="audit-field-table">',
      entries.map(function (entry) {
        return [
          '<div class="audit-field-row">',
          '<div class="audit-field-name">', escapeHtml(entry[0]), '</div>',
          '<div class="audit-field-value">', renderFieldValue(entry[1]), '</div>',
          '</div>'
        ].join("");
      }).join(""),
      '</div>'
    ].join("");
  }

  function renderFieldValue(value) {
    if (value == null || value === "") return '<span class="audit-muted">null</span>';
    if (typeof value === "object") {
      return [
        '<pre class="audit-inline-json">',
        escapeHtml(JSON.stringify(value, null, 2)),
        '</pre>'
      ].join("");
    }
    return escapeHtml(String(value));
  }

  function renderRankedList(items, labelKey, valueKey, pctKey, metaKey, metaSuffix) {
    if (!items.length) return '<p class="audit-message">No mapped values.</p>';
    return '<div class="audit-list">' + items.map(function (item) {
      var meta = metaKey && item[metaKey] ? item[metaKey] + (metaSuffix ? " " + metaSuffix : "") : "";
      return [
        '<div class="audit-row">',
        '<div class="audit-row__head"><span>', escapeHtml(item[labelKey] || "n.a."), '</span><span>', money(item[valueKey]), '</span></div>',
        '<div class="audit-row__meta">', escapeHtml(meta), meta ? " · " : "", pct(item[pctKey]), '</div>',
        bar(item[pctKey]),
        '</div>'
      ].join("");
    }).join("") + '</div>';
  }

  function renderProjects(projects) {
    if (!projects.length) return '<p class="audit-message">No attributed projects.</p>';
    return '<div class="audit-list">' + projects.map(function (project) {
      return [
        '<div class="audit-row audit-project">',
        '<div class="audit-row__head"><span>', escapeHtml(project.project_name || "n.a."), '</span><span>', money(project.attributed_spent_amount), '</span></div>',
        '<div class="audit-row__meta">', escapeHtml(project.category || ""), ' · ', pct(project.pct_of_current_portfolio || project.pct_of_original_investment), ' of current portfolio</div>',
        '<div class="audit-row__meta">', escapeHtml(project.project_description || ""), '</div>',
        '</div>'
      ].join("");
    }).join("") + '</div>';
  }

  function renderLatestInvestment(latest) {
    if (!latest) return "";
    return [
      '<div class="audit-section">',
      '<h3 class="audit-card__label">Latest investment</h3>',
      '<div class="audit-row">',
      '<div class="audit-row__head"><span>', escapeHtml(latest.loan_name || "n.a."), '</span><span>', money(latest.current_value), '</span></div>',
      '<div class="audit-row__meta">', escapeHtml(latest.council_name || ""), ' · ', date(latest.created_at), '</div>',
      '</div>',
      '</div>'
    ].join("");
  }

  function renderMostRecentProject(impact) {
    if (!impact.most_recent_project_id && !impact.most_recent_project) return "";

    var project = impact.most_recent_project || {};
    var name = impact.most_recent_project_name || project.project_name || "n.a.";
    var category = impact.most_recent_project_category || project.category || "n.a.";
    var detail = impact.most_recent_project_description || project.project_description || "";
    var sourceDate = impact.most_recent_project_source_created_at || project.source_created_at;
    var council = impact.most_recent_project_council_name || project.council_name || "";
    var loan = impact.most_recent_project_loan_name || project.loan_name || "";
    var amount = impact.most_recent_project_attributed_spent_amount || project.attributed_spent_amount;
    var percent = impact.most_recent_project_pct_of_current_portfolio || project.pct_of_current_portfolio || impact.most_recent_project_pct_of_original_investment || project.pct_of_original_investment;

    return [
      '<div class="audit-section">',
      '<h3 class="audit-card__label">Most recent project update</h3>',
      '<div class="audit-row audit-project">',
      '<div class="audit-row__head"><span>', escapeHtml(name), '</span><span>', date(sourceDate), '</span></div>',
      '<div class="audit-row__meta">', escapeHtml(category), council ? ' · ' + escapeHtml(council) : '', loan ? ' · ' + escapeHtml(loan) : '', '</div>',
      '<div class="audit-row__meta">', money(amount), ' current-weighted · ', pct(percent), ' of current portfolio</div>',
      detail ? '<div class="audit-row__meta">' + escapeHtml(detail) + '</div>' : '',
      '</div>',
      '</div>'
    ].join("");
  }

  function stat(label, value) {
    return [
      '<div class="audit-card">',
      '<p class="audit-card__label">', escapeHtml(label), '</p>',
      '<p class="audit-card__value">', escapeHtml(String(value == null ? "n.a." : value)), '</p>',
      '</div>'
    ].join("");
  }

  function barRow(label, value, percent) {
    return [
      '<div class="audit-row">',
      '<div class="audit-row__head"><span>', escapeHtml(label), '</span><span>', escapeHtml(value), '</span></div>',
      '<div class="audit-row__meta">', pct(percent), '</div>',
      bar(percent),
      '</div>'
    ].join("");
  }

  function bar(value) {
    var width = Math.max(0, Math.min(Number(value || 0) * 100, 100));
    return '<div class="audit-bar"><span style="--audit-bar-width:' + width.toFixed(2) + '%"></span></div>';
  }

  function money(value) {
    var number = Number(value || 0);
    return number.toLocaleString("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 });
  }

  function pct(value) {
    var number = Number(value || 0);
    return (number * 100).toLocaleString("en-GB", { maximumFractionDigits: 1 }) + "%";
  }

  function date(value) {
    if (!value) return "n.a.";
    var parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return String(value);
    return parsed.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  }

  function formatBooleanish(value) {
    if (value == null || value === "") return "n.a.";
    if (value === true || value === "true" || value === "t" || value === "1" || value === 1) return "Yes";
    if (value === false || value === "false" || value === "f" || value === "0" || value === 0) return "No";
    return String(value);
  }

  function normaliseHex(value) {
    if (!value) return "";
    var text = String(value).trim();
    if (/^#[0-9a-f]{3}([0-9a-f]{3})?$/i.test(text)) return text;
    if (/^[0-9a-f]{3}([0-9a-f]{3})?$/i.test(text)) return "#" + text;
    return "";
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function escapeAttribute(value) {
    return escapeHtml(value).replace(/`/g, "&#096;");
  }

  function setBusy(form, busy) {
    form.querySelectorAll("button, input").forEach(function (element) {
      element.disabled = busy;
    });
  }
})();
