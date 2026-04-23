import { cn } from '@/lib/cn';
import type { ExchangeRate } from '@/mocks/money';

interface ExchangeRateTableProps {
  rates: ExchangeRate[];
  timestamp?: string;
}

export function ExchangeRateTable({ rates, timestamp }: ExchangeRateTableProps) {
  return (
    <section className="bg-white border-b border-gray-100">
      <div className="px-4 pt-4 pb-2 flex items-center justify-between">
        <div className="flex items-baseline gap-2">
          <h2 className="text-[14px] font-bold text-gray-900">환율</h2>
          {timestamp ? (
            <span className="text-[11px] text-gray-400">{timestamp}</span>
          ) : null}
        </div>
        <button type="button" className="text-[12px] text-gray-500">
          환율 계산 &gt;
        </button>
      </div>
      <div className="px-4 pb-4">
        <div className="grid grid-cols-[1fr_auto_auto] gap-x-3 pb-2 border-b border-gray-200 text-[11px] text-gray-400">
          <span>국가</span>
          <span className="text-right">매매기준율</span>
          <span className="text-right w-[72px]">전일비</span>
        </div>
        <ul>
          {rates.map((r) => (
            <Row key={r.id} rate={r} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function Row({ rate }: { rate: ExchangeRate }) {
  const up = rate.changePct > 0;
  const down = rate.changePct < 0;
  const arrow = up ? '▲' : down ? '▼' : '—';
  const colorClass = up ? 'text-daum-red' : down ? 'text-daum-blue' : 'text-gray-500';
  const pct = `${up ? '+' : ''}${rate.changePct.toFixed(2)}%`;

  return (
    <li className="grid grid-cols-[1fr_auto_auto] gap-x-3 items-center py-2.5 border-b border-gray-100 last:border-b-0">
      <div className="flex items-center gap-2 min-w-0">
        <img
          src={`https://picsum.photos/seed/${rate.flagSeed}/40/40`}
          alt=""
          className="w-5 h-5 rounded-full object-cover bg-gray-100 shrink-0"
        />
        <div className="min-w-0">
          <p className="text-[13px] font-semibold text-gray-900 truncate">
            {rate.country}
          </p>
          <p className="text-[11px] text-gray-400 truncate">{rate.currency}</p>
        </div>
      </div>
      <span className="text-[14px] font-bold tabular-nums text-gray-900 text-right">
        {rate.base}
      </span>
      <span
        className={cn(
          'w-[72px] text-right text-[12px] font-semibold tabular-nums',
          colorClass,
        )}
      >
        {arrow} {pct}
      </span>
    </li>
  );
}
