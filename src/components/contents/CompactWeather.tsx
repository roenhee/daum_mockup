import { Sun, MapPin } from 'lucide-react';
import type { Weather } from '@/types';

interface CompactWeatherProps {
  weather: Weather;
}

export function CompactWeather({ weather }: CompactWeatherProps) {
  return (
    <section className="bg-white">
      <div className="mx-4 my-2 rounded-lg bg-amber-50 px-3 py-2.5 flex items-center gap-2 text-[13px]">
        <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-amber-400 text-white shrink-0">
          <Sun size={16} />
        </span>
        <span className="font-semibold text-gray-900">{weather.region}</span>
        <span className="text-gray-900 font-bold">{weather.tempC}°</span>
        <span className="text-gray-500">맑음</span>
        <span className="text-gray-300">·</span>
        <span className="text-gray-500 truncate">미세 {weather.dustLevel}</span>
        <button
          type="button"
          className="ml-auto shrink-0 inline-flex items-center gap-1 h-7 px-2.5 rounded-full border border-amber-200 bg-white text-[11px] font-medium text-gray-700"
        >
          <MapPin size={12} className="text-amber-500" />
          현위치
        </button>
      </div>
    </section>
  );
}
