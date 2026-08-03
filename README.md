# ERUTY Homepage

ERUTY의 회사, 서비스, 기술, 프로젝트, 채용 및 문의 정보를 제공하는 공식 홈페이지입니다.

- Production: [https://erutyhomepage.vercel.app/](https://erutyhomepage.vercel.app/)
- Repository: [https://github.com/kimue7057/ERUTY_HOMEPAGE](https://github.com/kimue7057/ERUTY_HOMEPAGE)
- Production baseline before cleanup: `production-2026-08-03-pre-cleanup`

## 작업 기준

작업의 기준은 GitHub `main`과 현재 Production 화면입니다.

- 요청받은 범위만 수정합니다.
- 디자인 변경과 데이터 변경을 하나의 작업에 섞지 않습니다.
- 확인되지 않은 회사 정보, 성과, 고객, 수치를 새로 만들지 않습니다.
- 기존 브랜치나 worktree는 고유 변경이 없는지 확인하기 전에는 삭제하지 않습니다.
- 배포 전 `npm run check`와 주요 경로의 화면 확인을 완료합니다.

## 기술 스택

- React 18
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Motion
- Lucide React
- Playwright
- Vercel

권장 Node.js 버전은 `24.x`입니다.

## 로컬 실행

```bash
npm install
npm run dev
```

Production build를 로컬에서 확인하려면 다음 명령을 사용합니다.

```bash
npm run build
npm run preview
```

## 검증

전체 검증:

```bash
npm run check
```

개별 검증:

```bash
npm run typecheck
npm run lint
npm run build
```

배포 화면 캡처:

```bash
npm run capture:site
```

다른 주소를 캡처하려면 `CAPTURE_BASE_URL` 환경 변수를 지정합니다.

`npm run build`는 Vite 빌드 이후 `scripts/prepare-sites-build.mjs`를 실행해 Sites 호스팅용 파일도 준비합니다.

## 주요 경로

| 경로 | 구현 파일 | 설명 |
| --- | --- | --- |
| `/` | `src/app/pages/HomePage.tsx` | 메인 홈페이지 |
| `/company/about` | `src/app/pages/company/AboutPage.tsx` | 회사 소개 |
| `/company/team` | `src/app/pages/company/TeamPage.tsx` | 팀 소개 |
| `/company/growth` | `src/app/pages/company/GrowthPage.tsx` | 프로젝트 |
| `/company/careers` | `src/app/pages/company/CareersPage.tsx` | 채용 |
| `/services/hitpick` | `src/app/pages/services/hitpick/HitpickPage.tsx` | Hitpick 서비스 |
| `/services/erumter` | `src/app/pages/services/erumter/ErumterPage.tsx` | 이룸터 서비스 |
| `/technology` | `src/app/pages/TechnologyPage.tsx` | 기술 구조와 서비스 적용 |
| `/resources` | `src/app/pages/ResourcesPage.tsx` | 리소스 |
| `/start-a-project` | `src/app/pages/StartProjectPage.tsx` | 프로젝트 문의 |

전체 라우팅과 공통 레이아웃은 `src/app/App.tsx`에서 관리합니다.

## 디렉터리 구조

```text
src/
├─ app/
│  ├─ components/       공통 UI
│  ├─ context/          전역 상태
│  ├─ data/             공통 데이터
│  └─ pages/            페이지와 페이지 전용 컴포넌트
├─ assets/              번들에 포함되는 이미지와 영상
├─ services/            문의·채용 제출 로직
└─ styles/              전역 스타일과 디자인 토큰

public/images/          정적 페이지 이미지
scripts/                빌드 및 화면 캡처 도구
```

## 환경 변수

사용 가능한 환경 변수는 `.env.example`을 기준으로 합니다.

- `VITE_APP_ENV`
- `VITE_ENABLE_MOCK_SUBMISSIONS`
- `VITE_INQUIRY_API_BASE_URL`
- `VITE_INQUIRY_API_KEY`
- `VITE_CAREERS_API_BASE_URL`
- `VITE_CAREERS_API_KEY`
- `VITE_UPLOAD_MAX_FILE_MB`

문의와 채용 제출은 별도 API가 연결되지 않은 환경에서 mock 모드로 동작할 수 있습니다. 실제 API 연동 시 `src/services/inquiry.ts`, `src/services/careers.ts`, `.env.example`을 함께 확인해야 합니다.

## 병렬 작업 안전 수칙

작업 시작 전 아래 상태를 확인합니다.

```bash
git fetch origin
git status -sb
git branch -vv
git worktree list
```

- 다른 작업 브랜치가 이미 `main`에 반영됐다고 가정하지 않습니다.
- 현재 작업 범위와 직접 관련된 파일만 수정합니다.
- 고유 커밋이 남은 브랜치와 worktree는 통합 여부를 파일 단위로 확인하기 전까지 삭제하지 않습니다.
- 충돌 시 파일 전체를 한쪽 버전으로 덮어쓰지 않고 필요한 변경만 병합합니다.
- `git reset --hard`, `git clean -fd`, 강제 push는 사용하지 않습니다.

## 배포

Production은 Vercel에서 `main`을 기준으로 배포합니다. `vercel.json`의 SPA rewrite 설정으로 모든 앱 경로를 `index.html`에 연결합니다.

운영 배포 전에는 다음 항목을 확인합니다.

1. `npm run check` 통과
2. 데스크톱과 모바일 주요 경로 확인
3. 메뉴, 언어 전환, 링크와 폼 동작 확인
4. 의도하지 않은 스크롤과 콘솔 오류 확인
5. 현재 Production과 변경 범위 비교

`.github/workflows/capture-site.yml`은 `main` push와 수동 실행 시 10개 공개 경로의 데스크톱·모바일 화면을 캡처해 artifact로 보관합니다.

현재 `index.html`에는 `noindex, nofollow` robots 설정이 있습니다. 검색 노출을 시작하기 전에는 이 설정이 의도된 것인지 반드시 확인해야 합니다.
