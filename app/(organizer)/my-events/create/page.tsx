// app/(organizer)/my-events/create/page.tsx
'use client';

import { useState } from 'react';
import ImageUploader from '@/components/ImageUploader';

const CreateEventPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    date: '',
    time: '',
    price: '',
    imageUrl: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleImageSelect = (newImageUrl: string) => {
    setFormData(prevState => ({ ...prevState, imageUrl: newImageUrl }));
  };

  const handleSaveDraft = () => {
    // In a real app, this would save the formData to the backend with a 'draft' status
    console.log('Saving as draft:', formData);
    alert('Event saved as a draft! (Check console for data)');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save the formData to the backend with a 'published' status
    console.log('Form Submitted:', formData);
    alert('Event created successfully! (Check console for data)');
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="container mx-auto px-4 lg:px-20 py-12">
        <h1 className="text-4xl font-bold mb-8 font-spectral">Create a New Event</h1>

        <form onSubmit={handleSubmit} className="bg-[#121212] p-8 rounded-2xl space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

          {/* --- CHANGE: Added the "Save Draft" button --- */}
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