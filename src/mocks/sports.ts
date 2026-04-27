import { placeholderImg } from '@/lib/img';
import type { ContentArticle } from '@/types';
import type { ShortItem } from './shorts';


export interface SportCategory {
  id: string;
  label: string;
}

export const SPORT_CATEGORIES: SportCategory[] = [
  { id: 'main', label: '주요 경기' },
  { id: 'soccer', label: '축구' },
  { id: 'baseball', label: '야구' },
  { id: 'basketball', label: '농구' },
  { id: 'volleyball', label: '배구' },
  { id: 'golf', label: '골프' },
  { id: 'esports', label: 'e스포츠' },
  { id: 'ufc', label: '격투기' },
];

export type MatchStatus = 'live' | 'scheduled' | 'finished';

export interface MatchTeam {
  name: string;
  short: string;
  logoSeed: string;
  score?: number;
}

export interface MatchCard {
  id: string;
  league: string;
  status: MatchStatus;
  statusText: string;
  venue?: string;
  home: MatchTeam;
  away: MatchTeam;
  minute?: string;
}

export const SPORTS_MATCHES: MatchCard[] = [
  {
    id: 'm-01',
    league: 'EPL',
    status: 'live',
    statusText: '후반 28분',
    minute: "73'",
    venue: '토트넘 홋스퍼 스타디움',
    home: { name: '토트넘', short: 'TOT', logoSeed: 'tot', score: 2 },
    away: { name: '맨유', short: 'MUN', logoSeed: 'mun', score: 1 },
  },
  {
    id: 'm-02',
    league: 'KBO',
    status: 'live',
    statusText: '7회초',
    venue: '잠실야구장',
    home: { name: '두산', short: 'DOO', logoSeed: 'doo', score: 5 },
    away: { name: 'LG', short: 'LG', logoSeed: 'lgt', score: 6 },
  },
  {
    id: 'm-03',
    league: 'KBL',
    status: 'scheduled',
    statusText: '오늘 19:00',
    venue: '고양체육관',
    home: { name: '소노', short: 'SON', logoSeed: 'son' },
    away: { name: 'KCC', short: 'KCC', logoSeed: 'kcc' },
  },
  {
    id: 'm-04',
    league: 'LaLiga',
    status: 'finished',
    statusText: '종료',
    venue: '베르나베우',
    home: { name: '레알 마드리드', short: 'RMA', logoSeed: 'rma', score: 3 },
    away: { name: '바르셀로나', short: 'BAR', logoSeed: 'bar', score: 2 },
  },
  {
    id: 'm-05',
    league: 'MLB',
    status: 'scheduled',
    statusText: '내일 10:00',
    venue: '다저 스타디움',
    home: { name: 'LAD', short: 'LAD', logoSeed: 'lad' },
    away: { name: 'SF', short: 'SFG', logoSeed: 'sfg' },
  },
];

export const SPORTS_MAIN_HEADLINE: ContentArticle = {
  id: 'sh-main',
  title: "'와' 13억 허수봉, 12억 황택의 제치고 한국배구 역대 최고 연봉 찍었다…황승빈 6억+하승우 3억에 잔류 도장 [공식발표]",
  summary:
    '후반 28분 페널티 박스 안에서 완벽한 턴 슛으로 결승골을 터뜨리며 손흥민이 개인 통산 125골째를 기록했다. 현지 팬들은 "올 시즌 리더의 존재감을 다시 입증했다"며 찬사를 쏟아냈다.',
  publisher: "마이데일리",
  publisherLogoSeed: 'ytn',
  thumbnailSeed: 'sp-main-son',
  elapsed: "방금 전",
  commentCount: 482,
};

