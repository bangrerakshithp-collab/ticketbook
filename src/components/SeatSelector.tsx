import React, { useState } from 'react';
import { Bus, SeatConfig } from '../types';
import { X, Check, ShieldAlert, Sparkles, UserCheck } from 'lucide-react';

interface SeatSelectorProps {
  bus: Bus;
  journeyDate: string;
  onClose: () => void;
  onProceed: (selectedSeats: SeatConfig[], boardingPoint: any, droppingPoint: any) => void;
}

export const SeatSelector: React.FC<SeatSelectorProps> = ({ bus, journeyDate, onClose, onProceed }) => {
  const [selectedSeatIds, setSelectedSeatIds] = useState<string[]>([]);
  const [selectedBoarding, setSelectedBoarding] = useState(bus.boardingPoints[0]);
  const [selectedDropping, setSelectedDropping] = useState(bus.droppingPoints[0]);
  const [activeDeck, setActiveDeck] = useState<'lower' | 'upper'>('lower');

  // Flatten all seats to find selected ones
  const allSeats: SeatConfig[] = bus.layout.flat();

  const handleSeatClick = (seat: SeatConfig) => {
    if (seat.isBooked) return;

    if (selectedSeatIds.includes(seat.id)) {
      setSelectedSeatIds(selectedSeatIds.filter(id => id !== seat.id));
    } else {
      if (selectedSeatIds.length >= 6) {
        alert('You can select a maximum of 6 seats per booking.');
        return;
      }
      setSelectedSeatIds([...selectedSeatIds, seat.id]);
    }
  };

  const selectedSeats = allSeats.filter(s => selectedSeatIds.includes(s.id));
  const totalPrice = selectedSeats.reduce((acc, s) => acc + s.price, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-lg font-bold flex items-center gap-2">
              {bus.operator} <span className="text-xs font-normal px-2 py-0.5 bg-blue-600 rounded-full">{bus.busType}</span>
            </h2>
            <p className="text-xs text-slate-300 mt-0.5">
              Route: <span className="text-white font-semibold">{bus.from} → {bus.to}</span> | Date: {journeyDate}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Seat Layout Section (Cols 1-7) */}
          <div className="lg:col-span-7 flex flex-col items-center bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <div className="w-full flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Select Seats</span>
              
              {bus.deckType === 'double' && (
                <div className="flex bg-slate-200 p-1 rounded-xl">
                  <button
                    onClick={() => setActiveDeck('lower')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                      activeDeck === 'lower' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Lower Deck
                  </button>
                  <button
                    onClick={() => setActiveDeck('upper')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                      activeDeck === 'upper' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Upper Deck
                  </button>
                </div>
              )}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-slate-600 mb-6 bg-white px-4 py-2 rounded-xl shadow-xs border border-slate-200/60">
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-md border-2 border-slate-300 bg-white"></div>
                <span>Available</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-md bg-blue-600 text-white flex items-center justify-center font-bold text-[10px]">✓</div>
                <span>Selected</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-md bg-slate-200 text-slate-400"></div>
                <span>Booked</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-md border-2 border-pink-300 bg-pink-50 text-pink-600 flex items-center justify-center text-[10px]">♀</div>
                <span>Ladies</span>
              </div>
            </div>

            {/* Steering / Front indicator */}
            <div className="w-full max-w-xs flex justify-end mb-4 text-slate-400 text-xs font-semibold uppercase tracking-widest border-b border-dashed border-slate-300 pb-2">
              🚗 Driver Front
            </div>

            {/* Seats Grid */}
            <div className="w-full max-w-xs space-y-3">
              {bus.layout
                .filter(row => bus.deckType === 'single' || (activeDeck === 'lower' ? row[0].deck === 'lower' : row[0].deck === 'upper'))
                .map((row, rIdx) => (
                  <div key={`row-${rIdx}`} className="flex justify-between items-center gap-3">
                    <span className="text-[10px] text-slate-400 font-bold w-4">{rIdx + 1}</span>
                    <div className="flex gap-3">
                      {row.map(seat => {
                        const isSelected = selectedSeatIds.includes(seat.id);
                        return (
                          <button
                            key={seat.id}
                            disabled={seat.isBooked}
                            onClick={() => handleSeatClick(seat)}
                            className={`w-11 h-12 rounded-xl text-xs font-bold transition-all flex flex-col items-center justify-center relative ${
                              seat.isBooked
                                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                                : isSelected
                                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30 scale-105 ring-2 ring-blue-600 ring-offset-2'
                                : seat.isLadies
                                ? 'bg-pink-50 text-pink-700 border-2 border-pink-300 hover:bg-pink-100'
                                : 'bg-white text-slate-700 border-2 border-slate-200 hover:border-blue-500 hover:shadow-xs'
                            }`}
                          >
                            <span className="text-[10px] opacity-70">{seat.deck === 'upper' ? 'U' : 'L'}</span>
                            <span>{seat.number}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Boarding, Dropping & Summary (Cols 8-12) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Boarding Point */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Select Boarding Point
                </label>
                <div className="space-y-2">
                  {bus.boardingPoints.map(bp => (
                    <label
                      key={bp.id}
                      className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                        selectedBoarding.id === bp.id
                          ? 'border-blue-600 bg-blue-50/50 ring-1 ring-blue-600'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <input
                        type="radio"
                        name="boardingPoint"
                        checked={selectedBoarding.id === bp.id}
                        onChange={() => setSelectedBoarding(bp)}
                        className="mt-0.5 text-blue-600 focus:ring-blue-500"
                      />
                      <div>
                        <p className="text-xs font-bold text-slate-900">{bp.time}</p>
                        <p className="text-xs text-slate-600">{bp.location}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Dropping Point */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Select Dropping Point
                </label>
                <div className="space-y-2">
                  {bus.droppingPoints.map(dp => (
                    <label
                      key={dp.id}
                      className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                        selectedDropping.id === dp.id
                          ? 'border-blue-600 bg-blue-50/50 ring-1 ring-blue-600'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <input
                        type="radio"
                        name="droppingPoint"
                        checked={selectedDropping.id === dp.id}
                        onChange={() => setSelectedDropping(dp)}
                        className="mt-0.5 text-blue-600 focus:ring-blue-500"
                      />
                      <div>
                        <p className="text-xs font-bold text-slate-900">{dp.time}</p>
                        <p className="text-xs text-slate-600">{dp.location}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Price & Proceed Bar */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-600">
                <span>Selected Seats:</span>
                <span className="font-semibold text-slate-900">
                  {selectedSeats.length > 0 ? selectedSeats.map(s => s.number).join(', ') : 'None selected'}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-200">
                <span>Total Amount:</span>
                <span className="text-xl text-blue-600">₹{totalPrice}</span>
              </div>

              <button
                disabled={selectedSeats.length === 0}
                onClick={() => onProceed(selectedSeats, selectedBoarding, selectedDropping)}
                className={`w-full py-3 rounded-xl font-semibold text-sm transition-all shadow-md flex items-center justify-center gap-2 ${
                  selectedSeats.length > 0
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/30 cursor-pointer'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                }`}
              >
                Proceed to Passenger Details ({selectedSeats.length})
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
