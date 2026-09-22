import { Bus, SeatConfig } from '../types';

export const CITIES = [
  'Bengaluru',
  'Mumbai',
  'Pune',
  'Hyderabad',
  'Goa',
  'Chennai',
  'Delhi',
  'Jaipur',
  'Ahmedabad',
  'Coimbatore',
  'Kochi',
  'Madurai',
  'Mysuru',
  'Mangaluru'
];

// Helper to generate a realistic seat layout with INR pricing
function generateLayout(deckType: 'single' | 'double', basePrice: number): SeatConfig[][] {
  const totalRows = 8;
  const layout: SeatConfig[][] = [];
  for (let r = 1; r <= totalRows; r++) {
    const rowSeats: SeatConfig[] = [];
    const deck = r <= 4 ? 'lower' : 'upper';
    const rowPrefix = deck === 'lower' ? 'L' : 'U';
    
    const seatsInRow = ['1', '2', '3', '4'];
    seatsInRow.forEach((colNum, idx) => {
      const seatNum = `${rowPrefix}${r}${String.fromCharCode(65 + idx)}`;
      const isBooked = Math.random() < 0.25;
      const isLadies = !isBooked && Math.random() < 0.15;
      rowSeats.push({
        id: seatNum,
        number: seatNum,
        type: deckType === 'double' ? 'sleeper' : 'seater',
        deck: deckType === 'double' ? deck : 'lower',
        price: deck === 'upper' ? basePrice + 100 : basePrice,
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
    operator: 'VRL Travels',
    busType: 'AC Sleeper (2+1)',
    from: 'Bengaluru',
    to: 'Mumbai',
    departureTime: '07:00 PM',
    arrivalTime: '08:30 AM',
    duration: '13h 30m',
    price: 1450,
    originalPrice: 1750,
    rating: 4.7,
    totalReviews: 428,
    availableSeats: 12,
    totalSeats: 32,
    amenities: ['WiFi', 'Charging Port', 'Blanket', 'Water Bottle', 'Live Tracking'],
    boardingPoints: [
      { id: 'bp-1', time: '06:45 PM', location: 'Majestic Bus Stand, Platform 4' },
      { id: 'bp-2', time: '07:15 PM', location: 'Electronic City Toll Plaza' }
    ],
    droppingPoints: [
      { id: 'dp-1', time: '08:00 AM', location: 'Dadar East, Near Bus Depot' },
      { id: 'dp-2', time: '08:30 AM', location: 'Borivali West, National Park' }
    ],
    deckType: 'double',
    layout: generateLayout('double', 1450)
  },
  {
    id: 'bus-2',
    operator: 'Orange Tours & Travels',
    busType: 'Volvo Multi-Axle AC',
    from: 'Bengaluru',
    to: 'Goa',
    departureTime: '08:00 PM',
    arrivalTime: '08:00 AM',
    duration: '12h 00m',
    price: 1200,
    originalPrice: 1500,
    rating: 4.8,
    totalReviews: 612,
    availableSeats: 8,
    totalSeats: 32,
    amenities: ['WiFi', 'Charging Port', 'Snacks', 'Water Bottle', 'Entertainment', 'Live Tracking'],
    boardingPoints: [
      { id: 'bp-3', time: '07:45 PM', location: 'Anand Rao Circle' },
      { id: 'bp-4', time: '08:15 PM', location: 'Yeshwantpur Railway Station' }
    ],
    droppingPoints: [
      { id: 'dp-3', time: '07:30 AM', location: 'Panaji KTC Bus Stand' },
      { id: 'dp-4', time: '08:00 AM', location: 'Mapusa Bus Stand' }
    ],
    deckType: 'double',
    layout: generateLayout('double', 1200)
  },
  {
    id: 'bus-3',
    operator: 'KSRTC Airavat',
    busType: 'Volvo Multi-Axle AC',
    from: 'Bengaluru',
    to: 'Hyderabad',
    departureTime: '09:30 PM',
    arrivalTime: '06:30 AM',
    duration: '9h 00m',
    price: 950,
    originalPrice: 1100,
    rating: 4.6,
    totalReviews: 380,
    availableSeats: 15,
    totalSeats: 32,
    amenities: ['Water Bottle', 'Charging Port', 'Blanket', 'Live Tracking'],
    boardingPoints: [
      { id: 'bp-5', time: '09:15 PM', location: 'Kempegowda Bus Station (Majestic)' }
    ],
    droppingPoints: [
      { id: 'dp-5', time: '06:30 AM', location: 'MGBS Hyderabad' }
    ],
    deckType: 'double',
    layout: generateLayout('double', 950)
  },
  {
    id: 'bus-4',
    operator: 'Neeta Travels',
    busType: 'AC Sleeper (2+1)',
    from: 'Mumbai',
    to: 'Goa',
    departureTime: '06:00 PM',
    arrivalTime: '07:00 AM',
    duration: '13h 00m',
    price: 1600,
    originalPrice: 1900,
    rating: 4.5,
    totalReviews: 290,
    availableSeats: 10,
    totalSeats: 32,
    amenities: ['WiFi', 'Charging Port', 'Blanket', 'Pillow', 'Water Bottle', 'Live Tracking'],
    boardingPoints: [
      { id: 'bp-6', time: '05:45 PM', location: 'Mumbai Central' },
      { id: 'bp-7', time: '06:15 PM', location: 'Vashi Highway' }
    ],
    droppingPoints: [
      { id: 'dp-6', time: '06:45 AM', location: 'Mapusa' },
      { id: 'dp-7', time: '07:00 AM', location: 'Panaji Bus Stand' }
    ],
    deckType: 'double',
    layout: generateLayout('double', 1600)
  },
  {
    id: 'bus-5',
    operator: 'SRS Travels',
    busType: 'Luxury Scania AC',
    from: 'Bengaluru',
    to: 'Chennai',
    departureTime: '10:00 PM',
    arrivalTime: '04:30 AM',
    duration: '6h 30m',
    price: 850,
    originalPrice: 1000,
    rating: 4.7,
    totalReviews: 540,
    availableSeats: 18,
    totalSeats: 32,
    amenities: ['WiFi', 'Charging Port', 'Snacks', 'Beverages', 'Live Tracking'],
    boardingPoints: [
      { id: 'bp-8', time: '09:45 PM', location: 'Madiwala Checkpost' }
    ],
    droppingPoints: [
      { id: 'dp-8', time: '04:30 AM', location: 'Koyambedu CMBT' }
    ],
    deckType: 'double',
    layout: generateLayout('double', 850)
  },
  {
    id: 'bus-6',
    operator: 'Jabbar Travels',
    busType: 'AC Sleeper (2+1)',
    from: 'Delhi',
    to: 'Jaipur',
    departureTime: '09:00 PM',
    arrivalTime: '03:30 AM',
    duration: '6h 30m',
    price: 900,
    originalPrice: 1150,
    rating: 4.4,
    totalReviews: 210,
    availableSeats: 14,
    totalSeats: 32,
    amenities: ['WiFi', 'Charging Port', 'Blanket', 'Water Bottle', 'Live Tracking'],
    boardingPoints: [
      { id: 'bp-9', time: '08:45 PM', location: 'Dhaula Kuan Metro Station' }
    ],
    droppingPoints: [
      { id: 'dp-9', time: '03:30 AM', location: 'Sindhi Camp Bus Stand' }
    ],
    deckType: 'double',
    layout: generateLayout('double', 900)
  },
  {
    id: 'bus-7',
    operator: 'Kallada Travels',
    busType: 'Volvo Multi-Axle AC',
    from: 'Bengaluru',
    to: 'Kochi',
    departureTime: '08:30 PM',
    arrivalTime: '05:30 AM',
    duration: '9h 00m',
    price: 1150,
    originalPrice: 1350,
    rating: 4.8,
    totalReviews: 780,
    availableSeats: 6,
    totalSeats: 32,
    amenities: ['WiFi', 'Charging Port', 'Water Bottle', 'Snacks', 'Live Tracking'],
    boardingPoints: [
      { id: 'bp-10', time: '08:15 PM', location: 'Silk Board Junction' }
    ],
    droppingPoints: [
      { id: 'dp-10', time: '05:30 AM', location: 'Vytilla Hub, Kochi' }
    ],
    deckType: 'double',
    layout: generateLayout('double', 1150)
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
    answer: 'Passengers must carry a valid government-issued photo ID (Aadhaar Card, PAN Card, Driver\'s License, or Passport) along with a digital or printed copy of the booking confirmation / ticket.'
  },
  {
    question: 'Can I modify my travel date after booking?',
    answer: 'Currently, ticket dates cannot be directly modified. You will need to cancel your existing booking and book a new ticket for the desired date.'
  }
];
