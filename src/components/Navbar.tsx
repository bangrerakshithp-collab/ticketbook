import React from 'react';
import { Bus as BusIcon, Ticket, HelpCircle, User, ShieldCheck, LogOut, LogIn } from 'lucide-react';

interface NavbarProps {
  activeTab: 'search' | 'bookings' | 'help';
  setActiveTab: (tab: 'search' | 'bookings' | 'help') => void;
  myBookingsCount: number;
  user: { email: string; name: string } | null;
  onOpenLogin: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  myBookingsCount,
  user,
  onOpenLogin,
  onLogout
}) => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setActiveTab('search')}
          >
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <BusIcon className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-900">Bus<span className="text-blue-600">Go</span></span>
              <span className="block text-[10px] font-medium text-slate-500 uppercase tracking-widest">Supabase + Express Backend</span>
            </div>
          </div>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => setActiveTab('search')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'search'
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <BusIcon className="w-4 h-4" />
              Find Buses
            </button>
            <button
              onClick={() => setActiveTab('bookings')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors relative ${
                activeTab === 'bookings'
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Ticket className="w-4 h-4" />
              My Bookings
              {myBookingsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                  {myBookingsCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('help')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'help'
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              Help & FAQs
            </button>
          </nav>

          {/* User profile / Login button */}
          <div className="flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex flex-col text-right">
                  <span className="text-xs font-bold text-slate-900">{user.name}</span>
                  <span className="text-[10px] text-slate-500">{user.email}</span>
                </div>
                <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm border border-blue-200">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <button
                  onClick={onLogout}
                  title="Sign Out"
                  className="p-2 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenLogin}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-xs shadow-md shadow-blue-600/30 transition-all"
              >
                <LogIn className="w-4 h-4" />
                Sign In
              </button>
            )}
          </div>
        </div>

        {/* Mobile bottom / secondary nav */}
        <div className="md:hidden flex items-center justify-around py-2 border-t border-slate-100">
          <button
            onClick={() => setActiveTab('search')}
            className={`flex flex-col items-center gap-1 text-xs font-medium ${
              activeTab === 'search' ? 'text-blue-600' : 'text-slate-500'
            }`}
          >
            <BusIcon className="w-4 h-4" />
            Search
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`flex flex-col items-center gap-1 text-xs font-medium relative ${
              activeTab === 'bookings' ? 'text-blue-600' : 'text-slate-500'
            }`}
          >
            <Ticket className="w-4 h-4" />
            Bookings
            {myBookingsCount > 0 && (
              <span className="absolute -top-1 right-2 bg-blue-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {myBookingsCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('help')}
            className={`flex flex-col items-center gap-1 text-xs font-medium ${
              activeTab === 'help' ? 'text-blue-600' : 'text-slate-500'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            Help
          </button>
        </div>
      </div>
    </header>
  );
};
