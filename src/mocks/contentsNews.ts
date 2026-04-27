import type { NewsArticle } from '@/types';

// Real Daum article metadata extracted 2026-04-27. Internal-use mockup only.
// Images live under /public/mock-images/news/.

export interface Headline {
  id: string;
  title: string;
  publisher: string;
  publishedAt: string;
}

export const MAJOR_HEADLINES: Headline[] = [
  {
    id: "mh-001",
    title: "트럼프, 총격 사건 자기 영웅화에 활용…\"링컨처럼 영향력 크면 공격 당해\"",
    publisher: "한국일보",
    publishedAt: "11분 전",
  },
  {
    id: "mh-002",
    title: "트럼프 “우린 미친 세상에 살고있다…총격범, 상당히 문제있는 사람”",
    publisher: "동아일보",
    publishedAt: "23분 전",
  },
  {
    id: "mh-003",
    title: "김부겸 \"대구로페이 예산 2배 확대\"…민생경제 공약 발표(종합)",
    publisher: "연합뉴스",
    publishedAt: "38분 전",
  },
  {
    id: "mh-004",
    title: "“50조 서울시 금고 잡아라”…진옥동 ‘수성ʼ vs 임종룡 ‘탈환ʼ [은행권 금고 쟁탈전]",
    publisher: "한국금융",
    publishedAt: "1시간 전",
  },
  {
    id: "mh-005",
    title: "국제금융센터 첫 삽도 못 떴는데… ‘전북 금융중심지’ 속도전 우려 목소리",
    publisher: "국민일보",
    publishedAt: "1시간 전",
  },
];

export const RECOMMEND_NEWS: Headline[] = [
  {
    id: "rc-001",
    title: "\"대상 아니라니요\"…고유가피해지원금 지급 신청 첫날 혼란 [현장, 그곳&]",
    publisher: "경기일보",
    publishedAt: "11분 전",
  },
  {
    id: "rc-002",
    title: "트럼프, 만찬장 총격에 “걱정 안 해…우린 미친 세상에 살고 있다”",
    publisher: "조선일보",
    publishedAt: "23분 전",
  },
  {
    id: "rc-003",
    title: "서울중앙지검, 과거 인권침해 재심 대응 변화…무죄·면소 적극 구형",
    publisher: "법률신문",
    publishedAt: "38분 전",
  },
  {
    id: "rc-004",
    title: "약도 소용없는 '만성 중이염'... \"방치하면 뼈까지 염증 자란다\"",
    publisher: "하이닥",
    publishedAt: "1시간 전",
  },
  {
    id: "rc-005",
    title: "보조금 빼고 세제만… '주니어 ISA' 재시동",
    publisher: "머니투데이",
    publishedAt: "1시간 전",
  },
];

export const PHOTO_NEWS: NewsArticle[] = [
  {
    id: "pn-001",
    title: "신동엽, '주당 DNA' 여대생 딸 공개 \"소주 23잔 마시고도 거뜬\" [미우새]",
    publisher: "마이데일리",
    publishedAt: "13분 전",
    thumbnailUrl: "/mock-images/news/20260427055907344.png",
    category: "entertain",
  },
  {
    id: "pn-002",
    title: "홍진경 이소라, 절교 15년만 재회에 故 최진실 이름 꺼냈다 “아픔 겪고 멀어져”(소라와진경)[어제TV]",
    publisher: "뉴스엔",
    publishedAt: "27분 전",
    thumbnailUrl: "/mock-images/news/20260427060550691.jpg",
    category: "entertain",
  },
  {
    id: "pn-003",
    title: "'와' 13억 허수봉, 12억 황택의 제치고 한국배구 역대 최고 연봉 찍었다…황승빈 6억+하승우 3억에 잔류 도장 [공식발표]",
    publisher: "마이데일리",
    publishedAt: "44분 전",
    thumbnailUrl: "/mock-images/news/20260427000306964.jpg",
    category: "sports",
  },
  {
    id: "pn-004",
    title: "[오피셜] '현대캐피탈 잔류' 허수봉 파격 계약, 연봉 8억·옵션 5억 '역대 최고액'",
    publisher: "스타뉴스",
    publishedAt: "1시간 전",
    thumbnailUrl: "/mock-images/news/20260427000434993.jpg",
    category: "sports",
  },
  {
    id: "pn-005",
    title: "'고양시 민원 해결사' 김완규 \"미래 100년 과제, 책임지고 마무리\"",
    publisher: "뉴스1",
    publishedAt: "2시간 전",
    thumbnailUrl: "/mock-images/news/20260427130108156.jpg",
    category: "life",
  },
  {
    id: "pn-006",
    title: "[단독]\"기강 확립\" 지시 당일…제주경찰, 술 취해 여자화장실 침입",
    publisher: "노컷뉴스",
    publishedAt: "방금 전",
    thumbnailUrl: "/mock-images/news/20260427130601312.jpg",
    category: "life",
  },
];

export const MOST_VIEWED_HEADLINES: Headline[] = [
  {
    id: "mv-001",
    title: "공명에 잠긴 건봉사… 세상 번뇌 비워낸 평화로움 전하다",
    publisher: "강원도민일보",
    publishedAt: "11분 전",
  },
  {
    id: "mv-002",
    title: "박윤환 울산시향 부지휘자, “수준높은 연주로 ‘문화도시 울산’ 인식개선 앞장”",
    publisher: "경상일보",
    publishedAt: "23분 전",
  },
  {
    id: "mv-003",
    title: "\"지친 아이들에게 힘을\"…함께 달리는 교육공동체",
    publisher: "EBS",
    publishedAt: "38분 전",
  },
  {
    id: "mv-004",
    title: "목포대·순천대 통합 제자리…2028년 의과대 신설 빨간불",
    publisher: "뉴시스",
    publishedAt: "1시간 전",
  },
  {
    id: "mv-005",
    title: "트럼프 \"내가 소아성애자라고?\" CBS 인터뷰에서 '발끈'",
    publisher: "노컷뉴스",
    publishedAt: "1시간 전",
  },
  {
    id: "mv-006",
    title: "양종희 “고객정보 보호가 신뢰”…KB금융, 업계 첫 정보보호 공시 추진",
    publisher: "이투데이",
    publishedAt: "2시간 전",
  },
  {
    id: "mv-007",
    title: "임종룡 회장, ‘비은행’ 올인...총주주환원율 ‘50%’ 연다",
    publisher: "에너지경제",
    publishedAt: "2시간 전",
  },
  {
    id: "mv-008",
    title: "스마일게이트, '1000억' 패소에도 비상장 고집…권혁빈 이혼 영향?[더시그널]",
    publisher: "한스경제",
    publishedAt: "방금 전",
  },
];

export const LIVE_NEWS: NewsArticle[] = [
  {
    id: "ln-001",
    title: "'부산 북갑 출마설' 하정우, 靑에 사의 표명…與 \"결심했다 알아\"(종합)",
    publisher: "뉴스1",
    publishedAt: "30분째 방송 중",
    thumbnailUrl: "/mock-images/news/20260427121700424.jpg",
    category: "politics",
    viewCount: 7800,
  },
  {
    id: "ln-002",
    title: "2년 사이 3번...트럼프는 왜 표적이 됐나",
    publisher: "YTN",
    publishedAt: "45분째 방송 중",
    thumbnailUrl: "/mock-images/news/20260427122223523.jpg",
    category: "politics",
    viewCount: 2800,
  },
];
