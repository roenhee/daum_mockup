import { Link } from 'react-router-dom';
import type { ChannelPostRef, ChannelProfile } from '@/mocks/channelView';
import { SectionHeader, SectionMoreButton } from '@/components/ui/SectionHeader';

interface ChannelPostsListProps {
  channel: ChannelProfile;
  items: ChannelPostRef[];
  moreLabel?: string;
  title?: string;
  hideHeader?: boolean;
}

export function ChannelPostsList({
  channel,
  items,
  moreLabel,
  title,
  hideHeader = false,
}: ChannelPostsListProps) {
  const headerTitle = title ?? `${channel.name}의 다른 글`;
  return (
    <section className="bg-white">
      {hideHeader ? null : (
        <SectionHeader
          title={
            <span className="inline-flex items-center gap-2">
              <img
                src={channel.avatarUrl}
                alt=""
                className="w-5 h-5 rounded-full object-cover bg-gray-100"
              />
              {headerTitle}
            </span>
          }
        />
      )}
      <ul className="divide-y divide-gray-100 px-4">
        {items.map((it) => (
          <li key={it.id}>
            <Link to={`/channel/${it.id}`} className="flex gap-3 py-3">
              <div className="flex-1 min-w-0">
                <p className="text-[14px] leading-snug font-medium line-clamp-2 text-gray-900">
                  {it.title}
                </p>
                <p className="mt-1 text-[11px] text-gray-500">
                  {it.publishedAt} · 조회 {it.viewCount.toLocaleString()}
                </p>
              </div>
              <img
                src={it.thumbnailUrl}
                alt=""
                className="shrink-0 w-[72px] h-[72px] rounded-md object-cover bg-gray-100"
                loading="lazy"
              />
            </Link>
          </li>
        ))}
      </ul>
      {moreLabel ? <SectionMoreButton label={moreLabel} /> : null}
    </section>
  );
}
