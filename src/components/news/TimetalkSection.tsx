import { useState } from 'react';
import { Info, ThumbsUp, ThumbsDown, MoreHorizontal } from 'lucide-react';
import type { Comment } from '@/mocks/newsDetail';
import { SectionMoreButton } from '@/components/ui/SectionHeader';
import { cn } from '@/lib/cn';

interface TimetalkSectionProps {
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

export function TimetalkSection({ comments, totalCount, elapsed }: TimetalkSectionProps) {
  const [sort, setSort] = useState<SortTab>('latest');
  const [value, setValue] = useState('');

  return (
    <section className="bg-white">
      <div className="px-4 pt-5 pb-3 flex items-baseline gap-2">
        <h2 className="text-[15px] font-bold text-gray-900">타임톡</h2>
        <span className="text-[13px] font-semibold text-daum-blue tabular-nums">
          {totalCount}
        </span>
        <span className="ml-auto text-[11px] text-gray-400">{elapsed} 경과</span>
      </div>

      <div className="px-4 pb-3">
        <div className="flex items-center gap-2 h-11 rounded-full border border-gray-200 px-3.5">
          <span className="w-6 h-6 rounded-full bg-gray-200 shrink-0" />
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="의견을 남겨보세요"
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

      <SectionMoreButton label={`타임톡 ${totalCount}개 전체 보기`} />
    </section>
  );
}

function CommentRow({ comment }: { comment: Comment }) {
  return (
    <li className="py-3">
      <div className="flex items-center gap-2 text-[11px] text-gray-500">
        <span className="font-semibold text-gray-700">{comment.nickname}</span>
        <span>·</span>
        <span>{comment.timeAgo}</span>
        <button aria-label="더보기" className="ml-auto text-gray-400">
          <MoreHorizontal size={14} />
        </button>
      </div>
      <p className="mt-1.5 text-[14px] leading-snug text-gray-900 whitespace-pre-line">
        {comment.body}
      </p>
      <div className="mt-2 flex items-center gap-3 text-[12px] text-gray-500">
        <button className="inline-flex items-center gap-1">
          <ThumbsUp size={12} />
          {comment.likes}
        </button>
        <button className="inline-flex items-center gap-1">
          <ThumbsDown size={12} />
          {comment.dislikes}
        </button>
        <button className="text-gray-500 font-medium">답글 {comment.replies}</button>
      </div>
    </li>
  );
}
