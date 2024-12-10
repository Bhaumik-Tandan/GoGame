import React, { useState, useCallback, useRef } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Alert, 
  StyleSheet, 
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  ImageBackground
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import PAGES from 'app/constants/pages';
import { useAuth } from 'app/stores/auth';
import { calcWidth, calcHeight } from 'app/helper/res';

const SignupScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ username: '', password: '', confirmPassword: '' });

  const { signup } = useAuth();
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const validateInputs = () => {
    const newErrors = { username: '', password: '', confirmPassword: '' };
    if (!username.trim()) newErrors.username = 'Username is required';
    if (!password) newErrors.password = 'Password is required';
    if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    setErrors(newErrors);
    return !newErrors.username && !newErrors.password && !newErrors.confirmPassword;
  };

  const handleSignup = useCallback(async () => {
    if (!validateInputs()) return;
    if (isLoading) return;

    try {
      setIsLoading(true);
      await signup({ username: username.trim(), password });
      Alert.alert('Success', 'Your account has been created successfully!');
      navigation.navigate(PAGES.LOGIN);
    } catch (err) {
      Alert.alert(
        'Signup Failed', 
        err.message || 'An unexpected error occurred. Please try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsLoading(false);
    }
  }, [username, password, confirmPassword, isLoading, signup, navigation]);

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
              style={styles.card}
            >
              <Text style={styles.title}>Create Your Account</Text>
              
              <View style={styles.inputContainer}>
                <Ionicons 
                  name="person-outline" 
                  size={20} 
                  color="#4a4a4a" 
                  style={styles.inputIcon} 
                />
                <TextInput
                  style={styles.input}
                  placeholder="Choose a username"
                  placeholderTextColor="#4a4a4a"
                  value={username}
                  onChangeText={setUsername}
                  autoCapitalize="none"
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
                  placeholder="Create a strong password"
                  placeholderTextColor="#4a4a4a"
                  secureTextEntry={!isPasswordVisible}
                  value={password}
                  onChangeText={setPassword}
                  returnKeyType="next"
                  onSubmitEditing={() => confirmPasswordRef.current?.focus()}
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

              <View style={styles.inputContainer}>
                <Ionicons 
                  name="lock-closed-outline" 
                  size={20} 
                  color="#4a4a4a" 
                  style={styles.inputIcon} 
                />
                <TextInput
                  ref={confirmPasswordRef}
                  style={styles.input}
                  placeholder="Confirm password"
                  placeholderTextColor="#4a4a4a"
                  secureTextEntry={!isPasswordVisible}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  returnKeyType="done"
                  onSubmitEditing={handleSignup}
                />
              </View>
              {errors.confirmPassword ? <Text style={styles.errorText}>{errors.confirmPassword}</Text> : null}

              <TouchableOpacity 
                style={styles.button} 
                onPress={handleSignup}
                disabled={isLoading}
                accessible
                accessibilityLabel="Sign Up"
                accessibilityState={{ disabled: isLoading }}
              >
                {isLoading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text style={styles.buttonText}>Sign Up</Text>
                )}
              </TouchableOpacity>

              <Text style={styles.footerText}>
                Already have an account?{' '}
                <Text 
                  style={styles.link} 
                  onPress={() => navigation.navigate(PAGES.LOGIN)}
                  accessible
                  accessibilityLabel="Log in"
                  accessibilityRole="link"
                >
                  Log in
                </Text>
              </Text>
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
  card: {
    width: '100%',
    maxWidth: 400,
    padding: calcWidth(5),
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    textAlign: 'center',
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4a4a4a',
    marginBottom: calcHeight(4),
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
  button: {
    backgroundColor: '#FF6B6B',
    paddingVertical: calcHeight(2),
    borderRadius: 10,
    alignItems: 'center',
    marginTop: calcHeight(3),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footerText: {
    textAlign: 'center',
    marginTop: calcHeight(3),
    color: '#4a4a4a',
    fontSize: 16,
  },
  link: {
    color: '#4ECDC4',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 14,
    marginBottom: calcHeight(1),
    textAlign: 'center',
  },
});

export default SignupScreen;

