import { createJSONStorage, persist } from 'zustand/middleware';
import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
            login: ({ userName, password }) => {
                const randomToken = Math.random().toString(36).substring(2);
                set({ token: randomToken, userName });
            },
            signup: async ({ userName, password }) => {
                try {
                    // Call the signup API to create a new user
                    const response = await fetch('http://localhost:3000/auth/signup', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ username: userName, password }),
                    });

                    const data = await response.json();

                    // Check if the response contains a token (indicating success)
                    if (data && data.token) {
                        // On successful signup, persist the token and username
                        set({ token: data.token, userName });
                    } else {
                        // Handle error (e.g., invalid response or failed signup)
                        console.error('Signup failed:', data.message || 'Unknown error');
                    }
                } catch (error) {
                    console.error('Error during signup:', error);
                }
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