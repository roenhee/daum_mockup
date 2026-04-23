import type { AdSlot } from '@/mocks/ads';
import { cn } from '@/lib/cn';

export function BannerAd({ ad, className }: { ad: AdSlot; className?: string }) {
  return (
    <section className="bg-white py-2">
      <div
        className={cn(
          'relative mx-4 rounded-lg overflow-hidden bg-gray-100',
          className,
        )}
      >
        <img
          src={ad.imageUrl}
          alt={ad.title}
          className="w-full aspect-[5/1] object-cover"
          loading="lazy"
        />
        <span className="absolute top-2 right-2 bg-black/60 text-white text-[10px] font-medium px-1.5 py-0.5 rounded">
          AD
        </span>
      </div>
    </section>
  );
}
