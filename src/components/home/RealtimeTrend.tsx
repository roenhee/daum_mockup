import { useState } from 'react';
import { ChevronDown, ChevronUp, Minus } from 'lucide-react';
import type { Trend, TrendStatus } from '@/types';

interface RealtimeTrendProps {
  trends: Trend[];
  label?: string;
  timestamp?: string;
}

export function RealtimeTrend({ trends, label = '실시간 트렌드', timestamp = '15:20 기준' }: RealtimeTrendProps) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? trends : trends.slice(0, 2);

  return (
    <section className="px-4 py-3 bg-white">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-baseline gap-2">
          <span className="text-[13px] font-bold">{label}</span>
          <span className="text-[11px] text-gray-400">{timestamp}</span>
        </div>
        <button
          onClick={() => setExpanded((v) => !v)}
          className="text-gray-500 p-1"
          aria-label={expanded ? '접기' : '펼치기'}
        >
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      <ol className="flex flex-col gap-y-2.5">
        {visible.map((t) => (
          <TrendRow key={t.rank} trend={t} />
        ))}
      </ol>
    </section>
  );
}

function TrendRow({ trend }: { trend: Trend }) {
  return (
    <li className="flex items-center gap-2 text-[14px]">
      <span className="w-4 text-[13px] font-bold text-gray-900 shrink-0">{trend.rank}</span>
      <span className="flex-1 truncate text-gray-900">{trend.keyword}</span>
      <TrendMarker status={trend.status} change={trend.change} />
    </li>
  );
}

function TrendMarker({ status, change }: { status: TrendStatus; change?: number }) {
  if (status === 'new') {
    return <span className="text-[10px] font-bold text-daum-red">N</span>;
  }
  if (status === 'up') {
    return (
      <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-daum-red">
        <svg width="8" height="8" viewBox="0 0 8 8" aria-hidden="true">
          <path d="M4 1L7 6H1z" fill="currentColor" />
        </svg>
        {change ?? ''}
      </span>
    );
  }
  if (status === 'down') {
    return (
      <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-daum-blue">
        <svg width="8" height="8" viewBox="0 0 8 8" aria-hidden="true">
          <path d="M4 7L1 2H7z" fill="currentColor" />
        </svg>
        {change ?? ''}
      </span>
    );
  }
  return <Minus size={10} className="text-gray-400" />;
}
