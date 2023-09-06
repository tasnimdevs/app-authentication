// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8cnJOj3mcFeWzNvr5jDXTBVyyABPk7hU",
  authDomain: "authapp-b7a86.firebaseapp.com",
  projectId: "authapp-b7a86",
  storageBucket: "authapp-b7a86.appspot.com",
  messagingSenderId: "549645649211",
  appId: "1:549645649211:web:c55d1cc369d712dff6631e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
// const auth = getAuth(app)

export { auth };