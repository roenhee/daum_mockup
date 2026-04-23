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
  title: '"코스피 3500 돌파 초읽기"…외국인 6거래일 연속 순매수',
  summary:
    '외국인이 6거래일 연속 국내 증시 순매수 기조를 이어가며 코스피가 연중 최고치인 3,481선을 넘어섰다. 증권가는 "AI 반도체 리레이팅이 추가 상승 여지를 만든다"고 분석했다.',
  publisher: '매일경제',
  publisherLogoSeed: 'mkn',
  thumbnailSeed: 'mn-main-kospi',
  thumbnailUrl: IMG.buffett,
  elapsed: '8분 전',
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
    title: 'SK하이닉스, 3분기 영업이익 9.4조 "사상 최대 실적"',
    publisher: '한국경제',
    publisherLogoSeed: 'hkn',
    thumbnailSeed: 'mn-sk',
    thumbnailUrl: IMG.chey_taewon,
    elapsed: '24분 전',
  },
  {
    id: 'mn-02',
    title: '"美 9월 CPI 2.3%"…연준, 연내 추가 인하 가능성',
    publisher: '이데일리',
    publisherLogoSeed: 'edi',
    thumbnailSeed: 'mn-fed',
    thumbnailUrl: IMG.powell,
    elapsed: '55분 전',
  },
  {
    id: 'mn-03',
    title: '"코스피 3500 간다" 증권가 목표지수 줄줄이 상향',
    publisher: '서울경제',
    publisherLogoSeed: 'seo',
    thumbnailSeed: 'mn-kospi-chart',
    thumbnailUrl: IMG.rhee_bok,
    elapsed: '1시간 전',
  },
  {
    id: 'mn-04',
    title: '"강남 아파트값 다시 꿈틀"…거래량 9월 대비 38% 증가',
    publisher: '매일경제',
    publisherLogoSeed: 'mkn',
    thumbnailSeed: 'mn-apt',
    thumbnailUrl: IMG.lisa_su,
    elapsed: '2시간 전',
  },
];

export const MONEY_REALESTATE: MoneyArticle[] = [
  {
    id: 'mr-01',
    title: '"수도권 전세대란" 임대차 3법 개정 논의 재점화',
    publisher: '조선비즈',
    publisherLogoSeed: 'chb',
    thumbnailSeed: 'mr-01',
    thumbnailUrl: IMG.moynihan,
    elapsed: '3시간 전',
  },
  {
    id: 'mr-02',
    title: '"재건축 한도 완화" 노원·상계 7억 뛰었다',
    publisher: '매일경제',
    publisherLogoSeed: 'mkn',
    thumbnailSeed: 'mr-02',
    thumbnailUrl: IMG.schwarzman,
    elapsed: '4시간 전',
  },
  {
    id: 'mr-03',
    title: '"대출 금리 5% 재진입" 은행권 변동금리 다시 상승',
    publisher: '한국경제',
    publisherLogoSeed: 'hkn',
    thumbnailSeed: 'mr-03',
    thumbnailUrl: IMG.dimon,
    elapsed: '어제',
  },
  {
    id: 'mr-04',
    title: '韓 가계부채 GDP 대비 100% 재돌파 "경고등"',
    publisher: '연합뉴스',
    publisherLogoSeed: 'yna',
    thumbnailSeed: 'mr-04',
    thumbnailUrl: IMG.fraser,
    elapsed: '어제',
  },
];

export const MONEY_INVESTMENT_POINTS: MoneyArticle[] = [
  {
    id: 'ip-01',
    title: '"반도체 사이클 2026 상반기까지" — 골드만 전망 요약',
    publisher: '골드만삭스 리포트',
    publisherLogoSeed: 'gld',
    thumbnailSeed: 'ip-01',
    thumbnailUrl: IMG.fink,
    elapsed: '2시간 전',
  },
  {
    id: 'ip-02',
    title: '2차전지 ETF, 이번 주만 9% 반등 — 유입 자금 7,400억',
    publisher: '머니투데이',
    publisherLogoSeed: 'mtd',
    thumbnailSeed: 'ip-02',
    thumbnailUrl: IMG.musk,
    elapsed: '3시간 전',
  },
  {
    id: 'ip-03',
    title: '"배당락 D-10" 고배당주 담아야 할 종목 TOP 5',
    publisher: 'SBS Biz',
    publisherLogoSeed: 'sbz',
    thumbnailSeed: 'ip-03',
    thumbnailUrl: IMG.dalio,
    elapsed: '5시간 전',
  },
  {
    id: 'ip-04',
    title: '"AI 인프라 CAPEX 정점 아직" — 모건스탠리 엔비디아 목표가 상향',
    publisher: '모건스탠리',
    publisherLogoSeed: 'mst',
    thumbnailSeed: 'ip-04',
    thumbnailUrl: IMG.huang,
    elapsed: '6시간 전',
  },
  {
    id: 'ip-05',
    title: '"美 대선 수혜주" 방산·인프라 ETF 3개월간 18% 상승',
    publisher: '한국경제',
    publisherLogoSeed: 'hkn',
    thumbnailSeed: 'ip-05',
    thumbnailUrl: IMG.iger,
    elapsed: '7시간 전',
  },
  {
    id: 'ip-06',
    title: '"연준 12월 동결 유력" — 금리 선물 시장 확률 78%',
    publisher: '블룸버그',
    publisherLogoSeed: 'blb',
    thumbnailSeed: 'ip-06',
    thumbnailUrl: IMG.yellen,
    elapsed: '8시간 전',
  },
  {
    id: 'ip-07',
    title: '"중국 부양책 기대 재점화" 홍콩H 지수 주간 6.3% 급등',
    publisher: '이데일리',
    publisherLogoSeed: 'edi',
    thumbnailSeed: 'ip-07',
    thumbnailUrl: IMG.li_kashing,
    elapsed: '어제',
  },
  {
    id: 'ip-08',
    title: '"엔캐리 청산 재현 가능성 낮다" — 노무라 "BOJ 점진적 긴축"',
    publisher: '노무라 리서치',
    publisherLogoSeed: 'nmr',
    thumbnailSeed: 'ip-08',
    thumbnailUrl: IMG.ueda,
    elapsed: '어제',
  },
  {
    id: 'ip-09',
    title: '"조선·방산 어닝 서프라이즈" HD한국조선해양 영업이익 2배',
    publisher: '서울경제',
    publisherLogoSeed: 'seo',
    thumbnailSeed: 'ip-09',
    thumbnailUrl: IMG.chung_euisun,
    elapsed: '어제',
  },
  {
    id: 'ip-10',
    title: '"비트코인 10만 달러 안착" — 기관 자금 ETF 유입 역대 최대',
    publisher: '코인데스크',
    publisherLogoSeed: 'cdk',
    thumbnailSeed: 'ip-10',
    thumbnailUrl: IMG.altman,
    elapsed: '2일 전',
  },
];

