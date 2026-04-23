import { useState } from 'react';
import { cn } from '@/lib/cn';
import type { SportCategory } from '@/mocks/sports';

interface SportCategoryChipsProps {
  categories: SportCategory[];
  defaultId?: string;
}

export function SportCategoryChips({ categories, defaultId }: SportCategoryChipsProps) {
  const [active, setActive] = useState(defaultId ?? categories[0]?.id);

  return (
    <nav className="shrink-0 bg-white border-b border-gray-100">
      <ul className="flex gap-2 px-4 py-2.5 overflow-x-auto no-scrollbar">
        {categories.map((c) => {
          const isActive = c.id === active;
          return (
            <li key={c.id} className="shrink-0">
              <button
                type="button"
                onClick={() => setActive(c.id)}
                className={cn(
                  'h-8 px-3 rounded-full text-[13px] transition-colors',
                  isActive
                    ? 'bg-gray-900 text-white font-semibold'
                    : 'bg-gray-100 text-gray-700',
                )}
              >
                {c.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
