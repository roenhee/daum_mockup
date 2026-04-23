import { DetailShell } from '@/components/layout/DetailShell';
import { DaumChannelHeader } from '@/components/channel/DaumChannelHeader';
import { ChannelTitleBlock } from '@/components/channel/ChannelTitleBlock';
import { ChannelPostBody } from '@/components/channel/ChannelPostBody';
import { ChannelProfileWithPosts } from '@/components/channel/ChannelProfileWithPosts';
import { ChannelPostsList } from '@/components/channel/ChannelPostsList';
import { LikeCommentBar } from '@/components/channel/LikeCommentBar';
import { DisabledComments } from '@/components/channel/DisabledComments';
import { PersonalizedRecommend } from '@/components/channel/RecommendSections';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { BizBoard } from '@/components/ui/BizBoard';
import { AdBanner } from '@/components/ui/AdBanner';
import { RealtimeTrend } from '@/components/home/RealtimeTrend';
import { ShortsSection } from '@/components/home/ShortsSection';
import {
  DEFAULT_CHANNEL_POST,
  PERSONALIZED_RECOMMENDS,
  CHANNEL_OTHER_POSTS,
  MORE_CHANNEL_POSTS,
} from '@/mocks/channelView';
import { REALTIME_TRENDS } from '@/mocks/trends';
import { HOME_SHORTS } from '@/mocks/shorts';
import { HOME_ADS } from '@/mocks/ads';

function Gap() {
  return <div className="h-1 bg-gray-100 shrink-0" aria-hidden />;
}

export function ChannelViewPage() {
  const post = DEFAULT_CHANNEL_POST;

  return (
    <DetailShell url="v.daum.net/channel" scrollableTopBar>
      <div className="bg-gray-100 flex flex-col">
        <div className="sticky top-0 z-20">
          <DaumChannelHeader />
        </div>
        <ChannelTitleBlock post={post} />
        <div className="bg-white">
          <div className="mx-4">
            <BizBoard />
          </div>
        </div>
        <ChannelPostBody post={post} />

        <ChannelProfileWithPosts
          channel={post.channel}
          items={CHANNEL_OTHER_POSTS}
        />
        <Gap />

        <LikeCommentBar
          likeCount={post.likeCount}
          commentCount={post.commentCount}
        />
        <Gap />

        <DisabledComments />
        <Gap />

        <PersonalizedRecommend items={PERSONALIZED_RECOMMENDS} />
        <Gap />

        <AdBanner ad={HOME_ADS[1]} />
        <Gap />

        <RealtimeTrend trends={REALTIME_TRENDS} />
        <Gap />

        <ChannelPostsList
          channel={post.channel}
          items={MORE_CHANNEL_POSTS}
          moreLabel="채널 글 더보기"
          hideHeader
        />
        <Gap />

        <ShortsSection
          items={HOME_SHORTS}
          title="다음 루프"
          moreLabel="루프 더보기"
        />
        <Gap />

        <SiteFooter />
      </div>
    </DetailShell>
  );
}