export const SPORTS_NEWS_GRID: ContentArticle[] = [
  {
    id: 'sg-01',
    title: "[오피셜] '현대캐피탈 잔류' 허수봉 파격 계약, 연봉 8억·옵션 5억 '역대 최고액'",
    publisher: "스타뉴스",
    publisherLogoSeed: 'sjo',
    thumbnailSeed: 'sp-g-01',
    elapsed: "방금 전",
    thumbnailUrl: "/mock-images/news/20260427000434993.jpg",
  },
  {
    id: 'sg-02',
    title: "KIA 그 우타 거포들 다 어디로 사라졌나… 깃발만 꽂으면 되는데, 인생의 기회 놓치나",
    publisher: "스포티비뉴스",
    publisherLogoSeed: 'osn',
    thumbnailSeed: 'sp-g-02',
    elapsed: "8분 전",
    thumbnailUrl: "/mock-images/news/20260427012107880.jpg",
  },
  {
    id: 'sg-03',
    title: "“인간의 심장이 아니다” 전율… 42.195㎞ 내내 100m 17초 주속으로 뛰었다고?",
    publisher: "세계일보",
    publisherLogoSeed: 'joa',
    thumbnailSeed: 'sp-g-03',
    elapsed: "13분 전",
    thumbnailUrl: "/mock-images/news/20260427013335958.jpg",
  },
  {
    id: 'sg-04',
    title: "41세 호날두 '체지방 7%' 비결…\"우유 대신 '이것' 마셔\"",
    publisher: "뉴시스",
    publisherLogoSeed: 'jpb',
    thumbnailSeed: 'sp-g-04',
    elapsed: "22분 전",
    thumbnailUrl: "/mock-images/news/20260427020308039.jpg",
  },
];

export const SPORTS_HEADLINES: ContentArticle[] = [
  {
    id: 'sh-01',
    title: "마라톤 ‘마의 2시간’ 벽 깼다… 케냐 사웨, 1시간 59분 30초",
    publisher: "동아일보",
    publisherLogoSeed: 'spot',
    thumbnailSeed: 'sp-h-01',
    elapsed: "방금 전",
    thumbnailUrl: "/mock-images/news/20260427043341365.jpg",
  },
  {
    id: 'sh-02',
    title: "'와 13억' FA 최대어 허수봉, 현대캐피탈 잔류…남자배구 역대 최고액 [공식발표]",
    publisher: "엑스포츠뉴스",
    publisherLogoSeed: 'spot',
    thumbnailSeed: 'sp-h-02',
    elapsed: "8분 전",
    thumbnailUrl: "/mock-images/news/20260427050229816.jpg",
  },
  {
    id: 'sh-03',
    title: "\"3만명 관중에 문체부 장관까지\"… 성공적으로 끝난 2026 T1 첫 홈그라운드[현장메모]",
    publisher: "스포츠한국",
    publisherLogoSeed: 'yna',
    thumbnailSeed: 'sp-h-03',
    elapsed: "13분 전",
    thumbnailUrl: "/mock-images/news/20260427063213037.jpg",
  },
  {
    id: 'sh-04',
    title: "SD 송성문, 대주자로 빅리그 데뷔…한국인 29번째 메이저리거",
    publisher: "뉴스1",
    publisherLogoSeed: 'xps',
    thumbnailSeed: 'sp-h-04',
    elapsed: "22분 전",
    thumbnailUrl: "/mock-images/news/20260427074808086.jpg",
  },
  {
    id: 'sh-05',
    title: "윤이나, LPGA 메이저에서 공동4위…코르다, 시즌 2승",
    publisher: "서울신문",
    publisherLogoSeed: 'chs',
    thumbnailSeed: 'sp-h-05',
    elapsed: "31분 전",
    thumbnailUrl: "/mock-images/news/20260427082015786.jpg",
  },
];

