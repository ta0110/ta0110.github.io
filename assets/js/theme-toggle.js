// 다크/라이트 토글. localStorage('theme') 우선, 없으면 시스템 prefers-color-scheme.
(function () {
  var KEY = 'theme';

  function systemPref() {
    return window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: light)').matches
      ? 'light'
      : 'dark';
  }

  function current() {
    return localStorage.getItem(KEY) || systemPref();
  }

  function apply(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    var btn = document.getElementById('theme-toggle');
    if (btn) btn.textContent = theme === 'light' ? '☀' : '☾';
  }

  // FOUC 방지: 가능한 한 빨리 초기 테마 적용
  apply(current());

  function bind() {
    apply(current());
    var btn = document.getElementById('theme-toggle');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var next =
        document.documentElement.getAttribute('data-theme') === 'light'
          ? 'dark'
          : 'light';
      localStorage.setItem(KEY, next);
      apply(next);
    });
  }

  // 헤더 partial 이 주입된 뒤에 토글 버튼을 바인딩
  document.addEventListener('includes-loaded', bind);
  // partial 없는 페이지를 대비한 fallback
  if (document.readyState !== 'loading') bind();
  else document.addEventListener('DOMContentLoaded', bind);
})();
