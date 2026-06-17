'use client';

import { MapPin, Phone, Globe, Plus, Check, Beer } from 'lucide-react';
import type { Brewery } from '@/lib/types';

const TYPE_LABELS: Record<string, string> = {
  micro: 'Microbrewery',
  nano: 'Nano',
  regional: 'Regional',
  brewpub: 'Brewpub',
  large: 'Large',
  planning: 'Coming Soon',
  bar: 'Bar',
  contract: 'Contract',
  proprietor: 'Proprietor',
  taproom: 'Taproom',
  closed: 'Closed',
};

const TYPE_COLORS: Record<string, string> = {
  micro: 'bg-amber-100 text-amber-800',
  nano: 'bg-orange-100 text-orange-800',
  regional: 'bg-blue-100 text-blue-800',
  brewpub: 'bg-purple-100 text-purple-800',
  large: 'bg-red-100 text-red-800',
  taproom: 'bg-green-100 text-green-800',
  bar: 'bg-gray-100 text-gray-700',
  default: 'bg-stone-100 text-stone-600',
};

interface Props {
  brewery: Brewery;
  isInTrail: boolean;
  onToggleTrail: (brewery: Brewery) => void;
  onSelect: (brewery: Brewery) => void;
}

export default function BreweryCard({ brewery, isInTrail, onToggleTrail, onSelect }: Props) {
  const colorClass =
    TYPE_COLORS[brewery.brewery_type] ?? TYPE_COLORS.default;
  const typeLabel = TYPE_LABELS[brewery.brewery_type] ?? brewery.brewery_type;

  const address = [brewery.address_1, brewery.city, brewery.state_province]
    .filter(Boolean)
    .join(', ');

  return (
    <div
      className="bg-white rounded-2xl border border-stone-100 shadow-sm hover:shadow-md transition-all p-5 cursor-pointer group"
      onClick={() => onSelect(brewery)}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${colorClass}`}>
              {typeLabel}
            </span>
          </div>
          <h3 className="font-bold text-stone-900 text-base leading-tight truncate group-hover:text-amber-700 transition-colors">
            {brewery.name}
          </h3>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleTrail(brewery);
          }}
          title={isInTrail ? 'Remove from trail' : 'Add to trail'}
          className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all ${
            isInTrail
              ? 'bg-amber-600 text-white shadow-md'
              : 'bg-stone-100 text-stone-400 hover:bg-amber-50 hover:text-amber-600'
          }`}
        >
          {isInTrail ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </button>
      </div>

      {address && (
        <div className="flex items-start gap-1.5 text-xs text-stone-500 mb-3">
          <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-stone-400" />
          <span className="truncate">{address}</span>
        </div>
      )}

      <div className="flex items-center gap-4 mt-3 pt-3 border-t border-stone-50">
        {brewery.phone && (
          <a
            href={`tel:${brewery.phone}`}
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1 text-xs text-stone-500 hover:text-amber-600 transition-colors"
          >
            <Phone className="w-3 h-3" />
            {brewery.phone}
          </a>
        )}
        {brewery.website_url && (
          <a
            href={brewery.website_url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1 text-xs text-amber-600 hover:text-amber-700 font-medium transition-colors ml-auto"
          >
            <Globe className="w-3 h-3" />
            Website
          </a>
        )}
        {!brewery.phone && !brewery.website_url && (
          <span className="flex items-center gap-1 text-xs text-stone-300">
            <Beer className="w-3 h-3" />
            No contact info
          </span>
        )}
      </div>
    </div>
  );
}
