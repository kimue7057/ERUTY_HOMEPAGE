# ERUTY 디자인 시스템 인수인계

## 1. 작업 기준

- 작성 일시: 2026-08-04 22:31:28 (Asia/Seoul, UTC+09:00)
- Repository: `kimue7057/ERUTY_HOMEPAGE`
- 현재 브랜치: `refactor/home-design-system-pilot`
- 기준 브랜치: `origin/main`
- 작성 전 HEAD: `007316f2f82cb2d7e2e7517159ff46a262af700e`
- 기준 `origin/main`: `43eb02e642cf60887549c8948c453880972c43a1`
- Production: https://erutyhomepage.vercel.app/
- GitHub Actions Capture Site Screenshots: https://github.com/kimue7057/ERUTY_HOMEPAGE/actions/workflows/capture-site.yml

작성 시작 시 staged, unstaged, 일반 untracked 파일과 merge conflict는 없었다. 인수인계 문서 commit 전 구현 스택은 `origin/main`보다 3개 커밋 앞서고 0개 뒤져 있으며, 변경 범위는 91개 파일이다. 최종 handoff commit SHA와 원격 동기화 상태는 `git log -1`과 `git status -sb`로 확인한다.

| 순서 | Commit | 내용 | 상태 |
| ---: | --- | --- | --- |
| 1 | `4be467557d5d101af482373196d273b1e75e45be` | 모바일 Footer overflow 구조 수정 | 완료 |
| 2 | `2b3af8d38371456717f18d631a888ea629572af3` | Foundation 코드화와 동등성 감사 | 완료 |
| 3 | `007316f2f82cb2d7e2e7517159ff46a262af700e` | Home Foundation pilot과 가독성 검증 | 완료 |

## 2. 완료된 작업과 산출물 상태

### 재현 가능한 완료 작업

1. 모바일 Footer overflow 수정
   - 운영 코드: `src/app/components/Footer.tsx`
   - 감사: `scripts/audit-footer-overflow.mjs`
   - 데이터: `reports/footer-overflow/`
2. Foundation 코드화
   - 명세: `docs/design-system-foundation.md`
   - 공통 API: `Button`, `Card`, `PageContainer`, `PageHeading`, `Section`
   - 감사: `scripts/audit-design-foundation.mjs`
   - 동등성 비교: 6개 경로 × 2 viewport, 12/12 성공
3. Home 시범 적용
   - 운영 코드: `src/app/pages/HomePage.tsx`, `src/app/pages/HomePage.css`
   - 보고서: `docs/home-design-system-pilot.md`
   - 감사: `scripts/audit-home-design-system-pilot.mjs`
   - 비교: 5 viewport × 2 언어의 Home 10조건과 회귀 10조건

### 선행 감사 요약만 존재하는 항목

`docs/design-system-foundation.md`에는 선행 감사 결과가 57개 소스 파일, 4,758개 스타일 발생, 고유 font-size 59개, 고유 spacing 118개, Tailwind arbitrary value 298회/195종으로 요약돼 있다.

그러나 다음 원본 산출물은 현재 브랜치와 로컬 Git ref에서 확인되지 않았다.

- `docs/design-system-audit.md`
- `docs/design-system-root-impact.md`
- `docs/design-system-spec-draft.md`
- `reports/design-system/source-style-inventory.json`
- `reports/design-system/rendered-style-inventory.json`
- Root Size A/B/C 원본 데이터와 스크린샷
- `scripts/audit-root-size-impact.mjs`
- `audit:design:root-impact` npm script

따라서 선행 감사 수치는 Foundation 명세의 근거 요약으로 사용할 수 있지만, 이 브랜치만으로 초기 전수 감사와 Root Size A/B/C 실험을 독립적으로 재실행할 수 있다고 기록해서는 안 된다.

## 3. 현재 파일 범위

인수인계 문서 추가 전 `origin/main...007316f` 기준 분류다. 이 문서를 포함하면 문서 파일이 1개 추가된다.

