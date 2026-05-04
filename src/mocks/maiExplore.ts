// AI 탐구 탭 mocks
// 스펙: Confluence "탐구탭" (HomeX/311492655)
// 핵심: 메인 페이지는 작업실. 시작 surface(추천 카드 + FAB) + 자산 surface(아카이브)

export type SlotKind =
  | 'compare' // 비교 분석 매트릭스
  | 'correlation' // 상관도 분석
  | 'timeline' // 타임라인
  | 'profile' // 인물·기관 프로파일
  | 'scenario' // 시나리오
  | 'audio'; // 오디오 팟캐스트

export interface SlotKindMeta {
  label: string;
  color: string;
  tint: string;
}

export const SLOT_KIND_META: Record<SlotKind, SlotKindMeta> = {
  compare: { label: '비교 분석', color: '#7E57C2', tint: '#F5EFFC' },
  correlation: { label: '상관도 분석', color: '#3D6EE0', tint: '#EBF1FE' },
  timeline: { label: '타임라인', color: '#3FA46A', tint: '#EAF6EF' },
  profile: { label: '인물·기관 프로파일', color: '#E89B2A', tint: '#FDF4E5' },
  scenario: { label: '시나리오', color: '#5A7A8C', tint: '#EFF3F5' },
  audio: { label: '오디오 팟캐스트', color: '#0B1A4A', tint: '#E6EAF4' },
};

export const TEMPLATE_CHIPS: { id: SlotKind; label: string; verb: string }[] = [
  { id: 'compare', label: '비교 분석', verb: '비교' },
  { id: 'correlation', label: '상관도 분석', verb: '연결' },
  { id: 'timeline', label: '타임라인', verb: '정리' },
  { id: 'profile', label: '인물·기관 프로파일', verb: '정리' },
  { id: 'scenario', label: '시나리오', verb: '예측' },
  { id: 'audio', label: '오디오 팟캐스트', verb: '듣기' },
];

export const PLACEHOLDER_ROTATION: string[] = [
  '예: 트럼프 발언과 코스피의 상관관계',
  '예: HBM3E와 HBM4의 차이',
  '예: 이란-이스라엘 분쟁 일지',
  '예: 호르무즈 해협이 막히면 유가는?',
  '예: 엔비디아 vs SK하이닉스 실적 비교',
];

export interface ExploreRecommendation {
  id: string;
  observation: string; // 관찰 문장 — 추천 근거
  proposal: string; // 제안 액션 문장
  prefill: string; // 시트 입력창에 미리 채워질 내용
  prefillKind: SlotKind; // 자동 부착될 형식
}

// 가장 최근 추천 1개. 스펙: 동시 다수 보유 시에도 1개만 노출 (no carousel).
export const ACTIVE_RECOMMENDATION: ExploreRecommendation = {
  id: 'rec-trump-iran',
  observation: '최근 #이란전쟁 노트와 #주가 노트를 자주 함께 보셨네요',
  proposal: '[트럼프 발언 × 코스피·유가] 상관도 분석을 시작해볼까요?',
  prefill:
    '트럼프의 이란·이스라엘 관련 발언 8건 직후 코스피·브렌트유가 어떻게 움직였는지 24시간 vs 5거래일 비교',
  prefillKind: 'correlation',
};

export interface ArchiveBodyBlock {
  heading?: string;
  text: string;
}

export interface ArchiveItem {
  id: string;
  kind: SlotKind;
  title: string;
  snippet: string; // 결과물 첫 2줄 미리보기
  body: ArchiveBodyBlock[]; // 카드 펼침 시 노출되는 본문
  tags: string[];
  createdAt: string; // 표시용 — "3일 전" 등
  sourceCount: number; // 기사 N건 기반
  viewCount?: number;
  listenCount?: number; // audio 전용
  favorited: boolean;
  inProgress: boolean;
  hasUpdate: boolean; // 업데이트 가능 — 재료 기사 추가됨
  /** 정렬용 — 최신일수록 큼 */
  recencyRank: number;
}

