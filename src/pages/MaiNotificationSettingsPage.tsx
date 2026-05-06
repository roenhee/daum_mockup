import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ChevronDown, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/cn';
import {
  NOTIFICATION_CATEGORIES,
  type NotificationCategory,
} from '@/mocks/maiNotification';

type AlertMode = 'on' | 'off';

const ALERT_MODE_LABEL: Record<AlertMode, string> = {
  on: '알림',
  off: '알림 없음',
};

const SERVICE_CATEGORIES: NotificationCategory[] = [
  'mail',
  'cafe',
  'community',
  'table',
  'subscribe',
  'benefit',
];

const LIFE_ITEMS: { id: string; label: string }[] = [
  { id: 'weather', label: '날씨' },
  { id: 'breaking', label: '속보' },
  { id: 'lotto', label: '로또' },
  { id: 'fortune', label: '운세' },
];

const CATEGORY_LABEL: Record<NotificationCategory, string> = NOTIFICATION_CATEGORIES.reduce(
  (acc, c) => ({ ...acc, [c.id]: c.label }),
  {} as Record<NotificationCategory, string>,
);

export function MaiNotificationSettingsPage() {
  const navigate = useNavigate();
  const [pause, setPause] = useState(false);
  const [etiquette, setEtiquette] = useState(true);
  const [serviceModes, setServiceModes] = useState<Record<string, AlertMode>>({});
  const [lifeModes, setLifeModes] = useState<Record<string, AlertMode>>({});

  return (
    <div className="flex flex-col h-full bg-white">
      <header className="shrink-0 h-12 flex items-center px-3 border-b border-gray-100">
        <button
          type="button"
          aria-label="뒤로"
          onClick={() => navigate(-1)}
          className="p-1.5 -ml-1.5 text-gray-900"
        >
          <ChevronLeft size={24} strokeWidth={2} />
        </button>
        <span className="ml-1 text-[17px] font-bold text-gray-900">알림 설정</span>
      </header>

      <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden no-scrollbar">
        <Section title="앱푸시">
          <ToggleRow
            label="알림 일시 중단"
            description="모든 알림을 잠시 받지 않습니다."
            value={pause}
            onChange={setPause}
          />
          <ToggleRow
            label="에티켓 시간"
            description="22:00 ~ 08:00 사이에는 알림이 울리지 않습니다."
            value={etiquette}
            onChange={setEtiquette}
          />
        </Section>

        <SectionGap />

        <Section title="서비스 알림">
          {SERVICE_CATEGORIES.map((id) => (
            <DropdownRow
              key={id}
              label={CATEGORY_LABEL[id]}
              value={serviceModes[id] ?? 'on'}
              onChange={(next) =>
                setServiceModes((prev) => ({ ...prev, [id]: next }))
              }
            />
          ))}
        </Section>

        <SectionGap />

        <Section title="생활 정보 알림">
          {LIFE_ITEMS.map((it) => (
            <DropdownRow
              key={it.id}
              label={it.label}
              value={lifeModes[it.id] ?? 'on'}
              onChange={(next) =>
                setLifeModes((prev) => ({ ...prev, [it.id]: next }))
              }
            />
          ))}
        </Section>

        <div className="h-12" aria-hidden />
      </main>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="px-4 pt-5 pb-2 text-[13px] font-bold text-gray-500">{title}</h2>
      <ul>{children}</ul>
    </section>
  );
}

function SectionGap() {
  return <div aria-hidden className="h-2 bg-gray-100" />;
}

function ToggleRow({
  label,
  description,
  value,
  onChange,
}: {
  label: string;
  description?: string;
  value: boolean;
  onChange: (next: boolean) => void;
}) {
  return (
    <li className="flex items-start gap-3 px-4 py-3.5 border-b border-gray-100 last:border-b-0">
      <div className="flex-1 min-w-0">
        <p className="text-[14px] font-semibold text-gray-900">{label}</p>
        {description ? (
          <p className="mt-0.5 text-[12px] text-gray-500 leading-snug">
            {description}
          </p>
        ) : null}
      </div>
      <button
        type="button"
        onClick={() => onChange(!value)}
        aria-pressed={value}
        className="shrink-0 mt-0.5"
      >
        <Switch active={value} />
      </button>
    </li>
  );
}

function Switch({ active }: { active: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        'relative inline-block w-11 h-6 rounded-full transition-colors shrink-0',
        active ? 'bg-daum-blue' : 'bg-gray-300',
      )}
    >
      <span
        className={cn(
          'absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform',
          active && 'translate-x-5',
        )}
      />
    </span>
  );
}

function DropdownRow({
  label,
  value,
  onChange,
}: {
  label: string;
  value: AlertMode;
  onChange: (next: AlertMode) => void;
}) {
  return (
    <li className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 last:border-b-0">
      <span className="flex-1 min-w-0 text-[14px] font-semibold text-gray-900 truncate">
        {label}
      </span>
      <AlertDropdown value={value} onChange={onChange} />
    </li>
  );
}

function AlertDropdown({
  value,
  onChange,
}: {
  value: AlertMode;
  onChange: (next: AlertMode) => void;
}) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  return (
    <div ref={wrapperRef} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        className={cn(
          'inline-flex items-center gap-1 h-8 pl-3 pr-2 rounded-full border text-[12px] font-medium transition-colors',
          value === 'on'
            ? 'border-gray-200 bg-white text-gray-700'
            : 'border-gray-200 bg-gray-50 text-gray-500',
        )}
      >
        {ALERT_MODE_LABEL[value]}
        <ChevronDown
          size={14}
          strokeWidth={2}
          className={cn('transition-transform', open && 'rotate-180')}
        />
      </button>
      {open ? (
        <div
          role="menu"
          className="absolute top-[calc(100%+4px)] right-0 z-30 w-[120px] bg-white rounded-xl border border-gray-200 shadow-[0_8px_24px_rgba(0,0,0,0.12)] overflow-hidden"
        >
          <DropdownItem
            label="알림"
            checked={value === 'on'}
            onClick={() => {
              onChange('on');
              setOpen(false);
            }}
          />
          <DropdownItem
            label="알림 없음"
            checked={value === 'off'}
            onClick={() => {
              onChange('off');
              setOpen(false);
            }}
          />
        </div>
      ) : null}
    </div>
  );
}

function DropdownItem({
  label,
  checked,
  onClick,
}: {
  label: string;
  checked: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="menuitem"
      onClick={onClick}
      className={cn(
        'w-full flex items-center gap-1.5 pl-3 pr-2 py-2.5 text-left text-[13px] active:bg-gray-50 text-gray-800',
        checked ? 'font-semibold text-gray-900' : '',
      )}
    >
      <span className="flex-1 truncate">{label}</span>
      {checked ? (
        <Check size={14} strokeWidth={2.4} className="text-daum-blue shrink-0" />
      ) : null}
    </button>
  );
}
