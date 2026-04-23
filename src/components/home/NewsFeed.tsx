import { MoreHorizontal } from 'lucide-react';
import type { ReactNode } from 'react';
import type { NewsArticle } from '@/types';
import type { AdSlot } from '@/mocks/ads';
import { ThumbRow } from '@/components/ui/patterns';
import { AdBanner } from '@/components/ui/AdBanner';

interface NewsFeedProps {
  articles: NewsArticle[];
  ads?: AdSlot[];
  adEvery?: number;
}

export function NewsFeed({ articles, ads = [], adEvery = 4 }: NewsFeedProps) {
  const nodes: ReactNode[] = [];
  let adIndex = 0;

  articles.forEach((a, i) => {
    const isChannel = a.sourceType === 'channel';
    const author = isChannel ? (a.channelAuthor ?? a.publisher) : a.publisher;
    nodes.push(
      <ThumbRow
        key={a.id}
        to={isChannel ? `/channel/${a.id}` : `/news/${a.id}`}
        thumbnail={
          <img
            src={a.thumbnailUrl}
            alt=""
            className="w-full h-full object-cover"
            loading="lazy"
          />
        }
        footer={
          <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
            {isChannel ? (
              <span className="text-[10px] font-semibold text-daum-blue bg-daum-blue/10 px-1.5 py-0.5 rounded shrink-0">
                채널
              </span>
            ) : null}
            <span className="truncate">{author}</span>
            <span>·</span>
            <span className="shrink-0">{a.publishedAt}</span>
            <span className="ml-auto">
              <MoreHorizontal size={14} />
            </span>
          </div>
        }
      >
        <h3 className="text-[14px] leading-snug font-semibold line-clamp-2 text-gray-900">
          {a.title}
        </h3>
      </ThumbRow>,
    );
    const shouldInsertAd = (i + 1) % adEvery === 0 && adIndex < ads.length;
    if (shouldInsertAd) {
      nodes.push(<AdBanner key={`ad-${ads[adIndex].id}`} ad={ads[adIndex]} />);
      adIndex += 1;
    }
  });

  return <section className="bg-white py-1">{nodes}</section>;
}
