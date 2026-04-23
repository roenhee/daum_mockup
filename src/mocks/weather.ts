import type { Weather, Stock } from '@/types';

export const HOME_WEATHER: Weather = {
  region: '서울',
  tempC: 12,
  condition: 'sunny',
  airQuality: '보통',
  dustLevel: '좋음',
};

export const KOSPI_SUMMARY: Stock = {
  code: 'KOSPI',
  name: '코스피',
  price: 3481.8,
  change: 36.56,
  changeRate: 1.06,
};
