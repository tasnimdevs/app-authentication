import { Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { db } from '../firebase'
import { onValue, ref, set, get } from 'firebase/database'
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import CatesList from '../component/CatesList';
import { GestureHandlerRootView } from 'react-native-gesture-handler';



export default function HomePage({ route }) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [textValue, setTextValue] = useState('');
    const [cates, setCates] = useState([]);
    const { credentials, handleSignOut } = route.params;
    const navigation = useNavigation();

    const { email, uid } = credentials;

    
    const handleSignOutPress = useCallback(() => {
        handleSignOut()
    }, []);

  
    useEffect(() => {
        console.log('homescreen email:', email);
        console.log('homescreen uid:', uid);
    }, []);

    const toSnakeCase = (str = '') => {
        str = str.trim();
        const strArr = str.split(' ');
        const snakeArr = strArr.reduce((acc, val) => {
            return acc.concat(val.toLowerCase());
        }, []);
        return snakeArr.join('_');
    };

    // console.log(totalBalance);

    const handleOpenModal = () => {
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    const handleSaveModal = () => {
        const categoryId = uuidv4();
        const userId = uid;
        const dataCateAdd = {
            id: categoryId,
            userId: userId,
            title: textValue,
        };
        set(ref(db, 'category/' + (categoryId)), dataCateAdd);
        // Do something with textValue and numberValue
        setCates([...cates, dataCateAdd]);
        setTextValue('')
        setIsModalVisible(false);
    };



    useEffect(() => {
        let itemsRef = ref(db, 'category');
        get(itemsRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const allData = snapshot.val();
                    const itemsList = Object.values(allData).filter(category => category.userId === uid);
                    setCates(itemsList);
                } else {
                    console.log("No data available");
                }
            })
            .catch((error) => {
                // console.error("Error retrieving data:", error);
            });

        const onDataChange = () => {
            get(itemsRef)
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        const allData = snapshot.val();
                        const itemsList = Object.values(allData).filter(category => category.userId === uid);
                        setCates(itemsList);
                    } else {
                        setCates([]);
                        alert("No data available");
                        navigation.navigate('HomePage')
                    }
                })
                .catch((error) => {
                    // console.error("Error retrieving data:", error);
                });
        };
        const allCatesListener = onValue(itemsRef, onDataChange);

        return () => {
            allCatesListener();
        };

    }, [])

    useFocusEffect(
        React.useCallback(() => {
            let itemsRef = ref(db, 'category');
            get(itemsRef)
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        const allData = snapshot.val();
                        const itemsList = Object.values(allData).filter(category => category.userId === uid);
                        setCates(itemsList);
                    } else {
                        setCates([]);
                        console.log("No data available");
                    }
                })
                .catch((error) => {
                    // console.error("Error retrieving data:", error);
                });

        }, [])
    );

   /*  const handleSignOutPress = () => {
        handleSignOut();

    }; */

    return (
        <>
            <View className="bg-orange-300 flex-1">
                <ScrollView className="bg-gray-300">



                    <View className="flex-1 justify-between flex-row">
                        <Text>{uid}</Text>
                        <Text>{email}</Text>
                    </View>
                    <TouchableOpacity
                        className="flex-1 bg-red-500 rounded-md p-2.5"
                        onPress={handleSignOutPress}>
                        <Text className="text-center text-lg text-white" >LogOut</Text>
                    </TouchableOpacity>
                    <View className="flex m-10">
                        <View className="flex justify-between flex-row">
                            <Text className="text-2xl font-bold">Category</Text>
                            <Text className="text-2xl font-bold">Balance</Text>
                        </View>
                        {cates.map((cate, index) => (
                            <GestureHandlerRootView >
                                <CatesList key={index} index={index} cate={cate} />
                            </GestureHandlerRootView>

                            /*  <TouchableOpacity
                                 key={index}
                                 className="bg-white rounded-lg p-5 my-2 shadow flex-1"
                                 onPress={() => handleListItemPress(cate)}
                             >
 
                                 <View className="flex justify-between flex-row">
                                     <Text className="text-2xl">{cate.title}</Text>
                                     <Text className="text-2xl">200.00</Text>
                                 </View>
                             </TouchableOpacity> */
                        ))}
                    </View>
                </ScrollView>



                <TouchableOpacity className="absolute opacity-6 bottom-10 right-10 bg-sky-700 rounded-full w-16 h-16 flex justify-center items-center line-clamp-1 shadow" onPress={handleOpenModal}>
                    <Text className="text-4xl text-white">+</Text>
                </TouchableOpacity>
            </View>


            <Modal visible={isModalVisible} animationType="fade" transparent>
                <View className="flex-1 items-center justify-center" style={{ 'backgroundColor': 'rgba(0,0,0,.8)' }}>
                    <View className="bg-orange-50 w-80 px-5 pb-10 pt-5 rounded-md">
                        <Text className="mb-5 text-lg">Insert your category name</Text>
                        <TextInput
                            className="border border-gray-400 rounded-md w-full mb-6 p-3 text-lg"
                            placeholder="Enter text"
                            onChangeText={setTextValue}
                            value={textValue}
                        />
                        <View className="flex flex-row gap-5">
                            <TouchableOpacity className="flex-1 bg-red-500 rounded-md p-2.5" onPress={handleCloseModal}>
                                <Text className="text-center text-lg text-white"  >Close</Text>
                            </TouchableOpacity>
                            <TouchableOpacity className="flex-1 bg-cyan-500 p-2.5 rounded-md" onPress={handleSaveModal}>
                                <Text className="text-center text-lg text-white" >Save</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
}         
