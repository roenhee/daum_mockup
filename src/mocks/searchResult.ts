export interface RecentKeyword {
  id: string;
  keyword: string;
  date: string;
}

export const RECENT_KEYWORDS: RecentKeyword[] = [
  { id: 'r-01', keyword: '이재명 방미', date: '04.21.' },
  { id: 'r-02', keyword: '코스피 3400', date: '04.21.' },
  { id: 'r-03', keyword: '손흥민 125호골', date: '04.20.' },
  { id: 'r-04', keyword: '아이폰 17 Pro 사전예약', date: '04.20.' },
  { id: 'r-05', keyword: '김장 배추 값', date: '04.19.' },
  { id: 'r-06', keyword: '임영웅 콘서트', date: '04.19.' },
];

export const SUGGESTED_KEYWORDS: string[] = [
  '코스피 3400 돌파',
  '삼성전자 목표주가',
  '외국인 순매수 오늘',
  '환율 현황',
  'SK하이닉스 실적',
  '반도체 ETF 추천',
  '코스피 차트',
  '증시 마감 브리핑',
];

export const SEARCH_TABS = [
  { id: 'all', label: '통합' },
  { id: 'news', label: '뉴스' },
  { id: 'web', label: '통합웹' },
  { id: 'video', label: '동영상' },
  { id: 'shopping', label: '쇼핑' },
  { id: 'image', label: '이미지' },
  { id: 'book', label: '책' },
];

export interface ShortcutCard {
  id: string;
  title: string;
  subtitle: string;
  url: string;
  icon: string;
}

export const SHORTCUT: ShortcutCard = {
  id: 'sh-kospi',
  title: '다음 금융 · 코스피',
  subtitle: '3,481.80  ▲ 36.56 (1.06%)',
  url: 'finance.daum.net/kospi',
  icon: 'https://picsum.photos/seed/sc-kospi/80/80',
};

export interface PowerlinkItem {
  id: string;
  advertiser: string;
  title: string;
  description: string;
  url: string;
  thumbnailUrl: string;
}

export const POWERLINK: PowerlinkItem[] = [
  {
    id: 'pl-01',
    advertiser: '신한투자증권',
    title: '지금 주식 계좌 개설 이벤트 · 최대 40만원',
    description: '비대면 계좌 개설 + 첫 입금 10만원 이상 시 지급. 4/30 마감.',
    url: 'shinhansec.com/event',
    thumbnailUrl: 'https://picsum.photos/seed/pl-01/120/120',
  },
  {
    id: 'pl-02',
    advertiser: '토스증권',
    title: '첫 매수 시 주식 1주 무료 증정',
    description: '앱에서 간편하게 가입 · 국내 주식 1주 무료.',
    url: 'tossinvest.com/stock-offer',
    thumbnailUrl: 'https://picsum.photos/seed/pl-02/120/120',
  },
];

export interface SearchNewsItem {
  id: string;
  publisher: string;
  publisherLogo: string;
  title: string;
  summary: string;
  thumbnailUrl: string;
  publishedAt: string;
}

export const SEARCH_NEWS: SearchNewsItem[] = [
  {
    id: 'sn-01',
    publisher: 'SBS Biz',
    publisherLogo: 'https://picsum.photos/seed/sn-sbs/40/40',
    title: '코스피 3,481선 돌파…외국인 4거래일 연속 순매수',
    summary: '외국인 투자자가 4거래일 연속 순매수를 이어가며 코스피가 3,481선을 돌파했다. 반도체 업종이 지수 상승을 주도한 것으로…',
    thumbnailUrl: 'https://picsum.photos/seed/sn-01/300/300',
    publishedAt: '12분 전',
  },
  {
    id: 'sn-02',
    publisher: '머니투데이',
    publisherLogo: 'https://picsum.photos/seed/sn-mt/40/40',
    title: '"코스피 3500도 열어두자"…증권가 목표치 속속 상향',
    summary: '주요 증권사들이 코스피 연말 목표 지수를 3,500선까지 상향 조정했다. AI 반도체 수요 회복과 밸류에이션 리레이팅이…',
    thumbnailUrl: 'https://picsum.photos/seed/sn-02/300/300',
    publishedAt: '38분 전',
  },
  {
    id: 'sn-03',
    publisher: '이데일리',
    publisherLogo: 'https://picsum.photos/seed/sn-edaily/40/40',
    title: '코스피 3400 돌파 안착…"단기 과열 구간 진입" 경고도',
    summary: '코스피가 3,400선을 돌파해 안착했지만, 일부에서는 단기 과열 구간 진입을 지적하는 목소리도 커지고 있다…',
    thumbnailUrl: 'https://picsum.photos/seed/sn-03/300/300',
    publishedAt: '1시간 전',
  },
];

