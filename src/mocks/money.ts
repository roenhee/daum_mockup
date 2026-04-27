import type { ContentArticle } from '@/types';
import type { ShortItem } from './shorts';

export type MoneyArticle = ContentArticle;

const IMG = {
  powell: 'https://upload.wikimedia.org/wikipedia/commons/f/f0/Jerome_H._Powell%2C_Federal_Reserve_Chair_%28cropped%29.jpg',
  yellen: 'https://upload.wikimedia.org/wikipedia/commons/3/35/Secretary_Janet_Yellen_portrait.jpg',
  lagarde: 'https://upload.wikimedia.org/wikipedia/commons/d/d6/Lagarde_ECB_Portrait_2019.jpg',
  musk: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Elon_Musk_-_54820081119_%28cropped%29.jpg',
  cook: 'https://upload.wikimedia.org/wikipedia/commons/9/9e/P20250806MR-0248_President_Donald_Trump_delivers_investment_remarks_alongside_Apple_CEO_Tim_Cook_%28cropped%29.jpg',
  huang: 'https://upload.wikimedia.org/wikipedia/commons/e/e6/Jen-Hsun_Huang_2025.jpg',
  barra: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Mary_Barra%2C_official_portrait%2C_Homeland_Security_Council.jpg',
  dimon: 'https://upload.wikimedia.org/wikipedia/commons/8/8c/Chancellor_Rachel_Reeves_meets_Jamie_Dimon_%2854838700663%29_%28cropped%29.jpg',
  rhee_bok: 'https://upload.wikimedia.org/wikipedia/commons/6/6c/Speaker_Woo_Won-shik_visits_Bank_of_Korea_to_discuss_stabilizing_financial_markets_%28cropped%29.jpg',
  ueda: 'https://upload.wikimedia.org/wikipedia/commons/b/be/BOJ_governor_Kazuo_Ueda_%28cropped%29.jpg',
  lee_jaeyong: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Lee_Jae-yong_in_2016.jpg',
  chey_taewon: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Korea_Portuguese_Business_Forum_01_%28cropped%29.jpg',
  moon_jaein: 'https://upload.wikimedia.org/wikipedia/commons/0/0d/President_Moon_Jae_In.jpg',
  choi_sangmok: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/President_Choi_Sang-mok.jpg',
  yoon: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/South_Korea_President_Yoon_Suk_Yeol_portrait.jpg',
  fink: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Larry_Fink_with_Valdis_Dombrovskis_%28cropped%29.jpg',
  chung_euisun: 'https://upload.wikimedia.org/wikipedia/commons/c/c0/Chung_Eui-sun_%282025%29_cropped_1.jpg',
  zuckerberg: 'https://upload.wikimedia.org/wikipedia/commons/2/21/Mark_Zuckerberg_in_September_2025_%28cropped%29.jpg',
  pichai: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Sundar_Pichai_-_2023_%28cropped%29.jpg',
  nadella: 'https://upload.wikimedia.org/wikipedia/commons/7/78/MS-Exec-Nadella-Satya-2017-08-31-22_%28cropped%29.jpg',
  gates: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Bill_Gates_at_the_European_Commission_-_P067383-987995_%28cropped%29_5.jpg',
  vonderleyen: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Ursula_von_der_Leyen_2024.jpg',
  kishida: 'https://upload.wikimedia.org/wikipedia/commons/b/bb/Fumio_Kishida_20211005_%28cropped%29.jpg',
  ishiba: 'https://upload.wikimedia.org/wikipedia/commons/1/17/Ishiba_Shigeru_20241001_%28cropped%29.jpg',
  dalio: 'https://upload.wikimedia.org/wikipedia/commons/1/1f/Web_Summit_2018_-_Forum_-_Day_2%2C_November_7_HM1_7481_%2844858045925%29.jpg',
  draghi: 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Mario_Draghi_in_2021_crop.jpg',
  bessent: 'https://upload.wikimedia.org/wikipedia/commons/d/d6/Official_portrait_of_Treasury_Secretary_Scott_Bessent_%28borderless%29_%28cropped%29.jpg',
  altman: 'https://upload.wikimedia.org/wikipedia/commons/f/f8/Sam_Altman_TechCrunch_SF_2019_Day_2_Oct_3_%28cropped_3%29.jpg',
  bezos: 'https://upload.wikimedia.org/wikipedia/commons/0/03/Jeff_Bezos_visits_LAAFB_SMC_%283908618%29_%28cropped%29.jpeg',
  trump: 'https://upload.wikimedia.org/wikipedia/commons/1/16/Official_Presidential_Portrait_of_President_Donald_J._Trump_%282025%29.jpg',
  lutnick: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Howard_Lutnick_2025.jpg',
  lee_jaemyung: 'https://upload.wikimedia.org/wikipedia/commons/0/01/President_Lee_Jae-myung_2025_%28cropped%29.jpg',
  kim_beomsu: 'https://upload.wikimedia.org/wikipedia/commons/7/75/Kim_Bum-soo%2C_Chairman_of_board%2C_Kakao_Inc.jpg',
  han_ducksoo: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Prime_Minister_of_South_Korea_HAN_Duck-soo_20240516.jpg',
  son_masayoshi: 'https://upload.wikimedia.org/wikipedia/commons/5/58/Masayoshi_Son_%28P066533-522034%2C_cropped%29.jpg',
  buffett: 'https://upload.wikimedia.org/wikipedia/commons/d/d4/Warren_Buffett_at_the_2015_SelectUSA_Investment_Summit_%28cropped%29.jpg',
  lisa_su: 'https://upload.wikimedia.org/wikipedia/commons/d/de/SXSW-2024-alih-OB7A0861-Lisa_Su_%28cropped_2%29.jpg',
  jassy: 'https://upload.wikimedia.org/wikipedia/commons/0/07/Andy_Jassy.jpg',
  iger: 'https://upload.wikimedia.org/wikipedia/commons/e/e2/2022_Bob_Iger_%28cropped%29.jpg',
  moynihan: 'https://upload.wikimedia.org/wikipedia/commons/f/fc/Brian_Moynihan%2C_official_portrait%2C_Homeland_Security_Council.jpg',
  solomon: 'https://upload.wikimedia.org/wikipedia/commons/4/48/David_Solomon.jpg',
  schwarzman: 'https://upload.wikimedia.org/wikipedia/commons/0/0a/DBT_Magdalen_College%2C_Oxford_%26_Stephen_Schwarzman_19_March_2024-5_-_53600715712_%28cropped%29.jpg',
  yanai: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Tadashi_Yanai%2C_in_Japan_on_May_23%2C_2022_%281%29_%28cropped%29.jpg',
  daniel_ek: 'https://upload.wikimedia.org/wikipedia/commons/3/39/Daniel_Ek_EC_2025_%28cropped%29.jpg',
  fraser: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Jane_Fraser_%28cropped%29.jpg',
  porat: 'https://upload.wikimedia.org/wikipedia/commons/1/14/RuthPorat2016_%28cropped%29.jpg',
  li_kashing: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Li_Ka_Shing.jpg',
  niinami: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Takeshi_Niinami_20241004.jpg',
};

