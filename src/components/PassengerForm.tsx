import React, { useState } from 'react';
import { Bus, SeatConfig, Passenger } from '../types';
import { ArrowLeft, ShieldCheck, Tag, CreditCard, CheckCircle2 } from 'lucide-react';

interface PassengerFormProps {
  bus: Bus;
  selectedSeats: SeatConfig[];
  selectedBoarding: any;
  selectedDropping: any;
  journeyDate: string;
  onBack: () => void;
  onConfirmBooking: (bookingData: {
    passengers: Passenger[];
    contactEmail: string;
    contactPhone: string;
    totalAmount: number;
    discount: number;
  }) => void;
}

export const PassengerForm: React.FC<PassengerFormProps> = ({
  bus,
  selectedSeats,
  selectedBoarding,
  selectedDropping,
  journeyDate,
  onBack,
  onConfirmBooking
}) => {
  const [passengers, setPassengers] = useState<Passenger[]>(
    selectedSeats.map(seat => ({
      name: '',
      age: '',
      gender: 'Male',
      seatNumber: seat.number
    }))
  );

  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');

  const rawTotal = selectedSeats.reduce((acc, s) => acc + s.price, 0);
  const taxes = 5;
  const finalTotal = rawTotal + taxes - discount;

  const handlePassengerChange = (index: number, field: keyof Passenger, value: string) => {
    const updated = [...passengers];
    updated[index] = { ...updated[index], [field]: value };
    setPassengers(updated);
  };

  const applyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'SAVE20') {
      setDiscount(10);
      setPromoApplied(true);
      setPromoError('');
    } else if (promoCode.trim().toUpperCase() === 'BUSGO50') {
      setDiscount(15);
      setPromoApplied(true);
      setPromoError('');
    } else {
      setPromoError('Invalid promo code. Try SAVE20 or BUSGO50');
      setPromoApplied(false);
      setDiscount(0);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    for (let p of passengers) {
      if (!p.name || !p.age) {
        alert('Please fill in all passenger names and ages.');
        return;
      }
    }
    if (!contactEmail || !contactPhone) {
      alert('Please provide contact email and phone number.');
      return;
    }

    onConfirmBooking({
      passengers,
      contactEmail,
      contactPhone,
      totalAmount: finalTotal,
      discount
    });
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Seat Selection
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Form Left (Cols 1-7) */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-6">
          
          {/* Passenger Details Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span>Passenger Information</span>
            </h2>

            {passengers.map((p, idx) => (
              <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200/60 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                    Seat {p.seatNumber} Passenger #{idx + 1}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                  <div className="sm:col-span-6">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={p.name}
                      onChange={(e) => handlePassengerChange(idx, 'name', e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm font-medium text-slate-800 focus:ring-2 focus:ring-blue-600 outline-none"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Age</label>
                    <input
                      type="number"
                      required
                      min="1"
                      max="110"
                      placeholder="Age"
                      value={p.age}
                      onChange={(e) => handlePassengerChange(idx, 'age', e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm font-medium text-slate-800 focus:ring-2 focus:ring-blue-600 outline-none"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Gender</label>
                    <select
                      value={p.gender}
                      onChange={(e) => handlePassengerChange(idx, 'gender', e.target.value as any)}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm font-medium text-slate-800 focus:ring-2 focus:ring-blue-600 outline-none cursor-pointer"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Details Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-slate-900">Contact Details</h2>
            <p className="text-xs text-slate-500">Your ticket and updates will be sent to this email and phone number.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="john@example.com"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-800 focus:ring-2 focus:ring-blue-600 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  placeholder="+1 (555) 019-2834"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-800 focus:ring-2 focus:ring-blue-600 outline-none"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-xl shadow-lg shadow-blue-600/30 transition-all text-base flex items-center justify-center gap-2"
          >
            <CreditCard className="w-5 h-5" />
            Proceed to Payment (₹{finalTotal})
          </button>
        </form>

        {/* Fare Summary Right (Cols 8-12) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 sticky top-24">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">Booking Summary</h3>

            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex justify-between font-semibold text-slate-900 text-sm">
                <span>{bus.operator}</span>
                <span className="text-blue-600">{bus.busType}</span>
              </div>
              <div className="flex justify-between pt-1">
                <span>Route:</span>
                <span className="font-medium text-slate-800">{bus.from} → {bus.to}</span>
              </div>
              <div className="flex justify-between">
                <span>Date & Time:</span>
                <span className="font-medium text-slate-800">{journeyDate} at {bus.departureTime}</span>
              </div>
              <div className="flex justify-between">
                <span>Boarding Point:</span>
                <span className="font-medium text-slate-800 text-right max-w-[200px] truncate">{selectedBoarding.location} ({selectedBoarding.time})</span>
              </div>
              <div className="flex justify-between">
                <span>Dropping Point:</span>
                <span className="font-medium text-slate-800 text-right max-w-[200px] truncate">{selectedDropping.location} ({selectedDropping.time})</span>
              </div>
            </div>

            {/* Selected Seats breakdown */}
            <div className="pt-3 border-t border-slate-100">
              <span className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Selected Seats ({selectedSeats.length})</span>
              <div className="flex flex-wrap gap-1.5">
                {selectedSeats.map(s => (
                  <span key={s.id} className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-bold border border-blue-200">
                    Seat {s.number} (₹{s.price})
                  </span>
                ))}
              </div>
            </div>

            {/* Promo Code Box */}
            <div className="pt-3 border-t border-slate-100">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Have a Promo Code?</label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Try SAVE20"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs font-medium uppercase text-slate-800 outline-none focus:bg-white focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <button
                  type="button"
                  onClick={applyPromo}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-colors"
                >
                  Apply
                </button>
              </div>
              {promoApplied && (
                <p className="text-xs text-emerald-600 font-semibold mt-1.5 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Promo applied successfully (-₹{discount})
                </p>
              )}
              {promoError && (
                <p className="text-xs text-rose-600 font-medium mt-1.5">{promoError}</p>
              )}
            </div>

            {/* Fare Breakdown */}
            <div className="pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Base Fare ({selectedSeats.length} seats)</span>
                <span className="font-medium text-slate-800">₹{rawTotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes & Service Fee</span>
                <span className="font-medium text-slate-800">₹{taxes}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Discount</span>
                  <span>-₹{discount}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-bold text-slate-900 pt-3 border-t border-slate-200">
                <span>Total Amount</span>
                <span className="text-blue-600">₹{finalTotal}</span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2 text-slate-500 text-[11px]">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>100% Secure Payments with Instant Ticket Generation</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
