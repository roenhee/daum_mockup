import { useMemo, useState } from 'react';
import { Check, MessageCircle, ThumbsDown, ThumbsUp } from 'lucide-react';
import { cn } from '@/lib/cn';
import { asset } from '@/lib/asset';
import {
  COMMENT_NOTIFICATIONS,
  MY_COMMENTS,
  type CommentNotification,
  type MyComment,
} from '@/mocks/maiHistory';
import { ConfirmDialog } from './ConfirmDialog';
import { EditChip } from './EditChip';

type CommentKind = 'mine' | 'reactions';

const COMMENT_KINDS: { id: CommentKind; label: string }[] = [
  { id: 'mine', label: '내 댓글' },
  { id: 'reactions', label: '댓글 알림' },
];

export function CommentSubtab() {
  const [kind, setKind] = useState<CommentKind>('mine');
  const [editing, setEditing] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [confirmDelete, setConfirmDelete] = useState(false);

  const ids = useMemo(
    () =>
      kind === 'mine'
        ? MY_COMMENTS.map((c) => c.id)
        : COMMENT_NOTIFICATIONS.map((n) => n.id),
    [kind],
  );
  const allSelected = editing && selected.size === ids.length && ids.length > 0;

  function changeKind(next: CommentKind) {
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
        {COMMENT_KINDS.map((k) => (
          <ChipButton
            key={k.id}
            active={kind === k.id}
            onClick={() => changeKind(k.id)}
          >
            {k.label}
          </ChipButton>
        ))}
        <EditChip active={editing} onClick={toggleEditing} />
      </div>

      {kind === 'mine' ? (
        <ul>
          {MY_COMMENTS.map((c) => (
            <MyCommentRow
              key={c.id}
              comment={c}
              editing={editing}
              checked={selected.has(c.id)}
              onToggle={() => toggleItem(c.id)}
            />
          ))}
        </ul>
      ) : (
        <ul>
          {COMMENT_NOTIFICATIONS.map((n) => (
            <NotificationRow
              key={n.id}
              notif={n}
              editing={editing}
              checked={selected.has(n.id)}
              onToggle={() => toggleItem(n.id)}
            />
          ))}
        </ul>
      )}

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

function EditCheck({ checked }: { checked: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        'mt-0.5 inline-flex items-center justify-center w-5 h-5 rounded-full border shrink-0',
        checked
          ? 'bg-daum-red border-daum-red text-white'
          : 'bg-white border-gray-300 text-transparent',
      )}
    >
      <Check size={12} strokeWidth={3} />
    </span>
  );
}

interface MyCommentRowProps {
  comment: MyComment;
  editing: boolean;
  checked: boolean;
  onToggle: () => void;
}

function MyCommentRow({ comment, editing, checked, onToggle }: MyCommentRowProps) {
  const body = (
    <div className="flex items-start gap-3 px-4 py-4 border-b border-gray-100">
      {editing ? <EditCheck checked={checked} /> : null}
      <article className="flex-1 min-w-0">
        <header className="flex items-center gap-2">
          <span className="text-[13px] font-semibold text-gray-900">
            {comment.username}
          </span>
          <span className="text-[12px] text-gray-400">{comment.createdAt}</span>
        </header>
        <p className="mt-1.5 text-[14px] text-gray-900 leading-relaxed whitespace-pre-line">
          {comment.body}
        </p>
        <div className="mt-3 flex items-stretch gap-2.5">
          <span aria-hidden className="w-0.5 self-stretch bg-gray-300 shrink-0" />
          <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 shrink-0">
            <img
              src={asset(comment.article.thumbnailUrl)}
              alt=""
              className="w-full h-full object-cover"
              draggable={false}
              loading="lazy"
            />
          </div>
          <p className="self-center text-[13px] text-gray-700 leading-snug line-clamp-2">
            {comment.article.title}
          </p>
        </div>
        <footer className="mt-2.5 flex items-center gap-3 text-[12px] text-gray-500">
          <span className="inline-flex items-center gap-1">
            <MessageCircle size={13} strokeWidth={2} />
            {comment.commentCount}
          </span>
          <span className="inline-flex items-center gap-1">
            <ThumbsUp size={13} strokeWidth={2} />
            {comment.likeCount}
          </span>
          <span className="inline-flex items-center gap-1">
            <ThumbsDown size={13} strokeWidth={2} />
            {comment.dislikeCount}
          </span>
        </footer>
      </article>
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

interface NotificationRowProps {
  notif: CommentNotification;
  editing: boolean;
  checked: boolean;
  onToggle: () => void;
}

function NotificationRow({ notif, editing, checked, onToggle }: NotificationRowProps) {
  const body = (
    <div className="flex items-start gap-3 px-4 py-4 border-b border-gray-100">
      {editing ? <EditCheck checked={checked} /> : null}
      <article className="flex-1 min-w-0">
        <header className="flex items-start gap-2.5">
          <img
            src={notif.avatarUrl}
            alt=""
            width={36}
            height={36}
            draggable={false}
            className="w-9 h-9 rounded-full bg-gray-100 shrink-0"
          />
          <div className="flex-1 min-w-0">
            <p className="text-[13px] text-gray-700 leading-snug">
              <span className="font-semibold text-gray-900">{notif.username}</span>
              <span>님이 내 댓글에 반응하였습니다.</span>
            </p>
            <p className="mt-0.5 text-[12px] text-gray-400">{notif.createdAt}</p>
          </div>
        </header>
        <p className="mt-2 ml-[46px] text-[13px] text-gray-700 leading-relaxed line-clamp-3">
          {notif.reply}
        </p>
      </article>
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
