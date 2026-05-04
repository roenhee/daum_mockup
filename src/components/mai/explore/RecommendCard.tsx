import type { ExploreRecommendation } from '@/mocks/maiExplore';

// 추천 카드 — 인라인 에이전트 제안 (push)
// 스펙: 관찰 문장 + 제안 액션 문장 + 수용/거부.
// 빈 추천 카드는 노출하지 않음 (부모에서 조건부 렌더).
export function RecommendCard({
  rec,
  onAccept,
  onDismiss,
}: {
  rec: ExploreRecommendation;
  onAccept: () => void;
  onDismiss: () => void;
}) {
  return (
    <section className="px-3 pt-3">
      <div
        className="rounded-[14px] border border-[#D7DCEE] p-3"
        style={{
          background:
            'linear-gradient(135deg, rgba(125,87,194,0.08) 0%, rgba(61,110,224,0.10) 100%)',
        }}
      >
        <p className="text-[12px] text-gray-500 leading-snug">{rec.observation}</p>
        <p className="mt-0.5 text-[14px] text-gray-900 font-semibold leading-snug">
          {rec.proposal}
        </p>
        <div className="mt-2.5 flex items-center gap-3">
          <button
            type="button"
            onClick={onAccept}
            className="h-8 px-3 rounded-lg text-white text-[12px] font-medium active:opacity-90"
            style={{ background: '#3D4FB1' }}
          >
            시작하기
          </button>
          <button
            type="button"
            onClick={onDismiss}
            className="text-[12px] text-gray-500 underline-offset-2 hover:underline"
          >
            괜찮아요
          </button>
        </div>
      </div>
    </section>
  );
}
