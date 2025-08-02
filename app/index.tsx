import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, User } from 'firebase/auth';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, ActivityIndicator, View } from 'react-native';
import { auth } from '../firebaseConfig';

export default function AuthScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoading(false);
      if (user) {
        // User is signed in, redirect to main app
        router.replace('/(tabs)/home');
      }
    });

    return unsubscribe;
  }, []);

  const validateEmail = (email: string) => {
    // Simple email regex
    return /^\S+@\S+\.\S+$/.test(email);
  };

  const handleAuth = async () => {
    setErrorMsg('');
    if (!email || !password) {
      setErrorMsg('Please enter both email and password.');
      return;
    }
    if (!validateEmail(email)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters.');
      return;
    }
    
    setAuthLoading(true);
    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      // Navigation will be handled by onAuthStateChanged
    } catch (e) {
      const err = e as any;
      if (err.code === 'auth/wrong-password') {
        setErrorMsg('Password incorrect');
      } else if (err.code === 'auth/user-not-found') {
        setErrorMsg('No user found with this email');
      } else if (err.code === 'auth/invalid-email') {
        setErrorMsg('Invalid email address');
      } else if (err.code === 'auth/email-already-in-use') {
        setErrorMsg('Email already in use');
      } else if (err.code === 'auth/weak-password') {
        setErrorMsg('Password should be at least 6 characters');
      } else {
        setErrorMsg('Authentication failed. Please try again.');
      }
    } finally {
      setAuthLoading(false);
    }
  };

  // Show loading screen while checking authentication state
  if (isLoading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={[styles.loadingText, { color: colors.text }]}>Loading...</Text>
      </View>
    );
  }

  // If user is authenticated, this component won't render as navigation happens in useEffect
  // This is the login form for unauthenticated users

  return (
    <ThemedView style={[styles.container, { backgroundColor: colors.background }]}> 
      <Text style={[styles.title, { color: colors.primary }]}>GAOEX Login</Text>
      <TextInput
        style={[styles.input, { color: colors.text, borderColor: colors.border }]}
        placeholder="Email"
        placeholderTextColor={colors.icon}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={[styles.input, { color: colors.text, borderColor: colors.border }]}
        placeholder="Password"
        placeholderTextColor={colors.icon}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {errorMsg ? (
        <Text style={{ color: '#fff', marginBottom: 8, alignSelf: 'flex-start' }}>{errorMsg}</Text>
      ) : null}
      <TouchableOpacity 
        style={[styles.button, { backgroundColor: colors.primary }, authLoading && { opacity: 0.7 }]} 
        onPress={handleAuth}
        disabled={authLoading}
      >
        {authLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>{isSignup ? 'Sign Up' : 'Login'}</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setIsSignup(!isSignup)}>
        <Text style={{ color: colors.primary, marginTop: 16 }}>
          {isSignup ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
        </Text>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 32 },
  input: { width: '100%', borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: 16, fontSize: 16 },
  button: { width: '100%', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 8 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  loadingContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  loadingText: { marginTop: 16, fontSize: 16 },
}); 