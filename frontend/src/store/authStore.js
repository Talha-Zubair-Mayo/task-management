import { create } from 'zustand';
import axiosInstance from '../utils/axios';

const getToken = () => localStorage.getItem('token');

export const useAuthStore = create((set) => {
    // Check for token on initialization
    const token = getToken();
    return {
        user: null,
        loading: false,
        isAuthenticated: !!token,
    login: async (credentials) => {
        set({ loading: true });
        try {
            const response = await axiosInstance.post('/auth/login', credentials);
            localStorage.setItem('token', response.data.token);
            set({ user: response.data.user, loading: false, isAuthenticated: true });
            return response.data;
        } catch (err) {
            set({ loading: false, isAuthenticated: false });
            throw err;
        }
    },
    register: async (userData) => {
        set({ loading: true });
        try {
            const response = await axiosInstance.post('/auth/register', userData);
            set({ loading: false });
            return response.data;
        } catch (err) {
            set({ loading: false });
            throw err;
        }
    },
    logout: () => {
        localStorage.removeItem('token');
        set({ user: null, isAuthenticated: false });
    },
    checkAuth: () => {
        const token = getToken();
        set({ isAuthenticated: !!token });
    },
};
}); 