| 범주 | 파일 수 | 주요 내용 |
| --- | ---: | --- |
| 문서 | 2 | Foundation 명세, Home pilot 보고서 |
| 디자인 시스템 감사 데이터 | 5 | Foundation audit/equivalence, Home before/after/comparison |
| 기타 감사 데이터 | 3 | Footer README와 before/after measurements |
| 감사·캡처 스크립트 | 5 | Foundation, Footer, Home pilot, 사이트 캡처 |
| 설정 | 1 | `package.json` 감사 npm script |
| 운영 코드 | 9 | Footer, Foundation 공통 컴포넌트, Home, theme |
| 추적 스크린샷 | 66 | Foundation 24, Footer 10, Home pilot 32 |

`index.html`, Vite/PostCSS 설정, `package-lock.json`에는 기준 브랜치 대비 변경이 없다. 운영 코드 변경은 이전 단계에서 승인된 Footer 수정, Foundation 코드화, Home pilot뿐이다. 이번 인수인계 작업에서는 UI, 콘텐츠, 이미지, 영상, 애니메이션을 추가로 변경하지 않는다.

## 4. 주요 측정 결과

### 선행 감사 요약

| 항목 | 값 | 근거 |
| --- | ---: | --- |
| 조사 소스 파일 | 57 | `docs/design-system-foundation.md`의 선행 감사 요약 |
| 스타일 발생 | 4,758 | 동일 |
| 고유 font-size | 59 | 동일 |
| 고유 spacing | 118 | 동일 |
| arbitrary occurrence | 298 | 동일 |
| arbitrary 고유 class | 195 | 동일 |

초기 원본 inventory가 현재 브랜치에 없으므로 위 수치를 재계산한 최신 수치로 오인하지 않는다.

### 현재 Foundation 감사

| 항목 | 값 |
| --- | ---: |
| 스캔 파일 | 58 |
| arbitrary occurrence | 251 |
| arbitrary 고유값 | 171 |
| 일반 페이지 occurrence | 98 |
| 서비스·목업 예외 occurrence | 153 |
| namespace boundary review | 6 |
| direct value review | 10 |

### 렌더링·회귀 비교

| 감사 | 조건/행 | 성공 | 실패·오류 |
| --- | ---: | ---: | ---: |
| Foundation equivalence | 12 | screenshot 12/12, metric difference 0 | overflow/error 0 |
| Home pilot before | 20 | 렌더링 20, screenshot 40 | overflow/error/H1 오류 0 |
| Home pilot after | 20 | 렌더링 20, screenshot 40 | overflow/error/H1 오류 0 |
| Home comparison | 20 | 회귀 screenshot 10/10 | after root overflow 0 |
| Footer after | 22 | 렌더링 22 | overflow/offender/error 0 |

Home 소스의 Tailwind arbitrary 값은 pilot 전 23회/15종에서 9회/9종으로 감소했다. 남은 값은 visual stage, 비대칭 grid, 의도적 내부 horizontal scroll 예외다.

## 5. 확정 결정 기록

날짜: 2026-08-04

대상: 홈페이지 디자인 시스템 감사 요약, Foundation, Home pilot, 모바일 Footer overflow

### Root와 typography

- 단기적으로 `html 17px`, `body 1rem`을 유지한다.
- 장기적으로 `html 16px + body 17px`의 단계적 전환을 검토할 수 있다.
- 단순 root 변경은 금지한다. Typography만 보정해도 Button, Card, Gap 축소가 남으므로 component token과 별도 회귀 검증이 필요하다.
- 일반 typography role과 service/mockup typography를 분리한다.

### Spacing과 component

- PageHeading, SectionHeading, PageContainer, Section, Card, Button이 내부 spacing 책임을 소유한다.
- 일반 페이지의 신규 arbitrary typography/spacing과 공통 container 직접값은 추가하지 않는다.
- Foundation API는 Home pilot까지 적용됐다. 일반 하위 페이지 전체에는 아직 확대 적용하지 않았다.

### 예외 정책

- Hitpick: `service-hitpick-*`
- Erumter: `service-erumter-*`
- Technology 축척 UI: `mockup-*`
- illustration, decorative label, 내부 horizontal scroll은 별도 namespace로 관리한다.
- 일반 페이지와 서비스 narrative/목업을 동일 규칙으로 강제하지 않는다.

