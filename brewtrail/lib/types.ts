export interface Brewery {
  id: string;
  name: string;
  brewery_type: BreweryType;
  address_1: string | null;
  address_2: string | null;
  address_3: string | null;
  city: string;
  state_province: string;
  postal_code: string;
  country: string;
  longitude: string | null;
  latitude: string | null;
  phone: string | null;
  website_url: string | null;
  state: string | null;
  street: string | null;
}

export type BreweryType =
  | 'micro'
  | 'nano'
  | 'regional'
  | 'brewpub'
  | 'large'
  | 'planning'
  | 'bar'
  | 'contract'
  | 'proprietor'
  | 'taproom'
  | 'closed';

export interface Weather {
  temperature: number;
  weatherCode: number;
  windspeed: number;
  humidity: number;
  description: string;
  isGoodForVisit: boolean;
}

export interface TrailStop {
  brewery: Brewery;
  order: number;
  notes?: string;
}

export interface Trail {
  id: string;
  name: string;
  city: string;
  stops: TrailStop[];
  createdAt: Date;
}

export interface SearchParams {
  city?: string;
  state?: string;
  type?: BreweryType;
  perPage?: number;
  page?: number;
}
