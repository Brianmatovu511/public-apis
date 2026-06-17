import type { Brewery, SearchParams } from './types';

const BASE_URL = 'https://api.openbrewerydb.org/v1';

export async function searchBreweries(params: SearchParams): Promise<Brewery[]> {
  const query = new URLSearchParams();
  if (params.city) query.set('by_city', params.city.replace(/\s+/g, '_'));
  if (params.state) query.set('by_state', params.state);
  if (params.type) query.set('by_type', params.type);
  query.set('per_page', String(params.perPage ?? 20));
  query.set('page', String(params.page ?? 1));

  const res = await fetch(`${BASE_URL}/breweries?${query.toString()}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`Brewery API error: ${res.status}`);
  return res.json();
}

export async function getBrewery(id: string): Promise<Brewery> {
  const res = await fetch(`${BASE_URL}/breweries/${id}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`Brewery API error: ${res.status}`);
  return res.json();
}

export async function getRandomBreweries(count = 10): Promise<Brewery[]> {
  const res = await fetch(`${BASE_URL}/breweries/random?size=${count}`, {
    next: { revalidate: 600 },
  });
  if (!res.ok) throw new Error(`Brewery API error: ${res.status}`);
  return res.json();
}

export async function searchBreweriesByName(query: string): Promise<Brewery[]> {
  const res = await fetch(
    `${BASE_URL}/breweries?by_name=${encodeURIComponent(query)}&per_page=10`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error(`Brewery API error: ${res.status}`);
  return res.json();
}

export async function getBreweryCount(params?: Partial<SearchParams>): Promise<number> {
  const query = new URLSearchParams();
  if (params?.city) query.set('by_city', params.city);
  if (params?.state) query.set('by_state', params.state);
  const res = await fetch(`${BASE_URL}/breweries/meta?${query.toString()}`);
  if (!res.ok) return 0;
  const data: { total: string } = await res.json();
  return parseInt(data.total, 10);
}
