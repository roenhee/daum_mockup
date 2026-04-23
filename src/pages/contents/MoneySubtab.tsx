import { BizBoard } from '@/components/ui/BizBoard';
import { BannerAd } from '@/components/ui/BannerAd';
import { AdBanner } from '@/components/ui/AdBanner';
import { ShortsSection } from '@/components/home/ShortsSection';
import { MainHeadlineCard } from '@/components/contents/MainHeadlineCard';
import { NewsGrid } from '@/components/contents/NewsGrid';
import { HeadlineList } from '@/components/contents/HeadlineList';
import { TextArticleList } from '@/components/contents/TextArticleList';
import { MarketIndicesGrid } from '@/components/contents/MarketIndicesGrid';
import { ExchangeRateTable } from '@/components/contents/ExchangeRateTable';
import { HotStocks } from '@/components/home/HotStocks';
import { SubtabSections } from '@/components/contents/SubtabSections';
import {
  MONEY_MAIN,
  MARKET_INDICES,
  EXCHANGE_RATES,
  MONEY_NEWS,
  MONEY_REALESTATE,
  MONEY_INVESTMENT_POINTS,
  MONEY_HEADLINE_TEXTS,
  MONEY_GRID_TWO,
  MONEY_PRE_FX_NEWS,
  MONEY_LOOP_SHORTS,
} from '@/mocks/money';
import { HOME_ADS } from '@/mocks/ads';

const MONEY_TOPIC = 'money,finance,business';

export function MoneySubtab() {
  return (
    <SubtabSections>
      <BizBoard compact />
      <TextArticleList articles={MONEY_HEADLINE_TEXTS} />
      <NewsGrid articles={MONEY_GRID_TWO} topic={MONEY_TOPIC} />
      <AdBanner ad={HOME_ADS[1]} />
      <MainHeadlineCard article={MONEY_MAIN} topic={MONEY_TOPIC} />
      <MarketIndicesGrid indices={MARKET_INDICES} timestamp="장마감 기준" />
      <HeadlineList title="환율·금리 뉴스" articles={MONEY_PRE_FX_NEWS} topic={MONEY_TOPIC} />
      <ExchangeRateTable rates={EXCHANGE_RATES} timestamp="15:30 기준" />
      <BannerAd ad={HOME_ADS[0]} />
      <HeadlineList title="증권·경제 뉴스" articles={MONEY_NEWS} topic={MONEY_TOPIC} />
      <HotStocks timestamp="장마감 기준" />
      <AdBanner ad={HOME_ADS[1]} />
      <NewsGrid title="부동산·금융" articles={MONEY_REALESTATE} topic={MONEY_TOPIC} />
      <ShortsSection items={MONEY_LOOP_SHORTS} title="오늘의 루프" moreLabel="루프 더보기" />
      <HeadlineList title="증시 투자 포인트" articles={MONEY_INVESTMENT_POINTS} topic={MONEY_TOPIC} />
    </SubtabSections>
  );
}
