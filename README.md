# ERUTY Homepage

## 1. 프로젝트 개요

ERUTY Homepage는 주식회사 이루티의 기업 홈페이지 프런트엔드입니다.  
현재 구현은 글로벌 사업 실행, 기업 AX 전환, 기술 역량, 글로벌 네트워크, 프로젝트 소개, 리소스, 문의·채용 흐름을 한 사이트 안에서 안내하는 구조로 되어 있습니다.

- Production: [https://erutyhomepage.vercel.app/](https://erutyhomepage.vercel.app/)
  현재 운영 중인 Vercel Production URL입니다.
- GitHub: [https://github.com/kimue7057/ERUTY_HOMEPAGE](https://github.com/kimue7057/ERUTY_HOMEPAGE)
  코드와 `main` 브랜치의 기준 저장소입니다.
- Legacy Website: [https://www.eruty.co.kr/ko](https://www.eruty.co.kr/ko)
  이전 운영 사이트입니다. 비교 참고용으로만 사용하고, 현재 작업의 소스 오브 트루스로 취급하지 않습니다.

2026년 8월 2일 확인 기준 GitHub `main` 최신 커밋은 `b195526cc3adae1e34a461121011dab03e571e2c`입니다.

## 2. 작업 기준과 Source of Truth

작업 판단 우선순위는 아래 순서를 따릅니다.

1. GitHub `main`
2. Production 배포 화면
3. 확정된 회사 정보 및 사용자 결정
4. 기존 홈페이지와 참고 문서

작업 원칙은 아래와 같습니다.

- 사용자가 요청한 범위만 변경합니다.
- 데이터 수정과 디자인 수정은 분리해서 다룹니다.
- 요청 없는 섹션 순서, 전체 레이아웃, 라우팅은 임의로 바꾸지 않습니다.
- 확인되지 않은 회사 정보, 성과, 수치, 파트너, 프로젝트를 새로 만들지 않습니다.
- 실제 공개 데이터와 예시·임시 데이터는 구분해서 유지합니다.
- 문서와 코드가 충돌하면 현재 `main` 코드를 우선하고, 차이는 PR 또는 작업 메모에 남깁니다.
- Codex나 다른 작업자가 이어받을 때도 먼저 실제 파일 구조와 현재 브랜치 상태를 확인합니다.
- 작업 후에는 최소 `typecheck`, `lint`, `build`를 다시 확인합니다.

## 3. 기술 스택

`package.json` 기준 현재 스택은 아래와 같습니다.

- `react` `18.3.1`
- `react-dom` `18.3.1`
- `typescript` `5.5.4`
- `vite` `6.3.5`
- `react-router` `7.13.0`
- `motion` `12.23.24`
- `lucide-react` `0.487.0`
- `tailwindcss` `4.1.12`
- `@tailwindcss/vite` `4.1.12`
- `eslint` `9.8.0`
- `playwright` `1.62.0`
- `GitHub Actions`
- `Vercel`

권장 Node 버전은 `24.x`입니다.

## 4. 로컬 실행

```bash
npm install
npm run dev
```

추가 명령어:

```bash
npm run preview
```

- `npm run dev`: 로컬 개발 서버 실행
- `npm run preview`: production build 결과 미리보기

## 5. 검증 명령

기본 검증:

```bash
npm run typecheck
npm run lint
npm run build
```

화면 캡처 검수:

```bash
npm run capture:site
```

메모:

- `npm run build`는 `vite build` 뒤에 `scripts/prepare-sites-build.mjs`를 실행합니다.
- 이 스크립트는 `dist/.openai/hosting.json`과 `dist/server/index.js`를 준비합니다.
- `npm run capture:site`는 기본적으로 `https://erutyhomepage.vercel.app/`를 기준으로 11개 공개 경로를 캡처합니다.
- 다른 URL을 대상으로 캡처하려면 `CAPTURE_BASE_URL` 환경변수를 사용합니다.

## 6. 라우팅과 페이지 역할

라우팅 정의는 `src/app/App.tsx`에 있습니다.

- `/`
  `src/app/pages/HomePage.tsx`
  메인 홈페이지입니다. 현재 섹션 구성은 `Hero -> Statement -> Business Fields -> Technology -> Case Showcase -> Final CTA`입니다. 메인 전용 리소스 섹션은 현재 렌더링되지 않습니다.
- `/company/about`
  `src/app/pages/company/AboutPage.tsx`
  회사 소개, 정체성, 시작 배경, 주요 여정, CTA를 담는 페이지입니다.
- `/company/global-network`
  `src/app/pages/company/GlobalNetworkPage.tsx`
  국가별 시장, 권역, 파트너십 구조, 글로벌 활동 현황을 보여주는 페이지입니다.
- `/company/team`
  `src/app/pages/company/TeamPage.tsx`
  리더십과 팀 구조를 소개하는 페이지입니다.
- `/company/growth`
  `src/app/pages/company/GrowthPage.tsx`
  현재 코드 기준으로는 공개 프로젝트를 소개하는 `Projects` 페이지입니다.
- `/company/careers`
  `src/app/pages/company/CareersPage.tsx`
  채용, 업무 방식, 상시 지원 흐름을 담는 페이지입니다.
- `/services/hitpick`
  `src/app/pages/services/hitpick/HitpickPage.tsx`
  글로벌 콘텐츠·비즈니스 서비스 `Hitpick` 소개 페이지입니다.
- `/services/erumter`
  `src/app/pages/services/erumter/ErumterPage.tsx`
  AX 전환·자동화 서비스 `Erumter` 소개 페이지입니다.
- `/technology`
  `src/app/pages/TechnologyPage.tsx`
  기술 아키텍처와 기술 기반을 설명하는 페이지입니다.
- `/resources`
  `src/app/pages/ResourcesPage.tsx`
  사례, 기회, 인사이트, 프로그램, 뉴스, 다운로드를 담는 리소스 허브입니다.
- `/start-a-project`
  `src/app/pages/StartProjectPage.tsx`
  프로젝트 문의 폼 페이지입니다.
- `*`
  `src/app/pages/NotFoundPage.tsx`
  404 fallback 페이지입니다.

## 7. 주요 파일 구조

```text
.
├─ public/
├─ scripts/
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
├─ .github/workflows/
├─ .openai/
├─ index.html
├─ package.json
├─ package-lock.json
└─ vercel.json
```

작업 시 자주 보는 파일:

- `src/app/App.tsx`
  전체 라우터와 공통 레이아웃 진입점입니다.
- `src/app/context/LanguageContext.tsx`
  `ko` / `en` 전환 상태를 관리하며 `localStorage`의 `eruty-lang` 키를 사용합니다.
- `src/app/components/Header.tsx`
  상단 네비게이션과 언어 전환 진입점입니다.
- `src/app/components/Footer.tsx`
  하단 링크와 공통 CTA 영역입니다.
- `src/app/data/companyMetrics.ts`
  공통 회사 지표 데이터입니다.
- `src/app/data/openPositions.ts`
  채용 공고 데이터입니다. `status: "published"`만 공개 화면에 표시됩니다.
- `src/app/data/inquiryOptions.ts`
  프로젝트 문의 서비스·유형 옵션과 `/start-a-project` 쿼리 매핑 데이터입니다.
- `src/services/inquiry.ts`
  프로젝트 문의 제출 로직입니다.
- `src/services/careers.ts`
  채용 지원 제출 로직입니다.
- `scripts/capture-site.mjs`
  배포 사이트 스크린샷 캡처 스크립트입니다.
- `scripts/prepare-sites-build.mjs`
  `dist` 산출물에 `.openai/hosting.json`과 서버 엔트리를 추가하는 빌드 후처리 스크립트입니다.
- `.github/workflows/capture-site.yml`
  main 기준 화면 캡처 QA workflow입니다.
- `vercel.json`
  Vercel SPA rewrite 설정 파일입니다.
- `.env.example`
  현재 프런트엔드에서 사용하는 선택적 환경변수 예시입니다.

## 8. 환경변수

현재 프런트엔드 빌드에 필수 환경변수는 없습니다. `.env.example`에는 선택적 토글과 향후 API 연동용 placeholder만 정의되어 있습니다.

현재 확인된 항목:

- `VITE_APP_ENV`
- `VITE_ENABLE_MOCK_SUBMISSIONS`
- `VITE_INQUIRY_API_BASE_URL`
- `VITE_INQUIRY_API_KEY`
- `VITE_CAREERS_API_BASE_URL`
- `VITE_CAREERS_API_KEY`
- `VITE_UPLOAD_MAX_FILE_MB`

## 9. 콘텐츠·데이터 수정 원칙

- 한국어/영어 문구는 같은 위치에서 함께 관리합니다.
- 공통 회사 수치가 필요하면 먼저 `src/app/data/companyMetrics.ts` 사용 여부를 확인합니다.
- 확인되지 않은 매출, 성과, 파트너, 프로젝트명, 시장 실적을 새로 추가하지 않습니다.
- 공개 여부가 필요한 데이터는 기존 visibility/status 구조를 유지합니다.
- 프로젝트와 리소스는 `published` / `draft` / `hidden` 패턴을 우선 확인합니다.
- 채용 공고는 `src/app/data/openPositions.ts`에서 `status: "published"`만 노출됩니다.
- 대표 이미지, 예시 데이터, 빈 상태 문구는 실제 데이터처럼 보이지 않게 유지합니다.
- 사용자가 특정 섹션만 수정해 달라고 요청하면 해당 섹션과 직접 연결된 데이터만 수정합니다.
- 요청이 없으면 메인 페이지 섹션 순서, Header, Footer, 공통 스타일 파일을 건드리지 않습니다.

## 10. 문의·채용 폼 메모

현재 문의와 채용 제출은 기본적으로 mock 동작입니다.

- `src/services/inquiry.ts`
  `submitInquiry()`는 성공 시 `mode: "mock"` 결과를 반환합니다.
- `src/services/careers.ts`
  `submitCareerApplication()`도 `mode: "mock"` 결과를 반환합니다.
- `VITE_ENABLE_MOCK_SUBMISSIONS !== "false"`일 때 mock 모드가 유지됩니다.
- 실제 API를 붙일 경우 위 두 서비스 파일과 `.env.example`의 reserved 필드를 함께 검토해야 합니다.

## 11. 배포와 운영

현재 운영 기준 배포는 Vercel입니다.

- Production URL: [https://erutyhomepage.vercel.app/](https://erutyhomepage.vercel.app/)
- Vercel 설정 파일: `vercel.json`
- 출력 디렉터리: `dist`
- SPA rewrite: 모든 경로를 `/index.html`로 rewrite

2026년 8월 2일 확인 기준 상태:

- GitHub `main` 최신 SHA: `b195526cc3adae1e34a461121011dab03e571e2c`
- 최신 Production 배포 SHA: `ea9ae686a74ba19a9677f2cfd085b52ab3841abc`
- 최신 Preview 배포 SHA: `17ff03e663b78ac5663f4bb18933aa8ff96ded71`

즉, 확인 시점 기준 Production은 최신 `main`과 동일하지 않습니다.  
배포 화면을 기준으로 작업할 때는 “현재 main 코드”와 “현재 production 화면”이 완전히 같다고 가정하면 안 됩니다.

운영 메모:

- 현재 `index.html`에는 `<meta name="robots" content="noindex, nofollow" />`가 포함되어 있습니다.
- Production HTML도 같은 robots 메타를 포함한 상태로 확인되었습니다.
- 공개 SEO 운영 전에는 이 설정이 의도된 상태인지 반드시 다시 확인해야 합니다.

## 12. GitHub Actions 화면 캡처 검수

스크린샷 검수 workflow:

- 이름: `Capture Site Screenshots`
- 파일: `.github/workflows/capture-site.yml`
- 트리거: `push` to `main`, `workflow_dispatch`
- 실행 환경: `Node.js 24`
- 주요 단계:
  - `npm ci`
  - `npx playwright install --with-deps chromium`
  - `npm run capture:site`
  - artifact `eruty-site-screenshots` 업로드

캡처 기준:

- Desktop: `1440 x 1000`
- Mobile: `390 x 844`
- 대상 경로: 홈, 회사 5개, 서비스 2개, 기술, 리소스, 프로젝트 문의까지 총 11개 공개 경로

2026년 8월 2일 확인 기준 최신 성공 run:

- Run URL: [https://github.com/kimue7057/ERUTY_HOMEPAGE/actions/runs/30754768998](https://github.com/kimue7057/ERUTY_HOMEPAGE/actions/runs/30754768998)
- 결과: `success`
- Head SHA: `b195526cc3adae1e34a461121011dab03e571e2c`

## 13. 현재 main 기준 반영 상태

아래 내용은 코드 기준 메모이며, Production 반영 여부와는 별도로 확인해야 합니다.

- 메인 페이지는 현재 `Hero -> Statement -> Business Fields -> Technology -> Case Showcase -> Final CTA` 순서입니다.
- 메인 전용 빈 리소스 섹션은 렌더링되지 않습니다.
- `HomePage.tsx`의 statement 구간에는 글로벌 활동 쇼케이스가 포함되어 있습니다.
- `src/app/data/companyMetrics.ts`의 공통 지표를 메인과 글로벌 네트워크 등에서 참조합니다.
- `/company/growth` 라우트는 현재 코드 기준 `Projects` 페이지입니다.
- `ResourcesPage`와 일부 프로젝트/채용 데이터는 공개 여부 필드에 따라 비어 있는 섹션 또는 빈 상태를 보여줄 수 있습니다.

## 14. 여러 브랜치 / worktree / Codex 세션 협업 수칙

작업 시작 전에 아래를 먼저 확인합니다.

```bash
git fetch origin
git status -sb
git branch -vv
git worktree list
```

협업 원칙:

- 다른 세션의 브랜치가 이미 `main`에 머지됐다고 가정하지 않습니다.
- 현재 작업 범위와 직접 관련된 파일만 수정합니다.
- 다른 작업자의 변경을 되돌리기 위해 `git reset --hard`, `git clean -fd`, `git checkout -- .`, `git restore .`, `git stash`, 강제 push를 사용하지 않습니다.
- 여러 작업을 통합할 때는 완료가 확인된 커밋만 `cherry-pick` 또는 PR로 합칩니다.
- 충돌이 생기면 파일 전체를 한쪽 버전으로 덮어쓰지 말고, 실제 완료된 변경만 수동 병합합니다.
- UI 변경 후에는 최소 `npm run typecheck`, `npm run lint`, `npm run build`를 다시 실행합니다.
- 화면 영향이 큰 변경은 `npm run capture:site` 또는 GitHub Actions screenshot workflow까지 확인합니다.

## 15. 남은 확인사항

- Production Vercel 배포 SHA가 최신 `main` SHA와 다릅니다. 최신 `main` 내용이 실제 운영 화면에 모두 반영됐는지 별도 확인이 필요합니다.
- 특히 `/company/growth`는 코드 기준으로 `Projects` 페이지이지만, Production이 뒤처져 있으면 이전 성장/신뢰 화면이 보일 수 있습니다.
- 현재 robots 메타가 `noindex, nofollow` 상태이므로, 공개 검색 노출이 필요한 시점에는 별도 점검이 필요합니다.
- 새로운 작업을 시작할 때는 이전 대화 기록보다 현재 `main` 코드와 실제 배포 화면을 먼저 확인합니다.
