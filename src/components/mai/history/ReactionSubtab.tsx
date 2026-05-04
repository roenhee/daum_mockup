import { useMemo, useState } from 'react';
import { Check, Play } from 'lucide-react';
import { cn } from '@/lib/cn';
import { asset } from '@/lib/asset';
import {
  REACTION_DISLIKED_ITEMS,
  REACTION_LIKED_ITEMS,
  type ReactionItem,
} from '@/mocks/maiHistory';
import { ConfirmDialog } from './ConfirmDialog';
import { EditChip } from './EditChip';

type ReactionKind = 'liked' | 'disliked';

const REACTION_KINDS: { id: ReactionKind; label: string }[] = [
  { id: 'liked', label: '좋아요' },
  { id: 'disliked', label: '싫어요' },
];

export function ReactionSubtab() {
  const [kind, setKind] = useState<ReactionKind>('liked');
  const [editing, setEditing] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [confirmDelete, setConfirmDelete] = useState(false);

  const items = kind === 'liked' ? REACTION_LIKED_ITEMS : REACTION_DISLIKED_ITEMS;
  const ids = useMemo(() => items.map((i) => i.id), [items]);
  const allSelected = editing && selected.size === ids.length && ids.length > 0;

  function changeKind(next: ReactionKind) {
    if (next === kind) return;
    setKind(next);
    setSelected(new Set());
  }

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
    else setSelected(new Set(ids));
  }

  return (
    <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden no-scrollbar relative">
      <div className="flex items-center gap-2 px-4 py-3">
        <EditChip active={editing} onClick={toggleEditing} />
        {REACTION_KINDS.map((k) => (
          <ChipButton
            key={k.id}
            active={kind === k.id}
            onClick={() => changeKind(k.id)}
          >
            {k.label}
          </ChipButton>
        ))}
      </div>

      <div className="px-4 pb-4">
        <div className="columns-2 gap-3">
          {items.map((item) => (
            <ReactionCard
              key={item.id}
              item={item}
              editing={editing}
              checked={selected.has(item.id)}
              onToggle={() => toggleItem(item.id)}
            />
          ))}
        </div>
      </div>

      {editing ? (
        <div className="sticky bottom-0 left-0 right-0 bg-white/85 backdrop-blur-sm border-t border-gray-100">
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
          title="선택된 항목을 삭제하시겠습니까?"
          body="삭제된 항목은 복구할 수 없으며, 이후 확인한 항목부터 다시 저장됩니다."
          onCancel={() => setConfirmDelete(false)}
          onConfirm={() => {
            setSelected(new Set());
            setEditing(false);
            setConfirmDelete(false);
          }}
        />
      ) : null}
    </main>
  );
}

interface ChipButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

function ChipButton({ active, onClick, children }: ChipButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex items-center rounded-full border px-3 py-1.5 text-[12px] font-medium transition-colors',
        active
          ? 'border-gray-900 bg-gray-900 text-white'
          : 'border-gray-300 bg-white text-gray-700',
      )}
    >
      {children}
    </button>
  );
}

interface ReactionCardProps {
  item: ReactionItem;
  editing: boolean;
  checked: boolean;
  onToggle: () => void;
}

function ReactionCard({ item, editing, checked, onToggle }: ReactionCardProps) {
  const card = (
    <div className="mb-4 break-inside-avoid">
      <div
        className={cn(
          'relative w-full rounded-xl overflow-hidden bg-gray-100',
          item.isShorts ? 'aspect-[9/16]' : 'aspect-[4/3]',
        )}
      >
        <img
          src={asset(item.thumbnailUrl)}
          alt=""
          className="w-full h-full object-cover"
          draggable={false}
          loading="lazy"
        />
        {editing ? (
          <span
            aria-hidden
            className={cn(
              'absolute top-2 left-2 inline-flex items-center justify-center w-5 h-5 rounded-full border',
              checked
                ? 'bg-daum-red border-daum-red text-white'
                : 'bg-white/90 border-gray-300 text-transparent',
            )}
          >
            <Check size={12} strokeWidth={3} />
          </span>
        ) : null}
        {item.isShorts ? (
          <span className="absolute left-1.5 bottom-1.5 inline-flex items-center gap-0.5 rounded-md bg-black/65 px-1.5 py-0.5 text-[10px] font-semibold text-white">
            <Play size={9} fill="currentColor" />
            쇼츠
          </span>
        ) : null}
      </div>
      <p className="mt-2 text-[13px] font-semibold text-gray-900 leading-snug line-clamp-2">
        {item.title}
      </p>
      <p className="mt-1 text-[11px] text-gray-500 truncate">{item.source}</p>
    </div>
  );

  if (editing) {
    return (
      <button
        type="button"
        onClick={onToggle}
        aria-pressed={checked}
        className="w-full text-left"
      >
        {card}
      </button>
    );
  }

  return card;
}