### 배포·검수 상태

- 관련 구현 commit: `4be4675`, `2b3af8d`, `007316f`
- Vercel 배포: 이 브랜치에서는 수행하지 않음
- Production: 이 브랜치 작업으로 변경하지 않음
- GitHub Actions: feature branch push로는 실행되지 않음. workflow는 `main` push 또는 수동 실행만 지원한다.
- 로컬 화면 검수: Foundation 12조건, Home 20조건, Footer 22조건 완료

저장소에 별도 decision log가 없어 이 절을 공식 인수인계 결정 기록으로 사용한다.

## 6. 모바일 Footer overflow 결과

### 원인

- Production 390px에서 여러 경로가 `scrollWidth 394 / clientWidth 390`이었다.
- 직접 원인은 모바일에도 유지된 Footer 12-column grid와 11개의 `gap-8`이었다.
- Header 394px은 원인이 아니라 확장된 containing block을 따라간 결과였다.
- `overflow-x: hidden`이나 root 16px로 현상을 가리는 방식은 구조적 해결로 인정하지 않는다.

### 변경

| 항목 | 변경 전 | 변경 후 |
| --- | --- | --- |
| Mobile Footer top grid | 12개 0폭 track + 11×34px gap | 1개 350px track |
| Child placement | `col-span-12` | auto placement + `min-w-0` |
| Desktop | 12-column, 3/6/3 | `lg` 이상에서 동일 유지 |

변경 파일은 `src/app/components/Footer.tsx`, 관련 commit은 `4be467557d5d101af482373196d273b1e75e45be`다. 11개 경로 × mobile/desktop의 22조건에서 mobile 390/390, desktop 1440/1440, Footer offender 0, console/page error 0을 확인했다. Home과 Hitpick의 의도적인 내부 horizontal scroll은 유지된다.

## 7. 스크린샷과 로컬 산출물

### Git 추적 중

| 경로 | 파일 수 | 용량 |
| --- | ---: | ---: |
| `screenshots/design-system-foundation/` | 24 | 6.00MB |
| `screenshots/footer-overflow/` | 10 | 0.85MB |
| `screenshots/home-design-system-pilot/` 대표본 | 32 | 7.32MB |
| 합계 | 66 | 14.16MB |

이미 추적 중인 파일은 인수인계 과정에서 제거하지 않는다.

### Git에 포함하지 않는 로컬 전용 파일

| 경로 | 파일 수 | 용량 | 처리 |
| --- | ---: | ---: | --- |
| `screenshots/home-design-system-pilot/` 비대표본 | 48 | 28.52MB | `.gitignore` 유지, 필요 시 재생성 |
| `screenshots/home-pilot-site-capture/` | 32 | 38.46MB | 전체 사이트 로컬 캡처, Git 제외 |
| `screenshots/design-system-root-impact/` | 0 | 0 | 현재 작업 디렉터리에 없음 |

전체 로컬 전용 스크린샷은 80개, 66.98MB다. 대용량 원본은 이미 추적된 대표본을 제외하고 Git에 추가하지 않는다. `node_modules`, `dist`, 로그, 브라우저 캐시도 Git에 포함하지 않는다.

재생성 명령:

```bash
npm run build
npm run preview -- --host 127.0.0.1 --port 4173
HOME_PILOT_BASE_URL=http://127.0.0.1:4173 HOME_PILOT_LABEL=after npm run audit:design:home-pilot
CAPTURE_BASE_URL=http://127.0.0.1:4173 CAPTURE_OUTPUT_DIR=screenshots/home-pilot-site-capture npm run capture:site
```

PowerShell에서는 환경변수를 `$env:HOME_PILOT_BASE_URL=...` 형식으로 설정한다. GitHub Actions의 `Capture Site Screenshots` workflow는 Production 전체 캡처를 `eruty-site-screenshots` artifact로 보관한다.

## 8. 보류·알려진 문제·다음 작업

### 보류

