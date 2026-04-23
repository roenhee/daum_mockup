import type { ContentArticle } from '@/types';
import type { ShortItem } from './shorts';

export type EntertainArticle = ContentArticle;

const IMG = {
  iu: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/IU_at_Blue_Dragon_Series_Awards_on_18072025_%2810%29.png',
  ksh: 'https://upload.wikimedia.org/wikipedia/commons/6/61/Kim_Soo-hyun_in_August_2024_-_2.png',
  pbg: 'https://upload.wikimedia.org/wikipedia/commons/8/86/Park_Bo-gum_%EB%B0%95%EB%B3%B4%EA%B2%80_%E6%9C%B4%E5%AF%B6%E5%8A%8D_for_Marie_Claire_Korea%2C_April_2025_4.png',
  shk: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Song_Hye_Kyo_2025_%EC%86%A1%ED%98%9C%EA%B5%90_04.jpg',
  jhi: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Jung_Hae-in_at_Bvlgari_event_in_March_2025_02.jpg',
  hsh: 'https://upload.wikimedia.org/wikipedia/commons/9/9f/Han_So-Hee_at_the_2025_Toronto_International_Film_Festival_%28cropped%29.jpg',
  cwa: 'https://upload.wikimedia.org/wikipedia/commons/d/d8/Cha_Eun-woo%2C_March_31%2C_2025.png',
  kge: 'https://upload.wikimedia.org/wikipedia/commons/7/75/Kim_Go-eun_at_the_2024_Toronto_International_Film_Festival_2.jpg',
  ldh: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Lee_Do-hyun_%EC%9E%84%EB%8F%99%ED%98%84_2022.jpg',
  nj: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/NewJeans_2023_MelonMusicAwards_composite.jpg',
  kho: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/%27%ED%95%9C%EB%81%BC%EC%A4%8D%EC%87%BC%27_%EC%A0%9C%EC%9E%91%EB%B0%9C%ED%91%9C%ED%9A%8C_%ED%98%84%EC%9E%A5_14s.jpg',
  cis: 'https://upload.wikimedia.org/wikipedia/commons/9/95/Zo_In-sung_%EC%A1%B0%EC%9D%B8%EC%84%B1_in_2021.png',
  lbh: 'https://upload.wikimedia.org/wikipedia/commons/c/ce/Lee_Byung-hun_2025_Toronto_%28cropped%29.jpg',
  jjh: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Jun_Ji-hyun_in_April_2026.png',
  bjh: 'https://upload.wikimedia.org/wikipedia/commons/5/54/Bong_Joon_Ho_at_Busan_Film_Festival%2C_smaller.jpg',
  sks: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Sung_Si-kyung_on_May_30%2C_2014_%28cropped%29.jpg',
  khs: 'https://upload.wikimedia.org/wikipedia/commons/6/60/Kim_Hye-soo_in_June_2023.png',
  karina: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Karina_at_Love_Your_W_event_2025.jpg',
  jk: 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Jung_Kook_of_BTS%2C_February_12%2C_2026_%281%29.png',
  pcw: 'https://upload.wikimedia.org/wikipedia/commons/b/b0/%EB%B0%95%EC%B0%AC%EC%9A%B1_-_%EC%96%B4%EC%A9%94%EC%88%98%EA%B0%80%EC%97%86%EB%8B%A4.jpg',
  twice: 'https://upload.wikimedia.org/wikipedia/commons/2/22/Twice_-_Dickies_Arena%2C_2022_%28cropped%29.jpg',
  svt: 'https://upload.wikimedia.org/wikipedia/commons/8/8b/Seventeen_Carat_Land_24.jpg',
  rose: 'https://upload.wikimedia.org/wikipedia/commons/b/b3/Blackpink_Ros%C3%A9_Rimowa_1.jpg',
  lyw: 'https://upload.wikimedia.org/wikipedia/commons/8/84/Temp_1662384481565.-511956263.jpg',
};

