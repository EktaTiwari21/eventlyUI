// lib/api.ts

import axios from 'axios';

const API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem('userToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const loginUser = async (email: string, password: string) => {
    const response = await API.post('/users/login', { email, password });
    if (response.data.token) {
        localStorage.setItem('userToken', response.data.token);
        localStorage.setItem('userInfo', JSON.stringify(response.data));
    }
    return response.data;
};

export const registerUser = async (name: string, email: string, password: string, role: string) => {
    const response = await API.post('/users/register', { name, email, password, role });
    return response.data;
};

export const getEvents = async () => {
    const response = await API.get('/events');
    return response.data;
};

export const getEventById = async (eventId: string) => {
    const response = await API.get(`/events/${eventId}`);
    return response.data;
};

export const purchaseSingleTicket = async (eventId: string) => {
    const response = await API.post('/tickets/purchase', { eventId });
    return response.data;
};

export const requestGroupTickets = async (eventId: string, attendeeEmails: string[]) => {
    const response = await API.post('/tickets/request-group', { eventId, attendeeEmails });
    return response.data;
};

export const getMyTickets = async () => {
    const response = await API.get('/tickets/mytickets');
    return response.data;
};

export const acceptTicketInvitation = async (ticketId: string) => {
    const response = await API.post(`/tickets/accept/${ticketId}`);
    return response.data;
};

export const declineTicketInvitation = async (ticketId: string) => {
    const response = await API.post(`/tickets/decline/${ticketId}`);
    return response.data;
};

export const getMyEvents = async () => {
    const response = await API.get('/events/myevents');
    return response.data;
};

interface EventData {
    name: string; description: string; location: string; date: string;
    ticketPrice: number; capacity: number; eventImage?: string;
}

export const createEvent = async (eventData: EventData) => {
    const response = await API.post('/events', eventData);
    return response.data;
};

export const updateEvent = async (eventId: string, eventData: Partial<EventData>) => {
    const response = await API.put(`/events/${eventId}`, eventData);
    return response.data;
};

export const deleteEvent = async (eventId: string) => {
    const response = await API.delete(`/events/${eventId}`);
    return response.data;
};

export const getUserProfile = async () => {
    const response = await API.get('/users/profile');
    return response.data;
}

interface KycData {
    fullName: string;
    address: string;
    governmentId: string;
}
export const submitKyc = async (kycData: KycData) => {
    const response = await API.post('/users/submit-kyc', kycData);
    return response.data;
}

export const getMyNotifications = async () => {
    const response = await API.get('/notifications');
    return response.data;
};

export const markNotificationsAsRead = async () => {
    const response = await API.put('/notifications/read');
    return response.data;
};

export const getRecentActivities = async () => {
    const response = await API.get('/activities');
    return response.data;
}

export const suggestImages = async (searchTerm: string) => {
    const response = await API.get(`/ai/suggest-images?searchTerm=${encodeURIComponent(searchTerm)}`);
    return response.data;
};

export const trackUnsplashDownload = async (downloadUrl: string) => {
    const response = await API.post('/ai/track-download', { downloadUrl });
    return response.data;
};

// --- THIS IS THE NEW FUNCTION FOR AI IMAGE GENERATION ---
export const generateImage = async (prompt: string) => {
    const response = await API.post('/ai/generate-image', { prompt });
    return response.data;
};