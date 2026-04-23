import { useState } from 'react';
import { ChevronDown, ChevronUp, Sparkles, ThumbsUp, ThumbsDown } from 'lucide-react';
import { cn } from '@/lib/cn';

interface AiSummarySectionProps {
  query: string;
  summary?: string;
  sources?: { label: string; host: string }[];
}

type Feedback = null | 'up' | 'down';

const DEFAULT_SUMMARY = `이재명 대통령은 2026년 4월 22일부터 3박 5일 일정으로 미국을 방문했습니다. 이번 방미는 트럼프 행정부 2기 출범 이후 첫 공식 한미 정상회담으로, 한미 동맹 현대화, 통상·관세 재협상, 북핵·안보 협력, 반도체·AI 공급망 투자 등 네 가지 의제가 테이블에 오를 것으로 알려졌습니다.

특히 관세 문제는 한국 완성차·배터리 업계의 대미 수출에 직접적인 영향을 미치는 사안으로, 정부는 상호관세 인하와 전략 산업 예외 조항 확보를 목표로 하고 있습니다. 북핵 의제에서는 확장억제 강화와 한미일 협의체 재가동 여부가 주목됩니다. 양 정상은 공동성명 채택과 별도로 경제안보 작업반 신설에도 합의할 가능성이 있다고 소식통은 전했습니다.`;

const DEFAULT_SOURCES = [
  { label: '연합뉴스', host: 'yna.co.kr' },
  { label: 'SBS Biz', host: 'sbs.co.kr' },
  { label: '한겨레', host: 'hani.co.kr' },
];

export function AiSummarySection({
  query,
  summary = DEFAULT_SUMMARY,
  sources = DEFAULT_SOURCES,
}: AiSummarySectionProps) {
  const [expanded, setExpanded] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>(null);

  return (
    <section className="bg-white border-b border-gray-100">
      <div className="px-4 pt-4 pb-2 flex items-center gap-1.5">
        <Sparkles size={14} className="text-daum-blue" />
        <span className="text-[14px] font-bold text-gray-900">AI 요약</span>
        <span className="text-[11px] text-gray-400">· {query}</span>
      </div>

      <div className="px-4 pb-3">
        <p
          className={cn(
            'text-[13px] leading-6 text-gray-700 whitespace-pre-line',
            !expanded && 'line-clamp-3',
          )}
        >
          {summary}
        </p>

        {expanded ? (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="text-[11px] text-gray-500 mb-1.5">출처</div>
            <ul className="flex flex-wrap gap-1.5">
              {sources.map((s) => (
                <li key={s.host}>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gray-50 border border-gray-200 text-[11px] text-gray-700"
                  >
                    <span className="font-semibold">{s.label}</span>
                    <span className="text-gray-400">{s.host}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-2 w-full flex items-center justify-center gap-1 py-1 text-[12px] text-gray-500"
        >
          {expanded ? '접기' : '더보기'}
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>

        <div className="mt-2 pt-2 border-t border-gray-100 flex items-center gap-2">
          <p className="flex-1 min-w-0 text-[11px] leading-4 text-gray-400">
            AI를 활용하여 생성된 콘텐츠로, 정확하지 않을 수 있습니다.{' '}
            <button type="button" className="underline text-gray-500">
              자세히
            </button>
          </p>
          <div className="shrink-0 flex items-center gap-1">
            <button
              type="button"
              aria-label="좋아요"
              aria-pressed={feedback === 'up'}
              onClick={() => setFeedback((v) => (v === 'up' ? null : 'up'))}
              className={cn(
                'p-1.5 rounded-full',
                feedback === 'up' ? 'text-daum-blue bg-daum-blue/10' : 'text-gray-400',
              )}
            >
              <ThumbsUp size={14} />
            </button>
            <button
              type="button"
              aria-label="싫어요"
              aria-pressed={feedback === 'down'}
              onClick={() => setFeedback((v) => (v === 'down' ? null : 'down'))}
              className={cn(
                'p-1.5 rounded-full',
                feedback === 'down' ? 'text-daum-red bg-daum-red/10' : 'text-gray-400',
              )}
            >
              <ThumbsDown size={14} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