export const SPORTS_TEXT_NEWS: ContentArticle[] = [
  {
    id: 'st-01',
    title: "이정후 4안타 폭발한 날, 오타니는 시즌 첫 3안타...\"인내심 갖고 있다\"",
    publisher: "일간스포츠",
    publisherLogoSeed: 'yna',
    thumbnailSeed: 'st-01',
    elapsed: "방금 전",
  },
  {
    id: 'st-02',
    title: "역시 손흥민 찬사, 멈추지 않는 찬사...LA FC 주장 극찬 \"환상적, 리더이자 모두 사랑하는 선수\"",
    publisher: "스포츠조선",
    publisherLogoSeed: 'osn',
    thumbnailSeed: 'st-02',
    elapsed: "8분 전",
  },
  {
    id: 'st-03',
    title: "넬리 코다, 셰브론 챔피언십 2연패·세계랭킹 1위 복귀…윤이나, 메이저 개인 최고 공동 4위",
    publisher: "스포츠동아",
    publisherLogoSeed: 'spot',
    thumbnailSeed: 'st-03',
    elapsed: "13분 전",
  },
  {
    id: 'st-04',
    title: "‘엔소 결승골’ 첼시, 리즈 꺾고 4년 만에 FA컵 결승 진출... 맨시티와 우승 경쟁",
    publisher: "스포츠서울",
    publisherLogoSeed: 'mks',
    thumbnailSeed: 'st-04',
    elapsed: "22분 전",
  },
  {
    id: 'st-05',
    title: "박성한·최정 뜨겁다…SSG, 한화·롯데 6연전서 선두 탈환 노린다",
    publisher: "기호일보",
    publisherLogoSeed: 'inv',
    thumbnailSeed: 'st-05',
    elapsed: "31분 전",
  },
];

export const SPORTS_BOTTOM_HEADLINES: ContentArticle[] = [
  {
    id: 'sb-01',
    title: "KIA 그 우타 거포들 다 어디로 사라졌나… 깃발만 꽂으면 되는데, 인생의 기회 놓치나",
    publisher: "스포티비뉴스",
    publisherLogoSeed: 'ftl',
    thumbnailSeed: 'sb-01',
    elapsed: "방금 전",
    thumbnailUrl: "/mock-images/news/20260427012107880.jpg",
  },
  {
    id: 'sb-02',
    title: "“인간의 심장이 아니다” 전율… 42.195㎞ 내내 100m 17초 주속으로 뛰었다고?",
    publisher: "세계일보",
    publisherLogoSeed: 'gdg',
    thumbnailSeed: 'sb-02',
    elapsed: "8분 전",
    thumbnailUrl: "/mock-images/news/20260427013335958.jpg",
  },
  {
    id: 'sb-03',
    title: "41세 호날두 '체지방 7%' 비결…\"우유 대신 '이것' 마셔\"",
    publisher: "뉴시스",
    publisherLogoSeed: 'skk',
    thumbnailSeed: 'sb-03',
    elapsed: "13분 전",
    thumbnailUrl: "/mock-images/news/20260427020308039.jpg",
  },
];

export const SPORTS_EXTRA_THUMBS: ContentArticle[] = [
  {
    id: 'sx-01',
    title: "'와 13억' FA 최대어 허수봉, 현대캐피탈 잔류…남자배구 역대 최고액 [공식발표]",
    publisher: "엑스포츠뉴스",
    publisherLogoSeed: 'sjo',
    thumbnailSeed: 'sx-01',
    elapsed: "방금 전",
    thumbnailUrl: "/mock-images/news/20260427050229816.jpg",
  },
  {
    id: 'sx-02',
    title: "\"3만명 관중에 문체부 장관까지\"… 성공적으로 끝난 2026 T1 첫 홈그라운드[현장메모]",
    publisher: "스포츠한국",
    publisherLogoSeed: 'gdg',
    thumbnailSeed: 'sx-02',
    elapsed: "8분 전",
    thumbnailUrl: "/mock-images/news/20260427063213037.jpg",
  },
  {
    id: 'sx-03',
    title: "SD 송성문, 대주자로 빅리그 데뷔…한국인 29번째 메이저리거",
    publisher: "뉴스1",
    publisherLogoSeed: 'jpb',
    thumbnailSeed: 'sx-03',
    elapsed: "13분 전",
    thumbnailUrl: "/mock-images/news/20260427074808086.jpg",
  },
];

