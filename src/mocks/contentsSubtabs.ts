import type { SubTab } from '@/components/ui/SubTabBar';

export const CONTENTS_SUBTABS: SubTab[] = [
  { id: 'news', label: '뉴스', to: '/contents/news', end: true },
  { id: 'press', label: '언론사', to: '/contents/press' },
  { id: 'live', label: '라이브', to: '/contents/live' },
  { id: 'sports', label: '스포츠', to: '/contents/sports' },
  { id: 'entertain', label: '연예', to: '/contents/entertain' },
  { id: 'shopping', label: '쇼핑', to: '/contents/shopping' },
  { id: 'money', label: '머니', to: '/contents/money' },
  { id: 'fun', label: 'FUN', to: '/contents/fun' },
  { id: 'homecook', label: '홈&쿠킹', to: '/contents/homecook' },
  { id: 'style', label: '스타일', to: '/contents/style' },
  { id: 'travel', label: '여행맛집', to: '/contents/travel' },
  { id: 'knowledge', label: '지식교양', to: '/contents/knowledge' },
  { id: 'car', label: '자동차+', to: '/contents/car' },
  { id: 'animal', label: '동물', to: '/contents/animal' },
];
