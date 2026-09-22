import React, { useState } from 'react';
import { MapPin, Calendar, Users, Search, ArrowRightLeft, Sparkles } from 'lucide-react';
import { CITIES } from '../data/mockBuses';
import { SearchFilters } from '../types';

interface SearchSectionProps {
  filters: SearchFilters;
  setFilters: React.Dispatch<React.SetStateAction<SearchFilters>>;
  onSearch: () => void;
}

export const SearchSection: React.FC<SearchSectionProps> = ({ filters, setFilters, onSearch }) => {
  const [fromInput, setFromInput] = useState(filters.from);
  const [toInput, setToInput] = useState(filters.to);
  const [dateInput, setDateInput] = useState(filters.date || new Date().toISOString().split('T')[0]);
  const [passengersCount, setPassengersCount] = useState(1);

  const handleSwap = () => {
    const temp = fromInput;
    setFromInput(toInput);
    setToInput(temp);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters(prev => ({
      ...prev,
      from: fromInput,
      to: toInput,
      date: dateInput
    }));
    onSearch();
  };

  const popularRoutes = [
    { from: 'New York', to: 'Boston' },
    { from: 'New York', to: 'Washington DC' },
    { from: 'Los Angeles', to: 'San Francisco' },
    { from: 'Miami', to: 'Orlando' }
  ];

  return (
    <div className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-14 px-4 sm:px-6 lg:px-8 shadow-xl">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-700/60 text-blue-200 text-xs font-semibold mb-3 border border-blue-500/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Over 500+ Bus Operators Nationwide
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Book Your Bus Tickets Instantly
          </h1>
          <p className="mt-2 text-sm sm:text-base text-blue-200">
            Enjoy comfortable sleeper & AC bus journeys with live GPS tracking and zero booking fees.
          </p>
        </div>

        {/* Search Form Card */}
        <form 
          onSubmit={handleSearchSubmit}
          className="bg-white text-slate-900 p-4 sm:p-6 rounded-2xl shadow-2xl grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
        >
          {/* From City */}
          <div className="md:col-span-3 relative">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">From</label>
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus-within:ring-2 focus-within:ring-blue-600 focus-within:bg-white transition-all">
              <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
              <select
                value={fromInput}
                onChange={(e) => setFromInput(e.target.value)}
                className="w-full bg-transparent text-sm font-semibold text-slate-800 outline-none cursor-pointer"
              >
                {CITIES.map(city => (
                  <option key={`from-${city}`} value={city}>{city}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Swap Button */}
          <div className="md:col-span-1 flex justify-center items-end pb-1">
            <button
              type="button"
              onClick={handleSwap}
              title="Swap From and To"
              className="p-2.5 rounded-full bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-600 transition-colors border border-slate-200 shadow-xs"
            >
              <ArrowRightLeft className="w-4 h-4 sm:rotate-90" />
            </button>
          </div>

          {/* To City */}
          <div className="md:col-span-3 relative">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">To</label>
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus-within:ring-2 focus-within:ring-blue-600 focus-within:bg-white transition-all">
              <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
              <select
                value={toInput}
                onChange={(e) => setToInput(e.target.value)}
                className="w-full bg-transparent text-sm font-semibold text-slate-800 outline-none cursor-pointer"
              >
                {CITIES.map(city => (
                  <option key={`to-${city}`} value={city}>{city}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Journey Date */}
          <div className="md:col-span-2 relative">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Date</label>
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus-within:ring-2 focus-within:ring-blue-600 focus-within:bg-white transition-all">
              <Calendar className="w-4 h-4 text-blue-600 shrink-0" />
              <input
                type="date"
                value={dateInput}
                onChange={(e) => setDateInput(e.target.value)}
                className="w-full bg-transparent text-sm font-semibold text-slate-800 outline-none cursor-pointer"
              />
            </div>
          </div>

          {/* Search Button */}
          <div className="md:col-span-3 pt-5 md:pt-0">
            <label className="hidden md:block text-xs font-bold text-transparent mb-1">&nbsp;</label>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-3 px-6 rounded-xl shadow-lg shadow-blue-600/30 transition-all text-sm"
            >
              <Search className="w-4 h-4" />
              Search Buses
            </button>
          </div>
        </form>

        {/* Popular Quick Routes */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-blue-100">
          <span className="font-medium text-blue-200">Popular Routes:</span>
          {popularRoutes.map((route, idx) => (
            <button
              key={idx}
              onClick={() => {
                setFromInput(route.from);
                setToInput(route.to);
                setFilters(prev => ({ ...prev, from: route.from, to: route.to }));
              }}
              className="px-3 py-1 rounded-lg bg-blue-800/60 hover:bg-blue-700 transition-colors border border-blue-600/40 text-xs font-medium"
            >
              {route.from} → {route.to}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
