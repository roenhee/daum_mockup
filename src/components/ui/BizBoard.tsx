interface BizBoardProps {
  title?: string;
  advertiser?: string;
  imageUrl?: string;
  compact?: boolean;
}

export function BizBoard({
  title = '올 겨울, 스마트 난방기 10% 할인',
  advertiser = '오스카리움 · 광고',
  imageUrl = 'https://picsum.photos/seed/biz-board-01/800/260',
  compact,
}: BizBoardProps) {
  return (
    <div className="relative overflow-hidden bg-gray-900">
      <img
        src={imageUrl}
        alt=""
        className={
          compact
            ? 'w-full aspect-[32/5] object-cover opacity-80'
            : 'w-full aspect-[16/5] object-cover opacity-80'
        }
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
      <div className="absolute inset-y-0 left-4 flex flex-col justify-center">
        <span
          className={
            compact
              ? 'text-[9px] font-semibold text-white/70 tracking-wider'
              : 'text-[10px] font-semibold text-white/70 tracking-wider'
          }
        >
          BIZBOARD
        </span>
        <p
          className={
            compact
              ? 'mt-0.5 text-[12px] font-bold text-white leading-snug line-clamp-1'
              : 'mt-1 text-[15px] font-bold text-white leading-snug'
          }
        >
          {title}
        </p>
        <p
          className={
            compact
              ? 'text-[10px] text-white/80 line-clamp-1'
              : 'mt-0.5 text-[11px] text-white/80'
          }
        >
          {advertiser}
        </p>
      </div>
      <span className="absolute top-1.5 right-1.5 text-[9px] font-medium text-white/80 bg-black/40 px-1.5 py-0.5 rounded">
        AD
      </span>
    </div>
  );
}
