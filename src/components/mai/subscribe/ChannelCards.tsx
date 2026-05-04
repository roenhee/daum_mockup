import { ExternalLink, MoreHorizontal } from 'lucide-react';
import { asset } from '@/lib/asset';
import type { GeneralChannel, PressChannel } from '@/mocks/maiSubscribe';

interface Common {
  onMoreClick: () => void;
}

export function PressChannelCard({
  channel,
  onMoreClick,
}: { channel: PressChannel } & Common) {
  return (
    <article className="bg-white">
      <ChannelHeader
        avatarUrl={channel.avatarUrl}
        name={channel.name}
        lastUpdate={channel.lastUpdate}
        showLink
        onMoreClick={onMoreClick}
      />

      <ul className="px-4">
        {channel.textHeadlines.map((h, idx) => (
          <li key={h.id}>
            <p className="py-3 text-[14px] font-medium text-gray-900 leading-snug line-clamp-1">
              {h.title}
            </p>
            {idx < channel.textHeadlines.length - 1 ? (
              <div className="h-px bg-gray-100" aria-hidden />
            ) : null}
          </li>
        ))}
      </ul>

      <ul className="grid grid-cols-2 gap-x-3 gap-y-4 px-4 pt-3 pb-4">
        {channel.gridArticles.map((a) => (
          <li key={a.id}>
            <div className="w-full aspect-[4/3] rounded-lg overflow-hidden bg-gray-100">
              <img
                src={asset(a.thumbnailUrl)}
                alt=""
                className="w-full h-full object-cover"
                loading="lazy"
                draggable={false}
              />
            </div>
            <p className="mt-2 text-[13px] font-semibold text-gray-900 leading-snug line-clamp-2">
              {a.title}
            </p>
          </li>
        ))}
      </ul>

      <div className="h-2 bg-gray-100" aria-hidden />
    </article>
  );
}

export function GeneralChannelCard({
  channel,
  onMoreClick,
}: { channel: GeneralChannel } & Common) {
  return (
    <article className="bg-white">
      <ChannelHeader
        avatarUrl={channel.avatarUrl}
        name={channel.name}
        lastUpdate={channel.lastUpdate}
        onMoreClick={onMoreClick}
      />

      <div className="flex items-start gap-3 px-4 pb-4">
        <div className="flex-1 min-w-0 py-0.5">
          <p className="text-[14px] font-semibold text-gray-900 leading-snug line-clamp-2">
            {channel.latest.title}
          </p>
        </div>
        <div className="shrink-0 w-[88px] h-[66px] rounded-lg overflow-hidden bg-gray-100">
          <img
            src={asset(channel.latest.thumbnailUrl)}
            alt=""
            className="w-full h-full object-cover"
            loading="lazy"
            draggable={false}
          />
        </div>
      </div>

      <div className="h-2 bg-gray-100" aria-hidden />
    </article>
  );
}

interface HeaderProps {
  avatarUrl: string;
  name: string;
  lastUpdate: string;
  showLink?: boolean;
  onMoreClick: () => void;
}

function ChannelHeader({
  avatarUrl,
  name,
  lastUpdate,
  showLink,
  onMoreClick,
}: HeaderProps) {
  return (
    <header className="flex items-center gap-2 px-4 pt-4 pb-3">
      <img
        src={avatarUrl}
        alt=""
        width={32}
        height={32}
        draggable={false}
        className="w-8 h-8 rounded-full bg-gray-100 shrink-0"
      />
      <div className="flex-1 min-w-0 flex items-center gap-1.5">
        <span className="text-[14px] font-bold text-gray-900 truncate">{name}</span>
        <span className="text-[11px] text-gray-300 shrink-0">·</span>
        <span className="text-[12px] text-gray-500 shrink-0">{lastUpdate}</span>
        {showLink ? (
          <button
            type="button"
            aria-label="채널 바로가기"
            className="p-1 -m-1 text-gray-400 active:text-gray-600 shrink-0"
          >
            <ExternalLink size={14} strokeWidth={2.2} />
          </button>
        ) : null}
      </div>
      <button
        type="button"
        aria-label="더보기"
        onClick={onMoreClick}
        className="p-1.5 -mr-1.5 text-gray-500 active:text-gray-700 shrink-0"
      >
        <MoreHorizontal size={20} strokeWidth={2} />
      </button>
    </header>
  );
}
