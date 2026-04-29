import { Fragment, useState, type ReactNode } from 'react';
import {
  Bookmark,
  ChevronDown,
  ChevronUp,
  CornerDownRight,
  Headphones,
  Layers,
  Map,
  Network,
  Newspaper,
  Play,
  Scale,
  Share2,
  Sparkles,
  ThumbsDown,
  ThumbsUp,
} from 'lucide-react';
import { cn } from '@/lib/cn';
import { placeholderImg } from '@/lib/img';
import { useMaiPlayer } from '../news/MaiPlayer';
import type {
  Confidence,
  CrossIssueData,
  DailyDigestData,
  DeepdiveAudioData,
  IssueFlowData,
  IssueMapData,
  IssuePosition,
  MultiOutletData,
  SourceRef,
  WeeklyReportData,
} from '@/mocks/maiIssue';

/* ─────────── 공통 토큰 ─────────── */

const FOOTER_AI = 'text-[10px] text-gray-400 tracking-wide';
const TOPIC_CHIP =
  'inline-flex items-center px-2 py-[3px] rounded-chip bg-[#374151] text-[11px] text-white font-medium';

const NOTE_KIND_META = {
  daily: { label: '이슈 딥 다이브', color: '#7E57C2', tint: '#F5EFFC', icon: Sparkles },
  flow: { label: '이슈 흐름 정리', color: '#3D6EE0', tint: '#EBF1FE', icon: Network },
  multi: { label: '다매체 논조 비교', color: '#E89B2A', tint: '#FDF4E5', icon: Scale },
  weekly: { label: '주간 리포트', color: '#3FA46A', tint: '#EAF6EF', icon: Layers },
  cross: { label: '교차 이슈 분석', color: 'gradient', tint: 'cross-gradient', icon: CornerDownRight },
  map: { label: '쟁점 구조도', color: '#5A7A8C', tint: '#EFF3F5', icon: Map },
  audio: { label: '위클리 딥다이브', color: '#3FA46A', tint: '#EAF6EF', icon: Headphones },
} as const;

type NoteKind = keyof typeof NOTE_KIND_META;

/** 카드 내부 사각형 콘텐츠 박스의 배경. 카드 종류 컬러의 옅은 틴트. */
function tintBg(kind: NoteKind) {
  const tint = NOTE_KIND_META[kind].tint;
  if (tint === 'cross-gradient') {
    return { background: 'linear-gradient(135deg,#F5EFFC,#EBF1FE)' };
  }
  return { background: tint };
}

const CONFIDENCE_PCT: Record<Confidence, string> = {
  L1: '95%',
  L2: '80%',
  L3: '60%',
  L4: '40%',
  L5: '20%',
};

const CONFIDENCE_TONE: Record<Confidence, string> = {
  L1: 'bg-emerald-50 text-emerald-700',
  L2: 'bg-sky-50 text-sky-700',
  L3: 'bg-amber-50 text-amber-700',
  L4: 'bg-orange-50 text-orange-700',
  L5: 'bg-[#F1ECE0] text-[#5C5340]',
};

function ConfidenceTag({ level, suffix }: { level: Confidence; suffix?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-1.5 py-[2px] rounded-md text-[10.5px] font-semibold',
        CONFIDENCE_TONE[level],
      )}
    >
      <span>
        확신도 <span className="tabular-nums">{CONFIDENCE_PCT[level]}</span>
      </span>
      {suffix ? <span className="font-normal opacity-80">· {suffix}</span> : null}
    </span>
  );
}

function TopicChips({ topics }: { topics: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-1">
      {topics.map((t) => (
        <span key={t} className={TOPIC_CHIP}>#{t}</span>
      ))}
    </div>
  );
}

/* ─────────── IssueCard 공통 셸 ───────────
 * border-top 컬러로 노트 유형 식별 (§1.7)
 * 헤더: 주제 칩 + 노트 유형 라벨 + 생성 시각 + 기사 N건 기반
 * 풋터: AI 생성 표시 + 👍/👎
 * 본문: 자식 ReactNode (펼침/접힘은 슬롯별로 다르게 처리하지 않음 — 공통)
 */