export const MONEY_MAIN: MoneyArticle = {
  id: 'mn-main',
  title: "“50조 서울시 금고 잡아라”…진옥동 ‘수성ʼ vs 임종룡 ‘탈환ʼ [은행권 금고 쟁탈전]",
  summary:
    '외국인이 6거래일 연속 국내 증시 순매수 기조를 이어가며 코스피가 연중 최고치인 3,481선을 넘어섰다. 증권가는 "AI 반도체 리레이팅이 추가 상승 여지를 만든다"고 분석했다.',
  publisher: "한국금융",
  publisherLogoSeed: 'mkn',
  thumbnailSeed: 'mn-main-kospi',
  thumbnailUrl: "/mock-images/news/20260427000219928.jpg",
  elapsed: "방금 전",
  commentCount: 824,
};

export interface MarketIndex {
  id: string;
  name: string;
  value: string;
  change: number;
  changePct: number;
}

export const MARKET_INDICES: MarketIndex[] = [
  { id: 'kospi', name: '코스피', value: '3,481.80', change: 36.56, changePct: 1.06 },
  { id: 'kosdaq', name: '코스닥', value: '1,172.44', change: 9.82, changePct: 0.84 },
  { id: 'usd', name: '원/달러', value: '1,326.40', change: -4.1, changePct: -0.31 },
  { id: 'bond', name: '국고채 10년', value: '3.142', change: -0.021, changePct: -0.66 },
  { id: 'nasdaq', name: '나스닥', value: '18,942.11', change: 184.22, changePct: 0.98 },
  { id: 'dow', name: '다우존스', value: '44,320.58', change: -42.3, changePct: -0.09 },
];

export interface ExchangeRate {
  id: string;
  country: string;
  currency: string;
  flagSeed: string;
  buy: string;
  base: string;
  changePct: number;
}

