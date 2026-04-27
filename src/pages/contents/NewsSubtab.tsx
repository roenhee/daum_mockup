import { BizBoard } from '@/components/ui/BizBoard';
import { AdBanner } from '@/components/ui/AdBanner';
import { ShortsSection } from '@/components/home/ShortsSection';
import { MajorHeadlines } from '@/components/contents/MajorHeadlines';
import { CompactWeather } from '@/components/contents/CompactWeather';
import { RecommendNewsList } from '@/components/contents/RecommendNewsList';
import { PhotoNewsCarousel } from '@/components/contents/PhotoNewsCarousel';
import { MoreHeadlines } from '@/components/contents/MoreHeadlines';
import { LiveNewsSection } from '@/components/contents/LiveNewsSection';
import { SubtabSections } from '@/components/contents/SubtabSections';
import {
  MAJOR_HEADLINES,
  RECOMMEND_NEWS,
  PHOTO_NEWS,
  MOST_VIEWED_HEADLINES,
  LIVE_NEWS,
} from '@/mocks/contentsNews';
import { HOME_WEATHER } from '@/mocks/weather';
import { HOME_ADS } from '@/mocks/ads';
import { HOME_SHORTS } from '@/mocks/shorts';

export function NewsSubtab() {
  return (
    <SubtabSections>
      <BizBoard compact />
      <MajorHeadlines headlines={MAJOR_HEADLINES} />
      <CompactWeather weather={HOME_WEATHER} />
      <RecommendNewsList headlines={RECOMMEND_NEWS} timestamp="09:51 기준" />
      <PhotoNewsCarousel items={PHOTO_NEWS} />
      <MoreHeadlines
        title="많이 본 뉴스"
        headlines={MOST_VIEWED_HEADLINES.slice(0, 5)}
        timestamp="09:51 기준"
      />
      <AdBanner ad={HOME_ADS[1]} />
      <ShortsSection items={HOME_SHORTS} title="오늘의 루프" moreLabel="루프 더보기" />
      <MoreHeadlines title="경제·사회 주요뉴스" headlines={MOST_VIEWED_HEADLINES.slice(5)} />
      <LiveNewsSection items={LIVE_NEWS} />
    </SubtabSections>
  );
}
