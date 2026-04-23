import { Landmark, ChevronRight } from 'lucide-react';
import type { Stock } from '@/types';
import { cn } from '@/lib/cn';

interface FinanceWidgetProps {
  kospi: Stock;
  kosdaq?: Stock;
}

export function FinanceWidget({ kospi, kosdaq }: FinanceWidgetProps) {
  return (
    <section className="bg-white">
      <div className="mx-4 my-2 rounded-lg border border-gray-200 overflow-hidden">
        <div className="flex items-center justify-between px-3 py-2 bg-yellow-50 border-b border-yellow-100">
          <div className="flex items-center gap-1.5 text-[12px] font-semibold text-gray-900">
            <Landmark size={14} className="text-yellow-600" />
            카카오뱅크 · 카카오증권
          </div>
          <ChevronRight size={14} className="text-gray-400" />
        </div>
        <div className="grid grid-cols-2 divide-x divide-gray-100">
          <StockMini stock={kospi} />
          {kosdaq ? <StockMini stock={kosdaq} /> : <AdCell />}
        </div>
      </div>
    </section>
  );
}

function StockMini({ stock }: { stock: Stock }) {
  const isUp = stock.change >= 0;
  return (
    <div className="px-3 py-2.5">
      <p className="text-[11px] text-gray-500">{stock.name}</p>
      <p className="mt-1 text-[15px] font-bold text-gray-900">
        {stock.price.toLocaleString()}
      </p>
      <p
        className={cn(
          'mt-0.5 text-[11px] font-semibold',
          isUp ? 'text-daum-red' : 'text-daum-blue',
        )}
      >
        {isUp ? '▲' : '▼'} {Math.abs(stock.change).toFixed(2)} ({stock.changeRate}%)
      </p>
    </div>
  );
}

function AdCell() {
  return (
    <div className="px-3 py-2.5 flex flex-col justify-center">
      <p className="text-[11px] text-gray-500">코스닥</p>
      <p className="mt-1 text-[15px] font-bold text-gray-900">892.45</p>
      <p className="mt-0.5 text-[11px] font-semibold text-daum-blue">▼ 4.21 (-0.47%)</p>
    </div>
  );
}
