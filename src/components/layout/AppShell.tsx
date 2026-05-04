import { useRef, type ReactNode } from 'react';
import type { HeaderVariant } from '@/types';
import { HeaderBar } from './HeaderBar';
import { BottomTabBar } from './BottomTabBar';
import { ScrollIndicator } from './ScrollIndicator';
import { MaiMiniPlayer } from '@/components/mai/news/MaiPlayer';
import { cn } from '@/lib/cn';

interface AppShellProps {
  variant: HeaderVariant;
  children: ReactNode;
  onOpenMenu?: () => void;
  bodyClassName?: string;
  scrollableHeader?: boolean;
  bottomOverlay?: ReactNode;
  /** 스크롤 컨테이너의 visible 영역 위에 렌더되는 오버레이 (FAB/바텀시트용). */
  mainOverlay?: ReactNode;
  /** 헤더/하단탭까지 포함한 phone frame 전체를 덮는 오버레이 (풀스크린 dim 바텀시트용). */
  fullOverlay?: ReactNode;
}

export function AppShell({
  variant,
  children,
  onOpenMenu,
  bodyClassName,
  scrollableHeader,
  bottomOverlay,
  mainOverlay,
  fullOverlay,
}: AppShellProps) {
  const dark = variant === 'loop';
  const mainRef = useRef<HTMLElement>(null);
  const header = <HeaderBar variant={variant} onOpenMenu={onOpenMenu} />;

  return (
    <div
      className={cn(
        'relative flex flex-col h-full',
        dark ? 'bg-black text-white' : 'bg-white text-gray-900',
      )}
    >
      {!scrollableHeader ? header : null}
      <div className="flex-1 min-h-0 relative">
        <main
          ref={mainRef}
          className={cn(
            'absolute inset-0 overflow-y-auto overflow-x-hidden no-scrollbar',
            bodyClassName,
          )}
        >
          {scrollableHeader ? header : null}
          {children}
        </main>
        <ScrollIndicator targetRef={mainRef} />
        {mainOverlay}
      </div>
      {bottomOverlay}
      <MaiMiniPlayer />
      <BottomTabBar />
      {fullOverlay}
    </div>
  );
}
