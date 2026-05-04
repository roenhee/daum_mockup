import { cn } from '@/lib/cn';
import { useDragScroll } from '@/lib/useDragScroll';
import { RECOMMEND_CATEGORIES } from '@/mocks/maiSubscribe';

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export function CategoryChipBar({ value, onChange }: Props) {
  const { ref, isDragging, handlers } = useDragScroll<HTMLDivElement>();
  return (
    <div
      ref={ref}
      {...handlers}
      className={cn(
        'overflow-x-auto no-scrollbar select-none touch-pan-x',
        isDragging ? 'cursor-grabbing' : 'cursor-grab',
      )}
    >
      <div className="flex items-center gap-1.5 px-4 py-2 min-w-max">
        {RECOMMEND_CATEGORIES.map((c) => {
          const active = value === c.id;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => onChange(c.id)}
              aria-pressed={active}
              className={cn(
                'h-8 px-3 rounded-full text-[12px] font-medium border transition-colors shrink-0',
                active
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'bg-white text-gray-700 border-gray-200',
              )}
            >
              {c.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
