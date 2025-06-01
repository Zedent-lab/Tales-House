// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// Optional: import analytics only if needed
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyB9E3P2m3Kb92XCxqmMYcbf8Urep5mzMv8",
  authDomain: "taleshouse-dbcc6.firebaseapp.com",
  projectId: "taleshouse-dbcc6",
  storageBucket: "taleshouse-dbcc6.appspot.com", // ✅ fixed `.app` to `.appspot.com`
  messagingSenderId: "412974008717",
  appId: "1:412974008717:web:ae66d04d36b6467fdb15c4",
  measurementId: "G-QG2HN4K78T"
};

const app = initializeApp(firebaseConfig);
// Optional: Uncomment if you're using analytics
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
