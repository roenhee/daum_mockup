import type { ChannelPost } from '@/mocks/channelView';

interface ChannelTitleBlockProps {
  post: ChannelPost;
}

export function ChannelTitleBlock({ post }: ChannelTitleBlockProps) {
  return (
    <section className="bg-white px-4 pt-5 pb-4 text-center">
      <div className="inline-flex items-center gap-1.5">
        <img
          src={post.channel.avatarUrl}
          alt=""
          className="w-[18px] h-[18px] rounded-full object-cover bg-gray-100"
        />
        <span className="text-[13px] font-semibold text-gray-700">
          {post.channel.name}
        </span>
      </div>
      <h1 className="mt-2 text-[22px] font-bold leading-snug text-gray-900">
        {post.title}
      </h1>
      <p className="mt-2 text-[12px] text-gray-500">
        {post.publishedAt} · 조회 {post.viewCount.toLocaleString()}
      </p>
    </section>
  );
}
