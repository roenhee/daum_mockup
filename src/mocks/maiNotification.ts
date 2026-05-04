// 알림 페이지 모의 데이터.
// 칩 카테고리별로 알림이 흩어져 있고, 일자별 그룹으로 묶어 노출한다.

export type NotificationCategory =
  | 'news'
  | 'mail'
  | 'cafe'
  | 'community'
  | 'table'
  | 'subscribe'
  | 'benefit'
  | 'life';

export const NOTIFICATION_CATEGORIES: { id: NotificationCategory; label: string }[] = [
  { id: 'news', label: '새소식' },
  { id: 'mail', label: '메일' },
  { id: 'cafe', label: '카페' },
  { id: 'community', label: '커뮤니티' },
  { id: 'table', label: '테이블' },
  { id: 'subscribe', label: '구독 채널' },
  { id: 'benefit', label: '혜택플러스' },
  { id: 'life', label: '생활 정보' },
];

export interface NotificationItem {
  id: string;
  category: NotificationCategory;
  avatarUrl: string;
  title: string;
  time: string;
  body: string;
}

export interface NotificationGroup {
  dateLabel: string;
  items: NotificationItem[];
}

const dicebear = (seed: string) =>
  `https://api.dicebear.com/7.x/shapes/svg?seed=${encodeURIComponent(seed)}&backgroundColor=ffd5dc,c0aede,b6e3f4,d1f4d9,fde2b3,ffdfbf`;

