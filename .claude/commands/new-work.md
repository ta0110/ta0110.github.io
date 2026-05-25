---
description: 새 작품을 추가합니다 (HTML 갤러리 항목)
---

CLAUDE.md 의 "새 작품" 트리거 절차를 따라서 새 작품을 추가하세요.

1. 사용자에게 작품 제목과 슬러그(kebab-case)를 묻습니다.
2. `templates/new-work.html` 을 `works/<slug>/index.html` 로 복사하고 {{TITLE}}/{{SLUG}} 를 치환합니다.
3. `data/works.json` 의 `works` 배열 맨 앞에 새 항목을 추가합니다 (date = today, featured = false).
4. JSON 문법 검증 후 사용자에게 "작품 폴더 만들어두었습니다. 내용 어떻게 채울지 알려주세요" 안내.
