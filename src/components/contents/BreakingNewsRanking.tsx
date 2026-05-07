import { Link } from 'react-router-dom';
import { ArrowUp, Flame } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { cn } from '@/lib/cn';

export interface BreakingRankItem {
  id: string;
  title: string;
  multiplier: string; // e.g. "×4.6" or "신규"
  reason?: string; // 한 줄 보도 사유 (옵션)
  isNew?: boolean;
}

interface BreakingNewsRankingProps {
  items: BreakingRankItem[];
  timestamp?: string;
}

export function BreakingNewsRanking({ items, timestamp }: BreakingNewsRankingProps) {
  return (
    <section className="bg-white">
      <SectionHeader
        title={
          <span className="inline-flex items-center gap-1.5">
            <Flame size={14} className="text-daum-red" strokeWidth={2.4} />
            보도량 급상승
          </span>
        }
        right={timestamp}
      />
      <ol className="px-4 pb-4 divide-y divide-gray-100">
        {items.slice(0, 5).map((item, i) => (
          <li key={item.id}>
            <Link
              to={`/news/${item.id}`}
              className="flex items-center gap-3 py-2.5"
            >
              <span
                className={cn(
                  'shrink-0 inline-flex items-center justify-center w-6 text-[15px] font-extrabold tabular-nums',
                  i === 0 ? 'text-daum-red' : 'text-gray-700',
                )}
              >
                {i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-semibold text-gray-900 leading-snug line-clamp-2">
                  {item.title}
                </p>
                {item.reason ? (
                  <p className="mt-0.5 text-[11px] text-gray-500 line-clamp-1">
                    {item.reason}
                  </p>
                ) : null}
              </div>
              <span
                className={cn(
                  'shrink-0 inline-flex items-center gap-0.5 px-2 py-[3px] rounded-md text-[11px] font-bold',
                  item.isNew
                    ? 'bg-daum-blue/10 text-daum-blue'
                    : 'bg-daum-red/10 text-daum-red',
                )}
              >
                {item.isNew ? (
                  '신규'
                ) : (
                  <>
                    <ArrowUp size={10} strokeWidth={2.6} />
                    {item.multiplier}
                  </>
                )}
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