export const ENTERTAIN_MAIN: EntertainArticle = {
  id: 'et-main',
  title: '"눈물의 여왕" 시즌2, 드디어 크랭크인…김수현·김지원 재회',
  summary:
    '글로벌 OTT 흥행 기록을 새로 썼던 "눈물의 여왕"이 2년 만의 시즌2 촬영에 돌입했다. 제작진은 "두 주연의 케미가 더 깊어졌다"며 기대를 모았다.',
  publisher: '스타뉴스',
  publisherLogoSeed: 'stn',
  thumbnailSeed: 'ent-main-queen',
  thumbnailUrl: IMG.ksh,
  elapsed: '23분 전',
  commentCount: 1203,
};

export const ENTERTAIN_NEWS_TOP: EntertainArticle[] = [
  {
    id: 'en-01',
    title: '아이유, 월드투어 서울 앙코르 티켓 10만 석 5분 매진',
    publisher: 'OSEN',
    publisherLogoSeed: 'osn',
    thumbnailSeed: 'ent-iu',
    thumbnailUrl: IMG.iu,
    elapsed: '37분 전',
  },
  {
    id: 'en-02',
    title: '"결국 이혼"…강호동 부부, 2026 상반기 공식 발표',
    publisher: '일간스포츠',
    publisherLogoSeed: 'ils',
    thumbnailSeed: 'ent-kho',
    thumbnailUrl: IMG.kho,
    elapsed: '1시간 전',
  },
  {
    id: 'en-03',
    title: '송혜교 "연기는 평생의 업"…청룡영화상 여우주연상 소감',
    publisher: '중앙일보',
    publisherLogoSeed: 'joa',
    thumbnailSeed: 'ent-shk',
    thumbnailUrl: IMG.shk,
    elapsed: '2시간 전',
  },
  {
    id: 'en-04',
    title: '차은우 전역 후 첫 화보 공개…"더 성숙해진 분위기"',
    publisher: '스포츠한국',
    publisherLogoSeed: 'skk',
    thumbnailSeed: 'ent-cha-photo',
    thumbnailUrl: IMG.cwa,
    elapsed: '2시간 전',
  },
  {
    id: 'en-05',
    title: '"미나리" 정이삭 감독, 차기작 칸 초청…"한국인 배우 전원 캐스팅"',
    publisher: '씨네21',
    publisherLogoSeed: 'cne',
    thumbnailSeed: 'ent-minari-next',
    thumbnailUrl: IMG.bjh,
    elapsed: '3시간 전',
  },
];

export const ENTERTAIN_HEADLINE_TEXTS: EntertainArticle[] = [
  {
    id: 'eth-01',
    title: '"블랙핑크 로제, 단독 월드투어 서울 앙코르 최종 확정"',
    publisher: '텐아시아',
    publisherLogoSeed: 'tna',
    thumbnailSeed: 'ent-rose',
    elapsed: '12분 전',
  },
  {
    id: 'eth-02',
    title: '"배우 조인성, 넷플릭스 오리지널 스릴러 주연 확정"',
    publisher: '스타뉴스',
    publisherLogoSeed: 'stn',
    thumbnailSeed: 'ent-cis',
    elapsed: '28분 전',
  },
  {
    id: 'eth-03',
    title: '"이병헌 칸 영화제 심사위원 위촉…아시아 배우 최초"',
    publisher: '연합뉴스',
    publisherLogoSeed: 'yna',
    thumbnailSeed: 'ent-lbh',
    elapsed: '41분 전',
  },
  {
    id: 'eth-04',
    title: '"전지현 컴백" tvN 사극 주연 확정…6년 만의 드라마 복귀',
    publisher: '중앙일보',
    publisherLogoSeed: 'joa',
    thumbnailSeed: 'ent-jjh',
    elapsed: '55분 전',
  },
  {
    id: 'eth-05',
    title: '"NCT 드림 도쿄돔 2회 공연, 10만 팬 열광"',
    publisher: '헤럴드POP',
    publisherLogoSeed: 'hep',
    thumbnailSeed: 'ent-nctd',
    elapsed: '1시간 전',
  },
];

