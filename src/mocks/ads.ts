export interface AdSlot {
  id: string;
  title: string;
  advertiser: string;
  imageUrl: string;
  variant: 'banner' | 'card';
}

export const HOME_ADS: AdSlot[] = [
  {
    id: 'ad-avocado',
    title: '지금 아보카도 1+1 특가',
    advertiser: '이마트',
    imageUrl: 'https://picsum.photos/seed/ad-avocado/800/400',
    variant: 'banner',
  },
  {
    id: 'ad-maple',
    title: '메이플 키우기 m  |  지금 플레이',
    advertiser: 'NEXON Company',
    imageUrl: 'https://picsum.photos/seed/ad-maple/800/400',
    variant: 'banner',
  },
  {
    id: 'ad-oliveyoung',
    title: '뷰티 특가 쿠폰 15% 추가 할인',
    advertiser: '올리브영',
    imageUrl: 'https://picsum.photos/seed/ad-oliveyoung/800/400',
    variant: 'banner',
  },
];
