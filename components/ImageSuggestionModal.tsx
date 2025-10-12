// components/ImageSuggestionModal.tsx
'use client';

import Image from 'next/image';
import { trackUnsplashDownload } from '@/lib/api';

// Define the shape of the detailed image data we expect from the API
interface UnsplashImage {
    id: string;
    url: string;
    artistName: string;
    artistUrl: string;
    downloadUrl: string;
}

interface ImageSuggestionModalProps {
    isOpen: boolean;
    onClose: () => void;
    images: UnsplashImage[]; // This now correctly expects an array of objects
    onSelect: (imageUrl: string) => void;
    isLoading: boolean;
}

const ImageSuggestionModal = ({ isOpen, onClose, images, onSelect, isLoading }: ImageSuggestionModalProps) => {
    if (!isOpen) return null;

    const handleSelect = (image: UnsplashImage) => {
        // 1. Tell our backend to send the "thank you" message to Unsplash
        trackUnsplashDownload(image.downloadUrl).catch(err => console.error("Failed to track download:", err));

        // 2. Pass the selected image URL back to the form
        onSelect(image.url);
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-[#121212] border border-white/10 rounded-2xl w-full max-w-4xl p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-white">Select an Image</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">&times;</button>
                </div>

                {isLoading ? (
                    <div className="flex items-center justify-center h-64"><p className="text-gray-400">Searching for images...</p></div>
                ) : !images || images.length === 0 ? (
                    <div className="flex items-center justify-center h-64"><p className="text-gray-400">No results found. Try a different search term.</p></div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {images.map((image) => (
                            <div key={image.id} className="space-y-2">
                                {/* --- THIS IS THE CRITICAL FIX --- */}
                                {/* We now pass the full 'image' object to handleSelect */}
                                <div className="relative aspect-video rounded-lg overflow-hidden cursor-pointer group" onClick={() => handleSelect(image)}>
                                    {/* And we use 'image.url' for the src */}
                                    <Image src={image.url} alt={`Photo by ${image.artistName}`} fill className="object-cover transition-transform duration-300 group-hover:scale-105"/>
                                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors"></div>
                                </div>
                                {/* The attribution now correctly reads from 'image.artistName' and 'image.artistUrl' */}
                                <p className="text-xs text-gray-400 text-center">
                                    Photo by <a href={`${image.artistUrl}?utm_source=evently&utm_medium=referral`} target="_blank" rel="noopener noreferrer" className="underline hover:text-white">{image.artistName}</a> on <a href="https://unsplash.com/?utm_source=evently&utm_medium=referral" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">Unsplash</a>
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageSuggestionModal;