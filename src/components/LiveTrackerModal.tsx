import React from 'react';
import { Bus } from '../types';
import { X, Navigation, Phone, MapPin, Clock, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface LiveTrackerModalProps {
  bus: Bus;
  onClose: () => void;
}

export const LiveTrackerModal: React.FC<LiveTrackerModalProps> = ({ bus, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
            <h2 className="text-base font-bold">Live Bus Tracking</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          
          <div className="bg-blue-50 p-4 rounded-2xl border border-blue-200 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">{bus.operator}</span>
              <h3 className="text-sm font-bold text-slate-900">{bus.busType}</h3>
              <p className="text-xs text-slate-600 mt-0.5">Route: {bus.from} → {bus.to}</p>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-500 block">Estimated Arrival</span>
              <span className="text-sm font-extrabold text-blue-600">{bus.arrivalTime}</span>
            </div>
          </div>

          {/* Driver Contact */}
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-700 font-bold">
                👨‍✈️
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">Captain Robert Vance</p>
                <p className="text-[11px] text-slate-500">Bus Driver • ID: DRV-8942</p>
              </div>
            </div>
            <a
              href="tel:+15550192834"
              className="flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-xs shadow-xs transition-colors"
            >
              <Phone className="w-3.5 h-3.5" /> Call Driver
            </a>
          </div>

          {/* Simulated Route Progress Timeline */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Journey Progress</h4>
            
            <div className="space-y-3 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              
              <div className="flex items-start gap-4 relative">
                <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center z-10 text-xs font-bold shadow-xs">
                  ✓
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Departed from {bus.from}</p>
                  <p className="text-[11px] text-slate-500">{bus.departureTime} • On Time</p>
                </div>
              </div>

              <div className="flex items-start gap-4 relative">
                <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center z-10 text-xs shadow-md shadow-blue-500/30 animate-pulse">
                  📍
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Current Location: Highway Corridor 9</p>
                  <p className="text-[11px] text-emerald-600 font-semibold">Moving at 65 mph • Next stop in 25 mins</p>
                </div>
              </div>

              <div className="flex items-start gap-4 relative">
                <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-400 flex items-center justify-center z-10 text-xs font-bold">
                  3
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-600">Arrival at {bus.to}</p>
                  <p className="text-[11px] text-slate-400">{bus.arrivalTime}</p>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-colors"
          >
            Close Tracker
          </button>
        </div>

      </div>
    </div>
  );
};
