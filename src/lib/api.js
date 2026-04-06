import axios from 'axios';
import { getSession, signOut } from 'next-auth/react';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api/v1',
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
  async (error) => {
    const { response } = error;
    const data = response?.data;
    
    const backendMessage = 
      data?.message || 
      data?.error || 
      (data?.errors ? Object.values(data.errors)[0] : null);

    const errorMessage = backendMessage || error.message || "Unknown Neural Link Error";
    
    console.error("Lumina Protocol Error:", {
      status: response?.status,
      message: errorMessage,
      details: data
    });

    error.friendlyMessage = errorMessage;

    if (response?.status === 401 && typeof window !== "undefined") {
      console.warn("Neural link severed: Unauthorized. Initializing Re-authentication.");
    }

    return Promise.reject(error); 
  }
);

export default api;