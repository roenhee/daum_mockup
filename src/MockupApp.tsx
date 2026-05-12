import { Routes, Route, Navigate } from 'react-router-dom';
import { CardScrollSpyEmbed } from '@/axiom/CardScrollSpyEmbed';
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

export function MockupApp() {
  return (
    <MaiPlayerProvider>
      <CardScrollSpyEmbed />
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
