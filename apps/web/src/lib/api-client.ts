import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Only redirect to login for 401 errors on protected routes
    // Allow guest access to public endpoints
    if (error.response?.status === 401) {
      const url = error.config?.url || '';
      const protectedEndpoints = ['/auth/me', '/profile', '/feedback'];
      const isProtectedRoute = protectedEndpoints.some(endpoint => url.includes(endpoint));
      
      if (isProtectedRoute) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        // Don't auto-redirect, let the user stay on the page
        console.warn('Authentication required for this action. Please sign in.');
      }
    }
    return Promise.reject(error);
  }
);
