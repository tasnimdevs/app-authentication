import React from 'react';
import { View, Text } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const CatesList = ({ cate, totalBalance, index }) => {
  const navigation = useNavigation();

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
