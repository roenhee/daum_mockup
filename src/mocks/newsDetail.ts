import type { NewsArticle } from '@/types';

export interface ArticleParagraph {
  type: 'paragraph' | 'quote' | 'image' | 'ad';
  text?: string;
  src?: string;
  caption?: string;
}

export interface ArticleDetail {
  id: string;
  title: string;
  publisher: string;
  publisherLogoUrl: string;
  publisherSubscribed?: boolean;
  reporter: string;
  reporterEmail: string;
  publishedAt: string;
  viewCount: number;
  body: ArticleParagraph[];
  copyright: string;
}

export interface EmotionVotes {
  추천해요: number;
  좋아요: number;
  감동이에요: number;
  화나요: number;
  슬퍼요: number;
}

export interface Comment {
  id: string;
  nickname: string;
  avatarUrl: string;
  timeAgo: string;
  body: string;
  likes: number;
  dislikes: number;
  replies: number;
}

export const DEFAULT_ARTICLE: ArticleDetail = {
  id: 'hero-001',
  title: '이재명·트럼프, 백악관 회담…"수천만 弗 규모 대북 접근" 제안',
  publisher: '연합뉴스',
  publisherLogoUrl: 'https://picsum.photos/seed/yonhap-logo/80/80',
  publisherSubscribed: false,
  reporter: '김민준 기자',
  reporterEmail: 'mjkim@yonhapnews.co.kr',
  publishedAt: '2026.04.21. 오전 10:38',
  viewCount: 28470,
  body: [
    {
      type: 'paragraph',
      text: '이재명 대통령과 도널드 트럼프 미국 대통령이 20일(현지시간) 백악관에서 취임 후 첫 정상회담을 갖고 한미동맹을 재확인했다. 두 정상은 북한 비핵화 로드맵과 함께 "수천만 弗(달러) 규모의 대북 인도적 접근"에 원칙적으로 합의한 것으로 전해졌다.',
    },
    {
      type: 'image',
      src: 'https://picsum.photos/seed/summit-01/600/400',
      caption: '20일 오후(현지시간) 백악관 오벌 오피스에서 정상회담을 진행한 양 정상 (사진: 공동취재단)',
    },
    {
      type: 'paragraph',
      text: '한미 양국은 회담 결과물을 담은 공동성명을 이날 오후 발표했다. 성명에는 "한미 동맹은 전례 없는 수준으로 확장되고 있으며, 양국은 규범 기반 국제질서를 함께 수호할 것"이라는 문구가 담겼다.',
    },
    {
      type: 'quote',
      text: '"우리는 한반도의 완전한 비핵화를 위해 한국과 긴밀히 협력할 것이다. 동시에 북한 주민의 인도적 상황 개선을 위한 창의적 방안을 모색하겠다."\n— 트럼프 대통령, 공동 기자회견에서',
    },
    {
      type: 'paragraph',
      text: '트럼프 대통령이 직접 언급한 "수천만 달러 규모"의 대북 접근이 구체적으로 어떤 형태가 될지는 아직 공개되지 않았다. 정부 고위 관계자는 "식량·의약품 등 순수 인도적 품목이 우선 검토 대상"이라고 설명했다.',
    },
    {
      type: 'paragraph',
      text: '한편 양 정상은 이번 회담에서 반도체·이차전지 공급망, 조선업 협력, 우주항공 분야 공동 연구 등 경제·안보 의제에도 폭넓게 합의했다. 백악관은 "한미 경제파트너십이 상호 윈윈(win-win) 구조로 한 단계 격상됐다"고 평가했다.',
    },
    { type: 'ad' },
    {
      type: 'paragraph',
      text: '양국은 특히 반도체 공급망 부문에서 "핵심 소재·부품·장비(소부장)" 공동 관리 협의체를 새로 출범시키기로 했다. 한미는 해당 협의체에서 첨단 로직·메모리 공정 기술의 우회 유출을 막기 위한 수출 통제 기준을 공유하기로 합의했다.',
    },
    {
      type: 'paragraph',
      text: '조선업 협력은 미국 내 상선 건조 수주를 한국 기업이 확보하는 방향으로 구체화될 전망이다. 한화오션·HD현대중공업·삼성중공업은 미국 측 요청으로 LNG 운반선·컨테이너선 수주 협의를 진행 중이며, 이번 정상회담을 계기로 양해각서(MOU)가 빠르면 내달 초 체결될 수 있다는 관측도 나온다.',
    },
    {
      type: 'image',
      src: 'https://picsum.photos/seed/summit-02/600/400',
      caption: '21일 오전 연합뉴스 유튜브 라이브 화면 갈무리. 백악관 공동 기자회견장에서 양국 수행단이 악수를 나누고 있다.',
    },
    {
      type: 'paragraph',
      text: '우주항공 분야에서는 달 탐사 공동 임무와 차세대 위성 항법 분야 협력이 포함됐다. 양국은 NASA-KASA(가칭 한국우주항공청) 공동 태스크포스를 구성하고, 2028년까지 달 궤도 순회 탐사선 "누리-아폴로" 미션을 공동 운용하는 방안을 검토 중인 것으로 전해졌다.',
    },
    {
      type: 'quote',
      text: '"이번 합의는 한미 동맹이 기존의 안보 중심 구조에서 경제·기술·우주로 확장되고 있음을 상징한다. 특히 공급망 공동 관리는 향후 10년 한국 제조업의 지정학적 리스크를 획기적으로 낮출 수 있는 조치다."\n— 이우성 서강대 정치외교학과 교수',
    },
    {
      type: 'paragraph',
      text: '다만 야권 일각에서는 "수천만 달러 규모의 대북 접근"이라는 표현이 지나치게 모호하다는 지적도 나온다. 실제 집행 방식과 검증 체계에 대한 정부의 후속 발표가 이어져야 할 것으로 보인다.',
    },
    {
      type: 'paragraph',
      text: '이재명 대통령은 이날 귀국 비행기에 오르기 직전 기자들과 만나 "정상회담의 성과물이 실제 경제 현장과 한반도 평화에 닿을 수 있도록 후속 조치를 빈틈없이 챙기겠다"고 말했다. 대통령실은 주요 합의 내용을 담은 부속 문서를 다음 달 초 공개할 예정이다.',
    },
  ],
  copyright: 'Copyright ⓒ 연합뉴스. 무단 전재 및 재배포 금지',
};

