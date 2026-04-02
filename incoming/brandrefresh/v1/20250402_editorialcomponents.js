(function () {
  var API_URL = 'https://data.abundanceinvestment.com/projects';

  var CATEGORY_COLOURS = {
    'Clean Transportation': 'blue',
    'Living and Natural Resources': 'pink',
    'Energy Efficiency': 'yellow',
    'Renewable Energy': 'blue',
    'Biodiversity': 'pink',
    'Waste Management': 'yellow',
    'Water Management': 'blue'
  };

  function badgeColour(category) {
    return CATEGORY_COLOURS[category] || 'yellow';
  }

  function formatGBP(value) {
    if (value == null) return null;
    var hasPence = value % 1 !== 0;
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: hasPence ? 2 : 0,
      maximumFractionDigits: hasPence ? 2 : 0
    }).format(value);
  }

  function sumSpend(projects) {
    return projects.reduce(function (acc, r) {
      return acc + (r.fields.totalSpent || 0);
    }, 0);
  }

  function renderDescription(text) {
    if (!text) return '';
    return text
      .split('\n')
      .map(function (line) { return line.trim(); })
      .filter(function (line) { return line.length > 0; })
      .map(function (line) {
        if (/^\\?-\s/.test(line)) {
          return '<ul><li>' + escapeHtml(line.replace(/^\\?-\s*/, '')) + '</li></ul>';
        }
        return '<p>' + escapeHtml(line) + '</p>';
      })
      .join('');
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function chevronSvg() {
    return '<svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M3.5 6.5L9 12L14.5 6.5" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  }

  function renderTop(projects, hasProjects) {
    var totalSpend = hasProjects ? sumSpend(projects) : null;
    var totalLeft = hasProjects && projects[0] && projects[0].fields.totalLeft != null
      ? projects[0].fields.totalLeft
      : null;
    var spendStr = formatGBP(totalSpend) || '—';
    var leftStr = formatGBP(totalLeft) || '—';
    var count = hasProjects ? projects.length : 0;

    return ''
      + '<div class="ai-slab__inner ai-egp__top">'
      +   '<p class="ai-card__eyebrow ai-card__eyebrow--data ai-egp__eyebrow">Green projects</p>'
      +   '<h3 class="ai-slab__title ai-egp__title">Projects financed</h3>'
      +   '<p class="ai-slab__intro ai-egp__intro">This is a list of the projects funded by the money raised in this investment, as reported by the council. The council will periodically update Abundance as more of the money is spent on specific projects over time.</p>'
      +   '<div class="ai-egp__stats">'
      +     '<div class="ai-egp__stat">'
      +       '<span class="ai-egp__stat-label">Projects funded</span>'
      +       '<p class="ai-egp__stat-value">' + count + '</p>'
      +     '</div>'
      +     '<div class="ai-egp__stat">'
      +       '<span class="ai-egp__stat-label">Spent so far</span>'
      +       '<p class="ai-egp__stat-value">' + spendStr + '</p>'
      +     '</div>'
      +     '<div class="ai-egp__stat">'
      +       '<span class="ai-egp__stat-label">Left to spend</span>'
      +       '<p class="ai-egp__stat-value">' + leftStr + '</p>'
      +     '</div>'
      +   '</div>'
      + '</div>';
  }

  function renderRow(project, totalSpend) {
    var f = project.fields || {};
    var colour = badgeColour(f.category);
    var projectName = escapeHtml(f.projectName || '');
    var category = escapeHtml(f.category || '');
    var spendStr = formatGBP(f.totalSpent);
    var progressPct = (totalSpend && f.totalSpent)
      ? Math.min(100, Math.round((f.totalSpent / totalSpend) * 100))
      : 0;

    var rightHtml = '';
    if (spendStr) {
      rightHtml += '<span class="ai-egp__spend">' + spendStr + '</span>';
    }
    if (progressPct > 0) {
      rightHtml += '<div class="ai-egp__progress"><div class="ai-egp__progress-fill" style="width:' + progressPct + '%"></div></div>';
    }

    return ''
      + '<article class="ai-egp__row" data-id="' + escapeHtml(project.id) + '">'
      +   '<button class="ai-egp__trigger" aria-expanded="false" type="button">'
      +     '<div class="ai-egp__left">'
      +       '<span class="ai-egp__category ai-egp__category--' + colour + '">' + category + '</span>'
      +       '<span class="ai-egp__name">' + projectName + '</span>'
      +     '</div>'
      +     '<div class="ai-egp__right">' + rightHtml + '</div>'
      +     '<div class="ai-egp__chevron">' + chevronSvg() + '</div>'
      +   '</button>'
      +   (f.description
            ? '<div class="ai-egp__body" hidden><div class="ai-egp__body-inner">' + renderDescription(f.description) + '</div></div>'
            : '')
      + '</article>';
  }

  function renderList(projects) {
    var totalSpend = sumSpend(projects);
    return '<div class="ai-slab__inner" style="padding-top:18px;"><div class="ai-egp__list">'
      + projects.map(function (p) { return renderRow(p, totalSpend); }).join('')
      + '</div></div>';
  }

  function renderEmpty() {
    return ''
      + '<div class="ai-slab__inner" style="padding-top:18px;">'
      +   '<div class="ai-egp__empty">'
      +     '<div class="ai-egp__empty-mark">i</div>'
      +     '<p class="ai-egp__empty-text">The council has not yet reported on the projects financed by this investment. This is not unusual as it can take some time following the close of the investment for the council to confirm exactly which projects it wants to allocate the funding to and report it to Abundance. Check back soon to see any updates from the council.</p>'
      +   '</div>'
      + '</div>';
  }

  function bindToggle(scope) {
    scope.addEventListener('click', function (e) {
      var btn = e.target.closest('.ai-egp__trigger');
      if (!btn) return;

      var row = btn.closest('.ai-egp__row');
      var body = row.querySelector('.ai-egp__body');
      var open = row.classList.toggle('ai-egp__row--open');

      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (body) body.hidden = !open;
    });
  }

  function showLoading(scope) {
    scope.innerHTML = ''
      + '<div class="ai-slab ai-egp__card ai-slab--blob-anchor">'
      +   '<div class="ai-slab__inner">'
      +     '<p class="ai-card__eyebrow ai-card__eyebrow--data">Green projects</p>'
      +     '<h3 class="ai-slab__title">Projects financed</h3>'
      +   '</div>'
      +   '<div class="ai-slab__inner" style="padding-top:0;">'
      +     '<div class="ai-egp__loading">'
      +       '<div class="ai-egp__loading-item"></div>'
      +       '<div class="ai-egp__loading-item"></div>'
      +       '<div class="ai-egp__loading-item"></div>'
      +     '</div>'
      +   '</div>'
      + '</div>';
  }

  function showError(scope, msg) {
    scope.innerHTML = ''
      + '<div class="ai-egp__error"><strong>Unable to load projects.</strong> '
      + (msg || 'Please try refreshing the page.')
      + '</div>';
  }

  function renderWithProjects(scope, projects) {
    scope.innerHTML = ''
      + '<section class="ai-slab ai-egp__card ai-slab--blob-anchor ai-slab--blob-anchor-yellow">'
      + renderTop(projects, true)
      + renderList(projects)
      + '</section>';
    bindToggle(scope);
  }

  function renderEmptyState(scope) {
    scope.innerHTML = ''
      + '<section class="ai-slab ai-egp__card ai-slab--blob-anchor ai-slab--blob-anchor-yellow">'
      + renderTop([], false)
      + renderEmpty()
      + '</section>';
  }

  var root = document.getElementById('ai-egp-root');
  if (!root) return;

  var loanId = root.getAttribute('data-loan-id') || '';
  var scope = root.querySelector('.ai-egp-scope');
  if (!scope) return;

  if (!loanId) {
    renderEmptyState(scope);
    return;
  }

  showLoading(scope);

  fetch(API_URL)
    .then(function (res) {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res.json();
    })
    .then(function (data) {
      var records = data.records || [];
      var filtered = records.filter(function (r) {
        return Array.isArray(r.fields.loanID)
          && r.fields.loanID.indexOf(loanId) !== -1;
      });

      if (filtered.length === 0) {
        renderEmptyState(scope);
        return;
      }

      filtered.sort(function (a, b) {
        return (b.fields.totalSpent || 0) - (a.fields.totalSpent || 0);
      });

      renderWithProjects(scope, filtered);
    })
    .catch(function (err) {
      showError(scope, err.message);
    });
})();
