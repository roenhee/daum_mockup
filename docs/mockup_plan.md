# Daum Mockup Plan

> 이 문서는 Daum 서비스 목업 구현의 구체적 계획. `CLAUDE.md`와 함께 읽을 것.
> 스펙 출처: `docs/02_daum_service_spec.md`
> 맥락 출처: `docs/01_daum_context.md`

---

## 1. 구현 범위

### 포함

- 5개 하단 탭 (홈·콘텐츠·커뮤니티·쇼핑·M:AI) + 사이드 메뉴
  - M:AI 탭: 과거 "루프" 탭을 리네이밍(Bot 아이콘). 현재는 백지 + "작업 예정" placeholder
- 3개 상세 뷰 (뉴스 기사 상세·채널뷰·검색 결과)
- 반응형: 데스크탑 폰 프레임 / 모바일 풀스크린

### 제외

- 실제 데이터 통신 (모든 데이터는 `src/mocks/`)
- 로그인/인증 (로그인된 상태로 가정)
- AI 기능 자체 구현 (AI 기능은 이후 별도 기획에서 추가)
- PC 웹 daum.net

---

## 2. 반응형 전략 상세

### PhoneFrame 동작

| 뷰포트 | 렌더링 |
|-------|--------|
| `< 1024px` (모바일/태블릿) | 프레임 없음. `100vw × 100vh` 풀스크린 |
| `≥ 1024px` (데스크탑) | 배경 회색. 중앙 390×844 폰 프레임 안에서 렌더 |

### 폰 프레임 스펙

- 외곽 크기: **418px × 872px** (베젤 14px 포함)
- 내부 콘텐츠 영역: **390px × 844px**
- 베젤: 검정 `bg-black`, 둥근 코너 `rounded-[47px]`
- 다이나믹 아일랜드: 상단 중앙, 120×30px, 검정 pill
- 홈 인디케이터: 하단 중앙, 134×5px, 검정 pill
- 그림자: `shadow-2xl`

### 내부 콘텐츠

- 항상 **390px 폭**을 전제로 설계
- 세로 스크롤은 콘텐츠 영역 내에서만 (프레임은 고정)
- 헤더·탭바는 `sticky` 또는 `fixed`로 콘텐츠 영역 상/하단에 고정

---

## 3. 공통 컴포넌트 설계

### `<PhoneFrame>` (layout/PhoneFrame.tsx)

- 루트 레이아웃
- 브레이크포인트 기준으로 프레임 적용
- children으로 실제 화면 받음

### `<AppShell>` (layout/AppShell.tsx)

- 탭 화면용 공통 셸
- 구조: `<HeaderBar> + <main>{children}</main> + <BottomTabBar>`
- props: `variant`, `onOpenMenu`, `bodyClassName`, `scrollableHeader?`
- `scrollableHeader`: true일 때 헤더를 스크롤 영역 **안쪽**에 배치 → 스크롤 다운 시 헤더가 사라짐. 콘텐츠탭에서 사용 (하위 sticky 서브탭과 조합)

### `<DetailShell>` (layout/DetailShell.tsx)

- 상세 뷰(뉴스·채널·검색)용 공통 셸
- 구조: 상단 URL 바 + `<main>` + `<InAppBrowserBar>`
- 하단 탭바 대신 인앱 브라우저 툴바 (홈 · ← → · 🔍 · 🔗 · ⋯)
- 홈 버튼은 `/` 로 네비게이션
- props: `url`, `tabCount`, `topBar?`, `scrollableTopBar?`
- `scrollableTopBar`: true일 때 URL 바가 스크롤되어 사라짐. 뉴스·채널뷰가 사용(매체/채널 헤더 sticky 와 조합)

### `<UrlTopBar>` (layout/UrlTopBar.tsx)

- 주소창 전용 탑바(← + 도메인 + 새로고침 + 탭 카운트)
- `DetailShell` 기본 topBar, 검색 결과 화면(`SearchPage`)에서도 재사용

### `<SiteFooter>` (layout/SiteFooter.tsx)

