import { Bus, SeatConfig } from '../types';

export const CITIES = [
  'New York',
  'Boston',
  'Washington DC',
  'Philadelphia',
  'Chicago',
  'Detroit',
  'Toronto',
  'Montreal',
  'Los Angeles',
  'San Francisco',
  'Las Vegas',
  'San Diego',
  'Seattle',
  'Portland',
  'Miami',
  'Orlando',
  'Atlanta'
];

// Helper to generate a realistic seat layout
function generateLayout(deckType: 'single' | 'double', basePrice: number): SeatConfig[][] {
  const rows = deckType === 'double' ? 8 : 10;
  const layout: SeatConfig[][] = [];

  for (let r = 1; r <= rows; r++) {
    const rowSeats: SeatConfig[] = [];
    if (deckType === 'double') {
      // Sleeper bus: Lower deck (L1-L3 per row), Upper deck (U1-U3 per row)
      // For simplicity in 2D array, let's create lower deck rows and upper deck rows
      // Let's make 5 rows lower deck, 5 rows upper deck
    }
  }

  // Let's create a structured layout: Lower deck (rows 1-5), Upper deck (rows 6-10) for sleepers, or 10 rows for single deck
  const totalRows = 8;
  for (let r = 1; r <= totalRows; r++) {
    const rowSeats: SeatConfig[] = [];
    const deck = r <= 4 ? 'lower' : 'upper';
    const rowPrefix = deck === 'lower' ? 'L' : 'U';
    
    // 3 columns in sleeper: Left single berth (S), Aisle, Right double berth (B1, B2)
    const seatsInRow = ['1', '2', '3', '4'];
    seatsInRow.forEach((colNum, idx) => {
      const seatNum = `${rowPrefix}${r}${String.fromCharCode(65 + idx)}`;
      // random booked status
      const isBooked = Math.random() < 0.25;
      const isLadies = !isBooked && Math.random() < 0.15;
      rowSeats.push({
        id: seatNum,
        number: seatNum,
        type: deckType === 'double' ? 'sleeper' : 'seater',
        deck: deckType === 'double' ? deck : 'lower',
        price: deck === 'upper' ? basePrice + 5 : basePrice,
        isBooked,
        isLadies
      });
    });
    layout.push(rowSeats);
  }

  return layout;
}

