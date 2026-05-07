// 프로젝트 컨셉 설명 deck — 사이드 메뉴 / OS 홈 화면의 deck 아이콘이 공유한다.
// 추후 실제 deck URL로 교체.
export const DECK_URL = '#';

export function openDeck() {
  if (DECK_URL && DECK_URL !== '#') {
    window.open(DECK_URL, '_blank', 'noopener,noreferrer');
  }
}
