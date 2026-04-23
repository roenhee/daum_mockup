import { Link } from 'react-router-dom';
import { MoreHorizontal } from 'lucide-react';
import type { NewsArticle } from '@/types';
import { cn } from '@/lib/cn';

interface ChannelPostCardProps {
  article: NewsArticle;
  className?: string;
}

export function ChannelPostCard({ article, className }: ChannelPostCardProps) {
  const author = article.channelAuthor ?? article.publisher;

  return (
    <Link
      to={`/channel/${article.id}`}
      className={cn('flex gap-3 px-4 py-3 border-b border-gray-100', className)}
    >
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <h3 className="text-[15px] leading-snug font-semibold line-clamp-2 text-gray-900">
          {article.title}
        </h3>
        <div className="mt-2 flex items-center gap-1.5 text-[11px] text-gray-500">
          <span className="text-[10px] font-semibold text-daum-blue bg-daum-blue/10 px-1.5 py-0.5 rounded shrink-0">
            채널
          </span>
          <span className="truncate">{author}</span>
          <span>·</span>
          <span className="shrink-0">{article.publishedAt}</span>
          <span className="ml-auto">
            <MoreHorizontal size={14} />
          </span>
        </div>
      </div>
      <img
        src={article.thumbnailUrl}
        alt=""
        className="shrink-0 w-[84px] h-[84px] rounded-md object-cover bg-gray-100"
        loading="lazy"
      />
    </Link>
  );
}
