// 구독 채널 모의 데이터 — 언론사 채널형 + 일반 채널형
// 썸네일은 다른 탭에서 사용 중인 /mock-images/news/* 를 그대로 재활용한다.

export type ChannelType = 'press' | 'general';

interface ChannelBase {
  id: string;
  type: ChannelType;
  name: string;
  avatarUrl: string;
  lastUpdate: string;
}

export interface PressChannel extends ChannelBase {
  type: 'press';
  link: string;
  textHeadlines: { id: string; title: string }[];
  gridArticles: { id: string; title: string; thumbnailUrl: string }[];
}

export interface GeneralChannel extends ChannelBase {
  type: 'general';
  latest: { id: string; title: string; thumbnailUrl: string };
}

export type SubscribeChannel = PressChannel | GeneralChannel;

const dicebear = (seed: string) =>
  `https://api.dicebear.com/7.x/shapes/svg?seed=${encodeURIComponent(seed)}&backgroundColor=ffd5dc,c0aede,b6e3f4,d1f4d9,fde2b3,ffdfbf`;

export const SUBSCRIBE_CHANNELS: SubscribeChannel[] = [
  {
    id: 'g-1',
    type: 'general',
    name: '데일리 IT 인사이트',
    avatarUrl: dicebear('daily-it'),
    lastUpdate: '5분 전',
    latest: {
      id: 'g-1-l',
      title: '아이폰 18 시리즈 출시 임박, 라인업 정리 한 번에 보기',
      thumbnailUrl: '/mock-images/news/20260427002729487.jpg',
    },
  },
  {
    id: 'p-1',
    type: 'press',
    name: '한국경제',
    avatarUrl: dicebear('hankyung'),
    lastUpdate: '12분 전',
    link: '/channel/hankyung',
    textHeadlines: [
      { id: 'p-1-h1', title: 'HBM 수요 폭증에 SK하이닉스 사상 최대 분기 실적' },
      { id: 'p-1-h2', title: '"AI가 추천한 종목, 한 달 수익률 18%" 화제' },
      { id: 'p-1-h3', title: '코스피 2900선 회복…개인 1조 매수 우위' },
    ],
    gridArticles: [
      {
        id: 'p-1-g1',
        title: '엔비디아 차세대 GPU 양산 임박, HBM4 수혜주는?',
        thumbnailUrl: '/mock-images/news/20260427082408884.jpg',
      },
      {
        id: 'p-1-g2',
        title: '반도체 슈퍼사이클, 3년 만에 다시 온다',
        thumbnailUrl: '/mock-images/news/20260427013335958.jpg',
      },
    ],
  },
  {
    id: 'g-2',
    type: 'general',
    name: '강남 맛집 탐방',
    avatarUrl: dicebear('gangnam-eats'),
    lastUpdate: '34분 전',
    latest: {
      id: 'g-2-l',
      title: '성수동 신상 베이커리 BEST 5, 줄 안 서고 가는 법',
      thumbnailUrl: '/mock-images/news/20260427061101746.jpg',
    },
  },
  {
    id: 'g-3',
    type: 'general',
    name: '코스피 단타 클럽',
    avatarUrl: dicebear('kospi-club'),
    lastUpdate: '2시간 전',
    latest: {
      id: 'g-3-l',
      title: '코스피 사상 최고치 경신, 삼성전자 6% 급등 배경 정리',
      thumbnailUrl: '/mock-images/news/20260427120151780.jpg',
    },
  },
  {
    id: 'p-2',
    type: 'press',
    name: '연합뉴스',
    avatarUrl: dicebear('yonhap'),
    lastUpdate: '3시간 전',
    link: '/channel/yonhap',
    textHeadlines: [
      { id: 'p-2-h1', title: '"이란-이스라엘 휴전 임박" 외신 보도…유가 즉각 하락' },
      { id: 'p-2-h2', title: '핵협상 7차 라운드…호르무즈 해협 긴장 고조' },
      { id: 'p-2-h3', title: '4월 폭염, 평년보다 3.2도 높았다…기상청 분석' },
    ],
    gridArticles: [
      {
        id: 'p-2-g1',
        title: '대법, "주 52시간 위반 사용자 처벌 정당" 확정',
        thumbnailUrl: '/mock-images/news/20260427004502651.jpg',
      },
      {
        id: 'p-2-g2',
        title: '근로자의 날 한강공원 인파 "날씨 좋아 가족 단위"',
        thumbnailUrl: '/mock-images/news/20260427020308039.jpg',
      },
    ],
  },
  {
    id: 'g-4',
    type: 'general',
    name: '오월드 친구들',
    avatarUrl: dicebear('owl-zoo'),
    lastUpdate: '어제',
    latest: {
      id: 'g-4-l',
      title: '오월드 늑구 가족, 첫 야외 방사 영상 공개',
      thumbnailUrl: '/mock-images/news/20260427121940473.jpg',
    },
  },
  {
    id: 'g-5',
    type: 'general',
    name: '여행자의 노트',
    avatarUrl: dicebear('travel-notes'),
    lastUpdate: '5월 2일',
    latest: {
      id: 'g-5-l',
      title: '여름 휴가지 BEST 5, 데이터로 본 인기 코스 한눈에',
      thumbnailUrl: '/mock-images/news/20260427013335958.jpg',
    },
  },
];

