import type { ReactNode } from 'react';
import {
  Sun,
  TrendingUp,
  Trophy,
  Vote,
  Briefcase,
  CreditCard,
  CalendarClock,
} from 'lucide-react';
import { cn } from '@/lib/cn';
import { useDragScroll } from '@/lib/useDragScroll';
import type { Stock, Weather } from '@/types';

interface WidgetCarouselProps {
  weather: Weather;
  kospi: Stock;
}

export function WidgetCarousel({ weather, kospi }: WidgetCarouselProps) {
  const { ref, isDragging, handlers } = useDragScroll<HTMLDivElement>();

  return (
    <div className="bg-white">
      <div
        ref={ref}
        {...handlers}
        className={cn(
          'overflow-x-auto no-scrollbar select-none touch-pan-x',
          isDragging ? 'cursor-grabbing' : 'cursor-grab',
        )}
      >
        <div className="flex gap-2 px-4 py-3 min-w-max">
          <WeatherWidget weather={weather} />
          <StockWidget kospi={kospi} />
          <SportsWidget />
          <CommunityWidget />
          <PortfolioWidget />
          <CardBenefitWidget />
          <CalendarWidget />
        </div>
      </div>
    </div>
  );
}

interface IconChipProps {
  icon: ReactNode;
  bg: string;
}

function IconChip({ icon, bg }: IconChipProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center w-6 h-6 rounded-md shrink-0 text-white',
        bg,
      )}
    >
      {icon}
    </span>
  );
}

interface WidgetCardProps {
  label: ReactNode;
  accent?: ReactNode;
  chip: ReactNode;
  primary: ReactNode;
  meta?: ReactNode;
  className?: string;
}

function WidgetCard({ label, accent, chip, primary, meta, className }: WidgetCardProps) {
  return (
    <div
      className={cn(
        'w-[160px] shrink-0 rounded-2xl border border-gray-200 bg-white px-3 py-2 flex flex-col',
        className,
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-[11px] text-gray-500 min-w-0">
          <span className="truncate">{label}</span>
          {accent}
        </div>
        {chip}
      </div>
      <div className="mt-0.5">{primary}</div>
      {meta ? <div className="mt-0.5 text-[10px] text-gray-500">{meta}</div> : null}
    </div>
  );
}

function WeatherWidget({ weather }: { weather: Weather }) {
  return (
    <WidgetCard
      label={weather.region}
      chip={<IconChip icon={<Sun size={14} />} bg="bg-amber-400" />}
      primary={
        <div className="flex items-end gap-1">
          <span className="text-[16px] font-bold leading-none">{weather.tempC}°</span>
          <span className="text-[12px] text-gray-500 mb-0.5">맑음</span>
        </div>
      }
      meta={
        <>
          미세 {weather.dustLevel} · 대기 {weather.airQuality}
        </>
      }
    />
  );
}

function StockWidget({ kospi }: { kospi: Stock }) {
  const isUp = kospi.change >= 0;
  return (
    <WidgetCard
      label={kospi.name}
      chip={<IconChip icon={<TrendingUp size={14} />} bg="bg-daum-red" />}
      primary={
        <span className="text-[16px] font-bold leading-none">
          {kospi.price.toLocaleString()}
        </span>
      }
      meta={
        <span
          className={cn(
            'font-semibold',
            isUp ? 'text-daum-red' : 'text-daum-blue',
          )}
        >
          {isUp ? '▲' : '▼'} {Math.abs(kospi.change).toFixed(2)} ({kospi.changeRate}%)
        </span>
      }
    />
  );
}

function SportsWidget() {
  return (
    <WidgetCard
      label="프로야구"
      accent={<span className="text-[10px] font-bold text-daum-red">LIVE</span>}
      chip={<IconChip icon={<Trophy size={14} />} bg="bg-emerald-500" />}
      primary={
        <div className="flex items-center justify-between text-[13px]">
          <span className="truncate">LG</span>
          <span className="font-bold">5 : 3</span>
          <span className="truncate">KT</span>
        </div>
      }
      meta="7회말 · 잠실"
    />
  );
}

function CommunityWidget() {
  return (
    <WidgetCard
      label="커뮤니티 투표"
      chip={<IconChip icon={<Vote size={14} />} bg="bg-daum-blue" />}
      primary={
        <p className="text-[12px] font-semibold leading-none truncate">
          코스피 3,400 돌파 어떻게 보세요?
        </p>
      }
      meta="참여 1,284명"
    />
  );
}

function PortfolioWidget() {
  return (
    <WidgetCard
      label="내 관심 종목"
      chip={<IconChip icon={<Briefcase size={14} />} bg="bg-violet-500" />}
      primary={
        <div className="flex items-center justify-between text-[12px]">
          <span className="font-medium">삼성전자</span>
          <span className="text-daum-red font-semibold">+1.86%</span>
        </div>
      }
      meta={
        <span className="flex items-center justify-between">
          <span>SK하이닉스</span>
          <span className="text-daum-red font-semibold">+4.28%</span>
        </span>
      }
    />
  );
}

function CardBenefitWidget() {
  return (
    <WidgetCard
      label="카드 혜택"
      chip={<IconChip icon={<CreditCard size={14} />} bg="bg-pink-500" />}
      primary={
        <p className="text-[12px] font-semibold leading-snug line-clamp-2">
          스타벅스 5,000원 캐시백
        </p>
      }
      meta="잔여 23일"
    />
  );
}

function CalendarWidget() {
  return (
    <WidgetCard
      label="오늘의 일정"
      chip={<IconChip icon={<CalendarClock size={14} />} bg="bg-sky-500" />}
      primary={
        <p className="text-[12px] font-semibold leading-snug line-clamp-2">
          팀 주간 회의 · 오후 3시
        </p>
      }
      meta="일정 3건 남음"
    />
  );
}
