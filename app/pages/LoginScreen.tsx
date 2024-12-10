import React, { useState, useCallback } from 'react';
import { 
  SafeAreaView, 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform, 
  Alert,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { calcWidth } from 'app/helper/res';
import { useAuth } from 'app/stores/auth';
import PAGES from 'app/constants/pages';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigation = useNavigation();

  const handleLogin = useCallback(async () => {
    // Trim whitespace from inputs
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    // Validate inputs
    if (!trimmedUsername || !trimmedPassword) {
      Alert.alert('Error', 'Please enter both username and password.');
      return;
    }

    // Prevent multiple simultaneous login attempts
    if (isLoading) return;

    try {
      setIsLoading(true);
      await login({ username: trimmedUsername, password: trimmedPassword });
    } catch (err) {
      Alert.alert(
        'Login Failed', 
        err.message || 'An unexpected error occurred. Please try again.',
        [{ text: 'OK', onPress: () => setIsLoading(false) }]
      );
    } finally {
      setIsLoading(false);
    }
  }, [username, password, isLoading, login]);

  const handleSignUp = useCallback(() => {
    navigation.navigate(PAGES.SIGNUP);
  }, [navigation]);

  const togglePasswordVisibility = useCallback(() => {
    setIsPasswordVisible(prev => !prev);
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardContainer}
        >
          <View style={styles.loginContainer}>
            <Text style={styles.title}>Welcome Back</Text>
            
            <View style={styles.inputContainer}>
              <Ionicons 
                name="person-outline" 
                size={20} 
                color="#666" 
                style={styles.inputIcon} 
              />
              <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="username"
                returnKeyType="next"
                blurOnSubmit={false}
                onSubmitEditing={() => {/* Focus password input */}}
              />
            </View>
            
            <View style={styles.inputContainer}>
              <Ionicons 
                name="lock-closed-outline" 
                size={20} 
                color="#666" 
                style={styles.inputIcon} 
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!isPasswordVisible}
                textContentType="password"
                autoCorrect={false}
                returnKeyType="go"
                onSubmitEditing={handleLogin}
              />
              <TouchableOpacity 
                onPress={togglePasswordVisibility} 
                style={styles.passwordVisibilityToggle}
              >
                <Ionicons 
                  name={isPasswordVisible ? "eye-off-outline" : "eye-outline"} 
                  size={20} 
                  color="#666" 
                />
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity 
              style={[
                styles.loginButton, 
                isLoading && styles.loginButtonDisabled
              ]}
              onPress={handleLogin}
              disabled={isLoading}
              accessible
              accessibilityLabel="Login"
              accessibilityState={{ disabled: isLoading }}
            >
              <Text style={styles.loginButtonText}>
                {isLoading ? 'Logging in...' : 'Login'}
              </Text>
            </TouchableOpacity>

            <View style={styles.signUpPrompt}>
              <Text style={styles.signUpText}>Don't have an account? </Text>
              <TouchableOpacity 
                onPress={handleSignUp}
                accessible
                accessibilityLabel="Sign Up"
              >
                <Text style={styles.signUpButtonText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  keyboardContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: calcWidth(2),
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: calcWidth(3),
  },
  inputIcon: {
    marginLeft: calcWidth(2),
    marginRight: calcWidth(1),
  },
  input: {
    flex: 1,
    height: calcWidth(6),
    paddingRight: calcWidth(2),
  },
  passwordVisibilityToggle: {
    padding: calcWidth(1),
    marginRight: calcWidth(1),
  },
  loginButton: {
    backgroundColor: '#007bff',
    padding: calcWidth(2),
    borderRadius: 5,
    alignItems: 'center',
  },
  loginButtonDisabled: {
    opacity: 0.6,
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  signUpPrompt: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: calcWidth(2),
  },
  signUpText: {
    color: '#666',
  },
  signUpButtonText: {
    color: '#007bff',
    fontSize: 14,
  },
});

export default LoginScreen;