function NoteHeader({
  kind,
  topics,
  title,
  generatedAt,
  basedOnCount,
  labelOverride,
}: {
  kind: NoteKind;
  topics: string[];
  title: string;
  generatedAt: string;
  basedOnCount: number;
  labelOverride?: string;
}) {
  const meta = NOTE_KIND_META[kind];
  const Icon = meta.icon;
  const colorStyle = meta.color === 'gradient' ? '#7E57C2' : meta.color;
  const label = labelOverride ?? meta.label;
  const accentBg =
    meta.color === 'gradient'
      ? { background: 'linear-gradient(180deg,#7E57C2,#3D6EE0)' }
      : { background: colorStyle };
  return (
    <header className="px-5 pt-5 pb-3">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5">
          <span
            className="block w-[3px] h-[18px] rounded-sm shrink-0"
            style={accentBg}
            aria-hidden
          />
          <span
            className="inline-flex items-center justify-center w-[18px] h-[18px] rounded-md shrink-0"
            style={accentBg}
            aria-hidden
          >
            <Icon size={11} className="text-white" strokeWidth={2.6} />
          </span>
          <span
            className="text-[12px] font-extrabold tracking-tight"
            style={{ color: colorStyle }}
          >
            {label}
          </span>
        </span>
        <TopicChips topics={topics} />
      </div>
      <h2 className="mt-3.5 text-[17px] font-bold leading-snug text-[#1F1B14] tracking-tight">
        {title}
      </h2>
      <p className="mt-2 text-[11px] text-[#8A7E66] tracking-wide">
        <span className="tabular-nums">{generatedAt}</span>
        <span className="text-[#D6CDB6]"> · </span>
        기사 <span className="tabular-nums">{basedOnCount}</span>건 기반
      </p>
    </header>
  );
}

function NoteFooter({ extraStart }: { extraStart?: ReactNode }) {
  const [vote, setVote] = useState<'up' | 'down' | null>(null);
  const [saved, setSaved] = useState(false);
  return (
    <div className="bg-gray-50 px-5 py-2.5 flex items-center gap-3">
      <p className={FOOTER_AI}>
        <Sparkles size={9} className="inline -mt-px mr-1 opacity-60" />
        AI가 정리한 콘텐츠입니다
      </p>
      {extraStart ? <span className="text-gray-300">·</span> : null}
      {extraStart}
      <span className="flex-1" />
      <button
        type="button"
        aria-label="저장"
        aria-pressed={saved}
        onClick={() => setSaved((s) => !s)}
        className={cn(
          'flex items-center gap-1 text-[12px] transition-colors',
          saved ? 'text-gray-900 font-semibold' : 'text-gray-500',
        )}
      >
        <Bookmark size={13} fill={saved ? 'currentColor' : 'none'} />
      </button>
      <button
        type="button"
        aria-label="공유"
        className="flex items-center gap-1 text-[12px] text-gray-500"
      >
        <Share2 size={13} />
      </button>
      <div className="flex items-center gap-1.5 ml-1">
        <button
          type="button"
          aria-label="도움됨"
          aria-pressed={vote === 'up'}
          onClick={() => setVote((v) => (v === 'up' ? null : 'up'))}
          className={cn(
            'inline-flex items-center justify-center w-7 h-7 rounded-full border transition-colors',
            vote === 'up'
              ? 'border-[#3D6EE0] bg-sky-50 text-[#1F5FCA]'
              : 'border-gray-200 text-gray-500',
          )}
        >
          <ThumbsUp size={12} fill={vote === 'up' ? 'currentColor' : 'none'} />
        </button>
        <button
          type="button"
          aria-label="도움 안 됨"
          aria-pressed={vote === 'down'}
          onClick={() => setVote((v) => (v === 'down' ? null : 'down'))}
          className={cn(
            'inline-flex items-center justify-center w-7 h-7 rounded-full border transition-colors',
            vote === 'down'
              ? 'border-[#C0413E] bg-rose-50 text-[#A2362F]'
              : 'border-gray-200 text-gray-500',
          )}
        >
          <ThumbsDown size={12} fill={vote === 'down' ? 'currentColor' : 'none'} />
        </button>
      </div>
    </div>
  );
}

function IssueCard({
  kind,
  topics,
  title,
  generatedAt,
  basedOnCount,
  children,
  footerStart,
  labelOverride,
}: {
  kind: NoteKind;
  topics: string[];
  title: string;
  generatedAt: string;
  basedOnCount: number;
  children: ReactNode;
  footerStart?: ReactNode;
  labelOverride?: string;
}) {
  return (
    <article className="relative bg-white">
      <NoteHeader
        kind={kind}
        topics={topics}
        title={title}
        generatedAt={generatedAt}
        basedOnCount={basedOnCount}
        labelOverride={labelOverride}
      />
      <div className="px-5 pb-3">{children}</div>
      <NoteFooter extraStart={footerStart} />
    </article>
  );
}

/* ─────────── ExpandToggle ─────────── */

