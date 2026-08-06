# ERUTY Homepage

ERUTY의 회사, 서비스, 기술, 프로젝트, 채용 및 문의 정보를 제공하는 공식 홈페이지입니다.

- Production: [https://erutyhomepage.vercel.app/](https://erutyhomepage.vercel.app/)
- Repository: [https://github.com/kimue7057/ERUTY_HOMEPAGE](https://github.com/kimue7057/ERUTY_HOMEPAGE)
- Production 정리 전 체크포인트: `production-2026-08-03-pre-cleanup`
- 현재 인수인계 체크포인트: `handoff-2026-08-03`

## 현재 프로젝트 상태

- 마지막 확인일: 2026-08-03
- 기준 브랜치: `main`
- 기능 구현 기준 커밋: `286c9e2b9256125a1debaf48764c38afbc96ba73`
- 인수인계 기준점: 최종 README 커밋을 가리키는 annotated tag `handoff-2026-08-03`
- Production: [https://erutyhomepage.vercel.app/](https://erutyhomepage.vercel.app/)
- 현재 코드와 Production의 일치 여부: 기능 구현 커밋 기준 일치 확인. 최종 README 커밋 배포와 캡처 워크플로 결과는 GitHub의 최신 `main` 실행에서 확인합니다.

### 현재 공개 페이지

`src/app/App.tsx`와 `scripts/capture-site.mjs`에서 확인한 공개 라우트입니다.

| 경로 | 구현 파일 | 현재 상태 |
| --- | --- | --- |
| `/` | `src/app/pages/HomePage.tsx` | 구현 완료 · 글로벌 활동 인터랙션과 회사 지표 포함 |
| `/company/about` | `src/app/pages/company/AboutPage.tsx` | 구현 완료 · 회사 연혁, 인증·특허, 거점 정보 반영 |
| `/company/team` | `src/app/pages/company/TeamPage.tsx` | 구현 완료 · 리더십 4인과 선택 인터랙션 반영 |
| `/company/growth` | `src/app/pages/company/GrowthPage.tsx` | 구현 완료 · 11개 프로젝트, 필터, 상세 Drawer 반영 |
| `/company/careers` | `src/app/pages/company/CareersPage.tsx` | 구현 완료 · 공개 채용 공고 없음, 상시 지원은 이메일 API 제출 |
| `/services/hitpick` | `src/app/pages/services/hitpick/HitpickPage.tsx` | 구현 완료 · 실행 슬라이더, 시장 신호, 블록체인 신뢰 영역 포함 |
| `/services/erumter` | `src/app/pages/services/erumter/ErumterPage.tsx` | 구현 완료 · AX 과정, 교육, 솔루션, Before/After 포함 |
| `/technology` | `src/app/pages/TechnologyPage.tsx` | 구현 완료 · 3개 기술 축과 코드 기반 제품형 UI 목업 포함 |
| `/resources` | `src/app/pages/ResourcesPage.tsx` | 구현 완료 · 실제 뉴스 10건과 연구·발표 9건을 뉴스룸·연구 아카이브로 제공 |
| `/start-a-project` | `src/app/pages/StartProjectPage.tsx` | 구현 완료 · 2단계 폼, 파일 첨부, Resend 문의 제출 API 연동 |

`/company/global-network`는 현재 공개 라우트에 없으며 복원 대상이 아닙니다. 그 밖의 경로는 공통 Not Found 화면으로 연결됩니다.

### 현재 구현 상태

- **완료 — 공통 디자인 시스템:** `PageContainer`, `PageHeading`, `SectionHeading`, 76px Header 오프셋, 1280px 기본 컨테이너, 공통 타이포그래피·간격 토큰을 사용합니다.
- **완료 — 다국어:** 한국어·영문 전환을 제공하며 선택값은 `localStorage`의 `eruty-lang`에 저장됩니다.
- **완료 — Header:** 회사·서비스 메가 메뉴와 기술·리소스 직접 이동, 서비스별 배경 이미지와 반응형 모바일 내비게이션이 구현되어 있습니다.
- **완료 — 회사 소개:** 2022~2026 연혁, 부산·서울 거점, 벤처기업 인증, 기업부설연구소, 특허 현황이 반영되어 있습니다.
- **완료 — 팀·리더십:** 김유성, 박상일, 김진혁, 이기홍 4인의 데이터와 리더 선택 UI가 반영되어 있습니다.
- **완료 — 프로젝트:** Featured 1개를 포함한 공개 프로젝트 11개, 카테고리 필터와 상세 Drawer가 구현되어 있습니다.
- **완료 — Hitpick:** 시네마틱 영상 Hero, 서비스 소개, 실행 구조, 기술 엔진, 시장 신호, 파트너 역할, 블록체인 신뢰 레이어와 인터랙션이 구현되어 있습니다.
- **완료 — 이룸터:** AX 전환 과정, 교육, 솔루션, Before/After 및 반응형 Process가 구현되어 있습니다.
- **완료 — 기술:** 글로벌 마켓 인텔리전스, AX 실행·자동화 오케스트레이션, 블록체인 신뢰·권리·정산 레이어와 React 기반 UI 목업이 구현되어 있습니다.
- **완료 — 리소스:** 뉴스룸 최신 뉴스 3건과 이전 소식 7건, 연구·발표 9건과 유형 필터가 구현되어 있습니다.
- **완료 — 문의 제출:** 프로젝트 문의 폼은 `/api/inquiries`에서 재검증되며, 첨부파일과 함께 Resend를 통해 문의 담당 메일로 전달됩니다.
- **완료 — 채용 제출:** 상시 지원 폼은 `/api/careers`에서 재검증되며, 첨부파일과 함께 Resend를 통해 채용 담당 메일로 전달됩니다. 운영 환경변수 설정이 필요합니다.
- **완료 — 화면 캡처와 배포:** Vercel의 `main` 자동 배포와 GitHub Actions의 데스크톱·모바일 10개 경로 캡처가 구성되어 있습니다.

### 최근 반영된 주요 변경

최근 20개 커밋과 현재 코드를 함께 확인한 결과입니다.

- 공통 컨테이너, Header 오프셋, Page Title과 Home Display 역할을 정리했습니다.
- 공통 `SectionHeading`과 H2·H3·Card Title·Body·Meta 토큰으로 10개 공개 페이지의 내부 타이포그래피와 수직 리듬을 통일했습니다.
- 모바일 강제 줄바꿈, 한글 상태값 폰트, Home 대형 패널 제목, Hitpick 모바일 신뢰 흐름을 실제 화면 기준으로 보정했습니다.
- 회사 소개·리더십·회사 지표와 관련 이미지 데이터를 반영했습니다.
- Home 글로벌 활동 인터랙션의 의도하지 않은 자동 이동을 수정했습니다.
- Hitpick, 이룸터, Technology 개편 내용을 `main`에 통합하고 제거된 Global Network 라우트를 유지했습니다.
- Hitpick에 물류·무역 및 콘텐츠·권리 블록체인 신뢰 레이어를 추가했습니다.
- 프로젝트 페이지를 11개 실제 프로젝트 데이터와 자체 제작 콘셉트 목업 이미지로 완성했습니다.
- Playwright 기반 10개 공개 경로 캡처와 GitHub Actions Artifact 워크플로를 정리했습니다.

### 현재 데이터 상태

- **회사 기본정보:** 2022년 설립, 부산·서울 거점, 벤처기업 인증, 기업부설연구소 정보가 코드에 반영되어 있습니다.
- **매출 데이터:** 2024년 5억 원, 2025년 7.5억 원이 반영되어 있습니다.
- **공개 지표:** 글로벌 파트너 20+, 크리에이터 100+가 반영되어 있습니다.
- **특허 데이터:** 등록 2건, 출원 1건이 반영되어 있습니다.
- **리더십:** 4명입니다.
- **프로젝트:** 11개가 `published`이며 글로벌 브랜드 사업화 프로젝트가 Featured입니다.
- **프로젝트 이미지:** 11개 모두 `public/images/projects/`의 1600×1000 WebP 콘셉트 목업입니다.
- **서비스 데이터:** Hitpick과 이룸터의 소개·과정·기술·적용 내용이 각 서비스 페이지에 반영되어 있습니다.
- **리소스 데이터:** 뉴스 10건과 로컬 대표 이미지 10건, 연구·발표 9건이 한국어·영문으로 공개됩니다.

프로젝트 목록:

1. 글로벌 브랜드 사업화 프로젝트
2. 3D 마켓플레이스 구축
3. 마음돌봄 서비스 개발
4. 블록체인 기반 콘텐츠 저작권 관리·거래 시스템
5. 생성형 AI 기반 감정 분석 시스템
6. 블록체인 물류 브랜딩 시스템
7. 스마트워치·골프화 연동 ICT 앱 서비스 개발
8. 하자보수·아파트 관리 앱 서비스 개발
9. AR·VR 웹·앱 서비스 개발
10. 이룸터 AX 업무 자동화 교육 프로그램
11. 이룸터 AX 기반 금융 자동화 교육

### 현재 미완료 및 다음 작업

- Vercel 운영 환경에 Resend 발신자·수신자 환경변수 설정
- 공개 채용 공고 데이터 확정
- 프로젝트의 실제 현장 이미지·연도·정량 성과를 공개할 수 있는지 확인 후 선택적으로 교체·보강
- 개인정보처리방침과 이용약관 페이지 및 Footer 링크 연결
- `index.html`의 `noindex, nofollow` 제거 여부와 검색 노출·SEO 운영 정책 결정
- 외부 URL을 사용하는 일부 리더 프로필 이미지를 저장소 자산으로 전환할지 검토
- `npm audit`에서 보고되는 high 취약점 2건의 영향도 검토 및 안전한 의존성 업데이트

### 알려진 제한사항

- 문의와 채용 제출은 Vercel 서버리스 API와 Resend를 사용하며 첨부파일은 최대 3MB까지 허용합니다.
- 프로젝트 이미지는 실제 현장 사진이 아니라 프로젝트 이해를 위한 자체 제작 콘셉트 목업입니다.
- 프로젝트 연도·고객사·정량 성과는 확인되지 않은 값을 만들지 않기 위해 공개 데이터에 포함하지 않았습니다.
- 뉴스 대표 이미지는 저장소의 로컬 WebP를 사용하고, 원문 열람 링크는 각 외부 기사 URL에 의존합니다.
- 채용 공고 배열은 비어 있어 공개 포지션이 없습니다.
- 일부 팀 프로필 이미지는 외부 `www.eruty.co.kr` URL에 의존합니다.
- 검색 엔진 robots 설정은 현재 `noindex, nofollow`입니다.
- 다른 로컬 worktree에는 `main`에 통합되지 않은 고유 변경이나 캡처 파일이 남아 있습니다. 인수인계 기준은 이 README의 `main`과 체크포인트 태그이며, 다른 worktree를 임의 삭제하면 안 됩니다.

## 기술 스택

- React 18
- TypeScript
- Vite 6
- React Router 7
- Tailwind CSS 4
- Motion
- Lucide React
- Playwright
- Vercel

권장 Node.js 버전은 `package.json` 기준 `24.x`입니다. 의존성 재현은 `package-lock.json`을 사용하는 `npm ci`를 기준으로 합니다.

## 디렉터리 구조

```text
src/
├─ app/
│  ├─ components/       공통 UI
│  ├─ context/          전역 상태와 언어
│  ├─ data/             공통 데이터
│  └─ pages/            페이지와 페이지 전용 컴포넌트
├─ assets/              번들에 포함되는 이미지와 영상
├─ services/            문의·채용 제출 로직
└─ styles/              전역 스타일과 디자인 토큰

public/images/          정적 공개 이미지
scripts/                빌드 준비와 화면 캡처 도구
.github/workflows/      GitHub Actions 화면 캡처
```

## 환경 변수

`.env.example`에는 서버 전용 변수만 정의되어 있습니다.

- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `INQUIRY_NOTIFICATION_EMAIL`
- `CAREERS_NOTIFICATION_EMAIL`

`RESEND_FROM_EMAIL`에는 Resend에서 인증한 도메인의 발신 주소를 사용해야 합니다. 문의와 채용 API는 브라우저에 키를 노출하지 않으며, 첨부파일은 Vercel Functions의 요청 제한을 고려해 최대 3MB까지 허용합니다.

## 다른 컴퓨터에서 작업 이어가기

### 처음 저장소를 받는 경우

```bash
git clone https://github.com/kimue7057/ERUTY_HOMEPAGE.git
cd ERUTY_HOMEPAGE
git fetch origin --tags
git switch main
git pull --ff-only origin main
npm ci
```

### 기존 저장소가 있는 경우

```bash
cd ERUTY_HOMEPAGE
git status -sb
git fetch origin --tags
git switch main
git pull --ff-only origin main
npm ci
```

로컬 변경사항이나 추적되지 않은 파일이 있다면 삭제하지 말고 pull 전에 파일별로 확인합니다. `main` 전환이 막히면 변경을 덮어쓰지 말고 별도 브랜치·worktree 여부부터 확인합니다.

### 환경 변수

```bash
cp .env.example .env.local
```

PowerShell에서는 다음을 사용할 수 있습니다.

```powershell
Copy-Item .env.example .env.local
```

실제 API 키는 로컬에서만 설정하고 Git에 커밋하지 않습니다.

### 로컬 실행

```bash
npm run dev
```

### 작업 시작 전 확인

```bash
git status -sb
git log -10 --oneline
git describe --tags --always
git worktree list
```

체크포인트 상태로 시작하려면 `git show handoff-2026-08-03`으로 태그가 가리키는 커밋을 먼저 확인합니다. 일반 작업은 최신 `main`에서 시작합니다.

### 새 작업 브랜치

```bash
git switch -c work/[작업명]
```

### 필수 검증

```bash
npm run check
npm run typecheck
npm run lint
npm run build
```

화면 변경 시 Production Preview를 한 터미널에서 실행하고, 다른 터미널에서 캡처합니다.

```bash
npm run preview
CAPTURE_BASE_URL=http://127.0.0.1:4173 npm run capture:site
```

Windows PowerShell에서는 다음과 같이 실행합니다.

```powershell
$env:CAPTURE_BASE_URL = "http://127.0.0.1:4173"
npm run capture:site
```

포트가 이미 사용 중이면 해당 프로세스가 다른 worktree의 작업인지 먼저 확인하고, 임의 종료하지 말고 비어 있는 포트로 Preview와 `CAPTURE_BASE_URL`을 함께 변경합니다. `screenshots/` 결과는 로컬 QA 산출물이며 Git에 커밋하지 않습니다.

## 배포 절차

현재 배포 구조는 다음과 같습니다.

1. 변경 범위와 `git status`, `git diff`를 확인합니다.
2. 필수 검증과 로컬 캡처를 통과시킵니다.
3. 검증된 커밋을 `main`에 push합니다.
4. GitHub 연동 Vercel이 Production을 자동 배포합니다.
5. `.github/workflows/capture-site.yml`의 `Capture Site Screenshots`가 `main` push로 실행됩니다.
6. Vercel 배포 커밋과 `origin/main`이 같은지 확인합니다.
7. Actions Artifact `eruty-site-screenshots`의 `report.json`, desktop, mobile, About 상세 캡처를 확인합니다.

`vercel.json`은 Vite 빌드 결과 `dist`를 배포하고 모든 SPA 경로를 `index.html`로 rewrite합니다. 캡처 스크립트의 기본 대상은 Production이며, 1440×1000과 390×844에서 10개 공개 라우트를 검사합니다.

## 작업 안전 수칙

- `git reset --hard`를 사용하지 않습니다.
- `git clean -fd`를 사용하지 않습니다.
- `git push --force`와 `git push --force-with-lease`를 사용하지 않습니다.
- 다른 브랜치와 worktree를 임의 삭제하거나 이동하지 않습니다.
- 미커밋 파일과 추적되지 않은 이미지·캡처를 임의 삭제하지 않습니다.
- 데이터 수정과 디자인 변경을 관련 없는 하나의 커밋으로 묶지 않습니다.
- 확인되지 않은 회사 정보, 고객사, 연도, 성과와 수치를 추가하지 않습니다.
- mock 기능을 실제 API 연동 완료로 기록하지 않습니다.
- 콘셉트 이미지를 실제 현장 이미지로 설명하지 않습니다.
- `main` push 전 `git log origin/main..HEAD`와 `git diff origin/main...HEAD --stat`을 확인합니다.
