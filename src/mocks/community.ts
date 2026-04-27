import type { CommunityPost } from '@/types';

// Topic-aligned with today's Daum headlines (2026-04-27).
export const HOT_COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 'c-001',
    author: { name: '디플남', avatarUrl: 'https://picsum.photos/seed/c-001-av/80/80' },
    category: '연예',
    createdAt: '21분 전',
    content: '디즈니+ 골드랜드 1500억원 금괴 설정… 박보영 메이크업 덜어낸 컷이 너무 좋아서 본방 사수 예약했음',
    tags: ['#골드랜드', '#박보영', '#디즈니플러스'],
    likes: 312,
    comments: 88,
  },
  {
    id: 'c-002',
    author: { name: '손케이', avatarUrl: 'https://picsum.photos/seed/c-002-av/80/80' },
    category: '스포츠',
    createdAt: '34분 전',
    content: 'LAFC 주장이 손흥민 대놓고 칭찬한 인터뷰 봤는데 진짜 이 정도면 캡틴 깜냥… MLS 가서도 잘하는 듯',
    tags: ['#손흥민', '#LAFC', '#MLS'],
    likes: 521,
    comments: 142,
  },
  {
    id: 'c-003',
    author: { name: '큐어', avatarUrl: 'https://picsum.photos/seed/c-003-av/80/80' },
    category: '음악',
    createdAt: '1시간 전',
    content: 'QWER 세레모니 쇼케이스 다녀온 후기… 챕터2부터 본격 정체성 찾는다는 말이 진짜 와닿더라',
    tags: ['#QWER', '#세레모니', '#쇼케이스'],
    likes: 188,
    comments: 47,
  },
];

export const HOT_NEWS_POSTS: CommunityPost[] = [
  {
    id: 'cn-001',
    author: { name: '주유걱정', avatarUrl: 'https://picsum.photos/seed/cn-001-av/80/80' },
    category: '',
    createdAt: '9분 전',
    content: '고유가 피해지원금 1차 신청 시작됐는데 출생연도 끝자리 요일제라 헷갈림 정리해봄',
    tags: [],
    likes: 224,
    comments: 56,
  },
  {
    id: 'cn-002',
    author: { name: '대구살이', avatarUrl: 'https://picsum.photos/seed/cn-002-av/80/80' },
    category: '',
    createdAt: '12분 전',
    content: '김부겸 대구로페이 6천억 확대 공약… 실제로 받는 입장에선 추가 충전 한도 어떻게 될지 정리',
    tags: [],
    likes: 145,
    comments: 41,
  },
  {
    id: 'cn-003',
    author: { name: '메이저리거', avatarUrl: 'https://picsum.photos/seed/cn-003-av/80/80' },
    category: '',
    createdAt: '18분 전',
    content: '송성문 빅리그 데뷔! 대주자로 첫 출장. 한국인 29번째 메이저리거 라인업 정리해본다',
    tags: [],
    likes: 198,
    comments: 33,
  },
];
