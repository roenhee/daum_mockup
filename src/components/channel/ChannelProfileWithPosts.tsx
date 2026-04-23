import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { ChannelPostRef, ChannelProfile } from '@/mocks/channelView';
import { cn } from '@/lib/cn';

interface ChannelProfileWithPostsProps {
  channel: ChannelProfile;
  items: ChannelPostRef[];
}

export function ChannelProfileWithPosts({
  channel,
  items,
}: ChannelProfileWithPostsProps) {
  const [subscribed, setSubscribed] = useState(false);

  return (
    <section className="bg-white">
      <div className="mx-4 my-3 rounded-xl border border-gray-200 overflow-hidden">
        <div className="flex items-center gap-3 px-3 py-3 border-b border-gray-100">
          <img
            src={channel.avatarUrl}
            alt=""
            className="w-10 h-10 rounded-full object-cover bg-gray-100 border border-gray-200"
          />
          <div className="flex-1 min-w-0">
            <p className="text-[14px] font-bold text-gray-900 truncate">
              {channel.name}
            </p>
            <p className="mt-0.5 text-[11px] text-gray-500 truncate">
              구독자 {formatCount(channel.subscriberCount)}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setSubscribed((v) => !v)}
            className={cn(
              'h-8 px-3 rounded-full text-[12px] font-semibold shrink-0',
              subscribed
                ? 'bg-gray-100 text-gray-500'
                : 'bg-daum-blue text-white',
            )}
          >
            {subscribed ? '구독중' : '구독'}
          </button>
        </div>
        <ul className="divide-y divide-gray-100">
          {items.map((it) => (
            <li key={it.id}>
              <Link to={`/channel/${it.id}`} className="flex gap-3 px-3 py-3">
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] leading-snug font-medium line-clamp-2 text-gray-900">
                    {it.title}
                  </p>
                  <p className="mt-1 text-[11px] text-gray-500">
                    {it.publishedAt} · 조회 {it.viewCount.toLocaleString()}
                  </p>
                </div>
                <img
                  src={it.thumbnailUrl}
                  alt=""
                  className="shrink-0 w-[64px] h-[64px] rounded-md object-cover bg-gray-100"
                  loading="lazy"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function formatCount(n: number) {
  if (n >= 10000) return `${(n / 10000).toFixed(1)}만명`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}천명`;
  return `${n}명`;
}
