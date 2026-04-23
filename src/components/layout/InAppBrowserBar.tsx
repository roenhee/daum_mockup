import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { asset } from '@/lib/asset';

interface InAppBrowserBarProps {
  onHome?: () => void;
  onBack?: () => void;
  onForward?: () => void;
  onSearch?: () => void;
  onShare?: () => void;
  onMore?: () => void;
}

export function InAppBrowserBar({
  onHome,
  onBack,
  onForward,
  onSearch,
  onShare,
  onMore,
}: InAppBrowserBarProps) {
  return (
    <nav className="shrink-0 h-12 border-t border-gray-200 bg-white flex items-center">
      <IconBtn aria-label="홈" onClick={onHome}>
        <img src={asset('/icons/detail/home.svg')} alt="" width={22} height={22} />
      </IconBtn>
      <IconBtn aria-label="이전" onClick={onBack}>
        <ChevronLeft size={22} />
      </IconBtn>
      <IconBtn aria-label="다음" onClick={onForward}>
        <ChevronRight size={22} />
      </IconBtn>
      <IconBtn aria-label="검색" onClick={onSearch}>
        <img src={asset('/icons/detail/search-more.svg')} alt="" width={18} height={18} />
      </IconBtn>
      <IconBtn aria-label="공유" onClick={onShare}>
        <img src={asset('/icons/detail/share.svg')} alt="" width={18} height={18} />
      </IconBtn>
      <IconBtn aria-label="더보기" onClick={onMore}>
        <MoreHorizontal size={22} />
      </IconBtn>
    </nav>
  );
}

function IconBtn(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="flex-1 h-full flex items-center justify-center text-gray-700"
    />
  );
}
