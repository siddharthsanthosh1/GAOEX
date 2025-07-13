import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { auth } from '../firebaseConfig';

export default function LoginScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  const handleAuth = async () => {
    setErrorMsg('');
    if (!email || !password) {
      setErrorMsg('Please enter both email and password.');
      return;
    }
    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      router.replace('/onboarding');
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
    }
  };

  return (
    <ThemedView style={[styles.container, { backgroundColor: colors.background }]}> 
      <ThemedText style={[styles.title, { color: colors.primary }]}>GAOEX Login</ThemedText>
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
        <ThemedText style={{ color: '#fff', marginBottom: 8, alignSelf: 'flex-start' }}>{errorMsg}</ThemedText>
      ) : null}
      <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={handleAuth}>
        <ThemedText style={styles.buttonText}>{isSignup ? 'Sign Up' : 'Login'}</ThemedText>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setIsSignup(!isSignup)}>
        <ThemedText style={{ color: colors.primary, marginTop: 16 }}>
          {isSignup ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
        </ThemedText>
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
}); 