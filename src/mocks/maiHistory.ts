export interface RecentHistoryItem {
  id: string;
  title: string;
  source: string;
  isShorts?: boolean;
  thumbnailUrl: string;
}

export interface RecentHistoryGroup {
  dateLabel: string;
  items: RecentHistoryItem[];
}

export interface ReactionItem {
  id: string;
  title: string;
  source: string;
  isShorts?: boolean;
  thumbnailUrl: string;
}

// 다른 탭에서 사용 중인 /mock-images/news/* 썸네일을 재사용한다.
export const RECENT_HISTORY_GROUPS: RecentHistoryGroup[] = [
  {
    dateLabel: '오늘',
    items: [
      {
        id: 'r-1',
        title: 'HBM 수요 폭증에 SK하이닉스 사상 최대 분기 실적',
        source: '한국경제',
        thumbnailUrl: '/mock-images/news/20260427000219928.jpg',
      },
      {
        id: 'r-2',
        title: '"이란-이스라엘 휴전 임박" 외신 보도…유가 즉각 하락',
        source: '연합뉴스',
        thumbnailUrl: '/mock-images/news/20260427002902513.jpg',
      },
      {
        id: 'r-3',
        title: '한강 둔치서 발견된 상괭이, 아쿠아리움으로 이송',
        source: '뉴스1',
        isShorts: true,
        thumbnailUrl: '/mock-images/news/20260427093101444.jpg',
      },
      {
        id: 'r-4',
        title: '코스피 2900선 회복…개인 1조 매수 우위',
        source: '머니투데이',
        thumbnailUrl: '/mock-images/news/20260427033034143.jpg',
      },
    ],
  },
  {
    dateLabel: '어제',
    items: [
      {
        id: 'r-5',
        title: '대법, "주 52시간 위반 사용자 처벌 정당" 확정',
        source: '조선비즈',
        thumbnailUrl: '/mock-images/news/20260427004502651.jpg',
      },
      {
        id: 'r-6',
        title: '엔비디아 "차세대 GPU 양산 임박"…HBM4 수혜주는?',
        source: '이데일리',
        isShorts: true,
        thumbnailUrl: '/mock-images/news/20260427082408884.jpg',
      },
      {
        id: 'r-7',
        title: '오월드 늑구 가족, 첫 야외 방사…관람객 환호',
        source: 'KBS',
        thumbnailUrl: '/mock-images/news/20260427060837724.jpg',
      },
      {
        id: 'r-8',
        title: '환율 1390원 돌파, 외환당국 "변동성 예의 주시"',
        source: '서울경제',
        thumbnailUrl: '/mock-images/news/20260427040704221.jpg',
      },
    ],
  },
  {
    dateLabel: '5월 2일 토요일',
    items: [
      {
        id: 'r-9',
        title: '핵협상 7차 라운드…호르무즈 해협 긴장 고조',
        source: 'JTBC',
        thumbnailUrl: '/mock-images/news/20260427012107880.jpg',
      },
      {
        id: 'r-10',
        title: '브렌트유 80달러 돌파, 정유주 일제히 강세',
        source: '파이낸셜뉴스',
        thumbnailUrl: '/mock-images/news/20260427050006644.jpg',
      },
      {
        id: 'r-11',
        title: '"손흥민 시즌 23호골" 토트넘, 첼시에 3-1 완승',
        source: 'SPOTV',
        isShorts: true,
        thumbnailUrl: '/mock-images/news/20260427102750457.jpg',
      },
      {
        id: 'r-12',
        title: '반도체 슈퍼사이클, 3년 만에 다시 온다',
        source: '매일경제',
        thumbnailUrl: '/mock-images/news/20260427013335958.jpg',
      },
    ],
  },
  {
    dateLabel: '5월 1일 금요일',
    items: [
      {
        id: 'r-13',
        title: '근로자의 날 한강공원 인파…"날씨 좋아 가족 단위"',
        source: 'YTN',
        thumbnailUrl: '/mock-images/news/20260427020308039.jpg',
      },
      {
        id: 'r-14',
        title: '다음, AI 검색 정식 오픈…"개인화 강화"',
        source: '디지털타임스',
        thumbnailUrl: '/mock-images/news/20260427112617698.jpg',
      },
      {
        id: 'r-15',
        title: '비트코인 8만 달러 재돌파, 알트코인도 동반 상승',
        source: '코인데스크코리아',
        thumbnailUrl: '/mock-images/news/20260427004533658.jpg',
      },
    ],
  },
];

