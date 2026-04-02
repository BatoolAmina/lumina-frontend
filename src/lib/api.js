import axios from 'axios';
import { getSession } from 'next-auth/react';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async (config) => {
  if (typeof window !== "undefined") {
    const session = await getSession();
    if (session?.accessToken) {
      config.headers.Authorization = `Bearer ${session.accessToken}`;
    }
  }

  if (config.data instanceof FormData) {
    delete config.headers['Content-Type'];
  }

  return config;
}, (error) => Promise.reject(error));

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const data = error.response?.data;
    
    const backendMessage = data?.message || data?.error || (data?.errors ? Object.values(data.errors)[0] : null);
    const errorMessage = backendMessage || error.message || "Unknown Neural Link Error";
    
    console.error("Neural Link Detailed Error:", data || error.message);
    
    error.friendlyMessage = errorMessage;
    
    if (error.response?.status === 401 && typeof window !== "undefined") {
      console.warn("Session expired. Neural link severed.");
    }

    return Promise.reject(error); 
  }
);

export default api;