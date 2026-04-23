import { Thumbnail } from '@/components/ui/Thumbnail';
import type { EntertainCeleb } from '@/mocks/entertain';

interface EntertainCelebsProps {
  title?: string;
  celebs: EntertainCeleb[];
}

export function EntertainCelebs({
  title = '요즘 뜨는 스타',
  celebs,
}: EntertainCelebsProps) {
  return (
    <section className="bg-white border-b border-content-divider">
      <div className="px-4 pt-4 pb-2 flex items-center justify-between">
        <h2 className="text-body font-bold text-content-primary">{title}</h2>
        <button type="button" className="text-caption text-content-secondary">
          더보기 &gt;
        </button>
      </div>
      <ul className="flex gap-4 px-4 pb-4 overflow-x-auto no-scrollbar">
        {celebs.map((c) => (
          <li key={c.id} className="shrink-0 w-16 text-center">
            <div className="relative w-16 h-16 mx-auto">
              <Thumbnail
                url={c.avatarUrl}
                seed={c.avatarSeed}
                topic="korean,kpop,portrait"
                width={120}
                height={120}
                className="w-16 h-16 rounded-full"
              />
              {c.trending ? (
                <span className="absolute -bottom-0.5 -right-0.5 px-1 py-px text-micro font-bold text-white bg-daum-red rounded-full">
                  HOT
                </span>
              ) : null}
            </div>
            <p className="mt-1.5 text-caption font-semibold text-content-primary truncate">
              {c.name}
            </p>
            <p className="mt-0.5 text-micro text-content-secondary truncate">{c.subtitle}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
