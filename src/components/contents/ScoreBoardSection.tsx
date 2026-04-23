import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/cn';
import { placeholderImg } from '@/lib/img';
import type { MatchCard, MatchTeam, SportCategory } from '@/mocks/sports';

interface ScoreBoardSectionProps {
  matches: MatchCard[];
  categories: SportCategory[];
  defaultCategoryId?: string;
}

export function ScoreBoardSection({
  matches,
  categories,
  defaultCategoryId,
}: ScoreBoardSectionProps) {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState(defaultCategoryId ?? categories[0]?.id);
  const active = categories.find((c) => c.id === activeId) ?? categories[0];

  return (
    <section className="bg-white border-b border-gray-100">
      <div className="px-4 pt-3 pb-1 flex items-center justify-between">
        <h2 className="text-[12px] font-bold text-gray-900">주요 경기</h2>

        <div className="relative">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="inline-flex items-center gap-0.5 h-6 pl-2 pr-1 rounded-md border border-gray-200 text-[11px] font-semibold text-gray-700"
          >
            {active?.label}
            <ChevronDown size={12} className={cn('transition-transform', open && 'rotate-180')} />
          </button>
          {open ? (
            <ul
              role="menu"
              className="absolute right-0 top-full mt-1 z-20 min-w-[110px] max-h-[240px] overflow-y-auto bg-white border border-gray-200 rounded-md shadow-md py-1"
            >
              {categories.map((c) => (
                <li key={c.id}>
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setActiveId(c.id);
                      setOpen(false);
                    }}
                    className={cn(
                      'w-full text-left px-2.5 py-1 text-[12px]',
                      c.id === activeId
                        ? 'text-gray-900 font-semibold'
                        : 'text-gray-700 hover:bg-gray-50',
                    )}
                  >
                    {c.label}
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>

      <ul className="divide-y divide-gray-100 px-4">
        {matches.map((m) => (
          <MatchRow key={m.id} match={m} />
        ))}
      </ul>

      <div className="px-4 pb-3 pt-1.5">
        <button
          type="button"
          className="w-full h-8 rounded-md border border-gray-200 text-[12px] font-medium text-gray-700 inline-flex items-center justify-center gap-1"
        >
          경기 일정 더보기
          <ChevronRight size={12} />
        </button>
      </div>
    </section>
  );
}

function MatchRow({ match }: { match: MatchCard }) {
  const hasScores =
    typeof match.home.score === 'number' && typeof match.away.score === 'number';
  const isLive = match.status === 'live';

  return (
    <li className="py-2">
      <div className="flex items-center gap-1.5">
        <TeamSide team={match.home} align="right" score={match.home.score} hasScores={hasScores} />
        <CenterBlock match={match} hasScores={hasScores} isLive={isLive} />
        <TeamSide team={match.away} align="left" score={match.away.score} hasScores={hasScores} />
        <button
          type="button"
          aria-label="경기 분석"
          className="shrink-0 ml-1 h-7 px-2 text-[10px] font-semibold text-gray-700 bg-gray-100 rounded-md"
        >
          분석
        </button>
      </div>
    </li>
  );
}

function TeamSide({
  team,
  align,
  score,
  hasScores,
}: {
  team: MatchTeam;
  align: 'left' | 'right';
  score?: number;
  hasScores: boolean;
}) {
  return (
    <div
      className={cn(
        'flex-1 min-w-0 flex items-center gap-1.5',
        align === 'right' ? 'flex-row-reverse text-right' : 'text-left',
      )}
    >
      <img
        src={placeholderImg(`logo-${team.logoSeed}`, 40, 40, 'team,logo,sport')}
        alt=""
        className="w-5 h-5 rounded-full object-cover bg-gray-100 shrink-0"
        loading="lazy"
      />
      <div className="min-w-0">
        <p className="text-[11px] font-semibold text-gray-900 truncate">{team.name}</p>
        {hasScores ? (
          <p className="text-[13px] font-bold tabular-nums text-gray-900 leading-tight">
            {score}
          </p>
        ) : null}
      </div>
    </div>
  );
}

function CenterBlock({
  match,
  hasScores,
  isLive,
}: {
  match: MatchCard;
  hasScores: boolean;
  isLive: boolean;
}) {
  return (
    <div className="shrink-0 w-14 flex flex-col items-center text-center">
      {isLive ? (
        <span className="text-[10px] font-bold text-daum-red leading-none">● LIVE</span>
      ) : null}
      <span className="mt-0.5 text-[11px] font-semibold text-gray-900 tabular-nums leading-tight">
        {hasScores ? match.minute ?? match.statusText : match.statusText}
      </span>
      <span className="text-[10px] text-gray-500 leading-tight">{match.league}</span>
    </div>
  );
}
