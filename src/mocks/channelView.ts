export interface ChannelProfile {
  id: string;
  name: string;
  handle: string;
  avatarUrl: string;
  subscriberCount: number;
  description: string;
}

export interface ChannelPostBlock {
  type: 'paragraph' | 'quote' | 'image';
  text?: string;
  src?: string;
  caption?: string;
}

export interface ChannelPost {
  id: string;
  title: string;
  channel: ChannelProfile;
  publishedAt: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  body: ChannelPostBlock[];
  copyright: string;
}

export interface PlainComment {
  id: string;
  nickname: string;
  avatarUrl: string;
  timeAgo: string;
  body: string;
  likes: number;
  replies: number;
}

export interface RecommendCard {
  id: string;
  title: string;
  thumbnailUrl: string;
  source: string;
  meta?: string;
}

export const DEFAULT_CHANNEL: ChannelProfile = {
  id: 'ch-anti',
  name: '개미투자일지',
  handle: '@antt-invest',
  avatarUrl: 'https://picsum.photos/seed/ch-anti-avatar/160/160',
  subscriberCount: 48230,
  description: '9년차 개인 투자자가 매일 시장을 기록합니다. 전문가 아님, 글쓰기로 공부 중.',
};

export const DEFAULT_CHANNEL_POST: ChannelPost = {
  id: 'ch-001',
  title:
    '주식 초보가 KOSPI 3400 돌파 직전에 꼭 점검해야 할 5가지 — 9년차 개미의 위험 신호 체크리스트',
  channel: DEFAULT_CHANNEL,
  publishedAt: '2026.04.21. 오전 09:18',
  viewCount: 12430,
  likeCount: 1832,
  commentCount: 214,
  body: [
    {
      type: 'paragraph',
      text: '지난주까지만 해도 "3300도 못 뚫는다"던 시장이 하루 만에 3480까지 올라왔습니다. 제가 지난 9년 동안 비슷한 구간을 4번 정도 경험해봤는데, 이 "돌파 직전" 구간에서 개인 투자자가 가장 많이 실수합니다.',
    },
    {
      type: 'paragraph',
      text: '오늘은 코스피 3400 직전 / 돌파 초입에서 개미 투자자가 반드시 챙겨야 할 5가지를 정리해봤습니다. 참고로 저는 전문가가 아니고, 제 포지션도 글 마지막에 그대로 공개합니다.',
    },
    {
      type: 'quote',
      text: '"강세장일수록 현금 비중을 확인해라. 오르는 걸 보면 전부 넣고 싶어지지만, 그럴수록 다음 급락을 견딜 연료가 사라진다."\n— 제가 2020년에 뼈저리게 배운 교훈',
    },
    {
      type: 'image',
      src: 'https://picsum.photos/seed/ch-post-01/600/400',
      caption: '최근 5년 KOSPI 주요 변곡점과 개인 순매수 타이밍 (직접 정리)',
    },
    {
      type: 'paragraph',
      text: '① 현금 비중 — 적어도 15~20%는 남기세요. 지금 들어가는 돈이 "다음 하락에서 버틸 수 있는지" 자문해야 합니다.\n② 종목 집중도 — 테마 하나에 70% 몰빵은 위험. 반도체가 좋아 보인다면 반도체 ETF + 개별 종목 조합으로 분산.\n③ 평균 단가 관리 — 어제 어제까지 빠질 때 안 샀다면, 오늘 신고가에서 사는 이유가 "FOMO"는 아닌지 체크.',
    },
    {
      type: 'paragraph',
      text: '④ 손절 라인 — 지금 사는 종목의 -7% 라인을 종이에 적어두세요. 3%만 떨어져도 불안하다면 사이즈가 너무 큰 겁니다.\n⑤ 정보 편식 — 유튜브/카톡 리딩방만 보지 말고 공시, 실적, 외국인 수급을 같이 보세요. 한쪽 채널만 보면 반드시 끝물에 들어갑니다.',
    },
    {
      type: 'quote',
      text: '"초보는 얼마를 벌지 고민하고, 고수는 얼마를 잃지 않을지 고민한다."\n— 이 문장 하나면 사실 이 글은 안 읽어도 됨.',
    },
    {
      type: 'paragraph',
      text: '제 현재 포지션은 다음과 같습니다. 참고만 해주세요.\n- 삼성전자 32% / SK하이닉스 18% / 현대차 9% / LG에너지솔루션 8%\n- 현금 18%, 미국 ETF 15%\n손절 라인 평균 -7%, 익절 라인 없음 (분할 매도 중).',
    },
    {
      type: 'paragraph',
      text: '질문은 댓글로 남겨주세요. 개별 종목 콕 집어서 "지금 들어가도 되나요?" 같은 질문은 답 못 드립니다. 제가 틀렸을 수도 있다는 전제로, 오늘도 차분히.',
    },
    {
      type: 'paragraph',
      text: '추가로, "강세장 후반에 개미가 실수하는 3가지 패턴"만 짧게 덧붙여둡니다. 제가 9년 동안 지켜본 바, 강세장 끝물에 들어온 개미는 거의 같은 실수를 반복합니다.',
    },
    {
      type: 'paragraph',
      text: '① 레버리지 확대 — "이번엔 다르다"는 말에 혹해 미수/신용/CFD로 사이즈를 키운다. 시장이 한 번만 크게 출렁여도 반대매매로 날아가는 개미가 생각보다 많습니다.\n② 테마주 이동 — 이미 올라간 대형주 대신 "덜 오른 테마"를 찾기 시작한다. 보통 그 테마는 이유 있는 저평가인 경우가 많음.\n③ 손절 라인 상향 조정 — 원래 -7%였던 손절선을 -12%, -15%로 슬그머니 내리기 시작한다. 이 순간 이미 게임은 지고 있는 겁니다.',
    },
    {
      type: 'image',
      src: 'https://picsum.photos/seed/ch-post-02/600/400',
      caption: '강세장 후반 개인 투자자 포지션 변화 (2018~2025 제가 직접 수집한 통계)',
    },
    {
      type: 'paragraph',
      text: '마지막으로 현실적인 이야기 하나. 시장은 본인의 심리 상태와 거의 같이 움직입니다. 회사에서 힘든 날 주식이 같이 빠지고, 기분 좋은 날 신고가를 보는 경험 다들 있으실 겁니다. 숫자를 냉정하게 읽기 위해서는 매일 자기 심리부터 기록하는 습관이 의외로 큰 차이를 만듭니다.',
    },
    {
      type: 'quote',
      text: '"차트보다 내 상태를 먼저 본다."\n9년 동안 가장 비싸게 주고 배운 한 줄입니다.',
    },
    {
      type: 'paragraph',
      text: '오늘 글이 도움이 되셨다면 공감 한 번 눌러주시고, 질문은 댓글로. 다음 글은 "2026 상반기 실적 시즌, 개미가 실수하기 쉬운 3구간"으로 돌아오겠습니다. 긴 글 읽어주셔서 감사합니다.',
    },
  ],
  copyright: '© 개미투자일지 · 본 글은 개인 의견이며 투자 자문이 아닙니다.',
};

