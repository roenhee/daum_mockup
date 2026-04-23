import { useState } from 'react';
import { Heart, MessageCircle, Send } from 'lucide-react';
import { cn } from '@/lib/cn';

interface LikeCommentBarProps {
  likeCount: number;
  commentCount: number;
}

export function LikeCommentBar({ likeCount, commentCount }: LikeCommentBarProps) {
  const [liked, setLiked] = useState(false);
  const displayedLikes = liked ? likeCount + 1 : likeCount;

  return (
    <div className="bg-white flex items-center justify-between px-4 py-3 border-y border-gray-100">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => setLiked((v) => !v)}
          className="inline-flex items-center gap-1.5"
          aria-label="좋아요"
        >
          <Heart
            size={20}
            className={cn(liked ? 'text-daum-red' : 'text-gray-500')}
            fill={liked ? 'currentColor' : 'none'}
          />
          <span
            className={cn(
              'text-[13px] font-medium tabular-nums',
              liked ? 'text-daum-red' : 'text-gray-700',
            )}
          >
            {displayedLikes.toLocaleString()}
          </span>
        </button>
        <button type="button" className="inline-flex items-center gap-1.5" aria-label="댓글">
          <MessageCircle size={20} className="text-gray-500" />
          <span className="text-[13px] font-medium text-gray-700 tabular-nums">
            {commentCount.toLocaleString()}
          </span>
        </button>
      </div>
      <button type="button" aria-label="공유" className="text-gray-500">
        <Send size={18} />
      </button>
    </div>
  );
}
