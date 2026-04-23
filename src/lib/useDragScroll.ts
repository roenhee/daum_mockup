import { useRef, useState, type PointerEvent, type MouseEvent } from 'react';

export function useDragScroll<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const state = useRef({ active: false, startX: 0, startScroll: 0, moved: false });
  const [isDragging, setIsDragging] = useState(false);

  const onPointerDown = (e: PointerEvent<T>) => {
    if (e.pointerType !== 'mouse') return;
    state.current = {
      active: true,
      startX: e.clientX,
      startScroll: ref.current?.scrollLeft ?? 0,
      moved: false,
    };
    setIsDragging(true);
  };

  const onPointerMove = (e: PointerEvent<T>) => {
    if (!state.current.active || !ref.current) return;
    const dx = e.clientX - state.current.startX;
    if (Math.abs(dx) > 3) {
      state.current.moved = true;
      ref.current.scrollLeft = state.current.startScroll - dx;
    }
  };

  const endDrag = () => {
    if (!state.current.active) return;
    state.current.active = false;
    setIsDragging(false);
  };

  const onClickCapture = (e: MouseEvent) => {
    if (state.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      state.current.moved = false;
    }
  };

  return {
    ref,
    isDragging,
    handlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp: endDrag,
      onPointerLeave: endDrag,
      onPointerCancel: endDrag,
      onClickCapture,
    },
  };
}
