
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from './layout/LoginPage';
import HomePage from './layout/HomePage';
import SignupPage from './layout/SignupPage';
import ForgotPassPage from './layout/ForgotPassPage';


const Stack = createNativeStackNavigator();

export default function App() {
  return (

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="LoginPage" component={LoginPage} />
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="SignupPage" component={SignupPage} />
        <Stack.Screen name="ForgotPassPage" component={ForgotPassPage} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}