export const EXCHANGE_RATES: ExchangeRate[] = [
  { id: 'usd', country: '미국', currency: 'USD', flagSeed: 'fl-us', buy: '1,346.50', base: '1,326.40', changePct: -0.31 },
  { id: 'jpy', country: '일본', currency: 'JPY 100', flagSeed: 'fl-jp', buy: '882.14', base: '868.30', changePct: 0.22 },
  { id: 'eur', country: '유럽', currency: 'EUR', flagSeed: 'fl-eu', buy: '1,456.71', base: '1,434.20', changePct: -0.14 },
  { id: 'cny', country: '중국', currency: 'CNY', flagSeed: 'fl-cn', buy: '184.22', base: '181.48', changePct: 0.05 },
  { id: 'gbp', country: '영국', currency: 'GBP', flagSeed: 'fl-gb', buy: '1,684.32', base: '1,658.80', changePct: -0.08 },
];

export const MONEY_NEWS: MoneyArticle[] = [
  {
    id: 'mn-01',
    title: "국제금융센터 첫 삽도 못 떴는데… ‘전북 금융중심지’ 속도전 우려 목소리",
    publisher: "국민일보",
    publisherLogoSeed: 'hkn',
    thumbnailSeed: 'mn-sk',
    thumbnailUrl: "/mock-images/news/20260427002902513.jpg",
    elapsed: "방금 전",
  },
  {
    id: 'mn-02',
    title: "은행 퇴직연금 적립금 212조 돌파… 경쟁 본격화",
    publisher: "국민일보",
    publisherLogoSeed: 'edi',
    thumbnailSeed: 'mn-fed',
    thumbnailUrl: "/mock-images/news/20260427004502651.jpg",
    elapsed: "8분 전",
  },
  {
    id: 'mn-03',
    title: "전쟁 6주, 카드 소비 꺾였다… 60대 이상만 소비 증가",
    publisher: "국민일보",
    publisherLogoSeed: 'seo',
    thumbnailSeed: 'mn-kospi-chart',
    thumbnailUrl: "/mock-images/news/20260427004533658.jpg",
    elapsed: "13분 전",
  },
  {
    id: 'mn-04',
    title: "\"AI가 M&A 중개\"…딥서치, 중소형 딜 4000건 플랫폼 구축",
    publisher: "이데일리",
    publisherLogoSeed: 'mkn',
    thumbnailSeed: 'mn-apt',
    thumbnailUrl: "/mock-images/news/20260427033034143.jpg",
    elapsed: "22분 전",
  },
];

export const MONEY_REALESTATE: MoneyArticle[] = [
  {
    id: 'mr-01',
    title: "보조금 빼고 세제만… '주니어 ISA' 재시동",
    publisher: "머니투데이",
    publisherLogoSeed: 'chb',
    thumbnailSeed: 'mr-01',
    thumbnailUrl: "/mock-images/news/20260427040704221.jpg",
    elapsed: "방금 전",
  },
  {
    id: 'mr-02',
    title: "양종희 “고객정보 보호가 신뢰”…KB금융, 업계 첫 정보보호 공시 추진",
    publisher: "이투데이",
    publisherLogoSeed: 'mkn',
    thumbnailSeed: 'mr-02',
    thumbnailUrl: "/mock-images/news/20260427050006644.jpg",
    elapsed: "8분 전",
  },
  {
    id: 'mr-03',
    title: "임종룡 회장, ‘비은행’ 올인...총주주환원율 ‘50%’ 연다",
    publisher: "에너지경제",
    publisherLogoSeed: 'hkn',
    thumbnailSeed: 'mr-03',
    thumbnailUrl: "/mock-images/news/20260427052003070.jpg",
    elapsed: "13분 전",
  },
  {
    id: 'mr-04',
    title: "스마일게이트, '1000억' 패소에도 비상장 고집…권혁빈 이혼 영향?[더시그널]",
    publisher: "한스경제",
    publisherLogoSeed: 'yna',
    thumbnailSeed: 'mr-04',
    thumbnailUrl: "/mock-images/news/20260427060007363.png",
    elapsed: "22분 전",
  },
];

