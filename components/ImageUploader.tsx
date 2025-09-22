// components/ImageUploader.tsx
'use client';

import React, { useRef, useState } from 'react';

// Define the props for our ImageUploader component
interface ImageUploaderProps {
  currentImageUrl?: string; // Optional URL of the current image
  onImageSelect: (imageUrl: string) => void; // Callback when an image is selected
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ currentImageUrl, onImageSelect }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  // State to hold the URL of the image selected by the user
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);

  // This function is called when the hidden file input changes (i.e., a file is selected)
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Get the first selected file
    if (file) {
      const reader = new FileReader(); // FileReader can read the contents of files
      reader.onloadend = () => {
        const imageUrl = reader.result as string; // The result is a data URL (base64 string)
        setSelectedImageUrl(imageUrl); // Update local state for preview
        onImageSelect(imageUrl); // Call the prop function to pass the URL to the parent
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  // This function is called when the "Change Photo" button is clicked
  const handleClick = () => {
    fileInputRef.current?.click(); // Programmatically click the hidden file input
  };

  // Determine the image to display: selected first, then current, then fallback
  const displayImageUrl = selectedImageUrl || currentImageUrl || 'https://via.placeholder.com/150?text=No+Image';

  return (
    <div className="flex flex-col items-center">
      {/* Display the selected/current image or a placeholder */}
      <img
        src={displayImageUrl}
        alt="Profile"
        className="w-32 h-32 rounded-full mb-4 object-cover border-2 border-gray-700"
      />

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden" // Keep this input hidden
        accept="image/*" // Only allow image files
      />

      {/* Button to trigger the file input */}
      <button
        type="button"
        onClick={handleClick}
        className="bg-[#1E1E1E] hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg w-full"
      >
        Change Photo
      </button>
    </div>
  );
};

export default ImageUploader;