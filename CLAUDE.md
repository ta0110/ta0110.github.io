# 이 레포에 대해

여기는 **지성민의 개인 포털 사이트**(https://ta0110.github.io/my-portal/)입니다.

운영자는 비개발자 또는 가벼운 운영자입니다. 사용자가 자연어로 콘텐츠 추가/수정/배포를 요청하면 Claude 가 자동으로 처리합니다.

기술 스택: 순수 HTML + CSS + Vanilla JS + Tailwind Play CDN. 빌드 도구·프레임워크 없음. GitHub Pages 호스팅. 모든 콘텐츠는 `data/*.json` 에 분리되어 있습니다.

## 소통 원칙

- 한국어 친근한 어조
- 기술 용어 노출 최소화 (예: "git push" → "올리기", "commit" → "저장", "workflow" → "자동 빌드")
- 자동 진행 (사용자가 차이 모를 기술 선택은 묻지 말고 진행)
- 꼭 필요한 질문만 (콘텐츠 제목, 슬러그, 본문, 공개 여부)

## 자연어 트리거 매핑

| 사용자 발화 | 작업 |
|---|---|
| "새 작품" / "새 데모" / "작품 추가" | (1) 제목 + 슬러그 묻기 → (2) `templates/new-work.html` → `works/<slug>/index.html` 복사 ({{TITLE}}/{{SLUG}} 치환) → (3) `data/works.json` 의 `works` 배열 맨 앞에 항목 추가 (date=today, featured=false) → (4) "내용 어떻게 채울지 알려주세요" |
| "새 노트" / "글 추가" / "메모" | (1) 제목 묻기 → (2) 슬러그=`<오늘날짜>-<제목kebab>` 자동 생성 → (3) `templates/new-note.html` → `notes/<slug>/index.html` 복사 ({{TITLE}}/{{SLUG}}/{{DATE}} 치환) → (4) `data/notes.json` 항목 추가 → (5) 본문 어떻게 채울지 묻기 |
| "발행" / "올려줘" / "배포" | `git add . && git commit -m "<자동 메시지>" && git push` → "1-2분 후 https://ta0110.github.io/my-portal/.../ 에서 보입니다" |
| "링크 추가" | 라벨 + URL + 카테고리 묻기 → `data/links.json` 추가 (없는 카테고리면 새로 만듦) |
| "프로필 수정" / "한 줄 소개 바꿔" | `data/profile.json` 의 해당 필드 수정 |
| "톤 / 색상 / 폰트 변경" | `assets/css/theme.css` 의 CSS 변수만 수정 (다른 파일 손대지 말 것) |
| "미리보기" / "지금 어떻게 보여" | 백그라운드로 `python3 -m http.server 8000` 실행 후 http://localhost:8000 안내 |
| "댓글 / 통계 / 폼 추가" | Giscus / GoatCounter / Formspree 중 선호 묻고 그 서비스 가이드대로 script 추가 |
| "커스텀 도메인" | (1) 도메인 받기 → (2) 루트에 `CNAME` 파일 생성 → (3) GitHub Settings → Pages → Custom domain 수동 입력 안내 → (4) DNS CNAME 가이드 |

## 파일 규칙

- 새 콘텐츠는 반드시 `data/<type>.json` + 페이지 폴더 둘 다 갱신
- 슬러그는 kebab-case 만 (영문 소문자 + 숫자 + 하이픈)
- 노트 슬러그는 `YYYY-MM-DD-제목kebab` 형식
- 공통 헤더/푸터 변경은 `partials/` 만, 각 페이지 파일에 복사 금지
- 색상/폰트 변경은 `assets/css/theme.css` 의 CSS 변수만
- 새 페이지의 `<head>` 는 `partials/head-meta.html` 블록을 복사해서 만든다 (스크립트는 fetch 주입이 안 되므로 각 페이지에 직접 둠). title / description / og / canonical 만 페이지별로 바꾼다
- 새 JS 파일 추가 시 반드시 `assets/js/` 하위, ES module 아닌 일반 스크립트로
- 빌드 도구 / 프레임워크 도입 금지 (webpack, vite, npm install, React, Vue, Next 등)
- `data/*.json` 스키마: 필드 추가는 OK, 기존 필드 삭제는 사용자 명시적 동의 후

## 콘텐츠 추가 후 검증 체크리스트

1. [ ] `data/<type>.json` 에 항목 추가됨, JSON 문법 OK (`python3 -c "import json; json.load(open('data/works.json'))"` 통과)
2. [ ] 페이지 폴더 + index.html 생성됨
3. [ ] 슬러그 형식 OK (kebab-case, 노트는 날짜 prefix)
4. [ ] 회사 / 사내 / 민감 데이터 / 키 / 토큰 포함 여부 확인 (특히 public 레포)
5. [ ] (가능하면) `python3 -m http.server 8000` 으로 한 번 로컬 확인

## 배포 방법

```bash
git add .
git commit -m "feat: <설명>"
git push
```

→ 1-2분 후 https://ta0110.github.io/my-portal/ 에 반영. 별도 workflow 없음.

배포 후 사용자에게: "올렸습니다! 1-2분 후 <URL> 에서 보입니다. 바로 안 보이면 브라우저 강력 새로고침 (Cmd+Shift+R)."

## 절대 하지 말 것

- ❌ 빌드 도구 도입 (webpack/vite/parcel/rollup/turbopack 등)
- ❌ 프레임워크 도입 (React/Vue/Svelte/Solid/Next/Nuxt 등)
- ❌ npm install / package.json 생성 (의존성 일체 X)
- ❌ TypeScript 도입 (Vanilla JS 만)
- ❌ partials 안 거치고 헤더/푸터를 각 페이지에 복붙
- ❌ `data/*.json` 의 기존 필드 임의 삭제
- ❌ 사용자가 public/private 명시 안 하면 임의로 결정
- ❌ 회사 / 사내 데이터 처리 (이 레포는 개인 전용)
- ❌ API 키 / 토큰 / 비밀번호 commit
