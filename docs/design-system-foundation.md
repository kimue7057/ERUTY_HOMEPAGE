# ERUTY Design System Foundation

## 1. 목적과 적용 범위

이 문서는 2026-08-04 기준 ERUTY 일반 페이지에서 이미 사용 중인 값을 공식 역할로 묶은 Foundation 명세다. 이번 단계는 재설계가 아니라 동등 치환을 위한 기반 작업이다. 개별 페이지의 Tailwind 클래스, Hitpick·Erumter 전용 CSS, Technology 목업 값은 일괄 변경하지 않았다.

선행 감사의 기준값은 57개 소스 파일, 4,758개 스타일 발생, 고유 font-size 59개, 고유 spacing 118개, Tailwind arbitrary value 298회/195종이었다. 이번 단계의 새 감사는 예외 영역을 분리해 보고서 형태로만 동작하며 CI를 실패시키지 않는다.

## 2. Foundation

### Font family와 loading

| 역할 | 토큰 | 값 | 상태 |
| --- | --- | --- | --- |
| Display | `--eruty-font-display` | `Pretendard Variable`, `Pretendard`, `system-ui`, `sans-serif` | Keep |
| Body | `--eruty-font-body` | Display와 동일 | Keep |
| Mono | `--eruty-font-mono` | `JetBrains Mono`, `monospace` | Keep |

Pretendard Variable dynamic subset은 `src/styles/fonts.css`의 jsDelivr import, JetBrains Mono 400/500은 Google Fonts import로 로드된다. 기존 `--font-display`, `--font-body`, `--font-mono`는 새 공식 토큰을 참조하는 호환 별칭이다.

### Root와 body 정책

- `html`: `--eruty-root-font-size: 17px`를 유지한다. 16px 변경은 이 단계에서 금지한다.
- `body`: `1rem`, 즉 17px을 유지한다. 기본 line-height 1.6도 HTML 기본값으로 유지한다.
- 공통 본문 역할 `body-default`: 17px / 1.75다. body 요소의 기본값과 역할 클래스는 구분한다.
- 장기적으로 `html 16px + body 17px`를 검토할 수 있으나, typography·spacing·button·card 보정과 별도 회귀 검증이 선행되어야 한다.

### Font weight

| Weight | 용도 | 상태 |
| ---: | --- | --- |
| 400 | body, body-small, meta 기본 | Keep |
| 500 | nav, 일부 meta 강조 | Keep |
| 600 | eyebrow, label, 강조 body | Normalize |
| 700 | subsection/card title, button | Keep |
| 800 | home/page/section title | Keep |
| 650~790 variable | 서비스 전용 표현 | Service exception |

### Color roles

| 역할 토큰 | 값 | 상태 |
| --- | --- | --- |
| `--eruty-color-text-primary` | `#18191B` | Keep |
| `--eruty-color-text-muted` | `#737780` | Keep |
| `--eruty-color-surface-base` | `#FFFFFF` | Keep |
| `--eruty-color-surface-subtle` | `#F5F6F8` | Keep |
| `--eruty-color-border-default` | `#E4E6EA` | Keep |
| `--eruty-color-brand-primary` | `#3737F2` | Keep |

기존 Tailwind theme 변수는 이 역할 토큰을 참조한다. 전체 색상 리터럴 치환은 이번 범위가 아니다.

### Container와 breakpoint

| 역할 | 값/API | 상태 |
| --- | --- | --- |
| default | 1280px, `PageContainer` 기본 | Keep |
| wide | 1440px, `variant="wide"` | Keep |
| reading | 760px, `variant="reading"` | Normalize |
| copy | 720px, `--eruty-copy-max` | Keep |
| mobile gutter | 20px | Keep |
| desktop gutter | 32px at `lg` | Keep |

`PageContainer`의 기존 `wide` boolean은 호환성을 위해 남기되 신규 코드는 `variant`를 사용한다. Tailwind CSS 4 기본 breakpoint인 `sm` 640, `md` 768, `lg` 1024, `xl` 1280, `2xl` 1536을 사용하며 별도 설정 파일의 커스텀 breakpoint는 없다.