export const REACTION_LIKED_ITEMS: ReactionItem[] = [
  {
    id: 'lk-1',
    title: 'QWER 세레모니 쇼케이스 1분 요약',
    source: '엠넷K팝',
    isShorts: true,
    thumbnailUrl: '/mock-images/news/20260427115841592.jpg',
  },
  {
    id: 'lk-2',
    title: '"AI가 추천한 종목, 한 달 수익률 18%" 화제',
    source: '한국경제',
    thumbnailUrl: '/mock-images/news/20260427000219928.jpg',
  },
  {
    id: 'lk-3',
    title: '손흥민 LAFC 어시스트 하이라이트',
    source: 'ESPN KOREA',
    isShorts: true,
    thumbnailUrl: '/mock-images/news/20260427093101444.jpg',
  },
  {
    id: 'lk-4',
    title: '한라산 첫눈, 평년보다 11일 빨라',
    source: '제주일보',
    thumbnailUrl: '/mock-images/news/20260427060837724.jpg',
  },
  {
    id: 'lk-5',
    title: '박보영, 골드랜드 비하인드 컷',
    source: 'OTT인사이트',
    isShorts: true,
    thumbnailUrl: '/mock-images/news/20260427112617698.jpg',
  },
  {
    id: 'lk-6',
    title: '"테슬라 로보택시 시범 운행 도시 추가" 외신 보도',
    source: '머니투데이',
    thumbnailUrl: '/mock-images/news/20260427033034143.jpg',
  },
  {
    id: 'lk-7',
    title: '윤이나 LPGA 메이저 4위 베스트 샷',
    source: '골프뉴스코리아',
    isShorts: true,
    thumbnailUrl: '/mock-images/news/20260427082015786.jpg',
  },
  {
    id: 'lk-8',
    title: '근로자의 날 한강공원 인파…"날씨 좋아 가족 단위"',
    source: 'YTN',
    thumbnailUrl: '/mock-images/news/20260427020308039.jpg',
  },
  {
    id: 'lk-9',
    title: '"엔비디아 GPU 공급 부족 해소" 모건스탠리 분석',
    source: '이데일리',
    thumbnailUrl: '/mock-images/news/20260427050006644.jpg',
  },
  {
    id: 'lk-10',
    title: '이정후 4안타·오타니 시즌 첫 3안타 보기',
    source: '베이스볼위클리',
    thumbnailUrl: '/mock-images/news/20260427082408884.jpg',
  },
  {
    id: 'lk-11',
    title: '여름 휴가지 BEST 5, 데이터로 본 인기 코스',
    source: '여행신문',
    thumbnailUrl: '/mock-images/news/20260427013335958.jpg',
  },
  {
    id: 'lk-12',
    title: '서울숲 야간 개장…반딧불이 체험 인기',
    source: '뉴시스',
    thumbnailUrl: '/mock-images/news/20260427061101746.jpg',
  },
  {
    id: 'lk-13',
    title: '귀여운 늑구 가족 첫 외출 영상',
    source: '오월드',
    thumbnailUrl: '/mock-images/news/20260427121940473.jpg',
  },
  {
    id: 'lk-14',
    title: '다음 카페 "내 동네 모임" 신규 기능 출시',
    source: '디지털타임스',
    thumbnailUrl: '/mock-images/news/20260427002729487.jpg',
  },
  {
    id: 'lk-15',
    title: '코스피 사상 최고치 경신…삼성전자 6% 급등',
    source: '매일경제',
    thumbnailUrl: '/mock-images/news/20260427120151780.jpg',
  },
  {
    id: 'lk-16',
    title: '"AI 비서가 일정까지 잡아준다" 다음 메일 신기능 공개',
    source: '디지털타임스',
    thumbnailUrl: '/mock-images/news/20260427120500118.jpg',
  },
];

