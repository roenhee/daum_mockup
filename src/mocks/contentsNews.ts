import type { NewsArticle } from '@/types';

export interface Headline {
  id: string;
  title: string;
  publisher: string;
  publishedAt: string;
}

export const MAJOR_HEADLINES: Headline[] = [
  {
    id: 'mh-001',
    title: '이재명·트럼프, 백악관 회담…"대북 수천만 弗 규모 접근" 제안',
    publisher: '연합뉴스',
    publishedAt: '11분 전',
  },
  {
    id: 'mh-002',
    title: '검찰, 김건희 구속기간 연장…기소 여부 이번 주 결판',
    publisher: '한겨레',
    publishedAt: '28분 전',
  },
  {
    id: 'mh-003',
    title: '코스피 3,480선 돌파…외국인 4거래일 연속 순매수',
    publisher: 'SBS Biz',
    publishedAt: '41분 전',
  },
  {
    id: 'mh-004',
    title: '"10·15 대책 후폭풍"…서울 아파트 거래 절반으로 뚝',
    publisher: 'MBN',
    publishedAt: '1시간 전',
  },
  {
    id: 'mh-005',
    title: '아이폰 17 Pro 사전예약 50만대 돌파…역대 최대 기록',
    publisher: 'IT조선',
    publishedAt: '1시간 전',
  },
];

export const RECOMMEND_NEWS: Headline[] = [
  {
    id: 'rc-001',
    title: '"결혼 준비하다 파혼"…MZ세대 이별 사유 1위는 예식장 vs 혼수',
    publisher: '헤럴드경제',
    publishedAt: '13분 전',
  },
  {
    id: 'rc-002',
    title: '"중고차 시세 2개월째 하락"…전기차 역대 최저 낙찰가 경신',
    publisher: '이데일리',
    publishedAt: '32분 전',
  },
  {
    id: 'rc-003',
    title: '"챗GPT 접속 장애"…전 세계 동시다발, OpenAI "조사 중"',
    publisher: '지디넷코리아',
    publishedAt: '45분 전',
  },
  {
    id: 'rc-004',
    title: '"배달앱 수수료 상한제 추진"…가맹점주들 "환영" vs 업계 "반발"',
    publisher: '뉴시스',
    publishedAt: '1시간 전',
  },
  {
    id: 'rc-005',
    title: '한파주의보 발효, 내일 출근길 영하 5도…올가을 들어 최저',
    publisher: 'YTN',
    publishedAt: '2시간 전',
  },
];

export const PHOTO_NEWS: NewsArticle[] = [
  {
    id: 'pn-001',
    title: '경복궁 야간개장 오픈 직후 서버 마비…예매 사이트 3시간 지연',
    publisher: '뉴스1',
    publishedAt: '38분 전',
    thumbnailUrl: 'https://picsum.photos/seed/pn-001/400/400',
    category: 'life',
  },
  {
    id: 'pn-002',
    title: '임영웅 전국투어 1차 티켓 오픈 10분 만에 전석 매진',
    publisher: '스포츠동아',
    publishedAt: '52분 전',
    thumbnailUrl: 'https://picsum.photos/seed/pn-002/400/400',
    category: 'entertain',
  },
  {
    id: 'pn-003',
    title: '손흥민, EPL 통산 125호골…토트넘 2-0 승리 견인',
    publisher: 'YTN',
    publishedAt: '1시간 전',
    thumbnailUrl: 'https://picsum.photos/seed/pn-003/400/400',
    category: 'sports',
  },
  {
    id: 'pn-004',
    title: '삼성전자 52주 신고가 경신…외국인 4천억 순매수',
    publisher: 'SBS뉴스',
    publishedAt: '1시간 전',
    thumbnailUrl: 'https://picsum.photos/seed/pn-004/400/400',
    category: 'economy',
  },
  {
    id: 'pn-005',
    title: '"김장 배추 역대 최고가"…포기당 1만 5천원 돌파',
    publisher: 'KBS뉴스',
    publishedAt: '2시간 전',
    thumbnailUrl: 'https://picsum.photos/seed/pn-005/400/400',
    category: 'life',
  },
  {
    id: 'pn-006',
    title: '수도권 일부 지역 전세대란 본격화…"매물 실종" 현상',
    publisher: 'JTBC',
    publishedAt: '3시간 전',
    thumbnailUrl: 'https://picsum.photos/seed/pn-006/400/400',
    category: 'economy',
  },
];

export const MOST_VIEWED_HEADLINES: Headline[] = [
  {
    id: 'mv-001',
    title: '"혼자 사는 1인 가구 전월세 세액공제 확대"…최대 연 150만원 환급',
    publisher: '머니투데이',
    publishedAt: '15분 전',
  },
  {
    id: 'mv-002',
    title: '대체공휴일 확대 논의…내년 설·추석 끼인 주말 "연휴 닷새" 가능성',
    publisher: '연합뉴스',
    publishedAt: '33분 전',
  },
  {
    id: 'mv-003',
    title: '"은퇴 후 월 250만원 생활비 필요"…국민연금만으론 60% 부족',
    publisher: '한국경제',
    publishedAt: '47분 전',
  },
  {
    id: 'mv-004',
    title: '수능 100일 앞두고 전국 학원가 "심야 교실" 확산…과외비도 치솟아',
    publisher: '중앙일보',
    publishedAt: '1시간 전',
  },
  {
    id: 'mv-005',
    title: '"배달 라이더 산재보험 의무화"…11월부터 플랫폼 부담분 확정',
    publisher: '뉴시스',
    publishedAt: '1시간 전',
  },
  {
    id: 'mv-006',
    title: '"내년 최저임금 10,360원 확정"…주휴수당 포함 시 실수령 월 233만원',
    publisher: '경향신문',
    publishedAt: '2시간 전',
  },
  {
    id: 'mv-007',
    title: '"국내 전기차 보조금 또 축소"…현대·기아 대비 수입차 인하폭 더 커',
    publisher: '오토헤럴드',
    publishedAt: '2시간 전',
  },
  {
    id: 'mv-008',
    title: '"탁구 신유빈, 세계랭킹 1위 등극"…한국 여자 탁구 12년 만에 정상',
    publisher: '스포츠서울',
    publishedAt: '3시간 전',
  },
];

export const LIVE_NEWS: NewsArticle[] = [
  {
    id: 'ln-001',
    title: 'YTN 뉴스특보 - 이재명·트럼프 백악관 공동 기자회견 생중계',
    publisher: 'YTN',
    publishedAt: '방금 시작',
    thumbnailUrl: 'https://picsum.photos/seed/ln-001/640/360',
    category: 'politics',
    viewCount: 12800,
  },
  {
    id: 'ln-002',
    title: 'SBS Biz - 코스피 마감 브리핑, 오늘의 섹터 분석',
    publisher: 'SBS Biz',
    publishedAt: '30분째 방송 중',
    thumbnailUrl: 'https://picsum.photos/seed/ln-002/640/360',
    category: 'economy',
    viewCount: 2400,
  },
];
