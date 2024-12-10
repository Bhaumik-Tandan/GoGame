import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import PAGES from '../constants/pages';
import { calcWidth, getFontSizeByWindowWidth } from '../helper/res';
import LoginScreen from '../pages/LoginScreen';
import { useNavigation } from '@react-navigation/native';
import HomeScreen from 'app/pages/HomeScreen';
const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    return (
            <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            >
                    <Stack.Group>
                   
                        <Stack.Screen
                            name={PAGES.HOME}
                            component={HomeScreen}  
                    />
                    
                    </Stack.Group>
                
            </Stack.Navigator>
    );
};

export default AppNavigator;
