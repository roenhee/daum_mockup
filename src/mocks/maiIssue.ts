// 이슈 노트 탭 — 1차 스펙 슬롯 mock 데이터
// 스펙: docs page 304414946 (axzcorp.atlassian.net) 5장 — 7 슬롯 × 2 변형 = 14개
// 톤: 새소식 탭과 동일한 비서 메타포(§1.1) · 회색 칩 + 컬러 border-top(§1.2)
// 키워드: 이란 전쟁 / 주가 / 유가 / 반도체 / 상괭이 / 아쿠아리움 / 늑구

export type IssueFeedItem =
  | { kind: 'i1a'; data: DailyDigestData }
  | { kind: 'i1b'; data: DailyDigestData }
  | { kind: 'i2a'; data: IssueFlowData }
  | { kind: 'i2b'; data: IssueFlowData }
  | { kind: 'i3a'; data: MultiOutletData }
  | { kind: 'i4a'; data: WeeklyReportData }
  | { kind: 'i4b'; data: WeeklyReportData }
  | { kind: 'i6a'; data: CrossIssueData }
  | { kind: 'i6b'; data: CrossIssueData }
  | { kind: 'i10a'; data: IssueMapData }
  | { kind: 'i10b'; data: IssueMapData }
  | { kind: 'i30a'; data: DeepdiveAudioData }
  | { kind: 'i30b'; data: DeepdiveAudioData };

// 확신도 5단 (§1.9.3)
export type Confidence = 'L1' | 'L2' | 'L3' | 'L4' | 'L5';

export interface SourceRef {
  publisher: string;
  publisherLogoSeed: string;
  title: string;
  elapsed: string;
}

// 노트 공통 헤더 메타
interface NoteHeader {
  topics: string[]; // 주제 칩 (회색)
  title: string; // 리포트 타이틀
  issueNo: string; // 발행 번호 (e.g. "042", "주간 04-04")
  generatedAt: string; // 생성 시각 라벨
  basedOnCount: number; // 기사 N건 기반
}

/* ─────────── I-1 데일리 다이제스트 ─────────── */

export interface DailyDigestData extends NoteHeader {
  variant: 'single' | 'integrated';
  /** 카드 비주얼 테마: default = 흰색 카드뉴스 / warm = 따뜻한 리포트형 (특별 강조) */
  theme?: 'default' | 'warm';
  /** 접힘 상태 3줄 요약 */
  brief: string;
  /** 펼침 상태 이벤트 또는 키워드별 한 줄 */
  items: { headline: string; detail: string; sources: string[] }[];
  /** 통합형은 키워드 인덱스 표기 */
  integratedKeywordCount?: number;
  sources: SourceRef[];
}

/* ─────────── I-2 이슈 흐름 정리 ─────────── */

export interface IssueFlowStep {
  /** D-N / W-N 마커 또는 날짜 */
  marker: string;
  date?: string;
  title: string;
  detail?: string;
  confidence?: Confidence;
}

export interface IssueFlowData extends NoteHeader {
  variant: 'ongoing' | 'closed';
  rangeLabel: string; // "최근 5일", "4월 8일~17일(9박 10일)"
  brief: string;
  steps: IssueFlowStep[];
  /** ongoing: 현재 상태 라벨 / closed: 종결 메모 */
  statusLabel: string;
  /** closed에서 추가 노트 */
  postscript?: string;
  sources: SourceRef[];
}

/* ─────────── I-3 다매체 논조 비교 ─────────── */

export interface OutletStance {
  outlet: string;
  outletLogoSeed: string;
  framing: string; // 매체별 시각 한 줄
  quote: string; // 짧은 인용
}

export interface MultiOutletData extends NoteHeader {
  /** 핵심 사실 + 교차 확인 비율 */
  factHeadline: string;
  crossCheckRatio: string; // "교차 확인 8/8"
  brief: string;
  stances: OutletStance[]; // 매체별 시각
  sources: SourceRef[];
}

export interface CoverageFact {
  fact: string;
  reportedRatio: string; // "8/8 매체 보도"
  reportedCount: number;
  unreportedCount: number;
}

export interface CoverageGapData extends NoteHeader {
  brief: string;
  facts: CoverageFact[];
  sources: SourceRef[];
}

/* ─────────── I-4 주간 리포트 ─────────── */

export interface WeeklyReportSection {
  heading: string;
  body: string;
  /** §1 보도량 미니 차트 */
  chart?: number[];
  confidence?: Confidence;
}

