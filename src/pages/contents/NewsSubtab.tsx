import { BizBoard } from '@/components/ui/BizBoard';
import { AdBanner } from '@/components/ui/AdBanner';
import { ShortsSection } from '@/components/home/ShortsSection';
import { MajorHeadlines } from '@/components/contents/MajorHeadlines';
import { CompactWeather } from '@/components/contents/CompactWeather';
import { RecommendNewsList } from '@/components/contents/RecommendNewsList';
import { PhotoNewsCarousel } from '@/components/contents/PhotoNewsCarousel';
import { MoreHeadlines } from '@/components/contents/MoreHeadlines';
import {
  BreakingNewsRanking,
  type BreakingRankItem,
} from '@/components/contents/BreakingNewsRanking';
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

const BREAKING_RANKING: BreakingRankItem[] = [
  {
    id: 'hero-001',
    title: '이재명·트럼프, 백악관 회담…"수천만 弗 규모 대북 접근" 제안',
    multiplier: '×4.6',
    reason: '한미정상회담 + 대북지원 동시 보도 급증',
  },
  {
    id: 'breaking-002',
    title: 'WTI 96달러 돌파…호르무즈 통항 사실상 \'제로\'',
    multiplier: '×3.5',
    reason: '국제유가 키워드 30분 새 30건 발생',
  },
  {
    id: 'breaking-003',
    title: '오월드 \'늑구\' 근황 공개 중단…5월 재개장 불투명',
    multiplier: '×2.8',
    reason: '대전 지역 매체 동시 보도',
  },
  {
    id: 'breaking-004',
    title: 'HBM4E 양산 일정 공식화…삼성·SK 동시 발표',
    multiplier: '신규',
    isNew: true,
    reason: '메모리 차세대 키워드 24시간 내 첫 등장',
  },
  {
    id: 'breaking-005',
    title: '코스피 사상 최고치 경신…외국인·기관 동반 순매수',
    multiplier: '×2.2',
    reason: '증시 마감 후 보도 집중',
  },
];

export function NewsSubtab() {
  return (
    <SubtabSections>
      <BizBoard compact />
      <MajorHeadlines headlines={MAJOR_HEADLINES} />
      <CompactWeather weather={HOME_WEATHER} />
      <RecommendNewsList headlines={RECOMMEND_NEWS} timestamp="09:51 기준" />
      <PhotoNewsCarousel items={PHOTO_NEWS} />
      <BreakingNewsRanking items={BREAKING_RANKING} timestamp="09:51 기준" />
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
