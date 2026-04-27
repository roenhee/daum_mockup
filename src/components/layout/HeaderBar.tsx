import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search as SearchLucide, Mic } from 'lucide-react';
import type { HeaderVariant } from '@/types';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/lib/cn';
import { asset } from '@/lib/asset';

interface HeaderBarProps {
  variant: HeaderVariant;
  onOpenMenu?: () => void;
}

export function HeaderBar({ variant, onOpenMenu }: HeaderBarProps) {
  if (variant === 'home') {
    return <HomeHeader onOpenMenu={onOpenMenu} />;
  }

  if (variant === 'contents') {
    return (
      <HeaderShell noBorder>
        <span className="text-[17px] font-bold">콘텐츠</span>
        <div className="flex items-center gap-1">
          <IconBtn aria-label="설정">
            <Icon src="/icons/nav/tab-setting.svg" size={24} />
          </IconBtn>
          <Link to="/search" aria-label="검색" className="p-2">
            <Icon src="/icons/nav/search.svg" size={24} />
          </Link>
        </div>
      </HeaderShell>
    );
  }

  if (variant === 'community') {
    return (
      <HeaderShell>
        <span className="text-[17px] font-bold">커뮤니티</span>
        <div className="flex items-center gap-1">
          <IconBtn aria-label="알림">
            <Icon src="/icons/nav/notification.svg" size={24} />
          </IconBtn>
          <Link to="/search" aria-label="검색" className="p-2">
            <Icon src="/icons/nav/search.svg" size={24} />
          </Link>
        </div>
      </HeaderShell>
    );
  }

  if (variant === 'shopping') {
    return (
      <HeaderShell>
        <span className="text-[17px] font-bold">쇼핑</span>
        <div className="flex items-center gap-1">
          <IconBtn aria-label="마이 쇼핑">
            <Icon src="/icons/nav/shopping-my.svg" size={24} />
          </IconBtn>
          <Link to="/search" aria-label="쇼핑 검색" className="p-2">
            <Icon src="/icons/nav/shopping-search.svg" size={24} />
          </Link>
        </div>
      </HeaderShell>
    );
  }

  return (
    <header className="shrink-0 h-12 flex items-center justify-between px-3 bg-black text-white">
      <div className="flex items-center gap-4 text-[15px]">
        <span className="font-semibold">추천</span>
        <span className="text-white/60">인기</span>
      </div>
      <div className="flex items-center gap-1">
        <Link to="/search" aria-label="검색" className="p-2 text-white">
          <SearchLucide size={22} />
        </Link>
      </div>
    </header>
  );
}

function HeaderShell({
  children,
  noBorder,
}: {
  children: React.ReactNode;
  noBorder?: boolean;
}) {
  return (
    <header
      className={cn(
        'shrink-0 h-12 flex items-center justify-between px-3 bg-white',
        !noBorder && 'border-b border-gray-100',
      )}
    >
      {children}
    </header>
  );
}

function IconBtn({
  children,
  className,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...rest} className={cn('p-2 text-gray-900', className)}>
      {children}
    </button>
  );
}

function HomeHeader({ onOpenMenu }: { onOpenMenu?: () => void }) {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const main = document.querySelector('main');
    if (!main) return;
    const onScroll = () => setCollapsed(main.scrollTop > 24);
    onScroll();
    main.addEventListener('scroll', onScroll, { passive: true });
    return () => main.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <div className="h-12 flex items-center justify-between px-3 bg-white">
        <button
          aria-label="메뉴 열기"
          onClick={onOpenMenu}
          className="p-2 -ml-2 text-gray-900"
        >
          <Icon src="/icons/nav/notification-sidemenu.svg" size={24} />
        </button>
        <div className="flex items-center gap-1">
          <IconBtn aria-label="AI 챗봇">
            <Icon src="/icons/nav/chat-bot.svg" size={24} />
          </IconBtn>
          <IconBtn aria-label="혜택">
            <Icon src="/icons/nav/benefit.svg" size={24} />
          </IconBtn>
          <IconBtn aria-label="알림">
            <Icon src="/icons/nav/notification.svg" size={24} />
          </IconBtn>
        </div>
      </div>
      <div
        className={cn(
          'sticky top-0 z-20 px-3 pt-2 pb-3 flex justify-center transition-colors duration-200',
          collapsed ? 'bg-transparent' : 'bg-white',
        )}
      >
        <div
          className={cn(
            'transition-[width] duration-300 ease-out',
            collapsed ? 'w-1/2' : 'w-full',
          )}
        >
          <div className="rounded-full p-[2px] bg-gradient-to-r from-daum-blue via-daum-green via-60% via-daum-yellow to-daum-red">
            <Link
              to="/search"
              className="flex items-center gap-2 h-12 rounded-full bg-white px-3 text-[14px]"
            >
              <img
                src={asset('/icons/daum-d.svg')}
                alt="Daum"
                width={28}
                height={28}
                draggable={false}
                className="shrink-0"
              />
              <span className="flex-1" />
              <Mic size={20} className="text-gray-700 shrink-0" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

