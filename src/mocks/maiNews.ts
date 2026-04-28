import { placeholderImg } from '@/lib/img';

export type FeedItem =
  | { kind: 'n17'; data: BriefingData }
  | { kind: 'n11'; data: SpikeData }
  | { kind: 'n1a'; data: ArticleSingleData }
  | { kind: 'n1b'; data: ArticleMultiData }
  | { kind: 'n9a'; data: EnvAnomalyData }
  | { kind: 'n9b'; data: AssetAnomalyData }
  | { kind: 'n18'; data: FlashData }
  | { kind: 'n8a'; data: FollowupData }
  | { kind: 'n8b'; data: FollowupData }
  | { kind: 'n4'; data: KeywordRecData }
  | { kind: 'n19'; data: LocalPopularData }
  | { kind: 'n20a'; data: CohortPopularData }
  | { kind: 'n20b'; data: CohortNewSubData }
  | { kind: 'n14'; data: TrendingData };

export interface BriefingData {
  variant: 'morning' | 'evening';
  title: string;
  duration: string;
  keywords: string[];
  summary: string;
  basedOnCount: number;
  nextLabel: string;
  thumbnailSeed?: string;
}

export interface SpikeData {
  mode: 'volume' | 'newKeyword';
  keyword: string;
  multiplier?: string;
  baseline?: string;
  newKeyword?: string;
  newCount?: number;
  cause: string;
  causeConfidence: 'L2' | 'L3' | 'L4';
  articleCount: number;
  spark: number[];
}

export interface ArticleSingleData {
  publisher: string;
  publisherLogoSeed: string;
  elapsed: string;
  keywords: string[];
  title: string;
  summary: string;
  contextTag?: string;
  thumbnailSeed?: string;
  thumbnailTopic?: string;
  thumbnailUrl?: string;
}

export interface ArticleMultiData {
  leadPublisher: string;
  publisherLogoSeed: string;
  otherCount: number;
  elapsed: string;
  keywords: string[];
  title: string;
  summary: string;
  thumbnailSeed?: string;
  thumbnailTopic?: string;
  thumbnailUrl?: string;
  otherPublishers?: { name: string; logoSeed: string; headline: string; elapsed: string }[];
}

export interface EnvAnomalyData {
  context: string;
  emoji: string;
  headline: string;
  detail: string;
  action: string;
  source: string;
}

export interface AssetAnomalyData {
  context: string;
  asset: string;
  direction: 'up' | 'down';
  changeLabel: string;
  detail: string;
  observation: string;
  source: string;
  spark: number[];
}

export interface FlashData {
  duration: string;
  keyword: string;
  summary: string;
  basedOnCount: number;
}

export interface FollowupData {
  variant: 'series' | 'byline';
  observation: string;
  publisher: string;
  byline?: string;
  title: string;
  elapsed: string;
}

export interface KeywordRecData {
  variant: 'behavior' | 'adjacent';
  observation: string;
  keywords: { keyword: string; description: string }[];
}

export interface LocalPopularData {
  region: string;
  scope: 'neighborhood' | 'metro';
  items: { emoji: string; title: string; publisher: string; elapsed: string; trending?: boolean }[];
  sampleNote: string;
}

export interface CohortPopularData {
  cohortBasis: string;
  sampleSize: string;
  items: { title: string; publisher: string; views: string }[];
}

export interface CohortNewSubData {
  cohortBasis: string;
  sampleSize: string;
  items: { keyword: string; addedCount: number; note?: string }[];
}

export interface TrendingData {
  scope: 'all' | 'adjacent';
  items: { keyword: string; meta: string }[];
}

