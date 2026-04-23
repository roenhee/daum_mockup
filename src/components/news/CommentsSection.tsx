import { useState } from 'react';
import { Info, ThumbsUp, ThumbsDown, MessageCircle, MoreHorizontal } from 'lucide-react';
import type { Comment } from '@/mocks/newsDetail';
import { SectionMoreButton } from '@/components/ui/SectionHeader';
import { cn } from '@/lib/cn';

interface CommentsSectionProps {
  comments: Comment[];
  totalCount: number;
  elapsed: string;
}

type SortTab = 'latest' | 'best' | 'old';

const SORT_TABS: { id: SortTab; label: string }[] = [
  { id: 'latest', label: '최신순' },
  { id: 'best', label: '추천순' },
  { id: 'old', label: '과거순' },
];

export function CommentsSection({ comments, totalCount, elapsed }: CommentsSectionProps) {
  const [sort, setSort] = useState<SortTab>('latest');
  const [value, setValue] = useState('');

  return (
    <section className="bg-white">
      <div className="px-4 pt-5 pb-3 flex items-baseline gap-2">
        <h2 className="text-[15px] font-bold text-gray-900">댓글</h2>
        <span className="text-[13px] font-semibold text-daum-blue tabular-nums">
          {totalCount}
        </span>
        <span className="ml-auto text-[11px] text-gray-400">{elapsed} 경과</span>
      </div>

      <div className="px-4 pb-3">
        <div className="flex items-center gap-2 h-11 rounded-full border border-gray-200 px-4">
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="댓글로 의견을 남겨주세요"
            className="flex-1 min-w-0 bg-transparent text-[13px] text-gray-900 placeholder:text-gray-400 focus:outline-none"
          />
          <button
            type="button"
            disabled={!value.trim()}
            className="text-[13px] font-semibold text-daum-blue disabled:text-gray-300"
          >
            등록
          </button>
        </div>
      </div>

      <div className="px-4 pb-2 flex items-center gap-3">
        {SORT_TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setSort(t.id)}
            className={cn(
              'text-[12px] font-medium',
              sort === t.id ? 'text-gray-900' : 'text-gray-400',
            )}
          >
            {t.label}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-1 text-[11px] text-gray-500">
          <Info size={12} />
          <span>세이프봇 작동 중</span>
        </div>
      </div>

      <ul className="divide-y divide-gray-100 px-4">
        {comments.map((c) => (
          <CommentRow key={c.id} comment={c} />
        ))}
      </ul>

      <SectionMoreButton label={`댓글 ${totalCount}개 전체 보기`} />
    </section>
  );
}

function CommentRow({ comment }: { comment: Comment }) {
  return (
    <li className="py-3">
      <div className="flex items-center gap-2">
        <img
          src={comment.avatarUrl}
          alt=""
          className="w-7 h-7 rounded-full object-cover bg-gray-100 shrink-0"
        />
        <div className="min-w-0">
          <span className="text-[13px] font-semibold text-gray-900">
            {comment.nickname}
          </span>
          <span className="ml-1 text-[11px] text-gray-400">{comment.timeAgo}</span>
        </div>
        <button aria-label="더보기" className="ml-auto text-gray-400">
          <MoreHorizontal size={16} />
        </button>
      </div>
      <p className="mt-2 pl-9 text-[14px] leading-snug text-gray-900 whitespace-pre-line">
        {comment.body}
      </p>
      <div className="mt-2 pl-9 flex items-center justify-between text-[12px] text-gray-500">
        <button
          type="button"
          aria-label="답글"
          className="inline-flex items-center gap-1"
        >
          <MessageCircle size={14} />
          <span className="tabular-nums">{comment.replies}</span>
        </button>
        <div className="flex items-center gap-3">
          <button type="button" className="inline-flex items-center gap-1">
            <ThumbsUp size={13} />
            <span className="tabular-nums">{comment.likes}</span>
          </button>
          <button type="button" className="inline-flex items-center gap-1">
            <ThumbsDown size={13} />
            <span className="tabular-nums">{comment.dislikes}</span>
          </button>
        </div>
      </div>
    </li>
  );
}
