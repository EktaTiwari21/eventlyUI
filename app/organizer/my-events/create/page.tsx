// app/organizer/my-events/create/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ImageUploader from '@/components/ImageUploader';
import { createEvent } from '@/lib/api';

const CreateEventPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    date: '',
    time: '',
    price: '',
    capacity: '', // <-- 1. ADD 'capacity' TO OUR FORM STATE
    imageUrl: '',
  });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleImageSelect = (newImageUrl: string) => {
    setFormData(prevState => ({ ...prevState, imageUrl: newImageUrl }));
  };

  const handleSaveDraft = () => {
    console.log('Saving as draft:', formData);
    alert('Draft functionality is not yet implemented.');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const eventDateTime = new Date(`${formData.date}T${formData.time}`);

    const eventData = {
      name: formData.title,
      description: formData.description,
      location: formData.location,
      date: eventDateTime.toISOString(),
      ticketPrice: Number(formData.price) || 0,
      capacity: Number(formData.capacity), // <-- 2. ADD 'capacity' TO THE SUBMITTED DATA
      eventImage: formData.imageUrl, // <-- 3. FIX THE FIELD NAME from 'imageUrl' to 'eventImage'
    };

    try {
      await createEvent(eventData);
      alert('Event created successfully!');
      router.push('/organizer/my-events');
    } catch (err: any) {
      // The black box recorder is preserved for future debugging
      console.error("--- EVENT CREATION FAILED ---");
      if (err.response) {
        console.error("Error Data:", err.response.data);
      } else if (err.request) {
        console.error("Error Request: No response received.");
      } else {
        console.error('Error Message:', err.message);
      }
      console.error("-----------------------------");

      const errorMessage = err.response?.data?.message || 'Failed to create event. Please check the console for details.';
      setError(errorMessage);
      alert(`Error: ${errorMessage}`);
    }
  };

  // --- 4. YOUR UI IS PRESERVED, WITH THE NEW 'CAPACITY' FIELD ADDED ---
  return (
      <div className="bg-black min-h-screen text-white">
        <div className="container mx-auto px-4 lg:px-20 py-12">
          <h1 className="text-4xl font-bold mb-8 font-spectral">Create a New Event</h1>

          <form onSubmit={handleSubmit} className="bg-[#121212] p-8 rounded-2xl space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* ... Title and Location fields unchanged ... */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">Event Title</label>
                <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} placeholder="Enter the title of your event" className="w-full bg-black/20 border border-white/10 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none" required />
              </div>
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-300 mb-2">Event Location</label>
                <input type="text" name="location" id="location" value={formData.location} onChange={handleChange} placeholder="e.g., Grand Hyatt, New York" className="w-full bg-black/20 border border-white/10 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none" required />
              </div>
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">Event Description</label>
              <textarea name="description" id="description" rows={4} value={formData.description} onChange={handleChange} placeholder="Tell us about your event..." className="w-full bg-black/20 border border-white/10 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none" required />
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
                <input type="number" name="price" id="price" min="0" value={formData.price} onChange={handleChange} placeholder="0 for free event" className="w-full bg-black/20 border border-white/10 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none" required />
              </div>
            </div>
            {/* --- NEW CAPACITY FIELD --- */}
            <div>
              <label htmlFor="capacity" className="block text-sm font-medium text-gray-300 mb-2">Capacity (Max Tickets)</label>
              <input type="number" name="capacity" id="capacity" min="1" value={formData.capacity} onChange={handleChange} placeholder="e.g., 500" className="w-full bg-black/20 border border-white/10 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Upload Image or Banner</label>
              <div className="bg-black/20 border border-dashed border-white/20 rounded-lg p-6">
                <ImageUploader
                    onImageSelect={handleImageSelect}
                    currentImageUrl={formData.imageUrl}
                    variant="rectangle"
                    buttonText="Upload Banner"
                />
              </div>
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <div className="flex justify-end items-center gap-4 pt-4">
              <button
                  type="button"
                  onClick={handleSaveDraft}
                  className="bg-gray-700 text-white font-bold py-3 px-8 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Save Draft
              </button>
              <button type="submit" className="bg-white text-black font-bold py-3 px-8 rounded-lg hover:bg-gray-300 transition-colors">
                Create Event
              </button>
            </div>
          </form>
        </div>
      </div>
  );
};

export default CreateEventPage;