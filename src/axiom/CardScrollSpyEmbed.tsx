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

    /**
     * 뷰포트 중앙 라인이 어떤 카드의 영역 안에 들어와 있는지 찾는다.
     * - 어떤 카드의 top..bottom 사이에 중앙 라인이 있으면 그 카드가 정답.
     * - 카드 사이의 비-카드 영역(프로필/게이트웨이 등)에 중앙이 있으면 null.
     */
    function findCentralCardKind(): string | null {
      const container = scrollContainer;
      if (!container) return null;
      const r = container.getBoundingClientRect();
      const centerY = r.top + r.height / 2;
      const cards = Array.from(document.querySelectorAll<HTMLElement>('[data-card-kind]'));
      for (const c of cards) {
        const kind = c.getAttribute('data-card-kind');
        if (!kind) continue;
        const cr = c.getBoundingClientRect();
        if (cr.top <= centerY && cr.bottom >= centerY) return kind;
      }
      return null;
    }

    function handleScroll() {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        const result = findCentralCardKind();
        // 중앙에 있는 카드가 없으면 null 송신 (우측 doc 비우기)
        const next = result;
        if (next !== lastSent) {
          lastSent = next;
          window.parent.postMessage({ type: 'axiom:card-visible', kind: next }, '*');
        }
      });
    }

    function flashScroll(kind: string): boolean {
      const target = document.querySelector<HTMLElement>(
        `[data-card-kind="${CSS.escape(kind)}"]`,
      );
      if (!target) return false;
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      target.classList.add('axiom-card-flash');
      window.setTimeout(() => target.classList.remove('axiom-card-flash'), 1500);
      return true;
    }

    function pollScroll(kind: string, attempts = 0) {
      if (flashScroll(kind)) return;
      if (attempts < 20) {
        window.setTimeout(() => pollScroll(kind, attempts + 1), 80);
      }
    }

    function onMessage(e: MessageEvent) {
      const data = e.data;
      if (!data || typeof data.kind !== 'string') return;
      // 단순 스크롤만
      if (data.type === 'axiom:scroll-to-card') {
        flashScroll(data.kind);
        return;
      }
      // 다른 라우트에 있는 카드로 가는 경우: 먼저 라우트 변경 후 폴링.
      if (data.type === 'axiom:goto-card') {
        const wantedHash = typeof data.route === 'string' ? `#${data.route}` : '';
        if (wantedHash && window.location.hash !== wantedHash) {
          window.location.hash = data.route;
          // React Router 가 새 페이지 마운트할 시간을 주고 폴링
          window.requestAnimationFrame(() => pollScroll(data.kind, 0));
        } else {
          flashScroll(data.kind);
        }
      }
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
    // 라우트 전환 (탭 이동 등) 시 scroll 이벤트 없이도 카드 구성이 바뀌므로 보조 폴링
    const detectInterval = window.setInterval(() => {
      // scrollContainer 가 새로 마운트된 경우 재부착
      const current = document.querySelector('main');
      if (current && current !== scrollContainer) {
        if (scrollContainer) scrollContainer.removeEventListener('scroll', handleScroll);
        scrollContainer = current;
        scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
      }
      handleScroll();
    }, 500);

    return () => {
      if (scrollContainer) scrollContainer.removeEventListener('scroll', handleScroll);
      window.removeEventListener('message', onMessage);
      window.clearInterval(detectInterval);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return null;
}
