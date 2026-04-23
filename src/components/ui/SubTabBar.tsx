import { NavLink } from 'react-router-dom';
import { useDragScroll } from '@/lib/useDragScroll';
import { cn } from '@/lib/cn';

export interface SubTab {
  id: string;
  label: string;
  to: string;
  end?: boolean;
}

interface SubTabBarProps {
  tabs: SubTab[];
  className?: string;
}

export function SubTabBar({ tabs, className }: SubTabBarProps) {
  const { ref, isDragging, handlers } = useDragScroll<HTMLDivElement>();

  return (
    <div
      ref={ref}
      {...handlers}
      className={cn(
        'bg-white border-b border-gray-100 overflow-x-auto no-scrollbar select-none touch-pan-x',
        isDragging ? 'cursor-grabbing' : 'cursor-grab',
        className,
      )}
    >
      <nav className="flex gap-5 px-4 min-w-max">
        {tabs.map((t) => (
          <NavLink
            key={t.id}
            to={t.to}
            end={t.end}
            className={({ isActive }) =>
              cn(
                'relative py-3 text-[14px] whitespace-nowrap',
                isActive ? 'font-bold text-gray-900' : 'font-medium text-gray-500',
              )
            }
          >
            {({ isActive }) => (
              <>
                {t.label}
                {isActive ? (
                  <span className="absolute left-0 right-0 -bottom-px h-0.5 bg-gray-900" />
                ) : null}
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