- 공통 푸터. 검색·뉴스·채널·콘텐츠(모든 서브탭)에서 사용
- 구성:
  - 1행: 내정보 · 로그아웃 · PC화면 · 전체보기
  - 2행: 이용 약관 · 고객센터 · 유해정보신고
  - 3행: © AXZ Corp
- `bg-gray-100`, 행간 타이트(`gap-0.5`), 상단 디바이더 없음

### `<HeaderBar>` (layout/HeaderBar.tsx)

탭마다 구성이 다름. variant prop으로 분기.

| variant | 좌측 | 우측 | 비고 |
|---------|------|------|------|
| `home` | 햄버거(≡) | 프로필·AI·알림 | 홈탭 §2-1 |
| `contents` | "콘텐츠" 타이틀 | 설정·검색 | §2-2 · `noBorder` (하위 서브탭과 구분선 중첩 방지) |
| `community` | "커뮤니티" 타이틀 or 알림 | 검색 | §2-3 (개편 전/후) |
| `shopping` | "쇼핑" 타이틀 | 프로필·검색 | §2-4 |
| `loop` | 추천/인기 탭 | 검색·음소거 | §2-5, 다크모드 (현재 M:AI 라벨은 `BottomTabBar`에서만 반영, 페이지는 placeholder) |

### `<BottomTabBar>` (layout/BottomTabBar.tsx)

- 5탭: 홈·콘텐츠·커뮤니티·쇼핑·**M:AI** (구 루프)
- M:AI 탭 아이콘: lucide-react `Bot`
- 활성 탭은 컬러 아이콘, 비활성은 회색
- `position: fixed` 하단 (모바일) / 프레임 내 bottom 고정 (데스크탑)

### `<InAppBrowserBar>` (layout/InAppBrowserBar.tsx)

- 상세 뷰에서만 사용
- 구성: Daum 로고 + ← → + 🔍 검색 + 🔗 공유 + ⋯ 더보기

### `<SubTabBar>` (ui/SubTabBar.tsx)

- 콘텐츠탭·쇼핑탭·커뮤니티탭·루프탭에서 공용
- 가로 스크롤 탭 리스트
- 활성 탭에 굵은 글씨 + 하단 밑줄 인디케이터
- props: `tabs`, `activeTab`, `onChange`

### `<NewsCard>` (ui/NewsCard.tsx)

- 가장 많이 쓰는 카드
- 구조: 좌측 제목(2줄) + 메타(출처·시간·더보기) + 우측 썸네일
- 목업 데이터 기반

### `<LiveBadge>` `<AdBadge>` (ui/badges.tsx)

- LIVE: 빨간 배경 + 흰 텍스트 + 맥동 dot
- AD: 회색 배경 + "AD" 또는 ⓘ 마크

---

## 4. 화면별 구현 계획

### 4-1. 홈탭 (`/`)

**참조**: §2-1
**구현 순서**:

1. `<HomeHeader>` — 햄버거 + 로고 + 우측 아이콘 3개 + 검색바
2. `<RealtimeTrend>` — 실시간 트렌드 (기본 2건, 펼치면 10건)
3. `<WidgetCarousel>` — 날씨·주식·스포츠·커뮤니티 위젯 가로 스크롤
4. `<IssueSlot>` — 텍스트 전용 이슈 4건
5. `<NewsFeed>` — 뉴스 카드 반복 (무한 스크롤 대신 20개 정도 스태틱)
6. `<SubscribedPublishers>` — 구독 언론사 가로 스크롤
7. `<LiveSection>` — 실시간 라이브
8. `<HotStocks>` — HOT 종목 현황
9. 피드 중간 광고 카드 삽입 (AD 마크)
10. 하단 실시간 트렌드 재노출

**목업 데이터 필요**: 트렌드 키워드, 뉴스 카드 30개, 위젯 데이터, 언론사 리스트, 라이브 콘텐츠

### 4-2. 콘텐츠탭 (`/contents`, `/contents/:subtab`)

**참조**: §2-2
**공통 동작**:
- `<AppShell scrollableHeader>` — "콘텐츠" 헤더는 스크롤되면 사라짐
- `<SubTabBar>` — `sticky top-0 z-20` 으로 스크롤 중에도 최상단 고정
- 서브탭 하단에 `<SiteFooter />` 공통 배치

