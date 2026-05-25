---
description: 새 노트/글을 추가합니다
---

CLAUDE.md 의 "새 노트" 트리거 절차를 따라서 새 노트를 추가하세요.

1. 사용자에게 노트 제목을 묻습니다.
2. 슬러그를 `<오늘날짜>-<제목kebab>` 형식으로 자동 생성합니다.
3. `templates/new-note.html` 을 `notes/<slug>/index.html` 로 복사하고 {{TITLE}}/{{SLUG}}/{{DATE}} 를 치환합니다.
4. `data/notes.json` 항목 추가.
5. 본문 내용을 어떻게 채울지 사용자에게 묻습니다.
