import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'

const SignupPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigation = useNavigation()

    const handleSignup = async () => {
        try {
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
            // console.log( userCredentials.user.uid);
            setEmail('');
            setPassword('');
            navigation.navigate('LoginPage')
            // Display an alert when registration is successful
            Alert.alert(
                'Success',
                'Account successfully registered!',
                [
                    {
                        text: 'OK',
                        onPress: () => console.log('OK Pressed'),
                    },
                ],
                { cancelable: false } // Prevents the user from dismissing the alert by tapping outside of it
            );
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                console.log('That email address is already in use!');
            }
            if (error.code === 'auth/invalid-email') {
                console.log('That email address is invalid!');
            }
            console.error(error);
        }
    };

    return (
        <View className="flex-1 items-center justify-center bg-slate-100">
            <View className="space-y-4  w-1/2 items-center">
                <View className="w-full ">
                    <TextInput
                        className="border px-3 py-2 bg-white border-slate-400"
                        placeholder="Email"
                        placeholderTextColor="#003f5c"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        autoCapitalize='none'
                    />
                </View>
                <View className="w-full">
                    <TextInput
                        className="border px-3 py-2 bg-white border-slate-400"
                        placeholder="Set your password"
                        placeholderTextColor="#003f5c"
                        value={password}
                        secureTextEntry={true}
                        onChangeText={(text) => setPassword(text)}
                    />
                </View>
                <TouchableOpacity
                    className=" p-3 bg-blue-500 w-full"
                    onPress={handleSignup}
                >
                    <Text className="text-center text-white">SignUp</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className="mt-2"
                    onPress={() => navigation.navigate('LoginPage')}
                >
                    <Text>Already have account?</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default SignupPage