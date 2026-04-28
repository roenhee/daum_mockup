import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PhoneFrame } from '@/components/layout/PhoneFrame';
import { MaiPlayerProvider } from '@/components/mai/news/MaiPlayer';
import { HomePage } from '@/pages/HomePage';
import { ContentsPage } from '@/pages/ContentsPage';
import { CommunityPage } from '@/pages/CommunityPage';
import { ShoppingPage } from '@/pages/ShoppingPage';
import { MaiPage } from '@/pages/MaiPage';
import { MaiSubPage } from '@/pages/MaiSubPage';
import { NewsDetailPage } from '@/pages/NewsDetailPage';
import { ChannelViewPage } from '@/pages/ChannelViewPage';
import { SearchPage } from '@/pages/SearchPage';

export default function App() {
  return (
    <HashRouter>
      <MaiPlayerProvider>
        <PhoneFrame>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/contents" element={<Navigate to="/contents/news" replace />} />
            <Route path="/contents/:subtab" element={<ContentsPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/shopping" element={<ShoppingPage />} />
            <Route path="/mai" element={<Navigate to="/mai/news" replace />} />
            <Route path="/mai/:subtab" element={<MaiPage />} />
            <Route path="/mai-sub/:id" element={<MaiSubPage />} />
            <Route path="/news/:id" element={<NewsDetailPage />} />
            <Route path="/channel/:id" element={<ChannelViewPage />} />
            <Route path="/search" element={<SearchPage />} />
          </Routes>
        </PhoneFrame>
      </MaiPlayerProvider>
    </HashRouter>
  );
}
