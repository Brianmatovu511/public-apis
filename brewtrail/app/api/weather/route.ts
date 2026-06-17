import { NextRequest, NextResponse } from 'next/server';
import { getWeatherForCoords } from '@/lib/weather-api';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const lat = parseFloat(searchParams.get('lat') ?? '');
  const lon = parseFloat(searchParams.get('lon') ?? '');

  if (isNaN(lat) || isNaN(lon)) {
    return NextResponse.json({ error: 'lat and lon are required' }, { status: 400 });
  }

  try {
    const weather = await getWeatherForCoords(lat, lon);
    return NextResponse.json(weather, {
      headers: { 'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600' },
    });
  } catch (err) {
    console.error('[/api/weather]', err);
    return NextResponse.json({ error: 'Failed to fetch weather' }, { status: 502 });
  }
}
