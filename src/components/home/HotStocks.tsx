import { useState } from 'react';
import type { Stock } from '@/types';
import { STOCK_RANKING, STOCK_RANK_TABS, type StockRankTab } from '@/mocks/stocks';
import { SectionHeader, SectionMoreButton } from '@/components/ui/SectionHeader';
import { cn } from '@/lib/cn';

interface HotStocksProps {
  timestamp?: string;
}

export function HotStocks({ timestamp }: HotStocksProps) {
  const [activeTab, setActiveTab] = useState<StockRankTab>('search');
  const stocks = STOCK_RANKING[activeTab];

  return (
    <section className="bg-white">
      <SectionHeader title="다음 금융 종목 랭킹" right={timestamp} />

      <div className="px-4">
        <div className="flex gap-4 border-b border-gray-100">
          {STOCK_RANK_TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={cn(
                'py-2 text-[13px] font-medium relative',
                activeTab === t.id ? 'text-gray-900' : 'text-gray-400',
              )}
            >
              {t.label}
              {activeTab === t.id ? (
                <span className="absolute left-0 right-0 -bottom-px h-0.5 bg-gray-900" />
              ) : null}
            </button>
          ))}
        </div>

        <ol className="divide-y divide-gray-100">
          {stocks.map((s, i) => (
            <StockRow key={s.code} rank={i + 1} stock={s} />
          ))}
        </ol>
      </div>
      <SectionMoreButton label="종목 랭킹 더보기" />
    </section>
  );
}

function StockRow({ rank, stock }: { rank: number; stock: Stock }) {
  const isUp = stock.change >= 0;
  return (
    <li className="flex items-center gap-3 py-2.5 text-[14px]">
      <span className="w-4 text-gray-500 text-[13px] shrink-0">{rank}</span>
      <span className="flex-1 truncate font-medium">{stock.name}</span>
      <span className="w-20 text-right text-gray-900">{stock.price.toLocaleString()}</span>
      <span
        className={cn(
          'w-20 text-right text-[13px] font-semibold tabular-nums',
          isUp ? 'text-daum-red' : 'text-daum-blue',
        )}
      >
        {isUp ? '▲' : '▼'} {Math.abs(stock.changeRate).toFixed(2)}%
      </span>
    </li>
  );
}
