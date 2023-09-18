import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import React from 'react'

const CategoryList = (category, totalBalance, expenseList, totalExpense, incomeList, totalIncome, handleOpenForm) => {

    return (
        <View>
            <ScrollView className="bg-gray-300">
                <View>
                    <View className="flex flex-row p-2 justify-between items-center">
                        <Text className="text-3xl font-bold">{category.title}</Text>
                        <Text className="text-xl font-bold">Total Balance : {totalBalance}</Text>
                        {/* <View>
                <Button
                  title="Go to CatesList"
                  onPress={handleNavigateToCatesList}
                />
                <Text className="text-xl font-bold">Total Balance: {totalBalance}</Text>
              </View> */}
                    </View>

                    <View className="bg-gray-200 mt-3">
                        <View className="flex justify-between flex-row p-3">
                            <Text className="text-2xl  font-bold">Title</Text>
                            <Text className="text-xl  font-bold">
                                Your Expense List</Text>
                            <Text className="text-2xl  font-bold">Expense</Text>
                        </View>
                        <View >
                            {expenseList.map((expense, index) => (
                                <View key={index} className="flex justify-between flex-row bg-gray-100 rounded-lg p-4 my-2 shadow flex-1">
                                    <Text className="text-xl">{expense.title}</Text>
                                    <Text className="text-xl">{expense.amount}</Text>
                                </View>
                            ))}

                        </View>
                        <View className="flex justify-between flex-row p-3">
                            <Text className="text-xl  font-bold">Tota Expense :</Text>
                            <Text className="text-xl  font-bold">{totalExpense}</Text>
                        </View>
                    </View>

                    <View className="bg-gray-200 mt-3">
                        <View className="flex justify-between flex-row p-3">
                            <Text className="text-2xl  font-bold">Title</Text>
                            <Text className="text-xl  font-bold">
                                Your Income List</Text>
                            <Text className="text-2xl  font-bold">Income</Text>
                        </View>
                        <View >
                            {incomeList.map((income, index) => (
                                <View key={index} className="flex justify-between flex-row bg-gray-100 rounded-lg p-4 my-2 shadow flex-1">
                                    <Text className="text-xl">{income.title}</Text>
                                    <Text className="text-xl">{income.amount}</Text>
                                </View>
                            ))}
                        </View>

                        <View className="flex justify-between flex-row p-3">
                            <Text className="text-xl  font-bold">Total Income :</Text>
                            <Text className="text-xl  font-bold">{totalIncome}</Text>

                        </View>
                    </View>

                </View>

            </ScrollView>

            <View>
                <TouchableOpacity className="absolute opacity-6 bottom-10 right-10 bg-sky-700 rounded-full w-16 h-16 flex justify-center items-center line-clamp-1 shadow" onPress={handleOpenForm} >
                    <Text className="text-4xl text-white">+</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CategoryList