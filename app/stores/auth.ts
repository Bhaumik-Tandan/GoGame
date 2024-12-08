import { createJSONStorage, persist } from 'zustand/middleware';
import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiHelper from '../helper/apiHelper';

interface AuthState {
    token: string | null;
    username: string | null;
    logout: () => Promise<void>;
    login: (credentials: { username: string; password: string }) => void;
    signup: (credentials: { username: string; password: string }) => void;
}

const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            token: null,
            username: null,
            logout: async () => {
                set({ token: null, username: null });
            },
            login: async ({ username, password }) => {
                const res = await apiHelper.post('/auth/login', { username, password });
                const { token } = res.data;
                set({ token, username });
            },
            signup: async ({ username, password }) => {
                const res = await apiHelper.post('/auth/signup', { username, password });
                const { token } = res.data;
                set({ token, username });
            },
        }),
        {
            name: 'auth',
            storage: createJSONStorage(() => AsyncStorage), // persist in AsyncStorage
        }
    )
);

export const useAuth = useAuthStore;
export const getTokens = () => useAuthStore.getState().token;