export const DEFAULT_EMOTION_VOTES: EmotionVotes = {
  추천해요: 1284,
  좋아요: 842,
  감동이에요: 71,
  화나요: 203,
  슬퍼요: 18,
};

export const DEFAULT_COMMENTS: Comment[] = [
  {
    id: 'cm-001',
    nickname: '조용한오후**',
    avatarUrl: 'https://picsum.photos/seed/cm-001/80/80',
    timeAgo: '12분 전',
    body: '실제 이행까지가 관건. 성명만으로 끝나면 안 되고 구체 규모·방식이 빨리 나와야 한다.',
    likes: 128,
    dislikes: 14,
    replies: 6,
  },
  {
    id: 'cm-002',
    nickname: '길잃은고래**',
    avatarUrl: 'https://picsum.photos/seed/cm-002/80/80',
    timeAgo: '28분 전',
    body: '인도적 접근이라도 반대할 명분은 없지만 검증 장치는 확실히 해야죠. 과거 실패 반복 없어야 합니다.',
    likes: 96,
    dislikes: 22,
    replies: 4,
  },
  {
    id: 'cm-003',
    nickname: 'KJM_9403**',
    avatarUrl: 'https://picsum.photos/seed/cm-003/80/80',
    timeAgo: '41분 전',
    body: '반도체·조선 협력 부분이 더 기대된다. 이쪽이 실질적으로 체감되는 성과가 될 듯.',
    likes: 74,
    dislikes: 5,
    replies: 2,
  },
  {
    id: 'cm-004',
    nickname: '동네산책가**',
    avatarUrl: 'https://picsum.photos/seed/cm-004/80/80',
    timeAgo: '55분 전',
    body: '공동 기자회견 라이브 봤는데 분위기 나쁘지 않았음. 통역은 좀 불안했지만…',
    likes: 44,
    dislikes: 9,
    replies: 1,
  },
  {
    id: 'cm-005',
    nickname: '새벽비행**',
    avatarUrl: 'https://picsum.photos/seed/cm-005/80/80',
    timeAgo: '1시간 전',
    body: '우주항공 공동 연구가 뭔지 궁금. 후속 기사 부탁드립니다 기자님.',
    likes: 33,
    dislikes: 2,
    replies: 0,
  },
];

export const SAME_PUBLISHER_ARTICLES: NewsArticle[] = [
  {
    id: 'sp-001',
    title: '"대북 인도적 지원, 국제기구 경유가 유력"…외교가 관측',
    publisher: '연합뉴스',
    publishedAt: '1시간 전',
    thumbnailUrl: 'https://picsum.photos/seed/sp-001/300/300',
    category: 'politics',
  },
  {
    id: 'sp-002',
    title: '한미 양국, 반도체 공급망 협력 MOU…내달 세부 조문 공개',
    publisher: '연합뉴스',
    publishedAt: '2시간 전',
    thumbnailUrl: 'https://picsum.photos/seed/sp-002/300/300',
    category: 'economy',
  },
  {
    id: 'sp-003',
    title: '대통령실 "정상회담 성과, 곧 경제 부문 후속 조치로 구체화"',
    publisher: '연합뉴스',
    publishedAt: '3시간 전',
    thumbnailUrl: 'https://picsum.photos/seed/sp-003/300/300',
    category: 'politics',
  },
];

