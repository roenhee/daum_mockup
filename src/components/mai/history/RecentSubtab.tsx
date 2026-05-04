import { useMemo, useState } from 'react';
import { Check, Play } from 'lucide-react';
import { cn } from '@/lib/cn';
import { asset } from '@/lib/asset';
import {
  RECENT_HISTORY_GROUPS,
  type RecentHistoryItem,
} from '@/mocks/maiHistory';
import { ConfirmDialog } from './ConfirmDialog';
import { EditChip } from './EditChip';
import { Toast } from './Toast';

export function RecentSubtab() {
  const [saveOff, setSaveOff] = useState(false);
  const [editing, setEditing] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [confirmSaveOff, setConfirmSaveOff] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const allIds = useMemo(
    () => RECENT_HISTORY_GROUPS.flatMap((g) => g.items.map((i) => i.id)),
    [],
  );
  const allSelected = editing && selected.size === allIds.length;

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
    else setSelected(new Set(allIds));
  }

  function handleSaveChipClick() {
    if (!saveOff) {
      setConfirmSaveOff(true);
    } else {
      setSaveOff(false);
      setToast('최근 본 항목 저장을 시작합니다');
    }
  }

  return (
    <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden no-scrollbar relative">
      <div className="flex items-center gap-2 px-4 py-3">
        <EditChip active={editing} onClick={toggleEditing} />
        <button
          type="button"
          onClick={handleSaveChipClick}
          className={cn(
            'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12px] font-medium transition-colors',
            saveOff
              ? 'border-gray-300 bg-gray-100 text-gray-500'
              : 'border-gray-300 bg-white text-gray-700',
          )}
        >
          <span
            className={cn(
              'inline-block w-1.5 h-1.5 rounded-full',
              saveOff ? 'bg-gray-400' : 'bg-daum-red',
            )}
          />
          {saveOff ? '저장 기능 꺼짐' : '저장 기능 끄기'}
        </button>
      </div>

      <ul className={cn(editing ? 'pb-0' : 'pb-4')}>
        {RECENT_HISTORY_GROUPS.map((group, idx) => (
          <li key={group.dateLabel}>
            <div aria-hidden className="h-2 bg-gray-100" />
            <h2 className="px-4 pt-4 pb-2 text-[13px] font-bold text-gray-900">
              {group.dateLabel}
            </h2>
            <ul>
              {group.items.map((item) => (
                <RecentRow
                  key={item.id}
                  item={item}
                  editing={editing}
                  checked={selected.has(item.id)}
                  onToggle={() => toggleItem(item.id)}
                />
              ))}
            </ul>
          </li>
        ))}
      </ul>

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

      {confirmSaveOff ? (
        <ConfirmDialog
          title="저장 기능 사용을 중지하시겠어요?"
          body="설정을 끄면 이후 탐색한 항목은 목록에 표시되지 않습니다."
          onCancel={() => setConfirmSaveOff(false)}
          onConfirm={() => {
            setSaveOff(true);
            setConfirmSaveOff(false);
          }}
        />
      ) : null}

      {toast ? (
        <Toast message={toast} onDismiss={() => setToast(null)} />
      ) : null}
    </main>
  );
}

interface RecentRowProps {
  item: RecentHistoryItem;
  editing: boolean;
  checked: boolean;
  onToggle: () => void;
}

function RecentRow({ item, editing, checked, onToggle }: RecentRowProps) {
  const content = (
    <div className="flex items-start gap-3 px-4 py-3">
      {editing ? (
        <span
          aria-hidden
          className={cn(
            'mt-1 inline-flex items-center justify-center w-5 h-5 rounded-full border shrink-0',
            checked ? 'bg-daum-red border-daum-red text-white' : 'bg-white border-gray-300 text-transparent',
          )}
        >
          <Check size={12} strokeWidth={3} />
        </span>
      ) : null}
      <div className="relative shrink-0 w-[72px] h-[72px] rounded-xl overflow-hidden bg-gray-100">
        <img
          src={asset(item.thumbnailUrl)}
          alt=""
          className="w-full h-full object-cover"
          draggable={false}
          loading="lazy"
        />
        {item.isShorts ? (
          <span className="absolute left-1.5 bottom-1.5 inline-flex items-center gap-0.5 rounded-md bg-black/65 px-1.5 py-0.5 text-[10px] font-semibold text-white">
            <Play size={9} fill="currentColor" />
            쇼츠
          </span>
        ) : null}
      </div>
      <div className="flex-1 min-w-0 py-0.5">
        <p className="text-[14px] font-semibold text-gray-900 leading-snug line-clamp-2">
          {item.title}
        </p>
        <p className="mt-2 text-[12px] text-gray-500 truncate">{item.source}</p>
      </div>
    </div>
  );

  if (editing) {
    return (
      <li>
        <button
          type="button"
          onClick={onToggle}
          aria-pressed={checked}
          className="w-full text-left active:bg-gray-50"
        >
          {content}
        </button>
      </li>
    );
  }

  return <li>{content}</li>;
}