## 3. Typography roles

각 `.eruty-type-*` 역할은 family, size, weight, line-height, letter-spacing을 한 세트로 소비한다. 기존 `.eruty-home-display`, `.eruty-page-title` 등의 클래스는 같은 토큰을 참조하는 호환 API다.

| 역할 / class | 목적 | Size | Weight | Line-height | Tracking | Wrap | 상태 |
| --- | --- | --- | ---: | ---: | --- | --- | --- |
| `display-home` / `.eruty-type-display-home` | Home hero display | `clamp(2.65rem, 5vw, 4.25rem)` | 800 | 1.08 | `-0.04em` | balance, keep-all | Keep |
| `title-page` / `.eruty-type-title-page` | 일반 page H1 | `clamp(2.35rem, 4.3vw, 3.75rem)` | 800 | 1.10 | `-0.04em` | balance, keep-all | Keep |
| `title-section` / `.eruty-type-title-section` | 공통 section H2 | `clamp(1.85rem, 3vw, 2.6rem)` | 800 | 1.18 | `-0.04em` | balance, keep-all | Keep |
| `title-subsection` / `.eruty-type-title-subsection` | section 내부 제목 | `clamp(1.35rem, 2vw, 1.85rem)` | 700 | 1.27 | `-0.025em` | pretty, keep-all | Keep |
| `title-card` / `.eruty-type-title-card` | 일반 카드 제목 | `clamp(1.08rem, 1.4vw, 1.3rem)` | 700 | 1.40 | `-0.015em` | pretty, keep-all | Keep |
| `body-lead` / `.eruty-type-body-lead` | page lead | `clamp(.98rem, 1.2vw, 1.12rem)` | 400 | 1.75 | 0 | pretty, keep-all | Keep |
| `body-default` / `.eruty-type-body-default` | 일반 본문 | `1rem` | 400 | 1.75 | 0 | pretty, keep-all | Keep |
| `body-small` / `.eruty-type-body-small` | 보조 본문 | `.875rem` | 400 | 1.68 | 0 | pretty, keep-all | Keep |
| `meta` / `.eruty-type-meta` | 날짜·상태·짧은 정보 | `.76rem` | 400 | 1.50 | 0 | keep-all | Normalize |
| `eyebrow` / `.eruty-type-eyebrow` | 영문 상단 label | `.72rem` | 600 | 1.40 | `.14em` | uppercase | Keep |
| `eyebrow[data-lang="ko"]` | 한글 상단 label | `.78rem` | 600 | 1.40 | `-.01em` | normal case | Normalize |

1440px 기준 대표 computed size는 72 / 61.92 / 43.2 / 28.8 / 20.16px, 390px 기준은 45.05 / 39.95 / 31.45 / 22.95 / 18.36px이다. 서비스의 cinematic title과 Technology의 7~11px 축척 UI는 이 표의 일반 본문 역할로 이동하지 않는다.

## 4. Spacing

### 17px root 아래 Tailwind scale

Tailwind utility의 rem 계산은 유지된다: `gap-2` 8.5px, `gap-3` 12.75px, `gap-4` 17px, `p-6` 25.5px, `gap-8` 34px. 전면 px 치환은 하지 않는다.

### 의미 기반 역할

| 역할 토큰 | 값 | 책임 |
| --- | ---: | --- |
| `--eruty-space-heading-eyebrow-title` | 18px | PageHeading eyebrow → title |
| `--eruty-space-heading-eyebrow-title-compact` | 16px | SectionHeading eyebrow → title |
| `--eruty-space-heading-title-description` | 24px | PageHeading title → lead |
| `--eruty-space-heading-title-description-compact` | 18px | SectionHeading title → description |
| `--eruty-space-heading-description-content` | 30px | PageHeading description → 자체 action |
| `--eruty-space-card-title-body` | 12px | CardCopy title → body |
| `--eruty-space-card-content` | 17px | Card의 콘텐츠 그룹 사이 |
| `--eruty-space-button-inline` | 8.5px | label ↔ icon |
| `--eruty-space-button-block` | 12.75px | button group의 기본 후보 간격 |

