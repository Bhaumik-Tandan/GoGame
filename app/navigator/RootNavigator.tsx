import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FeedHeader from 'app/components/FeedHeader';
import PAGES from 'app/constants/pages';
const Stack = createNativeStackNavigator();

function RootNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen component={FeedScreen} name={PAGES.FEED} options={{ header: (props) => <FeedHeader /> }} />
               
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default RootNavigator;
