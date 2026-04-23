import { cn } from '@/lib/cn';
import type { MarketIndex } from '@/mocks/money';

interface MarketIndicesGridProps {
  title?: string;
  timestamp?: string;
  indices: MarketIndex[];
}

export function MarketIndicesGrid({
  title = '금융시장',
  timestamp,
  indices,
}: MarketIndicesGridProps) {
  return (
    <section className="bg-white border-b border-gray-100">
      <div className="px-4 pt-4 pb-2 flex items-center justify-between">
        <div className="flex items-baseline gap-2">
          <h2 className="text-[14px] font-bold text-gray-900">{title}</h2>
          {timestamp ? (
            <span className="text-[11px] text-gray-400">{timestamp}</span>
          ) : null}
        </div>
        <button type="button" className="text-[12px] text-gray-500">
          전체 시세 &gt;
        </button>
      </div>
      <ul className="grid grid-cols-2 gap-2 px-4 pb-4">
        {indices.map((idx) => (
          <li key={idx.id}>
            <IndexCard idx={idx} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function IndexCard({ idx }: { idx: MarketIndex }) {
  const up = idx.change > 0;
  const down = idx.change < 0;
  const arrow = up ? '▲' : down ? '▼' : '—';
  const colorClass = up ? 'text-daum-red' : down ? 'text-daum-blue' : 'text-gray-500';
  const signedPct = `${up ? '+' : down ? '' : ''}${idx.changePct.toFixed(2)}%`;
  const signedChange = `${up ? '+' : down ? '' : ''}${idx.change.toFixed(2)}`;

  return (
    <div className="p-3 rounded-xl border border-gray-200 bg-white">
      <p className="text-[12px] text-gray-500">{idx.name}</p>
      <p className="mt-1 text-[17px] font-bold tabular-nums text-gray-900">
        {idx.value}
      </p>
      <p className={cn('mt-0.5 text-[11px] font-semibold tabular-nums', colorClass)}>
        {arrow} {signedChange} ({signedPct})
      </p>
    </div>
  );
}
