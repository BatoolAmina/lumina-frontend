import axios from 'axios';
import { getSession } from 'next-auth/react';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api/v1',
  withCredentials: true, 
});

api.interceptors.request.use(async (config) => {
  const session = await getSession();
  
  if (session?.accessToken) {
    config.headers.Authorization = `Bearer ${session.accessToken}`;
  } else if (session?.user?.email) {
    config.headers.Authorization = `Bearer ${session.user.email}`;
  }

  if (config.data instanceof FormData) {
    config.headers['Content-Type'] = 'multipart/form-data';
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage = error.response?.data?.message || error.message || "Unknown Neural Link Error";
    console.error("Neural Link Error:", errorMessage);
    
    error.friendlyMessage = errorMessage;
    
    return Promise.reject(error); 
  }
);

export default api;