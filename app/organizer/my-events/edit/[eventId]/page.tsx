// app/organizer/my-events/edit/[eventId]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ImageUploader from '@/components/ImageUploader';
import { getEventById, updateEvent } from '@/lib/api'; // <-- 1. Import our API functions

const EditEventPage = () => {
  const router = useRouter();
  const params = useParams();
  const eventId = params.eventId as string;

  // 2. Add loading/error state and change price/capacity to string for form compatibility
  const [formData, setFormData] = useState({ name: '', description: '', location: '', date: '', time: '', price: '', capacity: '', eventImage: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // 3. Fetch the existing event data when the page loads
  useEffect(() => {
    if (eventId) {
      const fetchEventData = async () => {
        try {
          const eventToEdit = await getEventById(eventId);

          // Format the data from the backend to fit our form's state
          const eventDate = new Date(eventToEdit.date);
          setFormData({
            name: eventToEdit.name,
            description: eventToEdit.description,
            location: eventToEdit.location,
            date: eventDate.toISOString().split('T')[0], // "YYYY-MM-DD"
            time: eventDate.toTimeString().substring(0, 5), // "HH:MM"
            price: String(eventToEdit.ticketPrice),
            capacity: String(eventToEdit.capacity),
            eventImage: eventToEdit.eventImage || '',
          });
        } catch (err) {
          console.error("Failed to fetch event data:", err);
          setError("Could not load event data.");
        } finally {
          setIsLoading(false);
        }
      };
      fetchEventData();
    }
  }, [eventId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleImageSelect = (newImageUrl: string) => {
    setFormData(prevState => ({ ...prevState, eventImage: newImageUrl }));
  };

  // --- 4. THIS IS THE UPDATED SUBMIT FUNCTION ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const eventDateTime = new Date(`${formData.date}T${formData.time}`);
    const eventData = {
      name: formData.name,
      description: formData.description,
      location: formData.location,
      date: eventDateTime.toISOString(),
      ticketPrice: Number(formData.price),
      capacity: Number(formData.capacity),
      eventImage: formData.eventImage,
    };

    try {
      await updateEvent(eventId, eventData);
      alert('Event updated successfully!');
      router.push('/organizer/my-events');
    } catch (err: any) {
      console.error('Failed to update event:', err.response?.data || err);
      const errorMessage = err.response?.data?.message || 'Failed to update event.';
      setError(errorMessage);
      alert(`Error: ${errorMessage}`);
    }
  };

  if (isLoading) {
    return <div className="bg-black min-h-screen text-white text-center py-20">Loading event editor...</div>;
  }

  if (error) {
    return <div className="bg-black min-h-screen text-white text-center py-20 text-red-500">{error}</div>;
  }

  // --- 5. YOUR ENTIRE UI REMAINS EXACTLY THE SAME ---
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
              <label htmlFor="capacity" className="block text-sm font-medium text-gray-300 mb-2">Capacity (Max Tickets)</label>
              <input type="number" name="capacity" id="capacity" min="1" value={formData.capacity} onChange={handleChange} className="w-full bg-black/20 border border-white/10 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Upload Image or Banner</label>
              <div className="bg-black/20 border border-dashed border-white/20 rounded-lg p-6">
                <ImageUploader
                    onImageSelect={handleImageSelect}
                    currentImageUrl={formData.eventImage}
                    variant="rectangle"
                    buttonText="Upload New Banner"
                />
              </div>
            </div>
            <div className="flex justify-end items-center gap-4 pt-4">
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