### Section spacing

| Variant | 값 | 상태 |
| --- | --- | --- |
| compact | `clamp(56px, 5.5vw, 88px)` | Keep |
| default | `clamp(72px, 7vw, 112px)` | Keep |
| spacious | `clamp(96px, 9vw, 144px)` | Compare; 신규 API만 제공 |
| hero | 68px / 88px / 108px at mobile/md/lg | Keep |

## 5. Component responsibilities

### PageHeading

컴포넌트가 eyebrow → title(18px), title → description(24px), description → `actions`(30px)을 책임진다. 페이지는 이 내부 순서에 `mt-*`, `mb-*`, `gap-*`을 추가하지 않는다. PageHeading 다음의 페이지 콘텐츠 간격은 상위 hero/section 레이아웃이 책임진다.

### SectionHeading

컴포넌트가 eyebrow → title(16px), title → description(18px)을 책임진다. SectionHeading 자체의 아래 여백은 다음 콘텐츠까지의 간격이며 기본 `--eruty-section-content-gap`, compact일 때 `clamp(28px, 3vw, 40px)`다. 상위 grid가 같은 축에 별도 gap/margin을 중복하지 않는다.

### Container

`PageContainer variant="default|wide|reading"`을 공식 API로 사용한다. 기본/wide/reading 모두 자체 max-width, 중앙 정렬, 20/32px gutter를 책임진다. 내부 콘텐츠가 gutter를 다시 만들지 않는다.

### Section

`Section variant="compact|default|spacious|hero"`가 block padding만 책임진다. 자식 사이의 grid/flex gap, 배경, 콘텐츠 너비는 호출자가 책임진다. 서비스 narrative section은 사용하지 않아도 된다.

### Button

`Button`과 `ButtonLink` Foundation API를 추가했지만 기존 버튼은 아직 마이그레이션하지 않았다.

| Variant | 역할 | 상태 |
| --- | --- | --- |
| primary | brand surface + white label | Keep |
| secondary | white surface + default border | Normalize |
| text | 무배경 text action | Normalize |
| icon | 정사각 control | Normalize |

| Size | Min-height | Inline padding | 상태 |
| --- | ---: | ---: | --- |
| compact | 44px | 17px | Compare |
| default | 51px | 25.5px | Normalize; Careers 현재값 기준 |
| large | 54px | 29.75px | Compare |

서비스 원형 control, slider control, card-as-button은 이 API의 강제 대상이 아니다.

### Card

`Card`와 `CardCopy` Foundation API를 추가했지만 기존 카드 DOM은 변경하지 않았다.

| Variant | Padding | 용도 | 상태 |
| --- | ---: | --- | --- |
| compact | 17px | 밀도 높은 정보 카드 | Normalize |
| default | 25.5px | 일반 카드 | Normalize |
| featured | 34px | 강조 콘텐츠 | Compare |
| mockup | 0 | 내부 mockup이 자체 간격 소유 | Mockup exception |

공통 radius는 6px, border는 default border, 콘텐츠 group gap은 17px, title/body gap은 12px이다. 실제 페이지 적용 전 카드 유형별 screenshot 검수가 필요하다.

## 6. Exception namespaces

| Namespace | 범위 | 규칙 |
| --- | --- | --- |
| `service-hitpick-*` | Hitpick cinematic type, track, service palette | 공통 역할과 분리; 반복값은 namespace 내부 토큰화 |
| `service-erumter-*` | Erumter AX narrative와 variable weight | 공통 역할과 분리; Header/Footer로 selector가 새지 않게 함 |
| `mockup-*` | Technology 축척 UI·dashboard label | 7~11px을 일반 본문으로 간주하지 않음 |
| `illustration-*` | 정보 전달보다 시각 표현이 우선인 요소 | 접근 가능한 본문과 구분 |
| `decorative-label-*` | 장식 label | 정보 label과 구분 |
| `horizontal-scroll-*` | Home chip, Hitpick track | 내부 scroll container에 한정하고 문서 overflow와 구분 |

