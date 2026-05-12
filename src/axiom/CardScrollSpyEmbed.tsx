import { useEffect } from 'react';

/**
 * iframe 안쪽(mockup) 에서만 동작.
 * - `[data-card-kind]` 요소를 스크롤 감시 → viewport 중심에 가장 가까운 카드 kind 를
 *   부모에 `axiom:card-visible` 로 송신.
 * - 부모로부터 `axiom:scroll-to-card` 수신 시 해당 kind 첫 요소를 scrollIntoView + 강조.
 *
 * 부모(axiom shell) 가 아닐 때 (window.parent === window) 는 no-op.
 */
export function CardScrollSpyEmbed() {
  useEffect(() => {
    if (typeof window === 'undefined' || window.parent === window) return;

    let lastSent: string | null = null;
    let scrollContainer: Element | null = null;
    let rafId: number | null = null;

    function findClosestCardKind(): string | null {
      const container = scrollContainer;
      if (!container) return null;
      const r = container.getBoundingClientRect();
      const centerY = r.top + r.height / 2;
      const cards = Array.from(document.querySelectorAll<HTMLElement>('[data-card-kind]'));
      let bestKind: string | null = null;
      let bestDist = Number.POSITIVE_INFINITY;
      for (const c of cards) {
        const kind = c.getAttribute('data-card-kind');
        if (!kind) continue;
        const cr = c.getBoundingClientRect();
        const cardCenter = cr.top + cr.height / 2;
        const dist = Math.abs(cardCenter - centerY);
        if (dist < bestDist) {
          bestDist = dist;
          bestKind = kind;
        }
      }
      return bestKind;
    }

    function handleScroll() {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        const kind = findClosestCardKind();
        if (kind && kind !== lastSent) {
          lastSent = kind;
          window.parent.postMessage({ type: 'axiom:card-visible', kind }, '*');
        }
      });
    }

    function onMessage(e: MessageEvent) {
      const data = e.data;
      if (!data || data.type !== 'axiom:scroll-to-card' || typeof data.kind !== 'string') return;
      const target = document.querySelector<HTMLElement>(
        `[data-card-kind="${CSS.escape(data.kind)}"]`,
      );
      if (!target) return;
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      target.classList.add('axiom-card-flash');
      window.setTimeout(() => target.classList.remove('axiom-card-flash'), 1500);
    }

    // 스크롤 컨테이너 부착 (AppShell이 마운트되기 전일 수 있어 폴링)
    let attachTries = 0;
    const attach = () => {
      scrollContainer = document.querySelector('main');
      if (!scrollContainer && attachTries < 20) {
        attachTries++;
        window.setTimeout(attach, 100);
        return;
      }
      if (scrollContainer) {
        scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
      }
    };
    attach();
    window.addEventListener('message', onMessage);

    return () => {
      if (scrollContainer) scrollContainer.removeEventListener('scroll', handleScroll);
      window.removeEventListener('message', onMessage);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return null;
}
