import { useNavigate } from 'react-router-dom';
import { ChevronLeft, MoreHorizontal } from 'lucide-react';
import { asset } from '@/lib/asset';
import type { ChannelProfile } from '@/mocks/channelView';

interface ChannelTopBarProps {
  channel: ChannelProfile;
}

export function ChannelTopBar({ channel }: ChannelTopBarProps) {
  const navigate = useNavigate();
  return (
    <header className="shrink-0 h-11 flex items-center gap-2 px-2 bg-white border-b border-gray-100">
      <button
        aria-label="뒤로"
        onClick={() => navigate(-1)}
        className="p-2 text-gray-700"
      >
        <ChevronLeft size={22} />
      </button>
      <div className="flex-1 min-w-0 flex items-center gap-2">
        <img
          src={channel.avatarUrl}
          alt=""
          className="w-6 h-6 rounded-full object-cover bg-gray-100"
        />
        <span className="text-[14px] font-semibold text-gray-900 truncate">
          {channel.name}
        </span>
      </div>
      <button aria-label="공유" className="p-2 text-gray-700">
        <img src={asset('/icons/detail/share.svg')} alt="" width={18} height={18} />
      </button>
      <button aria-label="더보기" className="p-2 text-gray-700 mr-1">
        <MoreHorizontal size={20} />
      </button>
    </header>
  );
}