현재 서비스 코드의 `hp-*`, `er-*`는 기존 구현 namespace다. 위 이름은 다음 정리 단계의 공식 논리 namespace이며, 이번 작업에서 서비스 CSS를 대규모 rename하지 않았다.

## 7. 신규 사용 제한

일반 페이지에서 다음 직접값을 새로 추가하지 않는다.

- `text-[...]`, `leading-[...]`, `tracking-[...]`
- `gap-[...]`, `p-[...]`, 역할을 대신하는 임의 margin
- 공통 container 의미의 `max-w-[1280px]`, `max-w-[1440px]`
- 기존 color role과 같은 의미의 1회성 HEX
- 일반 페이지에서 service/mockup namespace 사용

불가피한 예외는 해당 namespace, 화면 역할, 공통화하지 않는 이유, 시각 검수 경로를 함께 기록한다.

## 8. 자동 감사

`npm run audit:design`은 `scripts/audit-design-foundation.mjs`를 실행해 다음을 `reports/design-system/foundation-audit.json`에 기록한다.

- arbitrary font-size, line-height, letter-spacing, spacing, color
- 일반 페이지와 service/mockup 예외 영역의 발생 수 분리
- namespace 경계 검토 대상
- theme token을 우회할 가능성이 있는 CSS 직접값

현재는 기존 부채를 baseline으로 남기는 report-only 모드다. 다음 단계에서 기준 스냅샷과 diff하여 “신규 일반 페이지 위반만” CI에 연결하는 방식이 false positive가 가장 적다.

`npm run audit:design:foundation:equivalence`는 `FOUNDATION_BASELINE_URL`, `FOUNDATION_CURRENT_URL` 두 서버를 비교해 6개 경로 × 2개 viewport의 computed style, 문서 폭, console/page error와 동일 viewport screenshot SHA를 기록한다.

## 9. 보류 항목과 다음 단계

1. Home 한 페이지에서 typography → container → section → card → button 순으로 시범 적용한다.
2. 적용마다 1440×1000, 390×844 비교와 줄바꿈/overflow 검사를 통과시킨다.
3. 일반 페이지 적용이 안정된 뒤 Careers·Team 등으로 확장한다.
4. Hitpick, Erumter, Technology mockup은 별도 namespace 감사와 별도 migration으로 다룬다.
5. root 16px 전환은 마지막 독립 작업으로 유지한다.

## 10. 이번 구현의 동등성 결과

기준은 Footer overflow 수정 직후 커밋 `4be4675`, 비교 대상은 이 Foundation 작업의 local production build다. `current`와 `after`는 의미상 각각 변경 전과 변경 후다.

| 검증 | 결과 |
| --- | --- |
| 대상 | Home, Careers, Team, Technology, Hitpick, Erumter |
| Viewport | 1440×1000, 390×844 |
| 조합 | 12/12 성공 |
| 대표 computed style 차이 | 0건 |
| 글자 크기·line-height·component height 초과 | 0건 |
| 줄바꿈 변화 | 0건 |
| 동일 viewport screenshot SHA | 12/12 일치 |
| 변경 후 문서 horizontal overflow | 0건 |
| Console/page error | 0건 |

원본 수치는 `reports/design-system/foundation-visual-equivalence.json`, 화면은 `screenshots/design-system-foundation/{before|after}/{desktop|mobile}/`에 있다. Footer 전용 감사도 11개 경로에서 모바일 390/390, 데스크톱 1440/1440, offender와 error 0을 확인했다.

Foundation report-only 감사의 현재 값은 57개 파일, arbitrary value 253회/171종이며 이 중 153회는 Hitpick·Erumter·Technology mockup 예외 영역이다. 이 수치는 선행 감사와 정규식 범위가 다르므로 감소 추세로 직접 해석하지 않는다. 기준 브랜치에는 root 영향 감사 npm script가 포함되지 않아 이번 검증에서 재실행하지 않았고, 선행 문서의 17px 유지 결론만 적용했다.
