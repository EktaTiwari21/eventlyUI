// components/ImageUploader.tsx
'use client';

import React, { useRef, useState } from 'react';

// NEW: We add props to control the variant (shape) and text
interface ImageUploaderProps {
  currentImageUrl?: string;
  onImageSelect: (imageUrl: string) => void;
  variant?: 'circle' | 'rectangle';
  buttonText?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  currentImageUrl,
  onImageSelect,
  variant = 'circle', // Default to circle
  buttonText = 'Change Photo', // Default button text
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        setPreviewUrl(imageUrl);
        onImageSelect(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const displayUrl = previewUrl || currentImageUrl;

  // NEW: Conditional styles based on the 'variant' prop
  const containerStyles = variant === 'circle'
    ? "w-32 h-32 rounded-full mb-4 object-cover border-2 border-gray-700"
    : "w-full aspect-video rounded-lg object-cover";

  return (
    <div className="flex flex-col items-center w-full">
      {displayUrl ? (
        <img
          src={displayUrl}
          alt="Upload preview"
          className={containerStyles}
        />
      ) : (
        // Placeholder for when no image is selected
        <div className={`flex items-center justify-center bg-black/30 text-gray-500 ${containerStyles}`}>
          {variant === 'rectangle' ? 'Banner Preview' : 'Photo'}
        </div>
      )}

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
      />

      <button
        type="button"
        onClick={handleClick}
        className="bg-[#2a2a2a] hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-lg w-full mt-4"
      >
        {buttonText}
      </button>
    </div>
  );
};

export default ImageUploader;