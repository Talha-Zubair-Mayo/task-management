import { create } from 'zustand';
import axiosInstance from '../utils/axios';

export const useTaskStore = create((set) => ({
    tasks: [],
    loading: false,
    fetchTasks: async () => {
        set({ loading: true });
        try {
            const response = await axiosInstance.get('/tasks');
            set({ tasks: response.data, loading: false });
            return response.data;
        } catch (err) {
            set({ loading: false });
            throw err;
        }
    },

    createTask: async (taskData) => {
        set({ loading: true });
        try {
            const response = await axiosInstance.post('/tasks', taskData);
            set((state) => ({
                tasks: [response.data.task, ...state.tasks],
                loading: false,
            }));
            return response.data;
        } catch (err) {
            set({ loading: false });
            throw err;
        }
    },

    updateTask: async (id, taskData) => {
        set({ loading: true });
        try {
            const response = await axiosInstance.put(`/tasks/${id}`, taskData);
            set((state) => ({
                tasks: state.tasks.map((task) => (task.id === id ? response.data.task : task)),
                loading: false,
            }));
            return response.data;
        } catch (err) {
            set({ loading: false });
            throw err;
        }
    },

    deleteTask: async (id) => {
        set({ loading: true });
        try {
            await axiosInstance.delete(`/tasks/${id}`);
            set((state) => ({
                tasks: state.tasks.filter((task) => task.id !== id),
                loading: false,
            }));
            return true;
        } catch (err) {
            set({ loading: false });
            throw err;
        }
    },
})); 