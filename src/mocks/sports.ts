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
  title: '"손흥민 EPL 통산 125호 골"…토트넘 2-1 승리 이끌어',
  summary:
    '후반 28분 페널티 박스 안에서 완벽한 턴 슛으로 결승골을 터뜨리며 손흥민이 개인 통산 125골째를 기록했다. 현지 팬들은 "올 시즌 리더의 존재감을 다시 입증했다"며 찬사를 쏟아냈다.',
  publisher: 'YTN',
  publisherLogoSeed: 'ytn',
  thumbnailSeed: 'sp-main-son',
  elapsed: '12분 전',
  commentCount: 482,
};

export const SPORTS_NEWS_GRID: ContentArticle[] = [
  {
    id: 'sg-01',
    title: '김하성, 결승 3점포 폭발…KBO 복귀전 완승',
    publisher: '스포츠조선',
    publisherLogoSeed: 'sjo',
    thumbnailSeed: 'sp-g-01',
    elapsed: '38분 전',
  },
  {
    id: 'sg-02',
    title: 'LPGA 고진영, 개막전 선두…"바람만 이겨내면 우승"',
    publisher: 'OSEN',
    publisherLogoSeed: 'osn',
    thumbnailSeed: 'sp-g-02',
    elapsed: '1시간 전',
  },
  {
    id: 'sg-03',
    title: '박세리 감독, 국가대표 최종 엔트리 확정',
    publisher: '중앙일보',
    publisherLogoSeed: 'joa',
    thumbnailSeed: 'sp-g-03',
    elapsed: '2시간 전',
  },
  {
    id: 'sg-04',
    title: '"역대급 영입" KBL 소노 외인 에이스 재계약',
    publisher: '점프볼',
    publisherLogoSeed: 'jpb',
    thumbnailSeed: 'sp-g-04',
    elapsed: '3시간 전',
  },
];

export const SPORTS_HEADLINES: ContentArticle[] = [
  {
    id: 'sh-01',
    title: '"홈런도 삼진도 SSG 답다"…김광현, 200승 향해 순항',
    publisher: 'SPOTV',
    publisherLogoSeed: 'spot',
    thumbnailSeed: 'sp-h-01',
    elapsed: '22분 전',
  },
  {
    id: 'sh-02',
    title: 'MLB "오타니, 50-50 재도전"…메이저 첫 100+도루 주목',
    publisher: '스포티비뉴스',
    publisherLogoSeed: 'spot',
    thumbnailSeed: 'sp-h-02',
    elapsed: '45분 전',
  },
  {
    id: 'sh-03',
    title: 'KFA "2026 북중미 월드컵 최종 엔트리 27명 확정"',
    publisher: '연합뉴스',
    publisherLogoSeed: 'yna',
    thumbnailSeed: 'sp-h-03',
    elapsed: '1시간 전',
  },
  {
    id: 'sh-04',
    title: '"V리그 챔프전 7차전까지 간다" …현대캐피탈 vs 대한항공',
    publisher: '엑스포츠뉴스',
    publisherLogoSeed: 'xps',
    thumbnailSeed: 'sp-h-04',
    elapsed: '2시간 전',
  },
  {
    id: 'sh-05',
    title: '류현진, 한화 복귀전 7이닝 1실점 "몸 상태 완전하다"',
    publisher: '조선일보',
    publisherLogoSeed: 'chs',
    thumbnailSeed: 'sp-h-05',
    elapsed: '3시간 전',
  },
];

export const SPORTS_TEXT_NEWS: ContentArticle[] = [
  {
    id: 'st-01',
    title: '[속보] 손흥민, 토트넘과 2년 재계약 공식 발표',
    publisher: '연합뉴스',
    publisherLogoSeed: 'yna',
    thumbnailSeed: 'st-01',
    elapsed: '5분 전',
  },
  {
    id: 'st-02',
    title: '한국 여자배구, 아시안컵 4강서 일본 꺾고 결승 진출',
    publisher: 'OSEN',
    publisherLogoSeed: 'osn',
    thumbnailSeed: 'st-02',
    elapsed: '19분 전',
  },
  {
    id: 'st-03',
    title: 'KBO 두산-LG 연장 10회 끝내기…잠실 라이벌전 승부',
    publisher: 'SPOTV NEWS',
    publisherLogoSeed: 'spot',
    thumbnailSeed: 'st-03',
    elapsed: '32분 전',
  },
  {
    id: 'st-04',
    title: 'UFC 정찬성 "은퇴 번복 고민 중"…프랜차이즈 제안 검토',
    publisher: 'MK스포츠',
    publisherLogoSeed: 'mks',
    thumbnailSeed: 'st-04',
    elapsed: '48분 전',
  },
  {
    id: 'st-05',
    title: '"T1 페이커 연봉 100억 돌파"…e스포츠 첫 사례',
    publisher: '인벤',
    publisherLogoSeed: 'inv',
    thumbnailSeed: 'st-05',
    elapsed: '1시간 전',
  },
];

