import type { CommunityPost } from '@/types';

export const HOT_COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 'c-001',
    author: { name: '신선함빵', avatarUrl: 'https://picsum.photos/seed/c-001-av/80/80' },
    category: '교육',
    createdAt: '21분 전',
    content: '집에서 영어로 최소 5천이상 아웃풋 어디에서 그리고 문법 공부는 김재원 매력에 빠져보세요…',
    tags: ['#교육'],
    likes: 124,
    comments: 38,
  },
  {
    id: 'c-002',
    author: { name: '유미의세포', avatarUrl: 'https://picsum.photos/seed/c-002-av/80/80' },
    category: '연예',
    createdAt: '34분 전',
    content: "유미의 세포들 시즌2가 시작되었다! 문박님은 김재원 매력에 빠져보세요…",
    tags: ['#연예'],
    likes: 88,
    comments: 21,
  },
  {
    id: 'c-003',
    author: { name: '여행스타그램', avatarUrl: 'https://picsum.photos/seed/c-003-av/80/80' },
    category: '여행',
    createdAt: '1시간 전',
    content: '항성휴양지협정이 2026년도 오픈기념으로 이번주 일요일 4월 26일까지 지금 50%할인쿠폰 전행 보급…',
    tags: ['#여행'],
    likes: 211,
    comments: 42,
  },
];

export const HOT_NEWS_POSTS: CommunityPost[] = [
  {
    id: 'cn-001',
    author: { name: '둥둥', avatarUrl: 'https://picsum.photos/seed/cn-001-av/80/80' },
    category: '',
    createdAt: '9분 전',
    content: '대학생 안동하세요이여자들 어머님께 !!!!!!!!!! 등등등…',
    tags: [],
    likes: 67,
    comments: 14,
  },
  {
    id: 'cn-002',
    author: { name: '버게멜아린어', avatarUrl: 'https://picsum.photos/seed/cn-002-av/80/80' },
    category: '',
    createdAt: '12분 전',
    content: '내가 생각하는 화장실을 최고의 정리법은…',
    tags: [],
    likes: 45,
    comments: 9,
  },
  {
    id: 'cn-003',
    author: { name: '짬쟈', avatarUrl: 'https://picsum.photos/seed/cn-003-av/80/80' },
    category: '',
    createdAt: '18분 전',
    content: '자네스에서 산 모모그맨 버티믹 먹어몸 3500원에 누름…',
    tags: [],
    likes: 31,
    comments: 6,
  },
];
