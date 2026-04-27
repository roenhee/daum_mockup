import { useRef, type ReactNode } from 'react';
import type { HeaderVariant } from '@/types';
import { HeaderBar } from './HeaderBar';
import { BottomTabBar } from './BottomTabBar';
import { ScrollIndicator } from './ScrollIndicator';
import { cn } from '@/lib/cn';

interface AppShellProps {
  variant: HeaderVariant;
  children: ReactNode;
  onOpenMenu?: () => void;
  bodyClassName?: string;
  scrollableHeader?: boolean;
  bottomOverlay?: ReactNode;
}

export function AppShell({
  variant,
  children,
  onOpenMenu,
  bodyClassName,
  scrollableHeader,
  bottomOverlay,
}: AppShellProps) {
  const dark = variant === 'loop';
  const mainRef = useRef<HTMLElement>(null);
  const header = <HeaderBar variant={variant} onOpenMenu={onOpenMenu} />;

  return (
    <div
      className={cn(
        'flex flex-col h-full',
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
      </div>
      {bottomOverlay}
      <BottomTabBar />
    </div>
  );
}