export const REACTION_DISLIKED_ITEMS: ReactionItem[] = [
  {
    id: 'dk-1',
    title: '"기름값 또 올랐다" 운전자들 한숨',
    source: '서울경제',
    thumbnailUrl: '/mock-images/news/20260427040704221.jpg',
  },
  {
    id: 'dk-2',
    title: '서울 도심 전세 사기 또…피해자 50여 명',
    source: 'JTBC',
    thumbnailUrl: '/mock-images/news/20260427012107880.jpg',
  },
  {
    id: 'dk-3',
    title: '"학교 근처서 무차별 폭행" CCTV에 잡힌 그날',
    source: 'SBS',
    isShorts: true,
    thumbnailUrl: '/mock-images/news/20260427102750457.jpg',
  },
  {
    id: 'dk-4',
    title: '4월 폭염, 평년보다 3.2도 높았다…기상청 분석',
    source: '연합뉴스',
    thumbnailUrl: '/mock-images/news/20260427002902513.jpg',
  },
  {
    id: 'dk-5',
    title: '국내 의료대란 장기화 우려…응급환자 이송 차질',
    source: '조선비즈',
    thumbnailUrl: '/mock-images/news/20260427004502651.jpg',
  },
  {
    id: 'dk-6',
    title: '"보이스피싱 피해 역대 최대" 작년 1조 8천억',
    source: 'KBS',
    thumbnailUrl: '/mock-images/news/20260427004533658.jpg',
  },
  {
    id: 'dk-7',
    title: '"우주 쓰레기 충돌 위험" 통신위성 비상',
    source: '한국일보',
    isShorts: true,
    thumbnailUrl: '/mock-images/news/20260427040113161.jpg',
  },
  {
    id: 'dk-8',
    title: '도심 한복판 흉기 난동…시민 5명 부상',
    source: 'MBC',
    thumbnailUrl: '/mock-images/news/20260427000434993.jpg',
  },
  {
    id: 'dk-9',
    title: '작년 출생아 수 23만, 또 사상 최저',
    source: '연합뉴스TV',
    thumbnailUrl: '/mock-images/news/20260427043341365.jpg',
  },
  {
    id: 'dk-10',
    title: '"내년 건강보험료 또 인상" 4인 가구 부담 늘어',
    source: '머니투데이',
    isShorts: true,
    thumbnailUrl: '/mock-images/news/20260427063213037.jpg',
  },
  {
    id: 'dk-11',
    title: '기록적 산불 확산…강원 1500ha 잿더미',
    source: '강원도민일보',
    thumbnailUrl: '/mock-images/news/20260427050229816.jpg',
  },
  {
    id: 'dk-12',
    title: '"한강 녹조 비상" 기온 상승에 조류 폭증',
    source: '환경일보',
    thumbnailUrl: '/mock-images/news/20260427002732489.jpg',
  },
  {
    id: 'dk-13',
    title: '"이상 기후로 사과 작황 50% 감소" 농가 시름',
    source: '농민신문',
    isShorts: true,
    thumbnailUrl: '/mock-images/news/20260427004334646.jpg',
  },
  {
    id: 'dk-14',
    title: '청년 실업률 다시 두 자릿수…정책 한계 지적',
    source: '한겨레',
    thumbnailUrl: '/mock-images/news/20260427010902818.jpg',
  },
  {
    id: 'dk-15',
    title: '대학가 원룸 월세 상한선 돌파…학생들 시위',
    source: '대학신문',
    thumbnailUrl: '/mock-images/news/20260427000758157.jpg',
  },
];

export interface MyComment {
  id: string;
  username: string;
  createdAt: string;
  body: string;
  article: { title: string; thumbnailUrl: string };
  commentCount: number;
  likeCount: number;
  dislikeCount: number;
}