export const MONEY_HEADLINE_TEXTS: MoneyArticle[] = [
  {
    id: 'mth-01',
    title: '"韓 경상수지 흑자 340억달러…반도체·조선 수출 견인"',
    publisher: '연합뉴스',
    publisherLogoSeed: 'yna',
    thumbnailSeed: 'mth-01',
    elapsed: '15분 전',
  },
  {
    id: 'mth-02',
    title: '"삼성전자, 美 반도체 보조금 64억 달러 최종 확정"',
    publisher: '한국경제',
    publisherLogoSeed: 'hkn',
    thumbnailSeed: 'mth-02',
    elapsed: '32분 전',
  },
  {
    id: 'mth-03',
    title: '"테슬라 상하이 공장, 로보택시 전용 라인 증설 착수"',
    publisher: '매일경제',
    publisherLogoSeed: 'mkn',
    thumbnailSeed: 'mth-03',
    elapsed: '45분 전',
  },
  {
    id: 'mth-04',
    title: '"韓銀 11월 금리 동결"…환율 불안에 관망 기조 유지',
    publisher: '머니투데이',
    publisherLogoSeed: 'mtd',
    thumbnailSeed: 'mth-04',
    elapsed: '1시간 전',
  },
  {
    id: 'mth-05',
    title: '"엔비디아 시총 4조 달러 돌파"…글로벌 1위 수성',
    publisher: '블룸버그',
    publisherLogoSeed: 'blb',
    thumbnailSeed: 'mth-05',
    elapsed: '1시간 전',
  },
];

export const MONEY_GRID_TWO: MoneyArticle[] = [
  {
    id: 'mgt-01',
    title: '"코스피 밸류업 수혜주 집중 분석"…배당성장·자사주 소각 TOP10',
    publisher: '한국경제',
    publisherLogoSeed: 'hkn',
    thumbnailSeed: 'mgt-01',
    thumbnailUrl: IMG.lee_jaeyong,
    elapsed: '50분 전',
  },
  {
    id: 'mgt-02',
    title: '"서학개미 엔비디아 순매수 1위"…美 주식 보관액 1,200억 달러 돌파',
    publisher: '매일경제',
    publisherLogoSeed: 'mkn',
    thumbnailSeed: 'mgt-02',
    thumbnailUrl: IMG.bezos,
    elapsed: '1시간 전',
  },
];

export const MONEY_PRE_FX_NEWS: MoneyArticle[] = [
  {
    id: 'mpf-01',
    title: '"원/달러 1,320원대 안착"…외환 당국 미세조정 가능성',
    publisher: '서울경제',
    publisherLogoSeed: 'seo',
    thumbnailSeed: 'mpf-01',
    thumbnailUrl: IMG.solomon,
    elapsed: '10분 전',
  },
  {
    id: 'mpf-02',
    title: '"美 10년물 국채금리 4.1% 하락"…연말 금리 인하 기대',
    publisher: '이데일리',
    publisherLogoSeed: 'edi',
    thumbnailSeed: 'mpf-02',
    thumbnailUrl: IMG.gates,
    elapsed: '25분 전',
  },
  {
    id: 'mpf-03',
    title: '"엔화 반등"…일본은행 매파 발언에 엔/달러 150선 하향 돌파',
    publisher: '로이터',
    publisherLogoSeed: 'rtu',
    thumbnailSeed: 'mpf-03',
    thumbnailUrl: IMG.niinami,
    elapsed: '40분 전',
  },
  {
    id: 'mpf-04',
    title: '"위안화 약세 다시"…중국 PMI 부진에 환시 변동성 확대',
    publisher: '블룸버그',
    publisherLogoSeed: 'blb',
    thumbnailSeed: 'mpf-04',
    thumbnailUrl: IMG.yanai,
    elapsed: '1시간 전',
  },
  {
    id: 'mpf-05',
    title: '"달러 인덱스 104 근접"…신흥국 통화 약세 압력',
    publisher: '파이낸셜뉴스',
    publisherLogoSeed: 'fin',
    thumbnailSeed: 'mpf-05',
    thumbnailUrl: IMG.daniel_ek,
    elapsed: '2시간 전',
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
