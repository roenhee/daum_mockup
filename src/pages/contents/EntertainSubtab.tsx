import { BizBoard } from '@/components/ui/BizBoard';
import { BannerAd } from '@/components/ui/BannerAd';
import { AdBanner } from '@/components/ui/AdBanner';
import { ShortsSection } from '@/components/home/ShortsSection';
import { MainHeadlineCard } from '@/components/contents/MainHeadlineCard';
import { NewsGrid } from '@/components/contents/NewsGrid';
import { HeadlineList } from '@/components/contents/HeadlineList';
import { TextArticleList } from '@/components/contents/TextArticleList';
import { EntertainCelebs } from '@/components/contents/EntertainCelebs';
import { EntertainTrendGrid } from '@/components/contents/EntertainTrendGrid';
import { TodayRankedNews } from '@/components/contents/TodayRankedNews';
import { SubtabSections } from '@/components/contents/SubtabSections';
import {
  ENTERTAIN_MAIN,
  ENTERTAIN_NEWS_TOP,
  ENTERTAIN_NEWS_MORE,
  ENTERTAIN_CELEBS,
  ENTERTAIN_TREND,
  ENTERTAIN_TODAY_RANKED,
  ENTERTAIN_HEADLINE_TEXTS,
  ENTERTAIN_GRID_TWO,
  ENTERTAIN_GRID_FOUR,
  ENTERTAIN_LOOP_SHORTS,
} from '@/mocks/entertain';
import { HOME_ADS } from '@/mocks/ads';

const ENT_TOPIC = 'korean,kpop,idol';

export function EntertainSubtab() {
  return (
    <SubtabSections>
      <BizBoard compact />
      <TextArticleList articles={ENTERTAIN_HEADLINE_TEXTS} />
      <NewsGrid articles={ENTERTAIN_GRID_TWO} topic={ENT_TOPIC} />
      <MainHeadlineCard article={ENTERTAIN_MAIN} topic={ENT_TOPIC} />
      <BannerAd ad={HOME_ADS[0]} />
      <HeadlineList title="연예 주요 뉴스" articles={ENTERTAIN_NEWS_TOP} topic={ENT_TOPIC} />
      <NewsGrid articles={ENTERTAIN_GRID_FOUR} topic={ENT_TOPIC} />
      <AdBanner ad={HOME_ADS[1]} />
      <EntertainCelebs celebs={ENTERTAIN_CELEBS} />
      <EntertainTrendGrid items={ENTERTAIN_TREND} />
      <ShortsSection items={ENTERTAIN_LOOP_SHORTS} title="오늘의 루프" moreLabel="루프 더보기" />
      <AdBanner ad={HOME_ADS[1]} />
      <TodayRankedNews items={ENTERTAIN_TODAY_RANKED} timestamp="10:12 기준" />
      <HeadlineList title="투데이 연예" articles={ENTERTAIN_NEWS_MORE} topic={ENT_TOPIC} />
    </SubtabSections>
  );
}
