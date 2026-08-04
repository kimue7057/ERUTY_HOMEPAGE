# Home 디자인 시스템 시범 적용 및 가독성 검증

작성일: 2026-08-04

기준 커밋: `2b3af8d38371456717f18d631a888ea629572af3`

작업 브랜치: `refactor/home-design-system-pilot`

## 1. 결론

Home의 5개 섹션 순서, 문구, 데이터, 이미지·영상, 링크 목적지와 인터랙션은 유지하면서 공통 역할이 분명한 Hero, Container, Section, Button, Card를 Foundation API에 연결했다. `html { font-size: 17px }`와 기존 typography token 값은 바꾸지 않았다.

측정한 Home 10개 조합(5 viewport × 한국어/영어)은 모두 문서 수평 overflow 0px, H1 1개, console/page error 0건이었다. 회귀 대상 5개 페이지의 desktop/mobile computed metrics는 적용 전후 10/10 완전히 동일했다.

가장 유의미한 변화는 다음과 같다.

- Home Tailwind arbitrary value가 23회/15종에서 9회/9종으로 줄었다.
- Hero display tracking이 임시 `-0.02em` override에서 Foundation `-0.04em`으로 복귀했다.
- Hero lead 최대 너비가 760px에서 읽기 폭 token인 720px로 정리됐다.
- 390px의 Business SectionHeading 가용 폭이 339px에서 350px으로 늘어 한국어 제목이 3줄에서 2줄로 줄었다.
- Global Activity 이전/다음 control이 42.5px에서 46.75px로 커져 44px 최소 터치 목표를 충족했다.

이 시범 결과는 Home Foundation 확장을 진행할 수 있다는 근거로 사용할 수 있다. 다만 남은 고유 시각값을 일반 token으로 강제 흡수하지 않고 아래 예외 namespace를 유지해야 한다.

## 2. 범위와 비범위

### 적용 범위

- `/` Home만 운영 코드 적용
- Hero title/lead/action을 `PageHeading`과 `ButtonLink`로 구성
- 공통 최대 너비와 gutter를 `PageContainer`로 구성
- Business, Technology, CTA section을 `Section`으로 구성
- Global Activity metric card와 Technology card를 `Card`/`CardCopy`로 구성
- Technology 설명과 action 사이 간격 책임을 `SectionHeading`으로 이동
- 반복 임의 radius, focus color, min-height, 11px label을 Home semantic class로 이동
- 재실행 가능한 before/after Playwright audit 추가

### 변경하지 않은 범위

- Home 5개 섹션 순서와 DOM 의미 순서
- 회사 문구와 수치, 번역, 링크 목적지
- 이미지, Hero 영상, 자동 전환·motion 동작
- Header, Footer, 하위 페이지 운영 컴포넌트
- Hitpick/Erumter 전용 CSS와 Technology page mockup
- root/body font-size, 기존 Foundation token 값
- 의도적인 Home activity 내부 horizontal scroll

## 3. 역할 매핑

| 영역 | 적용 전 | 적용 후 | 판단 |
| --- | --- | --- | --- |
| Hero | 직접 `h1`, `p`, `Link`, 개별 margin/max-width | `PageHeading display="home"`, `ButtonLink` | Normalize |
| Hero display | 역할 class + `-0.02em` inline override | `eruty-home-display`의 `-0.04em` | Normalize |
| Hero lead | max-width 760px | `--eruty-copy-max` 720px | Normalize |
| Global Activity container | max 1280px + 모바일 32px 직접 padding | `PageContainer` | Normalize |
| Global Activity media/chips | 개별 aspect, min-width, grid | 기존 유지 + `horizontal-scroll-home-activity` | Keep / exception |
| Metric card | 직접 border/background/padding | `Card featured` + Home shadow/radius 예외 | Normalize + Keep |
| Business section/container | 역할 class + 직접 container | `Section` + `PageContainer` | Normalize |
| Business panels/flow | 반응형 padding, motion, 임의 grid | 구조 유지 + `mockup-business-flow` | Mockup exception |
| Technology heading/action | `SectionHeading` 뒤 별도 `mt-10` | `SectionHeading action` | Normalize |
| Technology card | 직접 flex/padding/radius/min-height | `Card default` + `CardCopy` | Normalize |
| Final CTA | 직접 section/container/link | `Section compact`, `PageContainer`, `ButtonLink large` | Normalize |

