import Link from 'next/link';
import { MapPin, Cloud, Route, Star, TrendingUp, Users, Beer } from 'lucide-react';

const STATS = [
  { value: '8,000+', label: 'Breweries mapped' },
  { value: '50+', label: 'States & countries' },
  { value: 'Free', label: 'No account needed' },
  { value: 'Live', label: 'Real-time weather' },
];

const FEATURES = [
  {
    icon: MapPin,
    title: 'Discover Nearby Breweries',
    description:
      'Search 8,000+ craft breweries by city, state, or type. From nano brewpubs to regional giants — find them all on one map.',
  },
  {
    icon: Cloud,
    title: 'Live Weather Check',
    description:
      'See real-time conditions at every brewery location. We'll tell you if today is a great patio day or a cozy taproom day.',
  },
  {
    icon: Route,
    title: 'Build Your Trail',
    description:
      'Drag and drop breweries into your perfect route. BrewTrail calculates stops and helps you plan the ideal crawl.',
  },
  {
    icon: Star,
    title: 'Curated Collections',
    description:
      'Explore editor-picked trails: "Best of Austin", "Denver Mile High Hop Tour", "Brooklyn Craft Crawl" — new trails weekly.',
  },
];

const BREWERY_TYPES = [
  { type: 'micro', emoji: '🍺', label: 'Microbrewery' },
  { type: 'brewpub', emoji: '🍻', label: 'Brewpub' },
  { type: 'taproom', emoji: '🏠', label: 'Taproom' },
  { type: 'nano', emoji: '🔬', label: 'Nano Brewery' },
  { type: 'regional', emoji: '🏭', label: 'Regional' },
  { type: 'large', emoji: '⚡', label: 'Large Brewery' },
];

