import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// axiom shell 의 iframe 안에서 로딩되는 경우 콘텐츠가 폰 폭(390px)을 온전히 쓰도록
// scrollbar-gutter / scrollbar 를 끈다. 첫 페인트 전에 적용해야 layout shift 가 없다.
if (typeof window !== 'undefined' && window.parent !== window) {
  document.documentElement.classList.add('axiom-embed');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
