import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/cn';

type LinkItem = {
  kind: 'link';
  label: string;
  to: string;
  value?: string;
  description?: string;
};

type ToggleItem = {
  kind: 'toggle';
  id: string;
  label: string;
  description?: string;
  defaultOn?: boolean;
};

type SettingsItem = LinkItem | ToggleItem;

interface SettingsSection {
  id: string;
  title: string;
  items: SettingsItem[];
}

const SETTINGS_SECTIONS: SettingsSection[] = [
  {
    id: 'account',
    title: '계정',
    items: [
      { kind: 'link', label: '계정 관리', to: '/mai-settings/account-manage' },
      { kind: 'link', label: '내 활동 관리', to: '/mai-settings/activity-manage' },
    ],
  },
  {
    id: 'notification',
    title: '알림',
    items: [{ kind: 'link', label: '알림 설정', to: '/mai-notification/settings' }],
  },
  {
    id: 'service',
    title: '서비스',
    items: [
      { kind: 'link', label: '커뮤니티 설정', to: '/mai-settings/community' },
      { kind: 'link', label: '다음채널 설정', to: '/mai-settings/daum-channel' },
    ],
  },
  {
    id: 'contents',
    title: '콘텐츠',
    items: [
      { kind: 'link', label: '콘텐츠 메뉴 순서 편집', to: '/mai-settings/contents-order' },
      {
        kind: 'link',
        label: '미디어 자동 재생',
        to: '/mai-settings/autoplay',
        value: '항상',
        description:
          '앱에서 동영상과 음악을 자동 재생할 수 있습니다. 무선 데이터(LTE, 5G) 환경에서 동영상과 음악을 자동 재생하지 않으려면 설정을 변경해주세요.',
      },
      { kind: 'link', label: '글자 크기', to: '/mai-settings/font-size' },
      {
        kind: 'link',
        label: '콘텐츠 음성 재생',
        to: '/mai-settings/voice',
        value: '남성, 보통 속도',
      },
      {
        kind: 'link',
        label: '콘텐츠 번역 언어',
        to: '/mai-settings/translate',
        value: '영어',
      },
    ],
  },
  {
    id: 'browser',
    title: '브라우저',
    items: [
      { kind: 'toggle', id: 'popup-block', label: '팝업 차단', defaultOn: true },
      {
        kind: 'toggle',
        id: 'address-bar',
        label: '주소창 고정',
        description: '주소창을 항상 상단에 고정합니다.',
        defaultOn: false,
      },
    ],
  },
  {
    id: 'extra',
    title: '부가 기능',
    items: [
      {
        kind: 'toggle',
        id: 'location',
        label: '위치정보 접근 허용',
        description:
          '위치정보를 이용해 날씨와 검색 결과를 제공하고 콘텐츠와 광고를 추천합니다.',
        defaultOn: true,
      },
      {
        kind: 'toggle',
        id: 'quick-search',
        label: '간편 검색',
        description:
          '기기 상단을 쓸어내려 열리는 알림창에서 간편하게 다음검색창을 열 수 있습니다',
        defaultOn: false,
      },
    ],
  },
  {
    id: 'style',
    title: '스타일',
    items: [
      {
        kind: 'link',
        label: '화면 스타일',
        to: '/mai-settings/screen-style',
        value: '시스템 설정 모드',
      },
    ],
  },
  {
    id: 'info',
    title: '정보',
    items: [
      { kind: 'link', label: '다음 고객센터', to: '/mai-settings/customer-center' },
      {
        kind: 'link',
        label: '앱 정보',
        to: '/mai-settings/app-info',
        value: '최신 버전 사용 중',
      },
    ],
  },
];

const INITIAL_TOGGLES: Record<string, boolean> = SETTINGS_SECTIONS.flatMap((s) =>
  s.items,
).reduce<Record<string, boolean>>((acc, item) => {
  if (item.kind === 'toggle') acc[item.id] = item.defaultOn ?? false;
  return acc;
}, {});

export function MaiSettingsPage() {
  const navigate = useNavigate();
  const [toggles, setToggles] = useState<Record<string, boolean>>(INITIAL_TOGGLES);

  return (
    <div className="flex flex-col h-full bg-white">
      <header className="shrink-0 h-12 flex items-center px-3 border-b border-gray-100">
        <button
          type="button"
          aria-label="뒤로"
          onClick={() => navigate(-1)}
          className="p-1.5 -ml-1.5 text-gray-900"
        >
          <ChevronLeft size={24} strokeWidth={2} />
        </button>
        <span className="ml-1 text-[17px] font-bold text-gray-900">설정</span>
      </header>

      <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden no-scrollbar">
        {SETTINGS_SECTIONS.map((section, idx) => (
          <div key={section.id}>
            {idx > 0 ? <div aria-hidden className="h-2 bg-gray-100" /> : null}
            <section>
              <h2 className="px-4 pt-5 pb-2 text-[13px] font-bold text-gray-500">
                {section.title}
              </h2>
              <ul>
                {section.items.map((item) =>
                  item.kind === 'link' ? (
                    <LinkRow key={item.to} item={item} />
                  ) : (
                    <ToggleRow
                      key={item.id}
                      item={item}
                      value={toggles[item.id] ?? false}
                      onChange={(next) =>
                        setToggles((prev) => ({ ...prev, [item.id]: next }))
                      }
                    />
                  ),
                )}
              </ul>
            </section>
          </div>
        ))}
        <div className="h-12" aria-hidden />
      </main>
    </div>
  );
}

function LinkRow({ item }: { item: LinkItem }) {
  return (
    <li>
      <Link
        to={item.to}
        className="flex items-start gap-3 px-4 py-3.5 border-b border-gray-100 last:border-b-0 active:bg-gray-50"
      >
        <div className="flex-1 min-w-0">
          <p className="text-[14px] font-semibold text-gray-900">{item.label}</p>
          {item.description ? (
            <p className="mt-1 text-[12px] text-gray-500 leading-snug">
              {item.description}
            </p>
          ) : null}
        </div>
        <div className="flex items-center gap-1 shrink-0 mt-0.5">
          {item.value ? (
            <span className="text-[13px] text-gray-500">{item.value}</span>
          ) : null}
          <ChevronRight size={18} strokeWidth={2} className="text-gray-300" />
        </div>
      </Link>
    </li>
  );
}

function ToggleRow({
  item,
  value,
  onChange,
}: {
  item: ToggleItem;
  value: boolean;
  onChange: (next: boolean) => void;
}) {
  return (
    <li className="flex items-start gap-3 px-4 py-3.5 border-b border-gray-100 last:border-b-0">
      <div className="flex-1 min-w-0">
        <p className="text-[14px] font-semibold text-gray-900">{item.label}</p>
        {item.description ? (
          <p className="mt-1 text-[12px] text-gray-500 leading-snug">
            {item.description}
          </p>
        ) : null}
      </div>
      <button
        type="button"
        onClick={() => onChange(!value)}
        aria-pressed={value}
        aria-label={item.label}
        className="shrink-0 mt-0.5"
      >
        <Switch active={value} />
      </button>
    </li>
  );
}

function Switch({ active }: { active: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        'relative inline-block w-11 h-6 rounded-full transition-colors shrink-0',
        active ? 'bg-daum-blue' : 'bg-gray-300',
      )}
    >
      <span
        className={cn(
          'absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform',
          active && 'translate-x-5',
        )}
      />
    </span>
  );
}
