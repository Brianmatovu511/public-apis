import { NextRequest, NextResponse } from 'next/server';
import { searchBreweries } from '@/lib/brewery-api';
import type { BreweryType } from '@/lib/types';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const city = searchParams.get('city') ?? '';
  const type = (searchParams.get('type') as BreweryType) || undefined;
  const page = parseInt(searchParams.get('page') ?? '1', 10);

  if (!city) {
    return NextResponse.json({ error: 'city is required' }, { status: 400 });
  }

  try {
    const breweries = await searchBreweries({ city, type, perPage: 50, page });
    return NextResponse.json(breweries, {
      headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' },
    });
  } catch (err) {
    console.error('[/api/breweries]', err);
    return NextResponse.json({ error: 'Failed to fetch breweries' }, { status: 502 });
  }
}
