import type { NewsArticle } from '@/types';
import type { AdSlot } from '@/mocks/ads';
import { NewsCard } from '@/components/ui/NewsCard';
import { ChannelPostCard } from '@/components/ui/ChannelPostCard';
import { AdBanner } from '@/components/ui/AdBanner';

interface NewsFeedProps {
  articles: NewsArticle[];
  ads?: AdSlot[];
  adEvery?: number;
}

export function NewsFeed({ articles, ads = [], adEvery = 4 }: NewsFeedProps) {
  const nodes: React.ReactNode[] = [];
  let adIndex = 0;

  articles.forEach((a, i) => {
    nodes.push(
      a.sourceType === 'channel' ? (
        <ChannelPostCard key={a.id} article={a} />
      ) : (
        <NewsCard key={a.id} article={a} />
      ),
    );
    const shouldInsertAd = (i + 1) % adEvery === 0 && adIndex < ads.length;
    if (shouldInsertAd) {
      nodes.push(<AdBanner key={`ad-${ads[adIndex].id}`} ad={ads[adIndex]} />);
      adIndex += 1;
    }
  });

  return <section className="bg-white py-1">{nodes}</section>;
}