export const MY_COMMENTS: MyComment[] = [
  {
    id: 'mc-1',
    username: '행복한 다음이',
    createdAt: '방금 전',
    body: 'HBM 수요 증가가 진짜 체감되네요. 이번 분기 실적 보고 깜짝 놀랐습니다 👏',
    article: {
      title: 'HBM 수요 폭증에 SK하이닉스 사상 최대 분기 실적',
      thumbnailUrl: '/mock-images/news/20260427000219928.jpg',
    },
    commentCount: 42,
    likeCount: 128,
    dislikeCount: 3,
  },
  {
    id: 'mc-2',
    username: '행복한 다음이',
    createdAt: '12분 전',
    body: '휴전 보도에 유가가 즉각 반응한 거 보면 시장이 이번 사태에 얼마나 민감했는지 알겠네요.',
    article: {
      title: '"이란-이스라엘 휴전 임박" 외신 보도…유가 즉각 하락',
      thumbnailUrl: '/mock-images/news/20260427002902513.jpg',
    },
    commentCount: 17,
    likeCount: 64,
    dislikeCount: 8,
  },
  {
    id: 'mc-3',
    username: '행복한 다음이',
    createdAt: '2시간 전',
    body: '늑구 가족 너무 귀엽네요 ㅠㅠ 다음 주말에 오월드 가야겠어요',
    article: {
      title: '오월드 늑구 가족, 첫 야외 방사…관람객 환호',
      thumbnailUrl: '/mock-images/news/20260427060837724.jpg',
    },
    commentCount: 8,
    likeCount: 51,
    dislikeCount: 0,
  },
  {
    id: 'mc-4',
    username: '행복한 다음이',
    createdAt: '어제',
    body: '주 52시간 위반 처벌 정당하다는 판결, 현장에서는 잘 적용될지 의문이지만 방향은 맞다고 봅니다.',
    article: {
      title: '대법, "주 52시간 위반 사용자 처벌 정당" 확정',
      thumbnailUrl: '/mock-images/news/20260427004502651.jpg',
    },
    commentCount: 64,
    likeCount: 87,
    dislikeCount: 22,
  },
  {
    id: 'mc-5',
    username: '행복한 다음이',
    createdAt: '5월 2일',
    body: '브렌트유 80달러 돌파면 정유주 단기로는 좋을 것 같은데, 지정학 리스크 정리되면 빠르게 빠질 듯합니다.',
    article: {
      title: '브렌트유 80달러 돌파, 정유주 일제히 강세',
      thumbnailUrl: '/mock-images/news/20260427050006644.jpg',
    },
    commentCount: 23,
    likeCount: 41,
    dislikeCount: 5,
  },
  {
    id: 'mc-6',
    username: '행복한 다음이',
    createdAt: '5월 1일',
    body: 'AI 검색 개인화 강화는 좋은데 프라이버시 안내 좀 더 자세히 해줬으면 합니다.',
    article: {
      title: '다음, AI 검색 정식 오픈…"개인화 강화"',
      thumbnailUrl: '/mock-images/news/20260427112617698.jpg',
    },
    commentCount: 31,
    likeCount: 73,
    dislikeCount: 4,
  },
];

export interface CommentNotification {
  id: string;
  username: string;
  avatarUrl: string;
  createdAt: string;
  reply: string;
}

const dicebear = (seed: string) =>
  `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(seed)}&backgroundColor=ffd5dc,c0aede,b6e3f4,d1f4d9,fde2b3`;

export interface SavedItem {
  id: string;
  title: string;
  source: string;
  hashtags: string[];
  thumbnailUrl: string;
}

