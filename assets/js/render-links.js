// data/links.json → 카테고리별 그룹 렌더 (categories 순서 유지).
// data-render="links" 컨테이너에 주입.
// data-categories="Social" 속성으로 특정 카테고리만 렌더 (홈 화면용, 콤마 구분).
(function () {
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  // 최소한의 인라인 SVG 아이콘 (의존성 없이)
  var ICONS = {
    github: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.5v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.4-2.3 1.2-3.1-.1-.3-.5-1.5.1-3 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.6 1.5.2 2.7.1 3 .8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.6.8.5 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z"/></svg>',
    linkedin: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.4 20.4h-3.6v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9v5.7H9.3V9h3.4v1.6h.1c.5-.9 1.6-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5v6.2zM5.3 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2zM7.1 20.4H3.5V9h3.6v11.4zM22.2 0H1.8C.8 0 0 .8 0 1.7v20.6c0 .9.8 1.7 1.8 1.7h20.4c1 0 1.8-.8 1.8-1.7V1.7c0-.9-.8-1.7-1.8-1.7z"/></svg>',
    mail: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
    globe: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18"/></svg>'
  };

  function icon(name) {
    return ICONS[name] || ICONS.globe;
  }

  function linkHTML(l) {
    var ext = l.url && l.url.indexOf('mailto:') !== 0 ? ' target="_blank" rel="noopener"' : '';
    var desc = l.description
      ? '<span class="link-desc">' + esc(l.description) + '</span>'
      : '';
    return (
      '<a href="' + esc(l.url) + '"' + ext + '>' +
        icon(l.icon) +
        '<span class="link-label">' + esc(l.label) + '</span>' +
        desc +
      '</a>'
    );
  }

  function catHTML(cat) {
    return (
      '<div class="link-cat">' +
        '<h3>' + esc(cat.name) + '</h3>' +
        '<div class="link-row">' +
          (cat.links || []).map(linkHTML).join('') +
        '</div>' +
      '</div>'
    );
  }

  async function render() {
    var containers = document.querySelectorAll('[data-render="links"]');
    if (!containers.length) return;
    try {
      var res = await fetch('/data/links.json');
      var data = await res.json();
      var cats = data.categories || [];
      containers.forEach(function (c) {
        var only = c.getAttribute('data-categories');
        var list = cats;
        if (only) {
          var wanted = only.split(',').map(function (s) { return s.trim(); });
          list = cats.filter(function (cat) { return wanted.indexOf(cat.name) !== -1; });
        }
        if (!list.length) {
          c.innerHTML = '<p class="muted">아직 링크가 없습니다.</p>';
          return;
        }
        c.innerHTML = list.map(catHTML).join('');
      });
    } catch (err) {
      console.error('[render-links]', err);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
