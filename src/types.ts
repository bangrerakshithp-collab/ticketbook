export interface Bus {
  id: string;
  operator: string;
  busType: 'AC Sleeper (2+1)' | 'AC Semi-Sleeper' | 'Volvo Multi-Axle AC' | 'Non-AC Seater' | 'Luxury Scania AC';
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  originalPrice?: number;
  rating: number;
  totalReviews: number;
  availableSeats: number;
  totalSeats: number;
  amenities: string[];
  boardingPoints: { id: string; time: string; location: string }[];
  droppingPoints: { id: string; time: string; location: string }[];
  deckType: 'single' | 'double'; // single for seater/semi-sleeper, double for sleeper
  layout: SeatConfig[][]; // Row -> Seats
}

export interface SeatConfig {
  id: string;
  number: string;
  type: 'seater' | 'sleeper' | 'semi-sleeper';
  deck: 'lower' | 'upper';
  price: number;
  isBooked: boolean;
  isLadies?: boolean;
}

export interface Passenger {
  name: string;
  age: string;
  gender: 'Male' | 'Female' | 'Other';
  seatNumber: string;
}

export interface Booking {
  id: string;
  pnr: string;
  bus: Bus;
  passengers: Passenger[];
  selectedBoarding: { id: string; time: string; location: string };
  selectedDropping: { id: string; time: string; location: string };
  journeyDate: string;
  contactEmail: string;
  contactPhone: string;
  totalAmount: number;
  discount: number;
  bookingDate: string;
  status: 'Confirmed' | 'Cancelled';
}

export interface SearchFilters {
  from: string;
  to: string;
  date: string;
  busType: string;
  minPrice: number;
  maxPrice: number;
  departureTimeSlot: string; // 'all' | 'morning' | 'afternoon' | 'evening' | 'night'
  sortBy: 'price_asc' | 'price_desc' | 'rating' | 'departure';
}
