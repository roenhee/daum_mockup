import { SlidersHorizontal } from 'lucide-react';
import { useDragScroll } from '@/lib/useDragScroll';
import { cn } from '@/lib/cn';

interface SearchTabBarProps {
  tabs: { id: string; label: string }[];
  activeId: string;
  onChange: (id: string) => void;
}

export function SearchTabBar({ tabs, activeId, onChange }: SearchTabBarProps) {
  const { ref, isDragging, handlers } = useDragScroll<HTMLDivElement>();

  return (
    <div className="bg-white border-b border-gray-100 flex items-stretch">
      <div
        ref={ref}
        {...handlers}
        className={cn(
          'flex-1 overflow-x-auto no-scrollbar select-none touch-pan-x',
          isDragging ? 'cursor-grabbing' : 'cursor-grab',
        )}
      >
        <nav className="flex gap-5 px-4 min-w-max">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => onChange(t.id)}
              className={cn(
                'relative py-3 text-[14px] whitespace-nowrap',
                activeId === t.id
                  ? 'font-bold text-gray-900'
                  : 'font-medium text-gray-500',
              )}
            >
              {t.label}
              {activeId === t.id ? (
                <span className="absolute left-0 right-0 -bottom-px h-0.5 bg-gray-900" />
              ) : null}
            </button>
          ))}
        </nav>
      </div>
      <button
        type="button"
        aria-label="설정"
        className="shrink-0 w-11 border-l border-gray-100 text-gray-500 flex items-center justify-center"
      >
        <SlidersHorizontal size={16} />
      </button>
    </div>
  );
}
