// app/organizer/my-events/create/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ImageUploader from '@/components/ImageUploader';
import ImageSuggestionModal from '@/components/ImageSuggestionModal'; // <-- 1. IMPORT THE NEW MODAL
import { createEvent, suggestImages, generateImage } from '@/lib/api'; // <-- 2. IMPORT generateImage

const CreateEventPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    date: '',
    time: '',
    price: '',
    capacity: '',
    imageUrl: '',
  });
  const [error, setError] = useState('');
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [suggestedImages, setSuggestedImages] = useState<any[]>([]); // Use 'any' to handle Unsplash's complex object
  const [isSuggesting, setIsSuggesting] = useState(false);

  // --- ADD STATE FOR THE IMAGE GENERATION ---
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

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
      capacity: Number(formData.capacity),
      eventImage: formData.imageUrl,
    };

    try {
      await createEvent(eventData);
      alert('Event created successfully!');
      router.push('/organizer/my-events');
    } catch (err: any) {
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

  const handleSuggestImages = async () => {
    if (!formData.title) {
      alert("Please enter an event title first to get suggestions.");
      return;
    }
    setIsSuggesting(true);
    setIsModalOpen(true);
    try {
      const images = await suggestImages(formData.title);
      setSuggestedImages(images);
    } catch (error) {
      console.error("Failed to suggest images:", error);
      alert("Could not fetch image suggestions. Please try again.");
      setIsModalOpen(false);
    } finally {
      setIsSuggesting(false);
    }
  };

  const handleSelectSuggestedImage = (imageUrl: string) => {
    setFormData(prevState => ({ ...prevState, imageUrl }));
    setIsModalOpen(false);
  };

  // --- NEW FUNCTION TO HANDLE AI GENERATION ---
  const handleGenerateImage = async () => {
    if (!prompt) {
      alert("Please enter a prompt to generate an image.");
      return;
    }
    setIsGenerating(true);
    try {
      const result = await generateImage(prompt);
      // Set the newly generated image URL in the form
      setFormData(prevState => ({ ...prevState, imageUrl: result.imageUrl }));
    } catch (error) {
      console.error("Failed to generate image:", error);
      alert("Could not generate image. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };


  return (
      <div className="bg-black min-h-screen text-white">
        <div className="container mx-auto px-4 lg:px-20 py-12">
          <h1 className="text-4xl font-bold mb-8 font-spectral">Create a New Event</h1>

          <form onSubmit={handleSubmit} className="bg-[#121212] p-8 rounded-2xl space-y-6">
            {/* All other form fields are unchanged */}
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
              <label htmlFor="capacity" className="block text-sm font-medium text-gray-300 mb-2">Capacity (Max Tickets)</label>
              <input type="number" name="capacity" id="capacity" min="1" value={formData.capacity} onChange={handleChange} placeholder="e.g., 500" className="w-full bg-black/20 border border-white/10 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none" required />
            </div>

            {/* --- THIS IS THE NEW "IMAGE ASSISTANT" SECTION --- */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Event Banner</label>
              <div className="bg-black/20 border border-dashed border-white/20 rounded-lg p-6">
                <ImageUploader
                    onImageSelect={handleImageSelect}
                    currentImageUrl={formData.imageUrl}
                    variant="rectangle"
                    buttonText="Upload Banner"
                />
              </div>

              <div className="text-center mt-2">
                <button
                    type="button"
                    onClick={handleSuggestImages}
                    disabled={!formData.title || isSuggesting}
                    className="text-sm text-blue-400 hover:text-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSuggesting ? 'Searching...' : '✨ Suggest Images based on Title'}
                </button>
              </div>

              <div className="mt-6">
                <label htmlFor="ai-prompt" className="block text-sm font-medium text-gray-300 mb-2">Or, Generate a New Image with AI</label>
                <div className="flex gap-2">
                  <input
                      type="text"
                      id="ai-prompt"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="e.g., A vibrant, modern concert stage with blue lights"
                      className="w-full bg-black/20 border border-white/10 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  <button
                      type="button"
                      onClick={handleGenerateImage}
                      disabled={!prompt || isGenerating}
                      className="bg-white text-black font-bold py-3 px-6 rounded-lg hover:bg-gray-300 disabled:opacity-50"
                  >
                    {isGenerating ? 'Generating...' : 'Generate'}
                  </button>
                </div>
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

        <ImageSuggestionModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            images={suggestedImages}
            onSelect={handleSelectSuggestedImage}
            isLoading={isSuggesting}
        />
      </div>
  );
};

export default CreateEventPage;