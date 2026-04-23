import { MessageCircle } from 'lucide-react';

export function DisabledComments() {
  return (
    <section className="bg-white">
      <div className="px-4 pt-5 pb-2 flex items-baseline gap-2">
        <h2 className="text-[15px] font-bold text-gray-900">댓글</h2>
      </div>
      <div className="px-4 pb-6 flex flex-col items-center text-center">
        <div className="mt-2 w-12 h-12 rounded-full bg-gray-100 inline-flex items-center justify-center text-gray-400">
          <MessageCircle size={24} />
        </div>
        <p className="mt-3 text-[14px] font-semibold text-gray-900">
          댓글을 제공하지 않아요
        </p>
        <p className="mt-1 text-[12px] text-gray-500 leading-relaxed">
          해당 콘텐츠 댓글은 파트너사 정책에 따라
          <br />
          제공하지 않습니다.
        </p>
      </div>
    </section>
  );
}
