import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { Battery, Signal, Wifi } from 'lucide-react';
import { cn } from '@/lib/cn';

interface PhoneFrameProps {
  children: ReactNode;
}

export function PhoneFrame({ children }: PhoneFrameProps) {
  const { pathname } = useLocation();
  // OS 홈 화면에서는 배경(월페이퍼)이 상태바 영역까지 채워지도록 투명 처리
  const transparent = pathname.startsWith('/os-home');

  return (
    <div className="min-h-dvh w-full bg-gray-100 desktop:flex desktop:items-center desktop:justify-center desktop:p-8">
      <div
        id="phone-frame-root"
        className={cn(
          'relative w-full h-dvh bg-white overflow-hidden',
          'desktop:w-[390px] desktop:h-[845px] desktop:rounded-[44px] desktop:border-[8px] desktop:border-black',
        )}
      >
        <div className="w-full h-full flex flex-col">
          <div className="shrink-0 h-[36px]" aria-hidden />
          <div className="flex-1 min-h-0">{children}</div>
        </div>

        {/* iPhone 상태바 — 항상 모든 오버레이 위에. 페이지 라우트별로 투명/흰 배경 전환. */}
        <div
          className={cn(
            'absolute top-2 left-0 right-0 h-7 z-[60] flex items-center justify-between px-6 text-[13px] font-semibold tracking-tight pointer-events-none',
            transparent ? 'bg-transparent text-white' : 'bg-white text-gray-900',
          )}
          aria-hidden
        >
          <span>9:41</span>
          <div className="flex items-center gap-1">
            <Signal size={14} strokeWidth={2.5} />
            <Wifi size={14} strokeWidth={2.5} />
            <Battery size={20} strokeWidth={2.2} />
          </div>
        </div>
      </div>
    </div>
  );
}
