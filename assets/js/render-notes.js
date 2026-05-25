// data/notes.json → 날짜 역순 리스트. data-render="notes" 컨테이너에 주입.
// data-limit="3" 지원 (홈 화면용).
(function () {
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function itemHTML(n) {
    var tags = (n.tags || [])
      .map(function (t) { return '<span class="tag">' + esc(t) + '</span>'; })
      .join(' ');
    return (
      '<a class="note-item" href="/notes/' + esc(n.slug) + '/" style="display:block">' +
        '<div class="note-date">' + esc(n.date) + '</div>' +
        '<div class="note-title">' + esc(n.title) + '</div>' +
        '<div class="note-excerpt">' + esc(n.excerpt) + '</div>' +
        '<div class="card-meta" style="margin-top:8px">' + tags + '</div>' +
      '</a>'
    );
  }

  async function render() {
    var containers = document.querySelectorAll('[data-render="notes"]');
    if (!containers.length) return;
    try {
      var res = await fetch('/data/notes.json');
      var data = await res.json();
      var notes = (data.notes || []).slice();
      notes.sort(function (a, b) {
        return (b.date || '').localeCompare(a.date || '');
      });
      containers.forEach(function (c) {
        var limit = parseInt(c.getAttribute('data-limit'), 10);
        var list = isNaN(limit) ? notes : notes.slice(0, limit);
        if (!list.length) {
          c.innerHTML = '<p class="muted">아직 노트가 없습니다.</p>';
          return;
        }
        c.classList.add('note-list');
        c.innerHTML = list.map(itemHTML).join('');
      });
    } catch (err) {
      console.error('[render-notes]', err);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