export const SPORTS_EXTRA_TEXTS: ContentArticle[] = [
  {
    id: 'sxt-01',
    title: "역시 손흥민 찬사, 멈추지 않는 찬사...LA FC 주장 극찬 \"환상적, 리더이자 모두 사랑하는 선수\"",
    publisher: "스포츠조선",
    publisherLogoSeed: '',
    thumbnailSeed: 'sxt-01',
    elapsed: "방금 전",
  },
  {
    id: 'sxt-02',
    title: "넬리 코다, 셰브론 챔피언십 2연패·세계랭킹 1위 복귀…윤이나, 메이저 개인 최고 공동 4위",
    publisher: "스포츠동아",
    publisherLogoSeed: '',
    thumbnailSeed: 'sxt-02',
    elapsed: "8분 전",
  },
  {
    id: 'sxt-03',
    title: "‘엔소 결승골’ 첼시, 리즈 꺾고 4년 만에 FA컵 결승 진출... 맨시티와 우승 경쟁",
    publisher: "스포츠서울",
    publisherLogoSeed: '',
    thumbnailSeed: 'sxt-03',
    elapsed: "13분 전",
  },
  {
    id: 'sxt-04',
    title: "박성한·최정 뜨겁다…SSG, 한화·롯데 6연전서 선두 탈환 노린다",
    publisher: "기호일보",
    publisherLogoSeed: '',
    thumbnailSeed: 'sxt-04',
    elapsed: "22분 전",
  },
];

export const SPORTS_LOOP_SHORTS: ShortItem[] = [
  {
    id: 'lps-01',
    title: '손흥민 결승골 슬로모션',
    author: '스포츠루프',
    thumbnailUrl: placeholderImg('lps-01', 300, 500, 'soccer,goal,action'),
    viewCount: 850000,
  },
  {
    id: 'lps-02',
    title: '김하성 3점 홈런 3D 분석',
    author: '스포츠루프',
    thumbnailUrl: placeholderImg('lps-02', 300, 500, 'baseball,home-run'),
    viewCount: 420000,
  },
  {
    id: 'lps-03',
    title: '라건아 클러치 덩크 TOP5',
    author: '스포츠루프',
    thumbnailUrl: placeholderImg('lps-03', 300, 500, 'basketball,dunk'),
    viewCount: 280000,
  },
  {
    id: 'lps-04',
    title: '임성재 이글 퍼트 전 과정',
    author: '스포츠루프',
    thumbnailUrl: placeholderImg('lps-04', 300, 500, 'golf,putt'),
    viewCount: 190000,
  },
  {
    id: 'lps-05',
    title: '이강인 프리킥 리그 베스트',
    author: '스포츠루프',
    thumbnailUrl: placeholderImg('lps-05', 300, 500, 'soccer,freekick'),
    viewCount: 670000,
  },
  {
    id: 'lps-06',
    title: '페이커 펜타킬 월즈 하이라이트',
    author: '스포츠루프',
    thumbnailUrl: placeholderImg('lps-06', 300, 500, 'esports,gaming'),
    viewCount: 510000,
  },
];

export const SPORTS_LOOP_VIDEOS: SportsVideo[] = [
  {
    id: 'lp-01',
    title: '30초 하이라이트: 손흥민 결승골 슬로모션',
    channel: '스포츠루프',
    views: '조회 85만',
    duration: '00:32',
    thumbnailSeed: 'lp-01',
  },
  {
    id: 'lp-02',
    title: '김하성 3점 홈런 3D 분석',
    channel: '스포츠루프',
    views: '조회 42만',
    duration: '00:45',
    thumbnailSeed: 'lp-02',
  },
  {
    id: 'lp-03',
    title: '라건아 클러치 덩크 TOP5',
    channel: '스포츠루프',
    views: '조회 28만',
    duration: '01:12',
    thumbnailSeed: 'lp-03',
  },
  {
    id: 'lp-04',
    title: '임성재 이글 퍼트 전 과정',
    channel: '스포츠루프',
    views: '조회 19만',
    duration: '00:58',
    thumbnailSeed: 'lp-04',
  },
  {
    id: 'lp-05',
    title: '이강인 프리킥 리그 베스트',
    channel: '스포츠루프',
    views: '조회 67만',
    duration: '00:41',
    thumbnailSeed: 'lp-05',
  },
];

