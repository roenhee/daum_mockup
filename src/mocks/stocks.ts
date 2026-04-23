import type { Stock } from '@/types';

export type StockRankTab = 'search' | 'rise' | 'fall' | 'foreign';

export const STOCK_RANK_TABS: { id: StockRankTab; label: string }[] = [
  { id: 'search', label: '검색비기준' },
  { id: 'rise', label: '상승율' },
  { id: 'fall', label: '하락율' },
  { id: 'foreign', label: '외인매수' },
];

export const STOCK_RANKING: Record<StockRankTab, Stock[]> = {
  search: [
    { code: '005930', name: '삼성전자', price: 218500, change: 4000, changeRate: 1.86 },
    { code: '000660', name: 'SK하이닉스', price: 1216000, change: 50000, changeRate: 4.28 },
    { code: '034020', name: '두산에너빌리티', price: 113500, change: 2500, changeRate: 2.25 },
    { code: '006400', name: '삼성SDI', price: 589000, change: 51000, changeRate: 9.47 },
    { code: '047040', name: '대우건설', price: 31850, change: 3750, changeRate: 13.34 },
  ],
  rise: [
    { code: '047040', name: '대우건설', price: 31850, change: 3750, changeRate: 13.34 },
    { code: '006400', name: '삼성SDI', price: 589000, change: 51000, changeRate: 9.47 },
    { code: '373220', name: 'LG에너지솔루션', price: 412500, change: 28500, changeRate: 7.42 },
    { code: '035420', name: 'NAVER', price: 195800, change: 11200, changeRate: 6.07 },
    { code: '000660', name: 'SK하이닉스', price: 1216000, change: 50000, changeRate: 4.28 },
  ],
  fall: [
    { code: '207940', name: '삼성바이오로직스', price: 912000, change: -38000, changeRate: -4.0 },
    { code: '068270', name: '셀트리온', price: 189500, change: -6700, changeRate: -3.41 },
    { code: '051910', name: 'LG화학', price: 284000, change: -8500, changeRate: -2.91 },
    { code: '105560', name: 'KB금융', price: 84200, change: -2100, changeRate: -2.43 },
    { code: '055550', name: '신한지주', price: 58900, change: -1200, changeRate: -2.0 },
  ],
  foreign: [
    { code: '005930', name: '삼성전자', price: 218500, change: 4000, changeRate: 1.86 },
    { code: '000660', name: 'SK하이닉스', price: 1216000, change: 50000, changeRate: 4.28 },
    { code: '035420', name: 'NAVER', price: 195800, change: 11200, changeRate: 6.07 },
    { code: '005380', name: '현대차', price: 251500, change: 3500, changeRate: 1.41 },
    { code: '051910', name: 'LG화학', price: 284000, change: -8500, changeRate: -2.91 },
  ],
};
