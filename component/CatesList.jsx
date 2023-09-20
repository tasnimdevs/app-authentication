import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useAppContext } from '../AppProvider';
import GetTotalBalance from './GetTotalBalance';

const CatesList = ({ cate, index }) => {
  console.log(cate.id);
  const navigation = useNavigation();
  const { totalBalance } = useAppContext();
  console.log("cateList totalBalance:", totalBalance);



  const handleListItemPress = (category) => {
    navigation.navigate('CategoryPage', { category });
  };

  const getTotalBalance = () => {
    return cate.id;
  }


 /*  useEffect(() => {
    // const specificTotalBalance = totalBalance[cate.id];
    console.log('specificTotalBalance', getTotalBalance());
  }) */


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
            {/* <Text className="text-2xl">{getTotalBalance()}</Text> */}
            <View className="text-2xl"><GetTotalBalance cateId={cate.id} /></View>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CatesList;
