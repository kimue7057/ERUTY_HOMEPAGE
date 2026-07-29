# ERUTY Homepage

ERUTY corporate website frontend built with Vite, React, and TypeScript.

현재 기준 디자인은 Figma Make에서 생성된 화면을 바탕으로 정리했으며, 홈, 회사 소개, 서비스 상세, 기술, 리소스, 프로젝트 문의, 채용 흐름을 하나의 프론트엔드 기준 상태로 맞춰 두었습니다.

## Tech Stack

- React 18
- TypeScript
- Vite
- React Router
- Motion
- Lucide React
- Tailwind CSS v4
- ESLint

## Recommended Node.js

- `>= 20.10.0`
- 검증 기준: `Node.js 24.14.0`

## Install

```bash
npm install
```

## Run Locally

```bash
npm run dev
```

기본 개발 서버는 Vite 기준으로 실행됩니다.

## Type Check

```bash
npm run typecheck
```

## Lint

```bash
npm run lint
```

## Production Build

```bash
npm run build
```

빌드 결과는 `dist/`에 생성됩니다.

## Preview

```bash
npm run preview
```

## Main Routes

- `/`
- `/company/about`
- `/company/global-network`
- `/company/team`
- `/company/growth`
- `/company/careers`
- `/services/hitpick`
- `/services/erumter`
- `/technology`
- `/resources`
- `/start-a-project`
- `*` → 404 fallback

## Folder Structure

```text
.
├─ public/
│  ├─ favicon.svg
│  └─ og-default.png
├─ src/
│  ├─ app/
│  │  ├─ components/
│  │  ├─ context/
│  │  ├─ data/
│  │  └─ pages/
│  ├─ assets/
│  │  ├─ brand/
│  │  ├─ images/
│  │  └─ video/
│  ├─ services/
│  └─ styles/
├─ .env.example
├─ eslint.config.js
├─ index.html
├─ package.json
├─ package-lock.json
├─ postcss.config.mjs
├─ tsconfig.json
└─ vite.config.ts
```

## Asset Locations

- 브랜드 로고: `src/assets/brand/`
- 일반 이미지: `src/assets/images/`
- 영상 자산: `src/assets/video/`
- favicon / OG 기본 자산: `public/`

현재 사용 중인 대표 자산:

- `src/assets/brand/eruty-logo.png`
- `src/assets/video/eruty-hero.mp4`

## Inquiry Flow

`/start-a-project`는 현재 프론트엔드 완료 상태의 mock submission 흐름입니다.

- URL query 기반 사전 선택 지원
- Hitpick 문의 예시
  - `/start-a-project?service=hitpick&type=global-expansion`
  - `/start-a-project?service=hitpick&type=content-ip`
  - `/start-a-project?service=hitpick&type=creator-marketing`
  - `/start-a-project?service=hitpick&type=global-partner`
- 이룸터 문의 예시
  - `/start-a-project?service=erumter&type=automation`
  - `/start-a-project?service=erumter&type=ai-development`
  - `/start-a-project?service=erumter&type=ax-education`
  - `/start-a-project?service=erumter&type=ax-diagnosis`

문의 프론트엔드 상태:

- 입력 상태
- validation 오류
- 제출 중
- 제출 성공
- 제출 실패
- 첨부파일 선택 / 제거
- 개인정보 동의

API 교체 위치:

- `src/services/inquiry.ts`

## Careers Flow

`/company/careers`의 상시 지원 폼도 현재 mock submission 흐름으로 분리되어 있습니다.

채용 프론트엔드 상태:

- 입력 상태
- validation 오류
- 제출 중
- 제출 성공
- 제출 실패
- 첨부파일 선택 / 제거
- 개인정보 동의

API 교체 위치:

- `src/services/careers.ts`

## Environment Variables

예시는 `.env.example`에 정리되어 있습니다.

주요 항목:

- `VITE_APP_ENV`
- `VITE_ENABLE_MOCK_SUBMISSIONS`
- `VITE_INQUIRY_API_BASE_URL`
- `VITE_INQUIRY_API_KEY`
- `VITE_CAREERS_API_BASE_URL`
- `VITE_CAREERS_API_KEY`
- `VITE_UPLOAD_MAX_FILE_MB`

## SEO / Robots

현재 개발 단계에서는 검색엔진 차단 상태를 유지합니다.

설정 위치:

- 기본 title / description: `index.html`
- robots 차단: `index.html`의 `<meta name="robots" content="noindex, nofollow" />`
- 기본 favicon: `public/favicon.svg`
- 기본 Open Graph 이미지: `public/og-default.png`

운영 배포 시 해야 할 일:

1. `index.html`의 robots meta를 운영 정책에 맞게 변경합니다.
2. `public/favicon.svg`와 `public/og-default.png`를 실제 브랜드 자산으로 교체합니다.
3. 필요하면 페이지별 메타데이터를 추가합니다.

## SPA Refresh / Deployment

현재 라우팅은 `BrowserRouter` 기반입니다.

운영 배포 시 상세 주소 새로고침이 정상 동작하려면 모든 비정적 요청을 `index.html`로 rewrite 해야 합니다.

예시:

- Nginx: `try_files $uri /index.html;`
- Netlify: `/* /index.html 200`
- Vercel: SPA rewrite 설정
- 기타 정적 호스팅: history fallback 또는 rewrite 규칙 필요

개발 서버와 Vite preview에서는 새로고침이 정상 동작합니다.

## What Is Working Now

- 전체 주요 라우트 진입
- 404 catch-all 라우트
- 공통 Header / Footer 레이아웃
- Hitpick / 이룸터 문의 CTA query 전달
- 프로젝트 문의 프리필
- 문의 / 채용 mock 제출 흐름
- TypeScript 검사
- ESLint 검사
- Production build

## Follow-up Work Before Production

- 실제 백엔드 API 연결
- 파일 업로드 저장소 연동
- 스팸 방지
- 개인정보 동의 로그 저장
- 페이지별 SEO 메타 확장
- 실제 호스팅 환경의 SPA rewrite 적용
- 실디바이스 브라우저 기준 반응형 최종 검수
- 번역 콘텐츠 운영 방식 정리

## Notes

- 현재 저장소에는 Figma Make가 남긴 일부 `src/imports/` 바이너리 복제본이 있을 수 있습니다. 실제 앱 import는 `src/assets/`만 사용합니다.
- 라우트는 lazy loading으로 분리되어 초기 번들 부담을 줄였습니다.