export const ARCHIVE_ITEMS: ArchiveItem[] = [
  {
    id: 'a-draft-1',
    kind: 'scenario',
    title: '호르무즈 해협 봉쇄 시나리오',
    snippet: '최악·기본·최선 3단계로 나눠 봉쇄 지속 기간별 유가·CPI·산업별 영향을 정리하는 작업이 진행 중',
    body: [
      {
        heading: '시나리오 A — 단기 봉쇄 (2주 이내)',
        text:
          '브렌트유 +12~18% 일시 급등 후 1개월 내 정상 수준으로 회귀. 국내 휘발유 평균가 +90~140원, 헤드라인 CPI 0.2~0.3%p 상승.',
      },
      {
        heading: '시나리오 B — 중기 봉쇄 (1~2개월)',
        text:
          '유가 30% 이상 고공행진. 항공·해운 운임 인상으로 식료품·전자 수입가 동반 상승. 정부 비축유 방출 + 가스공사 LNG 비축 확대 필요.',
      },
      {
        text:
          '— 작업 중. 시나리오 C(장기)와 한국 산업별 영향 매트릭스 작성 진행 중.',
      },
    ],
    tags: ['이란전쟁', '유가', '호르무즈해협'],
    createdAt: '어제',
    sourceCount: 0,
    favorited: false,
    inProgress: true,
    hasUpdate: false,
    recencyRank: 100,
  },
  {
    id: 'a-correlation-1',
    kind: 'correlation',
    title: '트럼프 관세 발언과 코스피의 상관관계',
    snippet: '8건의 트럼프 관세 발언 직후 24시간과 5거래일 후 회복률을 비교 — 75%는 1주일 안에 절반 이상 회복',
    body: [
      {
        heading: '핵심 발견',
        text:
          '발언 직후 24시간 평균 -1.4%, 5거래일 후 -0.3%. 즉, 75%(8건 중 6건)는 1주일 안에 절반 이상 회복.',
      },
      {
        heading: '예외 2건',
        text:
          '2025/11 반도체 관세 50% 발언과 2026/2 한미 FTA 재협상 시사 발언은 5일 후에도 -2%대 유지. 공통점: 한국 핵심 수출 품목 직격.',
      },
      {
        text:
          '신호 활용법: 일반 관세 발언은 단기 노이즈. 한국 핵심 수출에 직접 닿는 발언만 별도 분류해 경계.',
      },
    ],
    tags: ['주가', '트럼프', '코스피'],
    createdAt: '3일 전',
    sourceCount: 24,
    viewCount: 12,
    favorited: true,
    inProgress: false,
    hasUpdate: true,
    recencyRank: 90,
  },
  {
    id: 'a-compare-1',
    kind: 'compare',
    title: 'HBM3E vs HBM4 — SK하이닉스 vs 삼성',
    snippet: 'HBM3E와 HBM4를 양산 일정·고객사·단가·전력 효율 4축으로 비교 — SK하이닉스의 4Q26 양산이 24개월 캐파 격차를 만든다',
    body: [
      {
        heading: '양산 시점',
        text:
          'HBM3E 12단: SK하이닉스 1Q25 양산 / 삼성 3Q25 인증. HBM4: SK하이닉스 4Q26 목표 / 삼성 1Q27 목표.',
      },
      {
        heading: '주요 고객사',
        text:
          'SK하이닉스 — 엔비디아 단독 공급(B200/Rubin). 삼성 — AMD MI400, 자체 엑시노스, 일부 엔비디아.',
      },
      {
        heading: '단가/전력',
        text:
          'HBM4는 HBM3E 대비 +35~40% 단가 / -20% 전력 / 1.4배 대역폭. 양산 수율이 24개월 캐파 차이를 만든다.',
      },
    ],
    tags: ['반도체', 'HBM', '엔비디아'],
    createdAt: '5일 전',
    sourceCount: 18,
    viewCount: 7,
    favorited: false,
    inProgress: false,
    hasUpdate: false,
    recencyRank: 80,
  },
  {
    id: 'a-timeline-1',
    kind: 'timeline',
    title: '이란-이스라엘 충돌 일지 (2026)',
    snippet: '이란 영공 침범부터 카타르 중재안까지 2주 간 주요 사건 4건을 일자별로 정리하고 유가에 미친 영향을 함께 표시',
    body: [
      { heading: '4월 13일', text: '이란 무인기 300기 이스라엘 영공 침범. 90% 요격, 인명 피해 미미.' },
      { heading: '4월 14일', text: '이스라엘, 이스파한 군 시설 보복 공습. 미국·EU 자제 요청.' },
      { heading: '4월 19일', text: '미국, 이란 추가 제재(석유 수출 차단). 호르무즈 해협 긴장 최고조.' },
      { heading: '4월 26일', text: '카타르 중재안 — 양측 임시 휴전 모색. 유가 일시 안정.' },
    ],
    tags: ['이란전쟁', '이스라엘', '중동'],
    createdAt: '1주 전',
    sourceCount: 47,
    viewCount: 23,
    favorited: true,
    inProgress: false,
    hasUpdate: true,
    recencyRank: 70,
  },
  {
    id: 'a-audio-1',
    kind: 'audio',
    title: '반도체 4월 위클리 딥다이브',
    snippet: '4월 21~27일 반도체 기사 31건을 5개 챕터로 묶어 31분짜리 오디오로 합성한 위클리 딥다이브',
    body: [
      {
        heading: '챕터',
        text:
          '00:00 인트로 / 02:14 HBM 양산 캐파 격차 / 09:30 미국 BIS 새 수출 가이드라인 / 17:45 GTC 데모 핵심 / 24:10 한국 대응 시나리오.',
      },
      { text: '재생 시간 31분. 4월 21~27일 기사 31건 기반. 다음 회차 예정일 5월 4일.' },
    ],
    tags: ['반도체', 'HBM', 'AI칩'],
    createdAt: '1주 전',
    sourceCount: 31,
    listenCount: 4,
    favorited: false,
    inProgress: false,
    hasUpdate: false,
    recencyRank: 60,
  },
  {
    id: 'a-profile-1',
    kind: 'profile',
    title: '젠슨 황 — 발언·일정·시장 영향 프로파일',
    snippet: 'GTC 키노트 이후 6개월 간 한국 메모리 관련 발언 8건과 그때마다의 SK하이닉스·삼성 주가 반응을 정리',
    body: [
      {
        heading: '주요 발언 8건',
        text:
          'GTC 키노트(3월), 대만 방문(5월), 도쿄 AI 서밋(7월), 워싱턴 청문회(9월) 등에서 한국 메모리 의존도와 양산 캐파 발언이 핵심.',
      },
      {
        heading: '한국 시장 반응',
        text:
          '8건 중 5건은 SK하이닉스 +3% 이상 / 삼성 +1~2% 동반 상승. "삼성 HBM 인증" 언급(11월)이 가장 강한 트리거.',
      },
    ],
    tags: ['엔비디아', '반도체', '인물'],
    createdAt: '2주 전',
    sourceCount: 22,
    viewCount: 5,
    favorited: false,
    inProgress: false,
    hasUpdate: false,
    recencyRank: 50,
  },
  {
    id: 'a-compare-2',
    kind: 'compare',
    title: '브렌트유 vs WTI — 중동 위기 반응 차이',
    snippet: '평시 $3 안팎이던 브렌트–WTI 스프레드가 호르무즈 긴장 시 $7까지 확대 — 운송 보험료 10배 인상이 핵심 변수',
    body: [
      {
        heading: '스프레드 확대 패턴',
        text:
          '평시 $3 내외 → 호르무즈 긴장 시 $5~7로 확대. 브렌트는 중동 직격, WTI는 미국 셰일 공급으로 완충.',
      },
      {
        heading: '운송 보험료',
        text:
          '걸프 운항 VLCC 보험료 평시 0.04% → 긴장 시 0.4% (10배). 운송비 자체가 브렌트 가격에 +$2~3 추가.',
      },
    ],
    tags: ['유가', '브렌트유', '이란전쟁'],
    createdAt: '2주 전',
    sourceCount: 14,
    viewCount: 3,
    favorited: false,
    inProgress: false,
    hasUpdate: false,
    recencyRank: 40,
  },
  {
    id: 'a-timeline-2',
    kind: 'timeline',
    title: '상괭이 보호 정책 변화 (2020~)',
    snippet: '2020년 해양보호생물 지정부터 2025년 친환경 어구 보조금까지 5년간 정책 변화로 폐사율 32% 감소',
    body: [
      { heading: '2020', text: '해양수산부, 상괭이를 해양보호생물로 지정.' },
      { heading: '2023', text: '서·남해 연안 상괭이 탈출 장치 부착 그물 의무화.' },
      { heading: '2025', text: '친환경 어구 전환 보조금 도입. 상괭이 폐사율 32% 감소.' },
    ],
    tags: ['상괭이', '환경'],
    createdAt: '3주 전',
    sourceCount: 11,
    viewCount: 8,
    favorited: false,
    inProgress: false,
    hasUpdate: false,
    recencyRank: 30,
  },
];

// 자주 등장하는 태그 (자동 노출용 — 빈도 기준 상위)
export const FREQUENT_TAGS: string[] = [
  '반도체',
  '주가',
  '이란전쟁',
  '유가',
  '엔비디아',
  'HBM',
];