**구현된 서브탭**:

| 서브탭 | 경로 | 주요 슬롯 |
|---|---|---|
| 뉴스 | `/contents/news` | BannerAd · MajorHeadlines · CompactWeather · RecommendNewsList · PhotoNewsCarousel · MoreHeadlines · AdBanner · ShortsSection · LiveNewsSection |
| 스포츠 | `/contents/sports` | BizBoard(compact) · ScoreBoardSection(분석 버튼, 종목 드롭다운) · TextArticleList · HeadlineList ×N · SportsSubmenuBar · SportsVideosSection(드래그 스크롤) · 오늘의 루프(쇼츠 포맷) |
| 연예 | `/contents/entertain` | BizBoard · TextArticleList(5) · NewsGrid(2) · MainHeadlineCard · BannerAd · HeadlineList "연예 주요 뉴스"(5) · NewsGrid(4) · AdBanner · EntertainCelebs · EntertainTrendGrid · ShortsSection "오늘의 루프" · AdBanner · TodayRankedNews · HeadlineList "투데이 연예"(10) |
| 머니 | `/contents/money` | BizBoard(compact) · TextArticleList(5) · NewsGrid(2) · AdBanner · MainHeadlineCard · MarketIndicesGrid · HeadlineList "환율·금리 뉴스"(5) · ExchangeRateTable · BannerAd · HeadlineList "증권·경제 뉴스" · HotStocks · AdBanner · NewsGrid "부동산·금융" · ShortsSection "오늘의 루프" · HeadlineList "증시 투자 포인트"(10) |

**미구현(placeholder)**: 언론사·라이브·쇼핑(콘텐츠)·FUN·홈&쿠킹·스타일·여행맛집·지식교양·자동차+·동물

미구현 서브탭 플레이스홀더는 현재 **구현된 서브탭 칩(뉴스·스포츠·연예·머니)**을 클릭 가능한 링크로 제공한다.

**컴포넌트 (`components/contents/` 하위, 모두 도메인 중립)**:
- `MainHeadlineCard` — 메인 헤드라인 (이전 이름: `SportsMainHeadline`)
- `HeadlineList` — 좌측 제목 + 우측 썸네일 리스트 (이전 이름: `SportsHeadlineList`)
- `NewsGrid` — 썸네일 위 / 제목 아래 2열 그리드 (이전 이름: `SportsNewsGrid`)
- `TextArticleList` — 텍스트 1줄 리스트, `ContentArticle[]` 입력 (이전 이름: `TextOnlyArticleList` → 한 차례 `TextHeadlineList`였으나 `ui/TextHeadlineList`와 이름 충돌로 재명명)
- 참고: `ui/TextHeadlineList`는 별개 컴포넌트. `{id, title}` 받고 각 항목을 `<Link to="/news/:id">`로 감쌈. 홈/뉴스/콘텐츠 쪽 헤드라인 섹션에서 사용
- `ScoreBoardSection`, `SportCategoryChips`, `SportsVideosSection`, `SportsSubmenuBar` — 스포츠 전용
- `EntertainCelebs`, `EntertainTrendGrid`, `TodayRankedNews` — 연예 전용
- `MarketIndicesGrid`, `ExchangeRateTable` — 머니 전용
- `SubtabSections` — children 사이에 자동으로 Gap(4px gray bar) 삽입 + 말미에 SiteFooter. 서브탭 정의 간결화

**공용 primitive (`components/ui/` 하위)**:
- `ArticleMeta` — publisher · elapsed · commentCount 메타 라인 (logo option, sm/md size)
- `Thumbnail` — `thumbnailUrl ?? placeholderImg(seed, topic)` 분기 + lazy / object-cover 통합
- `patterns/` — 탭을 가로지르는 재사용 슬롯 자리. 오너 요청 기반으로 추가 (규칙: `docs/ui_patterns.md`)

