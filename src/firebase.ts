import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Replace with your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBF9pGqC017Ro-J_KkZxz-uhhX5IGMWjjg",
  authDomain: "carpark2-4eded.firebaseapp.com",
  projectId: "carpark2-4eded",
  storageBucket: "carpark2-4eded.firebasestorage.app",
  messagingSenderId: "313713122058",
  appId: "1:313713122058:web:7242cf1b31b74adb9e78f3"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

export default app;
