import { useState } from 'react';
import type { EmotionVotes } from '@/mocks/newsDetail';
import { cn } from '@/lib/cn';

type Emotion = keyof EmotionVotes;

const EMOTIONS: { id: Emotion; emoji: string }[] = [
  { id: '추천해요', emoji: '👍' },
  { id: '좋아요', emoji: '🙂' },
  { id: '감동이에요', emoji: '🥰' },
  { id: '화나요', emoji: '😠' },
  { id: '슬퍼요', emoji: '😢' },
];

interface EmotionReactionsProps {
  votes: EmotionVotes;
}

export function EmotionReactions({ votes }: EmotionReactionsProps) {
  const [selected, setSelected] = useState<Emotion | null>(null);

  return (
    <section className="bg-white">
      <div className="mx-4 border-t border-gray-200" />
      <p className="mt-4 px-4 text-center text-[14px] font-semibold text-gray-900">
        이 기사에 대해 어떻게 생각하시나요?
      </p>
      <ul className="mt-3 px-4 pb-4 flex items-start justify-between">
        {EMOTIONS.map((em) => {
          const isSelected = selected === em.id;
          return (
            <li key={em.id}>
              <button
                type="button"
                onClick={() => setSelected(isSelected ? null : em.id)}
                className="flex flex-col items-center gap-1"
              >
                <span className="text-[26px] leading-none">{em.emoji}</span>
                <span
                  className={cn(
                    'text-[11px] font-medium',
                    isSelected ? 'text-daum-blue' : 'text-gray-700',
                  )}
                >
                  {em.id}
                </span>
                <span
                  className={cn(
                    'text-[11px] tabular-nums',
                    isSelected ? 'text-daum-blue font-semibold' : 'text-gray-500',
                  )}
                >
                  {votes[em.id].toLocaleString()}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