export const ENTERTAIN_GRID_TWO: EntertainArticle[] = [
  {
    id: 'eg2-01',
    title: '"더 글로리 시즌3" 송혜교 복귀 가능성…제작사 "협의 중"',
    publisher: 'OSEN',
    publisherLogoSeed: 'osn',
    thumbnailSeed: 'ent-glory3',
    thumbnailUrl: IMG.shk,
    elapsed: '1시간 전',
  },
  {
    id: 'eg2-02',
    title: '에스파 카리나, 파리 컬렉션 오프닝 워킹…현지 반응 폭발',
    publisher: '헤럴드POP',
    publisherLogoSeed: 'hep',
    thumbnailSeed: 'ent-karina',
    thumbnailUrl: IMG.karina,
    elapsed: '2시간 전',
  },
];

export const ENTERTAIN_GRID_FOUR: EntertainArticle[] = [
  {
    id: 'eg4-01',
    title: '"기생충 그 이후" 봉준호 신작 "미키17" 글로벌 공개',
    publisher: '씨네21',
    publisherLogoSeed: 'cne',
    thumbnailSeed: 'ent-mickey',
    thumbnailUrl: IMG.bjh,
    elapsed: '30분 전',
  },
  {
    id: 'eg4-02',
    title: '가수 성시경, 단독 콘서트 전석 매진…7년 만의 투어',
    publisher: 'TV리포트',
    publisherLogoSeed: 'tvr',
    thumbnailSeed: 'ent-sks',
    thumbnailUrl: IMG.sks,
    elapsed: '1시간 전',
  },
  {
    id: 'eg4-03',
    title: '"한국 예능 수출 신기록"…"런닝맨" 美 리메이크 확정',
    publisher: '스포츠경향',
    publisherLogoSeed: 'spk',
    thumbnailSeed: 'ent-running',
    thumbnailUrl: IMG.kho,
    elapsed: '2시간 전',
  },
  {
    id: 'eg4-04',
    title: '김혜수, 대종상 공로상 수상…"35년 연기 인생의 훈장"',
    publisher: '일간스포츠',
    publisherLogoSeed: 'ils',
    thumbnailSeed: 'ent-khs',
    thumbnailUrl: IMG.khs,
    elapsed: '3시간 전',
  },
];