export const MOCK_BUSES: Bus[] = [
  {
    id: 'bus-1',
    operator: 'Greyhound Express',
    busType: 'AC Sleeper (2+1)',
    from: 'New York',
    to: 'Boston',
    departureTime: '06:00 AM',
    arrivalTime: '10:30 AM',
    duration: '4h 30m',
    price: 45,
    originalPrice: 55,
    rating: 4.6,
    totalReviews: 328,
    availableSeats: 14,
    totalSeats: 32,
    amenities: ['WiFi', 'Charging Port', 'Blanket', 'Water Bottle', 'Live Tracking'],
    boardingPoints: [
      { id: 'bp-1', time: '05:45 AM', location: 'Port Authority Bus Terminal, Gate 42' },
      { id: 'bp-2', time: '06:00 AM', location: 'George Washington Bridge Station' }
    ],
    droppingPoints: [
      { id: 'dp-1', time: '10:15 AM', location: 'South Station Bus Terminal, Bay 7' },
      { id: 'dp-2', time: '10:30 AM', location: 'Logan Airport Terminal B' }
    ],
    deckType: 'double',
    layout: generateLayout('double', 45)
  },
  {
    id: 'bus-2',
    operator: 'FlixTransit Luxury',
    busType: 'Volvo Multi-Axle AC',
    from: 'New York',
    to: 'Boston',
    departureTime: '08:30 AM',
    arrivalTime: '12:45 PM',
    duration: '4h 15m',
    price: 52,
    originalPrice: 65,
    rating: 4.8,
    totalReviews: 512,
    availableSeats: 8,
    totalSeats: 32,
    amenities: ['WiFi', 'Charging Port', 'Snacks', 'Water Bottle', 'Entertainment', 'Live Tracking'],
    boardingPoints: [
      { id: 'bp-3', time: '08:15 AM', location: 'Port Authority Bus Terminal' },
      { id: 'bp-4', time: '08:30 AM', location: 'Midtown 34th St' }
    ],
    droppingPoints: [
      { id: 'dp-3', time: '12:30 PM', location: 'South Station Bus Terminal' },
      { id: 'dp-4', time: '12:45 PM', location: 'Back Bay Station' }
    ],
    deckType: 'double',
    layout: generateLayout('double', 52)
  },
  {
    id: 'bus-3',
    operator: 'MetroLiner Seater',
    busType: 'Non-AC Seater',
    from: 'New York',
    to: 'Boston',
    departureTime: '11:00 AM',
    arrivalTime: '03:40 PM',
    duration: '4h 40m',
    price: 28,
    originalPrice: 35,
    rating: 4.2,
    totalReviews: 145,
    availableSeats: 22,
    totalSeats: 32,
    amenities: ['Water Bottle', 'Charging Port'],
    boardingPoints: [
      { id: 'bp-5', time: '10:45 AM', location: 'Port Authority Bus Terminal' }
    ],
    droppingPoints: [
      { id: 'dp-5', time: '03:40 PM', location: 'South Station Bus Terminal' }
    ],
    deckType: 'single',
    layout: generateLayout('single', 28)
  },
  {
    id: 'bus-4',
    operator: 'StarExpress Sleeper',
    busType: 'AC Sleeper (2+1)',
    from: 'New York',
    to: 'Washington DC',
    departureTime: '07:00 AM',
    arrivalTime: '11:30 AM',
    duration: '4h 30m',
    price: 65,
    originalPrice: 75,
    rating: 4.7,
    totalReviews: 410,
    availableSeats: 11,
    totalSeats: 32,
    amenities: ['WiFi', 'Charging Port', 'Blanket', 'Pillow', 'Water Bottle', 'Live Tracking'],
    boardingPoints: [
      { id: 'bp-6', time: '06:45 AM', location: 'Penn Station Bus Stop' },
      { id: 'bp-7', time: '07:00 AM', location: 'Port Authority Terminal' }
    ],
    droppingPoints: [
      { id: 'dp-6', time: '11:15 AM', location: 'Union Station Bus Deck' },
      { id: 'dp-7', time: '11:30 AM', location: 'L\'Enfant Plaza' }
    ],
    deckType: 'double',
    layout: generateLayout('double', 65)
  },
  {
    id: 'bus-5',
    operator: 'Capital Cruiser',
    busType: 'Luxury Scania AC',
    from: 'New York',
    to: 'Washington DC',
    departureTime: '01:30 PM',
    arrivalTime: '05:45 PM',
    duration: '4h 15m',
    price: 70,
    originalPrice: 85,
    rating: 4.9,
    totalReviews: 620,
    availableSeats: 5,
    totalSeats: 32,
    amenities: ['WiFi', 'Charging Port', 'Snacks', 'Beverages', 'Blanket', 'Live Tracking', 'Entertainment'],
    boardingPoints: [
      { id: 'bp-8', time: '01:15 PM', location: 'Port Authority Terminal' }
    ],
    droppingPoints: [
      { id: 'dp-8', time: '05:45 PM', location: 'Union Station Bus Deck' }
    ],
    deckType: 'double',
    layout: generateLayout('double', 70)
  },
  {
    id: 'bus-6',
    operator: 'Pacific Coast Liner',
    busType: 'AC Semi-Sleeper',
    from: 'Los Angeles',
    to: 'San Francisco',
    departureTime: '09:00 PM',
    arrivalTime: '05:30 AM',
    duration: '8h 30m',
    price: 80,
    originalPrice: 95,
    rating: 4.5,
    totalReviews: 289,
    availableSeats: 16,
    totalSeats: 32,
    amenities: ['WiFi', 'Charging Port', 'Blanket', 'Water Bottle', 'Live Tracking'],
    boardingPoints: [
      { id: 'bp-9', time: '08:45 PM', location: 'LA Downtown Bus Station, Bay 3' }
    ],
    droppingPoints: [
      { id: 'dp-9', time: '05:30 AM', location: 'San Francisco Transbay Terminal' }
    ],
    deckType: 'double',
    layout: generateLayout('double', 80)
  },
  {
    id: 'bus-7',
    operator: 'Sunshine Express',
    busType: 'Volvo Multi-Axle AC',
    from: 'Miami',
    to: 'Orlando',
    departureTime: '07:30 AM',
    arrivalTime: '11:45 AM',
    duration: '4h 15m',
    price: 40,
    originalPrice: 50,
    rating: 4.6,
    totalReviews: 198,
    availableSeats: 12,
    totalSeats: 32,
    amenities: ['WiFi', 'Charging Port', 'Water Bottle', 'Snacks'],
    boardingPoints: [
      { id: 'bp-10', time: '07:15 AM', location: 'Miami Intermodal Center' }
    ],
    droppingPoints: [
      { id: 'dp-10', time: '11:45 AM', location: 'Orlando Greyhound Station' }
    ],
    deckType: 'double',
    layout: generateLayout('double', 40)
  }
];

export const FAQS = [
  {
    question: 'How can I cancel my bus ticket?',
    answer: 'You can cancel your ticket directly from the "My Bookings" tab by entering your PNR or clicking the Cancel Booking button. Refunds are processed within 3-5 business days according to the cancellation policy.'
  },
  {
    question: 'Is live bus tracking available for all buses?',
    answer: 'Live tracking is available for buses tagged with the "Live Tracking" amenity. You can track your bus in real-time starting 30 minutes before departure.'
  },
  {
    question: 'What documents do I need to carry while boarding?',
    answer: 'Passengers must carry a valid government-issued photo ID (Passport, Driver\'s License, or State ID) along with a digital or printed copy of the booking confirmation / ticket.'
  },
  {
    question: 'Can I modify my travel date after booking?',
    answer: 'Currently, ticket dates cannot be directly modified. You will need to cancel your existing booking and book a new ticket for the desired date.'
  }
];