**타입 / 유틸**:
- `ContentArticle` (`src/types/index.ts`) — 단일 기사 타입. mock 파일들은 별칭만 유지 (`SportsArticle/MoneyArticle/EntertainArticle` → `ContentArticle`)
- `placeholderImg` (`src/lib/img.ts`) — loremflickr 기반 seed 해시 lock 이미지 URL 생성기 (이전 이름 `sportImg`)

**페이지 구조**:
- `ContentsPage.tsx` — 라우팅 + SubtabPlaceholder만 (약 60줄)
- `pages/contents/{News,Sports,Entertain,Money}Subtab.tsx` — 각 서브탭 정의를 별도 파일로 분리. `SubtabSections` wrapper로 `<Gap />`을 자동 삽입

### 4-3. 커뮤니티탭 (`/community`)

**참조**: §2-3 **"변경 후 구조"** (개편 후 기준)
**이유**: 4월 말 개편 예정, 신규 AI 기능 기획은 개편 후 구조를 전제

**구현 순서**:

1. `<CommunityHeader>` — 알림 + 검색
2. `<SubTabBar>` — 실시간/발견
3. 실시간 서브탭:
   - 인기 토픽 (01~06, 2열 칩)
   - 추천글 섹션 헤더
   - 게시글 피드 (프로필+본문+해시태그+이미지+링크프리뷰+인터랙션바)
   - "나와 비슷한 사용자 추천" 카드
   - "떠오르는 핫 이슈" 카드
4. 발견 서브탭:
   - 오늘의 추천 토픽 2×2 그리드
   - 지금 가장 인기 있는 토픽 칩 스크롤
   - 토픽별 인기 게시글 피드
5. 하단 우측 FAB "글쓰기" 버튼

### 4-4. 쇼핑탭 (`/shopping`)

**참조**: §2-4 **"현재 구조"**
**주의**: 6월 말 AI 검색 탭으로 전환 예정. 간소하게 구현.

**구현 순서**:

1. `<ShoppingHeader>` — 타이틀 + 프로필 + 검색
2. `<SubTabBar>` — 투데이·톡딜·멀티샵·여행·차살때·반려동물
3. 프로모션 배너
4. 트렌드Pick 3열 그리드

**선택**: AI 검색 탭 변경 후 구조 preview 화면을 `/ai-search` 경로로 별도 제공 (기획용)

### 4-5. M:AI 탭 (`/loop`) — 구 루프탭

**상태**: placeholder 백지 화면 + "작업 예정" 텍스트 + 하단 `BottomTabBar`만 유지.

**배경**: 기존 루프탭 영상 피드 UI는 제거. M:AI 탭 자체 콘텐츠(신규 AI 기능 진입점)를 추후 별도 기획으로 채울 예정. 현재는 탭 존재감(아이콘=Bot, 라벨=M:AI)만 유지.

### 4-6. 뉴스 기사 상세 (`/news/:id`)

**참조**: §3-1
**특징**: 인앱 브라우저 느낌. 하단에 InAppBrowserBar 고정.
**스크롤 동작**: `<DetailShell scrollableTopBar>`로 주소창은 스크롤되어 사라지고, `PublisherHeader`는 `sticky top-0 z-20` 으로 상단 고정.

**구현 순서**:

1. 상단 URL 바 (← + v.daum.net + 새로고침) — 스크롤 시 사라짐
2. 언론사 헤더 (로고 + 언론사명 + 구독 + 아이콘) — sticky
3. 기사 본문 (제목·기자·작성일·유틸 아이콘·본문·인라인 이미지)
4. 감정 반응 투표 (5종 이모지)
5. 같은 언론사 다른 기사 추천
6. 타임톡 섹션
7. 관련 기사 추천 + 실시간 트렌드 + 루프 캐러셀 + 언론사 랭킹
8. `<SiteFooter />`
9. 하단 `<InAppBrowserBar>` (홈 버튼 = `/` 이동)

### 4-7. 채널뷰 (`/channel/:id`)

**참조**: §3-2
**구분**: 뉴스 기사 상세와 디자인 차이 (블로그형)
**스크롤 동작**: 뉴스뷰와 동일. 주소창 사라지고 `DaumChannelHeader`가 `sticky top-0 z-20`.

**구현 순서**:

