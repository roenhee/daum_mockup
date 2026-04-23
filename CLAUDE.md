# CLAUDE.md

> Claude Code 에이전트가 이 프로젝트에서 작업할 때 반드시 먼저 읽어야 하는 문서.

---

## 1. 프로젝트 정의

**Daum 서비스 웹 목업 (Web-based mockup)**

- Daum 모바일 앱의 UI/화면을 웹으로 재현하는 목업 프로젝트
- 목적: 신규 AI 기능 기획·리뷰·공유용 인터랙티브 목업 제작
- 결과물은 웹브라우저에서 바로 동작해야 하며, 실제 Daum 앱을 보는 듯한 경험을 제공

### 참조 문서 (반드시 읽을 것)

작업 시작 전, 그리고 새 화면을 만들 때마다 아래 문서를 참조한다.

- `docs/01_daum_context.md` — 서비스 맥락, 사용자 세그먼트, 비즈니스 컨텍스트
- `docs/02_daum_service_spec.md` — **화면별 상세 스펙. 이 문서가 UI 구현의 Ground Truth**
- `docs/mockup_plan.md` — 이 목업 프로젝트의 구현 계획, 화면 우선순위, 컴포넌트 구조

**주의**: 원본 프로젝트에는 `03_data_analysis.md`도 있지만, 이 목업 프로젝트에서는 사용하지 않는다 (데이터 분석은 목업 제작과 무관).

---

## 2. 가장 중요한 규칙: 반응형 구조

이 프로젝트의 핵심 특성. 모든 화면 구현 시 반드시 지킬 것.

### 데스크탑 뷰 (`lg` 이상, 1024px~)

- 화면 중앙에 **폰 프레임(Phone Frame)**을 배치
- 폰 프레임 안에 실제 Daum 앱 웹뷰 콘텐츠 렌더링
- 프레임 바깥 영역은 배경색(ex. 연한 회색)으로 채움
- 폰 프레임 규격: **390px × 844px** (iPhone 14/15 기준)
- 프레임 디자인: 검정 베젤, 둥근 코너(~40px), 상단 다이나믹 아일랜드, 하단 홈 인디케이터

### 모바일 뷰 (`lg` 미만, ~1023px)

- 폰 프레임 **없이** 웹뷰 콘텐츠만 풀스크린으로 렌더링
- 사용자가 이미 모바일에 있으므로 프레임은 불필요
- `100vh`, `100vw` 기준 전체 영역 사용

### 구현 방식

- 루트에 `<AppShell>` 또는 `<PhoneFrame>` 컴포넌트를 두고, `lg:` 브레이크포인트 기준으로 프레임 적용 여부 결정
- 내부 콘텐츠 영역은 항상 **모바일 폭(390px 기준)**으로 설계
- 데스크탑에서 리사이징 시 프레임은 고정, 모바일에서는 viewport에 맞춤

---

## 3. 기술 스택

- **Vite + React 18 + TypeScript**
- **Tailwind CSS v3** (v4 아님 주의)
- **React Router DOM v6** — 화면 간 라우팅
- **lucide-react** — 아이콘
- **clsx + tailwind-merge** — 조건부 클래스 유틸
- (선택) **framer-motion** — 트랜지션·애니메이션

불필요한 라이브러리는 추가하지 말 것. 상태관리 라이브러리(Redux, Zustand 등)는 mockup 특성상 불필요. React `useState`/`useContext`로 충분.

---

## 4. 초기 세팅 (아직 안 돼 있을 때)

프로젝트 초기화가 안 되어 있다면 아래 순서로 실행.

```bash
# 1. Vite 프로젝트 생성 (현재 디렉토리에 바로)
npm create vite@latest . -- --template react-ts

# 2. 의존성 설치
npm install

# 3. Tailwind CSS 설치
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p

# 4. 라우팅 및 유틸 라이브러리
npm install react-router-dom lucide-react clsx tailwind-merge

# 5. (선택) 애니메이션
npm install framer-motion
```

### Tailwind 설정 (tailwind.config.js)

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Daum 브랜드 컬러는 필요시 추가
      },
      maxWidth: {
        'phone': '390px',
      },
    },
  },
  plugins: [],
}
```

### src/index.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html, body, #root {
  height: 100%;
  margin: 0;
}
```

