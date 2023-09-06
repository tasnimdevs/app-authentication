import { Alert, Button, FlatList, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { db } from '../firebase'
import { ref, set, get } from 'firebase/database'
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid'; 


  
export default function HomePage() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [textValue, setTextValue] = useState('');
    const [cates, setCates] = useState([]);

    const toSnakeCase = (str = '') => {
        str = str.trim();
        const strArr = str.split(' ');
        const snakeArr = strArr.reduce((acc, val) => {
            return acc.concat(val.toLowerCase());
        }, []);
        return snakeArr.join('_');
    };

    // console.log(totalBalance);

    const navigation = useNavigation();

    const handleOpenModal = () => {
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    const handleSaveModal = () => {
        set(ref(db, 'category/' + toSnakeCase(textValue)), {
            id: uuidv4(),
            title: textValue,
        });
        // Do something with textValue and numberValue
        console.log('Text:', textValue);
        setCates([...cates, { name: textValue }]);
        setTextValue('')
        setIsModalVisible(false);
    };

    const handleListItemPress = (categoryName) => {
        navigation.navigate('CatePage', { categoryName });
        // Navigate to the new component and pass data
    };

    useEffect(() => {
        let itemsRef = ref(db, 'category');
        get(itemsRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const allData = snapshot.val();
                    const itemsList = Object.values(allData);
                    setCates(itemsList);
                    // console.log("All retrieved data:", itemsList);
                } else {
                    console.log("No data available");
                }
            })
            .catch((error) => {
                // console.error("Error retrieving data:", error);
            });

    }, [cates])

    return (
        <>
            <View className="bg-orange-300 flex-1">
                <ScrollView className="bg-gray-300">
                    <View className="flex m-10">
                        <View className="flex justify-between flex-row">
                            <Text className="text-2xl font-bold">Category</Text>
                            <Text className="text-2xl font-bold">Balance</Text>
                        </View>
                        {cates.map((cate, index) => (
                            <TouchableOpacity
                                key={index}
                                className="bg-white rounded-lg p-5 my-2 shadow flex-1"
                                onPress={() => handleListItemPress(cate.title)}
                            >

                                <View className="flex justify-between flex-row">
                                    <Text className="text-2xl">{cate.title}</Text>
                                    <Text className="text-2xl">200.00</Text>
                                </View>
                            </TouchableOpacity>
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