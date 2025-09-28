// app/organizer/my-events/edit/[eventId]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ImageUploader from '@/components/ImageUploader';

const allEventsData = [
    { id: 'gt-2025', name: 'Global Tech Summit 2025', description: 'The biggest tech summit of the year.', location: 'San Francisco, CA', date: '2025-11-12', time: '09:00', price: '57200', imageUrl: '/images/hero-bg.jpg' },
    { id: 'smf-2024', name: 'Summer Music Fest 2024', description: 'Three days of music and fun.', location: 'The Grand Park', date: '2024-08-15', time: '12:00', price: '0', imageUrl: '' },
    { id: 'ade-2024', name: 'Art & Design Expo 2024', description: 'Explore modern art from global artists.', location: 'Metropolitan Expo Center', date: '2024-07-22', time: '10:00', price: '88000', imageUrl: '' },
];


const EditEventPage = () => {
  const router = useRouter();
  const params = useParams();
  const eventId = params.eventId;

  const [formData, setFormData] = useState({ name: '', description: '', location: '', date: '', time: '', price: '', imageUrl: '' });

  useEffect(() => {
    if (eventId) {
      const eventToEdit = allEventsData.find(event => event.id === eventId);
      if (eventToEdit) {
        setFormData(eventToEdit);
      }
    }
  }, [eventId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleImageSelect = (newImageUrl: string) => {
    setFormData(prevState => ({ ...prevState, imageUrl: newImageUrl }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Updating Event:', formData);
    alert('Event updated successfully! (Check console for data)');
    // --- FIX: Corrected redirect path ---
    router.push('/organizer/my-events');
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="container mx-auto px-4 lg:px-20 py-12">
        <h1 className="text-4xl font-bold mb-8 font-spectral">Edit Event</h1>

        <form onSubmit={handleSubmit} className="bg-[#121212] p-8 rounded-2xl space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Event Title</label>
              <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className="w-full bg-black/20 border border-white/10 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-300 mb-2">Event Location</label>
              <input type="text" name="location" id="location" value={formData.location} onChange={handleChange} className="w-full bg-black/20 border border-white/10 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none" required />
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">Event Description</label>
            <textarea name="description" id="description" rows={4} value={formData.description} onChange={handleChange} className="w-full bg-black/20 border border-white/10 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none" required />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-2">Event Date</label>
              <input type="date" name="date" id="date" value={formData.date} onChange={handleChange} className="w-full bg-black/20 border border-white/10 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none" style={{ colorScheme: 'dark' }} required />
            </div>
            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-300 mb-2">Event Time</label>
              <input type="time" name="time" id="time" value={formData.time} onChange={handleChange} className="w-full bg-black/20 border border-white/10 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none" style={{ colorScheme: 'dark' }} required />
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-300 mb-2">Ticket Price (₹)</label>
              <input type="number" name="price" id="price" min="0" value={formData.price} onChange={handleChange} className="w-full bg-black/20 border border-white/10 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none" required />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Upload Image or Banner</label>
            <div className="bg-black/20 border border-dashed border-white/20 rounded-lg p-6">
              <ImageUploader
                onImageSelect={handleImageSelect}
                currentImageUrl={formData.imageUrl}
                variant="rectangle"
                buttonText="Upload New Banner"
              />
            </div>
          </div>

          <div className="flex justify-end items-center gap-4 pt-4">
            {/* --- FIX: Corrected redirect path --- */}
            <button type="button" onClick={() => router.push('/organizer/my-events')} className="bg-gray-700 text-white font-bold py-3 px-8 rounded-lg hover:bg-gray-600 transition-colors">
              Cancel
            </button>
            <button type="submit" className="bg-white text-black font-bold py-3 px-8 rounded-lg hover:bg-gray-300 transition-colors">
              Update Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEventPage;