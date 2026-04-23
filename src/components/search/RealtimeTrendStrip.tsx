import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { Trend } from '@/types';

interface RealtimeTrendStripProps {
  trends: Trend[];
  intervalMs?: number;
}

export function RealtimeTrendStrip({ trends, intervalMs = 2800 }: RealtimeTrendStripProps) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (trends.length <= 1) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % trends.length), intervalMs);
    return () => clearInterval(t);
  }, [trends.length, intervalMs]);

  const current = trends[idx];
  if (!current) return null;

  return (
    <section className="bg-white px-4 py-2.5 border-b border-gray-100">
      <div className="flex items-center gap-2 text-[13px]">
        <span className="shrink-0 inline-flex items-center h-6 px-2 rounded-full bg-daum-blue/10 text-daum-blue text-[11px] font-bold">
          실시간
        </span>
        <span className="font-bold text-gray-900 tabular-nums shrink-0">{current.rank}</span>
        <span className="flex-1 min-w-0 truncate text-gray-700">{current.keyword}</span>
        <button type="button" className="shrink-0 text-gray-400 p-1" aria-label="전체 보기">
          <ChevronDown size={16} />
        </button>
      </div>
    </section>
  );
}
