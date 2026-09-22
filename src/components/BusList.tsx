import React, { useState } from 'react';
import { Bus, SearchFilters, SeatConfig } from '../types';
import { Star, Wifi, Shield, Zap, MapPin, Clock, ArrowUpDown, Filter, Bus as BusIcon } from 'lucide-react';

interface BusListProps {
  buses: Bus[];
  filters: SearchFilters;
  setFilters: React.Dispatch<React.SetStateAction<SearchFilters>>;
  onSelectBus: (bus: Bus) => void;
  onTrackBus: (bus: Bus) => void;
}

export const BusList: React.FC<BusListProps> = ({ buses, filters, setFilters, onSelectBus, onTrackBus }) => {
  const [selectedBusTypeFilter, setSelectedBusTypeFilter] = useState<string>('all');
  const [selectedAmenity, setSelectedAmenity] = useState<string>('all');

  const filteredBuses = buses.filter(bus => {
    // Route filter
    if (filters.from && bus.from.toLowerCase() !== filters.from.toLowerCase()) return false;
    if (filters.to && bus.to.toLowerCase() !== filters.to.toLowerCase()) return false;

    // Bus Type filter
    if (selectedBusTypeFilter !== 'all' && !bus.busType.toLowerCase().includes(selectedBusTypeFilter.toLowerCase())) {
      return false;
    }

    // Amenity filter
    if (selectedAmenity !== 'all' && !bus.amenities.includes(selectedAmenity)) {
      return false;
    }

    return true;
  }).sort((a, b) => {
    if (filters.sortBy === 'price_asc') return a.price - b.price;
    if (filters.sortBy === 'price_desc') return b.price - a.price;
    if (filters.sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Filters Sidebar (Cols 1-3) */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6 sticky top-24">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Filter className="w-4 h-4 text-blue-600" /> Filters
              </h3>
              <button
                onClick={() => {
                  setSelectedBusTypeFilter('all');
                  setSelectedAmenity('all');
                  setFilters(prev => ({ ...prev, sortBy: 'departure' }));
                }}
                className="text-xs font-semibold text-blue-600 hover:text-blue-800"
              >
                Reset
              </button>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Sort By</label>
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-800 outline-none cursor-pointer focus:bg-white focus:ring-2 focus:ring-blue-600"
              >
                <option value="departure">Departure Time</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {/* Bus Type Filter */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Bus Type</label>
              <div className="space-y-2">
                {['all', 'Sleeper', 'Volvo', 'Seater'].map(type => (
                  <label key={type} className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
                    <input
                      type="radio"
                      name="busTypeFilter"
                      checked={selectedBusTypeFilter === type}
                      onChange={() => setSelectedBusTypeFilter(type)}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span className="capitalize">{type === 'all' ? 'All Types' : type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Amenities Filter */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Amenities</label>
              <div className="space-y-2">
                {['all', 'WiFi', 'Charging Port', 'Blanket', 'Live Tracking'].map(amenity => (
                  <label key={amenity} className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
                    <input
                      type="radio"
                      name="amenityFilter"
                      checked={selectedAmenity === amenity}
                      onChange={() => setSelectedAmenity(amenity)}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span>{amenity === 'all' ? 'All Amenities' : amenity}</span>
                  </label>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Bus List Results (Cols 4-12) */}
        <div className="lg:col-span-9 space-y-4">
          
          <div className="flex items-center justify-between bg-white px-6 py-4 rounded-2xl border border-slate-200 shadow-xs">
            <h2 className="text-sm font-bold text-slate-900">
              Available Buses ({filteredBuses.length}) for <span className="text-blue-600">{filters.from} to {filters.to}</span>
            </h2>
            <span className="text-xs text-slate-500 font-medium">Date: {filters.date}</span>
          </div>

          {filteredBuses.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-3">
              <BusIcon className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">No buses found for this route</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Try searching for another route like New York to Boston or New York to Washington DC.
              </p>
            </div>
          ) : (
            filteredBuses.map(bus => (
              <div
                key={bus.id}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-slate-900">{bus.operator}</h3>
                      <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold border border-blue-200">
                        {bus.busType}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span className="font-semibold text-slate-700">{bus.rating}</span> ({bus.totalReviews} reviews)
                    </p>
                  </div>

                  {/* Price & Select Button */}
                  <div className="flex items-center justify-between sm:justify-end gap-6">
                    <div className="text-right">
                      <span className="text-xs text-slate-400 line-through block">${bus.originalPrice}</span>
                      <span className="text-2xl font-extrabold text-blue-600">${bus.price}</span>
                      <span className="text-[10px] text-slate-500 block">per seat</span>
                    </div>
                    <button
                      onClick={() => onSelectBus(bus)}
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-xs shadow-md shadow-blue-600/30 transition-all cursor-pointer"
                    >
                      Select Seats
                    </button>
                  </div>
                </div>

                {/* Timing & Duration Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4 border-y border-slate-100 text-xs">
                  <div>
                    <span className="text-slate-400 block mb-0.5">Departure</span>
                    <span className="text-sm font-bold text-slate-900">{bus.departureTime}</span>
                    <span className="text-slate-600 block text-[11px] truncate">{bus.from}</span>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <span className="text-slate-400 font-medium">{bus.duration}</span>
                    <div className="w-full flex items-center gap-1 my-1">
                      <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                      <div className="flex-1 border-t border-dashed border-slate-300"></div>
                      <div className="w-2 h-2 rounded-full bg-emerald-600"></div>
                    </div>
                    <span className="text-[10px] text-emerald-600 font-semibold">{bus.availableSeats} seats available</span>
                  </div>
                  <div className="text-right sm:text-right">
                    <span className="text-slate-400 block mb-0.5">Arrival</span>
                    <span className="text-sm font-bold text-slate-900">{bus.arrivalTime}</span>
                    <span className="text-slate-600 block text-[11px] truncate">{bus.to}</span>
                  </div>
                </div>

                {/* Amenities & Live Track */}
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex flex-wrap items-center gap-2">
                    {bus.amenities.map((amenity, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 font-medium text-[11px]">
                        {amenity}
                      </span>
                    ))}
                  </div>

                  {bus.amenities.includes('Live Tracking') && (
                    <button
                      onClick={() => onTrackBus(bus)}
                      className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1 text-xs"
                    >
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      Track Bus Live
                    </button>
                  )}
                </div>

              </div>
            ))
          )}

        </div>

      </div>
    </div>
  );
};
