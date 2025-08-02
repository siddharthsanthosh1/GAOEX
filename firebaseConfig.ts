// Firebase config for GAOEX
import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBkKByO4pqxkTRkS2ZMrbDdOJ2QvNi99aQ',
  authDomain: 'gaoex-e0c8b.firebaseapp.com',
  projectId: 'gaoex-e0c8b',
  storageBucket: 'gaoex-e0c8b.appspot.com',
  messagingSenderId: '804499038079',
  appId: '1:804499038079:web:dummyappid', // Replace with actual appId if needed
  measurementId: 'G-dummyid', // Optional
};

const app = initializeApp(firebaseConfig);

// Initialize Auth with AsyncStorage persistence for React Native
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export const db = getFirestore(app); // Firestore instance
export const dbReal = getDatabase(app, 'https://gaoex-e0c8b-default-rtdb.firebaseio.com/'); 