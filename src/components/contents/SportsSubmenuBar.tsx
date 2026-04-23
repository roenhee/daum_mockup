export interface SportsSubmenuItem {
  id: string;
  label: string;
  icon: string;
}

interface SportsSubmenuBarProps {
  items: SportsSubmenuItem[];
}

export function SportsSubmenuBar({ items }: SportsSubmenuBarProps) {
  return (
    <section className="bg-white border-b border-gray-100">
      <ul className="flex gap-1 px-3 py-4 overflow-x-auto no-scrollbar">
        {items.map((item) => (
          <li key={item.id} className="shrink-0 w-[66px]">
            <button
              type="button"
              className="w-full flex flex-col items-center gap-1.5"
            >
              <span
                aria-hidden
                className="w-12 h-12 rounded-full bg-gray-100 inline-flex items-center justify-center text-[22px]"
              >
                {item.icon}
              </span>
              <span className="text-[12px] font-medium text-gray-700 truncate max-w-full">
                {item.label}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