export const MONEY_INVESTMENT_POINTS: MoneyArticle[] = [
  {
    id: 'ip-01',
    title: "“50조 서울시 금고 잡아라”…진옥동 ‘수성ʼ vs 임종룡 ‘탈환ʼ [은행권 금고 쟁탈전]",
    publisher: "한국금융",
    publisherLogoSeed: 'gld',
    thumbnailSeed: 'ip-01',
    thumbnailUrl: "/mock-images/news/20260427000219928.jpg",
    elapsed: "방금 전",
  },
  {
    id: 'ip-02',
    title: "국제금융센터 첫 삽도 못 떴는데… ‘전북 금융중심지’ 속도전 우려 목소리",
    publisher: "국민일보",
    publisherLogoSeed: 'mtd',
    thumbnailSeed: 'ip-02',
    thumbnailUrl: "/mock-images/news/20260427002902513.jpg",
    elapsed: "8분 전",
  },
  {
    id: 'ip-03',
    title: "은행 퇴직연금 적립금 212조 돌파… 경쟁 본격화",
    publisher: "국민일보",
    publisherLogoSeed: 'sbz',
    thumbnailSeed: 'ip-03',
    thumbnailUrl: "/mock-images/news/20260427004502651.jpg",
    elapsed: "13분 전",
  },
  {
    id: 'ip-04',
    title: "전쟁 6주, 카드 소비 꺾였다… 60대 이상만 소비 증가",
    publisher: "국민일보",
    publisherLogoSeed: 'mst',
    thumbnailSeed: 'ip-04',
    thumbnailUrl: "/mock-images/news/20260427004533658.jpg",
    elapsed: "22분 전",
  },
  {
    id: 'ip-05',
    title: "\"AI가 M&A 중개\"…딥서치, 중소형 딜 4000건 플랫폼 구축",
    publisher: "이데일리",
    publisherLogoSeed: 'hkn',
    thumbnailSeed: 'ip-05',
    thumbnailUrl: "/mock-images/news/20260427033034143.jpg",
    elapsed: "31분 전",
  },
  {
    id: 'ip-06',
    title: "보조금 빼고 세제만… '주니어 ISA' 재시동",
    publisher: "머니투데이",
    publisherLogoSeed: 'blb',
    thumbnailSeed: 'ip-06',
    thumbnailUrl: "/mock-images/news/20260427040704221.jpg",
    elapsed: "44분 전",
  },
  {
    id: 'ip-07',
    title: "양종희 “고객정보 보호가 신뢰”…KB금융, 업계 첫 정보보호 공시 추진",
    publisher: "이투데이",
    publisherLogoSeed: 'edi',
    thumbnailSeed: 'ip-07',
    thumbnailUrl: "/mock-images/news/20260427050006644.jpg",
    elapsed: "1시간 전",
  },
  {
    id: 'ip-08',
    title: "임종룡 회장, ‘비은행’ 올인...총주주환원율 ‘50%’ 연다",
    publisher: "에너지경제",
    publisherLogoSeed: 'nmr',
    thumbnailSeed: 'ip-08',
    thumbnailUrl: "/mock-images/news/20260427052003070.jpg",
    elapsed: "1시간 전",
  },
  {
    id: 'ip-09',
    title: "스마일게이트, '1000억' 패소에도 비상장 고집…권혁빈 이혼 영향?[더시그널]",
    publisher: "한스경제",
    publisherLogoSeed: 'seo',
    thumbnailSeed: 'ip-09',
    thumbnailUrl: "/mock-images/news/20260427060007363.png",
    elapsed: "2시간 전",
  },
  {
    id: 'ip-10',
    title: "전필환 신한캐피탈 대표, 유가증권 평가손익 증가에 수익성 제고…생산적금융 저울질 [금융사 2026 1분기 실적]",
    publisher: "한국금융",
    publisherLogoSeed: 'cdk',
    thumbnailSeed: 'ip-10',
    thumbnailUrl: "/mock-images/news/20260427060019387.png",
    elapsed: "2시간 전",
  },
];

export const MONEY_HEADLINE_TEXTS: MoneyArticle[] = [
  {
    id: 'mth-01',
    title: "은행 퇴직연금 적립금 212조 돌파… 경쟁 본격화",
    publisher: "국민일보",
    publisherLogoSeed: 'yna',
    thumbnailSeed: 'mth-01',
    elapsed: "방금 전",
  },
  {
    id: 'mth-02',
    title: "전쟁 6주, 카드 소비 꺾였다… 60대 이상만 소비 증가",
    publisher: "국민일보",
    publisherLogoSeed: 'hkn',
    thumbnailSeed: 'mth-02',
    elapsed: "8분 전",
  },
  {
    id: 'mth-03',
    title: "\"AI가 M&A 중개\"…딥서치, 중소형 딜 4000건 플랫폼 구축",
    publisher: "이데일리",
    publisherLogoSeed: 'mkn',
    thumbnailSeed: 'mth-03',
    elapsed: "13분 전",
  },
  {
    id: 'mth-04',
    title: "보조금 빼고 세제만… '주니어 ISA' 재시동",
    publisher: "머니투데이",
    publisherLogoSeed: 'mtd',
    thumbnailSeed: 'mth-04',
    elapsed: "22분 전",
  },
  {
    id: 'mth-05',
    title: "양종희 “고객정보 보호가 신뢰”…KB금융, 업계 첫 정보보호 공시 추진",
    publisher: "이투데이",
    publisherLogoSeed: 'blb',
    thumbnailSeed: 'mth-05',
    elapsed: "31분 전",
  },
];