export type NotificationMode = 'all' | 'custom' | 'off';

export const NOTIFICATION_OPTIONS: { id: NotificationMode; label: string; desc: string }[] = [
  { id: 'all', label: '전체알림', desc: '새 글이 올라오면 모두 알려드려요' },
  { id: 'custom', label: '맞춤 알림', desc: '관심사로 추정되는 글만 알려드려요' },
  { id: 'off', label: '알림 없음', desc: '구독은 유지하지만 알림은 받지 않아요' },
];

// 구독 설정 화면의 알림 드롭다운 모드 (전체알림/알림없음/구독취소)
export type SettingsNotificationMode = 'all' | 'off';

export const SETTINGS_NOTIFICATION_LABEL: Record<SettingsNotificationMode, string> = {
  all: '알림',
  off: '알림 없음',
};

// 추천 언론사 카테고리
export const RECOMMEND_CATEGORIES: { id: string; label: string }[] = [
  { id: 'all', label: '전체' },
  { id: 'general', label: '시사 종합' },
  { id: 'economy', label: '경제' },
  { id: 'online', label: '온라인' },
  { id: 'entertain', label: '연예' },
  { id: 'money', label: '머니' },
  { id: 'tech', label: 'IT/테크' },
  { id: 'sports', label: '스포츠' },
];

export interface RecommendPress {
  id: string;
  name: string;
  avatarUrl: string;
  category: string;
}

export const RECOMMEND_PRESS_CHANNELS: RecommendPress[] = [
  { id: 'r-1', name: '조선일보', avatarUrl: dicebear('chosun'), category: 'general' },
  { id: 'r-2', name: '중앙일보', avatarUrl: dicebear('joongang'), category: 'general' },
  { id: 'r-3', name: '한겨레', avatarUrl: dicebear('hani'), category: 'general' },
  { id: 'r-4', name: '경향신문', avatarUrl: dicebear('khan'), category: 'general' },
  { id: 'r-5', name: '매일경제', avatarUrl: dicebear('mk'), category: 'economy' },
  { id: 'r-6', name: '서울경제', avatarUrl: dicebear('sedaily'), category: 'economy' },
  { id: 'r-7', name: '파이낸셜뉴스', avatarUrl: dicebear('fnnews'), category: 'economy' },
  { id: 'r-8', name: '머니투데이', avatarUrl: dicebear('mt'), category: 'money' },
  { id: 'r-9', name: '이데일리', avatarUrl: dicebear('edaily'), category: 'money' },
  { id: 'r-10', name: '코인데스크코리아', avatarUrl: dicebear('coindesk'), category: 'money' },
  { id: 'r-11', name: '오마이뉴스', avatarUrl: dicebear('ohmynews'), category: 'online' },
  { id: 'r-12', name: '뉴스1', avatarUrl: dicebear('news1'), category: 'online' },
  { id: 'r-13', name: '디스패치', avatarUrl: dicebear('dispatch'), category: 'entertain' },
  { id: 'r-14', name: 'OSEN', avatarUrl: dicebear('osen'), category: 'entertain' },
  { id: 'r-15', name: '엠넷K팝', avatarUrl: dicebear('mnet'), category: 'entertain' },
  { id: 'r-16', name: '디지털타임스', avatarUrl: dicebear('dt'), category: 'tech' },
  { id: 'r-17', name: 'IT조선', avatarUrl: dicebear('itchosun'), category: 'tech' },
  { id: 'r-18', name: 'SPOTV', avatarUrl: dicebear('spotv'), category: 'sports' },
  { id: 'r-19', name: '골프뉴스코리아', avatarUrl: dicebear('golfnews'), category: 'sports' },
];
