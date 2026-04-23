import { useState } from 'react';
import { cn } from '@/lib/cn';
import { asset } from '@/lib/asset';

interface PublisherHeaderProps {
  logoUrl: string;
  name: string;
  subscribed?: boolean;
}

export function PublisherHeader({ logoUrl, name, subscribed = false }: PublisherHeaderProps) {
  const [isSubscribed, setSubscribed] = useState(subscribed);

  return (
    <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100 bg-white">
      <img
        src={logoUrl}
        alt={name}
        className="w-7 h-7 rounded-full object-cover bg-gray-100 border border-gray-200"
      />
      <span className="text-[14px] font-semibold text-gray-900">{name}</span>
      <div className="ml-auto flex items-center gap-1">
        <button
          type="button"
          onClick={() => setSubscribed((v) => !v)}
          className={cn(
            'h-7 px-3 rounded-full text-[12px] font-semibold',
            isSubscribed
              ? 'bg-gray-100 text-gray-500'
              : 'bg-daum-blue/10 text-daum-blue',
          )}
        >
          {isSubscribed ? '구독중' : '+ 구독'}
        </button>
        <button aria-label="검색" className="p-1.5 text-gray-700">
          <img src={asset('/icons/detail/search-more.svg')} alt="" width={18} height={18} />
        </button>
        <button aria-label="공유" className="p-1.5 text-gray-700">
          <img src={asset('/icons/detail/share.svg')} alt="" width={18} height={18} />
        </button>
      </div>
    </div>
  );
}