export const SPORTS_BOTTOM_HEADLINES: ContentArticle[] = [
  {
    id: 'sb-01',
    title: '"코리안 더비" 김민재 vs 황의조 첫 맞대결…분데스리가 개막',
    publisher: '풋볼리스트',
    publisherLogoSeed: 'ftl',
    thumbnailSeed: 'sb-01',
    elapsed: '20분 전',
  },
  {
    id: 'sb-02',
    title: 'LPGA 박민지 "로레나 오초아 인비테이셔널 단독 선두"',
    publisher: '골프다이제스트',
    publisherLogoSeed: 'gdg',
    thumbnailSeed: 'sb-02',
    elapsed: '1시간 전',
  },
  {
    id: 'sb-03',
    title: 'KIA 타이거즈 "김도영, MVP 굳히기" 멀티홈런 작렬',
    publisher: '스포츠한국',
    publisherLogoSeed: 'skk',
    thumbnailSeed: 'sb-03',
    elapsed: '2시간 전',
  },
];

export const SPORTS_EXTRA_THUMBS: ContentArticle[] = [
  {
    id: 'sx-01',
    title: '"K리그1 전북현대, 우승 매직넘버 3"…감독 교체 효과 톡톡',
    publisher: '스포츠조선',
    publisherLogoSeed: 'sjo',
    thumbnailSeed: 'sx-01',
    elapsed: '15분 전',
  },
  {
    id: 'sx-02',
    title: 'PGA 임성재 "FedEx 컵 2위로 시즌 마감" 역대급 성적',
    publisher: '골프다이제스트',
    publisherLogoSeed: 'gdg',
    thumbnailSeed: 'sx-02',
    elapsed: '40분 전',
  },
  {
    id: 'sx-03',
    title: 'KBL 전주 KCC "외국인 MVP 후보 1순위" 라건아 재계약',
    publisher: '점프볼',
    publisherLogoSeed: 'jpb',
    thumbnailSeed: 'sx-03',
    elapsed: '1시간 전',
  },
];

export const SPORTS_EXTRA_TEXTS: ContentArticle[] = [
  {
    id: 'sxt-01',
    title: '"태극마크 포기 안 해" 김연경, 대한항공 지도자 복귀 시사',
    publisher: '',
    publisherLogoSeed: '',
    thumbnailSeed: 'sxt-01',
    elapsed: '',
  },
  {
    id: 'sxt-02',
    title: '"MLB 오타니 100도루 현실화" 시카고 전서 시즌 98번째',
    publisher: '',
    publisherLogoSeed: '',
    thumbnailSeed: 'sxt-02',
    elapsed: '',
  },
  {
    id: 'sxt-03',
    title: '"KBO 두산, 외인 감독 영입 추진" 내부 면접 단계',
    publisher: '',
    publisherLogoSeed: '',
    thumbnailSeed: 'sxt-03',
    elapsed: '',
  },
  {
    id: 'sxt-04',
    title: 'UFC "정찬성 은퇴 번복설" 프랜차이즈 제안 검토',
    publisher: '',
    publisherLogoSeed: '',
    thumbnailSeed: 'sxt-04',
    elapsed: '',
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
    title: '"전북현대, K리그1 통산 10번째 우승 눈앞"',
    publisher: 'OSEN',
    publisherLogoSeed: 'osn',
    thumbnailSeed: 'fa-01',
    elapsed: '2시간 전',
  },
  {
    id: 'fa-02',
    title: '"이강인 PSG 주전 안착" 리그앙 MVP 후보 5위 올라',
    publisher: '스포티비뉴스',
    publisherLogoSeed: 'spot',
    thumbnailSeed: 'fa-02',
    elapsed: '3시간 전',
  },
  {
    id: 'fa-03',
    title: '"KBO 포스트시즌 시청률 역대 최고" 종합 편성채널 반영',
    publisher: '스포츠한국',
    publisherLogoSeed: 'skk',
    thumbnailSeed: 'fa-03',
    elapsed: '4시간 전',
  },
  {
    id: 'fa-04',
    title: '"김연경 복귀전 매진" 현대건설 vs 흥국생명 티켓 전쟁',
    publisher: '엑스포츠뉴스',
    publisherLogoSeed: 'xps',
    thumbnailSeed: 'fa-04',
    elapsed: '5시간 전',
  },
  {
    id: 'fa-05',
    title: '"T1 페이커 연봉 100억 돌파" e스포츠 첫 사례',
    publisher: '인벤',
    publisherLogoSeed: 'inv',
    thumbnailSeed: 'fa-05',
    elapsed: '어제',
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
