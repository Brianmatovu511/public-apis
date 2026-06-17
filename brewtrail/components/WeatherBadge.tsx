'use client';

import { Thermometer, Wind, Droplets } from 'lucide-react';
import { weatherEmoji } from '@/lib/weather-api';
import type { Weather } from '@/lib/types';

interface Props {
  weather: Weather;
  compact?: boolean;
}

export default function WeatherBadge({ weather, compact = false }: Props) {
  const emoji = weatherEmoji(weather.weatherCode);

  if (compact) {
    return (
      <div
        className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${
          weather.isGoodForVisit
            ? 'bg-green-50 text-green-700 border border-green-200'
            : 'bg-orange-50 text-orange-700 border border-orange-200'
        }`}
      >
        <span>{emoji}</span>
        <span>{weather.temperature}°C</span>
        <span className="text-xs opacity-60">·</span>
        <span>{weather.description}</span>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-2xl p-4 border border-blue-100">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{emoji}</span>
          <div>
            <div className="font-bold text-stone-800 text-sm">{weather.description}</div>
            <div
              className={`text-xs font-medium ${
                weather.isGoodForVisit ? 'text-green-600' : 'text-orange-500'
              }`}
            >
              {weather.isGoodForVisit ? '✓ Great day to visit' : '⚠ Check conditions'}
            </div>
          </div>
        </div>
        <div className="text-3xl font-black text-stone-800">{weather.temperature}°</div>
      </div>
      <div className="grid grid-cols-3 gap-2 text-xs text-stone-500">
        <div className="flex flex-col items-center bg-white/70 rounded-xl p-2">
          <Thermometer className="w-3.5 h-3.5 mb-1 text-red-400" />
          <span className="font-semibold text-stone-700">{weather.temperature}°C</span>
          <span>Temp</span>
        </div>
        <div className="flex flex-col items-center bg-white/70 rounded-xl p-2">
          <Wind className="w-3.5 h-3.5 mb-1 text-blue-400" />
          <span className="font-semibold text-stone-700">{weather.windspeed} km/h</span>
          <span>Wind</span>
        </div>
        <div className="flex flex-col items-center bg-white/70 rounded-xl p-2">
          <Droplets className="w-3.5 h-3.5 mb-1 text-teal-400" />
          <span className="font-semibold text-stone-700">{weather.humidity}%</span>
          <span>Humidity</span>
        </div>
      </div>
    </div>
  );
}
