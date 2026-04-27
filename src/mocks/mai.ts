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
  { id: 'history', label: '히스토리', newsLabel: '새 활동', count: 3, to: '/mai-sub/history' },
  { id: 'subscribe', label: '구독', newsLabel: '새 글', count: 12, to: '/mai-sub/subscribe' },
  { id: 'community', label: '커뮤니티', newsLabel: '새 댓글', count: 5, to: '/mai-sub/community' },
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
