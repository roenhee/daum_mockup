import type { SubTab } from '@/components/ui/SubTabBar';

export interface MaiProfile {
  nickname: string;
  email: string;
  avatarUrl: string;
}

export interface MaiGateway {
  id: 'history' | 'subscribe' | 'community';
  label: string;
  newsLabel: string;
  count: number;
  to: string;
}

export const MAI_PROFILE: MaiProfile = {
  nickname: '행복한 다음이',
  email: 'happydaum@daum.net',
  avatarUrl:
    'https://api.dicebear.com/7.x/notionists/svg?seed=happydaum&backgroundColor=ffd5dc,c0aede,b6e3f4',
};

export const MAI_GATEWAYS: MaiGateway[] = [
  { id: 'history', label: '히스토리', newsLabel: '새 활동', count: 3, to: '/mai-history/recent' },
  { id: 'subscribe', label: '구독', newsLabel: '새 글', count: 12, to: '/mai-subscribe/channels' },
  { id: 'community', label: '커뮤니티', newsLabel: '새 댓글', count: 5, to: '/mai-sub/community' },
];

export const MAI_HISTORY_SUBTABS: SubTab[] = [
  { id: 'recent', label: '최근본', to: '/mai-history/recent' },
  { id: 'reaction', label: '반응', to: '/mai-history/reaction' },
  { id: 'comments', label: '댓글', to: '/mai-history/comments' },
  { id: 'saved', label: '찜', to: '/mai-history/saved' },
];

export const MAI_SUBSCRIBE_SUBTABS: SubTab[] = [
  { id: 'channels', label: '내 채널', to: '/mai-subscribe/channels' },
  { id: 'settings', label: '구독설정', to: '/mai-subscribe/settings' },
  { id: 'hidden', label: '숨김설정', to: '/mai-subscribe/hidden' },
];

export const MAI_SUB_PAGE_TITLES: Record<string, string> = {
  history: '히스토리',
  subscribe: '구독',
  community: '커뮤니티',
  notification: '알림',
  settings: '설정',
};

export const MAI_SUBTABS: SubTab[] = [
  { id: 'news', label: '새소식', to: '/mai/news' },
  { id: 'issue', label: '이슈노트', to: '/mai/issue' },
  { id: 'explore', label: 'AI 탐구', to: '/mai/explore' },
];

// 사용자가 등록한 키워드 (mock)
export const MAI_REGISTERED_KEYWORDS: string[] = [
  '이란 전쟁',
  '주가',
  '유가',
  '반도체',
  '상괭이',
  '아쿠아리움',
  '늑구',
];

// "+키워드" 추천 (mock)
export const MAI_KEYWORD_SUGGESTIONS: string[] = [
  'HBM',
  '코스피',
  '브렌트유',
  '환율',
  '오월드',
  '호르무즈 해협',
  '엔비디아',
  '핵협상',
];
