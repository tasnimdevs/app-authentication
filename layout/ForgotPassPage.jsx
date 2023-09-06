import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'

const ForgotPassPage = () => {
    return (
        <>
            <View className="flex-1 items-center justify-center">
                <View className="space-y-4  w-1/2 ">
                    <View className="w-full">
                        <TextInput
                            className="border px-3 py-2"
                            placeholder="Insert a valid Email"
                            placeholderTextColor="#003f5c"
                            // value={password}
                          
                        /*  onChangeText={(text) => setPassword(text)} */
                        />
                    </View>
                    <TouchableOpacity
                        className="border p-3 bg-blue-500"
             /* onPress={handleLoginPress}
              */>
                        <Text className="text-center text-white">Send a varification code</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

export default ForgotPassPage