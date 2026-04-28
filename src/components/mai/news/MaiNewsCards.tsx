import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Bookmark, MapPin, MoreHorizontal, Newspaper, Play, Settings2, Share2, Sparkles, TrendingDown, TrendingUp, Users } from 'lucide-react';
import { cn } from '@/lib/cn';
import { placeholderImg } from '@/lib/img';
import { useMaiPlayer } from './MaiPlayer';
import type {
  ArticleMultiData,
  ArticleSingleData,
  AssetAnomalyData,
  BriefingData,
  CohortNewSubData,
  CohortPopularData,
  EnvAnomalyData,
  FlashData,
  FollowupData,
  KeywordRecData,
  LocalPopularData,
  SpikeData,
  TrendingData,
} from '@/mocks/maiNews';

const CHIP = 'inline-flex items-center px-2 py-[3px] rounded-chip bg-[#374151] text-[11px] text-white font-medium';
const FOOTER_AI = 'text-[10px] text-gray-400';

function KeywordChips({ keywords }: { keywords: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-1">
      {keywords.map((k) => (
        <span key={k} className={CHIP}>#{k}</span>
      ))}
    </div>
  );
}

function ActionRow({
  primary = '원문 보기',
  extra,
}: {
  primary?: string;
  extra?: { label: string; onClick: () => void };
}) {
  const [saved, setSaved] = useState(false);
  return (
    <div className="flex items-center gap-3 text-[12px] text-gray-500">
      <button type="button" className="font-medium text-gray-900">{primary}</button>
      <span className="w-px h-3 bg-gray-200" />
      <button
        type="button"
        aria-label="저장"
        aria-pressed={saved}
        onClick={() => setSaved((s) => !s)}
        className={cn(
          'flex items-center gap-1 transition-colors',
          saved ? 'text-gray-900 font-semibold' : '',
        )}
      >
        <Bookmark size={14} fill={saved ? 'currentColor' : 'none'} />
        <span>저장</span>
      </button>
      <button type="button" aria-label="공유" className="flex items-center gap-1">
        <Share2 size={14} />
        <span>공유</span>
      </button>
      {extra ? (
        <button
          type="button"
          onClick={extra.onClick}
          className="flex items-center gap-0.5"
        >
          <span>{extra.label}</span>
        </button>
      ) : null}
      <span className="flex-1" />
      <button type="button" aria-label="더보기" className="p-1 -mr-1">
        <MoreHorizontal size={16} />
      </button>
    </div>
  );
}

function PublisherLine({
  publisher,
  publisherLogoSeed,
  elapsed,
  extra,
}: {
  publisher: string;
  publisherLogoSeed: string;
  elapsed: string;
  extra?: string;
}) {
  const logo = placeholderImg(publisherLogoSeed, 32, 32, 'logo,square');
  return (
    <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
      <img
        src={logo}
        alt=""
        width={16}
        height={16}
        className="w-4 h-4 rounded-sm bg-gray-100 object-cover"
        draggable={false}
      />
      <span className="font-medium text-gray-700">{publisher}</span>
      {extra ? (
        <>
          <span className="text-gray-300">·</span>
          <span>{extra}</span>
        </>
      ) : null}
      <span className="text-gray-300">·</span>
      <span>{elapsed}</span>
    </div>
  );
}

function Thumbnail({ seed, topic, url, size = 80 }: { seed: string; topic: string; url?: string; size?: number }) {
  const src = url ?? placeholderImg(seed, size * 3, size * 3, topic);
  return (
    <img
      src={src}
      alt=""
      width={size}
      height={size}
      className="rounded-md object-cover bg-gray-100 shrink-0"
      style={{ width: size, height: size }}
      draggable={false}
    />
  );
}

/* ─────────── Sparkline (공용) ─────────── */

