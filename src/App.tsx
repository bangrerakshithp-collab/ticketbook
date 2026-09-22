import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { SearchSection } from './components/SearchSection';
import { BusList } from './components/BusList';
import { SeatSelector } from './components/SeatSelector';
import { PassengerForm } from './components/PassengerForm';
import { BookingSuccess } from './components/BookingSuccess';
import { MyBookings } from './components/MyBookings';
import { LiveTrackerModal } from './components/LiveTrackerModal';
import { HelpModal } from './components/HelpModal';
import { MOCK_BUSES } from './data/mockBuses';
import { Bus, SearchFilters, SeatConfig, Booking, Passenger } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<'search' | 'bookings' | 'help'>('search');
  const [step, setStep] = useState<'search' | 'list' | 'seat_select' | 'passenger_form' | 'success'>('search');
  
  const [filters, setFilters] = useState<SearchFilters>({
    from: 'New York',
    to: 'Boston',
    date: new Date().toISOString().split('T')[0],
    busType: 'all',
    minPrice: 0,
    maxPrice: 200,
    departureTimeSlot: 'all',
    sortBy: 'departure'
  });

  const [selectedBus, setSelectedBus] = useState<Bus | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<SeatConfig[]>([]);
  const [selectedBoarding, setSelectedBoarding] = useState<any>(null);
  const [selectedDropping, setSelectedDropping] = useState<any>(null);
  
  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('busgo_bookings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    // Initial sample booking for testing
    return [
      {
        id: 'bk-101',
        pnr: 'BG-84920',
        bus: MOCK_BUSES[0],
        passengers: [{ name: 'Alex Morgan', age: '28', gender: 'Female', seatNumber: 'L1A' }],
        selectedBoarding: MOCK_BUSES[0].boardingPoints[0],
        selectedDropping: MOCK_BUSES[0].droppingPoints[0],
        journeyDate: new Date().toISOString().split('T')[0],
        contactEmail: 'alex.morgan@example.com',
        contactPhone: '+1 (555) 382-9102',
        totalAmount: 50,
        discount: 0,
        bookingDate: new Date().toLocaleDateString(),
        status: 'Confirmed'
      }
    ];
  });

  const [latestBooking, setLatestBooking] = useState<Booking | null>(null);
  const [trackedBus, setTrackedBus] = useState<Bus | null>(null);

  useEffect(() => {
    localStorage.setItem('busgo_bookings', JSON.stringify(bookings));
  }, [bookings]);

  const handleSearch = () => {
    setStep('list');
  };

  const handleSelectBus = (bus: Bus) => {
    setSelectedBus(bus);
    setStep('seat_select');
  };

  const handleProceedToPassenger = (seats: SeatConfig[], boarding: any, dropping: any) => {
    setSelectedSeats(seats);
    setSelectedBoarding(boarding);
    setSelectedDropping(dropping);
    setStep('passenger_form');
  };

  const handleConfirmBooking = (data: {
    passengers: Passenger[];
    contactEmail: string;
    contactPhone: string;
    totalAmount: number;
    discount: number;
  }) => {
    if (!selectedBus) return;

    const newBooking: Booking = {
      id: `bk-${Date.now()}`,
      pnr: `BG-${Math.floor(10000 + Math.random() * 90000)}`,
      bus: selectedBus,
      passengers: data.passengers,
      selectedBoarding,
      selectedDropping,
      journeyDate: filters.date,
      contactEmail: data.contactEmail,
      contactPhone: data.contactPhone,
      totalAmount: data.totalAmount,
      discount: data.discount,
      bookingDate: new Date().toLocaleDateString(),
      status: 'Confirmed'
    };

    setBookings([newBooking, ...bookings]);
    setLatestBooking(newBooking);
    setStep('success');
  };

  const handleCancelBooking = (pnr: string) => {
    setBookings(bookings.map(b => b.pnr === pnr ? { ...b, status: 'Cancelled' as const } : b));
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900 selection:bg-blue-600 selection:text-white">
      
      {/* Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab === 'search') setStep('search');
        }}
        myBookingsCount={bookings.filter(b => b.status === 'Confirmed').length}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {activeTab === 'help' && <HelpModal />}

        {activeTab === 'bookings' && (
          <MyBookings
            bookings={bookings}
            onCancelBooking={handleCancelBooking}
            onTrackBus={(bus) => setTrackedBus(bus)}
            onNewSearch={() => {
              setActiveTab('search');
              setStep('search');
            }}
          />
        )}

        {activeTab === 'search' && (
          <>
            {step === 'search' && (
              <SearchSection
                filters={filters}
                setFilters={setFilters}
                onSearch={handleSearch}
              />
            )}

            {step === 'list' && (
              <>
                <SearchSection
                  filters={filters}
                  setFilters={setFilters}
                  onSearch={handleSearch}
                />
                <BusList
                  buses={MOCK_BUSES}
                  filters={filters}
                  setFilters={setFilters}
                  onSelectBus={handleSelectBus}
                  onTrackBus={(bus) => setTrackedBus(bus)}
                />
              </>
            )}

            {step === 'seat_select' && selectedBus && (
              <SeatSelector
                bus={selectedBus}
                journeyDate={filters.date}
                onClose={() => setStep('list')}
                onProceed={handleProceedToPassenger}
              />
            )}

            {step === 'passenger_form' && selectedBus && (
              <PassengerForm
                bus={selectedBus}
                selectedSeats={selectedSeats}
                selectedBoarding={selectedBoarding}
                selectedDropping={selectedDropping}
                journeyDate={filters.date}
                onBack={() => setStep('seat_select')}
                onConfirmBooking={handleConfirmBooking}
              />
            )}

            {step === 'success' && latestBooking && (
              <BookingSuccess
                booking={latestBooking}
                onViewBookings={() => {
                  setActiveTab('bookings');
                }}
                onHome={() => {
                  setActiveTab('search');
                  setStep('search');
                }}
              />
            )}
          </>
        )}
      </main>

      {/* Live Tracker Modal */}
      {trackedBus && (
        <LiveTrackerModal
          bus={trackedBus}
          onClose={() => setTrackedBus(null)}
        />
      )}

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 px-4 sm:px-6 lg:px-8 mt-12 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white text-sm">Bus<span className="text-blue-500">Go</span></span>
            <span>© 2026 BusGo Technologies Inc. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => setActiveTab('help')} className="hover:text-white transition-colors">Privacy Policy</button>
            <button onClick={() => setActiveTab('help')} className="hover:text-white transition-colors">Terms of Service</button>
            <button onClick={() => setActiveTab('help')} className="hover:text-white transition-colors">Cancellation Policy</button>
          </div>
        </div>
      </footer>

    </div>
  );
}