export const CHANNEL_COMMENTS: PlainComment[] = [
  {
    id: 'ccm-001',
    nickname: '빨간얼룩말**',
    avatarUrl: 'https://picsum.photos/seed/ccm-001/80/80',
    timeAgo: '5분 전',
    body: '현금 비중 체크 부분 진짜 와닿네요. 저는 오늘도 못 참고 다 넣을 뻔…',
    likes: 42,
    replies: 2,
  },
  {
    id: 'ccm-002',
    nickname: '조용한블루**',
    avatarUrl: 'https://picsum.photos/seed/ccm-002/80/80',
    timeAgo: '11분 전',
    body: '4번 손절 라인 진짜 동의. 미리 안 적어두면 3%만 빠져도 손발이 떨립니다.',
    likes: 38,
    replies: 0,
  },
  {
    id: 'ccm-003',
    nickname: 'KakaoNight**',
    avatarUrl: 'https://picsum.photos/seed/ccm-003/80/80',
    timeAgo: '24분 전',
    body: '포지션 공개 감사합니다. 참고만 할게요. 저는 반도체 비중 좀 더 낮춰보려구요.',
    likes: 21,
    replies: 1,
  },
  {
    id: 'ccm-004',
    nickname: '노란햇살**',
    avatarUrl: 'https://picsum.photos/seed/ccm-004/80/80',
    timeAgo: '42분 전',
    body: '다음 글은 언제 올라오나요? 실적 시즌 분석 기다리고 있습니다!',
    likes: 12,
    replies: 0,
  },
];

export const PERSONALIZED_RECOMMENDS: RecommendCard[] = [
  {
    id: 'pr-001',
    title: '올해 1%만 이겨도 성공이다 — 2026 투자자들의 공통된 착각',
    thumbnailUrl: 'https://picsum.photos/seed/pr-001/300/300',
    source: '주식일기장',
    meta: '1시간 전',
  },
  {
    id: 'pr-002',
    title: '"현금 비중 30%"를 10년째 지키는 블로거의 기록',
    thumbnailUrl: 'https://picsum.photos/seed/pr-002/300/300',
    source: '장투러',
    meta: '3시간 전',
  },
  {
    id: 'pr-003',
    title: '신고가 직전 종목, 따라 살지 말고 이렇게 검증하세요',
    thumbnailUrl: 'https://picsum.photos/seed/pr-003/300/300',
    source: 'KJM_차트노트',
    meta: '어제',
  },
  {
    id: 'pr-004',
    title: '2030 투자자가 월 50만원으로 5년 쌓은 포트폴리오 공개',
    thumbnailUrl: 'https://picsum.photos/seed/pr-004/300/300',
    source: '느린걸음',
    meta: '어제',
  },
];

