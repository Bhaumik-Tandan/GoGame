import { createJSONStorage, persist } from 'zustand/middleware';
import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiHelper from '../helper/apiHelper';
interface AuthState {
    token: string | null;
    userName: string | null;
    logout: () => Promise<void>;
    login: (credentials: { userName: string; password: string }) => void;
    signup: (credentials: { userName: string; password: string }) => void;
}

const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            token: null,
            userName: null,
            logout: async () => {
                set({ token: null, userName: null });
            },
            login: async ({ userName, password }) => {
                const res=await apiHelper.post('/auth/login', { username: userName, password })
                const {token}=res.data;
                set({ token, userName });

            },
            signup: async ({ userName, password }) => {
                const res=await apiHelper.post('/auth/signup', { username: userName, password })
                const {token}=res.data;
                set({ token, userName });
            },
        }),
        {
            name: 'auth',
            storage: createJSONStorage(() => AsyncStorage), // persist in AsyncStorage
        }
    )
);

export const useAuth = useAuthStore.getState();
export const getToken = () => useAuth.token;