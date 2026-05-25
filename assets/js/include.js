// partials inject: data-include 속성 가진 요소를 fetch 결과로 교체.
// 모든 include 완료 후 'includes-loaded' 이벤트를 발생시켜
// theme-toggle 등 다른 스크립트가 헤더의 요소를 안전하게 바인딩할 수 있게 한다.
(function () {
  async function runIncludes() {
    var nodes = Array.prototype.slice.call(
      document.querySelectorAll('[data-include]')
    );

    await Promise.all(
      nodes.map(async function (el) {
        var url = el.getAttribute('data-include');
        try {
          var res = await fetch(url);
          if (!res.ok) throw new Error('HTTP ' + res.status);
          var html = await res.text();
          el.outerHTML = html;
        } catch (err) {
          console.error('[include] 불러오기 실패:', url, err);
          el.outerHTML =
            '<!-- include 실패: ' + url + ' (로컬 서버에서 열어주세요) -->';
        }
      })
    );

    // 현재 페이지 경로에 해당하는 네비 링크 활성화 표시
    try {
      var here = location.pathname.replace(/index\.html$/, '');
      document.querySelectorAll('.site-header nav a').forEach(function (a) {
        var href = a.getAttribute('href');
        if (href && href !== '/' && here.indexOf(href) === 0) {
          a.style.color = 'var(--text)';
        }
      });
    } catch (e) {}

    document.dispatchEvent(new Event('includes-loaded'));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runIncludes);
  } else {
    runIncludes();
  }
})();
