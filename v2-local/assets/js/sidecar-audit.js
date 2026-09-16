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
      renderHoldings(holdings),
      renderImpact(impact),
      renderDemographics(demographics),
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
      stat("Councils", holdings.council_count || impact.council_count || "0"),
      stat("Loans", holdings.loan_count || impact.loan_count || "0"),
      stat("Latest investment", date(holdings.latest_investment_created_at || impact.latest_investment_created_at)),
      stat("Attributed spend", money(impact.attributed_spent_amount)),
      stat("Spent %", pct(impact.weighted_spent_pct_of_original_investment)),
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
      ["Renewable Energy", impact.renewable_energy_spent_amount, impact.renewable_energy_pct_of_original_investment],
      ["Energy Efficiency", impact.energy_efficiency_spent_amount, impact.energy_efficiency_pct_of_original_investment],
      ["Clean Transportation", impact.clean_transportation_spent_amount, impact.clean_transportation_pct_of_original_investment],
      ["Pollution Prevention", impact.pollution_prevention_spent_amount, impact.pollution_prevention_pct_of_original_investment],
      ["Climate Change Adaptation", impact.climate_change_adaptation_spent_amount, impact.climate_change_adaptation_pct_of_original_investment],
      ["Living Natural Resources", impact.living_natural_resources_spent_amount, impact.living_natural_resources_pct_of_original_investment]
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
      '</section>'
    ].join("");
  }

  function renderDemographics(demographics) {
    return [
      '<section class="audit-section">',
      '<h2>Demographics</h2>',
      '<div class="audit-grid">',
      stat("Home council", demographics.council_name || "n.a."),
      stat("Registration date", date(demographics.registrationdate)),
      stat("Found from", demographics.foundfrom || "n.a."),
      stat("Councils invested in", demographics.councilsinvestedin || "0"),
      '</div>',
      '</section>'
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
        '<div class="audit-row__meta">', escapeHtml(project.category || ""), ' · ', pct(project.pct_of_original_investment), '</div>',
        '<div class="audit-row__meta">', escapeHtml((project.project_description || "").slice(0, 220)), '</div>',
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

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function setBusy(form, busy) {
    form.querySelectorAll("button, input").forEach(function (element) {
      element.disabled = busy;
    });
  }
})();
