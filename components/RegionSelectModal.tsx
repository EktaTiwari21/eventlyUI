// components/RegionSelectModal.tsx
'use client';

import { useState } from 'react';
import useUserStore from '@/stores/useUserStore';

// --- NEW: We define the props the component will receive from the layout ---
interface RegionSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CityItem = ({ name, icon, onClick }: { name: string; icon: React.ReactNode; onClick: () => void; }) => (
  <button onClick={onClick} className="flex flex-col items-center gap-2 text-center text-gray-700 hover:text-black transition-colors">
    <div className="w-16 h-16 flex items-center justify-center">{icon}</div>
    <span className="text-sm font-medium">{name}</span>
  </button>
);

const RegionSelectModal = ({ isOpen, onClose }: RegionSelectModalProps) => {
  // We only get the 'setSelectedRegion' function from the store now
  const { setSelectedRegion } = useUserStore();
  const [searchQuery, setSearchQuery] = useState('');

  const handleRegionSelect = (region: string) => {
    setSelectedRegion(region);
    onClose(); // Close the modal after selection
  };

  const popularCities = [
    { name: 'Mumbai', icon: <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V5s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg> },
    { name: 'Delhi-NCR', icon: <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h20M2 18h20M2 6h20M4 3v18M20 3v18"/></svg> },
    { name: 'Other', icon: <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg> },
  ];

  if (!isOpen) return null; // Use the 'isOpen' prop to control visibility

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center pt-20 bg-black/60 backdrop-blur-sm">
      <div className="relative bg-white w-full max-w-4xl rounded-lg shadow-lg p-6 text-black">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-black">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
        <div className="relative mb-6">
          <input type="text" placeholder="Search for your city" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full border-b-2 border-gray-300 py-2 pl-10 focus:border-red-500 focus:outline-none"/>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></div>
        </div>
        <button className="w-full text-left text-red-500 font-semibold mb-6 flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>Detect my location</button>
        <h3 className="font-semibold text-gray-600 mb-4">Popular Cities</h3>
        <div className="grid grid-cols-5 md:grid-cols-10 gap-4 mb-6">
          {popularCities.map(city => (<CityItem key={city.name} name={city.name} icon={city.icon} onClick={() => handleRegionSelect(city.name)}/>))}
        </div>
        <button className="text-red-500 font-semibold">View All Cities</button>
      </div>
    </div>
  );
};

export default RegionSelectModal;