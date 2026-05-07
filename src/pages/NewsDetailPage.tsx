import { useEffect } from 'react';
import { DetailShell } from '@/components/layout/DetailShell';
import { PublisherHeader } from '@/components/news/PublisherHeader';
import { ArticleBody } from '@/components/news/ArticleBody';
import { markNewsViewed } from '@/components/notification/AiSuggestBubble';
import { EmotionReactions } from '@/components/news/EmotionReactions';
import { SamePublisherSection } from '@/components/news/SamePublisherSection';
import { CommentsSection } from '@/components/news/CommentsSection';
import { InterestArticles } from '@/components/news/InterestArticles';
import { RecommendHeadlineSection } from '@/components/news/RecommendHeadlineSection';
import { PublisherRanking } from '@/components/news/PublisherRanking';
import {
  RelatedKeywordSubscribe,
  OthersSubscribedKeywords,
  TrendingKeywordRanking,
  type KeywordCard,
} from '@/components/news/NewsKeywordSlots';
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

const ARTICLE_KEYWORDS = ['한미정상회담', '이재명', '트럼프', '비핵화', '대북지원'];

const RELATED_KEYWORDS: KeywordCard[] = [
  { keyword: '한미정상회담', subscribers: '4.2만 명', note: '오늘 보도량 ×3.6' },
  { keyword: '비핵화', subscribers: '2.8만 명', note: '북한 정책 동향' },
  { keyword: '대북지원', subscribers: '1.4만 명', note: '인도적 접근 의제' },
  { keyword: '오벌 오피스', subscribers: '7천 명', note: '백악관 일정 추적' },
  { keyword: '북한 인권', subscribers: '6.5천 명', note: '국제기구 보고서 묶음' },
  { keyword: '이재명 외교', subscribers: '3.1만 명', note: '대통령 일정 키워드' },
];

const OTHERS_KEYWORDS: KeywordCard[] = [
  { keyword: '반도체 공급망', subscribers: '8.7만 명', note: '소부장 협의체 신설' },
  { keyword: '한미동맹', subscribers: '5.6만 명', note: '경제·안보 의제' },
  { keyword: '조선업', subscribers: '2.1만 명', note: 'LNG선 수주 협의' },
  { keyword: '우주항공', subscribers: '1.8만 명', note: '한미 공동연구 합의' },
  { keyword: '관세', subscribers: '4.4만 명', note: '트럼프 행정부 의제' },
  { keyword: '이차전지', subscribers: '6.0만 명', note: '핵심광물 공급망' },
];

const TRENDING_KEYWORDS: KeywordCard[] = [
  { keyword: '이란 전쟁', subscribers: '12.4만 명', note: '오늘 +1.8만' },
  { keyword: '늑구', subscribers: '9.3만 명', note: '오늘 +9천' },
  { keyword: 'HBM', subscribers: '8.7만 명', note: '오늘 +1.4천' },
];

function Gap() {
  return <div className="h-1 bg-gray-100 shrink-0" aria-hidden />;
}

export function NewsDetailPage() {
  const article = DEFAULT_ARTICLE;

  useEffect(() => {
    markNewsViewed();
  }, []);

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
        <ArticleBody
          article={article}
          commentCount={COMMENT_TOTAL}
          keywords={ARTICLE_KEYWORDS}
        />

        <EmotionReactions votes={DEFAULT_EMOTION_VOTES} />
        <Gap />
        <RelatedKeywordSubscribe keywords={RELATED_KEYWORDS} />
        <Gap />

        <SamePublisherSection
          publisherName={article.publisher}
          articles={SAME_PUBLISHER_ARTICLES}
        />
        <Gap />

        <AdBanner ad={HOME_ADS[1]} />
        <Gap />

        <OthersSubscribedKeywords keywords={OTHERS_KEYWORDS} />
        <Gap />

        <CommentsSection
          comments={DEFAULT_COMMENTS}
          totalCount={COMMENT_TOTAL}
          elapsed="3시간 12분"
        />
        <Gap />

        <TrendingKeywordRanking keywords={TRENDING_KEYWORDS} />
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
