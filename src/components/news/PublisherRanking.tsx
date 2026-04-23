import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PUBLISHER_RANKING, type RankingTab } from '@/mocks/newsDetail';
import { cn } from '@/lib/cn';

const TABS: { id: RankingTab; label: string }[] = [
  { id: 'mostViewed', label: '많이 본 뉴스' },
  { id: 'mostRead', label: '탐독한 뉴스' },
];

export function PublisherRanking() {
  const [tab, setTab] = useState<RankingTab>('mostViewed');
  const rows = PUBLISHER_RANKING[tab];

  return (
    <section className="bg-white">
      <div className="pt-5 pb-2 px-4 flex items-center gap-4 border-b border-gray-100">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={cn(
              'relative pb-2 text-[14px]',
              tab === t.id ? 'font-bold text-gray-900' : 'font-medium text-gray-400',
            )}
          >
            {t.label}
            {tab === t.id ? (
              <span className="absolute left-0 right-0 -bottom-px h-0.5 bg-gray-900" />
            ) : null}
          </button>
        ))}
      </div>
      <ol className="divide-y divide-gray-100 px-4">
        {rows.map((r) => (
          <li key={r.id}>
            <Link to={`/news/${r.id}`} className="flex items-start gap-3 py-3">
              <span className="w-5 text-[13px] font-bold text-gray-900 shrink-0 mt-0.5">
                {r.rank}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-[14px] leading-snug font-medium line-clamp-2 text-gray-900">
                  {r.title}
                </p>
                <p className="mt-1 text-[11px] text-gray-500">{r.publisher}</p>
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
