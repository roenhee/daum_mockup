import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ExternalLink, Home, X } from 'lucide-react';
import { DECK_PATH } from '@/lib/deckLink';

interface HomeSideMenuProps {
  open: boolean;
  onClose: () => void;
}

export function HomeSideMenu({ open, onClose }: HomeSideMenuProps) {
  const [target, setTarget] = useState<HTMLElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setTarget(document.getElementById('phone-frame-root'));
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!target || !open) return null;

  const handleDeck = () => {
    onClose();
    navigate(DECK_PATH);
  };

  const handleOsHome = () => {
    onClose();
    navigate('/os-home');
  };

  return createPortal(
    <div
      className="absolute inset-0 z-50 bg-white flex flex-col"
      role="dialog"
      aria-label="홈 메뉴"
    >
      {/* 상태바 영역 확보 */}
      <div className="shrink-0 h-7" aria-hidden />
      <div className="h-12 shrink-0 flex items-center justify-between px-3 border-b border-gray-100">
        <span className="text-[15px] font-bold text-gray-900">메뉴</span>
        <button
          type="button"
          aria-label="닫기"
          onClick={onClose}
          className="p-1.5 -mr-1.5 text-gray-700 active:bg-gray-100 rounded-full"
        >
          <X size={22} />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-4 pt-5 pb-8 flex flex-col gap-3">
        <MenuButton
          icon={<Home size={22} className="text-gray-800" />}
          label="OS 홈 화면으로 이동"
          sub="iPhone 홈 화면에서 앱 진입 흐름 보기"
          onClick={handleOsHome}
          trailing="next"
        />
        <MenuButton
          icon={<ExternalLink size={22} className="text-daum-blue" />}
          label="프로젝트 컨셉 설명 deck 보러가기"
          sub="기획 배경과 화면 흐름을 설명하는 자료"
          onClick={handleDeck}
          trailing="external"
        />
      </div>
    </div>,
    target,
  );
}

function MenuButton({
  icon,
  label,
  sub,
  onClick,
  trailing,
}: {
  icon: React.ReactNode;
  label: string;
  sub?: string;
  onClick: () => void;
  trailing?: 'next' | 'external';
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center gap-4 px-4 py-5 rounded-2xl bg-gray-50 active:bg-gray-100 text-left"
    >
      <span className="shrink-0 w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center">
        {icon}
      </span>
      <span className="flex-1 min-w-0">
        <span className="block text-[16px] font-bold text-gray-900 leading-tight">
          {label}
        </span>
        {sub ? (
          <span className="block mt-1 text-[13px] text-gray-500 leading-snug">
            {sub}
          </span>
        ) : null}
      </span>
      {trailing === 'next' ? (
        <ChevronRight size={20} className="text-gray-400 shrink-0" />
      ) : trailing === 'external' ? (
        <ExternalLink size={16} className="text-gray-400 shrink-0" />
      ) : null}
    </button>
  );
}