function ExpandToggle({
  expanded,
  onToggle,
  expandLabel = '전체 리포트 읽기',
  collapseLabel = '접기',
}: {
  expanded: boolean;
  onToggle: () => void;
  expandLabel?: string;
  collapseLabel?: string;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={expanded}
      className="mt-1 inline-flex items-center gap-1 px-2.5 py-1 -ml-2.5 rounded-md text-[12px] text-[#5C5340] font-semibold tracking-wide hover:bg-[#F1ECE0] transition-colors"
    >
      {expanded ? (
        <>
          {collapseLabel} <ChevronUp size={13} strokeWidth={2.4} />
        </>
      ) : (
        <>
          {expandLabel} <ChevronDown size={13} strokeWidth={2.4} />
        </>
      )}
    </button>
  );
}

/* ─────────── 근거 기사 블록 ─────────── */

function SourceBlock({ sources }: { sources: SourceRef[] }) {
  return (
    <section className="mt-3 mb-2 rounded-md bg-gray-50 px-3.5 py-3">
      <p className="text-[10.5px] font-bold uppercase tracking-[0.08em] text-gray-500">
        근거 · 기사 {sources.length}건
      </p>
      <ul className="mt-2 space-y-2">
        {sources.map((s, i) => (
          <li key={i} className="flex items-start gap-2">
            <img
              src={placeholderImg(s.publisherLogoSeed, 48, 48, 'logo,square')}
              alt=""
              width={20}
              height={20}
              className="w-5 h-5 rounded-sm bg-white object-cover shrink-0 mt-0.5"
              draggable={false}
            />
            <div className="flex-1 min-w-0">
              <p className="text-[12px] text-[#1F1B14] leading-snug line-clamp-1">
                {s.title}
              </p>
              <p className="mt-0.5 text-[11px] text-[#8A7E66]">
                {s.publisher} · {s.elapsed}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ─────────── I-1 데일리 다이제스트 (a 단일 / b 통합) ─────────── */

/** 통합 다이제스트 본문 헤드라인에서 "#키워드 — 설명" 패턴을 분리해 키워드를 볼드로. */
function renderIntegratedHeadline(headline: string) {
  const sep = ' — ';
  const idx = headline.indexOf(sep);
  if (idx === -1) return headline;
  const prefix = headline.slice(0, idx);
  const rest = headline.slice(idx + sep.length);
  return (
    <>
      <span className="font-extrabold">{prefix}</span>
      <span className="text-[#5C5340]">
        {sep}
        {rest}
      </span>
    </>
  );
}

export function I1DailyDigest({ data }: { data: DailyDigestData }) {
  const [expanded, setExpanded] = useState(false);
  const integrated = data.variant === 'integrated';
  return (
    <IssueCard
      kind="daily"
      topics={data.topics}
      title={data.title}
      generatedAt={data.generatedAt}
      basedOnCount={data.basedOnCount}
      labelOverride={integrated ? '이슈 통합 다이브' : undefined}
    >
      <p className="text-[14px] text-[#3D362A] leading-[1.7]">{data.brief}</p>
      <ExpandToggle expanded={expanded} onToggle={() => setExpanded((e) => !e)} />
      {expanded ? (
        <div className="mt-2 space-y-3">
          <ul className="space-y-2.5">
            {data.items.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-[#7E57C2] shrink-0" aria-hidden />
                <div className="flex-1 min-w-0">
                  <p
                    className={cn(
                      'text-[13.5px] text-[#1F1B14] leading-snug',
                      integrated ? 'text-[13px] font-medium' : 'font-semibold',
                    )}
                  >
                    {integrated ? renderIntegratedHeadline(item.headline) : item.headline}
                  </p>
                  <p className="mt-0.5 text-[12.5px] text-[#3D362A] leading-relaxed">
                    {item.detail}
                  </p>
                  <p className="mt-1 text-[11px] text-[#8A7E66]">
                    {item.sources.map((s, si) => (
                      <Fragment key={si}>
                        {si > 0 ? <span className="text-[#D6CDB6]"> · </span> : null}
                        <span className="underline decoration-[#D6CDB6] underline-offset-2">
                          {s}
                        </span>
                      </Fragment>
                    ))}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <SourceBlock sources={data.sources} />
        </div>
      ) : null}
    </IssueCard>
  );
}

/* ─────────── I-2 이슈 흐름 정리 (a 진행 중 / b 종결) ─────────── */

export function I2IssueFlow({ data }: { data: IssueFlowData }) {
  const [expanded, setExpanded] = useState(false);
  const ongoing = data.variant === 'ongoing';
  return (
    <IssueCard
      kind="flow"
      topics={data.topics}
      title={data.title}
      generatedAt={data.generatedAt}
      basedOnCount={data.basedOnCount}
    >
      <div className="flex items-center gap-1.5 text-[11px] text-[#8A7E66]">
        <span>{data.rangeLabel}</span>
        <span className="text-[#D6CDB6]">·</span>
        <span
          className={cn(
            'inline-flex items-center px-1.5 py-[2px] rounded-md text-[10.5px] font-semibold',
            ongoing
              ? 'bg-orange-50 text-orange-700'
              : 'bg-[#F1ECE0] text-[#5C5340]',
          )}
        >
          {ongoing ? '미해결 · 진행 중' : '종결 회고'}
        </span>
      </div>
      <p className="mt-2 text-[14px] text-[#3D362A] leading-[1.7]">{data.brief}</p>
      <ExpandToggle expanded={expanded} onToggle={() => setExpanded((e) => !e)} />
      {expanded ? (
        <div className="mt-3">
          <ol className="relative pl-5">
            <span
              className="absolute left-1 top-2 bottom-2 w-px bg-[#BBD0F4]"
              aria-hidden
            />
            {data.steps.map((step, i) => {
              const last = i === data.steps.length - 1;
              const dotClass = ongoing && last
                ? 'bg-[#3D6EE0] shadow-[0_0_0_3px_rgba(61,110,224,0.18)]'
                : !ongoing && last
                  ? 'bg-[#3D6EE0]'
                  : 'bg-white border-2 border-[#3D6EE0]';
              return (
                <li key={i} className="relative pb-3.5 last:pb-0">
                  <span
                    className={cn('absolute -left-5 top-1 w-[9px] h-[9px] rounded-full', dotClass)}
                    aria-hidden
                  />
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-[11px] font-bold text-[#1F1B14] tabular-nums">
                      {step.marker}
                    </span>
                    {step.date ? (
                      <span className="text-[10.5px] text-[#A89B83]">{step.date}</span>
                    ) : null}
                    {step.confidence ? <ConfidenceTag level={step.confidence} /> : null}
                  </div>
                  <p className="mt-0.5 text-[13px] font-semibold text-[#1F1B14] leading-snug">
                    {step.title}
                  </p>
                  {step.detail ? (
                    <p className="mt-0.5 text-[12px] text-[#5C5340] leading-relaxed">
                      {step.detail}
                    </p>
                  ) : null}
                </li>
              );
            })}
          </ol>
          <div
            className={cn(
              'mt-2 rounded-md px-3 py-2.5',
              ongoing ? 'bg-amber-50' : 'bg-emerald-50',
            )}
          >
            <p
              className={cn(
                'text-[10.5px] font-semibold tracking-wide',
                ongoing ? 'text-amber-700' : 'text-emerald-700',
              )}
            >
              현재 상태
            </p>
            <div className="mt-0.5 flex items-baseline gap-2 flex-wrap">
              <span
                className={cn(
                  'text-[14px] font-extrabold',
                  ongoing ? 'text-amber-700' : 'text-emerald-700',
                )}
              >
                {ongoing ? '미해결' : '해결'}
              </span>
              {data.statusLabel ? (
                <span className="text-[12px] text-[#3D362A] leading-relaxed">
                  {data.statusLabel}
                </span>
              ) : null}
            </div>
          </div>
          {data.postscript ? (
            <p className="mt-2 text-[12px] text-[#5C5340] leading-relaxed">
              {data.postscript}
            </p>
          ) : null}
          <SourceBlock sources={data.sources} />
        </div>
      ) : null}
    </IssueCard>
  );
}

/* ─────────── I-3a 다매체 논조 비교 ─────────── */

export function I3MultiOutlet({ data }: { data: MultiOutletData }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <IssueCard
      kind="multi"
      topics={data.topics}
      title={data.title}
      generatedAt={data.generatedAt}
      basedOnCount={data.basedOnCount}
    >
      <div className="rounded-md px-3 py-2.5" style={tintBg('multi')}>
        <div className="flex items-center gap-1.5 text-[10.5px] text-[#B36F0F] font-semibold tracking-wide">
          <Newspaper size={11} strokeWidth={2.4} />
          핵심 사실 ({data.crossCheckRatio})
        </div>
        <p className="mt-1 text-[13px] text-[#1F1B14] font-semibold leading-snug">
          {data.factHeadline}
        </p>
      </div>
      <p className="mt-3 text-[14px] text-[#3D362A] leading-[1.7]">{data.brief}</p>
      <ExpandToggle expanded={expanded} onToggle={() => setExpanded((e) => !e)} />
      {expanded ? (
        <div className="mt-3 space-y-2">
          {data.stances.map((s, i) => {
            const sep = ' — ';
            const idx = s.framing.indexOf(sep);
            const chip = idx > -1 ? s.framing.slice(0, idx) : null;
            const titleText = idx > -1 ? s.framing.slice(idx + sep.length) : s.framing;
            const c = STANCE_CHIP_COLORS[i % STANCE_CHIP_COLORS.length];
            return (
              <div
                key={i}
                className="rounded-md border border-gray-200 bg-white px-3 py-2.5"
              >
                <div className="flex items-center gap-2 flex-wrap">
                  {chip ? (
                    <span
                      className={cn(
                        'inline-flex items-center px-2 py-[3px] rounded-md text-[10.5px] font-bold shrink-0',
                        c.bg,
                        c.text,
                      )}
                    >
                      {chip}
                    </span>
                  ) : null}
                  <p className="text-[13.5px] text-[#1F1B14] font-bold leading-snug">
                    {titleText}
                  </p>
                </div>
                <div className="mt-1.5 flex items-center gap-1.5">
                  <img
                    src={placeholderImg(s.outletLogoSeed, 48, 48, 'logo,square')}
                    alt=""
                    width={14}
                    height={14}
                    className="w-[14px] h-[14px] rounded-sm bg-gray-100 object-cover"
                    draggable={false}
                  />
                  <span className="text-[11px] text-[#8A7E66]">{s.outlet}</span>
                </div>
                <p className="mt-1.5 text-[12px] text-[#5C5340] leading-relaxed">
                  {s.quote}
                </p>
              </div>
            );
          })}
          <SourceBlock sources={data.sources} />
        </div>
      ) : null}
    </IssueCard>
  );
}

const STANCE_CHIP_COLORS = [
  { bg: 'bg-sky-100', text: 'text-sky-700' },
  { bg: 'bg-rose-100', text: 'text-rose-700' },
  { bg: 'bg-amber-100', text: 'text-amber-700' },
  { bg: 'bg-emerald-100', text: 'text-emerald-700' },
  { bg: 'bg-violet-100', text: 'text-violet-700' },
] as const;

/* ─────────── I-4 주간 리포트 (a 단일 / b 포트폴리오) ─────────── */

const WEEKDAY_LABELS = ['월', '화', '수', '목', '금', '토', '일'];

function MiniBars({ data }: { data: number[] }) {
  if (data.length === 0) return null;
  const max = Math.max(...data);
  return (
    <div className="mt-3.5 mb-2">
      <div className="flex items-stretch gap-2">
        {/* Y-axis */}
        <div className="flex flex-col justify-between text-[9.5px] text-[#A89B83] tabular-nums py-0.5 w-5 text-right shrink-0">
          <span>{max}</span>
          <span>{Math.round(max / 2)}</span>
          <span>0</span>
        </div>
        {/* Chart area */}
        <div className="flex-1 relative h-24 pb-0.5">
          {/* gridlines */}
          <span className="absolute inset-x-0 top-0 h-px bg-gray-100" aria-hidden />
          <span className="absolute inset-x-0 top-1/2 h-px bg-gray-100" aria-hidden />
          <span className="absolute inset-x-0 bottom-0 h-px bg-gray-200" aria-hidden />
          {/* Bars */}
          <div className="absolute inset-0 flex items-end gap-1.5 px-0.5">
            {data.map((v, i) => {
              const h = (v / max) * 100;
              const isPeak = v === max;
              return (
                <div
                  key={i}
                  className="flex-1 flex flex-col items-center justify-end h-full"
                >
                  <span
                    className={cn(
                      'text-[9.5px] tabular-nums mb-0.5 leading-none',
                      isPeak ? 'text-emerald-700 font-bold' : 'text-[#A89B83]',
                    )}
                  >
                    {v}
                  </span>
                  <div
                    className={cn(
                      'w-full rounded-t-sm',
                      isPeak ? 'bg-[#3FA46A]' : 'bg-emerald-200',
                    )}
                    style={{ height: `${Math.max(6, h * 0.78)}%` }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* X-axis */}
      <div className="flex gap-1.5 mt-1.5 pl-7 px-0.5">
        {data.map((_, i) => (
          <span
            key={i}
            className="flex-1 text-center text-[10px] text-[#A89B83]"
          >
            {WEEKDAY_LABELS[i] ?? `${i + 1}`}
          </span>
        ))}
      </div>
    </div>
  );
}

function parseChange(s: string): number {
  if (s.includes('±')) return 0;
  const cleaned = s.replace(/[+,%\s]/g, '').trim();
  const value = parseFloat(cleaned);
  return Number.isNaN(value) ? 0 : value;
}

function MatrixBars({ matrix }: { matrix: NonNullable<WeeklyReportData['matrix']> }) {
  return (
    <div className="mt-1.5 rounded-md border border-gray-200 overflow-hidden">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50 text-[10.5px] font-semibold uppercase tracking-[0.06em] text-[#8A7E66]">
            <th scope="col" className="text-left px-3 py-2 font-semibold">
              키워드
            </th>
            <th scope="col" className="text-right px-3 py-2 font-semibold">
              보도량 (전주 대비)
            </th>
          </tr>
        </thead>
        <tbody>
          {matrix.map((row) => {
            const total = row.series.reduce((s, v) => s + v, 0);
            const raw = parseChange(row.volumeChange);
            const isPositive = raw > 0;
            const isFlat = raw === 0;
            const toneColor = isPositive
              ? 'text-emerald-700'
              : isFlat
                ? 'text-[#A89B83]'
                : 'text-rose-700';
            const arrow = isPositive ? '▲' : isFlat ? '–' : '▼';
            return (
              <tr
                key={row.keyword}
                className="border-t border-gray-100"
              >
                <td className="px-3 py-2 text-[12.5px] font-semibold text-[#2A2419] whitespace-nowrap">
                  #{row.keyword}
                </td>
                <td className="px-3 py-2 text-right tabular-nums text-[12px] whitespace-nowrap">
                  <span className="text-[#2A2419] font-semibold">
                    {total.toLocaleString()}
                    <span className="text-[#A89B83] font-normal ml-0.5">건</span>
                  </span>
                  <span className={cn('ml-1.5 font-semibold', toneColor)}>
                    (
                    <span className="text-[10px] mr-0.5" aria-hidden>
                      {arrow}
                    </span>
                    {row.volumeChange})
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export function I4WeeklyReport({ data }: { data: WeeklyReportData }) {
  const [expanded, setExpanded] = useState(false);
  const isSingle = data.variant === 'single';
  return (
    <IssueCard
      kind="weekly"
      topics={data.topics}
      title={data.title}
      generatedAt={data.generatedAt}
      basedOnCount={data.basedOnCount}
      labelOverride={isSingle ? '이슈별 주간 리포트' : undefined}
    >
      <p className="text-[11px] text-[#8A7E66]">{data.weekLabel}</p>
      <p className="mt-2 text-[14px] text-[#3D362A] leading-[1.7]">{data.brief}</p>
      <ExpandToggle expanded={expanded} onToggle={() => setExpanded((e) => !e)} />
      {expanded ? (
        <div className="mt-3 space-y-3">
          {data.sections.map((sec, i) => (
            <section key={i}>
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="text-[12px] font-bold text-[#3FA46A]">{sec.heading}</h4>
                {sec.confidence ? <ConfidenceTag level={sec.confidence} /> : null}
              </div>
              <p className="mt-1 text-[12.5px] text-[#2A2419] leading-relaxed">{sec.body}</p>
              {sec.chart ? <MiniBars data={sec.chart} /> : null}
            </section>
          ))}
          {data.matrix ? (
            <section>
              <h4 className="text-[12px] font-bold text-[#3FA46A]">§ 7개 키워드 한눈 매트릭스</h4>
              <MatrixBars matrix={data.matrix} />
            </section>
          ) : null}
          <SourceBlock sources={data.sources} />
        </div>
      ) : null}
    </IssueCard>
  );
}

/* ─────────── I-6 교차 이슈 분석 (a 직접 / b 영향 전이) ─────────── */

export function I6CrossIssue({ data }: { data: CrossIssueData }) {
  const [expanded, setExpanded] = useState(false);
  // intersection 문자열에서 → 를 분리해 "A × B" 형태로 표기
  const parts = data.intersection.split(/\s*→\s*/);
  return (
    <IssueCard
      kind="cross"
      topics={data.topics}
      title={data.title}
      generatedAt={data.generatedAt}
      basedOnCount={data.basedOnCount}
    >
      <div className="rounded-md px-3 py-2.5" style={tintBg('cross')}>
        {parts.length === 2 ? (
          <p className="text-[13px] text-[#1F1B14] font-semibold leading-snug flex items-center justify-center gap-2 flex-wrap text-center">
            <span>{parts[0]}</span>
            <span className="text-[#5C3DAE] font-bold">×</span>
            <span>{parts[1]}</span>
          </p>
        ) : (
          <p className="text-[13px] text-[#1F1B14] font-semibold leading-snug">
            {data.intersection}
          </p>
        )}
      </div>
      <p className="mt-3 text-[14px] text-[#3D362A] leading-[1.7]">{data.brief}</p>
      <ExpandToggle expanded={expanded} onToggle={() => setExpanded((e) => !e)} />
      {expanded ? (
        <div className="mt-3 space-y-2">
          {data.flow.map((f, i) => {
            const isCross = f.side === 'cross';
            return (
              <div
                key={i}
                className="rounded-md border border-gray-200 bg-white px-3 py-2.5"
              >
                <p
                  className={cn(
                    'text-[10.5px] font-semibold tracking-wide',
                    isCross ? 'text-[#5C3DAE]' : 'text-[#8A7E66]',
                  )}
                >
                  {f.label}
                </p>
                <p className="mt-1 text-[12.5px] text-[#2A2419] leading-relaxed">
                  {f.body}
                </p>
              </div>
            );
          })}
          <div className="rounded-md border border-gray-200 bg-white px-3 py-2.5">
            <p className="text-[10.5px] font-semibold text-[#5C3DAE] tracking-wide">
              통합 시사점
            </p>
            <p className="mt-1 text-[12.5px] text-[#2A2419] leading-relaxed">
              {data.implication}
            </p>
            <div className="mt-2">
              <ConfidenceTag level={data.confidence} suffix="인과 단정 회피" />
            </div>
          </div>
          <SourceBlock sources={data.sources} />
        </div>
      ) : null}
    </IssueCard>
  );
}

/* ─────────── I-10 쟁점 구조도 (a 정책 / b 가치) ─────────── */

function QuadrantDiagram({
  axisX,
  axisY,
  positions,
}: {
  axisX: IssueMapData['axisX'];
  axisY: IssueMapData['axisY'];
  positions: IssuePosition[];
}) {
  // 사분면 좌표 (0~100 기준): 1=우상, 2=좌상, 3=좌하, 4=우하
  const COORDS: Record<IssuePosition['quadrant'], { x: number; y: number }> = {
    1: { x: 75, y: 28 },
    2: { x: 28, y: 28 },
    3: { x: 28, y: 72 },
    4: { x: 75, y: 72 },
  };
  return (
    <div className="relative mt-2 rounded-md border border-gray-200 bg-white px-3 pt-7 pb-9">
      {/* 축 라벨 */}
      <span className="absolute top-1 left-1/2 -translate-x-1/2 text-[10px] font-semibold text-[#8A7E66]">
        ▲ {axisY.high}
      </span>
      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[10px] font-semibold text-[#8A7E66]">
        ▼ {axisY.low}
      </span>
      <span className="absolute left-1 top-1/2 -translate-y-1/2 text-[10px] font-semibold text-[#8A7E66] -rotate-90 origin-center whitespace-nowrap">
        {axisX.low}
      </span>
      <span className="absolute right-1 top-1/2 -translate-y-1/2 text-[10px] font-semibold text-[#8A7E66] rotate-90 origin-center whitespace-nowrap">
        {axisX.high}
      </span>
      {/* 좌표 평면 */}
      <div className="relative w-full aspect-square max-w-[260px] mx-auto">
        {/* 축선 */}
        <span className="absolute inset-x-0 top-1/2 h-px bg-[#C9BE9E]" aria-hidden />
        <span className="absolute inset-y-0 left-1/2 w-px bg-[#C9BE9E]" aria-hidden />
        {/* 점 */}
        {positions.map((p, i) => {
          const c = COORDS[p.quadrant];
          return (
            <span
              key={i}
              className="absolute -translate-x-1/2 -translate-y-1/2 inline-flex items-center justify-center w-6 h-6 rounded-full bg-white border-2 border-[#5A7A8C] text-[10px] font-bold text-[#3F5A6A] shadow-sm"
              style={{ left: `${c.x}%`, top: `${c.y}%` }}
              aria-label={p.label}
            >
              {i + 1}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export function I10IssueMap({ data }: { data: IssueMapData }) {
  const [expanded, setExpanded] = useState(false);
  const isPolicy = data.variant === 'policy';
  return (
    <IssueCard
      kind="map"
      topics={data.topics}
      title={data.title}
      generatedAt={data.generatedAt}
      basedOnCount={data.basedOnCount}
      labelOverride={isPolicy ? '정책·제도 쟁점' : '가치 충돌 쟁점'}
    >
      <div className="rounded-md px-3 py-2.5" style={tintBg('map')}>
        <p className="text-[10.5px] font-semibold tracking-wide text-[#5A7A8C]">
          쟁점 — {isPolicy ? '정책·제도' : '가치 충돌'}
        </p>
        <p className="mt-1 text-[13px] font-semibold text-[#1F1B14] leading-snug">
          {data.question}
        </p>
      </div>
      <p className="mt-3 text-[14px] text-[#3D362A] leading-[1.7]">{data.brief}</p>
      <ExpandToggle expanded={expanded} onToggle={() => setExpanded((e) => !e)} />
      {expanded ? (
        <div className="mt-3 space-y-3">
          <QuadrantDiagram
            axisX={data.axisX}
            axisY={data.axisY}
            positions={data.positions}
          />
          <ul className="space-y-1.5">
            {data.positions.map((p, i) => (
              <li key={i} className="flex items-start gap-2 text-[12.5px]">
                <span className="inline-flex items-center justify-center w-4 h-4 rounded-full border border-[#5A7A8C] text-[10px] font-bold text-[#3F5A6A] shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <span className="font-semibold text-[#1F1B14]">{p.label}</span>
                  <span className="text-[#8A7E66]"> — {p.detail}</span>
                </div>
              </li>
            ))}
          </ul>
          <section className="rounded-md border border-gray-200 bg-white px-3 py-2.5">
            <div className="flex items-center gap-1.5">
              <ConfidenceTag level="L5" />
              <span className="text-[11px] font-semibold text-[#3D362A]">미해결 질문</span>
            </div>
            <ul className="mt-1.5 space-y-1 list-disc list-inside text-[12px] text-[#3D362A] leading-relaxed">
              {data.unresolvedQuestions.map((q, i) => (
                <li key={i}>{q}</li>
              ))}
            </ul>
            <p className="mt-1.5 text-[11px] text-[#8A7E66]">
              쟁점은 갈려 있어요. 답은 아직입니다.
            </p>
          </section>
          <SourceBlock sources={data.sources} />
        </div>
      ) : null}
    </IssueCard>
  );
}

/* ─────────── I-30 위클리 딥다이브 오디오 ─────────── */

export function I30DeepdiveAudio({ data }: { data: DeepdiveAudioData }) {
  const player = useMaiPlayer();
  const [expanded, setExpanded] = useState(false);
  const accent = '#3FA46A';
  const isIntegrated = data.variant === 'integrated';
  return (
    <IssueCard
      kind="audio"
      topics={data.topics}
      title={data.title}
      generatedAt={data.generatedAt}
      basedOnCount={data.basedOnCount}
      labelOverride={isIntegrated ? '위클리 이슈 통합 라이브' : '위클리 이슈 딥라이브'}
    >
      <p className="text-[14px] text-[#3D362A] leading-[1.7]">{data.brief}</p>
      <p className="mt-2 inline-flex items-center gap-1.5 text-[11px] text-[#8A7E66]">
        <Play size={10} fill="currentColor" className="text-emerald-700" />
        <span className="font-semibold tabular-nums text-[#3D362A]">{data.totalDuration}</span>
        <span className="text-[#D6CDB6]">·</span>
        <span>{data.weekLabel}</span>
      </p>
      <div className="mt-3 flex items-center gap-2">
        <button
          type="button"
          aria-label="재생"
          onClick={() =>
            player?.play({
              title: `${data.weekLabel} 위클리 딥다이브${
                data.variant === 'integrated' ? ' · 종합' : ''
              }`,
              duration: data.totalDuration,
              variant: 'deepdive',
            })
          }
          className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg text-white text-[12px] font-medium"
          style={{ backgroundColor: accent }}
        >
          <Play size={12} fill="white" />
          재생
        </button>
        <button
          type="button"
          className="h-8 px-3 rounded-lg border border-[#E3DBC8] bg-white text-[12px] text-[#3D362A]"
        >
          텍스트 보기
        </button>
      </div>
      <ExpandToggle
        expanded={expanded}
        onToggle={() => setExpanded((e) => !e)}
        expandLabel="타임라인 보기"
      />
      {expanded ? (
        <ul className="mt-3 rounded-md border border-gray-200 divide-y divide-gray-200">
          {data.chapters.map((ch, i) => (
            <li
              key={i}
              className="flex items-center gap-2 px-3 py-2.5 text-[12.5px]"
            >
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-gray-100 text-gray-600 text-[10px] font-bold tabular-nums shrink-0">
                {i + 1}
              </span>
              <span className="flex-1 min-w-0 text-[#1F1B14] leading-snug truncate">
                {ch.title}
              </span>
              <span className="text-[11px] text-[#A89B83] tabular-nums shrink-0">
                {ch.duration}
              </span>
            </li>
          ))}
        </ul>
      ) : null}
    </IssueCard>
  );
}