export const SAVED_ITEMS: SavedItem[] = [
  {
    id: 'sv-1',
    title: '"AI 검색이 바꾼 검색 시장" 다음 점유율 분석',
    source: '디지털타임스',
    hashtags: ['AI', '뉴스'],
    thumbnailUrl: '/mock-images/news/20260427112617698.jpg',
  },
  {
    id: 'sv-2',
    title: 'HBM 수요 폭증에 SK하이닉스 사상 최대 분기 실적',
    source: '한국경제',
    hashtags: ['주식', '테크'],
    thumbnailUrl: '/mock-images/news/20260427000219928.jpg',
  },
  {
    id: 'sv-3',
    title: '코스피 2900선 회복…개인 1조 매수 우위',
    source: '머니투데이',
    hashtags: ['주식', '경제'],
    thumbnailUrl: '/mock-images/news/20260427033034143.jpg',
  },
  {
    id: 'sv-4',
    title: '제주 한 달 살기, 3월부터 예약 폭주',
    source: '제주일보',
    hashtags: ['여행'],
    thumbnailUrl: '/mock-images/news/20260427060837724.jpg',
  },
  {
    id: 'sv-5',
    title: '여름 휴가지 BEST 5, 데이터로 본 인기 코스',
    source: '여행신문',
    hashtags: ['여행', '맛집'],
    thumbnailUrl: '/mock-images/news/20260427013335958.jpg',
  },
  {
    id: 'sv-6',
    title: '박보영, 신작 드라마 골드랜드 비하인드 인터뷰 공개',
    source: 'OTT인사이트',
    hashtags: ['연예'],
    thumbnailUrl: '/mock-images/news/20260427120411091.jpg',
  },
  {
    id: 'sv-7',
    title: 'QWER 세레모니 쇼케이스 1분 요약',
    source: '엠넷K팝',
    hashtags: ['연예'],
    thumbnailUrl: '/mock-images/news/20260427115841592.jpg',
  },
  {
    id: 'sv-8',
    title: '"이란-이스라엘 휴전 임박" 외신 보도…유가 즉각 하락',
    source: '연합뉴스',
    hashtags: ['뉴스', '국제'],
    thumbnailUrl: '/mock-images/news/20260427002902513.jpg',
  },
  {
    id: 'sv-9',
    title: '오월드 늑구 가족, 첫 야외 방사…관람객 환호',
    source: 'KBS',
    hashtags: ['뉴스'],
    thumbnailUrl: '/mock-images/news/20260427121940473.jpg',
  },
  {
    id: 'sv-10',
    title: '"손흥민 시즌 23호골" 토트넘, 첼시에 3-1 완승',
    source: 'SPOTV',
    hashtags: ['스포츠'],
    thumbnailUrl: '/mock-images/news/20260427102750457.jpg',
  },
  {
    id: 'sv-11',
    title: '윤이나 LPGA 메이저 4위 베스트 샷',
    source: '골프뉴스코리아',
    hashtags: ['스포츠'],
    thumbnailUrl: '/mock-images/news/20260427082015786.jpg',
  },
  {
    id: 'sv-12',
    title: '성수동 신상 베이커리 BEST 5, 줄 안 서고 가는 법',
    source: '서울맛집랩',
    hashtags: ['맛집', '여행'],
    thumbnailUrl: '/mock-images/news/20260427061101746.jpg',
  },
  {
    id: 'sv-13',
    title: '"엔비디아 차세대 GPU 양산 임박" HBM4 수혜주는?',
    source: '이데일리',
    hashtags: ['AI', '주식', '테크'],
    thumbnailUrl: '/mock-images/news/20260427082408884.jpg',
  },
  {
    id: 'sv-14',
    title: '"테슬라 로보택시 시범 운행 도시 추가" 외신 보도',
    source: '머니투데이',
    hashtags: ['테크', '경제'],
    thumbnailUrl: '/mock-images/news/20260427050006644.jpg',
  },
  {
    id: 'sv-15',
    title: '아이폰 18 시리즈 출시 임박, 라인업 정리',
    source: 'IT조선',
    hashtags: ['테크'],
    thumbnailUrl: '/mock-images/news/20260427002729487.jpg',
  },
];

export const COMMENT_NOTIFICATIONS: CommentNotification[] = [
  {
    id: 'cn-1',
    username: 'seoul_walker',
    avatarUrl: dicebear('seoul_walker'),
    createdAt: '5분 전',
    reply: '저도 같은 생각이에요. 이번 분기 실적은 진짜 의미가 큰 것 같습니다.',
  },
  {
    id: 'cn-2',
    username: '데이터덕후',
    avatarUrl: dicebear('data_geek'),
    createdAt: '34분 전',
    reply: 'HBM 수요는 내년까지 이어진다고 보는 분석이 많더라고요. 좋은 코멘트 감사합니다 👍',
  },
  {
    id: 'cn-3',
    username: 'happymom_82',
    avatarUrl: dicebear('happymom_82'),
    createdAt: '1시간 전',
    reply: '늑구 가족 사진 보니까 저도 가고 싶어졌어요! 정보 감사합니다 ㅎㅎ',
  },
  {
    id: 'cn-4',
    username: '오일왓처',
    avatarUrl: dicebear('oil_watcher'),
    createdAt: '3시간 전',
    reply: '단기 강세는 동의하는데 휴전 결렬 시나리오도 같이 생각해야 할 것 같아요.',
  },
  {
    id: 'cn-5',
    username: 'codeforhope',
    avatarUrl: dicebear('codeforhope'),
    createdAt: '5시간 전',
    reply: '대법 판결 이후로 직장 분위기 바뀐 곳이 꽤 있다고 해요. 현장 의견에 공감합니다.',
  },
  {
    id: 'cn-6',
    username: 'minari_lee',
    avatarUrl: dicebear('minari_lee'),
    createdAt: '어제',
    reply: 'AI 검색 프라이버시 관련은 진짜 중요해요. 카카오 측에 문의 글 올려야겠어요.',
  },
  {
    id: 'cn-7',
    username: '경제뉴스왓처',
    avatarUrl: dicebear('news_watcher'),
    createdAt: '5월 2일',
    reply: '정유주는 헤지 차원에서 일부만 가져가는 게 맞다고 봅니다. 동감!',
  },
];

