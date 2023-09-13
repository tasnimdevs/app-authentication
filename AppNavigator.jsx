
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from './layout/LoginPage';
import HomePage from './layout/HomePage';
import SignupPage from './layout/SignupPage';
import ForgotPassPage from './layout/ForgotPassPage';
import CategoryPage from './component/CategoryPage';



const Stack = createNativeStackNavigator();

export default function AppNavigator({ isAuthenticated, handleLogin, credentials, handleSignOut }) {

    // useEffect(() => {
    // console.log("appNavigator:", credentials.email, credentials.uid);
    // })
    // let uData = {};
    if (credentials) {
        // console.log(isAuthenticated, credentials);
    }
    //     // const user_email = credentials.email;
    //     // const user_uid = credentials.uid;
    //     const uData = { "email": credentials.email, "uid": credentials.uid }
    //     console.log(uData);
    // }
    return (

        <NavigationContainer>
            {credentials && isAuthenticated ?

                <Stack.Navigator>
                    <Stack.Screen name="HomePage" component={HomePage} initialParams={{ credentials, isAuthenticated, handleSignOut }} />
                    {/* <Stack.Screen name="HomePage" component={HomePage} /> */}
                    {/*  <Stack.Screen name="HomePage">
                        {(props) => <HomePage {...props} initialParams={credentials} />}
                    </Stack.Screen> */}
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
