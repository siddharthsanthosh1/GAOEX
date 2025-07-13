// Firebase config for GAOEX
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

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
export const auth = getAuth(app);
export const db = getDatabase(app, 'https://gaoex-e0c8b-default-rtdb.firebaseio.com/'); 