1. 상단 바 (← + 채널명 + 공유·더보기) — 스크롤 시 사라짐
2. Daum 채널 헤더 — sticky
3. 게시글 본문 (제목·작성자·일시·조회수·본문·인용문 블록)
4. 채널 프로필 카드 재노출
5. 좋아요·댓글·공유 인터랙션 바
6. 일반 댓글 (타임톡 아님)
7. 하단 추천 콘텐츠
8. `<SiteFooter />` (기존 `ChannelFooter`를 대체)
9. 하단 `<InAppBrowserBar>` (홈 버튼 = `/` 이동)

### 4-8. 검색 (`/search`)

**참조**: §3-3 (목업에서 상당한 리디자인 적용됨)

**입력 화면** (query === null):
- 검색바(autoFocus) + 최근 검색어 리스트(`SearchInputScreen`)
- URL 주소창·하단 인앱브라우저 바 모두 숨김

**결과 화면** (query !== null):
1. `<UrlTopBar url="search.daum.net/?q=..." />` (뉴스뷰와 동일 스타일 주소창)
2. `<SearchBar>` (흰색 fill + 얇은 테두리, 뒤로가기 없음, 주소창 아래)
3. `<SearchTabBar>` (통합·뉴스·통합웹·동영상·쇼핑·이미지·책)
4. `<RealtimeTrendStrip>` — 한 줄 "실시간"(파란 칩) + 순위 + 키워드, 자동 순환
5. `<RelatedKeywords>` — 쿼리 프리픽스 제거, 가로 flex-wrap 텍스트, 2줄 클램프 + 펼치기
6. `<AiSummarySection>` — 그라디언트 보더 없는 요약 카드(3줄 클램프/더보기/출처 칩/좋아요·싫어요), 다른 슬롯과 `px-4` 마진 동일
7. `<PowerlinkSection>`
8. `<NewsSection>`
9. `<EncyclopediaSection>` (신규) — 썸네일 + 용어(카테고리) + 4줄 요약 + 출처
10. `<CafeSection>`
11. `<BlogSection>`
12. `<ShoppingSection>` (신규) — 2열 상품 카드 (할인율·가격·샵·별점·리뷰수)
13. `<WebDocSection>`
14. `<ImageSection>`
15. `<VideoSection>`
16. `<ShortsSection title="다음 루프">`
17. `<SiteFooter />`
18. 하단 `<InAppBrowserBar onHome={() => navigate('/')}>`

**삭제된 요소**: 바로가기(`ShortcutSection`), 하단 검색바(`BottomSearchBar`), 하단 반복 관련 검색어

**진입 플로우**:
1. 홈(또는 다른 탭) 상단 Daum 검색바(`<Link to="/search">`) → 입력 화면
2. 최근 검색어 클릭 → `submit(keyword)` → 결과 화면
3. 입력 + Enter → 결과 화면

### 4-9. 사이드 메뉴 (`/menu` or overlay)

**참조**: §1 사이드 메뉴
**구현 선택**: 풀페이지 라우트 OR 홈탭 위 오버레이 슬라이드인

추천: 오버레이 슬라이드인 (좌→우)
- 프로필 영역
- 메일/카페 바로가기
- 서비스 그리드 (금융·뉴스·스포츠·날씨·카카오맵·다음사전·웹툰·전체서비스)
- 자주 가는 사이트
- 공지사항
- 하단 (글꼴·로그아웃)

---

## 5. 목업 데이터 전략

### 원칙

- 실제 언론사·기사 제목·인물명을 **그대로 복사 금지** (저작권/초상권 회피)
- 장르·톤은 실제와 비슷하게, 내용은 **fictitious**
- 이미지는 `https://picsum.photos/seed/{id}/400/300` 같은 seed 기반 placeholder

### 파일 구조

```
src/mocks/
├── trends.ts         # 실시간 트렌드 키워드
├── news.ts           # 뉴스 기사 (30+)
├── publishers.ts     # 언론사 리스트
├── channels.ts       # 채널 리스트
├── community.ts      # 커뮤니티 게시글
├── stocks.ts         # 주식 종목
├── weather.ts        # 날씨
├── live.ts           # 라이브 콘텐츠
└── index.ts          # 통합 export
```