const PRICING = [
  {
    name: 'Explorer',
    price: 'Free',
    period: 'forever',
    features: ['Search all breweries', 'Basic map view', 'Trail builder (3 stops)', 'Weather check'],
    cta: 'Start Exploring',
    highlight: false,
  },
  {
    name: 'Hopper',
    price: '$4.99',
    period: '/month',
    features: [
      'Everything in Explorer',
      'Unlimited trail stops',
      'Curated trail collections',
      'Offline trail maps',
      'Export & share trails',
      'Priority support',
    ],
    cta: 'Go Hopper',
    highlight: true,
  },
  {
    name: 'Brewery Partner',
    price: '$99',
    period: '/month',
    features: [
      'Featured listing placement',
      'Trail sponsorship badges',
      'Analytics dashboard',
      'Promo event publishing',
      'Custom brewery profile',
      'Direct customer messaging',
    ],
    cta: 'Partner With Us',
    highlight: false,
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Beer className="w-7 h-7 text-amber-600" />
            <span className="font-bold text-xl text-stone-900 tracking-tight">BrewTrail</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
            <a href="#features" className="hover:text-amber-600 transition-colors">Features</a>
            <a href="#pricing" className="hover:text-amber-600 transition-colors">Pricing</a>
            <a href="#types" className="hover:text-amber-600 transition-colors">Brewery Types</a>
          </div>
          <Link
            href="/explore"
            className="bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm px-5 py-2.5 rounded-full transition-colors shadow-sm"
          >
            Start Exploring →
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <TrendingUp className="w-4 h-4" />
            8,000+ breweries · 100% free to explore
          </div>
          <h1 className="text-6xl md:text-7xl font-extrabold text-stone-900 leading-[1.05] tracking-tight mb-6">
            Discover Your Next
            <span className="text-amber-600 block">Craft Beer Adventure</span>
          </h1>
          <p className="text-xl text-stone-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Plan the perfect brewery trail in any city. Find hidden gems, check live weather, and
            build your route — all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/explore"
              className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-lg px-8 py-4 rounded-2xl transition-all shadow-lg hover:shadow-amber-200 hover:-translate-y-0.5"
            >
              Explore Breweries Free
            </Link>
            <a
              href="#features"
              className="bg-white hover:bg-stone-50 text-stone-700 font-semibold text-lg px-8 py-4 rounded-2xl border border-stone-200 transition-all hover:-translate-y-0.5"
            >
              See How It Works
            </a>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="py-12 bg-amber-600">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((s) => (
            <div key={s.label} className="text-center text-white">
              <div className="text-4xl font-extrabold">{s.value}</div>
              <div className="text-amber-100 text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-stone-900 mb-4">Everything you need</h2>
            <p className="text-stone-500 text-lg">to plan the perfect brewery day</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="bg-white rounded-3xl p-8 border border-stone-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center mb-5">
                  <f.icon className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold text-stone-900 mb-3">{f.title}</h3>
                <p className="text-stone-500 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brewery types */}
      <section id="types" className="py-16 px-6 bg-stone-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-extrabold text-stone-900 text-center mb-10">
            Every type of brewery
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {BREWERY_TYPES.map((t) => (
              <Link
                key={t.type}
                href={`/explore?type=${t.type}`}
                className="bg-white rounded-2xl p-5 text-center hover:border-amber-300 border border-stone-200 hover:shadow-md transition-all group"
              >
                <div className="text-3xl mb-2">{t.emoji}</div>
                <div className="text-sm font-semibold text-stone-700 group-hover:text-amber-700">
                  {t.label}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-extrabold text-stone-900 text-center mb-16">
            Build a trail in 3 steps
          </h2>
          <div className="space-y-8">
            {[
              {
                step: '01',
                title: 'Search your city',
                desc: 'Type any city name to instantly see all breweries on a live map. Filter by type — brewpub, taproom, micro, and more.',
              },
              {
                step: '02',
                title: 'Check the weather & add to trail',
                desc: 'Each brewery card shows live weather conditions. Add your favourites to your trail with one click.',
              },
              {
                step: '03',
                title: 'Share & go',
                desc: 'Drag to reorder stops, then share a link with your crew. Export to any maps app to start navigating.',
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-8 items-start">
                <div className="flex-shrink-0 w-16 h-16 bg-amber-600 text-white rounded-2xl flex items-center justify-center font-black text-xl">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-stone-900 mb-2">{item.title}</h3>
                  <p className="text-stone-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6 bg-stone-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-stone-900 mb-4">Simple pricing</h2>
            <p className="text-stone-500 text-lg">Start free. Upgrade when you're ready to go deeper.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {PRICING.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-3xl p-8 border ${
                  plan.highlight
                    ? 'bg-amber-600 border-amber-500 text-white shadow-2xl shadow-amber-200 scale-105'
                    : 'bg-white border-stone-200 shadow-sm'
                }`}
              >
                <div
                  className={`text-sm font-semibold uppercase tracking-widest mb-2 ${
                    plan.highlight ? 'text-amber-100' : 'text-amber-600'
                  }`}
                >
                  {plan.name}
                </div>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className={`text-5xl font-black ${plan.highlight ? 'text-white' : 'text-stone-900'}`}>
                    {plan.price}
                  </span>
                  <span className={plan.highlight ? 'text-amber-100' : 'text-stone-400'}>
                    {plan.period}
                  </span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <span className={plan.highlight ? 'text-amber-200' : 'text-amber-500'}>✓</span>
                      <span className={plan.highlight ? 'text-amber-50' : 'text-stone-600'}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/explore"
                  className={`block text-center font-bold py-3 rounded-xl transition-all ${
                    plan.highlight
                      ? 'bg-white text-amber-700 hover:bg-amber-50'
                      : 'bg-amber-600 text-white hover:bg-amber-700'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <Beer className="w-16 h-16 text-amber-500 mx-auto mb-6" />
          <h2 className="text-5xl font-extrabold text-stone-900 mb-6">
            Ready to find your trail?
          </h2>
          <p className="text-xl text-stone-500 mb-10">
            Thousands of breweries are waiting. No signup required.
          </p>
          <Link
            href="/explore"
            className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-bold text-xl px-12 py-5 rounded-2xl transition-all shadow-xl hover:shadow-amber-200 hover:-translate-y-1"
          >
            Start Exploring Free →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-200 py-12 px-6 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Beer className="w-6 h-6 text-amber-600" />
            <span className="font-bold text-stone-800">BrewTrail</span>
          </div>
          <div className="text-sm text-stone-400">
            Powered by{' '}
            <a href="https://www.openbrewerydb.org" className="text-amber-600 hover:underline">
              Open Brewery DB
            </a>
            {' · '}
            <a href="https://open-meteo.com" className="text-amber-600 hover:underline">
              Open-Meteo
            </a>
            {' · '}
            <a href="https://www.openstreetmap.org" className="text-amber-600 hover:underline">
              OpenStreetMap
            </a>
          </div>
          <div className="flex items-center gap-1 text-sm text-stone-400">
            <Users className="w-4 h-4" />
            Built for craft beer lovers
          </div>
        </div>
      </footer>
    </div>
  );
}
