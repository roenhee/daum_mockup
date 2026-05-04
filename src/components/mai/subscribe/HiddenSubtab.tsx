import { useMemo, useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { cn } from '@/lib/cn';
import { RECOMMEND_PRESS_CHANNELS } from '@/mocks/maiSubscribe';
import { CategoryChipBar } from './CategoryChipBar';

export function HiddenSubtab() {
  const [hidden, setHidden] = useState<Set<string>>(new Set());
  const [onlyHidden, setOnlyHidden] = useState(false);
  const [category, setCategory] = useState<string>('all');

  const list = useMemo(
    () =>
      RECOMMEND_PRESS_CHANNELS.filter((p) => {
        if (category !== 'all' && p.category !== category) return false;
        if (onlyHidden && !hidden.has(p.id)) return false;
        return true;
      }),
    [category, onlyHidden, hidden],
  );

  function toggleHidden(id: string) {
    setHidden((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden no-scrollbar bg-white">
      <div className="flex items-center justify-between px-4 py-3">
        <button
          type="button"
          onClick={() => setOnlyHidden((o) => !o)}
          aria-pressed={onlyHidden}
          className="inline-flex items-center gap-2"
        >
          <Switch active={onlyHidden} />
          <span className="text-[13px] font-medium text-gray-800">
            숨김한 언론만 보기
          </span>
        </button>
        <button
          type="button"
          onClick={() => setHidden(new Set())}
          disabled={hidden.size === 0}
          className="inline-flex items-center gap-1 text-[13px] font-medium text-gray-500 disabled:text-gray-300"
        >
          <RotateCcw size={14} strokeWidth={2.2} />
          숨김 초기화
        </button>
      </div>

      <CategoryChipBar value={category} onChange={setCategory} />

      <p className="px-4 pt-3 pb-4 text-[12px] text-gray-500 leading-relaxed">
        언론사 숨김시 MY 뉴스탭, 뉴스탭, 연예탭, 스포츠탭의 주요뉴스 영역에서
        해당 언론사의 기사가 보이지 않습니다. 숨김한 언론사가 많은 경우 첫화면에
        제공할 뉴스가 부족해 숨김한 언론사의 기사도 노출될 수 있습니다.
      </p>

      <div aria-hidden className="h-2 bg-gray-100" />

      <ul className="pb-6">
        {list.length === 0 ? (
          <li className="px-4 py-12 text-center text-[13px] text-gray-400">
            {onlyHidden ? '숨김한 언론사가 없어요' : '해당 분류의 언론사가 없어요'}
          </li>
        ) : (
          list.map((p) => (
            <li key={p.id}>
              <PressRow
                avatarUrl={p.avatarUrl}
                name={p.name}
                hidden={hidden.has(p.id)}
                onToggle={() => toggleHidden(p.id)}
              />
            </li>
          ))
        )}
      </ul>
    </main>
  );
}

function Switch({ active }: { active: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        'relative inline-block w-9 h-5 rounded-full transition-colors shrink-0',
        active ? 'bg-daum-blue' : 'bg-gray-300',
      )}
    >
      <span
        className={cn(
          'absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform',
          active && 'translate-x-4',
        )}
      />
    </span>
  );
}

function PressRow({
  avatarUrl,
  name,
  hidden,
  onToggle,
}: {
  avatarUrl: string;
  name: string;
  hidden: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <img
        src={avatarUrl}
        alt=""
        width={36}
        height={36}
        draggable={false}
        className="w-9 h-9 rounded-full bg-gray-100 shrink-0"
      />
      <span className="flex-1 min-w-0 text-[14px] font-semibold text-gray-900 truncate">
        {name}
      </span>
      <button
        type="button"
        onClick={onToggle}
        aria-pressed={hidden}
        className={cn(
          'h-8 px-3 rounded-full border text-[12px] font-semibold transition-colors shrink-0',
          hidden
            ? 'border-gray-200 bg-gray-100 text-gray-500'
            : 'border-gray-300 bg-white text-gray-700',
        )}
      >
        {hidden ? '숨김 해제' : '숨김'}
      </button>
    </div>
  );
}
