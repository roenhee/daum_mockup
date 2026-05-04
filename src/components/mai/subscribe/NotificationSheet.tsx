import { useEffect, useState } from 'react';
import { cn } from '@/lib/cn';
import {
  NOTIFICATION_OPTIONS,
  type NotificationMode,
} from '@/mocks/maiSubscribe';

type SheetChoice = NotificationMode | 'unsubscribe';

interface Props {
  open: boolean;
  channelName: string;
  initialMode: NotificationMode;
  onClose: () => void;
  onApply: (choice: SheetChoice) => void;
}

export function NotificationSheet({
  open,
  channelName,
  initialMode,
  onClose,
  onApply,
}: Props) {
  const [choice, setChoice] = useState<SheetChoice>(initialMode);

  useEffect(() => {
    if (open) setChoice(initialMode);
  }, [open, initialMode]);

  if (!open) return null;

  return (
    <div className="absolute inset-0 z-50">
      <button
        type="button"
        aria-label="닫기"
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
      />
      <div
        role="dialog"
        aria-label={`${channelName} 알림 설정`}
        className="absolute left-0 right-0 bottom-0 bg-white rounded-t-[20px] shadow-[0_-8px_24px_rgba(0,0,0,0.12)]"
      >
        <div className="pt-2 pb-1 flex justify-center">
          <span className="w-9 h-1 rounded-full bg-gray-300" aria-hidden />
        </div>
        <div className="px-5 pt-2 pb-3">
          <p className="text-[12px] text-gray-500">{channelName}</p>
          <h2 className="mt-0.5 text-[16px] font-bold text-gray-900">알림 설정</h2>
        </div>

        <ul className="px-2">
          {NOTIFICATION_OPTIONS.map((opt) => (
            <li key={opt.id}>
              <RadioRow
                label={opt.label}
                desc={opt.desc}
                checked={choice === opt.id}
                onClick={() => setChoice(opt.id)}
              />
            </li>
          ))}
        </ul>

        <div className="mx-5 my-2 h-px bg-gray-100" aria-hidden />

        <ul className="px-2">
          <li>
            <RadioRow
              label="구독 취소"
              desc="이 채널의 새 글을 더 이상 받아보지 않아요"
              checked={choice === 'unsubscribe'}
              danger
              onClick={() => setChoice('unsubscribe')}
            />
          </li>
        </ul>

        <div className="flex items-center gap-2 px-4 pt-3 pb-5">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 h-12 rounded-card border border-gray-200 bg-white text-[14px] font-semibold text-gray-700 active:bg-gray-50"
          >
            취소
          </button>
          <button
            type="button"
            onClick={() => onApply(choice)}
            className="flex-1 h-12 rounded-card bg-gray-900 text-[14px] font-semibold text-white active:opacity-90"
          >
            적용
          </button>
        </div>
      </div>
    </div>
  );
}

interface RadioRowProps {
  label: string;
  desc?: string;
  checked: boolean;
  danger?: boolean;
  onClick: () => void;
}

function RadioRow({ label, desc, checked, danger, onClick }: RadioRowProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={checked}
      className="w-full flex items-start gap-3 px-3 py-3 rounded-xl active:bg-gray-50 text-left"
    >
      <span
        aria-hidden
        className={cn(
          'mt-0.5 inline-flex items-center justify-center w-5 h-5 rounded-full border-2 shrink-0',
          checked
            ? danger
              ? 'border-daum-red'
              : 'border-daum-blue'
            : 'border-gray-300',
        )}
      >
        {checked ? (
          <span
            className={cn(
              'block w-2.5 h-2.5 rounded-full',
              danger ? 'bg-daum-red' : 'bg-daum-blue',
            )}
          />
        ) : null}
      </span>
      <span className="flex-1 min-w-0">
        <span
          className={cn(
            'block text-[14px] font-semibold',
            danger ? 'text-daum-red' : 'text-gray-900',
          )}
        >
          {label}
        </span>
        {desc ? (
          <span className="mt-0.5 block text-[12px] text-gray-500 leading-snug">
            {desc}
          </span>
        ) : null}
      </span>
    </button>
  );
}
