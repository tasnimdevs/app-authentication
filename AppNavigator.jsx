
import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from './layout/LoginPage';
import HomePage from './layout/HomePage';
import SignupPage from './layout/SignupPage';
import ForgotPassPage from './layout/ForgotPassPage';
import CategoryPage from './layout/CategoryPage';



const Stack = createNativeStackNavigator();

export default function AppNavigator({ isAuthenticated, handleLogin }) {
    return (

        <NavigationContainer>
            {isAuthenticated ?

                <Stack.Navigator>
                    <Stack.Screen name="HomePage" component={HomePage} />
                    <Stack.Screen name="CategoryPage" component={CategoryPage} />
                </Stack.Navigator>
                :
            <Stack.Navigator>
                <Stack.Screen name="LoginPage">
                    {(props) => <LoginPage {...props} handleLogin={handleLogin} />}
                </Stack.Screen>

                <Stack.Screen name="SignupPage" component={SignupPage} />
                <Stack.Screen name="ForgotPassPage" component={ForgotPassPage} />
            </Stack.Navigator>
            }
        </NavigationContainer>

    );
}


