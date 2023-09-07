import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'


const LoginPage = ({ navigation, handleLogin }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLoginPress = async () => {
        handleLogin(email, password);
    }


    return (
        <View className="flex-1 items-center justify-center bg-slate-100">
            <View className="space-y-4  w-1/2 items-center">
                <View className="w-full ">
                    <TextInput
                        className="border px-3 py-2 bg-white border-slate-400 "
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
                        placeholder="Password"
                        placeholderTextColor="#003f5c"
                        value={password}
                        secureTextEntry={true}
                        onChangeText={(text) => setPassword(text)}
                    />
                </View>
                <TouchableOpacity
                    className="w-full  p-3 bg-blue-500"
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
