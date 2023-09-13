import React, { useEffect, useState } from 'react';
import AppNavigator from './AppNavigator';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase'
import 'react-native-gesture-handler';

import LoginPage from './layout/LoginPage';
import HomePage from './layout/HomePage';
import SignupPage from './layout/SignupPage';
import ForgotPassPage from './layout/ForgotPassPage';
import CategoryPage from './component/CategoryPage';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState(null); // Initialize credentials as null

  const handleLogin = async (email, password) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(auth, email, password);

      console.log('Login successful');
      setIsAuthenticated(true);
      setCredentials({
        uid: userCredentials.user.uid,
        email: userCredentials.user.email,
        // Add other user-related data as needed
      });
    } catch (error) {
      console.error('Login failed:', error);
      alert("Incorrect Email or Password");
    }
  };

  useEffect(() => {
    if (credentials) {
      // console.log('Credentials:', credentials);
    }
  }, [credentials]);

  const handleSignOut = () => {
    console.log('Logout');
    setIsAuthenticated(false);
  };

  return (
    <AppNavigator handleSignOut={handleSignOut} isAuthenticated={isAuthenticated} credentials={credentials} handleLogin={handleLogin} />
  );
}