export const MONEY_GRID_TWO: MoneyArticle[] = [
  {
    id: 'mgt-01',
    title: "양종희 “고객정보 보호가 신뢰”…KB금융, 업계 첫 정보보호 공시 추진",
    publisher: "이투데이",
    publisherLogoSeed: 'hkn',
    thumbnailSeed: 'mgt-01',
    thumbnailUrl: "/mock-images/news/20260427050006644.jpg",
    elapsed: "방금 전",
  },
  {
    id: 'mgt-02',
    title: "임종룡 회장, ‘비은행’ 올인...총주주환원율 ‘50%’ 연다",
    publisher: "에너지경제",
    publisherLogoSeed: 'mkn',
    thumbnailSeed: 'mgt-02',
    thumbnailUrl: "/mock-images/news/20260427052003070.jpg",
    elapsed: "8분 전",
  },
];

export const MONEY_PRE_FX_NEWS: MoneyArticle[] = [
  {
    id: 'mpf-01',
    title: "국제금융센터 첫 삽도 못 떴는데… ‘전북 금융중심지’ 속도전 우려 목소리",
    publisher: "국민일보",
    publisherLogoSeed: 'seo',
    thumbnailSeed: 'mpf-01',
    thumbnailUrl: "/mock-images/news/20260427002902513.jpg",
    elapsed: "방금 전",
  },
  {
    id: 'mpf-02',
    title: "은행 퇴직연금 적립금 212조 돌파… 경쟁 본격화",
    publisher: "국민일보",
    publisherLogoSeed: 'edi',
    thumbnailSeed: 'mpf-02',
    thumbnailUrl: "/mock-images/news/20260427004502651.jpg",
    elapsed: "8분 전",
  },
  {
    id: 'mpf-03',
    title: "전쟁 6주, 카드 소비 꺾였다… 60대 이상만 소비 증가",
    publisher: "국민일보",
    publisherLogoSeed: 'rtu',
    thumbnailSeed: 'mpf-03',
    thumbnailUrl: "/mock-images/news/20260427004533658.jpg",
    elapsed: "13분 전",
  },
  {
    id: 'mpf-04',
    title: "\"AI가 M&A 중개\"…딥서치, 중소형 딜 4000건 플랫폼 구축",
    publisher: "이데일리",
    publisherLogoSeed: 'blb',
    thumbnailSeed: 'mpf-04',
    thumbnailUrl: "/mock-images/news/20260427033034143.jpg",
    elapsed: "22분 전",
  },
  {
    id: 'mpf-05',
    title: "보조금 빼고 세제만… '주니어 ISA' 재시동",
    publisher: "머니투데이",
    publisherLogoSeed: 'fin',
    thumbnailSeed: 'mpf-05',
    thumbnailUrl: "/mock-images/news/20260427040704221.jpg",
    elapsed: "31분 전",
  },
];

export const MONEY_LOOP_SHORTS: ShortItem[] = [
  {
    id: 'mls-01',
    title: '2분으로 보는 오늘의 코스피 핵심',
    author: '증시브리핑',
    thumbnailUrl: IMG.cook,
    viewCount: 184000,
  },
  {
    id: 'mls-02',
    title: '"원/달러 1,320원 공방"…FX 전문가 3인 의견',
    author: 'FX루프',
    thumbnailUrl: IMG.jassy,
    viewCount: 92000,
  },
  {
    id: 'mls-03',
    title: '반도체 4Q 실적 시즌 체크포인트 TOP5',
    author: '리서치루프',
    thumbnailUrl: IMG.nadella,
    viewCount: 127000,
  },
  {
    id: 'mls-04',
    title: '"배당락 D-10" 배당주 포트폴리오 체크',
    author: '배당연구소',
    thumbnailUrl: IMG.porat,
    viewCount: 64000,
  },
  {
    id: 'mls-05',
    title: '美 연준 12월 FOMC 관전 포인트',
    author: '글로벌마켓',
    thumbnailUrl: IMG.draghi,
    viewCount: 213000,
  },
  {
    id: 'mls-06',
    title: '비트코인 10만 달러 안착, 다음 저항선은?',
    author: '크립토브리핑',
    thumbnailUrl: IMG.son_masayoshi,
    viewCount: 301000,
  },
];
