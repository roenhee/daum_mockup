import { NavLink } from 'react-router-dom';
import { asset } from '@/lib/asset';
import { cn } from '@/lib/cn';

interface TabDef {
  to: string;
  label: string;
  icon: string;
  iconSelected: string;
  end?: boolean;
}

const TABS: TabDef[] = [
  {
    to: '/',
    label: '홈',
    icon: '/icons/tab/home.svg',
    iconSelected: '/icons/tab/home_selected.svg',
    end: true,
  },
  {
    to: '/contents',
    label: '콘텐츠',
    icon: '/icons/tab/contents.svg',
    iconSelected: '/icons/tab/contents_selected.svg',
  },
  {
    to: '/community',
    label: '커뮤니티',
    icon: '/icons/tab/community.svg',
    iconSelected: '/icons/tab/community_selected.svg',
  },
  {
    to: '/shopping',
    label: '쇼핑',
    icon: '/icons/tab/shopping.svg',
    iconSelected: '/icons/tab/shopping_selected.svg',
  },
  {
    to: '/mai',
    label: 'M:AI',
    icon: '/icons/tab/mai.svg',
    iconSelected: '/icons/tab/mai_selected.svg',
  },
];

export function BottomTabBar() {
  return (
    <nav className="shrink-0 h-14 border-t border-gray-200 bg-white flex items-stretch">
      {TABS.map(({ to, label, icon, iconSelected, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            cn(
              'flex-1 flex flex-col items-center justify-center gap-0.5 text-[10px] text-black',
              isActive ? 'font-semibold' : 'font-normal',
            )
          }
        >
          {({ isActive }) => (
            <>
              <img
                src={asset(isActive ? iconSelected : icon)}
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
                draggable={false}
              />
              <span>{label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
