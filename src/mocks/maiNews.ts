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

export type EnvTone = 'rain' | 'traffic' | 'dust' | 'cold' | 'heat';

export interface EnvAnomalyData {
  context: string;
  emoji: string;
  tone?: EnvTone;
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
  sourceTitle?: string;
  sourceMeta?: string;
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
  // ── N-1a · 단일매체 기사 (호르무즈) ─────────────────────
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
      thumbnailUrl:
        'https://img1.daumcdn.net/thumb/S1200x630/?fname=https://t1.daumcdn.net/news/202604/17/sbsi/20260417203013669spic.jpg',
    },
  },

  // ── N-1a · 이란 전쟁 (파이낸셜뉴스 2026.4.27) ─────────────────────
  {
    kind: 'n1a',
    data: {
      publisher: '파이낸셜뉴스',
      publisherLogoSeed: 'fnnews',
      elapsed: '23분 전',
      keywords: ['이란 전쟁', '핵협상'],
      title: '"이란, 美에 \'우선 호르무즈 개방·종전 합의→이후 핵협상\' 제안"',
      summary:
        '이란 정부가 트럼프 행정부에 호르무즈 해협 개방과 종전 합의를 먼저 마무리한 뒤 핵 협상은 다음 단계로 넘기자는 제안을 전달했다. 종전 조건으로 호르무즈 법적 통제권 인정, 전쟁 피해 배상 등을 요구.',
      contextTag: '이 키워드 이번 주 보도량 평소 대비 ×3.2',
      thumbnailSeed: 'iran-hormuz-talks',
      thumbnailTopic: 'iran,negotiation,hormuz',
      thumbnailUrl:
        'https://img1.daumcdn.net/thumb/S1200x630/?fname=https://t1.daumcdn.net/news/202604/27/sbsi/20260427170911593hwsh.jpg',
    },
  },

  // ── N-1a · 주가 (인포스탁데일리 2026.4.21) ─────────────────────
  {
    kind: 'n1a',
    data: {
      publisher: '인포스탁데일리',
      publisherLogoSeed: 'infostock',
      elapsed: '38분 전',
      keywords: ['주가', '코스피'],
      title: '[0421마감체크] 코스피, 사상 최고치 경신… 외국인·기관 동반 순매수',
      summary:
        '코스피지수가 사상 최고치를 경신하며 마감했다. 외국인은 592억원, 기관은 6,815억원을 순매수하며 동반 매수세를 이어갔다. 반도체·이차전지·자동차주가 상승을 주도했다.',
      thumbnailSeed: 'kospi-record-high',
      thumbnailTopic: 'stock,market,korea,kospi',
      thumbnailUrl:
        'https://img1.daumcdn.net/thumb/S1200x630/?fname=https://t1.daumcdn.net/news/202604/13/sbscnbc/20260413083303721pims.jpg',
    },
  },

  // ── N-1a · 유가 (트레이딩이코노믹스 2026.4.27) ─────────────────────
  {
    kind: 'n1a',
    data: {
      publisher: '한국경제',
      publisherLogoSeed: 'hk',
      elapsed: '52분 전',
      keywords: ['유가', 'WTI'],
      title: 'WTI 96달러 돌파… 호르무즈 해협 통항 사실상 \'제로\'',
      summary:
        '국제유가가 4월 27일 배럴당 96.66달러로 +2.40% 상승했다. 이란-미국 평화회담이 지연되면서 호르무즈 해협이 거의 폐쇄 상태를 유지, 상호 해상 봉쇄로 통항량이 거의 \'제로\'에 근접한 것이 직격탄.',
      contextTag: '유가 키워드 4월 보도량 평소 대비 ×3.5',
      thumbnailSeed: 'oil-wti-96',
      thumbnailTopic: 'oil,refinery,barrel,wti',
      thumbnailUrl:
        'https://img1.daumcdn.net/thumb/S1200x630/?fname=https://t1.daumcdn.net/news/202604/17/552813-dvZDMut/20260417141904040mdkv.jpg',
    },
  },

  // ── N-1a · 반도체 (글로벌이코노믹 2026.4.24) ─────────────────────
  {
    kind: 'n1a',
    data: {
      publisher: '글로벌이코노믹',
      publisherLogoSeed: 'genews',
      elapsed: '1시간 전',
      keywords: ['반도체', 'HBM4'],
      title: 'HBM4 석 달, 삼성은 \'최초\'·SK는 \'수율 안정\'…엔비디아 수주 승자는',
      summary:
        '삼성전자가 HBM4 양산 출하를 세계 최초로 시작한 가운데 SK하이닉스는 4월 컨퍼런스콜에서 "HBM4 계획대로 공급 중, 차세대 HBM4E는 내년 양산"이라고 밝혔다. 엔비디아 차세대 GPU 수주 경쟁이 본격화.',
      thumbnailSeed: 'hbm4-three-months',
      thumbnailTopic: 'semiconductor,memory,nvidia',
      thumbnailUrl:
        'https://img1.daumcdn.net/thumb/S1200x630/?fname=https://t1.daumcdn.net/news/202602/11/khan/20260211162845588mjyy.png',
    },
  },

  // ── N-1a · 상괭이 (경인일보 2026.4.7 시리즈) ─────────────────────
  {
    kind: 'n1a',
    data: {
      publisher: '경인일보',
      publisherLogoSeed: 'kyeongin',
      elapsed: '1시간 전',
      keywords: ['상괭이', '해양보호생물'],
      title: '해양보호생물이지만 보호받지 못하는 상괭이 [상괭이, 함께 바다를 누비다·(2-1)]',
      summary:
        '\'웃는 고래\' 상괭이의 5년간 폐사 누적이 3,839마리로 전체 해양보호생물 폐사의 68.3%를 차지하는 것으로 나타났다. 폐사 원인은 어업 혼획이 56.6%(2,174건)로 가장 많다.',
      thumbnailSeed: 'sanggwaeng-i-protect',
      thumbnailTopic: 'porpoise,marine,protection',
      thumbnailUrl:
        'https://img1.daumcdn.net/thumb/S1200x630/?fname=https://t1.daumcdn.net/news/202604/08/551714-qBABr9u/20260408100745200cdbk.jpg',
    },
  },

  // ── N-1a · 아쿠아리움 (TJB MBC / YTN 2026.4.27) ─────────────────────
  {
    kind: 'n1a',
    data: {
      publisher: 'YTN',
      publisherLogoSeed: 'ytn',
      elapsed: '2시간 전',
      keywords: ['아쿠아리움', '오월드'],
      title: '대전 오월드, 다음 달 말쯤 재개장 여부 판단…어린이날 연휴 휴장',
      summary:
        '대전도시공사가 오월드 입점 11개 업소에 5월 말까지 재개장 불가를 통보했다. 금강유역환경청의 현장 합동점검과 시설 보완 절차로 어린이날 연휴에도 휴장이 유지될 예정.',
      thumbnailSeed: 'oworld-closure',
      thumbnailTopic: 'aquarium,daejeon,zoo',
      thumbnailUrl:
        'https://img1.daumcdn.net/thumb/S1200x630/?fname=https://t1.daumcdn.net/news/202604/24/daejonilbo/20260424231702448liul.jpg',
    },
  },

  // ── N-1a · 늑구 (국민일보 2026.4) ─────────────────────
  {
    kind: 'n1a',
    data: {
      publisher: '국민일보',
      publisherLogoSeed: 'kmib',
      elapsed: '2시간 전',
      keywords: ['늑구', '오월드'],
      title: '오월드 "늑구 근황 당분간 공개 안 할 것"…이유는?',
      summary:
        '오월드가 늑구 근황을 당분간 공개하지 않기로 결정했다. 복귀 후 공개된 영상 속 시멘트 바닥과 녹슨 철창에 대한 네티즌 비판이 쏟아지자 사진·영상 촬영을 중단한 것으로 알려졌다.',
      thumbnailSeed: 'neukku-non-public',
      thumbnailTopic: 'wolf,zoo,daejeon',
      thumbnailUrl:
        'https://img1.daumcdn.net/thumb/S1200x630/?fname=https://t1.daumcdn.net/news/202604/23/khan/20260423111235670okbj.png',
    },
  },

  // ── N-1b · 다매체 묶음 (호르무즈) ─────────────────────
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
      thumbnailUrl:
        'https://img1.daumcdn.net/thumb/S1200x630/?fname=https://t1.daumcdn.net/news/202604/15/NEWS1/20260415054026678tsjt.jpg',
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

  // ── N-1b · 다매체 묶음 (이란-미 핵협상 종료, 2026.4.12) ─────────────────────
  {
    kind: 'n1b',
    data: {
      leadPublisher: '서울신문',
      publisherLogoSeed: 'seoul',
      otherCount: 5,
      elapsed: '1시간 전',
      keywords: ['이란 전쟁', '핵협상'],
      title: '밴스 "이란 핵포기 안 받아들여"…美 최후통첩 날리고 협상 종료',
      summary:
        '미국 밴스 부통령이 "이란이 핵 포기 의사를 보이지 않고 있다"며 최후통첩을 날린 뒤 1차 협상이 결렬됐다. 트럼프 대통령은 같은 날 휴전 무기한 연장을 발표.',
      thumbnailSeed: 'vance-iran-talks',
      thumbnailTopic: 'iran,vance,negotiation',
      thumbnailUrl:
        'https://img1.daumcdn.net/thumb/S1200x630/?fname=https://t1.daumcdn.net/news/202604/12/YTN/20260412160109860immt.jpg',
      otherPublishers: [
        { name: '다음(YTN)', logoSeed: 'ytn', headline: '미-이란 첫 협상 결렬... 밴스 "이란이 핵 포기 안 해"', elapsed: '1시간 전' },
        { name: '파이낸셜뉴스', logoSeed: 'fnnews', headline: '"이란, 美에 \'우선 호르무즈 개방·종전→이후 핵협상\' 제안"', elapsed: '2시간 전' },
        { name: '영남경제', logoSeed: 'ynenews', headline: '미국·이란, \'극적 합의\' vs \'끝장 전쟁\' 갈림길', elapsed: '2시간 전' },
        { name: '통일뉴스', logoSeed: 'tongil', headline: '미·이란 전쟁의 구조적 분석과 3단계 위기관리 시나리오', elapsed: '3시간 전' },
        { name: 'YTN', logoSeed: 'ytn', headline: '트럼프 \'미치광이\' 협상전략? "이란, 정권 무너져도 핵능력 포기 안할 것"', elapsed: '4시간 전' },
      ],
    },
  },

  // ── N-1b · 다매체 묶음 (HBM4 양산 본격화) ─────────────────────
  {
    kind: 'n1b',
    data: {
      leadPublisher: '글로벌이코노믹',
      publisherLogoSeed: 'genews',
      otherCount: 5,
      elapsed: '1시간 전',
      keywords: ['반도체', 'HBM4'],
      title: '"HBM 부족 3년 더" 날개 단 삼전·SK하닉…HBM4E 선점 경쟁',
      summary:
        '시장조사 업체들이 "HBM 공급 부족이 3년 더 이어진다"고 전망한 가운데 삼성전자가 HBM4 양산 출하를 세계 최초로 시작했고 SK하이닉스도 양산 중. 양사는 차세대 HBM4E 선점 경쟁에 돌입.',
      thumbnailSeed: 'hbm4e-leadership',
      thumbnailTopic: 'semiconductor,memory,korea',
      thumbnailUrl:
        'https://img1.daumcdn.net/thumb/S1200x630/?fname=https://t1.daumcdn.net/news/202601/29/552777-a6ToU27/20260129132355551jxuv.jpg',
      otherPublishers: [
        { name: '네이트뉴스', logoSeed: 'nate', headline: '"HBM 부족 3년 더" 날개단 삼전·SK하닉…HBM4E 선점 경쟁', elapsed: '1시간 전' },
        { name: '초이스스탁US', logoSeed: 'choicestock', headline: 'HBM4 석 달, 삼성은 \'최초\'·SK는 \'수율 안정\'…엔비디아 수주 승자는', elapsed: '2시간 전' },
        { name: '삼성반도체', logoSeed: 'samsemi', headline: '삼성전자, 세계 최초 업계 최고 성능의 HBM4 양산 출하', elapsed: '2시간 전' },
        { name: 'getnews', logoSeed: 'getnews', headline: 'HBM4 양산 신호탄…삼성·SK, 메모리 패권 경쟁 다시 달아오른다', elapsed: '3시간 전' },
        { name: '다음(MBC)', logoSeed: 'mbc', headline: '삼성전자 HBM4, 설 이후 양산 출하…주도권 경쟁 고조', elapsed: '4시간 전' },
      ],
    },
  },

  // ── N-1b · 다매체 묶음 (오월드 5월 재개장 불가) ─────────────────────
  {
    kind: 'n1b',
    data: {
      leadPublisher: '머니투데이',
      publisherLogoSeed: 'mt',
      otherCount: 5,
      elapsed: '2시간 전',
      keywords: ['오월드', '늑구'],
      title: '늑구 탈출 여파 길어진다…대전 오월드, \'5월 재개장\' 어려울 듯',
      summary:
        '대전도시공사가 오월드 입점 11개 업소에 5월 말까지 재개장 불가를 통보. 금강유역환경청 합동점검 등 행정 절차로 어린이날 연휴 휴장이 확정됐고, 늑구 사육환경에 대한 비판도 이어지고 있다.',
      thumbnailSeed: 'oworld-may-closure',
      thumbnailTopic: 'zoo,daejeon,wolf',
      thumbnailUrl:
        'https://img1.daumcdn.net/thumb/S1200x630/?fname=https://t1.daumcdn.net/news/202604/23/551724-22lyJQR/20260423094616722jsjr.jpg',
      otherPublishers: [
        { name: '뉴스1', logoSeed: 'news1', headline: '\'늑구\' 탈출 대전 오월드 5월 재개장 불가…입점업소 특수 기대 난망', elapsed: '2시간 전' },
        { name: 'YTN', logoSeed: 'ytn', headline: '대전 오월드, 다음 달 말쯤 재개장 여부 판단…어린이날 연휴 휴장', elapsed: '3시간 전' },
        { name: '경향신문', logoSeed: 'khan', headline: '[점선면] 탈출에서 귀환까지, 늑구의 9일…동물원 존재 이유를 묻다', elapsed: '3시간 전' },
        { name: 'TJB MBC', logoSeed: 'tjmbc', headline: '오월드, 입점 업체에 5월 말까지 재개장 불가 통보', elapsed: '4시간 전' },
        { name: '미주중앙일보', logoSeed: 'koreadaily', headline: '늑구가 동물원을 바꿨다…전국 동물원 허가제, 먹이주기 체험 제한', elapsed: '5시간 전' },
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
      sourceTitle: '반도체 한국 길을 묻다 ②',
      sourceMeta: '끝까지 읽음',
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
      sourceTitle: "'이란 전쟁'은 누구의 책임인가",
      sourceMeta: '정독함',
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
      tone: 'rain',
      headline: '오늘 오후 비 소식',
      detail: '오후 3시~5시, 강수확률 80%',
      action: '외출 예정이라면 우산 챙기세요',
      source: '기상청 단기예보',
    },
  },

  // ── N-9a · 환경 컨텍스트 (출근 경로 지연) ─────────────────────
  {
    kind: 'n9a',
    data: {
      context: '출근 경로 · 분당 → 강남',
      emoji: '🚗',
      tone: 'traffic',
      headline: '출근길 평소보다 25분 지연',
      detail: '경부고속도로 분당 → 양재 50분 (평소 25분, ×2배)',
      action: '신분당선 환승이 평소보다 빠를 수 있어요',
      source: 'T맵 실시간 교통',
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
        { keyword: '호르무즈', meta: '+1.0만' },
        { keyword: '오월드', meta: '+2.4만' },
        { keyword: '자동차주', meta: '+7천' },
        { keyword: 'HBM4E', meta: '+5천' },
        { keyword: 'WTI', meta: '+4천' },
        { keyword: '브렌트유', meta: '+2천' },
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

  // ── N-20a · 사람들 인기 기사 ─────────────────────
  {
    kind: 'n20a',
    data: {
      cohortBasis: '반도체·주가·유가를 함께 구독하는 사람들',
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

  // ── N-20b · 사람들 신규 구독 ─────────────────────
  {
    kind: 'n20b',
    data: {
      cohortBasis: '반도체·주가·유가를 함께 구독하는 사람들',
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
