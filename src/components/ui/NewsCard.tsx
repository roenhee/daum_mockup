import { Link } from 'react-router-dom';
import { MoreHorizontal } from 'lucide-react';
import type { NewsArticle } from '@/types';
import { cn } from '@/lib/cn';

interface NewsCardProps {
  article: NewsArticle;
  className?: string;
}

export function NewsCard({ article, className }: NewsCardProps) {
  return (
    <Link
      to={`/news/${article.id}`}
      className={cn(
        'flex gap-3 px-4 py-3 border-b border-gray-100',
        className,
      )}
    >
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <h3 className="text-[15px] leading-snug font-semibold line-clamp-2 text-gray-900">
          {article.title}
        </h3>
        <div className="mt-2 flex items-center gap-1.5 text-[11px] text-gray-500">
          <span className="truncate">{article.publisher}</span>
          <span>·</span>
          <span>{article.publishedAt}</span>
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
