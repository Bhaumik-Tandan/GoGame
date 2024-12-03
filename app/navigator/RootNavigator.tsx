import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from 'app/pages/LoginScreen';
import PAGES from 'app/constants/pages';
const Stack = createNativeStackNavigator();

function RootNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen component={LoginScreen} name={PAGES.LOGIN} />
               
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default RootNavigator;
