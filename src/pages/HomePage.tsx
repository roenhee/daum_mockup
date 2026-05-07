import { useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { HomeSideMenu } from '@/components/sidemenu/HomeSideMenu';
import { RealtimeTrend } from '@/components/home/RealtimeTrend';
import { WidgetCarousel } from '@/components/home/WidgetCarousel';
import { IssueSlot } from '@/components/home/IssueSlot';
import { NewsFeed } from '@/components/home/NewsFeed';
import { ShortsSection } from '@/components/home/ShortsSection';
import { SubscribedPublishers } from '@/components/home/SubscribedPublishers';
import { PublisherLiveSection } from '@/components/home/PublisherLiveSection';
import { CommunitySection } from '@/components/home/CommunitySection';
import { HotStocks } from '@/components/home/HotStocks';
import { AdBanner } from '@/components/ui/AdBanner';
import { REALTIME_TRENDS } from '@/mocks/trends';
import { HOME_NEWS_FEED, HERO_PHOTO_NEWS } from '@/mocks/news';
import { HOME_WEATHER, KOSPI_SUMMARY } from '@/mocks/weather';
import { SUBSCRIBED_PUBLISHERS } from '@/mocks/publishers';
import { LIVE_CONTENTS } from '@/mocks/live';
import { HOT_COMMUNITY_POSTS, HOT_NEWS_POSTS } from '@/mocks/community';
import { HOME_ADS } from '@/mocks/ads';
import { HOME_SHORTS } from '@/mocks/shorts';

const SECTION_TIMESTAMP = '04.21. 09:51 기준';

function Gap() {
  return <div className="h-1 bg-gray-100 shrink-0" aria-hidden />;
}

export function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const issues = HOME_NEWS_FEED.slice(0, 4);
  const feedA = HOME_NEWS_FEED.slice(4, 7);
  const feedB = HOME_NEWS_FEED.slice(7, 11);
  const feedC = HOME_NEWS_FEED.slice(11, 15);
  const feedD = HOME_NEWS_FEED.slice(15);

  return (
    <AppShell
      variant="home"
      scrollableHeader
      onOpenMenu={() => setMenuOpen(true)}
      fullOverlay={<HomeSideMenu open={menuOpen} onClose={() => setMenuOpen(false)} />}
    >
      <div className="bg-gray-100 flex flex-col">
        <RealtimeTrend trends={REALTIME_TRENDS} />
        <WidgetCarousel weather={HOME_WEATHER} kospi={KOSPI_SUMMARY} />
        <IssueSlot issues={issues} />
        <Gap />

        <NewsFeed articles={feedA} />
        <Gap />

        <ShortsSection items={HOME_SHORTS} />
        <Gap />

        <SubscribedPublishers
          publishers={SUBSCRIBED_PUBLISHERS}
          featured={HERO_PHOTO_NEWS}
        />
        <Gap />

        <PublisherLiveSection publisherName="한겨레" item={LIVE_CONTENTS[0]} />
        <Gap />

        <NewsFeed articles={feedB} />
        <Gap />

        <CommunitySection
          title="커뮤니티 실시간 인기글"
          posts={HOT_COMMUNITY_POSTS}
          showCategory
          timestamp={SECTION_TIMESTAMP}
        />
        <Gap />

        <AdBanner ad={HOME_ADS[1]} />
        <Gap />

        <HotStocks timestamp={SECTION_TIMESTAMP} />
        <Gap />

        <NewsFeed articles={feedC} />
        <Gap />

        <CommunitySection
          title="커뮤니티 뉴스 인기글"
          posts={HOT_NEWS_POSTS}
          showCategory={false}
          timestamp={SECTION_TIMESTAMP}
        />
        <Gap />

        <AdBanner ad={HOME_ADS[2]} />
        <Gap />

        <RealtimeTrend
          trends={REALTIME_TRENDS}
          label="실시간 트렌드"
          timestamp="15:20 기준"
        />
        <Gap />

        <NewsFeed articles={feedD} />
      </div>
    </AppShell>
  );
}