function Sparkline({
  data,
  width = 96,
  height = 28,
  color = '#2C2C2C',
  filled = false,
}: {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
  filled?: boolean;
}) {
  if (data.length === 0) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const stepX = width / Math.max(1, data.length - 1);
  const pts = data.map((v, i) => {
    const x = i * stepX;
    const y = height - ((v - min) / range) * (height - 2) - 1;
    return [x, y] as const;
  });
  const path = pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');
  const areaPath = `${path} L${width} ${height} L0 ${height} Z`;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="shrink-0">
      {filled ? <path d={areaPath} fill={color} fillOpacity={0.12} /> : null}
      <path d={path} fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ─────────── N-17 · 데일리 브리핑 (a/b) ─────────── */

export function N17DailyBriefing({ data }: { data: BriefingData }) {
  const player = useMaiPlayer();
  const morning = data.variant === 'morning';
  return (
    <article
      className={cn(
        'rounded-card border border-gray-100 px-4 py-3.5',
        morning
          ? 'bg-gradient-to-b from-[#FFF8E7] to-[#FFEFC9]'
          : 'bg-gradient-to-b from-[#EEF1F8] to-[#D9E1F1]',
      )}
    >
      <div className="flex items-center justify-between text-[11px] text-gray-500">
        <span className="font-semibold text-gray-700">
          {morning ? '🌅 ' : '🌙 '}{data.title}
        </span>
        <span>{data.duration}</span>
      </div>
      <div className="mt-2 flex flex-wrap gap-1">
        {data.keywords.map((k) => (
          <span key={k} className={CHIP}>#{k}</span>
        ))}
      </div>
      <p className="mt-2 text-[13px] text-gray-800 leading-relaxed">{data.summary}</p>
      <div className="mt-3 flex items-center gap-2">
        <button
          type="button"
          aria-label="재생"
          onClick={() =>
            player?.play({
              title: data.title,
              duration: data.duration,
              variant: data.variant,
            })
          }
          className="flex items-center gap-1.5 h-7 px-3 rounded-full bg-gray-900 text-white text-[12px] font-medium"
        >
          <Play size={12} fill="white" />
          재생
        </button>
        <button
          type="button"
          className="h-7 px-3 rounded-full border border-gray-300 bg-white/60 text-[12px] text-gray-700"
        >
          텍스트 보기
        </button>
        <button type="button" className="text-[12px] text-gray-700 ml-auto">저장</button>
      </div>
      <p className={cn('mt-2.5', FOOTER_AI)}>
        기사 {data.basedOnCount}건 기반 · 다음 브리핑 {data.nextLabel} · AI가 정리
      </p>
    </article>
  );
}

/* ─────────── N-11 · 이슈 급증 (a 보도량 / b 신규 키워드) ─────────── */

const CONFIDENCE_LABEL: Record<SpikeData['causeConfidence'], string> = {
  L2: '8개 매체가 동시 보도',
  L3: '추정',
  L4: '보도가 갈리고 있어요',
};

export function N11IssueSpike({ data }: { data: SpikeData }) {
  const newKw = data.mode === 'newKeyword';
  return (
    <article className="rounded-card border border-gray-100 bg-white px-4 py-3.5">
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center px-2 py-[3px] rounded-md bg-[#2C2C2C] text-white text-[10px] font-bold tracking-wide">
          {newKw ? '새 키워드 등장' : '보도 급증'}
        </span>
        <span className={CHIP}>
          {newKw ? `구독 #${data.keyword}` : `#${data.keyword}`}
        </span>
      </div>
      <div className="mt-3 flex items-end justify-between gap-3">
        <div>
          {newKw ? (
            <>
              <span className="text-[24px] font-bold tracking-tight text-gray-900 leading-none">
                "{data.newKeyword}"
              </span>
              <p className="mt-1 text-[11px] text-gray-500">
                보도 24시간 내 {data.newCount}건 출현 · 어제까지 0건
              </p>
            </>
          ) : (
            <>
              <div className="flex items-baseline gap-2">
                <span className="text-[28px] font-bold tracking-tight text-gray-900 leading-none">
                  {data.multiplier}
                </span>
                <span className="text-[11px] text-gray-500">{data.baseline}</span>
              </div>
              <p className="mt-1 text-[10px] text-gray-400">최근 24시간 보도량 추이</p>
            </>
          )}
        </div>
        <Sparkline data={data.spark} width={96} height={32} color="#2C2C2C" filled />
      </div>
      <p className="mt-2.5 text-[13px] text-gray-800">
        한 줄 원인: {data.cause}{' '}
        <span className="text-gray-500">({CONFIDENCE_LABEL[data.causeConfidence]})</span>
      </p>
      <div className="mt-3 flex items-center gap-2">
        <button type="button" className="h-8 px-3 rounded-full bg-gray-900 text-white text-[12px] font-medium">
          {newKw ? `관련 기사 ${data.articleCount}건 →` : `관련 기사 ${data.articleCount}건 →`}
        </button>
        <button type="button" className="h-8 px-3 rounded-full border border-gray-200 text-[12px] text-gray-700">
          {newKw ? `${data.newKeyword} 구독하기 →` : '흐름 정리 받기 →'}
        </button>
      </div>
      <p className={cn('mt-2.5', FOOTER_AI)}>
        기사 {data.articleCount}건 기반 · AI가 정리
      </p>
    </article>
  );
}

/* ─────────── N-1a · 단일매체 기사 ─────────── */

export function N1ArticleSingle({ data }: { data: ArticleSingleData }) {
  return (
    <article className="bg-white px-4 py-3.5">
      <PublisherLine
        publisher={data.publisher}
        publisherLogoSeed={data.publisherLogoSeed}
        elapsed={data.elapsed}
      />
      {data.contextTag ? (
        <div className="mt-2 inline-flex items-center gap-1 px-2 py-1 rounded-md bg-amber-50 text-amber-800 text-[11px] font-semibold">
          <TrendingUp size={12} strokeWidth={2.4} />
          {data.contextTag}
        </div>
      ) : null}
      <div className="mt-2 flex items-start gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-[15px] font-bold text-gray-900 leading-snug line-clamp-3">
            {data.title}
          </h3>
          <p className="mt-1.5 text-[12.5px] text-gray-500 leading-snug line-clamp-2">
            {data.summary}
          </p>
        </div>
        {data.thumbnailSeed ? (
          <Thumbnail
            seed={data.thumbnailSeed}
            topic={data.thumbnailTopic ?? 'news'}
            url={data.thumbnailUrl}
          />
        ) : null}
      </div>
      <div className="mt-2.5 flex items-center gap-1.5">
        <KeywordChips keywords={data.keywords} />
      </div>
      <div className="mt-1.5">
        <ActionRow />
      </div>
    </article>
  );
}

/* ─────────── N-1b · 다매체 묶음 ─────────── */

export function N1ArticleMulti({ data }: { data: ArticleMultiData }) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const totalOutlets = data.otherCount + 1;
  return (
    <article className="bg-white px-4 py-3.5">
      <PublisherLine
        publisher={data.leadPublisher}
        publisherLogoSeed={data.publisherLogoSeed}
        elapsed={data.elapsed}
        extra={`외 ${data.otherCount}개 매체`}
      />
      <div className="mt-2 inline-flex items-center gap-1 px-2 py-1 rounded-md bg-sky-50 text-sky-800 text-[11px] font-semibold">
        <Newspaper size={12} strokeWidth={2.4} />
        동일 사건을 {totalOutlets}개 매체가 보도했어요
      </div>
      <div className="mt-2 flex items-start gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-[15px] font-bold text-gray-900 leading-snug line-clamp-3">
            {data.title}
          </h3>
          <p className="mt-1.5 text-[12.5px] text-gray-500 leading-snug line-clamp-2">
            {data.summary}
          </p>
        </div>
        {data.thumbnailSeed ? (
          <Thumbnail
            seed={data.thumbnailSeed}
            topic={data.thumbnailTopic ?? 'news'}
            url={data.thumbnailUrl}
          />
        ) : null}
      </div>
      <div className="mt-2.5 flex items-center gap-1.5">
        <KeywordChips keywords={data.keywords} />
      </div>
      <div className="mt-1.5">
        <ActionRow
          extra={{
            label: `다른 매체 ${data.otherCount}개`,
            onClick: () => setSheetOpen(true),
          }}
        />
      </div>
      <OtherPublishersSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        title={data.title}
        items={data.otherPublishers}
      />
    </article>
  );
}

function OtherPublishersSheet({
  open,
  onClose,
  title,
  items,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  items?: ArticleMultiData['otherPublishers'];
}) {
  const [target, setTarget] = useState<HTMLElement | null>(null);
  useEffect(() => {
    setTarget(document.getElementById('phone-frame-root'));
  }, []);
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);
  if (!target || !open || !items) return null;
  return createPortal(
    <div className="absolute inset-0 z-50">
      <button
        type="button"
        aria-label="닫기"
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
      />
      <div className="absolute inset-x-0 bottom-0 bg-gray-50 rounded-t-[28px] max-h-[70%] flex flex-col">
        <div className="pt-3 pb-1 flex justify-center shrink-0">
          <span className="w-10 h-1 rounded-full bg-gray-300" />
        </div>
        <div className="px-4 pt-2 shrink-0">
          <div className="rounded-2xl bg-white px-4 py-3">
            <h4 className="text-[13px] font-bold text-gray-900">
              다른 매체 {items.length}개
            </h4>
            <p className="mt-0.5 text-[11px] text-gray-500 line-clamp-1">
              {title}
            </p>
          </div>
        </div>
        <div className="overflow-y-auto px-4 pt-2 pb-5">
          <ul className="rounded-2xl bg-white divide-y divide-gray-100 overflow-hidden">
            {items.map((p, i) => (
              <li key={i} className="flex items-center gap-3 px-4 py-3">
                <img
                  src={placeholderImg(p.logoSeed, 96, 96, 'logo,square')}
                  alt=""
                  width={52}
                  height={52}
                  className="w-[52px] h-[52px] rounded-md bg-gray-100 object-cover shrink-0"
                  draggable={false}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] text-gray-900 leading-snug line-clamp-2">
                    {p.headline}
                  </p>
                  <p className="mt-1 text-[11px] text-gray-500">
                    {p.name} · {p.elapsed}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>,
    target,
  );
}

/* ─────────── N-9a · 환경 컨텍스트 알림 ─────────── */

export function N9EnvAnomaly({ data }: { data: EnvAnomalyData }) {
  return (
    <article className="rounded-card border border-gray-100 bg-white px-4 py-3.5 flex gap-3">
      <div className="w-11 h-11 rounded-full bg-[#E8F1FB] text-[24px] flex items-center justify-center shrink-0">
        {data.emoji}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[11px] text-[#4A90D9] font-semibold">{data.context}</p>
        <p className="mt-0.5 text-[14px] font-bold text-gray-900">{data.headline}</p>
        <p className="mt-0.5 text-[12px] text-gray-500">{data.detail}</p>
        <p className="mt-1.5 text-[12.5px] text-gray-700">{data.action}</p>
        <div className="mt-2.5 flex items-center gap-2">
          <button type="button" className="h-7 px-2.5 rounded-full bg-gray-900 text-white text-[11px]">
            알림 받기
          </button>
          <button type="button" className="h-7 px-2.5 rounded-full border border-gray-200 text-[11px] text-gray-700">
            자세히 보기
          </button>
          <button type="button" className="text-[11px] text-gray-500 ml-auto">관심 없음</button>
        </div>
        <p className={cn('mt-2', FOOTER_AI)}>
          출처: {data.source} · AI가 정리
        </p>
      </div>
    </article>
  );
}

/* ─────────── N-9b · 관심 자산 변동 ─────────── */

export function N9AssetAnomaly({ data }: { data: AssetAnomalyData }) {
  const up = data.direction === 'up';
  const Arrow = up ? TrendingUp : TrendingDown;
  return (
    <article className="rounded-card border border-gray-100 bg-white px-4 py-3.5 flex gap-3">
      <div className="w-11 h-11 rounded-full bg-[#FDF1DA] text-[#F5A623] flex items-center justify-center shrink-0">
        <Arrow size={22} strokeWidth={2.2} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[11px] text-[#F5A623] font-semibold">{data.context}</p>
        <div className="mt-0.5 flex items-baseline gap-2">
          <span className="text-[14px] font-bold text-gray-900">{data.asset}</span>
          <span className={cn('text-[16px] font-bold', up ? 'text-[#E26B5C]' : 'text-[#3FA46A]')}>
            {data.changeLabel}
          </span>
        </div>
        <p className="mt-0.5 text-[11px] text-gray-500">{data.detail}</p>
        <div className="mt-2">
          <Sparkline data={data.spark} width={220} height={32} color="#F5A623" filled />
        </div>
        <p className="mt-1.5 text-[12.5px] text-gray-700">{data.observation}</p>
        <div className="mt-2.5 flex items-center gap-2">
          <button type="button" className="h-7 px-2.5 rounded-full bg-gray-900 text-white text-[11px]">
            자세히 보기
          </button>
          <button type="button" className="h-7 px-2.5 rounded-full border border-gray-200 text-[11px] text-gray-700">
            관련 기사
          </button>
          <button type="button" className="text-[11px] text-gray-500 ml-auto">관심 없음</button>
        </div>
        <p className={cn('mt-2', FOOTER_AI)}>
          출처: {data.source} · AI가 정리 ·{' '}
          <span className="italic">투자 자문이 아닙니다</span>
        </p>
      </div>
    </article>
  );
}

/* ─────────── N-18 · 속보 플래시 ─────────── */

export function N18Flash({ data }: { data: FlashData }) {
  return (
    <article className="rounded-card border border-gray-100 bg-white px-4 py-3.5">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center px-2 py-[3px] rounded-md bg-[#2C2C2C] text-white text-[10px] font-bold tracking-wide">
          지금 막 정리됐어요
        </span>
        <span className="text-[11px] text-gray-500">{data.duration}</span>
      </div>
      <div className="mt-2 flex flex-wrap gap-1">
        <span className={CHIP}>#{data.keyword}</span>
      </div>
      <p className="mt-2 text-[13px] text-gray-800 leading-relaxed">{data.summary}</p>
      <div className="mt-3 flex items-center gap-2">
        <button
          type="button"
          aria-label="재생"
          className="flex items-center gap-1.5 h-8 px-3 rounded-full bg-gray-900 text-white text-[12px] font-medium"
        >
          <Play size={13} fill="white" />
          재생
        </button>
        <button type="button" className="text-[12px] text-gray-700">텍스트 보기</button>
      </div>
      <p className={cn('mt-2.5', FOOTER_AI)}>
        기사 {data.basedOnCount}건 기반 · AI가 정리
      </p>
    </article>
  );
}

/* ─────────── N-8 · 콘텐츠결 후속 (a 시리즈 / b 동일 기자) ─────────── */

export function N8Followup({ data }: { data: FollowupData }) {
  return (
    <article className="bg-white px-4 py-3.5 border-l-[3px] border-dashed border-[#4A4A4A]/40 rounded-r-[8px]">
      <p className="text-[12px] text-gray-700">{data.observation}</p>
      <div className="mt-2 flex items-center gap-2 text-[13px] text-gray-900">
        <span className="text-gray-400">▸</span>
        <span className="font-medium text-gray-500 text-[12px]">{data.publisher}</span>
        {data.byline ? (
          <>
            <span className="text-gray-300 text-[11px]">·</span>
            <span className="text-[12px] text-gray-500">{data.byline}</span>
          </>
        ) : null}
        <span className="text-gray-300 text-[11px]">·</span>
        <span className="text-[11px] text-gray-400">{data.elapsed}</span>
      </div>
      <p className="mt-1 text-[14px] font-semibold text-gray-900 leading-snug">"{data.title}"</p>
      <button type="button" className="mt-2 text-[11px] text-gray-500">관심 없음</button>
    </article>
  );
}

/* ─────────── N-4 · 키워드 추천 (a 행동 기반 / b 인접 확장) ─────────── */

const KEYWORD_PASTELS = [
  'bg-rose-50',
  'bg-amber-50',
  'bg-lime-50',
  'bg-emerald-50',
  'bg-sky-50',
  'bg-violet-50',
  'bg-pink-50',
  'bg-orange-50',
] as const;

function pastelFor(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return KEYWORD_PASTELS[h % KEYWORD_PASTELS.length];
}

export function N4KeywordRec({ data }: { data: KeywordRecData }) {
  const multi = data.keywords.length > 1;
  return (
    <article className="rounded-card border border-gray-100 bg-white px-4 py-3.5">
      <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
        <Sparkles size={13} fill="currentColor" />
        <span>{data.observation}</span>
      </div>
      <p className="mt-1 text-[13.5px] text-gray-900">
        {multi ? '함께 구독하시겠어요?' : '이 키워드도 함께 추적할까요?'}
      </p>
      <div className="mt-2.5 space-y-1.5">
        {data.keywords.map((k) => (
          <div
            key={k.keyword}
            className={cn(
              'flex items-baseline gap-2 px-3 py-2 rounded-md',
              pastelFor(k.keyword),
            )}
          >
            <span className="text-[14px] font-bold text-gray-900 shrink-0">#{k.keyword}</span>
            <span className="text-[11px] text-gray-400 shrink-0">—</span>
            <span className="text-[11px] text-gray-500 leading-snug">{k.description}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2">
        <button
          type="button"
          className="h-8 px-3 rounded-lg bg-[#5C92FF] text-white text-[12px] font-medium"
        >
          {multi ? '둘 다 구독' : '구독하기'}
        </button>
        {multi ? (
          <button type="button" className="h-8 px-3 rounded-lg border border-gray-200 text-[12px] text-gray-700">
            개별 선택
          </button>
        ) : null}
        <button type="button" className="h-8 px-3 rounded-lg border border-gray-200 text-[12px] text-gray-700">
          괜찮아요
        </button>
      </div>
    </article>
  );
}

/* ─────────── N-19 · 동네 인기 (a 동/구 / b 광역) ─────────── */

export function N19LocalPopular({ data }: { data: LocalPopularData }) {
  const metro = data.scope === 'metro';
  const corel = '#E26B5C';
  return (
    <article className="rounded-card border border-gray-100 bg-white px-4 py-3.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-[12px] text-gray-700">
          <MapPin size={14} className="shrink-0" style={{ color: metro ? '#E5A398' : corel }} />
          <span className="font-semibold">
            {metro ? `${data.region}에서 많이 보는 기사` : `${data.region}에서 많이 보는 기사`}
          </span>
        </div>
        <button
          type="button"
          aria-label="위치 권한 설정"
          className="flex items-center gap-1 text-[11px] text-gray-500"
        >
          <Settings2 size={12} />
          위치 권한
        </button>
      </div>
      <ul className="mt-2.5 space-y-2.5">
        {data.items.map((it, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <span className="text-[18px] leading-none mt-0.5">{it.emoji}</span>
            <div className="flex-1 min-w-0">
              <p className="text-[13.5px] text-gray-900 leading-snug">{it.title}</p>
              <p className="mt-0.5 text-[11px] text-gray-500">
                {it.publisher} · {it.elapsed}
                {it.trending ? <span className="ml-1.5 text-[#E26B5C] font-semibold">▲급상승</span> : null}
              </p>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-3 flex items-center justify-between">
        <p className={FOOTER_AI}>{data.sampleNote}</p>
        <button type="button" className="text-[11px] text-gray-500">관심 없음</button>
      </div>
    </article>
  );
}

/* ─────────── N-20a · 코호트 인기 기사 ─────────── */

export function N20CohortPopular({ data }: { data: CohortPopularData }) {
  return (
    <article className="rounded-card border border-gray-100 bg-white px-4 py-3.5">
      <div className="flex items-center gap-1.5 text-[12px] text-gray-700">
        <Users size={14} className="text-[#4A4A4A]" />
        <span className="font-semibold">관심사가 비슷한 분들이 본 기사</span>
      </div>
      <p className="mt-1 text-[11px] text-gray-500">
        근거: {data.cohortBasis} ({data.sampleSize})
      </p>
      <ul className="mt-2.5 space-y-2">
        {data.items.map((it, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="text-gray-400 text-[12px] mt-0.5">📰</span>
            <div className="flex-1 min-w-0">
              <p className="text-[13.5px] text-gray-900 leading-snug">"{it.title}"</p>
              <p className="mt-0.5 text-[11px] text-gray-500">
                {it.publisher} · {it.views} 열람
              </p>
            </div>
          </li>
        ))}
      </ul>
      <button type="button" className="mt-2.5 text-[11px] text-gray-500">관심 없음</button>
    </article>
  );
}

/* ─────────── N-20b · 코호트 신규 구독 키워드 ─────────── */

export function N20CohortNewSub({ data }: { data: CohortNewSubData }) {
  return (
    <article className="rounded-card border border-gray-100 bg-white px-4 py-3.5">
      <div className="flex items-center gap-1.5 text-[12px] text-gray-700">
        <Users size={14} className="text-[#4A4A4A]" />
        <span className="font-semibold">관심사가 비슷한 분들이 이번 주 새로 추가한 키워드</span>
      </div>
      <p className="mt-1 text-[11px] text-gray-500">
        근거: {data.cohortBasis} ({data.sampleSize})
      </p>
      <ul className="mt-2.5 space-y-1.5">
        {data.items.map((it, i) => (
          <li
            key={i}
            className="flex items-baseline gap-2 px-3 py-2 rounded-md bg-gray-50"
          >
            <span className="text-[14px] font-bold text-gray-900 shrink-0">#{it.keyword}</span>
            {it.note ? (
              <span className="text-[11px] text-gray-500 leading-snug">— {it.note}</span>
            ) : null}
            <span className="ml-auto text-[11px] text-gray-500 shrink-0">
              신규 구독 +{it.addedCount.toLocaleString()}명
            </span>
          </li>
        ))}
      </ul>
      <button type="button" className="mt-2.5 text-[11px] text-gray-500">관심 없음</button>
    </article>
  );
}

/* ─────────── N-14 · 트렌딩 키워드 (a 전체 / b 인접) ─────────── */

export function N14Trending({ data }: { data: TrendingData }) {
  return (
    <article className="rounded-card bg-[#EEF1F5] px-4 py-3.5">
      <div className="flex items-center justify-between text-[12px]">
        <span className="font-semibold text-gray-800">
          {data.scope === 'all' ? '지금 많이 추적하는 키워드' : '당신의 관심사 근처에서 뜨고 있어요'}
        </span>
        <button type="button" className="text-gray-500">더 보기</button>
      </div>
      <div className="mt-2.5 flex flex-wrap gap-1.5">
        {data.items.map((it) => (
          <button
            key={it.keyword}
            type="button"
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-chip bg-white border border-gray-100 text-[12px]"
          >
            <span className="font-semibold text-gray-900">#{it.keyword}</span>
            <span className="text-gray-500 text-[11px]">▸ {it.meta}</span>
          </button>
        ))}
      </div>
    </article>
  );
}
