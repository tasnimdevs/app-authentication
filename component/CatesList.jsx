import React from 'react';
import { View, Text } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useAppContext } from '../AppProvider';

const CatesList = ({ cate, index }) => {
  console.log(cate.id);
  const navigation = useNavigation();
  const { totalBalance } = useAppContext();
  console.log("cateList totalBalance:", totalBalance);
  const specificTotalBalance = totalBalance[cate.id];
  console.log('specificTotalBalance', specificTotalBalance);


  const handleListItemPress = (category) => {
    navigation.navigate('CategoryPage', { category });
  };


  return (
    <ScrollView>
      <View className="bg-white rounded-lg p-5 my-2 shadow flex-1">
        <TouchableOpacity
          key={index}
          onPress={() => handleListItemPress(cate)}
        >
          <View className="flex justify-between flex-row">
            <Text className="text-2xl">{cate.title}</Text>
            {/* Display totalBalance here */}
            <Text className="text-2xl">{totalBalance}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CatesList;