export interface WeeklyReportData extends NoteHeader {
  variant: 'single' | 'portfolio';
  weekLabel: string; // "4월 4주차"
  brief: string;
  sections: WeeklyReportSection[];
  /** 포트폴리오는 7개 키워드 한눈 매트릭스. series는 주중 일자별 보도량(월~일 7개) */
  matrix?: {
    keyword: string;
    volumeChange: string;
    tone: 'up' | 'flat' | 'down';
    series: number[];
  }[];
  sources: SourceRef[];
}

/* ─────────── I-6 교차 이슈 분석 ─────────── */

export interface CrossIssueData extends NoteHeader {
  variant: 'direct' | 'transition';
  /** 두 주제: A × B 또는 A → B */
  topicA: string;
  topicB: string;
  intersection: string; // 교차점 한 줄
  brief: string;
  /** A의 입장/맥락, 교차점, B의 입장/맥락 */
  flow: { side: 'a' | 'cross' | 'b'; label: string; body: string }[];
  implication: string; // 통합 시사점
  confidence: Confidence;
  sources: SourceRef[];
}

/* ─────────── I-10 쟁점 구조도 노트 ─────────── */

export interface IssuePosition {
  /** 사분면 1~4 (1=우상단, 2=좌상단, 3=좌하단, 4=우하단) */
  quadrant: 1 | 2 | 3 | 4;
  label: string;
  detail: string;
}

export interface IssueMapData extends NoteHeader {
  variant: 'policy' | 'value';
  question: string; // 쟁점 한 줄
  brief: string;
  /** 2축 라벨: x = 가로축, y = 세로축 */
  axisX: { high: string; low: string };
  axisY: { high: string; low: string };
  positions: IssuePosition[];
  unresolvedQuestions: string[];
  sources: SourceRef[];
}

/* ─────────── I-30 위클리 딥다이브 오디오 ─────────── */

export interface DeepdiveChapter {
  title: string;
  duration: string; // "2:10"
}

export interface DeepdiveAudioData extends NoteHeader {
  variant: 'single' | 'integrated';
  weekLabel: string;
  totalDuration: string; // "약 11분"
  chapters: DeepdiveChapter[];
  brief: string;
}

/* ─────────────────────────────────────────────
 * MOCK FEED — 14개 (피드 노출 순서는 추후 조정 가능)
 * ───────────────────────────────────────────── */

const SRC = (
  publisher: string,
  publisherLogoSeed: string,
  title: string,
  elapsed: string,
): SourceRef => ({ publisher, publisherLogoSeed, title, elapsed });

