import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, googleProvider, db } from '../firebase';

// Create the AuthContext
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [authInitialized, setAuthInitialized] = useState(false);

  // Listen for online/offline events
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          // User is signed in - create basic user data first
          let userData = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
            emailVerified: firebaseUser.emailVerified,
            createdAt: firebaseUser.metadata.creationTime,
            lastLoginAt: firebaseUser.metadata.lastSignInTime,
          };
          
          // Set user immediately with Firebase data
          setUser(userData);
          
          // Try to get additional Firestore data with retry logic
          try {
            const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
            if (userDoc.exists()) {
              userData = { ...userData, ...userDoc.data() };
              setUser(userData);
            }
          } catch (firestoreError) {
            console.warn('Firestore temporarily unavailable, using Firebase auth data only:', firestoreError.message);
            // Continue with just Firebase auth data - don't fail completely
          }
        } else {
          // User is signed out
          setUser(null);
        }
      } catch (error) {
        console.error('Auth state change error:', error);
        setUser(null);
      } finally {
        setLoading(false);
        setAuthInitialized(true);
      }
    });

    return unsubscribe; // Cleanup subscription
  }, []);

  // Create user document in Firestore with retry logic
  const createUserDocument = async (user, additionalData = {}) => {
    if (!user) return;
    
    const userRef = doc(db, 'users', user.uid);
    
    try {
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        const { displayName, email, photoURL } = user;
        const createdAt = new Date();
        const userData = {
          displayName: displayName || additionalData.displayName || '',
          email,
          photoURL: photoURL || '',
          createdAt,
          lastLoginAt: createdAt,
          isOnline: true,
          preferences: {
            theme: 'dark',
            notifications: true,
            language: 'en'
          },
          profile: {
            bio: '',
            location: '',
            website: ''
          },
          ...additionalData
        };

        await setDoc(userRef, userData);
        return userData;
      } else {
        // Update last login time for existing users
        await setDoc(userRef, { 
          lastLoginAt: new Date(),
          isOnline: true 
        }, { merge: true });
      }
    } catch (error) {
      console.warn('Firestore operation failed, will retry later:', error.message);
      
      // Schedule retry after a delay
      setTimeout(() => {
        createUserDocument(user, additionalData).catch(retryError => {
          console.error('Retry failed:', retryError);
        });
      }, 2000);
      
      // Don't throw - allow auth to continue
    }
  };

  // Email/Password Registration
  const register = async (email, password, displayName = '') => {
    try {
      setLoading(true);
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update user profile with display name
      if (displayName) {
        await updateProfile(user, { displayName });
      }
      
      // Create user document in Firestore
      await createUserDocument(user, { displayName });
      
      return { success: true, user };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Email/Password Login
  const login = async (email, password) => {
    try {
      setLoading(true);
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      
      // Update user's online status
      await createUserDocument(user);
      
      return { success: true, user };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Google Sign In
  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      // Create user document in Firestore if it doesn't exist
      await createUserDocument(user);
      
      return { success: true, user };
    } catch (error) {
      console.error('Google sign-in error:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = async () => {
    try {
      setLoading(true);
      
      // Update user's offline status in Firestore before signing out
      if (user) {
        try {
          await setDoc(doc(db, 'users', user.uid), { 
            isOnline: false,
            lastSeenAt: new Date()
          }, { merge: true });
        } catch (error) {
          console.error('Error updating offline status:', error);
        }
      }
      
      await signOut(auth);
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Reset Password
  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return { success: true };
    } catch (error) {
      console.error('Password reset error:', error);
      return { success: false, error: error.message };
    }
  };

  // Update user profile
  const updateUserProfile = async (updates) => {
    if (!user) return { success: false, error: 'No user logged in' };
    
    try {
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, {
        ...updates,
        updatedAt: new Date()
      }, { merge: true });
      
      // Update local user state
      setUser(prev => ({ ...prev, ...updates }));
      
      return { success: true };
    } catch (error) {
      console.error('Error updating user profile:', error);
      return { success: false, error: error.message };
    }
  };

  const value = {
    user,
    loading,
    isOnline,
    authInitialized,
    isAuthenticated: !!user && authInitialized,
    connectionStatus: !isOnline ? 'offline' : (!authInitialized ? 'connecting' : 'online'),
    login,
    register,
    signInWithGoogle,
    logout,
    resetPassword,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};