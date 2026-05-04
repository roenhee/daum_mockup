import { useEffect, useMemo, useRef, useState } from 'react';
import {
  AlertCircle,
  ArrowUpRight,
  Check,
  ChevronLeft,
  MoreHorizontal,
  Plus,
  X,
} from 'lucide-react';
import { cn } from '@/lib/cn';
import { asset } from '@/lib/asset';
import { SAVED_ITEMS, type SavedItem } from '@/mocks/maiHistory';
import { ConfirmDialog } from './ConfirmDialog';
import { EditChip } from './EditChip';

const MAX_TAGS = 10;

export function SavedSubtab() {
  const [items, setItems] = useState<SavedItem[]>(SAVED_ITEMS);
  const [editing, setEditing] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [tagListOpen, setTagListOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [moreOpenId, setMoreOpenId] = useState<string | null>(null);
  const [tagEditId, setTagEditId] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const tagCounts = useMemo(() => {
    const map = new Map<string, number>();
    for (const item of items) {
      for (const tag of item.hashtags) {
        map.set(tag, (map.get(tag) ?? 0) + 1);
      }
    }
    return Array.from(map.entries()).sort(
      (a, b) => b[1] - a[1] || a[0].localeCompare(b[0]),
    );
  }, [items]);

  const visibleItems = useMemo(
    () =>
      activeTag ? items.filter((i) => i.hashtags.includes(activeTag)) : items,
    [items, activeTag],
  );
  const ids = useMemo(() => visibleItems.map((i) => i.id), [visibleItems]);
  const allSelected = editing && selected.size === ids.length && ids.length > 0;

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

  function chooseTag(tag: string) {
    setActiveTag(tag);
    setTagListOpen(false);
    setSelected(new Set());
  }

  function saveTagEdit(id: string, hashtags: string[]) {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, hashtags } : i)),
    );
    if (activeTag && !hashtags.includes(activeTag)) {
      // 편집 후 활성 태그가 사라지면 항목이 리스트에서 빠지지만 필터는 유지
    }
  }

  const editTarget = items.find((i) => i.id === tagEditId) ?? null;

  return (
    <>
      <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden no-scrollbar relative">
        <div className="relative flex items-center justify-between gap-2 px-4 py-3">
          <div className="flex items-center gap-2">
            <EditChip active={editing} onClick={toggleEditing} />
            <ChipButton
              active={Boolean(activeTag)}
              onClick={() => setTagListOpen(true)}
            >
              {activeTag ? `#${activeTag}` : '#태그목록'}
            </ChipButton>
          </div>
          <div className="relative">
            <button
              type="button"
              aria-label="안내"
              onClick={() => setInfoOpen((v) => !v)}
              className="text-gray-500 active:text-gray-700"
            >
              <AlertCircle size={20} strokeWidth={2} />
            </button>
            {infoOpen ? <InfoCallout onClose={() => setInfoOpen(false)} /> : null}
          </div>
        </div>

        <ul>
          {visibleItems.map((item) => (
            <SavedRow
              key={item.id}
              item={item}
              editing={editing}
              checked={selected.has(item.id)}
              activeTag={activeTag}
              onToggle={() => toggleItem(item.id)}
              moreOpen={moreOpenId === item.id}
              onOpenMore={() => setMoreOpenId(item.id)}
              onCloseMore={() => setMoreOpenId(null)}
              onEditTags={() => {
                setTagEditId(item.id);
                setMoreOpenId(null);
              }}
            />
          ))}
          {visibleItems.length === 0 ? (
            <li className="px-6 py-12 text-center text-[13px] text-gray-400">
              #{activeTag}에 저장된 콘텐츠가 없어요.
            </li>
          ) : null}
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
        ) : activeTag ? (
          <div className="sticky bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-gray-100">
            <div className="px-4 py-3">
              <button
                type="button"
                onClick={() => setActiveTag(null)}
                className="w-full h-11 rounded-card border border-gray-300 bg-white text-[14px] font-semibold text-gray-800 inline-flex items-center justify-center gap-1 active:bg-gray-50"
              >
                <ChevronLeft size={16} strokeWidth={2} />
                전체 목록 돌아가기
              </button>
            </div>
          </div>
        ) : null}
      </main>

      {tagListOpen ? (
        <TagListModal
          tagCounts={tagCounts}
          totalCount={items.length}
          activeTag={activeTag}
          onSelectTag={chooseTag}
          onClose={() => setTagListOpen(false)}
        />
      ) : null}
      {editTarget ? (
        <TagEditModal
          item={editTarget}
          onClose={() => setTagEditId(null)}
          onSave={(tags) => {
            saveTagEdit(editTarget.id, tags);
            setTagEditId(null);
          }}
        />
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
    </>
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

interface SavedRowProps {
  item: SavedItem;
  editing: boolean;
  checked: boolean;
  activeTag: string | null;
  onToggle: () => void;
  moreOpen: boolean;
  onOpenMore: () => void;
  onCloseMore: () => void;
  onEditTags: () => void;
}

function SavedRow({
  item,
  editing,
  checked,
  activeTag,
  onToggle,
  moreOpen,
  onOpenMore,
  onCloseMore,
  onEditTags,
}: SavedRowProps) {
  const body = (
    <div className="relative flex gap-3 px-4 py-3">
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
      <div className="relative shrink-0 w-[88px] h-[88px] rounded-xl overflow-hidden bg-gray-100">
        <img
          src={asset(item.thumbnailUrl)}
          alt=""
          className="w-full h-full object-cover"
          draggable={false}
          loading="lazy"
        />
      </div>
      <div className="flex-1 min-w-0 h-[88px] flex flex-col">
        <p className="text-[14px] font-semibold text-gray-900 leading-snug line-clamp-2">
          {item.title}
        </p>
        <p className="mt-1 text-[12px] text-gray-500 truncate">{item.source}</p>
        <div className={cn('mt-auto flex flex-wrap gap-1', !editing && 'pr-8')}>
          {item.hashtags.map((tag) => {
            const highlighted = activeTag === tag;
            return (
              <span
                key={tag}
                className={cn(
                  'inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium',
                  highlighted
                    ? 'bg-daum-red/10 text-daum-red'
                    : 'bg-gray-100 text-gray-600',
                )}
              >
                #{tag}
              </span>
            );
          })}
        </div>
      </div>
      {!editing ? (
        <div className="absolute bottom-3 right-3">
          <button
            type="button"
            aria-label="더보기"
            onClick={(e) => {
              e.stopPropagation();
              onOpenMore();
            }}
            className="p-1 -mr-1 text-gray-400 active:text-gray-700"
          >
            <MoreHorizontal size={20} strokeWidth={2} />
          </button>
          {moreOpen ? (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={(e) => {
                  e.stopPropagation();
                  onCloseMore();
                }}
              />
              <div className="absolute bottom-full right-0 mb-1 z-50 bg-white rounded-lg border border-gray-200 shadow-lg min-w-[120px] overflow-hidden">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditTags();
                  }}
                  className="w-full text-left px-3.5 py-2.5 text-[13px] text-gray-800 active:bg-gray-50"
                >
                  태그 편집
                </button>
              </div>
            </>
          ) : null}
        </div>
      ) : null}
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
          {body}
        </button>
      </li>
    );
  }

  return <li>{body}</li>;
}

