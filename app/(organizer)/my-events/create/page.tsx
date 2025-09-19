// File: app/(organizer)/my-events/create/page.tsx
"use client";

import AuthInput from "@/components/AuthInput"; // We can reuse this from our login form
import ImageUploader from "@/components/ImageUploader";

export default function CreateEventPage() {
    return (
        <div className="p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8">Create New Event</h1>

                <div className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-xl p-8 shadow-2xl">
                    <form className="space-y-6">

                        {/* Event Title */}
                        <div>
                            <label htmlFor="event-title" className="block text-gray-300 text-sm font-semibold mb-2">Event Title</label>
                            <AuthInput type="text" placeholder="Enter the title of your event" value="" onChange={() => {}} />
                        </div>

                        {/* Event Description */}
                        <div>
                            <label htmlFor="event-description" className="block text-gray-300 text-sm font-semibold mb-2">Event Description</label>
                            <textarea
                                id="event-description"
                                rows={5}
                                className="w-full bg-gray-900/50 border border-gray-700 text-white rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-white/50"
                                placeholder="Tell us about your event..."
                            />
                        </div>

                        {/* Event Location */}
                        <div>
                            <label htmlFor="event-location" className="block text-gray-300 text-sm font-semibold mb-2">Event Location</label>
                            <AuthInput type="text" placeholder="e.g., Grand Hyatt, New York" value="" onChange={() => {}} />
                        </div>

                        {/* Date and Time (in a grid) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="event-date" className="block text-gray-300 text-sm font-semibold mb-2">Event Date</label>
                                <AuthInput type="date" placeholder="" value="" onChange={() => {}} />
                            </div>
                            <div>
                                <label htmlFor="event-time" className="block text-gray-300 text-sm font-semibold mb-2">Event Time</label>
                                <AuthInput type="time" placeholder="" value="" onChange={() => {}} />
                            </div>
                        </div>

                        {/* Image Uploader */}
                        <ImageUploader />

                        {/* Action Buttons */}
                        <div className="flex justify-end space-x-4 pt-4">
                            <button type="button" className="bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg hover:bg-gray-600 transition-colors">
                                Save as Draft
                            </button>
                            <button type="submit" className="bg-white text-black font-semibold py-2 px-6 rounded-lg hover:bg-gray-200 transition-colors">
                                Create Event
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}