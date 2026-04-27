import type { LiveContent } from '@/types';

// Topic aligned with 2026-04-27 real Daum headlines.
export const LIVE_CONTENTS: LiveContent[] = [
  {
    id: 'live-001',
    title: '하정우, 부산 북갑 출마설…청와대 사의 표명 현장 LIVE',
    channelName: '뉴스1',
    thumbnailUrl: '/mock-images/news/20260427121700424.jpg',
    viewerCount: 4120,
    category: '시사',
  },
  {
    id: 'live-002',
    title: '[LIVE] QWER 세리머니 미디어 쇼케이스',
    channelName: 'MBC연예',
    thumbnailUrl: '/mock-images/news/20260427115841592.jpg',
    viewerCount: 2860,
    category: 'K팝',
  },
];
