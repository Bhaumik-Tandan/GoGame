import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import PAGES from '../constants/pages';
import LoginScreen from '../pages/LoginScreen';

const Stack = createNativeStackNavigator();

const AuthNavigator = (
        <Stack.Navigator>
            <Stack.Group>
              
                <Stack.Screen
                    name={PAGES.LOGIN}
                    component={LoginScreen}
                    options={{
                        animation: 'fade',
                    }}
                />

            </Stack.Group>
        </Stack.Navigator>
);

export default AuthNavigator;
