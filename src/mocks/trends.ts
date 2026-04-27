import type { Trend } from '@/types';

// 실제 m.daum.net 실시간 트렌드 (2026-04-27 12:40 기준).
// 사내 목업 전용. 키워드는 일자에 따라 자연스럽게 갱신.
export const REALTIME_TRENDS: Trend[] = [
  { rank: 1, keyword: '고유가 피해지원금', status: 'new' },
  { rank: 2, keyword: '박보영 골드랜드', status: 'up', change: 3 },
  { rank: 3, keyword: '공정위 약관 시정', status: 'up', change: 1 },
  { rank: 4, keyword: '하정우 부산 북갑', status: 'new' },
  { rank: 5, keyword: '금감원 임원보수', status: 'same' },
  { rank: 6, keyword: '국세청 339억 환수', status: 'down', change: 1 },
  { rank: 7, keyword: '김부겸 대구로페이', status: 'up', change: 2 },
  { rank: 8, keyword: 'QWER 세레모니', status: 'up', change: 4 },
  { rank: 9, keyword: '경남 도민생활지원금', status: 'same' },
  { rank: 10, keyword: '송미령 기자간담회', status: 'new' },
];