export const ENTERTAIN_NEWS_MORE: EntertainArticle[] = [
  {
    id: 'em-01',
    title: '"뉴진스 공백 1년" 컴백 대신 솔로 릴레이 예고',
    publisher: '헤럴드POP',
    publisherLogoSeed: 'hep',
    thumbnailSeed: 'ent-nj',
    thumbnailUrl: IMG.nj,
    elapsed: '3시간 전',
  },
  {
    id: 'em-02',
    title: '박보검, "스위트홈 파이널" 출연 확정…"강박 캐릭터 도전"',
    publisher: 'MBN',
    publisherLogoSeed: 'mbn',
    thumbnailSeed: 'ent-pbg',
    thumbnailUrl: IMG.pbg,
    elapsed: '어제',
  },
  {
    id: 'em-03',
    title: '"올해 최다 관객" 영화 "파묘 리턴즈" 천만 돌파',
    publisher: '스포츠한국',
    publisherLogoSeed: 'skk',
    thumbnailSeed: 'ent-pamyo',
    thumbnailUrl: IMG.lbh,
    elapsed: '어제',
  },
  {
    id: 'em-04',
    title: '방탄소년단 정국, 빌보드 핫100 3주 연속 1위',
    publisher: 'TV리포트',
    publisherLogoSeed: 'tvr',
    thumbnailSeed: 'ent-jk',
    thumbnailUrl: IMG.jk,
    elapsed: '어제',
  },
  {
    id: 'em-05',
    title: '"올해의 아티스트" 아이유, 멜론뮤직어워드 대상 수상',
    publisher: '스타뉴스',
    publisherLogoSeed: 'stn',
    thumbnailSeed: 'ent-iu-mma',
    thumbnailUrl: IMG.iu,
    elapsed: '어제',
  },
  {
    id: 'em-06',
    title: '한소희 "다음 작품은 로맨스"…"밝은 에너지 연기해 보고 싶어"',
    publisher: 'OSEN',
    publisherLogoSeed: 'osn',
    thumbnailSeed: 'ent-hsh-rom',
    thumbnailUrl: IMG.hsh,
    elapsed: '어제',
  },
  {
    id: 'em-07',
    title: '"한국 영화 글로벌 흥행" 박찬욱 신작, 베니스 황금사자상 후보',
    publisher: '씨네21',
    publisherLogoSeed: 'cne',
    thumbnailSeed: 'ent-pcw',
    thumbnailUrl: IMG.pcw,
    elapsed: '2일 전',
  },
  {
    id: 'em-08',
    title: '"트와이스 10주년" 완전체 컴백 예고…팬덤 들썩',
    publisher: '텐아시아',
    publisherLogoSeed: 'tna',
    thumbnailSeed: 'ent-twice',
    thumbnailUrl: IMG.twice,
    elapsed: '2일 전',
  },
  {
    id: 'em-09',
    title: '김고은 "영화와 드라마 구분 없다"…차기작 청춘 멜로 확정',
    publisher: '일간스포츠',
    publisherLogoSeed: 'ils',
    thumbnailSeed: 'ent-kge-next',
    thumbnailUrl: IMG.kge,
    elapsed: '2일 전',
  },
  {
    id: 'em-10',
    title: '"세븐틴 월드투어 100만 동원"…K팝 신기록 경신',
    publisher: '스포츠경향',
    publisherLogoSeed: 'spk',
    thumbnailSeed: 'ent-svt',
    thumbnailUrl: IMG.svt,
    elapsed: '3일 전',
  },
];

export const ENTERTAIN_LOOP_SHORTS: ShortItem[] = [
  {
    id: 'els-01',
    title: '아이유 서울 앙코르 오프닝 1분 요약',
    author: '뮤직루프',
    thumbnailUrl: IMG.iu,
    viewCount: 482000,
  },
  {
    id: 'els-02',
    title: '"눈물의 여왕 시즌2" 크랭크인 현장 비하인드',
    author: 'K드라마루프',
    thumbnailUrl: IMG.ksh,
    viewCount: 314000,
  },
  {
    id: 'els-03',
    title: '청룡영화상 레드카펫 베스트 드레서 TOP5',
    author: '스타일루프',
    thumbnailUrl: IMG.rose,
    viewCount: 228000,
  },
  {
    id: 'els-04',
    title: '차은우 전역 후 첫 팬미팅 하이라이트',
    author: '엔터루프',
    thumbnailUrl: IMG.cwa,
    viewCount: 196000,
  },
  {
    id: 'els-05',
    title: '방탄소년단 정국 빌보드 시상식 무대',
    author: 'KPOP루프',
    thumbnailUrl: IMG.jk,
    viewCount: 721000,
  },
  {
    id: 'els-06',
    title: '"파묘 리턴즈" 천만 돌파 무대인사 현장',
    author: '무비루프',
    thumbnailUrl: IMG.lbh,
    viewCount: 154000,
  },
];

export interface EntertainCeleb {
  id: string;
  name: string;
  subtitle: string;
  avatarSeed: string;
  avatarUrl?: string;
  trending?: boolean;
}

