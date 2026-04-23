export interface ShortItem {
  id: string;
  title: string;
  author: string;
  thumbnailUrl: string;
  viewCount: number;
}

export const HOME_SHORTS: ShortItem[] = [
  {
    id: 'sh-001',
    title: '30초에 보는 오늘의 증시 요약',
    author: '경제브리핑',
    thumbnailUrl: 'https://picsum.photos/seed/sh-001/300/500',
    viewCount: 24300,
  },
  {
    id: 'sh-002',
    title: '손흥민 역대 125호골 하이라이트',
    author: '스포츠샵',
    thumbnailUrl: 'https://picsum.photos/seed/sh-002/300/500',
    viewCount: 189000,
  },
  {
    id: 'sh-003',
    title: '아이폰 17 Pro 언박싱 첫인상',
    author: '테크메모',
    thumbnailUrl: 'https://picsum.photos/seed/sh-003/300/500',
    viewCount: 54800,
  },
  {
    id: 'sh-004',
    title: '김장 배추 값 왜 올랐을까',
    author: '데일리쿠킹',
    thumbnailUrl: 'https://picsum.photos/seed/sh-004/300/500',
    viewCount: 13200,
  },
  {
    id: 'sh-005',
    title: '경복궁 야간 산책 루트 3코스',
    author: '여행메모',
    thumbnailUrl: 'https://picsum.photos/seed/sh-005/300/500',
    viewCount: 38000,
  },
  {
    id: 'sh-006',
    title: '임영웅 콘서트 포토 모아보기',
    author: '팬매거진',
    thumbnailUrl: 'https://picsum.photos/seed/sh-006/300/500',
    viewCount: 142000,
  },
];