export interface ChannelPostRef {
  id: string;
  title: string;
  thumbnailUrl: string;
  publishedAt: string;
  viewCount: number;
}

export const CHANNEL_OTHER_POSTS: ChannelPostRef[] = [
  {
    id: 'ch-other-01',
    title: '요즘 반도체 장세, 제가 줄이고 있는 이유 3가지',
    thumbnailUrl: 'https://picsum.photos/seed/ch-other-01/300/300',
    publishedAt: '어제',
    viewCount: 8430,
  },
  {
    id: 'ch-other-02',
    title: '"한 종목 몰빵"으로 잃었던 2천만원 이야기',
    thumbnailUrl: 'https://picsum.photos/seed/ch-other-02/300/300',
    publishedAt: '2일 전',
    viewCount: 15700,
  },
  {
    id: 'ch-other-03',
    title: '시황 글을 9년째 쓰면서 바뀐 3가지 습관',
    thumbnailUrl: 'https://picsum.photos/seed/ch-other-03/300/300',
    publishedAt: '3일 전',
    viewCount: 6210,
  },
];

export const MORE_CHANNEL_POSTS: ChannelPostRef[] = [
  {
    id: 'cp-001',
    title: '2026년 개미 투자자 설문, 놓친 공모주 TOP 5',
    thumbnailUrl: 'https://picsum.photos/seed/cp-001/300/300',
    publishedAt: '1시간 전',
    viewCount: 23400,
  },
  {
    id: 'cp-002',
    title: '"ETF는 장기 투자용"은 오해입니다',
    thumbnailUrl: 'https://picsum.photos/seed/cp-002/300/300',
    publishedAt: '3시간 전',
    viewCount: 18900,
  },
  {
    id: 'cp-003',
    title: '저는 이제 증권방송을 끊었습니다 (이유 5가지)',
    thumbnailUrl: 'https://picsum.photos/seed/cp-003/300/300',
    publishedAt: '5시간 전',
    viewCount: 34100,
  },
  {
    id: 'cp-004',
    title: '월급쟁이가 알아두면 유용한 세테크 4가지',
    thumbnailUrl: 'https://picsum.photos/seed/cp-004/300/300',
    publishedAt: '어제',
    viewCount: 29400,
  },
  {
    id: 'cp-005',
    title: '배당주 10년 누적 수익률, 직접 계산해봤습니다',
    thumbnailUrl: 'https://picsum.photos/seed/cp-005/300/300',
    publishedAt: '어제',
    viewCount: 17200,
  },
  {
    id: 'cp-006',
    title: '아이폰 17 Pro, 개발자가 진짜 쓸만한 기능 3가지',
    thumbnailUrl: 'https://picsum.photos/seed/cp-006/300/300',
    publishedAt: '어제',
    viewCount: 11800,
  },
  {
    id: 'cp-007',
    title: '서울 아파트 거래 절벽, 실거주자 입장에서 본 해석',
    thumbnailUrl: 'https://picsum.photos/seed/cp-007/300/300',
    publishedAt: '2일 전',
    viewCount: 42100,
  },
  {
    id: 'cp-008',
    title: 'KOSPI 3400 돌파 직전, 제가 산 종목 2개 공개',
    thumbnailUrl: 'https://picsum.photos/seed/cp-008/300/300',
    publishedAt: '2일 전',
    viewCount: 50200,
  },
  {
    id: 'cp-009',
    title: '배달앱 수수료 5.5% 통일, 실제로 가맹점에 유리할까',
    thumbnailUrl: 'https://picsum.photos/seed/cp-009/300/300',
    publishedAt: '3일 전',
    viewCount: 14800,
  },
  {
    id: 'cp-010',
    title: '"지금이라도 들어가야 할까" 묻는 친구에게 한 대답',
    thumbnailUrl: 'https://picsum.photos/seed/cp-010/300/300',
    publishedAt: '3일 전',
    viewCount: 26700,
  },
];

export const POPULAR_CONTENT: RecommendCard = {
  id: 'pc-001',
  title: '"3400 돌파, 이번엔 다르다"…10년째 주식 시황을 기록한 블로거의 분석',
  thumbnailUrl: 'https://picsum.photos/seed/pc-001/900/600',
  source: '시장일지',
  meta: '조회 4.8만',
};
