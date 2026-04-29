import { Link, useParams } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { SubTabBar } from '@/components/ui/SubTabBar';
import { MAI_GATEWAYS, MAI_PROFILE, MAI_SUBTABS } from '@/mocks/mai';
import { MaiNewsFeed } from '@/components/mai/news/MaiNewsFeed';
import { MaiIssueFeed } from '@/components/mai/issue/IssueNoteFeed';

export function MaiPage() {
  const { subtab = 'news' } = useParams<{ subtab?: string }>();

  return (
    <AppShell variant="mai">
      <div className="flex flex-col bg-white">
        <ProfileSection />
        <GatewayRow />
        <SubTabBar tabs={MAI_SUBTABS} className="sticky top-0 z-20" />
        <SubtabBody id={subtab} />
      </div>
    </AppShell>
  );
}

function ProfileSection() {
  return (
    <section className="px-4 pt-2 pb-3 flex items-center gap-3">
      <img
        src={MAI_PROFILE.avatarUrl}
        alt=""
        width={48}
        height={48}
        draggable={false}
        className="w-12 h-12 rounded-full bg-gray-100 shrink-0"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1">
          <span className="text-[15px] font-bold text-gray-900 truncate">
            {MAI_PROFILE.nickname}
          </span>
          <ChevronRight size={16} className="text-gray-400 shrink-0" />
        </div>
        <p className="text-[12px] text-gray-500 truncate">{MAI_PROFILE.email}</p>
      </div>
    </section>
  );
}

function GatewayRow() {
  return (
    <section className="px-3 pb-3">
      <div className="grid grid-cols-3 gap-2">
        {MAI_GATEWAYS.map((g) => (
          <Link
            key={g.id}
            to={g.to}
            className="flex flex-col items-start rounded-card bg-gray-50 px-3 py-2.5 text-left active:bg-gray-100"
          >
            <span className="text-[13px] font-semibold text-gray-900">{g.label}</span>
            <span className="mt-0.5 text-[11px] text-gray-500">
              {g.newsLabel}{' '}
              <span className="font-semibold text-daum-red">{g.count}</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function SubtabBody({ id }: { id: string }) {
  if (id === 'news') return <MaiNewsFeed />;
  if (id === 'issue') return <MaiIssueFeed />;
  const label = MAI_SUBTABS.find((t) => t.id === id)?.label ?? id;
  return (
    <section className="bg-white flex-1 min-h-[400px] flex items-center justify-center px-6">
      <p className="text-[13px] text-gray-400">{label} 영역 (작업 예정)</p>
    </section>
  );
}
