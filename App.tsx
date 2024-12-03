import RootNavigator from 'app/navigator/RootNavigator';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function App() {
    return (
        <SafeAreaProvider>
            <StatusBar style="auto" />
            <RootNavigator />
        </SafeAreaProvider>
    );
}
export default App;
