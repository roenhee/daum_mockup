import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PhoneFrame } from '@/components/layout/PhoneFrame';
import { HomePage } from '@/pages/HomePage';
import { ContentsPage } from '@/pages/ContentsPage';
import { CommunityPage } from '@/pages/CommunityPage';
import { ShoppingPage } from '@/pages/ShoppingPage';
import { LoopPage } from '@/pages/LoopPage';
import { NewsDetailPage } from '@/pages/NewsDetailPage';
import { ChannelViewPage } from '@/pages/ChannelViewPage';
import { SearchPage } from '@/pages/SearchPage';

export default function App() {
  return (
    <HashRouter>
      <PhoneFrame>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contents" element={<Navigate to="/contents/news" replace />} />
          <Route path="/contents/:subtab" element={<ContentsPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/shopping" element={<ShoppingPage />} />
          <Route path="/loop" element={<LoopPage />} />
          <Route path="/news/:id" element={<NewsDetailPage />} />
          <Route path="/channel/:id" element={<ChannelViewPage />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </PhoneFrame>
    </HashRouter>
  );
}