export interface CafeBlogItem {
  id: string;
  source: string;
  title: string;
  summary: string;
  publishedAt: string;
  thumbnailUrl?: string;
}

export const CAFE_POSTS: CafeBlogItem[] = [
  {
    id: 'cf-01',
    source: '카페 · 주식해서 자산가되기',
    title: '오늘 코스피 3400 돌파, 현금 비중 어떻게 가져가시나요?',
    summary: '저는 개인적으로 강세장일수록 현금 비중을 줄이지 않으려 하는데 다들 의견이 궁금해서 글 써봅니다…',
    publishedAt: '42분 전',
  },
  {
    id: 'cf-02',
    source: '카페 · 직장인 재테크',
    title: '코스피 3400 돌파 기념 — 제 포트폴리오 공개합니다',
    summary: '삼성전자 비중이 제일 크고 SK하이닉스 + LG에너지솔루션 담고 있습니다. 세후 YTD 수익률은…',
    publishedAt: '2시간 전',
  },
];

export const BLOG_POSTS: CafeBlogItem[] = [
  {
    id: 'bg-01',
    source: '블로그 · 주식일기장',
    title: '코스피 3400 돌파 직전, 제가 느끼는 3가지 불안감',
    summary: '9년 동안 지켜본 시장 기준으로, 돌파 직전에 개미가 가장 많이 실수하는 지점을 정리해봤어요.',
    publishedAt: '어제',
    thumbnailUrl: 'https://picsum.photos/seed/bg-01/200/200',
  },
  {
    id: 'bg-02',
    source: '블로그 · 장투러',
    title: '"강세장이 끝나는 징조" 체크리스트 10가지 (2026년 버전)',
    summary: '과거 5번의 강세장 끝물에서 공통으로 나타났던 시그널을 정리했습니다.',
    publishedAt: '2일 전',
    thumbnailUrl: 'https://picsum.photos/seed/bg-02/200/200',
  },
];

export interface WebDoc {
  id: string;
  url: string;
  title: string;
  summary: string;
  date: string;
}

export const WEB_DOCS: WebDoc[] = [
  {
    id: 'wd-01',
    url: 'wiki.daum.net/코스피',
    title: '코스피 - 위키백과, 우리 모두의 백과사전',
    summary: '코스피(KOSPI, Korea Composite Stock Price Index)는 대한민국의 유가증권시장 상장 기업 전체 종목을 대상으로 산출되는 시가총액식 주가지수…',
    date: '2026.04.18',
  },
  {
    id: 'wd-02',
    url: 'krx.co.kr/kospi/overview',
    title: '한국거래소 | KOSPI 개요 및 구성 종목',
    summary: 'KOSPI는 1980년 1월 4일을 기준 시점(100p)으로 산출되는 시장 대표 주가지수입니다. 유가증권시장 상장 주식의 시가총액 변동을 반영하여…',
    date: '2026.04.10',
  },
];

export interface EncyclopediaItem {
  id: string;
  term: string;
  category: string;
  summary: string;
  imageUrl?: string;
  source: string;
}