export const NOTIFICATION_GROUPS: NotificationGroup[] = [
  {
    dateLabel: '오늘',
    items: [
      {
        id: 'n-t-1',
        category: 'subscribe',
        avatarUrl: dicebear('hankyung'),
        title: 'HBM 수요 폭증에 SK하이닉스 사상 최대 분기 실적',
        time: '5분 전',
        body: '영업이익이 시장 컨센서스를 30% 상회했어요. 외국인 매수세도 사흘째 이어지며 강세입니다.',
      },
      {
        id: 'n-t-2',
        category: 'mail',
        avatarUrl: dicebear('mail-promo'),
        title: '5월 멤버십 혜택 안내드려요',
        time: '12분 전',
        body: '김다음 매니저 외 1명에게서 새 메일이 왔어요. 첨부 파일 1개를 함께 확인해 주세요.',
      },
      {
        id: 'n-t-3',
        category: 'community',
        avatarUrl: dicebear('community-walk'),
        title: '주말에 같이 가실 분~',
        time: '34분 전',
        body: '회원님 글에 새 댓글 12개가 달렸어요. 동네산책 모임에서 인기 폭발 중인 글이에요!',
      },
      {
        id: 'n-t-4',
        category: 'news',
        avatarUrl: dicebear('news-flash'),
        title: '"이란-이스라엘 휴전 임박" 외신 보도…유가 즉각 하락',
        time: '1시간 전',
        body: '주요 종합지 1면 톱으로 다뤄지고 있어요. 시장은 휴전 시나리오에 빠르게 반응 중입니다.',
      },
      {
        id: 'n-t-5',
        category: 'benefit',
        avatarUrl: dicebear('benefit-coffee'),
        title: '메가커피 아메리카노 1+1 쿠폰 도착',
        time: '2시간 전',
        body: '오늘만 사용 가능한 혜택! 자정까지 발급 가능하며 가까운 매장에서 바로 쓸 수 있어요.',
      },
      {
        id: 'n-t-6',
        category: 'cafe',
        avatarUrl: dicebear('cafe-baking'),
        title: '이번 주 일요일 오프라인 클래스 신청 받아요',
        time: '3시간 전',
        body: '베이킹 클래스 카페지기가 새 글을 올렸어요. 인원이 빠르게 마감되니 서둘러 주세요.',
      },
    ],
  },
  {
    dateLabel: '어제',
    items: [
      {
        id: 'n-y-1',
        category: 'table',
        avatarUrl: dicebear('table-budget'),
        title: '5월 가계부에 자동 항목 4개 추가됨',
        time: '어제 22:14',
        body: '카드사 연동을 통해 새 거래가 자동으로 반영됐어요. 카테고리 분류 확인이 필요합니다.',
      },
      {
        id: 'n-y-2',
        category: 'subscribe',
        avatarUrl: dicebear('yonhap'),
        title: '핵협상 7차 라운드…호르무즈 해협 긴장 고조',
        time: '어제 18:02',
        body: '외교부 "예의주시 중" 입장 발표. 국제 유가 변동성 확대 가능성도 거론되고 있어요.',
      },
      {
        id: 'n-y-3',
        category: 'life',
        avatarUrl: dicebear('life-weather'),
        title: '오늘 서울 미세먼지 "나쁨" 예보',
        time: '어제 09:00',
        body: '외출 시 마스크 착용을 권장해요. 시간대별 예보는 알림에서 바로 확인할 수 있습니다.',
      },
      {
        id: 'n-y-4',
        category: 'mail',
        avatarUrl: dicebear('mail-payslip'),
        title: '4월 급여명세서가 도착했어요',
        time: '어제 08:00',
        body: '인사팀에게서 새 메일이 왔어요. 첨부 파일 1개를 PDF로 함께 확인해 주세요.',
      },
      {
        id: 'n-y-5',
        category: 'community',
        avatarUrl: dicebear('community-running'),
        title: '오늘 새벽 6시 정기 모임 알림',
        time: '어제 07:42',
        body: '한강 러닝 클럽 출석 체크가 마감되면 다음 주 모임 신청이 자동으로 열려요.',
      },
    ],
  },
  {
    dateLabel: '5월 2일 토요일',
    items: [
      {
        id: 'n-s-1',
        category: 'news',
        avatarUrl: dicebear('news-sport'),
        title: '"손흥민 시즌 23호골" 토트넘, 첼시에 3-1 완승',
        time: '5월 2일 23:50',
        body: '시즌 막판 3연승으로 4위 굳히기. 다음 경기에서도 골 행진이 이어질지 주목됩니다.',
      },
      {
        id: 'n-s-2',
        category: 'benefit',
        avatarUrl: dicebear('benefit-shopping'),
        title: '주말 한정 5천원 할인 쿠폰 도착',
        time: '5월 2일 14:25',
        body: '다음 쇼핑에서 5만 원 이상 결제 시 카테고리 제한 없이 사용 가능합니다.',
      },
      {
        id: 'n-s-3',
        category: 'cafe',
        avatarUrl: dicebear('cafe-travel'),
        title: '6월 입주 가능한 게스트하우스 후기 정리해요',
        time: '5월 2일 10:11',
        body: '제주 한 달 살기 카페에서 인기글로 올라왔어요. 함께 후기 보러가요.',
      },
      {
        id: 'n-s-4',
        category: 'subscribe',
        avatarUrl: dicebear('travel-notes'),
        title: '여름 휴가지 BEST 5, 데이터로 본 인기 코스',
        time: '5월 2일 08:30',
        body: '여행자의 노트가 새 글을 올렸어요. 항공권 가격 추이와 숙박 통계까지 비교했어요.',
      },
    ],
  },
  {
    dateLabel: '5월 1일 금요일',
    items: [
      {
        id: 'n-f-1',
        category: 'table',
        avatarUrl: dicebear('table-todo'),
        title: '이번 주 할 일 마감 임박 3건',
        time: '5월 1일 21:00',
        body: '테이블에 마감 임박 항목 3건이 있어요. 일요일까지 처리하면 좋아요.',
      },
      {
        id: 'n-f-2',
        category: 'life',
        avatarUrl: dicebear('life-traffic'),
        title: '근로자의 날 한강공원 인파, 강변북로 정체',
        time: '5월 1일 17:42',
        body: '우회 경로 안내를 확인하세요. 실시간 교통 상황도 함께 제공되고 있어요.',
      },
      {
        id: 'n-f-3',
        category: 'community',
        avatarUrl: dicebear('community-photo'),
        title: '회원님 사진이 좋아요 48개를 받았어요',
        time: '5월 1일 12:18',
        body: '사진 동호회 댓글에서 카메라 설정 문의가 이어지고 있어요.',
      },
    ],
  },
];
