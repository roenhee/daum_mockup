import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PhoneFrame } from '@/components/layout/PhoneFrame';
import { MaiPlayerProvider } from '@/components/mai/news/MaiPlayer';
import { PushNotificationProvider } from '@/components/notification/PushNotificationProvider';
import { HomePage } from '@/pages/HomePage';
import { ContentsPage } from '@/pages/ContentsPage';
import { CommunityPage } from '@/pages/CommunityPage';
import { ShoppingPage } from '@/pages/ShoppingPage';
import { MaiPage } from '@/pages/MaiPage';
import { MaiSubPage } from '@/pages/MaiSubPage';
import { MaiHistoryPage } from '@/pages/MaiHistoryPage';
import { MaiSubscribePage } from '@/pages/MaiSubscribePage';
import { MaiNotificationPage } from '@/pages/MaiNotificationPage';
import { MaiNotificationOrderPage } from '@/pages/MaiNotificationOrderPage';
import { MaiNotificationSettingsPage } from '@/pages/MaiNotificationSettingsPage';
import { MaiSettingsPage } from '@/pages/MaiSettingsPage';
import { MaiSettingsDetailPage } from '@/pages/MaiSettingsDetailPage';
import { NewsDetailPage } from '@/pages/NewsDetailPage';
import { ChannelViewPage } from '@/pages/ChannelViewPage';
import { SearchPage } from '@/pages/SearchPage';
import { OsHomePage } from '@/pages/OsHomePage';
import { DeckViewerPage } from '@/pages/DeckViewerPage';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        {/* Deck 뷰는 사용자 해상도 풀스크린으로 노출 — 폰 프레임 우회 */}
        <Route path="/deck" element={<DeckViewerPage />} />
        <Route path="/*" element={<MockupApp />} />
      </Routes>
    </HashRouter>
  );
}

function MockupApp() {
  return (
    <MaiPlayerProvider>
      <PhoneFrame>
        <PushNotificationProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/contents" element={<Navigate to="/contents/news" replace />} />
            <Route path="/contents/:subtab" element={<ContentsPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/shopping" element={<ShoppingPage />} />
            <Route path="/mai" element={<Navigate to="/mai/news" replace />} />
            <Route path="/mai/:subtab" element={<MaiPage />} />
            <Route path="/mai-sub/:id" element={<MaiSubPage />} />
            <Route path="/mai-history" element={<Navigate to="/mai-history/recent" replace />} />
            <Route path="/mai-history/:tab" element={<MaiHistoryPage />} />
            <Route path="/mai-subscribe" element={<Navigate to="/mai-subscribe/channels" replace />} />
            <Route path="/mai-subscribe/:tab" element={<MaiSubscribePage />} />
            <Route path="/mai-notification" element={<MaiNotificationPage />} />
            <Route path="/mai-notification/order" element={<MaiNotificationOrderPage />} />
            <Route path="/mai-notification/settings" element={<MaiNotificationSettingsPage />} />
            <Route path="/mai-settings" element={<MaiSettingsPage />} />
            <Route path="/mai-settings/:id" element={<MaiSettingsDetailPage />} />
            <Route path="/news/:id" element={<NewsDetailPage />} />
            <Route path="/channel/:id" element={<ChannelViewPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/os-home" element={<OsHomePage />} />
          </Routes>
        </PushNotificationProvider>
      </PhoneFrame>
    </MaiPlayerProvider>
  );
}