export const SPORTS_FINAL_ARTICLES: ContentArticle[] = [
  {
    id: 'fa-01',
    title: "[오피셜] '현대캐피탈 잔류' 허수봉 파격 계약, 연봉 8억·옵션 5억 '역대 최고액'",
    publisher: "스타뉴스",
    publisherLogoSeed: 'osn',
    thumbnailSeed: 'fa-01',
    elapsed: "방금 전",
    thumbnailUrl: "/mock-images/news/20260427000434993.jpg",
  },
  {
    id: 'fa-02',
    title: "KIA 그 우타 거포들 다 어디로 사라졌나… 깃발만 꽂으면 되는데, 인생의 기회 놓치나",
    publisher: "스포티비뉴스",
    publisherLogoSeed: 'spot',
    thumbnailSeed: 'fa-02',
    elapsed: "8분 전",
    thumbnailUrl: "/mock-images/news/20260427012107880.jpg",
  },
  {
    id: 'fa-03',
    title: "“인간의 심장이 아니다” 전율… 42.195㎞ 내내 100m 17초 주속으로 뛰었다고?",
    publisher: "세계일보",
    publisherLogoSeed: 'skk',
    thumbnailSeed: 'fa-03',
    elapsed: "13분 전",
    thumbnailUrl: "/mock-images/news/20260427013335958.jpg",
  },
  {
    id: 'fa-04',
    title: "41세 호날두 '체지방 7%' 비결…\"우유 대신 '이것' 마셔\"",
    publisher: "뉴시스",
    publisherLogoSeed: 'xps',
    thumbnailSeed: 'fa-04',
    elapsed: "22분 전",
    thumbnailUrl: "/mock-images/news/20260427020308039.jpg",
  },
  {
    id: 'fa-05',
    title: "마라톤 ‘마의 2시간’ 벽 깼다… 케냐 사웨, 1시간 59분 30초",
    publisher: "동아일보",
    publisherLogoSeed: 'inv',
    thumbnailSeed: 'fa-05',
    elapsed: "31분 전",
    thumbnailUrl: "/mock-images/news/20260427043341365.jpg",
  },
];

export interface SportsSubmenu {
  id: string;
  label: string;
  icon: string;
}

export const SPORTS_SUBMENU: SportsSubmenu[] = [
  { id: 'soccer', label: '축구', icon: '⚽' },
  { id: 'baseball', label: '야구', icon: '⚾' },
  { id: 'basketball', label: '농구', icon: '🏀' },
  { id: 'volleyball', label: '배구', icon: '🏐' },
  { id: 'golf', label: '골프', icon: '⛳' },
  { id: 'esports', label: 'e스포츠', icon: '🎮' },
  { id: 'ufc', label: '격투기', icon: '🥊' },
  { id: 'olympic', label: '올림픽', icon: '🏅' },
];

export interface SportsVideo {
  id: string;
  title: string;
  channel: string;
  views: string;
  duration: string;
  thumbnailSeed: string;
}

export const SPORTS_VIDEOS: SportsVideo[] = [
  {
    id: 'sv-01',
    title: '[풀 하이라이트] 토트넘 2-1 맨유, 손흥민 결승골',
    channel: 'SPOTV NOW',
    views: '조회 48만',
    duration: '06:42',
    thumbnailSeed: 'sv-01',
  },
  {
    id: 'sv-02',
    title: '김하성 스리런 대포! KBO 복귀전 현장 분위기',
    channel: 'KBO 공식',
    views: '조회 21만',
    duration: '03:18',
    thumbnailSeed: 'sv-02',
  },
  {
    id: 'sv-03',
    title: '레알 마드리드 엘클라시코 3골 전원 분석',
    channel: '풋볼리스트',
    views: '조회 57만',
    duration: '12:05',
    thumbnailSeed: 'sv-03',
  },
  {
    id: 'sv-04',
    title: 'LPGA 고진영 완벽한 샷 모음 — 개막전 1R',
    channel: 'LPGA TOUR KR',
    views: '조회 9.4만',
    duration: '04:51',
    thumbnailSeed: 'sv-04',
  },
];
