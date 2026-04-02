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
  let session = null;
  
  if (typeof window !== "undefined") {
    session = await getSession();
  }
  
  if (session?.accessToken) {
    config.headers.Authorization = `Bearer ${session.accessToken}`;
  }

  if (config.data instanceof FormData) {
    delete config.headers['Content-Type'];
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const backendMessage = error.response?.data?.error || error.response?.data?.message;
    const errorMessage = backendMessage || error.message || "Unknown Neural Link Error";
    
    console.error("Neural Link Error:", errorMessage);
    
    error.friendlyMessage = errorMessage;
    
    if (error.response?.status === 401 && typeof window !== "undefined") {
      console.warn("Session expired or unauthorized. Neural link severed.");
    }

    return Promise.reject(error); 
  }
);

export default api;