import { NavLink, useParams } from 'react-router-dom';
import { AppShell } from '@/components/layout/AppShell';
import { SubTabBar } from '@/components/ui/SubTabBar';
import { CONTENTS_SUBTABS } from '@/mocks/contentsSubtabs';
import { NewsSubtab } from '@/pages/contents/NewsSubtab';
import { SportsSubtab } from '@/pages/contents/SportsSubtab';
import { EntertainSubtab } from '@/pages/contents/EntertainSubtab';
import { MoneySubtab } from '@/pages/contents/MoneySubtab';

const IMPLEMENTED_SUBTABS = ['news', 'sports', 'entertain', 'money'];

export function ContentsPage() {
  const { subtab = 'news' } = useParams<{ subtab?: string }>();

  return (
    <AppShell variant="contents" scrollableHeader>
      <div className="bg-gray-100 flex flex-col">
        <SubTabBar tabs={CONTENTS_SUBTABS} className="sticky top-0 z-20" />
        {renderSubtab(subtab)}
      </div>
    </AppShell>
  );
}

function renderSubtab(subtab: string) {
  if (subtab === 'news') return <NewsSubtab />;
  if (subtab === 'sports') return <SportsSubtab />;
  if (subtab === 'entertain') return <EntertainSubtab />;
  if (subtab === 'money') return <MoneySubtab />;
  return <SubtabPlaceholder id={subtab} />;
}

function SubtabPlaceholder({ id }: { id: string }) {
  const label = CONTENTS_SUBTABS.find((t) => t.id === id)?.label ?? id;
  const implemented = CONTENTS_SUBTABS.filter((t) => IMPLEMENTED_SUBTABS.includes(t.id));
  return (
    <section className="bg-white flex-1 min-h-[400px] flex flex-col items-center justify-center px-6 text-center">
      <p className="text-[15px] font-bold text-gray-900">{label} 서브탭</p>
      <p className="mt-2 text-[13px] text-gray-500 leading-relaxed">
        이 서브탭은 목업에서 간소화되어 있습니다.
      </p>
      <div className="mt-5 w-full max-w-[260px]">
        <p className="text-[12px] font-semibold text-gray-700">현재 구현된 서브탭</p>
        <ul className="mt-2 flex flex-wrap gap-1.5 justify-center">
          {implemented.map((t) => (
            <li key={t.id}>
              <NavLink
                to={t.to}
                className="inline-flex px-2.5 py-1 rounded-chip bg-gray-100 text-[12px] text-gray-700 hover:bg-content-faint"
              >
                {t.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
