'use client';

import { useState, useCallback, Suspense } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import {
  Search, SlidersHorizontal, Beer, Route, X, Loader2, MapPin,
} from 'lucide-react';
import BreweryCard from '@/components/BreweryCard';
import TrailBuilder from '@/components/TrailBuilder';
import type { Brewery, BreweryType, TrailStop } from '@/lib/types';

const BrewMap = dynamic(() => import('@/components/BrewMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-stone-100 rounded-xl">
      <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
    </div>
  ),
});

const BREWERY_TYPES: { value: BreweryType | ''; label: string }[] = [
  { value: '', label: 'All types' },
  { value: 'micro', label: 'Microbrewery' },
  { value: 'nano', label: 'Nano' },
  { value: 'brewpub', label: 'Brewpub' },
  { value: 'taproom', label: 'Taproom' },
  { value: 'regional', label: 'Regional' },
  { value: 'large', label: 'Large' },
  { value: 'bar', label: 'Bar' },
];

const POPULAR_CITIES = [
  'Austin', 'Denver', 'Portland', 'San Diego', 'Chicago', 'Seattle',
  'Asheville', 'Brooklyn', 'Nashville', 'Boulder',
];

export default function ExplorePage() {
  const [city, setCity] = useState('');
  const [typeFilter, setTypeFilter] = useState<BreweryType | ''>('');
  const [breweries, setBreweries] = useState<Brewery[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [trail, setTrail] = useState<TrailStop[]>([]);
  const [showTrail, setShowTrail] = useState(false);

  const trailIds = new Set(trail.map((s) => s.brewery.id));

  const search = useCallback(async (searchCity: string, type: BreweryType | '') => {
    if (!searchCity.trim()) return;
    setLoading(true);
    setError(null);
    setSearched(true);
    try {
      const params = new URLSearchParams({ city: searchCity });
      if (type) params.set('type', type);
      const res = await fetch(`/api/breweries?${params.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch breweries');
      const data: Brewery[] = await res.json();
      setBreweries(data);
    } catch (e) {
      setError('Could not load breweries. Please try again.');
      setBreweries([]);
    } finally {
      setLoading(false);
    }
  }, []);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    search(city, typeFilter);
  }

  function handleCityClick(c: string) {
    setCity(c);
    search(c, typeFilter);
  }

  function toggleTrail(brewery: Brewery) {
    setTrail((prev) => {
      if (prev.some((s) => s.brewery.id === brewery.id)) {
        return prev
          .filter((s) => s.brewery.id !== brewery.id)
          .map((s, i) => ({ ...s, order: i + 1 }));
      }
      return [...prev, { brewery, order: prev.length + 1 }];
    });
  }

  function removeFromTrail(id: string) {
    setTrail((prev) =>
      prev.filter((s) => s.brewery.id !== id).map((s, i) => ({ ...s, order: i + 1 }))
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      {/* Top bar */}
      <header className="bg-white border-b border-stone-100 px-4 md:px-6 py-3 sticky top-0 z-50">
        <div className="max-w-screen-2xl mx-auto flex items-center gap-4">
          <Link href="/" className="flex items-center gap-1.5 flex-shrink-0">
            <Beer className="w-6 h-6 text-amber-600" />
            <span className="font-bold text-lg text-stone-900 hidden sm:block">BrewTrail</span>
          </Link>

          <form onSubmit={handleSearch} className="flex-1 flex gap-2">
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Search a city — e.g. Austin, Denver, Portland…"
                className="w-full pl-9 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
              />
              {city && (
                <button
                  type="button"
                  onClick={() => { setCity(''); setBreweries([]); setSearched(false); }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="relative hidden sm:block">
              <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400 pointer-events-none" />
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value as BreweryType | '')}
                className="appearance-none pl-8 pr-8 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent cursor-pointer"
              >
                {BREWERY_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={!city.trim() || loading}
              className="bg-amber-600 hover:bg-amber-700 disabled:bg-amber-300 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors flex items-center gap-2"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Search'}
            </button>
          </form>

          <button
            onClick={() => setShowTrail(!showTrail)}
            className="relative flex items-center gap-2 text-sm font-semibold text-stone-700 hover:text-amber-700 bg-stone-100 hover:bg-amber-50 px-4 py-2.5 rounded-xl transition-colors flex-shrink-0"
          >
            <Route className="w-4 h-4" />
            <span className="hidden sm:block">My Trail</span>
            {trail.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-amber-600 text-white text-xs font-black w-5 h-5 rounded-full flex items-center justify-center">
                {trail.length}
              </span>
            )}
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden max-w-screen-2xl mx-auto w-full">
        {/* Left: list */}
        <aside className="w-full md:w-96 lg:w-[420px] flex-shrink-0 flex flex-col border-r border-stone-100 overflow-y-auto bg-white">
          {!searched && (
            <div className="p-5">
              <p className="text-sm font-semibold text-stone-500 mb-3 uppercase tracking-wider">
                Popular cities
              </p>
              <div className="flex flex-wrap gap-2">
                {POPULAR_CITIES.map((c) => (
                  <button
                    key={c}
                    onClick={() => handleCityClick(c)}
                    className="flex items-center gap-1.5 text-sm bg-stone-50 hover:bg-amber-50 hover:text-amber-700 text-stone-600 border border-stone-200 hover:border-amber-200 px-3 py-1.5 rounded-full transition-all"
                  >
                    <MapPin className="w-3 h-3" />
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {loading && (
            <div className="flex-1 flex items-center justify-center py-20">
              <div className="text-center">
                <Loader2 className="w-10 h-10 text-amber-500 animate-spin mx-auto mb-3" />
                <p className="text-stone-400 text-sm">Finding breweries in {city}…</p>
              </div>
            </div>
          )}

          {error && !loading && (
            <div className="m-5 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl p-4">
              {error}
            </div>
          )}

          {!loading && searched && !error && (
            <div className="px-4 pt-4 pb-2 flex items-center justify-between">
              <p className="text-sm text-stone-500">
                <span className="font-bold text-stone-800">{breweries.length}</span> breweries
                {breweries.length > 0 ? ` in ${city}` : ` found in ${city}`}
              </p>
              {breweries.length > 0 && typeFilter && (
                <span className="text-xs bg-amber-100 text-amber-700 font-medium px-2 py-1 rounded-full">
                  {typeFilter}
                </span>
              )}
            </div>
          )}

          {!loading && breweries.length > 0 && (
            <div className="p-4 space-y-3">
              {breweries.map((b) => (
                <BreweryCard
                  key={b.id}
                  brewery={b}
                  isInTrail={trailIds.has(b.id)}
                  onToggleTrail={toggleTrail}
                  onSelect={(brewery) => setSelectedId(brewery.id === selectedId ? null : brewery.id)}
                />
              ))}
            </div>
          )}

          {!loading && searched && breweries.length === 0 && !error && (
            <div className="flex-1 flex flex-col items-center justify-center py-20 px-6 text-center">
              <div className="text-5xl mb-4">🍺</div>
              <h3 className="font-bold text-stone-700 mb-2">No breweries found</h3>
              <p className="text-sm text-stone-400">
                Try a different city or remove the type filter.
              </p>
            </div>
          )}
        </aside>

        {/* Center: map */}
        <main className="hidden md:flex flex-1 flex-col p-4 relative">
          <div className="flex-1 rounded-2xl overflow-hidden shadow-sm border border-stone-100">
            <BrewMap
              breweries={breweries}
              selectedId={selectedId}
              trailIds={trailIds}
              onSelect={(b) => setSelectedId(b.id === selectedId ? null : b.id)}
            />
          </div>

          {/* Attribution note */}
          {breweries.length === 0 && !searched && (
            <div className="absolute inset-0 m-4 flex items-center justify-center pointer-events-none">
              <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-10 shadow-sm border border-stone-100">
                <div className="text-6xl mb-4">🗺️</div>
                <h2 className="text-xl font-bold text-stone-700 mb-2">Search a city to explore</h2>
                <p className="text-stone-400 text-sm">
                  8,000+ breweries mapped across the US and beyond
                </p>
              </div>
            </div>
          )}
        </main>

        {/* Right: trail panel (slide in) */}
        {showTrail && (
          <aside className="w-80 flex-shrink-0 border-l border-stone-100 bg-white p-4 overflow-y-auto">
            <TrailBuilder
              stops={trail}
              onRemove={removeFromTrail}
              onReorder={setTrail}
            />
          </aside>
        )}
      </div>
    </div>
  );
}