export interface RecommendHeadline {
  id: string;
  title: string;
}

export const RECOMMEND_HEADLINES: RecommendHeadline[] = [
  { id: 'rh-001', title: '"대북 인도적 지원, 국제기구 경유가 유력"…외교가 관측' },
  { id: 'rh-002', title: '한미 양국, 반도체 공급망 협력 MOU…내달 세부 조문 공개' },
  { id: 'rh-003', title: '美 상원의원단, 이달 말 방한…한미 정상회담 후속 논의' },
  { id: 'rh-004', title: '"트럼프 2기 외교, 예측 가능성 높아졌다" 전직 관료 분석' },
  { id: 'rh-005', title: '"공급망 재편으로 K-반도체 수혜"…증권가 코멘트' },
  { id: 'rh-006', title: '검찰, 김건희 구속기간 연장…기소 여부 이번 주 결판' },
  { id: 'rh-007', title: '"10·15 대책 후폭풍"…서울 아파트 거래 절반으로 뚝' },
  { id: 'rh-008', title: '코스피 3,480선 돌파…외국인 4거래일 연속 순매수' },
  { id: 'rh-009', title: '"아이폰 17 Pro 사전예약 첫날 50만대 돌파"…역대 최대 기록' },
  { id: 'rh-010', title: '"임영웅 전국투어 티켓 오픈 10분 만에 매진"…대전서 시작' },
];

export const INTEREST_ARTICLES: NewsArticle[] = [
  {
    id: 'ia-001',
    title: '"美 상원의원단, 이달 말 방한"…한미 정상회담 후속 논의',
    publisher: 'KBS뉴스',
    publishedAt: '45분 전',
    thumbnailUrl: 'https://picsum.photos/seed/ia-001/300/300',
    category: 'politics',
  },
  {
    id: 'ia-002',
    title: '"공급망 재편으로 K-반도체 수혜"…증권가 코멘트',
    publisher: '머니투데이',
    publishedAt: '1시간 전',
    thumbnailUrl: 'https://picsum.photos/seed/ia-002/300/300',
    category: 'economy',
  },
  {
    id: 'ia-003',
    title: '"트럼프 2기 외교, 예측 가능성 높아졌다" 전직 관료 분석',
    publisher: '한겨레',
    publishedAt: '2시간 전',
    thumbnailUrl: 'https://picsum.photos/seed/ia-003/300/300',
    category: 'politics',
  },
  {
    id: 'ia-004',
    title: '방한하는 美 의원단 명단에 "한반도 전문가" 다수 포함',
    publisher: '뉴시스',
    publishedAt: '2시간 전',
    thumbnailUrl: 'https://picsum.photos/seed/ia-004/300/300',
    category: 'politics',
  },
];

export type RankingTab = 'mostViewed' | 'mostRead';

export const PUBLISHER_RANKING: Record<
  RankingTab,
  { id: string; rank: number; title: string; publisher: string }[]
> = {
  mostViewed: [
    { id: 'rk-m1', rank: 1, title: '코스피 3,480선 돌파…외국인 4거래일 연속 순매수', publisher: 'SBS Biz' },
    { id: 'rk-m2', rank: 2, title: '아이폰 17 Pro 사전예약 50만대 돌파…역대 최대 기록', publisher: 'IT조선' },
    { id: 'rk-m3', rank: 3, title: '"10·15 대책 후폭풍"…서울 아파트 거래 절반으로 뚝', publisher: 'MBN' },
    { id: 'rk-m4', rank: 4, title: '삼성전자 52주 신고가 경신…외국인 4천억 순매수', publisher: 'SBS뉴스' },
    { id: 'rk-m5', rank: 5, title: '검찰, 김건희 구속기간 연장…기소 여부 이번 주 결판', publisher: '한겨레' },
  ],
  mostRead: [
    { id: 'rk-r1', rank: 1, title: '"은퇴 후 월 250만원 생활비 필요"…국민연금만으론 60% 부족', publisher: '한국경제' },
    { id: 'rk-r2', rank: 2, title: '"혼자 사는 1인 가구 전월세 세액공제 확대"…최대 연 150만원 환급', publisher: '머니투데이' },
    { id: 'rk-r3', rank: 3, title: '"배달 라이더 산재보험 의무화"…11월부터 플랫폼 부담분 확정', publisher: '뉴시스' },
    { id: 'rk-r4', rank: 4, title: '대체공휴일 확대 논의…내년 설·추석 끼인 주말 "연휴 닷새" 가능성', publisher: '연합뉴스' },
    { id: 'rk-r5', rank: 5, title: '"내년 최저임금 10,360원 확정"…주휴수당 포함 시 실수령 월 233만원', publisher: '경향신문' },
  ],
};
