import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bell,
  ChevronLeft,
  Coffee,
  GalleryVerticalEnd,
  Gift,
  Mail,
  Menu,
  Newspaper,
  RotateCcw,
  Sparkles,
  Sun,
  Users,
} from 'lucide-react';
import {
  NOTIFICATION_CATEGORIES,
  type NotificationCategory,
} from '@/mocks/maiNotification';

const ICON_MAP: Record<NotificationCategory, typeof Bell> = {
  news: Newspaper,
  mail: Mail,
  cafe: Coffee,
  community: Users,
  table: GalleryVerticalEnd,
  subscribe: Sparkles,
  benefit: Gift,
  life: Sun,
};

export function MaiNotificationOrderPage() {
  const navigate = useNavigate();
  const initial = useMemo(() => NOTIFICATION_CATEGORIES.map((c) => c.id), []);
  const [order, setOrder] = useState<NotificationCategory[]>(initial);
  const [draggingId, setDraggingId] = useState<NotificationCategory | null>(null);

  const isDirty = order.some((id, i) => id !== initial[i]);

  function moveItem(from: number, to: number) {
    if (from === to || to < 0 || to >= order.length) return;
    setOrder((prev) => {
      const next = prev.slice();
      const [item] = next.splice(from, 1);
      next.splice(to, 0, item);
      return next;
    });
  }

  function handleDragStart(id: NotificationCategory) {
    return (e: React.DragEvent<HTMLLIElement>) => {
      setDraggingId(id);
      e.dataTransfer.effectAllowed = 'move';
    };
  }

  function handleDragOver(targetId: NotificationCategory) {
    return (e: React.DragEvent<HTMLLIElement>) => {
      e.preventDefault();
      if (!draggingId || draggingId === targetId) return;
      const from = order.indexOf(draggingId);
      const to = order.indexOf(targetId);
      moveItem(from, to);
    };
  }

  function handleDragEnd() {
    setDraggingId(null);
  }

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
        <span className="ml-1 text-[17px] font-bold text-gray-900">
          알림함 메뉴 편집
        </span>
        <button
          type="button"
          onClick={() => setOrder(initial)}
          disabled={!isDirty}
          className="ml-auto inline-flex items-center gap-1 px-2 py-1 text-[13px] font-medium text-gray-700 disabled:text-gray-300"
        >
          <RotateCcw size={14} strokeWidth={2.2} />
          초기화
        </button>
      </header>

      <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden no-scrollbar">
        <p className="px-4 pt-4 pb-2 text-[12px] text-gray-500 leading-relaxed">
          순서를 길게 눌러 끌어 놓으면 알림함 상단 분류 칩의 순서가 바뀝니다.
        </p>
        <ul className="border-t border-gray-100">
          {order.map((id) => {
            const cat = NOTIFICATION_CATEGORIES.find((c) => c.id === id)!;
            const Icon = ICON_MAP[id];
            const isDragging = draggingId === id;
            return (
              <li
                key={id}
                draggable
                onDragStart={handleDragStart(id)}
                onDragOver={handleDragOver(id)}
                onDragEnd={handleDragEnd}
                className={
                  'flex items-center gap-3 px-4 py-3 border-b border-gray-100 bg-white' +
                  (isDragging ? ' opacity-50' : '')
                }
              >
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 text-gray-700 shrink-0">
                  <Icon size={18} strokeWidth={2} />
                </span>
                <span className="flex-1 min-w-0 text-[14px] font-semibold text-gray-900 truncate">
                  {cat.label}
                </span>
                <span
                  aria-label="순서 이동"
                  className="cursor-grab active:cursor-grabbing text-gray-400 p-1.5"
                >
                  <Menu size={20} strokeWidth={2} />
                </span>
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
}