## 4. Before/After 수치

캡처에서는 영상과 CSS animation을 중지해 레이아웃 비교를 안정화했다. 문서 높이 증가는 Foundation button/card 리듬과 넓어진 모바일 가용 폭에 따른 재배치의 합이며, 최대 105px(768px English, 전체 1.9%)였다.

| Viewport | 언어 | 문서 높이 | Hero 줄 수 | 첫 Section title 줄 수 | root overflow |
| --- | --- | ---: | ---: | ---: | ---: |
| 1440×1000 | KO | 4088 → 4138 (+50) | 2 → 2 | 2 → 2 | 0px |
| 1440×1000 | EN | 4383 → 4440 (+57) | 2 → 2 | 2 → 2 | 0px |
| 1024×900 | KO | 5368 → 5445 (+77) | 2 → 2 | 2 → 2 | 0px |
| 1024×900 | EN | 5527 → 5608 (+81) | 2 → 2 | 2 → 2 | 0px |
| 768×1024 | KO | 5430 → 5486 (+56) | 2 → 2 | 1 → 1 | 0px |
| 768×1024 | EN | 5667 → 5772 (+105) | 2 → 2 | 2 → 2 | 0px |
| 390×844 | KO | 6768 → 6819 (+51) | 3 → 3 | 3 → 2 | 0px |
| 390×844 | EN | 7334 → 7382 (+48) | 4 → 4 | 3 → 3 | 0px |
| 360×800 | KO | 6825 → 6883 (+58) | 3 → 3 | 3 → 3 | 0px |
| 360×800 | EN | 7609 → 7639 (+30) | 4 → 4 | 4 → 4 | 0px |

대표 computed style 변화:

| 역할 | Desktop before | Desktop after | Mobile 390 before | Mobile 390 after |
| --- | --- | --- | --- | --- |
| Hero title tracking | -1.44px (`-0.02em`) | -2.88px (`-0.04em`) | -0.901px | -1.802px |
| Hero lead max/actual width | 760px | 720px | 350px | 350px |
| Hero button | 151.27×50.20px | 153.27×51px | 151.27×50.20px | 153.27×51px |
| Global activity control | 42.5×42.5px | 46.75×46.75px | 42.5×42.5px | 46.75×46.75px |
| Business content width | 339px-equivalent gutter | 350px | 339px | 350px |
| Technology card padding | 29.75px | 25.5px | 25.5px | 25.5px |
| Metric card padding | 34px | 34px | 34px | 34px |

Typography의 font-size, weight, line-height는 역할 적용 전후 유지됐다. 즉 이번 변화는 글자 크기 재설계가 아니라 tracking, 읽기 폭, spacing ownership, component API의 정리다.

## 5. 가독성과 접근성

### 한국어

- Hero의 `word-break: keep-all`과 반응형 display 크기는 유지되어 390px/360px에서 각각 3줄을 유지했다.
- 390px Business 제목은 공통 20px gutter 적용으로 가용 폭이 늘어 3줄에서 2줄이 됐다. 의미 단위가 더 자연스럽고 높이도 37.1px 줄었다.
- 360px에서는 같은 제목이 3줄을 유지해 좁은 화면에서 과도하게 축소되지 않았다.

### 영어

- Hero는 desktop 2줄, 390px/360px 4줄로 전후 동일했다.
- 좁은 화면에서 잘림이나 단어 중간 overflow가 없고 document width도 viewport와 동일했다.
- lead 최대 폭 720px은 desktop 읽기 길이를 줄이지만 mobile 실제 폭에는 영향을 주지 않는다.

### 접근성

- Home의 H1은 모든 조건에서 정확히 1개다.
- heading 순서는 기존과 동일하다. Global Activity의 `h3`가 첫 `h2`보다 먼저 등장하는 기존 구조는 이번 Home role 치환 범위에서는 유지했으며, 후속 semantic hierarchy 검토 항목이다.
- 이전/다음 국가 control은 46.75px로 보정했다.
- Button Foundation focus outline과 hover transition을 제공한다.
- 의도적 내부 scroll은 유지되며 문서 전체 overflow와 분리된다.

## 6. Arbitrary value와 예외 namespace