- 일반 하위 페이지로 Foundation 확대 적용
- Technology 목업 정리
- Hitpick·Erumter CSS namespace 정리
- 16px root 전환
- Global Network 페이지 구현
- 디자인 감사 CI 강제 적용
- 누락된 초기 감사와 Root Size A/B/C 원본 산출물 복구 또는 재생성

### 알려진 문제

- `/company/global-network`는 현재 Not Found UI를 렌더링한다.
- Technology에 7–11px 축척 목업 글자가 존재한다.
- Hitpick과 Erumter의 독립 CSS 규모가 크다.
- Foundation Button/Card/Spacing은 Home 외 일반 페이지에 아직 폭넓게 적용되지 않았다.
- 17px root에서 Tailwind rem spacing이 8.5px, 12.75px, 25.5px 등 소수점 px로 계산된다.
- 초기 감사와 Root Size 원본이 현재 브랜치에 없어 해당 실험의 완전한 재현성이 남은 확인사항이다.

### 다음 작업 하나

`ERUTY 디자인 시스템 5차 작업: 일반 하위 페이지 1개 Foundation 시범 적용 및 가독성 검증`

Careers 또는 Team 중 한 페이지를 먼저 선택하고, Home과 동일한 before/after audit, 한국어/영어, 360–1440px 검증을 완료한 뒤 다른 페이지로 확대한다. Root Size 16px 전환, 서비스 CSS 정리와 Technology 목업 수정은 이 단계에 결합하지 않는다.

## 9. 다른 컴퓨터에서 이어가기

### 새로 clone

```bash
git clone https://github.com/kimue7057/ERUTY_HOMEPAGE.git
cd ERUTY_HOMEPAGE
git fetch origin
git checkout refactor/home-design-system-pilot
git pull --ff-only origin refactor/home-design-system-pilot
npm install
npm run typecheck
npm run lint
npm run build
npm run audit:design
git status
```

### 기존 clone

```bash
git fetch origin
git checkout refactor/home-design-system-pilot
git pull --ff-only origin refactor/home-design-system-pilot
npm install
npm run typecheck
npm run lint
npm run build
git status
```

Node.js 24.x를 사용한다. 다음 작업을 시작하기 전에 `git status`가 clean인지, 로컬 HEAD와 `origin/refactor/home-design-system-pilot`이 일치하는지 확인한다.

Footer audit을 다시 실행하려면 local production preview를 띄운 뒤 다음을 사용한다.

```bash
FOOTER_AUDIT_BASE_URL=http://127.0.0.1:4173 npm run audit:footer-overflow
```

현재 브랜치에는 `audit:design:root-impact`가 없으므로 해당 명령을 실행 목록에 추가하거나 성공했다고 기록하지 않는다.

## 10. 인수인계 마무리 검증

2026-08-04에 다음을 실행했다.

| 명령 | 결과 | 비고 |
| --- | --- | --- |
| `npm install` | 성공 | 282 packages audit, 기존 high severity vulnerability 2건 경고 |
| `npm run typecheck` | 성공 | TypeScript error 0 |
| `npm run lint` | 성공 | warning 허용 0 설정에서 통과 |
| `npm run build` | 성공 | Vite production build와 Sites 준비 완료 |
| `npm run audit:design` | 성공 | 58 files, arbitrary 251회/171종 |
| `npm run audit:design:root-impact` | 미실행 | 현재 브랜치에 script 없음 |
| `npm run audit:footer-overflow` | 성공 | 22조건, root overflow/offender/console/page error 0 |
| `git diff --check` | 성공 | conflict marker와 trailing whitespace 없음 |

감사 재실행으로 생성된 report timestamp와 local preview port만의 diff는 기존 측정 수치가 동일함을 확인한 뒤 commit에서 제외했다. `npm install`이 npm 버전 차이로 변경한 optional package의 `libc` metadata도 애플리케이션 dependency 변경이 아니므로 기존 `package-lock.json` 상태를 유지했다. 보안 경고는 이번 문서화 작업에서 `npm audit fix` 또는 강제 dependency upgrade로 자동 수정하지 않았다.
