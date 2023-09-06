import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from "@react-navigation/native";
 import { signInWithEmailAndPassword } from 'firebase/auth';
 import { auth } from '../firebase'


const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigation = useNavigation()


    const handleLoginPress = async () => {
        try {
            const userCredentials = await signInWithEmailAndPassword(auth, email, password)
            console.log('login succesfully');
            navigation.navigate('HomePage')
            setEmail();
            setPassword();
        }

        catch (error) {

            console.error(error);
            showLoginError(error);
        };
    }


    return (
        <View className="flex-1 items-center justify-center">
            <View className="space-y-4  w-1/2 items-center">
                <View className="w-full ">
                    <TextInput
                        className="border px-3 py-2"
                        placeholder="Email"
                        placeholderTextColor="#003f5c"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                </View>
                <View className="w-full">
                    <TextInput
                        className="border px-3 py-2"
                        placeholder="Password"
                        placeholderTextColor="#003f5c"
                        value={password}
                        secureTextEntry={true}
                        onChangeText={(text) => setPassword(text)}
                    />
                </View>
                <TouchableOpacity
                    className="w-full border p-3 bg-blue-700"
                    onPress={handleLoginPress}
                >
                    <Text className="text-center text-white">LOGIN</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('ForgotPassPage')}
                >
                    <Text className="font-bold">Forgotten password?
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity

                    onPress={() => navigation.navigate('SignupPage')}
                >
                    <Text className="font-bold text-xl ">Create new account</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default LoginPage;
