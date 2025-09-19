// File: components/RoleToggle.tsx
"use client";
import React from 'react';

interface RoleToggleProps {
    isOrganizer: boolean;
    setIsOrganizer: (isOrganizer: boolean) => void;
}

const RoleToggle: React.FC<RoleToggleProps> = ({ isOrganizer, setIsOrganizer }) => {
    return (
        <div className="flex items-center justify-between w-full bg-gray-900/50 border border-gray-700 rounded-lg p-1">
            <button
                onClick={() => setIsOrganizer(false)}
                className={`w-1/2 py-2 rounded-md text-sm font-medium transition-colors ${
                    !isOrganizer ? 'bg-white text-black' : 'text-gray-300'
                }`}
            >
                I want to attend
            </button>
            <button
                onClick={() => setIsOrganizer(true)}
                className={`w-1/2 py-2 rounded-md text-sm font-medium transition-colors ${
                    isOrganizer ? 'bg-white text-black' : 'text-gray-300'
                }`}
            >
                I want to create events
            </button>
        </div>
    );
};

export default RoleToggle;