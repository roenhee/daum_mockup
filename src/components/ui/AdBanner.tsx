import type { AdSlot } from '@/mocks/ads';
import { cn } from '@/lib/cn';

export function AdBanner({ ad, className }: { ad: AdSlot; className?: string }) {
  return (
    <section className="bg-white py-3">
      <div
        className={cn(
          'mx-4 rounded-lg overflow-hidden border border-gray-200',
          className,
        )}
      >
        <div className="relative">
          <img
            src={ad.imageUrl}
            alt={ad.title}
            className="w-full aspect-[2/1] object-cover bg-gray-100"
            loading="lazy"
          />
          <span className="absolute top-2 left-2 bg-black/50 text-white text-[10px] font-medium px-1.5 py-0.5 rounded">
            AD
          </span>
        </div>
        <div className="px-3 py-2 bg-white">
          <p className="text-[13px] font-medium text-gray-900 line-clamp-1">
            {ad.title}
          </p>
          <p className="mt-0.5 text-[11px] text-gray-500">{ad.advertiser}</p>
        </div>
      </div>
    </section>
  );
}
