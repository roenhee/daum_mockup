import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowDownUp, Check, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/cn';
import { useDragScroll } from '@/lib/useDragScroll';
import {
  NOTIFICATION_CATEGORIES,
  NOTIFICATION_GROUPS,
  type NotificationCategory,
  type NotificationItem,
} from '@/mocks/maiNotification';
import { ConfirmDialog } from '@/components/mai/history/ConfirmDialog';

const CATEGORY_LABEL: Record<NotificationCategory, string> = NOTIFICATION_CATEGORIES.reduce(
  (acc, c) => ({ ...acc, [c.id]: c.label }),
  {} as Record<NotificationCategory, string>,
);

export function MaiNotificationPage() {
  const navigate = useNavigate();
  const [category, setCategory] = useState<NotificationCategory>('news');
  const [editing, setEditing] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [confirmDelete, setConfirmDelete] = useState(false);

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

  const visibleIds = useMemo(
    () => groups.flatMap((g) => g.items.map((i) => i.id)),
    [groups],
  );
  const allSelected = editing && visibleIds.length > 0 && selected.size === visibleIds.length;

  function toggleEditing() {
    setEditing((prev) => {
      const next = !prev;
      if (!next) setSelected(new Set());
      return next;
    });
  }

  function toggleItem(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleAll() {
    if (allSelected) setSelected(new Set());
    else setSelected(new Set(visibleIds));
  }

  return (
    <div className="relative flex flex-col h-full bg-white">
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

      <CategoryChipBar
        value={category}
        onChange={(v) => {
          setCategory(v);
          setSelected(new Set());
        }}
        onOrderEdit={() => navigate('/mai-notification/order')}
      />

      <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden no-scrollbar">
        {groups.length === 0 ? (
          <div className="px-6 py-16 text-center text-[13px] text-gray-400">
            받은 알림이 없어요
          </div>
        ) : (
          groups.map((g, gi) => (
            <section key={g.dateLabel}>
              {gi === 0 ? null : <div aria-hidden className="h-2 bg-gray-100" />}
              <DateRow
                dateLabel={g.dateLabel}
                showActions={gi === 0}
                editing={editing}
                onToggleEdit={toggleEditing}
                onOpenSettings={() => navigate('/mai-notification/settings')}
              />
              <ul>
                {g.items.map((item) => (
                  <li key={item.id}>
                    <NotificationRow
                      item={item}
                      editing={editing}
                      checked={selected.has(item.id)}
                      onToggle={() => toggleItem(item.id)}
                    />
                  </li>
                ))}
              </ul>
            </section>
          ))
        )}
        {editing ? <div className="h-20" aria-hidden /> : null}
      </main>

      {editing ? (
        <div className="shrink-0 bg-white/85 backdrop-blur-sm border-t border-gray-100">
          <div className="flex items-center gap-2 px-4 py-3">
            <button
              type="button"
              onClick={toggleAll}
              className="flex-1 h-11 rounded-card border border-gray-300 bg-white text-[14px] font-semibold text-gray-800 active:bg-gray-50"
            >
              {allSelected ? '전체해제' : '전체선택'}
            </button>
            <button
              type="button"
              disabled={selected.size === 0}
              onClick={() => setConfirmDelete(true)}
              className="flex-1 h-11 rounded-card bg-daum-red text-[14px] font-semibold text-white disabled:bg-gray-300 active:opacity-90"
            >
              삭제{selected.size > 0 ? ` (${selected.size})` : ''}
            </button>
          </div>
        </div>
      ) : null}

      {confirmDelete ? (
        <ConfirmDialog
          title="알림을 삭제하시겠어요?"
          body="삭제된 알림은 복구할 수 없습니다."
          onCancel={() => setConfirmDelete(false)}
          onConfirm={() => {
            setSelected(new Set());
            setEditing(false);
            setConfirmDelete(false);
          }}
        />
      ) : null}
    </div>
  );
}

function CategoryChipBar({
  value,
  onChange,
  onOrderEdit,
}: {
  value: NotificationCategory;
  onChange: (v: NotificationCategory) => void;
  onOrderEdit: () => void;
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
          onClick={onOrderEdit}
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
  editing,
  onToggleEdit,
  onOpenSettings,
}: {
  dateLabel: string;
  showActions: boolean;
  editing: boolean;
  onToggleEdit: () => void;
  onOpenSettings: () => void;
}) {
  return (
    <div className="flex items-center justify-between px-4 pt-4 pb-2">
      <h2 className="text-[13px] font-bold text-gray-900">{dateLabel}</h2>
      {showActions ? (
        <div className="flex items-center gap-3 -mr-1">
          <button
            type="button"
            onClick={onToggleEdit}
            className={cn(
              'px-1 py-0.5 text-[12px] font-medium active:text-gray-900',
              editing ? 'text-daum-blue font-semibold' : 'text-gray-600',
            )}
          >
            {editing ? '완료' : '편집'}
          </button>
          <span className="w-px h-3 bg-gray-200" aria-hidden />
          <button
            type="button"
            onClick={onOpenSettings}
            className="px-1 py-0.5 text-[12px] font-medium text-gray-600 active:text-gray-900"
          >
            알림 설정
          </button>
        </div>
      ) : null}
    </div>
  );
}

function NotificationRow({
  item,
  editing,
  checked,
  onToggle,
}: {
  item: NotificationItem;
  editing: boolean;
  checked: boolean;
  onToggle: () => void;
}) {
  const content = (
    <article className="flex items-start gap-3 px-4 py-3 active:bg-gray-50">
      {editing ? (
        <span
          aria-hidden
          className={cn(
            'mt-1 inline-flex items-center justify-center w-5 h-5 rounded-full border shrink-0',
            checked
              ? 'bg-daum-red border-daum-red text-white'
              : 'bg-white border-gray-300 text-transparent',
          )}
        >
          <Check size={12} strokeWidth={3} />
        </span>
      ) : null}
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

  if (editing) {
    return (
      <button
        type="button"
        onClick={onToggle}
        aria-pressed={checked}
        className="w-full text-left"
      >
        {content}
      </button>
    );
  }

  return content;
}
