import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, enableNetwork, disableNetwork } from 'firebase/firestore';

const firebaseConfig = {
  // Replace with your ACTUAL Firebase config values
  apiKey: "AIzaSyB9E3P2m3Kb92XCxqmMYcbf8Urep5mzMv8",
  authDomain: "taleshouse-dbcc6.firebaseapp.com",
  projectId: "taleshouse-dbcc6",
  storageBucket: "taleshouse-dbcc6.firebasestorage.app",
  messagingSenderId: "412974008717",
  appId: "1:412974008717:web:ae66d04d36b6467fdb15c4",
  measurementId: "G-QG2HN4K78T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
export const auth = getAuth(app);

// Initialize Firestore
export const db = getFirestore(app);

// Google Auth Provider
export const googleProvider = new GoogleAuthProvider();

// Add these scopes for better user info
googleProvider.addScope('profile');
googleProvider.addScope('email');

// Enable Firestore offline persistence
try {
  // Enable offline persistence
  enableNetwork(db);
} catch (error) {
  console.warn('Firestore offline persistence error:', error);
}

// Handle network status changes
window.addEventListener('online', () => {
  console.log('Back online - enabling Firestore network');
  enableNetwork(db);
});

window.addEventListener('offline', () => {
  console.log('Gone offline - disabling Firestore network');
  disableNetwork(db);
});

export default app;