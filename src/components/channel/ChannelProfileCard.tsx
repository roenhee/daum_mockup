import { useState } from 'react';
import type { ChannelProfile } from '@/mocks/channelView';
import { cn } from '@/lib/cn';

interface ChannelProfileCardProps {
  channel: ChannelProfile;
  variant?: 'top' | 'inline';
  showDescription?: boolean;
}

export function ChannelProfileCard({
  channel,
  variant = 'top',
  showDescription = variant === 'top',
}: ChannelProfileCardProps) {
  const [subscribed, setSubscribed] = useState(false);
  const inline = variant === 'inline';

  return (
    <div
      className={cn(
        'bg-white',
        inline ? 'mx-4 my-3 border border-gray-200 rounded-xl px-3 py-3' : 'px-4 py-3',
      )}
    >
      <div className="flex items-center gap-3">
        <img
          src={channel.avatarUrl}
          alt=""
          className={cn(
            'rounded-full object-cover bg-gray-100 border border-gray-200',
            inline ? 'w-10 h-10' : 'w-12 h-12',
          )}
        />
        <div className="flex-1 min-w-0">
          <p className="text-[14px] font-bold text-gray-900 truncate">
            {channel.name}
          </p>
          <p className="mt-0.5 text-[11px] text-gray-500">
            구독자 {formatCount(channel.subscriberCount)}
            {inline ? null : <span className="mx-1 text-gray-300">·</span>}
            {inline ? null : <span>{channel.handle}</span>}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setSubscribed((v) => !v)}
          className={cn(
            'h-8 px-3 rounded-full text-[12px] font-semibold',
            subscribed
              ? 'bg-gray-100 text-gray-500'
              : 'bg-daum-blue text-white',
          )}
        >
          {subscribed ? '구독중' : '구독'}
        </button>
      </div>
      {showDescription ? (
        <p className="mt-2 text-[12px] leading-relaxed text-gray-500">
          {channel.description}
        </p>
      ) : null}
    </div>
  );
}

function formatCount(n: number) {
  if (n >= 10000) return `${(n / 10000).toFixed(1)}만명`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}천명`;
  return `${n}명`;
}
