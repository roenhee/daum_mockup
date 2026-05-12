import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AxiomShell } from '@/axiom/AxiomShell';
import { MockupApp } from '@/MockupApp';
import { DeckViewerPage } from '@/pages/DeckViewerPage';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        {/* Deck 뷰는 사용자 해상도 풀스크린으로 노출 — 폰 프레임 우회 */}
        <Route path="/deck" element={<DeckViewerPage />} />
        {/* axiom — 살아있는 기획서 뷰어. 자체 레이아웃, PhoneFrame 우회 */}
        <Route path="/axiom" element={<Navigate to="/axiom/mai" replace />} />
        <Route path="/axiom/:projectId" element={<AxiomShell />} />
        <Route path="/*" element={<MockupApp />} />
      </Routes>
    </HashRouter>
  );
}
