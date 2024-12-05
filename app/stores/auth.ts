import { createJSONStorage, persist } from 'zustand/middleware';
import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
    token: string | null;
    userName: string | null;
    logout: () => Promise<void>;
    login: (credentials: { userName: string; password: string }) => void;
}

const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            token: null,
            userName: null,
            logout: async () => {
                set({ token: null, userName: null });
            },
            login: ({ userName, password }) => {
                const randomToken = Math.random().toString(36).substring(2);
                set({ token: randomToken, userName });
            },
        }),
        {
            name: 'auth',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);

export const useAuth = useAuthStore;
export const getToken = () => useAuthStore.getState().token;
