import { Info, X } from 'lucide-react';

interface NoticeBannerProps {
  title?: string;
  body: string;
}

export function NoticeBanner({ title = '다음 뉴스 공지', body }: NoticeBannerProps) {
  return (
    <section className="bg-white">
      <div className="mx-4 my-2 rounded-lg border border-gray-200 px-3 py-2.5 flex items-start gap-2">
        <Info size={16} className="text-daum-blue mt-0.5 shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-[12px] font-semibold text-gray-900">{title}</p>
          <p className="mt-0.5 text-[12px] text-gray-500 leading-snug">{body}</p>
        </div>
        <button aria-label="닫기" className="text-gray-400 shrink-0">
          <X size={16} />
        </button>
      </div>
    </section>
  );
}
