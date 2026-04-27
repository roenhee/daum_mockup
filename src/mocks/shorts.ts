export interface ShortItem {
  id: string;
  title: string;
  author: string;
  thumbnailUrl: string;
  viewCount: number;
}

// Topic-aligned with today's real Daum headlines (2026-04-27).
export const HOME_SHORTS: ShortItem[] = [
  {
    id: 'sh-001',
    title: 'QWER 세레모니 쇼케이스 1분 요약',
    author: '엠넷K팝',
    thumbnailUrl: '/mock-images/news/20260427115841592.jpg',
    viewCount: 64200,
  },
  {
    id: 'sh-002',
    title: '손흥민 LAFC 어시스트 하이라이트',
    author: 'ESPN KOREA',
    thumbnailUrl: '/mock-images/news/20260427093101444.jpg',
    viewCount: 213400,
  },
  {
    id: 'sh-003',
    title: '이정후 4안타·오타니 시즌 첫 3안타 보기',
    author: '베이스볼위클리',
    thumbnailUrl: '/mock-images/news/20260427082408884.jpg',
    viewCount: 98700,
  },
  {
    id: 'sh-004',
    title: '박보영, 골드랜드 비하인드 컷',
    author: 'OTT인사이트',
    thumbnailUrl: '/mock-images/news/20260427112617698.jpg',
    viewCount: 142800,
  },
  {
    id: 'sh-005',
    title: '첼시 FA컵 결승 진출 골 모음',
    author: '풋볼리스트',
    thumbnailUrl: '/mock-images/news/20260427102750457.jpg',
    viewCount: 78400,
  },
  {
    id: 'sh-006',
    title: '윤이나 LPGA 메이저 4위 베스트 샷',
    author: '골프뉴스코리아',
    thumbnailUrl: '/mock-images/news/20260427082015786.jpg',
    viewCount: 35100,
  },
];
