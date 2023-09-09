import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const CustomRadioButton = ({ options, selectedOption, onSelect }) => {
  return (
    <View className="flex flex-row justify-between">
      {options.map((option, index) => (
        <TouchableOpacity
        className=""
          key={index}
          style={[
            styles.radioButton,
            selectedOption === option.value && styles.selectedRadioButton,
          ]}
          onPress={() => onSelect(option.value)}
        >
          <Text style={styles.radioButtonText}>{option.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#999',
    padding: 10,
  },
  selectedRadioButton: {
    borderColor: '#007AFF',
    backgroundColor: '#D3D3D3' // Customize the selected color
  },
  radioButtonText: {
    marginLeft: 10,
  },
});

export default CustomRadioButton;