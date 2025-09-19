// File: components/AuthInput.tsx
"use client";
import React from 'react';

interface AuthInputProps {
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    icon?: React.ReactNode;
}

const AuthInput: React.FC<AuthInputProps> = ({ type, placeholder, value, onChange, icon }) => {
    return (
        <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {icon}
            </div>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="w-full bg-gray-900/50 border border-gray-700 text-white rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
        </div>
    );
};

export default AuthInput;