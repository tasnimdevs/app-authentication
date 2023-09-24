import React, { useState } from 'react';
import { ScrollView, Text, View, TouchableOpacity } from 'react-native';


const CategoryList = ({ category, totalBalance, expenseList, totalExpense, incomeList, totalIncome, setIsFormVisible }) => {


    const handleOpenForm = (e) => {
        setIsFormVisible(true);
    };

    // console.log('list:', expenseList);
    return (
        <>
            <ScrollView className="bg-gray-300">

                <View>
                    <View className="flex flex-row p-2 justify-between items-center">
                        <Text className="text-2xl font-bold">{category.title}</Text>
                        <Text className="text-l font-bold">Total Balance : {totalBalance}</Text>
                    </View>

                    <View className="bg-gray-200 mt-2">
                        <View className="flex justify-between flex-row m-2">
                            <Text className="text-xl  font-bold">Title</Text>
                            <Text className="text-xl  font-bold">Your Expense List</Text>
                            <Text className="text-xl  font-bold">Expense</Text>
                        </View>
                        <View className="mt-2 mb-2">
                            {expenseList.map((expense, index) => (
                                <View key={index} className="flex-1 justify-between flex-row bg-gray-100 rounded-lg  my-1 p-2 shadow">
                                    <Text className="text-xl">{expense.title}</Text>
                                    <Text className="text-xl">{expense.amount}</Text>
                                </View>
                            ))}
                        </View>
                        <View className="flex justify-between flex-row p-2">
                            <Text className="text-xl  font-bold">Total Expense :</Text>
                            <Text className="text-xl  font-bold">{totalExpense}</Text>
                        </View>
                    </View>

                    <View className="bg-gray-200 mt-2">
                        <View className="flex justify-between flex-row p-2">
                            <Text className="text-2xl  font-bold">Title</Text>
                            <Text className="text-xl  font-bold">Your Income List</Text>
                            <Text className="text-2xl  font-bold">Income</Text>
                        </View>
                        <View className="mt-2 mb-2">
                            {incomeList.map((income, index) => (
                                <View key={index} className="flex-1 justify-between flex-row bg-gray-100 rounded-lg  my-1 p-2 shadow">
                                    <Text className="text-xl">{income.title}</Text>
                                    <Text className="text-xl">{income.amount}</Text>
                                </View>
                            ))}
                        </View>
                        <View className="flex justify-between flex-row p-2">
                            <Text className="text-xl  font-bold">Total Income :</Text>
                            <Text className="text-xl  font-bold">{totalIncome}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View>
                <TouchableOpacity className="absolute opacity-6 bottom-10 right-10 bg-sky-700 rounded-full w-16 h-16 flex justify-center items-center line-clamp-1 shadow" onPress={handleOpenForm}>
                    <Text className="text-4xl text-white">+</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}

export default CategoryList;