소스 audit은 `className` 안의 Tailwind `[...]` token을 전체 계수한다.

| 지표 | Before | After | 변화 |
| --- | ---: | ---: | ---: |
| 발생 횟수 | 23 | 9 | -14 (-60.9%) |
| 고유값 | 15 | 9 | -6 (-40.0%) |

제거·정규화한 반복값은 `rounded-[6px]`, `text-[11px]`, `focus-visible:outline-[#3737F2]`, Business/Technology min-height arbitrary 값이다.

남은 9종은 모두 1회성이고 다음 범주에 속한다.

- `horizontal-scroll-home-activity`: chip 최소 폭 `min-w-[132px]`
- Global Activity visual stage: 세 breakpoint aspect ratio와 340–390px media 높이
- Business mockup: panel 비율 grid와 flow arrow 위치
- Technology presentation: 0.95fr/1.55fr 비대칭 grid

유지 namespace:

- `horizontal-scroll-home-activity`
- `mockup-business-flow`
- `decorative-label-business-step`
- `home-business-*`
- `home-technology-*`

이 값들은 브랜드 표현, visual stage, mockup, 내부 scroll 역할이므로 spacing/type token으로 즉시 통합하지 않는다.

## 7. 회귀 검증

대상: `/company/careers`, `/company/team`, `/services/hitpick`, `/services/erumter`, `/technology`의 1440×1000 및 390×844.

- 10/10 조건의 computed metrics와 문서 높이: before/after 완전 동일
- root overflow: 0건
- console/page error: 0건
- desktop/mobile full-page screenshot: 10/10 exact match

Header와 Footer는 운영 코드를 수정하지 않았다. Home footer element screenshot의 픽셀 차이는 상위 Home 문서 높이와 subpixel 캡처 위치 변화에 따른 것이며 Footer computed style 변화는 없다.

## 8. 스크린샷과 원본 데이터

스크린샷 root: `screenshots/home-design-system-pilot/`

- `before|after/desktop/{ko|en}/home-full.png`
- `before|after/mobile390/{ko|en}/home-full.png`
- desktop/mobile390의 `home-hero.png`, `home-sectionHeading.png`, `home-cards.png`, `home-cta.png`, `home-footer.png`
- 1024, 768, 390, 360의 한국어/영어 full-page 캡처
- 회귀 5개 페이지의 desktop/mobile full-page 캡처

원본 데이터:

- `reports/design-system/home-pilot-before.json`
- `reports/design-system/home-pilot-after.json`
- `reports/design-system/home-pilot-comparison.json`

재실행:

```bash
HOME_PILOT_BASE_URL=http://127.0.0.1:4173 HOME_PILOT_LABEL=before npm run audit:design:home-pilot
HOME_PILOT_BASE_URL=http://127.0.0.1:4173 HOME_PILOT_LABEL=after npm run audit:design:home-pilot
```

`after` 실행 시 before report가 있으면 comparison JSON을 자동 생성한다.

## 9. 다음 단계 권고

1. Home의 heading semantic hierarchy에서 Global Activity `h3`를 별도 검토한다. 시각 스타일과 heading level은 분리해서 판단한다.
2. Home의 inline visual 값은 기능별 namespace inventory를 만든 뒤 반복되는 경우에만 component-local token으로 승격한다.
3. Foundation Button을 다음 일반 페이지에 적용하기 전에 label weight 700과 현재 페이지별 500 사용의 시각 비교를 진행한다.
4. Careers 또는 Team 한 페이지를 다음 일반 하위 페이지 pilot으로 선택한다.
5. Hitpick/Erumter CSS와 Technology mockup은 일반 Foundation migration과 분리한다.
6. root 16px 전환은 이 작업과 결합하지 않고 별도 visual regression 단계로 유지한다.

## 10. 판정

Home pilot은 Foundation 적용 범위를 확장할 수 있는 상태다. 적용 전 디자인을 동일하게 복제하는 것이 아니라 역할 일관성과 읽기 폭을 개선하는 제한된 시각 변화가 발생했으며, 측정한 최대 문서 높이 변화는 1.9%, 수평 overflow와 하위 페이지 computed regression은 0건이다. 다음 단계에서도 동일한 before/after audit과 한/영 360–1440px 검증을 완료 조건으로 사용한다.
