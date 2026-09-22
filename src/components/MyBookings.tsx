import React, { useState } from 'react';
import { Booking, Bus } from '../types';
import { Ticket, Search, MapPin, Calendar, XCircle, Printer, Download, Bus as BusIcon, AlertCircle } from 'lucide-react';

interface MyBookingsProps {
  bookings: Booking[];
  onCancelBooking: (pnr: string) => void;
  onTrackBus: (bus: Bus) => void;
  onNewSearch: () => void;
}

export const MyBookings: React.FC<MyBookingsProps> = ({ bookings, onCancelBooking, onTrackBus, onNewSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBookings = bookings.filter(b => 
    b.pnr.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.bus.operator.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.bus.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.bus.to.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8 animate-fade-in">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">My Bookings</h1>
          <p className="text-xs text-slate-500 mt-0.5">Manage your active and past bus tickets</p>
        </div>

        {/* Search PNR input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by PNR or Operator..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-xs font-medium text-slate-800 outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
      </div>

      {filteredBookings.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-4">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto">
            <Ticket className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-slate-800">No bookings found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            You haven't booked any bus tickets yet or no tickets match your search query.
          </p>
          <button
            onClick={onNewSearch}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-xs shadow-md shadow-blue-600/30 transition-all inline-block"
          >
            Book a Bus Now
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredBookings.map(booking => (
            <div
              key={booking.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-all"
            >
              {/* Card Top Banner */}
              <div className="bg-slate-900 text-white px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold px-2.5 py-1 bg-blue-600 rounded-lg text-white">
                    PNR: {booking.pnr}
                  </span>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase ${
                    booking.status === 'Confirmed' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400'
                  }`}>
                    {booking.status}
                  </span>
                </div>
                <span className="text-xs text-slate-400">
                  Booked on: {booking.bookingDate}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-6">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{booking.bus.operator}</h3>
                    <p className="text-xs text-blue-600 font-semibold">{booking.bus.busType}</p>
                  </div>
                  <div className="text-right sm:text-left">
                    <span className="text-xs text-slate-400 block">Journey Date</span>
                    <span className="text-sm font-bold text-slate-900 flex items-center gap-1.5 sm:justify-end">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      {booking.journeyDate} at {booking.bus.departureTime}
                    </span>
                  </div>
                </div>

                {/* Route */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl text-xs">
                  <div>
                    <span className="text-slate-400 font-bold uppercase tracking-wider block mb-0.5">Boarding Point</span>
                    <p className="font-semibold text-slate-900">{booking.selectedBoarding.location}</p>
                    <p className="text-blue-600 font-medium">Time: {booking.selectedBoarding.time}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold uppercase tracking-wider block mb-0.5">Dropping Point</span>
                    <p className="font-semibold text-slate-900">{booking.selectedDropping.location}</p>
                    <p className="text-blue-600 font-medium">Time: {booking.selectedDropping.time}</p>
                  </div>
                </div>

                {/* Passengers & Seats */}
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">Passengers ({booking.passengers.length})</span>
                  <div className="flex flex-wrap gap-2">
                    {booking.passengers.map((p, idx) => (
                      <div key={idx} className="px-3 py-1.5 bg-slate-100 rounded-xl text-xs font-semibold text-slate-700 flex items-center gap-2 border border-slate-200">
                        <span>{p.name}</span>
                        <span className="px-2 py-0.5 bg-blue-600 text-white rounded-lg text-[10px]">Seat {p.seatNumber}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="flex flex-wrap items-center justify-between pt-4 border-t border-slate-100 gap-4">
                  <div className="text-sm font-bold text-slate-900">
                    Total Paid: <span className="text-blue-600">${booking.totalAmount}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    {booking.bus.amenities.includes('Live Tracking') && booking.status === 'Confirmed' && (
                      <button
                        onClick={() => onTrackBus(booking.bus)}
                        className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold rounded-xl text-xs transition-colors border border-emerald-200"
                      >
                        Track Bus Live
                      </button>
                    )}

                    {booking.status === 'Confirmed' && (
                      <button
                        onClick={() => {
                          if (confirm('Are you sure you want to cancel this booking?')) {
                            onCancelBooking(booking.pnr);
                          }
                        }}
                        className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold rounded-xl text-xs transition-colors border border-rose-200"
                      >
                        Cancel Booking
                      </button>
                    )}
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
