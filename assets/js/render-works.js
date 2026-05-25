// data/works.json → 카드 그리드. data-render="works" 컨테이너에 주입.
// data-limit="3" 속성으로 개수 제한 가능 (홈 화면용).
(function () {
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function cardHTML(w) {
    var href = w.external_url ? w.external_url : '/works/' + w.slug + '/';
    var ext = w.external_url ? ' target="_blank" rel="noopener"' : '';
    var tags = (w.tags || [])
      .map(function (t) { return '<span class="tag">' + esc(t) + '</span>'; })
      .join('');
    var thumb = w.thumbnail
      ? '<img class="card-thumb" src="' + esc(w.thumbnail) + '" alt="' + esc(w.title) + '" loading="lazy" onerror="this.style.display=&quot;none&quot;">'
      : '';
    var tagAttr = (w.tags || []).join(' ');
    return (
      '<a class="card" data-tags="' + esc(tagAttr) + '" href="' + esc(href) + '"' + ext + '>' +
        thumb +
        '<div class="card-body">' +
          '<div class="card-title">' + esc(w.title) + '</div>' +
          '<div class="card-desc">' + esc(w.description) + '</div>' +
          '<div class="card-meta">' + tags +
            '<span style="margin-left:auto">' + esc(w.date) + '</span>' +
          '</div>' +
        '</div>' +
      '</a>'
    );
  }

  async function render() {
    var containers = document.querySelectorAll('[data-render="works"]');
    if (!containers.length) return;
    try {
      var res = await fetch('/data/works.json');
      var data = await res.json();
      var works = (data.works || []).slice();
      works.sort(function (a, b) {
        if (!!b.featured !== !!a.featured) return b.featured ? 1 : -1;
        return (b.date || '').localeCompare(a.date || '');
      });
      containers.forEach(function (c) {
        var limit = parseInt(c.getAttribute('data-limit'), 10);
        var list = isNaN(limit) ? works : works.slice(0, limit);
        if (!list.length) {
          c.innerHTML = '<p class="muted">아직 작품이 없습니다.</p>';
          return;
        }
        c.classList.add('card-grid');
        c.innerHTML = list.map(cardHTML).join('');
      });
    } catch (err) {
      console.error('[render-works]', err);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
