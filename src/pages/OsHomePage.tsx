import { Link } from 'react-router-dom';
import {
  Aperture,
  Bell,
  BookOpen,
  Calculator,
  Calendar,
  Clock,
  CloudSun,
  Compass,
  Heart,
  ListTodo,
  Map,
  Mail,
  MessageSquare,
  Music,
  NotebookPen,
  Phone,
  Presentation,
  Settings,
  ShoppingBag,
  Video,
  type LucideIcon,
} from 'lucide-react';
import { asset } from '@/lib/asset';
import { openDeck } from '@/lib/deckLink';
import { usePushNotification } from '@/components/notification/PushNotificationProvider';
import { cn } from '@/lib/cn';

interface AppDef {
  label: string;
  Icon?: LucideIcon;
  imgSrc?: string;
  bg?: string;
  iconColor?: string;
  to?: string;
  href?: string;
  onClick?: () => void;
  imgClassName?: string;
  iconSize?: number;
}

// 실제 iOS 톤에 가까운 그라디언트/색상 — 단조로움을 줄이고 인지도를 높임
const APPS: AppDef[] = [
  // Row 1
  {
    label: 'FaceTime',
    Icon: Video,
    bg: 'bg-gradient-to-b from-[#3CDA6E] to-[#04C757]',
    iconColor: 'text-white',
  },
  {
    label: '캘린더',
    Icon: Calendar,
    bg: 'bg-white',
    iconColor: 'text-[#FF3B30]',
  },
  {
    label: '사진',
    bg: 'bg-white',
    imgSrc: '/icons/photos-flower.svg',
    imgClassName: 'w-9 h-9',
  },
  {
    label: '카메라',
    Icon: Aperture,
    bg: 'bg-gradient-to-b from-[#5E5E5E] to-[#1A1A1A]',
    iconColor: 'text-white',
  },
  // Row 2
  {
    label: '날씨',
    Icon: CloudSun,
    bg: 'bg-gradient-to-b from-[#3DB7FF] to-[#0C7DF3]',
    iconColor: 'text-white',
  },
  {
    label: '시계',
    Icon: Clock,
    bg: 'bg-black',
    iconColor: 'text-white',
  },
  {
    label: '지도',
    Icon: Map,
    bg: 'bg-gradient-to-b from-[#A8E063] to-[#56AB2F]',
    iconColor: 'text-white',
  },
  {
    label: '나침반',
    Icon: Compass,
    bg: 'bg-gradient-to-b from-[#3A3A3C] to-[#1A1A1C]',
    iconColor: 'text-white',
  },
  // Row 3
  {
    label: '계산기',
    Icon: Calculator,
    bg: 'bg-black',
    iconColor: 'text-[#FF9500]',
  },
  {
    label: '메모',
    Icon: NotebookPen,
    bg: 'bg-gradient-to-b from-[#FFE45F] to-[#FFD60A]',
    iconColor: 'text-white',
  },
  {
    label: '건강',
    Icon: Heart,
    bg: 'bg-white',
    iconColor: 'text-[#FF2D55]',
  },
  {
    label: '설정',
    Icon: Settings,
    bg: 'bg-gradient-to-b from-[#888B91] to-[#4D5256]',
    iconColor: 'text-white',
  },
  // Row 4 — App Store / 음악 / 미리알림(NEW) / 책(NEW)
  {
    label: 'App Store',
    Icon: ShoppingBag,
    bg: 'bg-gradient-to-b from-[#1ECCFF] to-[#0879F0]',
    iconColor: 'text-white',
  },
  {
    label: '음악',
    Icon: Music,
    bg: 'bg-gradient-to-b from-[#FB5C74] to-[#FA243C]',
    iconColor: 'text-white',
  },
  {
    label: '미리알림',
    Icon: ListTodo,
    bg: 'bg-white',
    iconColor: 'text-[#FF3B30]',
  },
  {
    label: '책',
    Icon: BookOpen,
    bg: 'bg-gradient-to-b from-[#FFA500] to-[#FF6347]',
    iconColor: 'text-white',
  },
  // Row 5 (last) — Deck / Daum / Daum 푸시 알림
  {
    label: 'Deck',
    Icon: Presentation,
    bg: 'bg-gradient-to-b from-[#9F7AEA] to-[#6B46C1]',
    iconColor: 'text-white',
    onClick: openDeck,
  },
  {
    label: 'Daum',
    imgSrc: '/icons/daum-d.svg',
    bg: 'bg-white',
    to: '/',
    imgClassName: 'w-9 h-9',
  },
  {
    label: 'Daum 푸시 알림',
    Icon: Bell,
    bg: 'bg-gradient-to-b from-[#FF6B81] to-[#E0224B]',
    iconColor: 'text-white',
  },
];

