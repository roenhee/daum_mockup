import type { Trend } from '@/types';

export const REALTIME_TRENDS: Trend[] = [
  { rank: 1, keyword: '이재명 방미', status: 'new' },
  { rank: 2, keyword: '한미 정상회담', status: 'up', change: 3 },
  { rank: 3, keyword: '코스피 3400선', status: 'up', change: 1 },
  { rank: 4, keyword: '김문수', status: 'same' },
  { rank: 5, keyword: '수도권 전세대란', status: 'up', change: 2 },
  { rank: 6, keyword: '10·15 부동산 대책', status: 'down', change: 1 },
  { rank: 7, keyword: '트럼프 관세', status: 'new' },
  { rank: 8, keyword: '영남대 치주염', status: 'same' },
  { rank: 9, keyword: '임영웅 콘서트', status: 'up', change: 4 },
  { rank: 10, keyword: '삼성전자 52주 신고가', status: 'new' },
];