// 디자인·내용 검토용으로 슬롯 ID 순으로 정렬했음. 추후 실제 피드 시뮬레이션 모드가
// 필요하면 별도 배열을 만들거나 셔플 로직을 더하기.
export const MAI_NEWS_FEED: FeedItem[] = [
  // ── N-1a · 단일매체 기사 ─────────────────────
  {
    kind: 'n1a',
    data: {
      publisher: 'MBC 뉴스데스크',
      publisherLogoSeed: 'mbc',
      elapsed: '14분 전',
      keywords: ['이란 전쟁', '호르무즈 해협'],
      title: '"호르무즈 통항 선박, 하루 15척 제한"… "강경한 태도로 협상 나설 듯"',
      summary:
        '이란 외무부는 호르무즈 해협을 통과하는 선박을 하루 15척으로 엄격히 제한한다고 밝혔다. 선박 이동은 이란 당국의 승인과 군의 감독이 전제된다.',
      contextTag: '이 키워드 이번 주 보도량 평소 대비 ×4.6',
      thumbnailSeed: 'hormuz-strait',
      thumbnailTopic: 'oil,tanker,strait',
    },
  },

  // ── N-1b · 다매체 묶음 ─────────────────────
  {
    kind: 'n1b',
    data: {
      leadPublisher: 'MBC 뉴스데스크',
      publisherLogoSeed: 'mbc',
      otherCount: 8,
      elapsed: '38분 전',
      keywords: ['유가', '이란 전쟁'],
      title: '"통과하려다 회항 속출"… 호르무즈 \'역봉쇄\' 현실화? WTI 96달러대',
      summary:
        '호르무즈 통과 시도 선박들의 회항이 잇따르며 \'역봉쇄\' 우려가 커지고 있다. WTI는 4월 26일 96.23달러로 +1.94% 상승, 브렌트유도 92달러대로 진입했다.',
      thumbnailSeed: 'oil-price-96',
      thumbnailTopic: 'oil,price,gas,station',
      otherPublishers: [
        { name: '연합뉴스', logoSeed: 'yna', headline: '"호르무즈 회항 속출"…\'역봉쇄\' 우려에 WTI 96달러 돌파', elapsed: '42분 전' },
        { name: '한국경제', logoSeed: 'hk', headline: '\'역봉쇄\' 현실화…유가·환율 동반 충격, 정유주 일제 급등', elapsed: '51분 전' },
        { name: '조선일보', logoSeed: 'chosun', headline: '하루 15척 제한에 회항 잇따라…\'역봉쇄\' 시나리오 부상', elapsed: '1시간 전' },
        { name: '중앙일보', logoSeed: 'joongang', headline: '호르무즈 통항 제한…정유 4사 "재고 충분, 상황 예의주시"', elapsed: '1시간 전' },
        { name: '동아일보', logoSeed: 'donga', headline: '"이란發 \'역봉쇄\' 본격화"…브렌트유 92달러대 진입', elapsed: '1시간 전' },
        { name: 'JTBC', logoSeed: 'jtbc', headline: '국제유가 96달러…호르무즈 회항 사태 격화', elapsed: '2시간 전' },
        { name: '경향신문', logoSeed: 'khan', headline: '"\'역봉쇄\' 우려 현실로"…한국 수입 원유 70% 호르무즈 통과', elapsed: '2시간 전' },
        { name: 'SBS', logoSeed: 'sbs', headline: '하루 15척 제한 첫날 회항 잇따라…유가 96달러 돌파', elapsed: '3시간 전' },
      ],
    },
  },

  // ── N-4a · 키워드 추천 (행동 기반) ─────────────────────
  {
    kind: 'n4',
    data: {
      variant: 'behavior',
      observation: "최근 '호르무즈 해협' 기사를 자주 보셨네요",
      keywords: [{ keyword: '호르무즈 해협', description: '이란 전쟁과 자주 묶이는 지정학 키워드' }],
    },
  },

  // ── N-4b · 키워드 추천 (인접 확장) ─────────────────────
  {
    kind: 'n4',
    data: {
      variant: 'adjacent',
      observation: "'반도체'를 추적 중이라면 이 키워드도 도움이 돼요",
      keywords: [
        { keyword: 'HBM', description: '고대역폭 메모리, 최근 반도체 보도의 60%가 함께 언급' },
        { keyword: '수출 규제', description: '정책 변동이 반도체 산업에 미치는 영향' },
      ],
    },
  },

  // ── N-8a · 콘텐츠결 후속 (시리즈) ─────────────────────
  {
    kind: 'n8a',
    data: {
      variant: 'series',
      observation: "'반도체 한국 길을 묻다 ②' 기사를 끝까지 보셨네요. 같은 시리즈의 ③화가 올라왔어요",
      publisher: '매일경제',
      title: '반도체 한국 길을 묻다 ③ 미·중 사이의 줄타기',
      elapsed: '2시간 전',
    },
  },

  // ── N-8b · 콘텐츠결 후속 (동일 기자) ─────────────────────
  {
    kind: 'n8b',
    data: {
      variant: 'byline',
      observation: "'이란 전쟁' 김도연 기자 분석을 정독하셨네요. 같은 기자의 후속 분석이 올라왔어요",
      publisher: '한국일보',
      byline: '김도연 기자',
      title: '하루 15척 시대 — 호르무즈 \'역봉쇄\' 시나리오와 한국 정유사 대응',
      elapsed: '30분 전',
    },
  },

  // ── N-9a · 환경 컨텍스트 ─────────────────────
  {
    kind: 'n9a',
    data: {
      context: '현재 위치 · 분당 백현동',
      emoji: '☔',
      headline: '오늘 오후 비 소식',
      detail: '오후 3시~5시, 강수확률 80%',
      action: '외출 예정이라면 우산 챙기세요',
      source: '기상청 단기예보',
    },
  },

  // ── N-9b · 관심 자산 변동 ─────────────────────
  {
    kind: 'n9b',
    data: {
      context: '관심 종목 · 삼성전자',
      asset: '삼성전자',
      direction: 'up',
      changeLabel: '▲ +5.4%',
      detail: '일중, 오전 11:30 기준',
      observation: '평소 ±2% 범위에서 움직이던 종목이 평소보다 크게 움직였어요',
      source: '한국거래소',
      spark: [62000, 62200, 62100, 62500, 62800, 63100, 63600, 64200, 64500, 65100, 65300, 65000],
    },
  },

  // ── N-11a · 이슈 급증 (보도량) ─────────────────────
  {
    kind: 'n11',
    data: {
      mode: 'volume',
      keyword: '이란 전쟁',
      multiplier: '×4.6',
      baseline: '최근 30일 평균 대비',
      cause: '호르무즈 일일 15척 제한 발표 + 미·이란 휴전 무기한 연장',
      causeConfidence: 'L4',
      articleCount: 53,
      spark: [4, 5, 6, 5, 7, 8, 9, 11, 14, 18, 22, 28, 32, 38, 42, 47, 52, 58, 64, 70, 76, 82, 88, 94],
    },
  },

  // ── N-11b · 이슈 급증 (신규 키워드 출현) ─────────────────────
  {
    kind: 'n11',
    data: {
      mode: 'newKeyword',
      keyword: '반도체',
      newKeyword: 'HBM4E',
      newCount: 31,
      cause: '주요 메모리 제조사 컨퍼런스 발표',
      causeConfidence: 'L2',
      articleCount: 31,
      spark: [0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 3, 4, 6, 8, 11, 14, 17, 21, 24, 26, 28, 30, 31, 31],
    },
  },

  // ── N-14a · 트렌딩 (전체) ─────────────────────
  {
    kind: 'n14',
    data: {
      scope: 'all',
      items: [
        { keyword: '이란 전쟁', meta: '12.4만 명' },
        { keyword: '늑구', meta: '9.3만 명' },
        { keyword: 'HBM', meta: '8.7만 명' },
        { keyword: '환율', meta: '6.2만 명' },
        { keyword: '호르무즈 해협', meta: '5.1만 명' },
        { keyword: '상괭이', meta: '2.8만 명' },
      ],
    },
  },

  // ── N-14b · 트렌딩 (인접) ─────────────────────
  {
    kind: 'n14',
    data: {
      scope: 'adjacent',
      items: [
        { keyword: '호르무즈 해협', meta: '+1.0만 신규' },
        { keyword: '한국 자동차', meta: '+7천 신규' },
        { keyword: '오월드', meta: '+2.4만 신규' },
        { keyword: 'HBM4E', meta: '+5천 신규' },
      ],
    },
  },

  // ── N-17a · 모닝 브리핑 ─────────────────────
  {
    kind: 'n17',
    data: {
      variant: 'morning',
      title: '오늘 아침 브리핑',
      duration: '4분 52초',
      keywords: ['이란 전쟁', '유가', '반도체', '늑구'],
      summary:
        '호르무즈 일일 통항 15척 제한, WTI 96달러 돌파, SK하이닉스 HBM4 양산 안정화, 그리고 오월드 5월 재개장 불투명',
      basedOnCount: 28,
      nextLabel: '오늘 19시',
      thumbnailSeed: 'morning-sun',
    },
  },

  // ── N-17b · 이브닝 브리핑 ─────────────────────
  {
    kind: 'n17',
    data: {
      variant: 'evening',
      title: '오늘 저녁 브리핑 (예약)',
      duration: '5분 18초 · 19시 공개',
      keywords: ['이란 전쟁', '주가', '상괭이'],
      summary:
        '호르무즈 15척 시대 이후 시장 반응, 한화이글스 시구 이슈, 그리고 상괭이 혼획 폐사 실태 — 하루를 정리하는 5분',
      basedOnCount: 31,
      nextLabel: '내일 7시',
      thumbnailSeed: 'evening-blue',
    },
  },

  // ── N-18 · 속보 플래시 ─────────────────────
  {
    kind: 'n18',
    data: {
      duration: '0:48',
      keyword: '늑구',
      summary:
        '오월드 "늑구 근황 당분간 공개 안 할 것"… 회복기 안정과 보안 우려가 이유, 5월 재개장도 불투명',
      basedOnCount: 18,
    },
  },

  // ── N-19a · 동네 인기 (동/구) ─────────────────────
  {
    kind: 'n19',
    data: {
      region: '대전 중구',
      scope: 'neighborhood',
      items: [
        {
          emoji: '🐺',
          title: '오월드 "늑구 근황 당분간 공개 안 할 것"… 이유는?',
          publisher: '국민일보',
          elapsed: '1시간 전',
          trending: true,
        },
        {
          emoji: '☕',
          title: '"매출 0원 됐지만"… \'늑구 수색대\'에 커피 4,500잔 무료 제공한 오월드 카페 점주',
          publisher: '인사이트',
          elapsed: '4시간 전',
        },
        {
          emoji: '🥖',
          title: '성심당 본점 4월 한정 신메뉴 출시·평일 대기 1시간',
          publisher: '대전일보',
          elapsed: '6시간 전',
        },
      ],
      sampleNote: '이 동네 익명 군집 기준 인기 기사 · n≥240명 열람',
    },
  },

  // ── N-19b · 동네 인기 (광역) ─────────────────────
  {
    kind: 'n19',
    data: {
      region: '대전',
      scope: 'metro',
      items: [
        {
          emoji: '🐺',
          title: '늑구 탈출 여파 길어진다… 오월드 \'5월 재개장\' 어려울 듯',
          publisher: '머니투데이',
          elapsed: '1시간 전',
          trending: true,
        },
        {
          emoji: '🏟️',
          title: '한화이글스 홈경기 4월 28일 시구·티켓 매진',
          publisher: '디트뉴스24',
          elapsed: '4시간 전',
        },
        {
          emoji: '🚌',
          title: '대전 시내버스 노선 5월 일부 개편 안내',
          publisher: '대전시 공식',
          elapsed: '7시간 전',
        },
      ],
      sampleNote: '대전 지역 익명 군집 기준 인기 기사',
    },
  },

  // ── N-20a · 코호트 인기 기사 ─────────────────────
  {
    kind: 'n20a',
    data: {
      cohortBasis: '반도체·주가·유가를 함께 구독하는 코호트',
      sampleSize: 'n≈4,200',
      items: [
        {
          title: 'HBM4 석 달, 삼성은 \'최초\'·SK하이닉스는 \'수율 안정\'… 엔비디아 수주 승자는',
          publisher: '글로벌이코노믹',
          views: '1.4만 명',
        },
        {
          title: '호르무즈 \'역봉쇄\' 현실화, 코스피·환율 동시 충격',
          publisher: '한국경제',
          views: '1.1만 명',
        },
      ],
    },
  },

  // ── N-20b · 코호트 신규 구독 ─────────────────────
  {
    kind: 'n20b',
    data: {
      cohortBasis: '반도체·주가·유가를 함께 구독하는 코호트',
      sampleSize: 'n≈4,200',
      items: [
        { keyword: 'HBM', addedCount: 1400, note: '메모리 차세대 표준' },
        { keyword: '호르무즈 해협', addedCount: 980, note: '이란 전쟁 인접' },
        { keyword: '오월드', addedCount: 810, note: '늑구와 함께 추적' },
      ],
    },
  },
];

export const MAI_FEED_THUMBS = (seed: string, topic: string) =>
  placeholderImg(seed, 240, 240, topic);
