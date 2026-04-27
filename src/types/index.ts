export type BottomTabId = 'home' | 'contents' | 'community' | 'shopping' | 'mai';

export type HeaderVariant = 'home' | 'contents' | 'community' | 'shopping' | 'mai' | 'loop';

export type TrendStatus = 'new' | 'up' | 'down' | 'same';

export interface Trend {
  rank: number;
  keyword: string;
  status: TrendStatus;
  change?: number;
}

export type NewsCategory =
  | 'media'
  | 'entertain'
  | 'sports'
  | 'economy'
  | 'it'
  | 'life'
  | 'politics'
  | 'world';

export type FeedSourceType = 'publisher' | 'channel';

export interface ContentArticle {
  id: string;
  title: string;
  summary?: string;
  publisher: string;
  publisherLogoSeed: string;
  thumbnailSeed: string;
  thumbnailUrl?: string;
  elapsed: string;
  commentCount?: number;
}

export interface NewsArticle {
  id: string;
  title: string;
  publisher: string;
  publisherLogoUrl?: string;
  publishedAt: string;
  thumbnailUrl: string;
  category: NewsCategory;
  summary?: string;
  content?: string;
  viewCount?: number;
  commentCount?: number;
  sourceType?: FeedSourceType;
  channelAuthor?: string;
  channelAvatarUrl?: string;
}

export interface Publisher {
  id: string;
  name: string;
  logoUrl: string;
  subscribed?: boolean;
}

export interface Stock {
  code: string;
  name: string;
  price: number;
  change: number;
  changeRate: number;
}

export interface Weather {
  region: string;
  tempC: number;
  condition: 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'partly';
  airQuality: '좋음' | '보통' | '나쁨' | '매우나쁨';
  dustLevel: '좋음' | '보통' | '나쁨' | '매우나쁨';
}

export interface LiveContent {
  id: string;
  title: string;
  channelName: string;
  thumbnailUrl: string;
  viewerCount: number;
  category: string;
}

export interface CommunityPost {
  id: string;
  author: { name: string; avatarUrl: string };
  category: string;
  createdAt: string;
  content: string;
  tags: string[];
  media?: { type: 'image' | 'video' | 'link'; url: string; title?: string }[];
  likes: number;
  comments: number;
}
