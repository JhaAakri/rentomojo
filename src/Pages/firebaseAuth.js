// firebaseAuth.js
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

// Import Firebase for phone authentication
import { signInWithPhoneNumber } from 'firebase/auth';

import firebaseConfig from './firebaseconfig';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
    console.log(Credential.user)
  } catch (error) {
    throw error;
  }
};

export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};

export const verifyOtp = async (otp, confirmationResult) => {
  try {
    await signInWithPhoneNumber(confirmationResult, otp);
    // OTP verification successful
    return true;
  } catch (error) {
    console.error('OTP Verification Error:', error.message);
    throw error;
  }
};

export const onAuthStateChanged = (callback) => {
    return auth.onAuthStateChanged(callback);
  };

export default auth;
