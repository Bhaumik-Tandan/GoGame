import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import PAGES from '../constants/pages';
import LoginScreen from '../pages/LoginScreen';
import SignupScreen from 'app/pages/SignUpScreen';

const Stack = createNativeStackNavigator();

const AuthNavigator = (
        <Stack.Navigator>
            <Stack.Group 
            screenOptions={{
                headerShown: false,
            }}
            >
              
            <Stack.Screen
                    name={PAGES.SIGNUP}
                    component={SignupScreen}
                    />
                    
                <Stack.Screen
                    name={PAGES.LOGIN}
                    component={LoginScreen}
                />
                   

            </Stack.Group>
        </Stack.Navigator>
);

export default AuthNavigator;
