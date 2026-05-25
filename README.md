# 지성민의 포털

지성민의 작품 · 노트 · 링크를 한곳에 모은 개인 포털 사이트의 소스입니다.

- **라이브 사이트**: https://ta0110.github.io/
- 순수 HTML/CSS/JS (빌드 도구·프레임워크 없음), GitHub Pages 호스팅
- 모든 콘텐츠는 `data/*.json` 에 분리되어 있어, 한 곳만 고치면 사이트에 반영됩니다.

## 운영

이 사이트는 [Claude Code](https://claude.com/claude-code) 로 자연어로 운영합니다. (예: "새 작품 추가해줘", "이 글 발행해줘") — 자세한 규칙은 레포 안 `CLAUDE.md` 에 있습니다.

## 로컬에서 보기

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

> `file://` 로 직접 열면 공통 헤더/푸터가 안 보입니다. 반드시 위 로컬 서버로 여세요.
