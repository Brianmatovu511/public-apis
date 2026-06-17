'use client';

import { useEffect, useRef } from 'react';
import type { Brewery } from '@/lib/types';

interface Props {
  breweries: Brewery[];
  selectedId: string | null;
  trailIds: Set<string>;
  onSelect: (brewery: Brewery) => void;
}

export default function BrewMap({ breweries, selectedId, trailIds, onSelect }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<unknown>(null);
  const markersRef = useRef<Map<string, unknown>>(new Map());

  const brewsWithCoords = breweries.filter(
    (b) => b.latitude && b.longitude && !isNaN(parseFloat(b.latitude)) && !isNaN(parseFloat(b.longitude))
  );

  useEffect(() => {
    if (typeof window === 'undefined' || !mapRef.current || leafletMapRef.current) return;

    // Dynamically import Leaflet to avoid SSR issues
    import('leaflet').then((L) => {
      // Fix default icon paths
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      if (!mapRef.current) return;

      const map = L.map(mapRef.current, { zoomControl: true }).setView([39.5, -98.35], 4);
      leafletMapRef.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18,
      }).addTo(map);

      brewsWithCoords.forEach((b) => {
        const lat = parseFloat(b.latitude!);
        const lng = parseFloat(b.longitude!);

        const isInTrail = trailIds.has(b.id);
        const isSelected = b.id === selectedId;

        const icon = L.divIcon({
          className: '',
          html: `<div style="
            width: ${isSelected ? '36px' : isInTrail ? '30px' : '24px'};
            height: ${isSelected ? '36px' : isInTrail ? '30px' : '24px'};
            background: ${isSelected ? '#d97706' : isInTrail ? '#f59e0b' : '#78716c'};
            border: 3px solid ${isSelected ? '#92400e' : isInTrail ? '#d97706' : '#a8a29e'};
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: ${isSelected ? '16px' : '12px'};
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            transition: all 0.2s;
          ">🍺</div>`,
          iconSize: [isSelected ? 36 : isInTrail ? 30 : 24, isSelected ? 36 : isInTrail ? 30 : 24],
          iconAnchor: [isSelected ? 18 : isInTrail ? 15 : 12, isSelected ? 18 : isInTrail ? 15 : 12],
        });

        const marker = L.marker([lat, lng], { icon })
          .addTo(map)
          .bindPopup(
            `<div style="font-family:Inter,sans-serif;min-width:160px">
              <strong style="font-size:14px;color:#1c1917">${b.name}</strong>
              <br/><span style="font-size:12px;color:#78716c">${b.brewery_type} · ${b.city}</span>
              ${b.website_url ? `<br/><a href="${b.website_url}" target="_blank" style="font-size:12px;color:#d97706">Visit website →</a>` : ''}
            </div>`
          )
          .on('click', () => onSelect(b));

        markersRef.current.set(b.id, marker);
      });

      if (brewsWithCoords.length > 0) {
        const bounds = L.latLngBounds(
          brewsWithCoords.map((b) => [parseFloat(b.latitude!), parseFloat(b.longitude!)])
        );
        map.fitBounds(bounds, { padding: [40, 40] });
      }
    });

    return () => {
      if (leafletMapRef.current) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (leafletMapRef.current as any).remove();
        leafletMapRef.current = null;
        markersRef.current.clear();
      }
    };
    // intentionally only on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Pan to selected brewery
  useEffect(() => {
    if (!leafletMapRef.current || !selectedId) return;
    const brewery = breweries.find((b) => b.id === selectedId);
    if (brewery?.latitude && brewery?.longitude) {
      import('leaflet').then((L) => {
        const map = leafletMapRef.current as InstanceType<typeof L.Map>;
        map.flyTo([parseFloat(brewery.latitude!), parseFloat(brewery.longitude!)], 14, {
          animate: true,
          duration: 1,
        });
        const marker = markersRef.current.get(selectedId) as L.Marker | undefined;
        marker?.openPopup();
      });
    }
  }, [selectedId, breweries]);

  if (brewsWithCoords.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-stone-100 rounded-xl">
        <div className="text-center text-stone-400">
          <div className="text-4xl mb-2">🗺️</div>
          <div className="text-sm">No mappable breweries found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <div ref={mapRef} className="w-full h-full rounded-xl" />
      <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5 text-xs text-stone-600 shadow-sm border border-stone-100 z-[999]">
        {brewsWithCoords.length} brewery{brewsWithCoords.length !== 1 ? 'ies' : ''} on map
      </div>
    </div>
  );
}
