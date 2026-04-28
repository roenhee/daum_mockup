import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { BookOpen, Bookmark, Check, MapPin, MoreHorizontal, Newspaper, PenLine, Play, Share2, Sparkles, TrendingDown, TrendingUp, Users } from 'lucide-react';
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

/* ─────────── DetailedAssetGraph (N-9b 전용) ─────────── */

function DetailedAssetGraph({
  data,
  up,
  changeLabel,
}: {
  data: number[];
  up: boolean;
  changeLabel: string;
}) {
  const width = 300;
  const height = 118;
  const padTop = 34;
  const padBottom = 22;
  const padLeft = 50;
  const padRight = 16;
  const innerW = width - padLeft - padRight;
  const innerH = height - padTop - padBottom;
  const lineColor = up ? '#E26B5C' : '#3FA46A';

  if (data.length === 0) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const stepX = innerW / Math.max(1, data.length - 1);
  const pts = data.map((v, i) => {
    const x = padLeft + i * stepX;
    const y = padTop + innerH - ((v - min) / range) * innerH;
    return [x, y] as const;
  });

  const linePath = pts
    .map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`)
    .join(' ');
  const areaPath = `${linePath} L${pts[pts.length - 1][0].toFixed(1)} ${padTop + innerH} L${pts[0][0].toFixed(1)} ${padTop + innerH} Z`;

  const last = pts[pts.length - 1];
  const peakIdx = data.indexOf(max);
  const valleyIdx = data.indexOf(min);
  const peak = pts[peakIdx];
  const valley = pts[valleyIdx];

  const gridYs = [0.33, 0.66].map((r) => padTop + innerH * r);
  const xLabels = ['9시', '11시', '13시', '지금'];
  const formatPrice = (n: number) => n.toLocaleString();

  // Position change label tag above current dot with safe horizontal margins
  const tagW = 60;
  const tagH = 20;
  const horizMargin = 12;
  const minTagX = padLeft + horizMargin;
  const maxTagX = width - padRight - tagW - horizMargin;
  let tagX = last[0] + 8;
  if (tagX > maxTagX) tagX = last[0] - 8 - tagW;
  tagX = Math.max(minTagX, Math.min(maxTagX, tagX));
  const tagY = Math.max(4, last[1] - tagH - 10);

  return (
    <svg
      width="100%"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className="block"
    >
      {/* gridlines */}
      {gridYs.map((y, i) => (
        <line
          key={i}
          x1={padLeft}
          x2={width - padRight}
          y1={y}
          y2={y}
          stroke="#F1F2F4"
          strokeWidth={1}
        />
      ))}
      {/* baseline */}
      <line
        x1={padLeft}
        x2={width - padRight}
        y1={padTop + innerH}
        y2={padTop + innerH}
        stroke="#E5E7EB"
        strokeWidth={1}
      />
      {/* Y-axis labels (prices) */}
      <text
        x={padLeft - 6}
        y={padTop + 4}
        textAnchor="end"
        fontSize="9"
        fill="#9CA3AF"
      >
        {formatPrice(max)}
      </text>
      <text
        x={padLeft - 6}
        y={padTop + innerH + 3}
        textAnchor="end"
        fontSize="9"
        fill="#9CA3AF"
      >
        {formatPrice(min)}
      </text>
      {/* area */}
      <path d={areaPath} fill={lineColor} fillOpacity={0.14} />
      {/* line */}
      <path
        d={linePath}
        fill="none"
        stroke={lineColor}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* valley & peak markers — dots only, no overlapping text */}
      <circle cx={valley[0]} cy={valley[1]} r={2.4} fill="#9CA3AF" />
      <circle cx={peak[0]} cy={peak[1]} r={2.4} fill={lineColor} />
      {/* current marker — dot with halo */}
      <circle cx={last[0]} cy={last[1]} r={5.5} fill={lineColor} fillOpacity={0.22} />
      <circle cx={last[0]} cy={last[1]} r={3} fill={lineColor} />
      {/* change tag floating above current */}
      <g>
        <rect
          x={tagX}
          y={tagY}
          width={tagW}
          height={tagH}
          rx={4}
          fill={lineColor}
        />
        <text
          x={tagX + tagW / 2}
          y={tagY + tagH / 2 + 3.5}
          textAnchor="middle"
          fontSize="10"
          fontWeight="700"
          fill="white"
        >
          {changeLabel}
        </text>
      </g>
      {/* X-axis labels */}
      {xLabels.map((label, i) => {
        const x = padLeft + (innerW / (xLabels.length - 1)) * i;
        const align = i === 0 ? 'start' : i === xLabels.length - 1 ? 'end' : 'middle';
        return (
          <text
            key={label}
            x={x}
            y={height - 4}
            textAnchor={align}
            fontSize="9"
            fill="#9CA3AF"
          >
            {label}
          </text>
        );
      })}
    </svg>
  );
}

/* ─────────── DetailedSpikeGraph (N-11 전용) ─────────── */

function DetailedSpikeGraph({ data, newKw }: { data: number[]; newKw: boolean }) {
  const width = 300;
  const height = 86;
  const padTop = 14;
  const padBottom = 18;
  const padLeft = 36;
  const padRight = 12;
  const innerW = width - padLeft - padRight;
  const innerH = height - padTop - padBottom;

  if (data.length === 0) return null;

  const max = Math.max(...data);
  const baseline = newKw ? 0 : Math.max(1, Math.round(max / 4)); // 평소 수준 추정
  const barGap = 2;
  const barW = (innerW - barGap * (data.length - 1)) / data.length;
  const lineColor = '#2C2C2C';
  const recentColor = '#E26B5C';
  const baselineY = padTop + innerH - (baseline / max) * innerH;

  return (
    <svg
      width="100%"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className="block"
    >
      {/* gridlines */}
      {[0.33, 0.66].map((r) => {
        const y = padTop + innerH * r;
        return (
          <line
            key={r}
            x1={padLeft}
            x2={width - padRight}
            y1={y}
            y2={y}
            stroke="#F1F2F4"
            strokeWidth={1}
          />
        );
      })}
      {/* baseline (평소) */}
      {!newKw ? (
        <>
          <line
            x1={padLeft}
            x2={width - padRight}
            y1={baselineY}
            y2={baselineY}
            stroke="#9CA3AF"
            strokeWidth={1}
            strokeDasharray="3 3"
          />
          <text
            x={width - padRight - 2}
            y={baselineY - 3}
            textAnchor="end"
            fontSize="9"
            fill="#9CA3AF"
          >
            평소
          </text>
        </>
      ) : null}
      {/* baseline (axis) */}
      <line
        x1={padLeft}
        x2={width - padRight}
        y1={padTop + innerH}
        y2={padTop + innerH}
        stroke="#E5E7EB"
        strokeWidth={1}
      />
      {/* Y-axis label */}
      <text
        x={padLeft - 6}
        y={padTop + 5}
        textAnchor="end"
        fontSize="9"
        fill="#9CA3AF"
      >
        {max}건
      </text>
      <text
        x={padLeft - 6}
        y={padTop + innerH + 3}
        textAnchor="end"
        fontSize="9"
        fill="#9CA3AF"
      >
        0
      </text>
      {/* bars */}
      {data.map((v, i) => {
        const isLast = i === data.length - 1;
        const isHigh = v >= baseline * 2;
        const x = padLeft + i * (barW + barGap);
        const h = (v / max) * innerH;
        const y = padTop + innerH - h;
        const fill = isLast ? recentColor : isHigh ? lineColor : '#9CA3AF';
        return (
          <rect
            key={i}
            x={x}
            y={y}
            width={barW}
            height={h}
            rx={1}
            fill={fill}
            opacity={isLast ? 1 : 0.85}
          />
        );
      })}
      {/* X-axis labels */}
      <text
        x={padLeft}
        y={height - 4}
        textAnchor="start"
        fontSize="9"
        fill="#9CA3AF"
      >
        24시간 전
      </text>
      <text
        x={width - padRight}
        y={height - 4}
        textAnchor="end"
        fontSize="9"
        fontWeight="600"
        fill={recentColor}
      >
        지금
      </text>
    </svg>
  );
}

/* ─────────── N-17 · 데일리 브리핑 (a/b) ─────────── */

export function N17DailyBriefing({ data }: { data: BriefingData }) {
  const player = useMaiPlayer();
  const [saved, setSaved] = useState(false);
  const morning = data.variant === 'morning';
  const accent = morning ? '#E89B2A' : '#5C6BC0';
  return (
    <div>
      <article
        className={cn(
          'relative rounded-card border border-gray-100 px-4 py-3.5',
          morning
            ? 'bg-gradient-to-tr from-white from-50% to-[#FFE0B0]'
            : 'bg-gradient-to-tr from-white from-50% to-[#C2C9E8]',
        )}
      >
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label={saved ? '저장됨' : '저장'}
            aria-pressed={saved}
            onClick={() => setSaved((s) => !s)}
            className="inline-flex items-center justify-center w-5 h-5 -ml-0.5 text-gray-700"
          >
            <Bookmark
              size={14}
              fill={saved ? 'currentColor' : 'none'}
              strokeWidth={2}
            />
          </button>
          <h3 className="text-[12px] font-bold leading-snug text-gray-900">
            {data.title}
          </h3>
        </div>
        <div className="mt-2.5 flex flex-wrap gap-1">
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
            className="flex items-center gap-1.5 h-8 px-3 rounded-lg text-white text-[12px] font-medium"
            style={{ backgroundColor: accent }}
          >
            <Play size={12} fill="white" />
            재생
          </button>
          <button
            type="button"
            className="h-8 px-3 rounded-lg border border-gray-200 bg-white text-[12px] text-gray-700"
          >
            텍스트 보기
          </button>
        </div>
      </article>
      {/* 카드 아래 — 재생 시간 / 기사 수 (중앙 정렬 + 어우러지는 보더) */}
      <div className="mt-2 rounded-card border border-gray-100 bg-white px-4 py-2 flex items-center justify-center gap-2 text-[11px] text-gray-600">
        <span className="inline-flex items-center gap-1">
          <Play size={10} fill="currentColor" className="text-gray-500" />
          <span className="font-semibold">{data.duration}</span>
        </span>
        <span className="text-gray-300">·</span>
        <span>
          기사 <span className="font-semibold">{data.basedOnCount}건</span> 기반
        </span>
        <span className="text-gray-300">·</span>
        <span className="text-gray-400">다음 브리핑 {data.nextLabel}</span>
      </div>
    </div>
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
    <article className="bg-white px-4 py-3.5">
      <span className="inline-flex items-center gap-1.5 px-2 py-[3px] rounded-md bg-[#2C2C2C] text-white text-[10px] font-bold tracking-wide">
        <span>{newKw ? '새 유관 키워드 등장' : '보도 급증'}</span>
        <span className="opacity-50">·</span>
        <span className="font-medium">
          {newKw ? `구독 #${data.keyword}` : `#${data.keyword}`}
        </span>
      </span>
      <div className="mt-3">
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
      <div className="mt-3">
        <DetailedSpikeGraph data={data.spark} newKw={newKw} />
      </div>
      <p className="mt-2.5 text-[13px] text-gray-800">
        한 줄 원인: {data.cause}{' '}
        <span className="text-gray-500">({CONFIDENCE_LABEL[data.causeConfidence]})</span>
      </p>
      <div className="mt-3 flex items-center gap-2">
        <button type="button" className="h-8 px-3 rounded-lg bg-[#5C92FF] text-white text-[12px] font-medium">
          {newKw ? `관련 기사 ${data.articleCount}건 →` : `관련 기사 ${data.articleCount}건 →`}
        </button>
        <button type="button" className="h-8 px-3 rounded-lg border border-gray-200 bg-white text-[12px] text-gray-700">
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

const ENV_TONES = {
  rain:    { card: 'bg-[#F2F7FE] border-[#DCE7F8]', bubble: 'bg-[#DCE9F8]', context: 'text-[#3D6EE0]', button: 'bg-[#3D6EE0]' },
  traffic: { card: 'bg-[#FFF6EE] border-[#F8E3CB]', bubble: 'bg-[#FCE3C9]', context: 'text-[#C66E1A]', button: 'bg-[#D17A24]' },
  dust:    { card: 'bg-[#FAF3F0] border-[#EFD9CE]', bubble: 'bg-[#EFD9CE]', context: 'text-[#8B5A3C]', button: 'bg-[#8B5A3C]' },
  cold:    { card: 'bg-[#EEF6FA] border-[#D0E3EE]', bubble: 'bg-[#D5E5EE]', context: 'text-[#2C7AA0]', button: 'bg-[#2C7AA0]' },
  heat:    { card: 'bg-[#FFF1F2] border-[#F8D5D8]', bubble: 'bg-[#F8D5D8]', context: 'text-[#C0413E]', button: 'bg-[#C0413E]' },
} as const;

export function N9EnvAnomaly({ data }: { data: EnvAnomalyData }) {
  const tone = ENV_TONES[data.tone ?? 'rain'];
  return (
    <article className={cn('rounded-card border px-4 py-3.5 flex gap-3', tone.card)}>
      <div className={cn('w-11 h-11 rounded-full text-[24px] flex items-center justify-center shrink-0', tone.bubble)}>
        {data.emoji}
      </div>
      <div className="flex-1 min-w-0">
        <p className={cn('text-[11px] font-semibold', tone.context)}>{data.context}</p>
        <p className="mt-0.5 text-[14px] font-bold text-gray-900">{data.headline}</p>
        <p className="mt-0.5 text-[12px] text-gray-500">{data.detail}</p>
        <p className="mt-1.5 text-[12.5px] text-gray-700">{data.action}</p>
        <div className="mt-2.5 flex items-center gap-2">
          <button
            type="button"
            className={cn(
              'h-8 px-3 rounded-lg text-white text-[12px] font-medium',
              tone.button,
            )}
          >
            알림 받기
          </button>
          <button type="button" className="h-8 px-3 rounded-lg border border-gray-200 bg-white text-[12px] text-gray-700">
            자세히 보기
          </button>
          <button type="button" className="ml-1 text-[12px] text-gray-500">
            관심 없음
          </button>
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
          <DetailedAssetGraph
            data={data.spark}
            up={up}
            changeLabel={data.changeLabel}
          />
        </div>
        <p className="mt-3.5 text-[12.5px] text-gray-700">{data.observation}</p>
        <div className="mt-2.5 flex items-center gap-2">
          <button type="button" className="h-8 px-3 rounded-lg bg-[#5C92FF] text-white text-[12px] font-medium">
            자세히 보기
          </button>
          <button type="button" className="h-8 px-3 rounded-lg border border-gray-200 bg-white text-[12px] text-gray-700">
            관련 기사
          </button>
          <button type="button" className="ml-1 text-[12px] text-gray-500">
            관심 없음
          </button>
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
  const player = useMaiPlayer();
  const [saved, setSaved] = useState(false);
  const accent = '#D63A3A';
  return (
    <div>
      <article className="relative rounded-card border border-gray-100 px-4 py-3.5 bg-gradient-to-tr from-white from-50% to-[#FFC2C2]">
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label={saved ? '저장됨' : '저장'}
            aria-pressed={saved}
            onClick={() => setSaved((s) => !s)}
            className="inline-flex items-center justify-center w-5 h-5 -ml-0.5 text-gray-700"
          >
            <Bookmark
              size={14}
              fill={saved ? 'currentColor' : 'none'}
              strokeWidth={2}
            />
          </button>
          <h3 className="text-[12px] font-bold leading-snug text-gray-900">
            이 시각 속보 브리핑
          </h3>
        </div>
        <div className="mt-2.5 flex flex-wrap gap-1">
          <span className={CHIP}>#{data.keyword}</span>
        </div>
        <p className="mt-2 text-[13px] text-gray-800 leading-relaxed">{data.summary}</p>
        <div className="mt-3 flex items-center gap-2">
          <button
            type="button"
            aria-label="재생"
            onClick={() =>
              player?.play({
                title: '이 시각 속보 브리핑',
                duration: data.duration,
                variant: 'flash',
              })
            }
            className="flex items-center gap-1.5 h-8 px-3 rounded-lg text-white text-[12px] font-medium"
            style={{ backgroundColor: accent }}
          >
            <Play size={12} fill="white" />
            재생
          </button>
          <button
            type="button"
            className="h-8 px-3 rounded-lg border border-gray-200 bg-white text-[12px] text-gray-700"
          >
            텍스트 보기
          </button>
        </div>
      </article>
      <div className="mt-2 rounded-card border border-gray-100 bg-white px-4 py-2 flex items-center justify-center gap-2 text-[11px] text-gray-600">
        <span className="inline-flex items-center gap-1">
          <Play size={10} fill="currentColor" className="text-gray-500" />
          <span className="font-semibold">{data.duration}</span>
        </span>
        <span className="text-gray-300">·</span>
        <span>
          기사 <span className="font-semibold">{data.basedOnCount}건</span> 기반
        </span>
        <span className="text-gray-300">·</span>
        <span className="text-gray-400">AI가 정리</span>
      </div>
    </div>
  );
}

/* ─────────── N-8 · 콘텐츠결 후속 (a 시리즈 / b 동일 기자) ─────────── */

export function N8Followup({ data }: { data: FollowupData }) {
  const isSeries = data.variant === 'series';
  const Icon = isSeries ? BookOpen : PenLine;
  return (
    <article className="bg-white px-4 py-3.5">
      <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-[#0F2A6B] text-white text-[11px] font-medium">
        <Icon size={12} strokeWidth={2.4} className="text-[#A8C2FF]" />
        {isSeries ? (
          <span>같은 시리즈의 후속</span>
        ) : (
          <span>
            <span className="font-bold">{data.byline ?? '같은 기자'}</span>
            <span className="font-normal opacity-90">의 후속 분석</span>
          </span>
        )}
      </div>

      <div className="mt-3 relative pl-4">
        <span
          className="absolute left-[3px] top-2 bottom-2 w-px bg-gray-200"
          aria-hidden
        />
        {/* Source — 이전에 읽은 글 */}
        <div className="flex items-start gap-3">
          <span
            className="absolute left-0 top-1.5 w-[7px] h-[7px] rounded-full border-2 border-gray-300 bg-white shrink-0"
            aria-hidden
          />
          <div className="flex-1 min-w-0 pb-3">
            <p className="text-[10px] font-medium text-gray-400 tracking-wide">
              이전에 읽은 글 · {data.sourceMeta ?? '읽음'}
            </p>
            <p className="mt-0.5 text-[12.5px] text-gray-500 leading-snug line-clamp-2">
              {data.sourceTitle ?? extractSourceFromObservation(data.observation)}
            </p>
          </div>
        </div>
        {/* Target — 추천된 후속 글 */}
        <div className="flex items-start gap-3">
          <span
            className="absolute left-0 top-1.5 w-[9px] h-[9px] rounded-full bg-[#5C92FF] shadow-[0_0_0_3px_rgba(92,146,255,0.18)] shrink-0"
            aria-hidden
          />
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-semibold text-[#3D6EE0] tracking-wide">
              지금 추천 · {data.elapsed}
            </p>
            <p className="mt-0.5 text-[14px] font-bold text-gray-900 leading-snug line-clamp-3">
              {data.title}
            </p>
            <p className="mt-1 text-[11px] text-gray-500">
              {data.publisher}
              {data.byline ? ` · ${data.byline}` : ''}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-3 text-[12px] text-gray-500">
        <button type="button" className="font-medium text-gray-900">
          원문 보기
        </button>
        <span className="w-px h-3 bg-gray-200" />
        <button type="button">관심 없음</button>
      </div>
    </article>
  );
}

function extractSourceFromObservation(observation: string) {
  const m = observation.match(/['"](.+?)['"]/);
  return m ? m[1] : observation;
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
      <div className="flex items-center gap-1.5 text-[12px] text-gray-700">
        <MapPin size={14} className="shrink-0" style={{ color: metro ? '#E5A398' : corel }} />
        <span className="font-semibold">
          {metro ? `${data.region}에서 많이 보는 기사` : `${data.region}에서 많이 보는 기사`}
        </span>
      </div>
      <div className="mt-2.5">
        {data.items.map((it, i) => (
          <div key={i}>
            {i > 0 ? (
              <div className="h-px bg-[#F5F5F5] mx-3" aria-hidden />
            ) : null}
            <div className="flex items-start gap-2.5 py-2.5">
              <span className="text-[18px] leading-none mt-0.5">{it.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="text-[13.5px] text-gray-900 leading-snug">{it.title}</p>
                <p className="mt-0.5 text-[11px] text-gray-500">
                  {it.publisher} · {it.elapsed}
                  {it.trending ? <span className="ml-1.5 text-[#E26B5C] font-semibold">▲급상승</span> : null}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
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
      <div className="mt-2.5">
        {data.items.map((it, i) => (
          <div key={i}>
            {i > 0 ? (
              <div className="h-px bg-[#F5F5F5] mx-3" aria-hidden />
            ) : null}
            <div className="flex items-start gap-2 py-2.5">
              <span className="text-gray-400 text-[12px] mt-0.5">📰</span>
              <div className="flex-1 min-w-0">
                <p className="text-[13.5px] text-gray-900 leading-snug">"{it.title}"</p>
                <p className="mt-0.5 text-[11px] text-gray-500">
                  {it.publisher} · {it.views} 열람
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
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
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const toggle = (kw: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(kw)) next.delete(kw);
      else next.add(kw);
      return next;
    });
  return (
    <article className="rounded-card bg-[#F5F7FA] px-4 py-3.5">
      <div className="flex items-center justify-between text-[12px]">
        <span className="font-semibold text-gray-800">
          {data.scope === 'all' ? '지금 많이 추적하는 키워드' : '당신의 관심사 근처에서 뜨고 있어요'}
        </span>
        <button type="button" className="text-gray-500">더 보기</button>
      </div>
      <div className="mt-2.5 flex flex-wrap gap-1.5">
        {data.items.map((it) => {
          const isSelected = selected.has(it.keyword);
          return (
            <button
              key={it.keyword}
              type="button"
              aria-pressed={isSelected}
              onClick={() => toggle(it.keyword)}
              className={cn(
                'inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-chip text-[12px] transition-colors',
                isSelected
                  ? 'bg-[#2C2C2C] text-white border border-[#2C2C2C]'
                  : 'bg-white border border-gray-100',
              )}
            >
              <Check
                size={11}
                strokeWidth={3}
                className={cn(
                  'transition-all',
                  isSelected ? 'opacity-100 mr-0.5' : 'opacity-0 w-0 mr-0',
                )}
              />
              <span className={cn('font-semibold', isSelected ? 'text-white' : 'text-gray-900')}>
                #{it.keyword}
              </span>
              <span
                className={cn(
                  'text-[11px]',
                  isSelected ? 'text-white/80' : 'text-gray-500',
                )}
              >
                ▸ {it.meta}
              </span>
            </button>
          );
        })}
      </div>
    </article>
  );
}
