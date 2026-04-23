import { DetailShell } from '@/components/layout/DetailShell';
import { PublisherHeader } from '@/components/news/PublisherHeader';
import { ArticleBody } from '@/components/news/ArticleBody';
import { EmotionReactions } from '@/components/news/EmotionReactions';
import { SamePublisherSection } from '@/components/news/SamePublisherSection';
import { CommentsSection } from '@/components/news/CommentsSection';
import { InterestArticles } from '@/components/news/InterestArticles';
import { RecommendHeadlineSection } from '@/components/news/RecommendHeadlineSection';
import { PublisherRanking } from '@/components/news/PublisherRanking';
import { RealtimeTrend } from '@/components/home/RealtimeTrend';
import { ShortsSection } from '@/components/home/ShortsSection';
import { AdBanner } from '@/components/ui/AdBanner';
import { SiteFooter } from '@/components/layout/SiteFooter';
import {
  DEFAULT_ARTICLE,
  DEFAULT_EMOTION_VOTES,
  DEFAULT_COMMENTS,
  SAME_PUBLISHER_ARTICLES,
  INTEREST_ARTICLES,
  RECOMMEND_HEADLINES,
} from '@/mocks/newsDetail';
import { REALTIME_TRENDS } from '@/mocks/trends';
import { HOME_SHORTS } from '@/mocks/shorts';
import { HOME_ADS } from '@/mocks/ads';

const COMMENT_TOTAL = 1284;

function Gap() {
  return <div className="h-1 bg-gray-100 shrink-0" aria-hidden />;
}

export function NewsDetailPage() {
  const article = DEFAULT_ARTICLE;

  return (
    <DetailShell scrollableTopBar>
      <div className="bg-gray-100 flex flex-col">
        <div className="sticky top-0 z-20">
          <PublisherHeader
            logoUrl={article.publisherLogoUrl}
            name={article.publisher}
            subscribed={article.publisherSubscribed}
          />
        </div>
        <ArticleBody article={article} commentCount={COMMENT_TOTAL} />

        <EmotionReactions votes={DEFAULT_EMOTION_VOTES} />
        <Gap />

        <SamePublisherSection
          publisherName={article.publisher}
          articles={SAME_PUBLISHER_ARTICLES}
        />
        <Gap />

        <AdBanner ad={HOME_ADS[1]} />
        <Gap />

        <CommentsSection
          comments={DEFAULT_COMMENTS}
          totalCount={COMMENT_TOTAL}
          elapsed="3시간 12분"
        />
        <Gap />

        <InterestArticles articles={INTEREST_ARTICLES} />
        <Gap />

        <RealtimeTrend trends={REALTIME_TRENDS} />
        <Gap />

        <RecommendHeadlineSection
          headlines={RECOMMEND_HEADLINES}
          timestamp="09:51 기준"
        />
        <Gap />

        <ShortsSection
          items={HOME_SHORTS}
          title="다음 루프"
          moreLabel="루프 더보기"
        />
        <Gap />

        <PublisherRanking />
        <SiteFooter />
      </div>
    </DetailShell>
  );
}
