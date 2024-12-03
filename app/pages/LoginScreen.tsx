import React from 'react';
import { SafeAreaView, StyleSheet,Text } from 'react-native';

import { calcWidth } from 'app/helper/res';

const LoginScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
           <Text>njhnn</Text>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: calcWidth(2),
    },
});

export default LoginScreen;
