import React, { useState } from 'react';
import AppNavigator from './AppNavigator';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase'
import 'react-native-gesture-handler';




export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const navigation = useNavigation()

  const handleLogin = async (email, password) => {

    try {
      const userCredentials = await signInWithEmailAndPassword(auth, email, password)
      console.log('login succesfully');
      // navigation.navigate('HomePage')
      setIsAuthenticated(true);
    }

    catch (error) {

      console.error(error);
      showLoginError(error);
      alert("Incorrect Email or Password")
    };

  };
  return <AppNavigator isAuthenticated={isAuthenticated} handleLogin={handleLogin} />
}