---

## 5. 디렉토리 구조

```
src/
├── main.tsx                    # 엔트리
├── App.tsx                     # 라우터 + PhoneFrame 래핑
├── index.css                   # Tailwind 진입
├── components/
│   ├── layout/
│   │   ├── PhoneFrame.tsx      # 데스크탑 폰 프레임 래퍼 ⭐ 핵심
│   │   ├── AppShell.tsx        # 탭 화면 공통 셸 (헤더+바디+탭바)
│   │   ├── BottomTabBar.tsx    # 하단 5탭 바
│   │   ├── HeaderBar.tsx       # 상단 헤더 (탭별 variant)
│   │   └── InAppBrowserBar.tsx # 상세 뷰용 인앱 브라우저 툴바
│   ├── home/                   # 홈탭 전용 컴포넌트
│   ├── contents/               # 콘텐츠탭 전용 (MainHeadlineCard/HeadlineList/NewsGrid/TextHeadlineList 포함)
│   ├── community/              # 커뮤니티탭 전용
│   ├── shopping/               # 쇼핑탭 전용
│   ├── loop/                   # 루프탭 전용
│   ├── news/                   # 뉴스 기사 상세
│   ├── channel/                # 채널뷰
│   ├── search/                 # 검색
│   ├── sidemenu/               # 사이드 메뉴
│   └── ui/                     # 공용 원자 컴포넌트 (ArticleMeta, Thumbnail, Badge, Card 등)
│       └── patterns/           # 탭 간 재사용 슬롯 (docs/ui_patterns.md 지침 기반, 요청 시 생성)
├── pages/                      # 라우트별 페이지
│   ├── HomePage.tsx
│   ├── ContentsPage.tsx        # 서브탭 라우팅 + Placeholder
│   ├── contents/               # 콘텐츠탭 서브탭별 파일
│   │   ├── NewsSubtab.tsx
│   │   ├── SportsSubtab.tsx
│   │   ├── EntertainSubtab.tsx
│   │   └── MoneySubtab.tsx
│   ├── CommunityPage.tsx
│   ├── ShoppingPage.tsx
│   ├── LoopPage.tsx
│   ├── NewsDetailPage.tsx
│   ├── ChannelViewPage.tsx
│   └── SearchPage.tsx
├── mocks/                      # 목업 데이터 (JSON/TS)
│   ├── news.ts
│   ├── trends.ts
│   ├── community.ts
│   └── ...
├── lib/
│   ├── cn.ts                   # clsx+twMerge 유틸
│   ├── img.ts                  # placeholderImg (loremflickr 기반 seed 해시 lock)
│   └── ...
└── types/
    └── index.ts                # 공용 타입 정의 (ContentArticle 등)
```

---

## 6. 라우팅

React Router 기준, URL 구조는 Daum 앱의 탭 구조를 그대로 반영.

| 경로 | 화면 | 참조 섹션 |
|------|------|---------|
| `/` | 홈탭 | 02 문서 §2-1 |
| `/contents` | 콘텐츠탭 (기본 뉴스 서브탭) | §2-2 |
| `/contents/:subtab` | 콘텐츠탭 (특정 서브탭) | §2-2 |
| `/community` | 커뮤니티탭 | §2-3 (개편 후 기준) |
| `/shopping` | 쇼핑탭 | §2-4 (현재 구조 기준) |
| `/loop` | 루프탭 | §2-5 |
| `/news/:id` | 뉴스 기사 상세 | §3-1 |
| `/channel/:id` | 채널뷰 | §3-2 |
| `/search` | 검색 결과 | §3-3 |
| `/menu` | 사이드 메뉴 | §1 사이드 메뉴 |

**중요**: 상세 뷰(`/news/:id`, `/channel/:id`, `/search`)는 하단 탭 바 대신 인앱 브라우저 툴바가 고정된다. 02 문서 §1 "하단 고정 영역" 참조.

---

## 7. 구현 우선순위 (MoSCoW)

### Must (1차 완성 목표)