### 타입 예시

```ts
// types/index.ts
export interface NewsArticle {
  id: string;
  title: string;
  publisher: string;
  publishedAt: string;      // ISO
  thumbnailUrl: string;
  category: 'media' | 'entertain' | 'sports' | 'economy' | 'it' | 'life';
  content?: string;         // 상세에서만 사용
  viewCount?: number;
}

export interface Trend {
  rank: number;
  keyword: string;
  status: 'new' | 'up' | 'down' | 'same';
}

export interface CommunityPost {
  id: string;
  author: { name: string; avatarUrl: string };
  category: string;
  createdAt: string;
  content: string;
  tags: string[];
  media?: { type: 'image' | 'video' | 'link'; url: string; title?: string }[];
  likes: number;
  comments: number;
}
```

---

## 6. 작업 마일스톤

### Milestone 1: 기본 골격

- [x] 프로젝트 스캐폴드 (Vite + Tailwind + Router)
- [x] `PhoneFrame` 반응형 동작 확인
- [x] `AppShell` + `BottomTabBar` + 빈 페이지 5개

### Milestone 2: 홈탭 완성

- [x] 홈탭 전체 섹션
- [x] 목업 데이터 투입
- [ ] 사이드 메뉴 (미구현, 햄버거 버튼 onClick 미연결)

### Milestone 3: 콘텐츠탭 + 뉴스 상세

- [x] 콘텐츠탭 뉴스 서브탭
- [x] 콘텐츠탭 스포츠·연예·머니 서브탭 (screenshots 기반 구현)
- [ ] 나머지 서브탭(언론사·라이브·쇼핑·FUN 등) — 현재 placeholder
- [x] 뉴스 기사 상세 (+ sticky 매체 헤더 · scrollable URL 바)
- [x] 채널뷰 (+ sticky Daum 채널 헤더)

### Milestone 4: 검색 + 커뮤니티

- [x] 검색 입력 화면 + 검색 결과 화면 (대규모 리디자인: AI 요약·백과사전·쇼핑 슬롯 포함)
- [ ] 커뮤니티탭 (개편 후 구조) — 미구현 stub

### Milestone 5: 마감

- [ ] 쇼핑탭 — 미구현 stub
- [x] M:AI 탭(구 루프탭) — 백지 placeholder 상태
- [x] 탭 간 이동 (홈 검색바 → 검색, 상세 → 홈 버튼)
- [ ] 탭 전환 트랜지션 다듬기
- [ ] 데스크탑·모바일 QA 체크

---

## 7. QA 체크리스트

### 반응형

- [ ] Chrome DevTools에서 iPhone 12 Pro (390×844) 뷰 → 풀스크린 정상
- [ ] 1280px 데스크탑 뷰 → 폰 프레임 중앙 정렬, 스크롤 정상
- [ ] 1024px 경계에서 전환 smooth
- [ ] 375px 등 더 좁은 모바일에서도 레이아웃 깨지지 않음

### 기능

- [ ] 탭 간 이동 정상 (URL 변경됨)
- [ ] 뉴스 카드 클릭 → 상세 뷰
- [ ] 채널 카드 클릭 → 채널뷰
- [ ] 검색 아이콘 클릭 → 검색 화면
- [ ] 사이드 메뉴 열기/닫기
- [ ] 상세 뷰 → 뒤로가기

### 접근성·품질

- [ ] 이미지 alt 텍스트
- [ ] 버튼·링크 semantic HTML
- [ ] TypeScript 에러 0
- [ ] `npm run build` 성공

---

## 8. 다음 단계 (목업 완성 이후)

목업이 완성되면 아래 AI 기능 기획에 활용:

- P1 (뉴스 재순환형): 이슈 맥락 AI 요약, 관심사 기반 뉴스 큐레이션
- P2 (홈탭 탐색형): 의도 라우팅, 개인화 피드 개선
- P3 (검색 목적형): AI 검색 요약, 왕복 해소
- 공통: 댓글 핵심 의견 요약

각 AI 기능은 이 목업을 기반으로 별도 branch에서 prototype.

---

