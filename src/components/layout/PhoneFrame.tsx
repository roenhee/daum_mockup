import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface PhoneFrameProps {
  children: ReactNode;
}

export function PhoneFrame({ children }: PhoneFrameProps) {
  return (
    <div className="min-h-dvh w-full bg-gray-100 desktop:flex desktop:items-center desktop:justify-center desktop:p-8">
      <div
        id="phone-frame-root"
        className={cn(
          'relative w-full h-dvh bg-white overflow-hidden',
          'desktop:w-[390px] desktop:h-[845px] desktop:rounded-[44px] desktop:border-[8px] desktop:border-black desktop:shadow-2xl',
        )}
      >
        <div className="w-full h-full flex flex-col">
          <div className="shrink-0 h-[28px] bg-white" />
          <div className="flex-1 min-h-0">{children}</div>
        </div>
      </div>
    </div>
  );
}