1. **PhoneFrame 컴포넌트** — 반응형 프레임 래퍼. 이게 먼저 되어야 모든 화면 올릴 수 있음
2. **BottomTabBar + AppShell** — 공통 셸 구조
3. **홈탭** (§2-1) — Daum 사용자 37.3%의 메인 진입점
4. **콘텐츠탭 뉴스 서브탭** (§2-2) — Daum 코어 소비 41.1%
5. **뉴스 기사 상세** (§3-1) — 핵심 종착지

### Should (2차)

6. **검색** (§3-3) — 독립 생태계 20%
7. **채널뷰** (§3-2)
8. **콘텐츠탭 나머지 서브탭** (라이브·스포츠·연예 등)
9. **사이드 메뉴**

### Could (3차)

10. **커뮤니티탭** (개편 후 구조)
11. **쇼핑탭** (현재 구조, 단 6월말 폐지 예정이므로 간소히)
12. **루프탭**

### Won't (이번 목업에서는 제외)

- 실제 네트워크 통신, 실제 검색 엔진 연동
- 로그인/회원가입 플로우
- 결제·쇼핑 실거래 플로우
- PC 웹 (m.daum.net이 아닌 daum.net)

---

## 8. 컴포넌트 작성 가이드

### PhoneFrame 컴포넌트 골격

```tsx
// components/layout/PhoneFrame.tsx
import { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-gray-100 lg:flex lg:items-center lg:justify-center lg:p-8">
      {/* 데스크탑: 폰 프레임 적용 */}
      <div
        className={cn(
          // 모바일: 풀스크린, 프레임 없음
          "w-full h-screen bg-white overflow-hidden",
          // 데스크탑: 폰 프레임
          "lg:w-[390px] lg:h-[844px] lg:rounded-[47px] lg:border-[14px] lg:border-black lg:shadow-2xl lg:relative"
        )}
      >
        {/* 데스크탑 전용: 다이나믹 아일랜드 */}
        <div className="hidden lg:block absolute top-2 left-1/2 -translate-x-1/2 w-[120px] h-[30px] bg-black rounded-full z-50" />

        {/* 콘텐츠 영역 (스크롤 가능) */}
        <div className="w-full h-full overflow-y-auto overflow-x-hidden">
          {children}
        </div>

        {/* 데스크탑 전용: 홈 인디케이터 */}
        <div className="hidden lg:block absolute bottom-2 left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-black rounded-full z-50" />
      </div>
    </div>
  );
}
```

### 화면 컴포넌트 작성 원칙

- **모바일 퍼스트**: 390px 폭 기준으로 레이아웃 설계
- **Tailwind 우선**: 인라인 style이나 별도 CSS 파일 최소화
- **하드코딩된 높이 금지**: 콘텐츠가 자유롭게 늘어날 수 있도록
- **스크롤 영역 명확히 분리**: 헤더·탭바는 고정(sticky), 바디만 스크롤
- **실제 Daum 스펙 준수**: 02 문서의 카드 구조·배치·UI 요소 명칭 그대로 반영

### 아이콘

- `lucide-react` 사용
- Daum 앱에서 쓰는 아이콘 매핑 예:
  - 햄버거 메뉴 → `Menu`
  - 검색 → `Search`
  - 알림 → `Bell`
  - 프로필 → `User`, `UserCircle`
  - 더보기 → `MoreHorizontal`
  - 공유 → `Share2`, `Send`
  - 좋아요 → `Heart`
  - 댓글 → `MessageCircle`
  - LIVE 뱃지는 별도 커스텀 (빨간 배경 + LIVE 텍스트)

### 목업 데이터

- `src/mocks/` 에 정적 JSON/TS로 관리
- 실제 Daum 뉴스/채널 기사 제목을 그대로 쓰지 말고, 장르에 맞는 **가상의 기사 제목**을 생성해서 사용 (저작권 이슈 회피)
- 이미지는 용도에 따라 두 가지 전략:
  - **일반 placeholder**: `src/lib/img.ts`의 `placeholderImg(seed, w, h, topic)` — loremflickr 기반, seed 해시로 결정적
  - **특정 인물이 필요한 섹션(연예·머니 탭)**: Wikimedia Commons CC 라이선스 이미지 URL을 mock 파일(`IMG` 상수)에 수동 큐레이션. 썸네일(`/thumb/`) 경로는 일부 리전에서 400 반환하므로 **원본 URL** 사용
  - 새로 이미지 가져올 땐 저작권/초상권 이슈 확인 필수. 정치인·사건 연루 인물은 피하기