## 9. 구현 현황 스냅샷 (2026-04-23 기준)

### 라우트 상태

| 경로 | 상태 | 비고 |
|---|---|---|
| `/` | 완료 | 홈탭 전 섹션 |
| `/contents/news` | 완료 | 뉴스 서브탭 |
| `/contents/sports` | 완료 | 스코어보드 + 오늘의 루프(쇼츠) 등 다수 슬롯 |
| `/contents/entertain` | 완료 | 스타 캐러셀 + 트렌드 그리드 + 랭킹 |
| `/contents/money` | 완료 | 금융시장 지수 + 환율 테이블 + 종목 랭킹 |
| `/contents/:other` | placeholder | 기타 서브탭 |
| `/community` | stub | |
| `/shopping` | stub | |
| `/loop` (M:AI) | placeholder | 백지 + "작업 예정" |
| `/news/:id` | 완료 | sticky 매체 헤더 |
| `/channel/:id` | 완료 | sticky 채널 헤더 |
| `/search` | 완료 | 대규모 리디자인(AI 요약 등) |
| `/menu` | 미구현 | 라우트 자체 없음 |

### 공통 레이아웃 보강 이력

- `AppShell.scrollableHeader` — 콘텐츠탭에서 "콘텐츠" 헤더가 스크롤 시 사라지고 `SubTabBar`만 sticky
- `DetailShell.scrollableTopBar` — 뉴스·채널뷰에서 주소창이 스크롤 시 사라지고 매체/채널 헤더가 sticky
- `SiteFooter` — 뉴스/스포츠/연예/머니/검색/뉴스뷰/채널뷰 공통 하단 푸터(© AXZ Corp)
- `InAppBrowserBar.onHome` — 상세 뷰(뉴스·채널·검색) 하단 툴바 1번 버튼 → `/` 네비게이션
- `BottomTabBar` — 5번째 탭 라벨 "M:AI" + `Bot` 아이콘

### Mock 데이터 파일

- `src/mocks/sports.ts` — 종목·경기·뉴스·영상·숏츠·서브메뉴 (하위 다양한 슬롯용)
- `src/mocks/entertain.ts` — 스타·트렌드·랭킹 뉴스 + Wikimedia 한국 연예인 사진 `IMG` 상수
- `src/mocks/money.ts` — 지수·환율·증권 뉴스·부동산·투자포인트(10개) + Wikimedia 비즈니스 인물 사진 `IMG` 상수 (민간 CEO / 중앙은행장만, 정치인 제외)
- `src/mocks/searchResult.ts` — 백과사전(`ENCYCLOPEDIA`), 쇼핑(`SHOPPING`)

### 유틸

- `src/lib/img.ts` — `placeholderImg(seed, w, h, topic)` loremflickr 기반 결정적 이미지 URL 생성기 (이전 이름 `sportImg`)

### 이미지 URL 전략

- **동적 placeholder**: `placeholderImg` 사용. seed 해시로 결정적, 같은 seed → 같은 이미지
- **Wikimedia 원본 URL**: 연예인·경제 인물처럼 실제 얼굴이 필요한 섹션. `/thumb/` 경로는 사용자 IP 기준 400 반환될 수 있어 **원본(non-thumb)** URL 사용

### 디자인 시스템 (토큰은 정의만, 선택적 도입 상태)

`tailwind.config.js` 에 `fontSize` / `colors.content` / `colors.surface` / `borderRadius` 의 semantic token이 정의돼 있다. 현재 **키프 리스트(공용 primitive 10개 컴포넌트)** 만 토큰을 사용하고, 기존 코드는 `text-[Npx]` / `gray-XXX` 하드코딩을 유지한다.

**핵심 규칙**
- 토큰 도입은 **점진적**. 새 컴포넌트 작성 또는 기존 컴포넌트를 구조적으로 손볼 때 자연스럽게 전환
- **전역 sed 일괄 치환 금지** (과거 회귀 발생)
- `fontSize` 토큰에는 line-height를 싣지 않음. 필요한 경우 `leading-*` 클래스로 별도 지정 (이걸 안 지키면 기존 레이아웃이 무더기로 깨짐)

