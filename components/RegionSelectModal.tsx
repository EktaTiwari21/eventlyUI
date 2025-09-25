// components/RegionSelectModal.tsx
'use client';

import { useState } from 'react';
import useUserStore from '@/stores/useUserStore';

// --- NEW: Data structure for states and their cities ---
const regions = [
  {
    state: 'Maharashtra',
    cities: ['Mumbai', 'Pune', 'Nagpur', 'Nashik'],
  },
  {
    state: 'Karnataka',
    cities: ['Bengaluru', 'Mysuru', 'Mangaluru', 'Hubli'],
  },
  {
    state: 'Delhi',
    cities: ['Delhi-NCR'],
  },
  {
    state: 'Telangana',
    cities: ['Hyderabad', 'Warangal'],
  },
  {
    state: 'Tamil Nadu',
    cities: ['Chennai', 'Coimbatore', 'Madurai'],
  },
  {
    state: 'Gujarat',
    cities: ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot'],
  },
  {
    state: 'West Bengal',
    cities: ['Kolkata', 'Asansol', 'Siliguri'],
  },
  {
    state: 'Other',
    cities: ['Other'],
  }
];

const RegionSelectModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void; }) => {
  const { setSelectedRegion } = useUserStore();
  const [searchQuery, setSearchQuery] = useState('');

  // --- NEW: State to manage the view (states or cities) ---
  const [view, setView] = useState<'states' | 'cities'>('states');
  const [selectedState, setSelectedState] = useState<{ state: string; cities: string[] } | null>(null);

  const handleStateSelect = (state: { state: string; cities: string[] }) => {
    setSelectedState(state);
    setView('cities');
  };

  const handleCitySelect = (city: string) => {
    setSelectedRegion(city);
    onClose();
  };

  const resetView = () => {
    setView('states');
    setSelectedState(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={resetView}>
      <div className="relative bg-white w-full max-w-2xl rounded-lg shadow-lg text-black overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="p-6">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-black">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>

          <div className="relative mb-4">
            <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full border-b-2 border-gray-300 py-2 pl-10 focus:border-red-500 focus:outline-none"/>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></div>
          </div>
        </div>

        {/* --- NEW: Conditional rendering for State or City view --- */}
        <div className="p-6 border-t border-gray-200">
          {view === 'states' ? (
            <div>
              <h3 className="font-semibold text-gray-600 mb-4">Choose your State</h3>
              <div className="grid grid-cols-3 gap-4">
                {regions.map(region => (
                  <button key={region.state} onClick={() => handleStateSelect(region)} className="text-left p-2 rounded hover:bg-gray-100">
                    {region.state}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <button onClick={resetView} className="text-red-500 font-semibold mb-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                Back to States
              </button>
              <h3 className="font-semibold text-gray-600 mb-4">Choose your City</h3>
              <div className="grid grid-cols-3 gap-4">
                {selectedState?.cities.map(city => (
                  <button key={city} onClick={() => handleCitySelect(city)} className="text-left p-2 rounded hover:bg-gray-100">
                    {city}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegionSelectModal;