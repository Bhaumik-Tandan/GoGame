import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from 'app/pages/LoginScreen';
import PAGES from 'app/constants/pages';
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';
import { getToken } from '../stores/auth';

function RootNavigator() {
    const token  = getToken();
    return (
        <NavigationContainer>
            {token ? <AppNavigator /> : AuthNavigator}
        </NavigationContainer>
    );
}

export default RootNavigator;