export const ENCYCLOPEDIA: EncyclopediaItem = {
  id: 'enc-01',
  term: '이재명',
  category: '정치인',
  summary:
    '대한민국 제21대 대통령. 경기도 성남시장, 경기도지사를 지냈으며 2022년 대선을 거쳐 2025년 조기 대선에서 당선되었다. 변호사 출신으로 지방행정·복지 정책 분야에서 활동했으며, 현재 한미 동맹 현대화와 동북아 외교 재편을 주요 국정 과제로 추진하고 있다.',
  imageUrl: 'https://picsum.photos/seed/enc-lj/180/240',
  source: 'Daum 백과',
};

export interface ShoppingItem {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  discountPct?: number;
  shop: string;
  rating: number;
  reviews: number;
  thumbnailUrl: string;
  ad?: boolean;
}

export const SHOPPING: ShoppingItem[] = [
  {
    id: 'sp-01',
    title: '이재명의 길 (개정판, 자서전)',
    price: 16200,
    originalPrice: 18000,
    discountPct: 10,
    shop: '교보문고',
    rating: 4.7,
    reviews: 128,
    thumbnailUrl: 'https://picsum.photos/seed/sp-01/300/300',
  },
  {
    id: 'sp-02',
    title: '한미동맹 60년의 역사와 미래 (양장)',
    price: 22500,
    originalPrice: 30000,
    discountPct: 25,
    shop: 'YES24',
    rating: 4.6,
    reviews: 84,
    thumbnailUrl: 'https://picsum.photos/seed/sp-02/300/300',
    ad: true,
  },
  {
    id: 'sp-03',
    title: '트럼프 2기 행정부 전망 2026 완전판',
    price: 19800,
    shop: '알라딘',
    rating: 4.5,
    reviews: 56,
    thumbnailUrl: 'https://picsum.photos/seed/sp-03/300/300',
  },
  {
    id: 'sp-04',
    title: '정상회담 외교 백과사전 (상·하 세트)',
    price: 35700,
    originalPrice: 42000,
    discountPct: 15,
    shop: '인터파크도서',
    rating: 4.8,
    reviews: 42,
    thumbnailUrl: 'https://picsum.photos/seed/sp-04/300/300',
  },
];

export interface ImageResult {
  id: string;
  url: string;
  source: string;
}

export const IMAGE_RESULTS: ImageResult[] = Array.from({ length: 6 }).map((_, i) => ({
  id: `im-${i + 1}`,
  url: `https://picsum.photos/seed/srch-im-${i + 1}/300/300`,
  source: ['연합뉴스', '이데일리', 'SBS Biz', 'MBN', 'KBS뉴스', '한겨레'][i],
}));

export interface VideoResult {
  id: string;
  thumbnailUrl: string;
  title: string;
  platform: string;
  channel: string;
  uploadedAt: string;
  duration: string;
}

export const VIDEO_RESULTS: VideoResult[] = [
  {
    id: 'vd-01',
    thumbnailUrl: 'https://picsum.photos/seed/vd-01/400/240',
    title: '[마감 브리핑] 코스피 3,481 돌파, 외인 4거래일 순매수',
    platform: 'YouTube',
    channel: 'SBS Biz 마켓라이브',
    uploadedAt: '3시간 전',
    duration: '12:42',
  },
  {
    id: 'vd-02',
    thumbnailUrl: 'https://picsum.photos/seed/vd-02/400/240',
    title: '"코스피 3500 간다" 증권가 목표 지수 상향 이유',
    platform: 'YouTube',
    channel: '슈카월드',
    uploadedAt: '5시간 전',
    duration: '15:08',
  },
  {
    id: 'vd-03',
    thumbnailUrl: 'https://picsum.photos/seed/vd-03/400/240',
    title: '개미 관점에서 본 코스피 3400 돌파 — 지금 사도 되나?',
    platform: 'YouTube',
    channel: '개미투자일지',
    uploadedAt: '어제',
    duration: '08:17',
  },
  {
    id: 'vd-04',
    thumbnailUrl: 'https://picsum.photos/seed/vd-04/400/240',
    title: '2026 상반기 코스피 전망 — 증권가 3인 대담',
    platform: 'YouTube',
    channel: '이데일리TV',
    uploadedAt: '어제',
    duration: '22:54',
  },
];
