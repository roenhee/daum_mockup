import { useMemo, useState } from 'react';
import { cn } from '@/lib/cn';
import {
  SUBSCRIBE_CHANNELS,
  type ChannelType,
  type NotificationMode,
  type SubscribeChannel,
} from '@/mocks/maiSubscribe';
import { GeneralChannelCard, PressChannelCard } from './ChannelCards';
import { NotificationSheet } from './NotificationSheet';

type Filter = 'all' | ChannelType;

const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all', label: '전체' },
  { id: 'press', label: '언론사' },
  { id: 'general', label: '일반' },
];

export function MyChannelsSubtab() {
  const [filter, setFilter] = useState<Filter>('all');
  const [activeChannel, setActiveChannel] = useState<SubscribeChannel | null>(null);
  const [modeMap, setModeMap] = useState<Record<string, NotificationMode>>({});

  const channels = useMemo(
    () =>
      filter === 'all'
        ? SUBSCRIBE_CHANNELS
        : SUBSCRIBE_CHANNELS.filter((c) => c.type === filter),
    [filter],
  );

  return (
    <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden no-scrollbar relative">
      <div className="flex items-center gap-1.5 px-4 py-3">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            aria-pressed={filter === f.id}
            className={cn(
              'h-8 px-3 rounded-full text-[12px] font-medium border transition-colors',
              filter === f.id
                ? 'bg-gray-900 text-white border-gray-900'
                : 'bg-white text-gray-700 border-gray-200',
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div aria-hidden className="h-2 bg-gray-100" />

      <ul>
        {channels.map((c) => (
          <li key={c.id}>
            {c.type === 'press' ? (
              <PressChannelCard
                channel={c}
                onMoreClick={() => setActiveChannel(c)}
              />
            ) : (
              <GeneralChannelCard
                channel={c}
                onMoreClick={() => setActiveChannel(c)}
              />
            )}
          </li>
        ))}
      </ul>

      <NotificationSheet
        open={activeChannel !== null}
        channelName={activeChannel?.name ?? ''}
        initialMode={
          activeChannel ? modeMap[activeChannel.id] ?? 'all' : 'all'
        }
        onClose={() => setActiveChannel(null)}
        onApply={(choice) => {
          if (!activeChannel) return;
          if (choice !== 'unsubscribe') {
            setModeMap((prev) => ({ ...prev, [activeChannel.id]: choice }));
          }
          setActiveChannel(null);
        }}
      />
    </main>
  );
}
