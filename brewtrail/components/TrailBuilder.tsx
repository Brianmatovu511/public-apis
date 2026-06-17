'use client';

import { useState } from 'react';
import { GripVertical, X, Route, Share2, Download, Beer } from 'lucide-react';
import type { Brewery, TrailStop } from '@/lib/types';

interface Props {
  stops: TrailStop[];
  onRemove: (breweryId: string) => void;
  onReorder: (stops: TrailStop[]) => void;
}

export default function TrailBuilder({ stops, onRemove, onReorder }: Props) {
  const [dragging, setDragging] = useState<number | null>(null);

  function handleDragStart(idx: number) {
    setDragging(idx);
  }

  function handleDragOver(e: React.DragEvent, idx: number) {
    e.preventDefault();
    if (dragging === null || dragging === idx) return;
    const updated = [...stops];
    const [moved] = updated.splice(dragging, 1);
    updated.splice(idx, 0, moved);
    const reordered = updated.map((s, i) => ({ ...s, order: i + 1 }));
    onReorder(reordered);
    setDragging(idx);
  }

  function handleDragEnd() {
    setDragging(null);
  }

  function generateShareText() {
    const names = stops.map((s) => s.brewery.name).join(' → ');
    return `🍺 My BrewTrail: ${names}`;
  }

  async function handleShare() {
    const text = generateShareText();
    if (navigator.share) {
      await navigator.share({ title: 'My BrewTrail', text });
    } else {
      await navigator.clipboard.writeText(text);
      alert('Trail copied to clipboard!');
    }
  }

  function handleExport() {
    const lines = stops.map(
      (s) =>
        `${s.order}. ${s.brewery.name} — ${[s.brewery.address_1, s.brewery.city].filter(Boolean).join(', ')}`
    );
    const content = `My BrewTrail\n${'='.repeat(40)}\n${lines.join('\n')}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'my-brewtrail.txt';
    a.click();
    URL.revokeObjectURL(url);
  }

  if (stops.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mb-4">
          <Route className="w-8 h-8 text-amber-400" />
        </div>
        <h3 className="font-semibold text-stone-700 mb-1">Your trail is empty</h3>
        <p className="text-sm text-stone-400 max-w-48">
          Click the <span className="font-semibold">+</span> on any brewery card to add it here
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Route className="w-4 h-4 text-amber-600" />
          <span className="font-bold text-stone-800">Your Trail</span>
          <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-0.5 rounded-full">
            {stops.length} stop{stops.length !== 1 ? 's' : ''}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-amber-700 bg-stone-100 hover:bg-amber-50 px-3 py-1.5 rounded-full transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            Share
          </button>
          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-amber-700 bg-stone-100 hover:bg-amber-50 px-3 py-1.5 rounded-full transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            Export
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {stops.map((stop, idx) => (
          <div
            key={stop.brewery.id}
            draggable
            onDragStart={() => handleDragStart(idx)}
            onDragOver={(e) => handleDragOver(e, idx)}
            onDragEnd={handleDragEnd}
            className={`flex items-center gap-3 bg-white rounded-xl border p-3 transition-all cursor-grab active:cursor-grabbing ${
              dragging === idx ? 'border-amber-300 shadow-md opacity-70' : 'border-stone-100 hover:border-stone-200'
            }`}
          >
            <GripVertical className="w-4 h-4 text-stone-300 flex-shrink-0 drag-handle" />
            <div className="w-7 h-7 bg-amber-600 text-white rounded-full flex items-center justify-center text-xs font-black flex-shrink-0">
              {stop.order}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-stone-800 text-sm truncate">{stop.brewery.name}</div>
              <div className="text-xs text-stone-400 truncate">
                {[stop.brewery.city, stop.brewery.state_province].filter(Boolean).join(', ')}
              </div>
            </div>
            <button
              onClick={() => onRemove(stop.brewery.id)}
              className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full text-stone-300 hover:text-red-500 hover:bg-red-50 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {stops.length >= 2 && (
        <a
          href={`https://www.google.com/maps/dir/${stops
            .map((s) => encodeURIComponent(`${s.brewery.name}, ${s.brewery.city}`))
            .join('/')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm py-3 rounded-xl transition-colors"
        >
          <Beer className="w-4 h-4" />
          Open Route in Google Maps
        </a>
      )}
    </div>
  );
}