const DOCK_APPS: AppDef[] = [
  {
    label: '전화',
    Icon: Phone,
    bg: 'bg-gradient-to-b from-[#3CDA6E] to-[#04C757]',
    iconColor: 'text-white',
  },
  {
    label: '메시지',
    Icon: MessageSquare,
    bg: 'bg-gradient-to-b from-[#5BE26D] to-[#16C148]',
    iconColor: 'text-white',
  },
  {
    label: '메일',
    Icon: Mail,
    bg: 'bg-gradient-to-b from-[#3DB7FF] to-[#0C7DF3]',
    iconColor: 'text-white',
  },
  {
    label: 'Safari',
    Icon: Compass,
    bg: 'bg-white',
    iconColor: 'text-[#0C7DF3]',
  },
];

export function OsHomePage() {
  const { trigger: triggerPush } = usePushNotification();

  // 푸시 앱 → 랜덤 푸시만 띄우고 OS 홈에 머무름. 토스트 탭 시 해당 탭으로 이동.
  const apps = APPS.map((app) =>
    app.label === 'Daum 푸시 알림' ? { ...app, onClick: triggerPush } : app,
  );

  return (
    <div className="relative w-full h-full">
      {/* 사용자 제공 월페이퍼 — 상태바 뒤까지 풀블리드 */}
      <img
        src={asset('/wallpapers/os-home.jpg')}
        alt=""
        draggable={false}
        className="absolute -top-9 left-0 w-full h-[calc(100%+36px)] object-cover select-none pointer-events-none"
        aria-hidden
      />

      <div className="relative w-full h-full flex flex-col text-white">
        <div className="flex-1 min-h-0 px-4 pt-3 pb-6 grid grid-cols-4 auto-rows-min gap-y-4 gap-x-2 content-start">
          {apps.map((app) => (
            <AppTile key={app.label} app={app} />
          ))}
        </div>

        <PageDots />

        <div className="shrink-0 px-3 pt-1 pb-2">
          <div className="rounded-[28px] bg-white/25 backdrop-blur-xl px-3 py-3 grid grid-cols-4 gap-2">
            {DOCK_APPS.map((app) => (
              <AppTile key={app.label} app={app} hideLabel />
            ))}
          </div>
        </div>

        <div className="shrink-0 pb-1.5 flex justify-center" aria-hidden>
          <span className="block w-[110px] h-[5px] rounded-full bg-black/70" />
        </div>
      </div>
    </div>
  );
}

function PageDots() {
  return (
    <div className="shrink-0 flex justify-center gap-1.5 pt-1 pb-1" aria-hidden>
      <span className="w-1.5 h-1.5 rounded-full bg-white" />
      <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
      <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
    </div>
  );
}

function AppTile({ app, hideLabel }: { app: AppDef; hideLabel?: boolean }) {
  const inner = (
    <div className="flex flex-col items-center gap-1.5">
      <span
        className={cn(
          'w-[58px] h-[58px] rounded-[14px] flex items-center justify-center overflow-hidden',
          'shadow-[0_2px_5px_rgba(0,0,0,0.15)]',
          app.bg ?? 'bg-white',
        )}
      >
        {app.imgSrc ? (
          <img
            src={asset(app.imgSrc)}
            alt=""
            draggable={false}
            className={cn('object-contain', app.imgClassName ?? 'w-8 h-8')}
          />
        ) : app.Icon ? (
          <app.Icon
            size={app.iconSize ?? 30}
            strokeWidth={2.1}
            className={app.iconColor ?? 'text-white'}
          />
        ) : null}
      </span>
      {!hideLabel ? (
        <span className="text-[11px] font-medium text-white drop-shadow-sm leading-none text-center max-w-[72px] truncate">
          {app.label}
        </span>
      ) : null}
    </div>
  );

  if (app.to) {
    return (
      <Link to={app.to} className="block active:opacity-80">
        {inner}
      </Link>
    );
  }
  if (app.href) {
    return (
      <a
        href={app.href}
        target="_blank"
        rel="noopener noreferrer"
        className="block active:opacity-80"
      >
        {inner}
      </a>
    );
  }
  return (
    <button
      type="button"
      onClick={app.onClick}
      className="block w-full active:opacity-80"
    >
      {inner}
    </button>
  );
}
