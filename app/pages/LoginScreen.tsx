import React, { useState } from 'react';
import { 
  SafeAreaView, 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { calcWidth } from 'app/helper/res';
// import { useAuth } from 'app/stores/auth';
import PAGES from 'app/constants/pages';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const { login } = useAuth();
  const navigation = useNavigation();

  const handleLogin = () => {
    // login({ userName: username, password });
  };

  const handleSignUp = () => {
    navigation.navigate(PAGES.SIGNUP as never, {});
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardContainer}
      >
        <View style={styles.loginContainer}>
          <Text style={styles.title}>Welcome Back</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
          
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
          
          <TouchableOpacity 
            style={styles.loginButton}
            onPress={handleLogin}
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
          <Text>Don't have an account? </Text>
          <TouchableOpacity 
            style={styles.signUpButton}
            onPress={handleSignUp}
          >
            <Text style={styles.signUpButtonText}>Sign Up</Text>
          </TouchableOpacity>
          
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: calcWidth(2),
    backgroundColor: '#f5f5f5',
  },
  keyboardContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  loginContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: calcWidth(4),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: calcWidth(4),
    color: '#333',
  },
  input: {
    height: calcWidth(6),
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: calcWidth(2),
    marginBottom: calcWidth(3),
  },
  loginButton: {
    backgroundColor: '#007bff',
    padding: calcWidth(2),
    borderRadius: 5,
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  signUpButton: {
    marginTop: calcWidth(2),
    alignItems: 'center',
  },
  signUpButtonText: {
    color: '#007bff',
    fontSize: 14,
  }
});

export default LoginScreen;