interface TagListModalProps {
  tagCounts: [string, number][];
  totalCount: number;
  activeTag: string | null;
  onSelectTag: (tag: string) => void;
  onClose: () => void;
}

function TagListModal({
  tagCounts,
  totalCount,
  activeTag,
  onSelectTag,
  onClose,
}: TagListModalProps) {
  return (
    <div
      className="absolute inset-0 z-40 flex items-center justify-center bg-black/40 px-6"
      onClick={onClose}
      role="dialog"
      aria-label="태그 목록"
    >
      <div
        className="w-full max-w-[320px] max-h-[70%] bg-white rounded-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="shrink-0 flex items-center justify-between px-4 pt-4 pb-3 border-b border-gray-100">
          <h2 className="text-[15px] font-bold text-gray-900">태그 목록</h2>
          <button
            type="button"
            aria-label="닫기"
            onClick={onClose}
            className="-mr-1 p-1 text-gray-700"
          >
            <X size={20} strokeWidth={2} />
          </button>
        </header>
        <ul className="flex-1 min-h-0 overflow-y-auto no-scrollbar">
          <li className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <span className="text-[14px] font-semibold text-gray-900">전체</span>
            <span className="text-[13px] font-semibold text-gray-900">
              {totalCount}
            </span>
          </li>
          {tagCounts.map(([tag, count]) => {
            const active = activeTag === tag;
            return (
              <li key={tag}>
                <button
                  type="button"
                  onClick={() => onSelectTag(tag)}
                  className={cn(
                    'w-full flex items-center justify-between px-4 py-3 border-b border-gray-50 last:border-b-0 active:bg-gray-50',
                    active && 'bg-daum-red/5',
                  )}
                >
                  <span
                    className={cn(
                      'text-[14px]',
                      active
                        ? 'text-daum-red font-semibold'
                        : 'text-gray-800',
                    )}
                  >
                    #{tag}
                  </span>
                  <span
                    className={cn(
                      'text-[13px]',
                      active ? 'text-daum-red font-semibold' : 'text-gray-500',
                    )}
                  >
                    {count}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

function InfoCallout({ onClose }: { onClose: () => void }) {
  return (
    <>
      <div
        className="fixed inset-0 z-30"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      />
      <div
        className="absolute top-full right-0 mt-2 z-40 w-[230px]"
        role="dialog"
        aria-label="찜 안내"
      >
        <span
          aria-hidden
          className="absolute -top-[6px] right-2.5 block w-3 h-3 rotate-45 bg-white border-l border-t border-gray-200"
        />
        <div className="relative bg-white rounded-2xl border border-gray-200 shadow-lg px-4 pt-3 pb-3.5">
          <header className="flex items-start justify-between gap-2">
            <h2 className="text-[13px] font-bold text-gray-900 leading-snug">
              찜한 콘텐츠 보관 안내
            </h2>
            <button
              type="button"
              aria-label="닫기"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="-mr-1 -mt-0.5 p-0.5 text-gray-500"
            >
              <X size={16} strokeWidth={2} />
            </button>
          </header>
          <p className="mt-1.5 text-[12px] text-gray-600 leading-relaxed">
            찜한 콘텐츠는 6개월간 보관되며,
            <br />
            태그로 분류해 다시 찾을 수 있어요.
          </p>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onClose();
            }}
            className="mt-2 inline-flex items-center gap-0.5 text-[12px] font-semibold text-daum-blue"
          >
            보관 정책 자세히 보기
            <ArrowUpRight size={12} strokeWidth={2.4} />
          </a>
        </div>
      </div>
    </>
  );
}

interface TagEditModalProps {
  item: SavedItem;
  onClose: () => void;
  onSave: (hashtags: string[]) => void;
}

function TagEditModal({ item, onClose, onSave }: TagEditModalProps) {
  const [tags, setTags] = useState<string[]>(item.hashtags);
  const [input, setInput] = useState('');
  const [warning, setWarning] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const atLimit = tags.length >= MAX_TAGS;

  function commit() {
    const value = input.trim().replace(/^#/, '');
    if (!value) return;
    if (tags.includes(value)) {
      setWarning('이미 추가된 태그예요.');
      return;
    }
    if (atLimit) {
      setWarning(`태그는 최대 ${MAX_TAGS}개까지 추가할 수 있어요.`);
      return;
    }
    setTags([...tags, value]);
    setInput('');
    setWarning(null);
  }

  function removeTag(t: string) {
    setTags(tags.filter((x) => x !== t));
    setWarning(null);
  }

  return (
    <div
      className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 px-6"
      onClick={onClose}
      role="dialog"
      aria-label="태그 편집"
    >
      <div
        className="w-full max-w-[320px] bg-white rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between px-4 pt-4 pb-3">
          <h2 className="text-[15px] font-bold text-gray-900">태그 편집</h2>
          <button
            type="button"
            aria-label="닫기"
            onClick={onClose}
            className="-mr-1 p-1 text-gray-700"
          >
            <X size={20} strokeWidth={2} />
          </button>
        </header>
        <div className="px-4 pb-4">
          <p className="text-[12px] text-gray-500">
            추가한 태그 <span className="font-semibold text-gray-700">{tags.length}</span>
            <span className="text-gray-400">/{MAX_TAGS}</span>
          </p>
          <div className="mt-2 min-h-[36px] flex flex-wrap gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-2 py-2">
            {tags.length === 0 ? (
              <span className="text-[12px] text-gray-400">추가된 태그가 없어요</span>
            ) : (
              tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 rounded-full bg-white border border-gray-200 px-2 py-0.5 text-[12px] text-gray-700"
                >
                  #{tag}
                  <button
                    type="button"
                    aria-label={`${tag} 삭제`}
                    onClick={() => removeTag(tag)}
                    className="text-gray-400 active:text-gray-700"
                  >
                    <X size={12} strokeWidth={2.4} />
                  </button>
                </span>
              ))
            )}
          </div>
          <div className="mt-3 flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setWarning(null);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  commit();
                }
              }}
              placeholder={atLimit ? '태그 한도에 도달했어요' : '태그 입력 후 추가'}
              disabled={atLimit}
              className="flex-1 h-10 rounded-lg border border-gray-200 bg-white px-3 text-[13px] text-gray-900 placeholder:text-gray-400 disabled:bg-gray-50"
            />
            <button
              type="button"
              onClick={commit}
              disabled={!input.trim() || atLimit}
              className="h-10 rounded-lg bg-gray-900 px-3 text-[12px] font-semibold text-white inline-flex items-center gap-1 disabled:bg-gray-300"
            >
              <Plus size={14} strokeWidth={2.4} />
              추가
            </button>
          </div>
          {warning ? (
            <p className="mt-2 text-[12px] text-daum-red">{warning}</p>
          ) : null}
        </div>
        <div className="flex border-t border-gray-100">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 text-[14px] font-semibold text-gray-600 active:bg-gray-50"
          >
            취소
          </button>
          <button
            type="button"
            onClick={() => onSave(tags)}
            className="flex-1 py-3 text-[14px] font-semibold text-daum-red border-l border-gray-100 active:bg-gray-50"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
}
