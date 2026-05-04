import { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/cn';
import {
  SETTINGS_NOTIFICATION_LABEL,
  type SettingsNotificationMode,
} from '@/mocks/maiSubscribe';

interface Props {
  value: SettingsNotificationMode;
  onChange: (next: SettingsNotificationMode) => void;
  onUnsubscribe: () => void;
}

export function NotificationDropdown({ value, onChange, onUnsubscribe }: Props) {
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
          value === 'all'
            ? 'border-gray-200 bg-white text-gray-700'
            : 'border-gray-200 bg-gray-50 text-gray-500',
        )}
      >
        {SETTINGS_NOTIFICATION_LABEL[value]}
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
            checked={value === 'all'}
            onClick={() => {
              onChange('all');
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
          <div className="h-px bg-gray-100 mx-2" aria-hidden />
          <DropdownItem
            label="구독 취소"
            danger
            onClick={() => {
              onUnsubscribe();
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
  danger,
  onClick,
}: {
  label: string;
  checked?: boolean;
  danger?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="menuitem"
      onClick={onClick}
      className={cn(
        'w-full flex items-center gap-1.5 pl-3 pr-2 py-2.5 text-left text-[13px] active:bg-gray-50',
        danger ? 'text-daum-red font-medium' : 'text-gray-800',
        checked && !danger ? 'font-semibold text-gray-900' : '',
      )}
    >
      <span className="flex-1 truncate">{label}</span>
      {checked ? (
        <Check size={14} strokeWidth={2.4} className="text-daum-blue shrink-0" />
      ) : null}
    </button>
  );
}
