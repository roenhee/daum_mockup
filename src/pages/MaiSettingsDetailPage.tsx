import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const SETTINGS_DETAIL_TITLES: Record<string, string> = {
  'account-manage': '계정 관리',
  'activity-manage': '내 활동 관리',
  community: '커뮤니티 설정',
  'daum-channel': '다음채널 설정',
  'contents-order': '콘텐츠 메뉴 순서 편집',
  autoplay: '미디어 자동 재생',
  'font-size': '글자 크기',
  voice: '콘텐츠 음성 재생',
  translate: '콘텐츠 번역 언어',
  'popup-block': '팝업 차단',
  'address-bar': '주소창 고정',
  location: '위치정보 접근 허용',
  'quick-search': '간편 검색',
  'screen-style': '화면 스타일',
  'customer-center': '다음 고객센터',
  'app-info': '앱 정보',
};

export function MaiSettingsDetailPage() {
  const navigate = useNavigate();
  const { id = '' } = useParams<{ id: string }>();
  const title = SETTINGS_DETAIL_TITLES[id] ?? id;

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
        <span className="ml-1 text-[17px] font-bold text-gray-900">{title}</span>
      </header>
      <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden no-scrollbar flex items-center justify-center px-6">
        <p className="text-[13px] text-gray-400">{title} 페이지 (작업 예정)</p>
      </main>
    </div>
  );
}