export const ENTERTAIN_CELEBS: EntertainCeleb[] = [
  { id: 'c-01', name: '김수현', subtitle: '드라마 컴백', avatarSeed: 'cel-ksh', avatarUrl: IMG.ksh, trending: true },
  { id: 'c-02', name: '아이유', subtitle: '월드투어', avatarSeed: 'cel-iu', avatarUrl: IMG.iu, trending: true },
  { id: 'c-03', name: '박보검', subtitle: '신작 확정', avatarSeed: 'cel-pbg', avatarUrl: IMG.pbg },
  { id: 'c-04', name: '송혜교', subtitle: '시상식', avatarSeed: 'cel-shk', avatarUrl: IMG.shk },
  { id: 'c-05', name: '정해인', subtitle: '영화 개봉', avatarSeed: 'cel-jhi', avatarUrl: IMG.jhi },
  { id: 'c-06', name: '한소희', subtitle: '화보', avatarSeed: 'cel-hsh', avatarUrl: IMG.hsh },
  { id: 'c-07', name: '차은우', subtitle: '콘서트', avatarSeed: 'cel-cwa', avatarUrl: IMG.cwa },
  { id: 'c-08', name: '김고은', subtitle: '드라마', avatarSeed: 'cel-kge', avatarUrl: IMG.kge },
  { id: 'c-09', name: '이도현', subtitle: '신인상', avatarSeed: 'cel-ldh', avatarUrl: IMG.ldh },
  { id: 'c-10', name: '뉴진스', subtitle: '컴백 예고', avatarSeed: 'cel-nj', avatarUrl: IMG.nj },
];

export interface TrendPhoto {
  id: string;
  title: string;
  imageSeed: string;
  imageUrl?: string;
  publisher: string;
  elapsed: string;
}

export const ENTERTAIN_TREND: TrendPhoto[] = [
  {
    id: 'tr-01',
    title: '"영화제 최고의 순간" 청룡영화상 레드카펫 스타일',
    imageSeed: 'ent-redcarpet',
    imageUrl: IMG.shk,
    publisher: '텐아시아',
    elapsed: '1시간 전',
  },
  {
    id: 'tr-02',
    title: '"아이유가 입으면 완판" 서울 앙코르 무대 의상 공개',
    imageSeed: 'ent-iu-stage',
    imageUrl: IMG.iu,
    publisher: '스타일닷컴',
    elapsed: '2시간 전',
  },
  {
    id: 'tr-03',
    title: '"파묘 리턴즈" 천만 돌파 무대인사 현장 포토',
    imageSeed: 'ent-pamyo-stage',
    imageUrl: IMG.lbh,
    publisher: '매일경제',
    elapsed: '3시간 전',
  },
  {
    id: 'tr-04',
    title: '방탄소년단 정국, 빌보드 시상식 올블랙 룩',
    imageSeed: 'ent-jk-bb',
    imageUrl: IMG.jk,
    publisher: '한국일보',
    elapsed: '어제',
  },
];

export interface RankedPhotoNews {
  rank: number;
  title: string;
  imageSeed: string;
  imageUrl?: string;
}

export const ENTERTAIN_TODAY_RANKED: RankedPhotoNews[] = [
  { rank: 1, title: '"눈물의 여왕 시즌2" 크랭크인, 2026년 겨울 방영 예고', imageSeed: 'rk-queen', imageUrl: IMG.ksh },
  { rank: 2, title: '아이유 서울 앙코르 10만 석 5분 매진', imageSeed: 'rk-iu', imageUrl: IMG.iu },
  { rank: 3, title: '강호동 부부 이혼 공식 발표', imageSeed: 'rk-kho', imageUrl: IMG.kho },
  { rank: 4, title: '청룡영화상 여우주연상 송혜교', imageSeed: 'rk-shk', imageUrl: IMG.shk },
  { rank: 5, title: '뉴진스 공백 1년…솔로 릴레이 프로젝트', imageSeed: 'rk-nj', imageUrl: IMG.nj },
  { rank: 6, title: '박보검, "스위트홈 파이널" 출연 확정', imageSeed: 'rk-pbg', imageUrl: IMG.pbg },
];
