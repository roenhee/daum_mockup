import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowDownUp, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/cn';
import { useDragScroll } from '@/lib/useDragScroll';
import {
  NOTIFICATION_CATEGORIES,
  NOTIFICATION_GROUPS,
  type NotificationCategory,
  type NotificationItem,
} from '@/mocks/maiNotification';

const CATEGORY_LABEL: Record<NotificationCategory, string> = NOTIFICATION_CATEGORIES.reduce(
  (acc, c) => ({ ...acc, [c.id]: c.label }),
  {} as Record<NotificationCategory, string>,
);

export function MaiNotificationPage() {
  const navigate = useNavigate();
  const [category, setCategory] = useState<NotificationCategory>('news');

  const groups = useMemo(
    () =>
      NOTIFICATION_GROUPS.map((g) => ({
        dateLabel: g.dateLabel,
        items:
          category === 'news'
            ? g.items
            : g.items.filter((it) => it.category === category),
      })).filter((g) => g.items.length > 0),
    [category],
  );

  return (
    <div className="flex flex-col h-full bg-white">
      <header className="shrink-0 h-12 flex items-center px-3 border-b border-gray-100">
        <button
          type="button"
          aria-label="뒤로"
          onClick={() => navigate(-1)}
          className="p-1.5 -ml-1.5 text-gray-900"
        >
          <ChevronLeft size={24} strokeWidth={2} />
        </button>
        <span className="ml-1 text-[17px] font-bold text-gray-900">알림</span>
      </header>

      <CategoryChipBar value={category} onChange={setCategory} />

      <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden no-scrollbar">
        {groups.length === 0 ? (
          <div className="px-6 py-16 text-center text-[13px] text-gray-400">
            받은 알림이 없어요
          </div>
        ) : (
          groups.map((g, gi) => (
            <section key={g.dateLabel}>
              {gi === 0 ? null : <div aria-hidden className="h-2 bg-gray-100" />}
              <DateRow dateLabel={g.dateLabel} showActions={gi === 0} />
              <ul>
                {g.items.map((item) => (
                  <li key={item.id}>
                    <NotificationRow item={item} />
                  </li>
                ))}
              </ul>
            </section>
          ))
        )}
      </main>
    </div>
  );
}

function CategoryChipBar({
  value,
  onChange,
}: {
  value: NotificationCategory;
  onChange: (v: NotificationCategory) => void;
}) {
  const { ref, isDragging, handlers } = useDragScroll<HTMLDivElement>();
  return (
    <div
      ref={ref}
      {...handlers}
      className={cn(
        'border-b border-gray-100 bg-white overflow-x-auto no-scrollbar select-none touch-pan-x',
        isDragging ? 'cursor-grabbing' : 'cursor-grab',
      )}
    >
      <div className="flex items-center gap-1.5 px-4 py-2.5 min-w-max">
        {NOTIFICATION_CATEGORIES.map((c) => {
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
        <button
          type="button"
          aria-label="순서 편집"
          className="shrink-0 w-9 h-8 inline-flex items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 active:bg-gray-50"
        >
          <ArrowDownUp size={14} strokeWidth={2.2} className="rotate-90" />
        </button>
      </div>
    </div>
  );
}

function DateRow({
  dateLabel,
  showActions,
}: {
  dateLabel: string;
  showActions: boolean;
}) {
  return (
    <div className="flex items-center justify-between px-4 pt-4 pb-2">
      <h2 className="text-[13px] font-bold text-gray-900">{dateLabel}</h2>
      {showActions ? (
        <div className="flex items-center gap-3 -mr-1">
          <button
            type="button"
            className="px-1 py-0.5 text-[12px] font-medium text-gray-600 active:text-gray-900"
          >
            편집
          </button>
          <span className="w-px h-3 bg-gray-200" aria-hidden />
          <button
            type="button"
            className="px-1 py-0.5 text-[12px] font-medium text-gray-600 active:text-gray-900"
          >
            알림 설정
          </button>
        </div>
      ) : null}
    </div>
  );
}

function NotificationRow({ item }: { item: NotificationItem }) {
  return (
    <article className="flex items-start gap-3 px-4 py-3 active:bg-gray-50">
      <img
        src={item.avatarUrl}
        alt=""
        width={40}
        height={40}
        draggable={false}
        className="w-10 h-10 rounded-full bg-gray-100 shrink-0"
      />
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-bold text-gray-900 leading-snug line-clamp-1">
          {item.title}
        </p>
        <div className="mt-1 flex items-center gap-1.5">
          <span className="inline-flex items-center h-[18px] px-1.5 rounded-full bg-gray-100 text-[10px] font-medium text-gray-600">
            {CATEGORY_LABEL[item.category]}
          </span>
          <span className="text-[12px] text-gray-500">{item.time}</span>
        </div>
        <p className="mt-1 text-[13px] text-gray-700 leading-snug line-clamp-2">
          {item.body}
        </p>
      </div>
    </article>
  );
}