---

## 9. 스타일·디자인 원칙

- **회색톤 중립적 디자인**: Daum 특유의 화이트/그레이 배경 + 검은 텍스트 기본
- **구분선**: 섹션 간 `border-t border-gray-200` 혹은 `bg-gray-50` spacer
- **썸네일 비율**: 뉴스 카드는 4:3 또는 1:1 정사각이 많음
- **폰트 크기**: 본문 14~15px, 제목 16~18px, 작은 메타 12~13px
- **탭 활성화**: 하단 탭바는 컬러 아이콘으로 구분, 서브탭은 굵은 글씨 + 밑줄 인디케이터
- **카드 간격**: 피드 카드 사이 `py-3 border-b border-gray-100` 정도

### 디자인 토큰 (현재 선택적 도입 상태)

`tailwind.config.js` 에 semantic tokens 정의는 돼 있지만 **기존 코드는 대부분 `text-[Npx]` / `gray-XXX` 하드코딩 유지**한다. 이유: 과거 일괄 sed 치환으로 회귀가 발생했던 경험 있음.

**토큰 정의**
- `fontSize`: `heading-lg / heading / title / body / body-sm / caption / meta / micro / nano`
  - **중요**: size만 지정. line-height는 **명시적으로 `leading-*` 클래스로 따로 지정**할 것 (토큰 자체에 line-height를 박으면 기존 레이아웃이 일괄로 깨짐)
- `colors`: `content.primary / strong / secondary / muted / faint / divider`, `surface.DEFAULT / alt / gap`
- `borderRadius`: `card` (8px), `chip` (9999px)

**적용 규칙**
- **신규 컴포넌트**: 처음부터 토큰 사용 권장
- **기존 컴포넌트**: 해당 컴포넌트를 구조적으로 손대는 시점에만 토큰화
- **절대 금지**: 전체 디렉토리 대상 `sed`/일괄 치환으로 토큰 도입. 시각적 회귀를 추적할 수 없음.
- 현재 토큰을 사용 중인 파일(keep-list): `components/ui/{ArticleMeta,Thumbnail}.tsx`, `components/contents/{MainHeadlineCard,HeadlineList,NewsGrid,TextArticleList,TodayRankedNews,EntertainTrendGrid,EntertainCelebs,SubtabSections}.tsx`

---

## 10. 작업 시 체크리스트

새 화면/컴포넌트 작업 시:

- [ ] `docs/02_daum_service_spec.md`의 해당 섹션을 먼저 읽었는가?
- [ ] 화면 폭을 390px 기준으로 설계했는가?
- [ ] `lg:` 브레이크포인트에서도 깨지지 않는가?
- [ ] 상세 뷰라면 하단 탭바 대신 인앱 브라우저 툴바를 띄웠는가?
- [ ] 하드코딩된 영어/외부 브랜드 텍스트를 피했는가?
- [ ] 컴포넌트를 적절히 분리했는가? (한 파일이 200줄 넘어가면 쪼개기)

---

## 11. 코드 품질

- TypeScript **any 금지**. 필요하면 `unknown` 또는 구체 타입
- 컴포넌트 props는 명시적 interface로
- 파일명: 컴포넌트는 PascalCase (`HomePage.tsx`), 유틸은 camelCase (`cn.ts`)
- import 순서: 외부 라이브러리 → 내부 절대경로 → 상대경로

---

## 12. 커밋·설명

- 작업이 끝날 때마다 "무엇을 만들었는지" 간단 요약
- 스펙과 다르게 구현한 부분이 있다면 **반드시 근거와 함께** 기록
- 추측으로 만든 UI는 "추정 구현" 표시 (나중에 사용자에게 확인 요청)

---

## 13. 프로젝트 오너에게 확인 요청이 필요한 상황

아래 경우에는 구현을 멈추고 오너에게 질문:

- 스펙에 명시되지 않은 UI 디테일이 작업의 핵심인 경우
- 두 문서 간 충돌이 있을 때
- 새 라이브러리 추가가 필요할 때
- 외부 API 연동이 필요해 보일 때
