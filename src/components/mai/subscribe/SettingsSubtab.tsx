import { useMemo, useState } from 'react';
import { Check, Plus } from 'lucide-react';
import { cn } from '@/lib/cn';
import {
  RECOMMEND_PRESS_CHANNELS,
  SUBSCRIBE_CHANNELS,
  type ChannelType,
  type SettingsNotificationMode,
  type SubscribeChannel,
} from '@/mocks/maiSubscribe';
import { CategoryChipBar } from './CategoryChipBar';
import { NotificationDropdown } from './NotificationDropdown';

const TYPE_TABS: { id: ChannelType; label: string }[] = [
  { id: 'press', label: '언론사' },
  { id: 'general', label: '일반' },
];

export function SettingsSubtab() {
  const [typeTab, setTypeTab] = useState<ChannelType>('press');
  const [unsubscribed, setUnsubscribed] = useState<Set<string>>(new Set());
  const [modeMap, setModeMap] = useState<Record<string, SettingsNotificationMode>>({});
  const [subscribedRec, setSubscribedRec] = useState<Set<string>>(new Set());
  const [category, setCategory] = useState<string>('all');

  const subscribed = useMemo(
    () =>
      SUBSCRIBE_CHANNELS.filter(
        (c) => c.type === typeTab && !unsubscribed.has(c.id),
      ),
    [typeTab, unsubscribed],
  );

  const recommendations = useMemo(
    () =>
      RECOMMEND_PRESS_CHANNELS.filter(
        (r) => category === 'all' || r.category === category,
      ),
    [category],
  );

  return (
    <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden no-scrollbar bg-white">
      <section>
        <div className="px-4 pt-4 pb-2">
          <h2 className="text-[15px] font-bold text-gray-900">내 구독 채널</h2>
        </div>
        <TypeTabBar value={typeTab} onChange={setTypeTab} />
        <ul>
          {subscribed.length === 0 ? (
            <li className="px-4 py-10 text-center text-[13px] text-gray-400">
              구독 중인 {typeTab === 'press' ? '언론사' : '일반'} 채널이 없어요
            </li>
          ) : (
            subscribed.map((c) => (
              <SubscribedRow
                key={c.id}
                channel={c}
                mode={modeMap[c.id] ?? 'all'}
                onChangeMode={(next) =>
                  setModeMap((prev) => ({ ...prev, [c.id]: next }))
                }
                onUnsubscribe={() =>
                  setUnsubscribed((prev) => {
                    const next = new Set(prev);
                    next.add(c.id);
                    return next;
                  })
                }
              />
            ))
          )}
        </ul>
      </section>

      <div aria-hidden className="h-2 bg-gray-100" />

      <section className="pb-6">
        <div className="px-4 pt-5 pb-2">
          <h2 className="text-[15px] font-bold text-gray-900">
            관심 있는 언론사를 구독해 보세요
          </h2>
        </div>
        <CategoryChipBar value={category} onChange={setCategory} />
        <p className="px-4 pt-2 pb-1 text-[12px] text-gray-400">
          최근 24시간 내 발행한 매체만 배열됩니다.
        </p>
        <ul>
          {recommendations.map((r) => (
            <li key={r.id}>
              <RecommendRow
                avatarUrl={r.avatarUrl}
                name={r.name}
                subscribed={subscribedRec.has(r.id)}
                onToggle={() =>
                  setSubscribedRec((prev) => {
                    const next = new Set(prev);
                    if (next.has(r.id)) next.delete(r.id);
                    else next.add(r.id);
                    return next;
                  })
                }
              />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

function TypeTabBar({
  value,
  onChange,
}: {
  value: ChannelType;
  onChange: (v: ChannelType) => void;
}) {
  return (
    <nav className="flex gap-5 px-4 border-b border-gray-100">
      {TYPE_TABS.map((t) => {
        const active = value === t.id;
        return (
          <button
            key={t.id}
            type="button"
            onClick={() => onChange(t.id)}
            aria-pressed={active}
            className={cn(
              'relative py-2.5 text-[13px] whitespace-nowrap transition-colors',
              active ? 'font-bold text-gray-900' : 'font-medium text-gray-500',
            )}
          >
            {t.label}
            {active ? (
              <span className="absolute left-0 right-0 -bottom-px h-0.5 bg-gray-900" />
            ) : null}
          </button>
        );
      })}
    </nav>
  );
}

function SubscribedRow({
  channel,
  mode,
  onChangeMode,
  onUnsubscribe,
}: {
  channel: SubscribeChannel;
  mode: SettingsNotificationMode;
  onChangeMode: (next: SettingsNotificationMode) => void;
  onUnsubscribe: () => void;
}) {
  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <img
        src={channel.avatarUrl}
        alt=""
        width={36}
        height={36}
        draggable={false}
        className="w-9 h-9 rounded-full bg-gray-100 shrink-0"
      />
      <span className="flex-1 min-w-0 text-[14px] font-semibold text-gray-900 truncate">
        {channel.name}
      </span>
      <NotificationDropdown
        value={mode}
        onChange={onChangeMode}
        onUnsubscribe={onUnsubscribe}
      />
    </div>
  );
}

function RecommendRow({
  avatarUrl,
  name,
  subscribed,
  onToggle,
}: {
  avatarUrl: string;
  name: string;
  subscribed: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <img
        src={avatarUrl}
        alt=""
        width={36}
        height={36}
        draggable={false}
        className="w-9 h-9 rounded-full bg-gray-100 shrink-0"
      />
      <span className="flex-1 min-w-0 text-[14px] font-semibold text-gray-900 truncate">
        {name}
      </span>
      <button
        type="button"
        onClick={onToggle}
        aria-pressed={subscribed}
        className={cn(
          'inline-flex items-center gap-1 h-8 px-3 rounded-full border text-[12px] font-semibold transition-colors shrink-0',
          subscribed
            ? 'border-gray-200 bg-gray-50 text-gray-500'
            : 'border-daum-blue/60 bg-daum-blue/5 text-daum-blue',
        )}
      >
        {subscribed ? (
          <>
            <Check size={12} strokeWidth={2.4} />
            구독 중
          </>
        ) : (
          <>
            <Plus size={12} strokeWidth={2.4} />
            구독
          </>
        )}
      </button>
    </div>
  );
}
