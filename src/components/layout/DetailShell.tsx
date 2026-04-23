import { useRef, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { InAppBrowserBar } from './InAppBrowserBar';
import { ScrollIndicator } from './ScrollIndicator';
import { UrlTopBar } from './UrlTopBar';

interface DetailShellProps {
  url?: string;
  tabCount?: number;
  topBar?: ReactNode;
  scrollableTopBar?: boolean;
  children: ReactNode;
}

export function DetailShell({
  url = 'v.daum.net',
  tabCount = 2,
  topBar,
  scrollableTopBar,
  children,
}: DetailShellProps) {
  const navigate = useNavigate();
  const mainRef = useRef<HTMLElement>(null);
  const top = topBar ?? <UrlTopBar url={url} tabCount={tabCount} />;

  return (
    <div className="flex flex-col h-full bg-white">
      {!scrollableTopBar ? top : null}
      <div className="flex-1 min-h-0 relative">
        <main
          ref={mainRef}
          className="absolute inset-0 overflow-y-auto overflow-x-hidden no-scrollbar"
        >
          {scrollableTopBar ? top : null}
          {children}
        </main>
        <ScrollIndicator targetRef={mainRef} />
      </div>
      <InAppBrowserBar onBack={() => navigate(-1)} onHome={() => navigate('/')} />
    </div>
  );
}
