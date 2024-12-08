import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from 'app/pages/LoginScreen';
import PAGES from 'app/constants/pages';
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';
import { getTokens } from 'app/stores/auth';
import { useEffect } from 'react';

function RootNavigator() {
    const token=getTokens();
    useEffect(() => {
        console.log('token', token);
    }
    , [token]);
    return (
        <NavigationContainer>
            {token ? <AppNavigator /> : AuthNavigator}
        </NavigationContainer>
    );
}

export default RootNavigator;