export const MAI_ISSUE_FEED: IssueFeedItem[] = [
  // ── I-1a · 단일 주제 데일리 다이제스트 (이란 전쟁) ───────────────
  {
    kind: 'i1a',
    data: {
      variant: 'single',
      topics: ['이란 전쟁'],
      title: '오늘 이란 전쟁 핵심 3가지',
      issueNo: 'No. 142',
      generatedAt: '오늘 7:00',
      basedOnCount: 12,
      brief:
        '오늘 이란 전쟁 핵심 3가지 — 호르무즈 통항 제한 조치, 미군 항모 진입, 국제유가 급등으로의 연쇄 반응까지 한 호흡으로 정리했어요.',
      items: [
        {
          headline: '호르무즈 통항 제한 발표 (오전 6시 KST)',
          detail:
            '이란 외무부가 미군 항모 진입에 대응해 호르무즈 해협 통항을 하루 15척으로 제한한다고 발표했어요.',
          sources: ['연합뉴스', 'MBC'],
        },
        {
          headline: '미국·이란 외교 채널 가동',
          detail:
            '매체별로 진위 보도가 갈리고 있어요. 로이터는 정식 채널 가동, 한겨레는 비공식 접촉으로 보도.',
          sources: ['로이터', '한겨레'],
        },
        {
          headline: '국제유가 일중 +12% 급등',
          detail:
            'WTI 96달러 돌파, 30일 평균 대비 ×1.13배. 이 흐름은 유가 다이제스트에서도 다뤘어요.',
          sources: ['한국경제'],
        },
      ],
      sources: [
        SRC('연합뉴스', 'yna', '이란, 호르무즈 통항 하루 15척 제한 발표', '6시간 전'),
        SRC('MBC 뉴스데스크', 'mbc', '"호르무즈 통항 선박, 하루 15척 제한"', '14분 전'),
        SRC('로이터', 'reuters', 'Iran, U.S. resume back-channel talks: sources', '3시간 전'),
        SRC('한겨레', 'hani', '美·이란, 비공식 접촉 재개… 외교 채널 가동 단계', '2시간 전'),
        SRC('한국경제', 'hk', 'WTI 96달러 돌파… 호르무즈 사실상 \'제로\'', '52분 전'),
      ],
    },
  },

  // ── I-2a · 진행 중 흐름 (이란 전쟁) ──────────────────────────
  {
    kind: 'i2a',
    data: {
      variant: 'ongoing',
      topics: ['이란 전쟁'],
      title: '이란 전쟁, 3주간의 흐름',
      issueNo: 'No. 088',
      generatedAt: '오늘 9:20',
      rangeLabel: '4월 8일 ~ 4월 28일',
      basedOnCount: 132,
      brief:
        '4월 8일 호르무즈 봉쇄부터 미·이란 종전 협상 결렬, 한국 유조선 진입 성공, 이란 측 새 제안까지 — 3주간 호르무즈는 봉쇄→일부 통항→재협상 국면을 오가고 있어요. 현재 상태는 미해결입니다.',
      steps: [
        { marker: '4/8', title: '이란, 호르무즈 해협 완전 봉쇄', detail: '이란 매체 보도 — 통과 시도 유조선 회항. 국제유가 즉시 반응.', confidence: 'L1' },
        { marker: '4/12', title: '미·이란 1차 종전 협상 결렬', detail: '밴스 부통령 21시간 만에 귀국. "이란이 핵 포기 의사 없다"며 최후통첩.', confidence: 'L1' },
        { marker: '4/15', title: '호르무즈 일부 통항 재개', detail: '상선 20척 이상 통과 보도 — 다만 이란 지정 루트로만 제한적 진입.' },
        { marker: '4/17', title: '한국 관련 선박 26척 발 묶임', detail: '"호르무즈 정상화 언제쯤" — 호르무즈 안팎 한국 관련 선박 발 묶임 장기화.' },
        { marker: '4/22', title: '한국 실소유 유조선 2척 진입 성공', detail: '라이베리아·파나마 선적 유조선 2척, 페르시아만 진입 — 원유 미적재 상태.' },
        { marker: '4/27', title: '이란 "선 종전·후 핵협상" 3단계안 제시', detail: '파키스탄 등 중재국 통해 백악관에 전달. 트럼프 "불충분".', confidence: 'L3' },
        { marker: '오늘', date: '4/29', title: '호르무즈 통항 15척 제한 + 외교 채널 가동 보도', detail: '이란 외무부 발표. 외교 채널 가동 여부는 매체별로 보도 갈리고 있어요.', confidence: 'L4' },
      ],
      statusLabel: '외교 채널 가동 보도가 매체별로 갈리고 있어요. 호르무즈 정상화 합의는 협상 진행 중',
      sources: [
        SRC('이란 매체', 'iranintl', '이란 매체 "호르무즈 해협 완전 봉쇄…유조선 회항"', '21일 전'),
        SRC('YTN', 'ytn', '미·이란 종전 협상 결렬…밴스 21시간 만에 귀국길', '17일 전'),
        SRC('SBS', 'sbsi', '"미국의 호르무즈 봉쇄 이후 유조선 서쪽으로 첫 통과"', '14일 전'),
        SRC('YTN', 'ytn', '아직도 발 묶인 26척 선박…\'호르무즈 정상화\' 언제쯤?', '12일 전'),
        SRC('머니투데이', 'mt', '[단독] 韓선사 관련 유조선 2척…\'호르무즈 해협\' 진입 성공', '7일 전'),
        SRC('SBS', 'sbsi', '이란, \'선 종전·후 핵협상\' 제안…미 수용 여부는', '2일 전'),
        SRC('MBC 뉴스데스크', 'mbc', '"호르무즈 통항 선박, 하루 15척 제한"', '14분 전'),
      ],
    },
  },

  // ── I-3a · 다매체 논조 비교 분기형 (이란 전쟁) ───────────────
  {
    kind: 'i3a',
    data: {
      topics: ['이란 전쟁'],
      title: '이란 전쟁, 매체별 시각이 갈려요',
      issueNo: 'No. 037',
      generatedAt: '오늘 10:15',
      basedOnCount: 21,
      factHeadline: '이란 외무부가 호르무즈 통항 제한을 발표함',
      crossCheckRatio: '교차 확인 6/6',
      brief:
        '핵심 사실은 6개 매체 모두 동일하게 보도했지만, 이 조치를 어떻게 읽을지에서 매체 시각이 갈려요. 균등하게 보여드릴게요.',
      stances: [
        {
          outlet: '연합뉴스',
          outletLogoSeed: 'yna',
          framing: '이란 입장 우선 — 정당한 자위 조치',
          quote:
            '"이란 외무부는 미군 항모 진입에 대한 자위적 조치라고 설명했다."',
        },
        {
          outlet: '로이터',
          outletLogoSeed: 'reuters',
          framing: '미국 입장 우선 — 국제 통항권 침해',
          quote:
            '"U.S. State Department called it a clear violation of international navigation rights."',
        },
        {
          outlet: '한국경제',
          outletLogoSeed: 'hk',
          framing: '시장·경제 영향 우선 — 지정학 리스크 확대',
          quote:
            '"호르무즈 봉쇄 가능성에 WTI는 일중 +12%, 코스피는 -2.4%로 마감했다."',
        },
      ],
      sources: [
        SRC('연합뉴스', 'yna', '이란 "호르무즈 통항 제한, 자위적 조치"', '5시간 전'),
        SRC('로이터', 'reuters', 'U.S. condemns Iran\'s Hormuz traffic curbs', '4시간 전'),
        SRC('한국경제', 'hk', '호르무즈 봉쇄 우려에 유가·증시 동반 충격', '52분 전'),
        SRC('MBC 뉴스데스크', 'mbc', '"호르무즈 통항 선박, 하루 15척 제한"', '14분 전'),
        SRC('한겨레', 'hani', '美·이란, 비공식 접촉 재개… 외교 채널 가동', '2시간 전'),
        SRC('파이낸셜뉴스', 'fnnews', '"이란, 美에 종전 합의 후 핵협상 제안"', '23분 전'),
      ],
    },
  },

  // ── I-1b · 통합 다이제스트 ──────────────────────────────────
  {
    kind: 'i1b',
    data: {
      variant: 'integrated',
      topics: ['통합'],
      title: '오늘 당신의 관심사 5개, 한 호흡으로',
      issueNo: 'No. 142',
      generatedAt: '오늘 7:00',
      basedOnCount: 38,
      integratedKeywordCount: 5,
      brief:
        '오늘 당신의 관심사 5개 — 이란 전쟁 / 유가 / 주가 / 반도체 / 늑구 — 한 호흡으로 정리했어요. 펼치면 키워드별 핵심을 볼 수 있어요.',
      items: [
        {
          headline: '#이란 전쟁 — 호르무즈 통항 제한 발표',
          detail: '8개 매체 동시 보도, 매체별 시각은 분기 중. 보도량 평소 대비 ×4.2.',
          sources: ['연합뉴스', 'MBC', '한국경제'],
        },
        {
          headline: '#유가 — WTI 96달러 돌파',
          detail: '30일 평균 대비 ×1.13배. 호르무즈 봉쇄가 직격탄.',
          sources: ['한국경제'],
        },
        {
          headline: '#주가 — 코스피 -2.4%',
          detail: '외국인 매도 확대, 반도체·정유주는 상승 마감.',
          sources: ['인포스탁데일리'],
        },
        {
          headline: '#반도체 — HBM4 양산 본격화',
          detail: '삼성 \'최초\' / SK \'수율 안정\'. 엔비디아 수주 경쟁 본격화.',
          sources: ['글로벌이코노믹'],
        },
        {
          headline: '#늑구 — 오월드 근황 비공개 결정',
          detail: '시멘트 바닥·녹슨 철창 비판 후 사진·영상 촬영 중단.',
          sources: ['국민일보'],
        },
      ],
      sources: [
        SRC('연합뉴스', 'yna', '이란, 호르무즈 통항 하루 15척 제한 발표', '6시간 전'),
        SRC('한국경제', 'hk', 'WTI 96달러 돌파… 호르무즈 사실상 \'제로\'', '52분 전'),
        SRC('인포스탁데일리', 'infostock', '[0421마감체크] 코스피 -2.4%, 외국인 매도', '38분 전'),
        SRC('글로벌이코노믹', 'genews', 'HBM4 석 달, 삼성 \'최초\'·SK \'수율 안정\'', '1시간 전'),
        SRC('국민일보', 'kmib', '오월드 "늑구 근황 당분간 공개 안 할 것"', '2시간 전'),
      ],
    },
  },

  // ── I-2b · 종결 회고 (늑구) ──────────────────────────────
  {
    kind: 'i2b',
    data: {
      variant: 'closed',
      topics: ['늑구'],
      title: '늑구, 탈출에서 5월 휴장까지',
      issueNo: 'No. 084',
      generatedAt: '오늘 11:00',
      rangeLabel: '4월 8일 ~ 4월 28일',
      basedOnCount: 218,
      brief:
        '4월 8일 늑대사파리 탈출과 9일간의 추적, 4월 17일 새벽 무사 생포, 그리고 사육 환경 논쟁·동물원 5월 휴장까지 — 3주간 흐름을 정리했어요. 추적은 종결됐지만 사육 환경·재개장 쟁점은 진행 중이에요.',
      steps: [
        { marker: '4/8', date: '09:15', title: '늑대사파리 울타리 굴착 후 탈출', detail: '한국늑대(멸종위기 1급) 수컷 1마리. 자체 수색 우선·신고 1시간 지연 논란.', confidence: 'L1' },
        { marker: '4/10', title: '환경단체 사육 환경 문제 제기', detail: '대전충남녹색연합 등 합동 성명. 정형행동·시설 노후 비판.' },
        { marker: '4/12', title: '"닭 두 마리 먹고 5일째"… 수색 장기화', detail: '체력 한계 우려 제기, 도심 출몰 없이 산악 지대 추정.' },
        { marker: '4/13', title: '"동물원 자체에 자유를" 논의 확산', detail: '동물원 존재 의의·사육 환경 점검 사회적 논쟁으로 확장.' },
        { marker: '4/15', title: '"잡지 말고 놔뒀다면" 자연 공존 의견', detail: 'AI 합성 사진 유포로 수색 혼선까지 겹쳐 추적 난항.' },
        { marker: '4/16', date: '17:40', title: '뿌리공원 인근 시민 제보', detail: '늑구 추정 개체 목격, 추적팀 야간 잠복 진입.' },
        { marker: '4/17', date: '00:44', title: '안영동 IC 인근 무사 생포', detail: '위에서 2.6cm 낚싯바늘 발견 → 내시경 제거 → 격리장 회복 중.', confidence: 'L1' },
        { marker: '4/19', title: '대전시 대표 캐릭터 추진 검토', detail: '"꿈씨 패밀리에 늑구 합류" — 9일 추적이 시 캐릭터 논의로 전환.' },
        { marker: '4/22', title: '"3300억 원짜리 오월드 재창조" 과제', detail: '시설 개선·동물 복지 기준 재정립 요구 본격화.' },
        { marker: '4/23', title: '"시멘트 바닥 먹이" 비판 → 사진·영상 공개 중단', detail: 'AI 합성 사진 유포 40대 검거. 오월드, 늑구 노출 임시 중단.' },
        { marker: '4/24', title: '5월 재개장 불투명 — 입점 업체 속앓이', detail: '대전도시공사, 11개 업소에 5월 말까지 재개장 불가 통보.' },
        { marker: '오늘', date: '4/29', title: '어린이날 휴장 확정 — "어린이날 어디 가나"', detail: '늑구는 건강한데 오월드는 장기간 폐쇄. 5월 말 재개장 여부 추가 판단 예정.' },
      ],
      statusLabel: '탈출 추적은 9일 만에 종결. 사육 환경·5월 휴장 논의는 진행 중',
      postscript:
        '늑대 탈출 추적은 9일 만에 종결됐지만, 동물원 관리 부실·사육 환경 쟁점과 5월 휴장 결정은 여전히 진행 중이에요(2018년 퓨마 \'뽀롱이\' 사살 이후 두 번째 탈출).',
      sources: [
        SRC('대전MBC', 'tjmbc', '오월드 늑대 탈출, 자체 수색 1시간 후 신고', '21일 전'),
        SRC('굿모닝충청', 'goodmorning', '환경단체 "사육환경 근본 점검 필요"', '19일 전'),
        SRC('대전MBC', 'tjmbc', '"닭 두 마리 먹고 5일 굶었을 텐데"… 늑구 안 보여', '17일 전'),
        SRC('한겨레', 'hani', '늑대 탈출로 본 동물원의 현재… "동물에게 자유를"', '16일 전'),
        SRC('한국일보', 'hankooki', '\'늑구\' 잡지 말고 놔뒀다면… 자연에서 살고 인간과 공존?', '14일 전'),
        SRC('국민일보', 'kmib', '늑구 무사 생포, 위에서 낚싯바늘 발견', '12일 전'),
        SRC('굿모닝충청', 'goodmorning', '대전시, \'늑구\' 캐릭터 추진… "어린이날 전 오월드 개장 목표"', '10일 전'),
        SRC('중도일보', 'joongdo', '\'늑구\' 탈출이 던진 과제… "3300억 원짜리 오월드 재창조"', '7일 전'),
        SRC('경향신문', 'khan', '"왜 시멘트 바닥에 먹이"… 사진·영상 공개 중단', '6일 전'),
        SRC('대전일보', 'djilbo', '\'늑구\' 탈출 대전 오월드, 5월 재개장 불투명', '5일 전'),
        SRC('국민일보', 'kmib', '"늑구는 건강한데"… 오월드 장기간 폐쇄에 시민들 "어린이날 어디 가나"', '오늘 9시간 전'),
      ],
    },
  },

  // ── I-4a · 단일 주제 주간 리포트 (반도체) ───────────────────
  {
    kind: 'i4a',
    data: {
      variant: 'single',
      topics: ['반도체'],
      title: '반도체, 4월 4주차 종합',
      issueNo: 'Weekly · 04W4',
      generatedAt: '4월 28일 8:00',
      weekLabel: '4월 4주차',
      basedOnCount: 86,
      brief:
        '이번 주 반도체는 보도량이 +58% 늘었어요. HBM4 발표·수출 호조가 긍정 흐름을 만들었고, 다음 주 미 상무부 발표가 변수예요.',
      sections: [
        {
          heading: '§1 보도량 변화',
          body: '전주 대비 +58%. 주중 분포는 화·수에 집중, 금요일 다소 진정.',
          chart: [12, 15, 22, 28, 24, 18, 14],
        },
        {
          heading: '§2 핵심 이벤트',
          body:
            'HBM4 양산 본격화(삼성 \'최초\'·SK \'수율 안정\'), 4월 수출 잠정치 +28%, 미 수출 규제 추가 검토 보도 등장.',
        },
        {
          heading: '§3 논조 변화',
          body:
            '국내 매체는 긍정 우세(점유율·수출), 미국 매체는 우려 우세(공급망·규제). 한겨레·로이터 양쪽이 균형 보도 시도.',
        },
        {
          heading: '§4 다음 주 주목 포인트',
          body: '미 상무부 발표 예정 — 시기·범위는 매체별로 갈려요.',
          confidence: 'L3',
        },
      ],
      sources: [
        SRC('글로벌이코노믹', 'genews', 'HBM4 석 달, 삼성 \'최초\'·SK \'수율 안정\'', '4일 전'),
        SRC('한국경제', 'hk', '4월 수출 잠정치 +28%… 반도체가 견인', '3일 전'),
        SRC('로이터', 'reuters', 'U.S. weighs additional chip export curbs', '2일 전'),
        SRC('한겨레', 'hani', '美 추가 수출 규제 검토 — 한국 영향 평가는', '1일 전'),
      ],
    },
  },

  // ── I-6a · 직접 교차 (이란 전쟁 × 유가) ─────────────────────
  {
    kind: 'i6a',
    data: {
      variant: 'direct',
      topics: ['이란 전쟁', '유가'],
      title: '이란 전쟁 × 유가, 같은 이슈에서 만났어요',
      issueNo: 'Cross · 015',
      generatedAt: '오늘 11:30',
      basedOnCount: 33,
      topicA: '이란 전쟁',
      topicB: '유가',
      intersection: '호르무즈 통항 제한 → 국제유가 일중 +12%',
      brief:
        '두 주제가 같은 이슈에서 만났어요. 이번 변동은 단기 충격이라는 보도가 우세하지만, 지속 시 한국 주가에도 전이 가능성이 있다고 다뤄지고 있어요.',
      flow: [
        { side: 'a', label: '이란 전쟁 맥락', body: '이란 외무부의 호르무즈 통항 제한 조치(15척) — 미군 항모 진입에 대응한 자위적 조치로 발표됐어요.' },
        { side: 'cross', label: '교차점', body: '통항 제한 발표 직후 4시간 만에 WTI 96달러 돌파, 일중 +12%. 30일 평균 대비 ×1.13배 변동.' },
        { side: 'b', label: '유가 맥락', body: '한국 정유주는 상승, 항공·해운주는 하락. 산업부는 비축유 방출 검토 시사 — 매체별로 시기 분기.' },
      ],
      implication:
        '이번 변동은 단기 충격에 가깝다는 보도가 우세하나, 지속 시 한국 주가에도 전이 가능성이 보도되고 있어요.',
      confidence: 'L3',
      sources: [
        SRC('MBC 뉴스데스크', 'mbc', '"호르무즈 통항 선박, 하루 15척 제한"', '14분 전'),
        SRC('한국경제', 'hk', 'WTI 96달러 돌파… 호르무즈 사실상 \'제로\'', '52분 전'),
        SRC('인포스탁데일리', 'infostock', '정유주 상승 vs 항공·해운주 하락', '2시간 전'),
        SRC('연합뉴스', 'yna', '산업부, 비축유 방출 검토 시사', '4시간 전'),
      ],
    },
  },

  // ── I-10a · 정책·제도 쟁점 (반도체 수출 규제) ──────────────
  {
    kind: 'i10a',
    data: {
      variant: 'policy',
      topics: ['반도체', '수출 규제'],
      title: '한국의 미 수출 규제 동조, 어디까지?',
      issueNo: 'Map · 009',
      generatedAt: '오늘 14:00',
      basedOnCount: 41,
      question: '한국이 미국 수출 규제에 어디까지 동조해야 하는가',
      brief:
        '쟁점은 두 축으로 갈려 있어요 — 경제 효과와 동맹 관계. 매체와 행위자가 어떤 사분면에 있는지 표시했어요. 답은 아직입니다.',
      axisX: { high: '경제 효과 ↑', low: '경제 효과 ↓' },
      axisY: { high: '동맹 관계 ↑', low: '동맹 관계 ↓' },
      positions: [
        { quadrant: 2, label: '정부 일부', detail: '동맹 우선·경제 일부 감수' },
        { quadrant: 1, label: '산업계 다수', detail: '경제 우선·수위 조절' },
        { quadrant: 3, label: '야당 다수', detail: '동맹 재검토·경제 우선' },
      ],
      unresolvedQuestions: [
        '단기 수출 충격 규모는 어디까지인가',
        '한국 협상력의 실효성은 측정 가능한가',
      ],
      sources: [
        SRC('로이터', 'reuters', 'U.S. weighs additional chip export curbs', '2일 전'),
        SRC('한겨레', 'hani', '"동맹 재검토 필요" — 야당 입장', '1일 전'),
        SRC('한국경제', 'hk', '산업계 "수위 조절 필요" 응답 다수', '3일 전'),
      ],
    },
  },

  // ── I-30a · 단일 주제 위클리 딥다이브 (반도체) ─────────────
  {
    kind: 'i30a',
    data: {
      variant: 'single',
      topics: ['반도체'],
      title: '이번 주 반도체, 차분히 들어보세요',
      issueNo: 'Audio · EP.31',
      generatedAt: '4월 28일 7:30',
      weekLabel: '4월 4주차',
      basedOnCount: 86,
      totalDuration: '약 11분',
      brief:
        '이번 주 반도체를 차분히 들어보세요. HBM4와 미 수출 규제 검토를 챕터별로 나눴어요.',
      chapters: [
        { title: '보도량 변화', duration: '2:10' },
        { title: 'HBM4와 시장', duration: '3:40' },
        { title: '미 수출 규제 검토', duration: '2:20' },
        { title: '다음 주 주목 포인트', duration: '2:30' },
      ],
    },
  },

  // ── I-10b · 가치 충돌 (상괭이 × 아쿠아리움) ────────────────
  {
    kind: 'i10b',
    data: {
      variant: 'value',
      topics: ['상괭이', '아쿠아리움'],
      title: '구조된 상괭이의 사육·전시, 정당한가',
      issueNo: 'Map · 010',
      generatedAt: '오늘 15:20',
      basedOnCount: 27,
      question:
        '구조된 멸종위기 상괭이를 아쿠아리움에서 사육·전시하는 것의 정당성',
      brief:
        '쟁점은 보전 효과와 동물 복지 두 축으로 갈려요. 사분면에 입장을 매핑했고, 시민 여론은 분포 자체가 갈리고 있어요.',
      axisX: { high: '보전 효과 ↑', low: '보전 효과 ↓' },
      axisY: { high: '동물 복지 ↑', low: '동물 복지 ↓' },
      positions: [
        { quadrant: 3, label: '환경단체 다수', detail: '보전 효과 의문 + 복지 침해 가능성' },
        { quadrant: 1, label: '시설·교육계 일부', detail: '보전 효과 인정 + 복지 보장 가능 주장' },
        { quadrant: 2, label: '시민 여론', detail: '분기 중 — 사분면 분포 다양' },
      ],
      unresolvedQuestions: [
        '전시와 보호의 경계는 어디인가',
        '상괭이 회복률에 대한 데이터가 충분한가',
      ],
      sources: [
        SRC('경인일보', 'kyeongin', '상괭이 5년 폐사 3,839마리…보호 기준 도마', '6일 전'),
        SRC('YTN', 'ytn', '대전 오월드, 다음 달 말쯤 재개장 여부 판단', '2시간 전'),
        SRC('한겨레', 'hani', '환경단체 "사육·전시는 보전 아닌 소모"', '4일 전'),
      ],
    },
  },

  // ── I-4b · 포트폴리오 종합 주간 ────────────────────────────
  {
    kind: 'i4b',
    data: {
      variant: 'portfolio',
      topics: ['포트폴리오'],
      title: '이번 주 7개 키워드, 한눈에',
      issueNo: 'Weekly · 04W4',
      generatedAt: '4월 28일 8:00',
      weekLabel: '4월 4주차',
      basedOnCount: 312,
      brief:
        '이번 주 7개 키워드를 종합했어요. 가장 활발한 주제는 늑구·이란 전쟁, 가장 조용한 주제는 아쿠아리움이었어요.',
      sections: [
        {
          heading: '§1 가장 활발한 키워드',
          body:
            '#늑구 (보도량 +1,800% — 탈출·생포 사이클) / #이란 전쟁 (+220%) — 두 키워드가 주중 보도의 절반 가까이 차지.',
        },
        {
          heading: '§2 새로 교차된 페어',
          body:
            '이란 전쟁 × 유가 × 주가, 늑구 × 아쿠아리움(사육 환경) — 두 페어가 이번 주 새로 묶인 흐름이에요.',
        },
        {
          heading: '§3 다음 주 주목 포인트',
          body:
            '미 상무부 발표·이란 외교 채널·오월드 재개장 일정. 시기·범위는 매체별로 갈려요.',
          confidence: 'L3',
        },
      ],
      matrix: [
        { keyword: '이란 전쟁', volumeChange: '+220%', tone: 'up', series: [4, 6, 8, 12, 16, 22, 28] },
        { keyword: '주가', volumeChange: '-12%', tone: 'down', series: [22, 20, 18, 16, 17, 15, 14] },
        { keyword: '유가', volumeChange: '+95%', tone: 'up', series: [10, 12, 15, 18, 20, 22, 24] },
        { keyword: '반도체', volumeChange: '+58%', tone: 'up', series: [12, 15, 22, 28, 24, 18, 14] },
        { keyword: '상괭이', volumeChange: '+8%', tone: 'flat', series: [8, 9, 7, 8, 10, 8, 9] },
        { keyword: '아쿠아리움', volumeChange: '±0%', tone: 'flat', series: [5, 6, 5, 5, 6, 5, 5] },
        { keyword: '늑구', volumeChange: '+1,800%', tone: 'up', series: [2, 18, 65, 90, 120, 80, 45] },
      ],
      sources: [
        SRC('연합뉴스', 'yna', '이란 호르무즈 통항 제한 — 5일간 흐름 정리', '3일 전'),
        SRC('한국경제', 'hk', 'WTI 96달러 돌파… 호르무즈 사실상 \'제로\'', '52분 전'),
        SRC('국민일보', 'kmib', '늑구 9박 10일 추적 종합', '1일 전'),
        SRC('글로벌이코노믹', 'genews', 'HBM4 석 달, 삼성 \'최초\'·SK \'수율 안정\'', '4일 전'),
      ],
    },
  },

  // ── I-30b · 종합 위클리 딥다이브 ────────────────────────────
  {
    kind: 'i30b',
    data: {
      variant: 'integrated',
      topics: ['종합'],
      title: '이번 주 7개 키워드, 한 회차로 듣기',
      issueNo: 'Audio · EP.32',
      generatedAt: '4월 28일 7:30',
      weekLabel: '4월 4주차',
      basedOnCount: 312,
      totalDuration: '약 12분',
      brief:
        '이번 주 7개 키워드를 한 회차로 들어보세요. 챕터 마커로 원하는 부분만 골라들을 수도 있어요.',
      chapters: [
        { title: '이란 전쟁', duration: '2:10' },
        { title: '유가·주가 페어', duration: '2:40' },
        { title: '반도체', duration: '2:20' },
        { title: '상괭이·아쿠아리움', duration: '1:40' },
        { title: '늑구 — 9박 10일 탈출', duration: '1:30' },
        { title: '다음 주 주목 포인트', duration: '1:40' },
      ],
    },
  },
];
