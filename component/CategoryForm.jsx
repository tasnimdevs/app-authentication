import {  Text, View, TouchableOpacity, Modal, TextInput } from 'react-native';
import React from 'react'
import CustomRadioButton from '../layout/CustomRadioButton'

const CategoryForm = (isFormVisible, selectedOption, setSelectedOption, setFormTitle, formTitle, setFormAmount, formAmount, handleCloseForm, handleSaveForm, options) => {
  
    

      
    return (
        <Modal visible={isFormVisible} animationType="fade" transparent>
            <View className="flex-1 items-center justify-center" style={{ 'backgroundColor': 'rgba(0,0,0,.8)' }}>
                <View className="bg-orange-50 w-full px-5 pb-10 pt-5 rounded-md">
                    <View>
                        <CustomRadioButton
                            options={options}
                            selectedOption={selectedOption}
                            onSelect={setSelectedOption}
                        />
                    </View>
                    <Text className="mb-5 text-lg">
                        <Text>+Add your</Text>
                        <Text>{selectedOption === 'income' ? ' Income' : ' Expense'}</Text>
                    </Text>
                    <View className="flex flex-row justify-between gap-2">

                        <TextInput
                            className="border border-gray-400 rounded-md grow  mb-6 p-3 text-lg "
                            placeholder="Enter your title"
                            onChangeText={setFormTitle}
                            value={formTitle}
                        />
                        <TextInput
                            className="border border-gray-400 rounded-md  mb-6 p-3 text-lg"
                            placeholder="Amount"
                            onChangeText={setFormAmount}
                            value={formAmount}
                            keyboardType="numeric"
                        />
                    </View>

                    <View className="flex flex-row gap-5">
                        <TouchableOpacity className="flex-1 bg-red-500 rounded-md p-2.5" onPress={handleCloseForm}>
                            <Text className="text-center text-lg text-white"  >Close</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="flex-1 bg-cyan-500 p-2.5 rounded-md" onPress={handleSaveForm}>
                            <Text className="text-center text-lg text-white" >Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default CategoryForm