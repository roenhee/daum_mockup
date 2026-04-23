import { MessageCircle } from 'lucide-react';
import { placeholderImg } from '@/lib/img';
import { cn } from '@/lib/cn';

interface ArticleMetaProps {
  publisher: string;
  elapsed?: string;
  commentCount?: number;
  publisherLogoSeed?: string;
  showLogo?: boolean;
  className?: string;
  size?: 'sm' | 'md';
}

export function ArticleMeta({
  publisher,
  elapsed,
  commentCount,
  publisherLogoSeed,
  showLogo = false,
  className,
  size = 'sm',
}: ArticleMetaProps) {
  const textSize = size === 'md' ? 'text-caption' : 'text-meta';
  return (
    <div className={cn('flex items-center gap-1.5', textSize, 'text-content-secondary', className)}>
      {showLogo && publisherLogoSeed ? (
        <img
          src={placeholderImg(`pub-${publisherLogoSeed}`, 40, 40, 'logo,media')}
          alt=""
          className="w-4 h-4 rounded-full bg-surface-gap object-cover shrink-0"
        />
      ) : null}
      <span className="truncate font-medium">{publisher}</span>
      {elapsed ? (
        <>
          <span className="text-content-faint">·</span>
          <span>{elapsed}</span>
        </>
      ) : null}
      {commentCount ? (
        <span className="ml-auto inline-flex items-center gap-1">
          <MessageCircle size={12} />
          {commentCount.toLocaleString()}
        </span>
      ) : null}
    </div>
  );
}
