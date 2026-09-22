import React from 'react';
import { Booking } from '../types';
import { CheckCircle2, Download, Printer, Home, Ticket, MapPin, Calendar, Clock, Phone, Mail } from 'lucide-react';

interface BookingSuccessProps {
  booking: Booking;
  onViewBookings: () => void;
  onHome: () => void;
}

export const BookingSuccess: React.FC<BookingSuccessProps> = ({ booking, onViewBookings, onHome }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden print:shadow-none">
        
        {/* Success Header banner */}
        <div className="bg-emerald-600 text-white p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none"></div>
          <div className="relative z-10">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-4 text-white shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight">Booking Confirmed!</h1>
            <p className="text-emerald-100 text-sm mt-1">
              Your tickets have been booked successfully. A confirmation has been sent to <span className="font-semibold text-white">{booking.contactEmail}</span>.
            </p>
          </div>
        </div>

        {/* Ticket PNR & Barcode section */}
        <div className="p-6 sm:p-8 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">PNR Number</span>
            <p className="text-2xl font-mono font-extrabold text-slate-900 tracking-wider">{booking.pnr}</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-100 text-slate-700 font-semibold rounded-xl text-xs border border-slate-300 shadow-xs transition-colors"
            >
              <Printer className="w-4 h-4" />
              Print Ticket
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-xs shadow-md shadow-blue-600/30 transition-colors"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </button>
          </div>
        </div>

        {/* Ticket Details Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Operator & Bus Info */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">{booking.bus.busType}</span>
              <h3 className="text-xl font-bold text-slate-900">{booking.bus.operator}</h3>
            </div>
            <div className="text-right sm:text-left">
              <span className="text-xs text-slate-500 block">Journey Date</span>
              <span className="text-sm font-bold text-slate-900 flex items-center gap-1.5 sm:justify-end">
                <Calendar className="w-4 h-4 text-blue-600" />
                {booking.journeyDate}
              </span>
            </div>
          </div>

          {/* Route & Timing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-200/60">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">Boarding Point</span>
              <p className="text-sm font-bold text-slate-900">{booking.selectedBoarding.location}</p>
              <p className="text-xs text-blue-600 font-semibold mt-0.5">Time: {booking.selectedBoarding.time}</p>
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">Dropping Point</span>
              <p className="text-sm font-bold text-slate-900">{booking.selectedDropping.location}</p>
              <p className="text-xs text-blue-600 font-semibold mt-0.5">Time: {booking.selectedDropping.time}</p>
            </div>
          </div>

          {/* Passengers & Seats */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Passenger & Seat Details</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {booking.passengers.map((p, idx) => (
                <div key={idx} className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-slate-900">{p.name}</p>
                    <p className="text-xs text-slate-500">{p.gender}, {p.age} yrs</p>
                  </div>
                  <div className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-bold border border-blue-200">
                    Seat {p.seatNumber}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact & Fare */}
          <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-slate-200 gap-4 text-xs text-slate-600">
            <div className="space-y-1">
              <p className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-blue-600" /> {booking.contactEmail}
              </p>
              <p className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-blue-600" /> {booking.contactPhone}
              </p>
            </div>
            <div className="text-right">
              <span className="text-slate-500 block">Total Paid Amount</span>
              <span className="text-xl font-extrabold text-blue-600">${booking.totalAmount}</span>
            </div>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="p-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-4">
          <button
            onClick={onHome}
            className="flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-slate-100 text-slate-700 font-semibold rounded-xl text-xs border border-slate-300 transition-colors"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </button>
          <button
            onClick={onViewBookings}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-xs shadow-md shadow-blue-600/30 transition-colors"
          >
            <Ticket className="w-4 h-4" />
            View My Bookings ({booking.pnr})
          </button>
        </div>

      </div>
    </div>
  );
};
