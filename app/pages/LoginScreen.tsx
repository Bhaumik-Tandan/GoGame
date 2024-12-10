import React, { useState, useCallback, useRef } from 'react';
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
  Keyboard,
  ActivityIndicator,
  ImageBackground
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { calcWidth, calcHeight } from 'app/helper/res';
import { useAuth } from 'app/stores/auth';
import PAGES from 'app/constants/pages';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ username: '', password: '' });

  const { login } = useAuth();
  const navigation = useNavigation();
  const passwordRef = useRef(null);

  const validateInputs = () => {
    const newErrors = { username: '', password: '' };
    if (!username.trim()) newErrors.username = 'Username is required';
    if (!password) newErrors.password = 'Password is required';
    if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    setErrors(newErrors);
    return !newErrors.username && !newErrors.password;
  };

  const handleLogin = useCallback(async () => {
    if (!validateInputs()) return;
    if (isLoading) return;

    try {
      setIsLoading(true);
      await login({ username: username.trim(), password });
    } catch (err) {
      Alert.alert(
        'Login Failed', 
        err.message || 'An unexpected error occurred. Please try again.',
        [{ text: 'OK' }]
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
    <ImageBackground 
      source={{ uri: 'https://source.unsplash.com/random/?abstract,colorful' }} 
      style={styles.backgroundImage}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <SafeAreaView style={styles.container}>
          <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardContainer}
          >
            <LinearGradient
              colors={['rgba(255,255,255,0.8)', 'rgba(255,255,255,0.6)']}
              style={styles.loginContainer}
            >
              <Text style={styles.title}>Welcome Back</Text>
              
              <View style={styles.inputContainer}>
                <Ionicons 
                  name="person-outline" 
                  size={20} 
                  color="#4a4a4a" 
                  style={styles.inputIcon} 
                />
                <TextInput
                  style={styles.input}
                  placeholder="Username"
                  placeholderTextColor="#4a4a4a"
                  value={username}
                  onChangeText={setUsername}
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="next"
                  onSubmitEditing={() => passwordRef.current?.focus()}
                />
              </View>
              {errors.username ? <Text style={styles.errorText}>{errors.username}</Text> : null}
              
              <View style={styles.inputContainer}>
                <Ionicons 
                  name="lock-closed-outline" 
                  size={20} 
                  color="#4a4a4a" 
                  style={styles.inputIcon} 
                />
                <TextInput
                  ref={passwordRef}
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="#4a4a4a"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!isPasswordVisible}
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
                    color="#4a4a4a" 
                  />
                </TouchableOpacity>
              </View>
              {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
              
              <TouchableOpacity 
                style={styles.loginButton}
                onPress={handleLogin}
                disabled={isLoading}
                accessible
                accessibilityLabel="Login"
                accessibilityState={{ disabled: isLoading }}
              >
                {isLoading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text style={styles.loginButtonText}>Login</Text>
                )}
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
            </LinearGradient>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
  },
  keyboardContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: calcWidth(4),
  },
  loginContainer: {
    borderRadius: 20,
    padding: calcWidth(5),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: calcHeight(4),
    color: '#4a4a4a',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    marginBottom: calcHeight(2),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  inputIcon: {
    marginLeft: calcWidth(3),
    marginRight: calcWidth(2),
  },
  input: {
    flex: 1,
    height: calcHeight(6),
    paddingRight: calcWidth(2),
    fontSize: 16,
    color: '#4a4a4a',
  },
  passwordVisibilityToggle: {
    padding: calcWidth(2),
    marginRight: calcWidth(1),
  },
  loginButton: {
    backgroundColor: '#FF6B6B',
    padding: calcHeight(2),
    borderRadius: 10,
    alignItems: 'center',
    marginTop: calcHeight(2),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  signUpPrompt: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: calcHeight(3),
  },
  signUpText: {
    color: '#4a4a4a',
    fontSize: 16,
  },
  signUpButtonText: {
    color: '#4ECDC4',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 14,
    marginBottom: calcHeight(1),
    textAlign: 'center',
  }
});

export default LoginScreen;

