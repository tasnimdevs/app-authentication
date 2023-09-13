import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import CustomRadioButton from './CustomRadioButton';
import { db } from '../firebase'
import { onValue, ref, set } from 'firebase/database'
import { v4 as uuidv4 } from 'uuid';

const CategoryPage = ({ route }) => {
  const { category } = route.params;
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [formAmount, setFormAmount] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [incomeList, setIncomeList] = useState([]);
  const [expenseList, setExpenseList] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);

  let totalBalance = totalIncome - totalExpense;
  // console.log('category : ', category);

  useEffect(() => {
    const categoryRef = ref(db, `transaction`);
    const onDataChange = (snapshot) => {

      const data = snapshot.val();
      if (data) {
      console.log('transection data');

        const incomeTransactions = Object.values(data).filter(transaction => transaction.categoryType === 'income' && transaction.categoryId === category.id && transaction.userId === category.userId);

        const expenseTransactions = Object.values(data).filter(transaction => transaction.categoryType === 'expense' && transaction.categoryId === category.id && transaction.userId === category.userId);

        setIncomeList(incomeTransactions);
        setExpenseList(expenseTransactions);
      }
    };
    const categoryListener = onValue(categoryRef, onDataChange);
    console.log('transection updated');

    return () => {
      categoryListener();
    };
    // console.log('expense:', expenseList);

    // console.log('income:', incomeList);
  }, []);




  useEffect(() => {
    const total = expenseList.reduce((accumulator, currentExpense) => {
      return accumulator + currentExpense.amount;
    }, 0);
    setTotalExpense(total);
  }, [expenseList]);

  useEffect(() => {
    const total = incomeList.reduce((accumulator, currentExpense) => {
      return accumulator + currentExpense.amount;
    }, 0);
    setTotalIncome(total);
  }, [incomeList]);

  const handleOpenForm = () => {
    setIsFormVisible(true);
  };

  const handleCloseForm = () => {
    setIsFormVisible(false);
  };

  const handleSaveForm = () => {
    if (selectedOption === 'income' || selectedOption === 'expense') {
      const newTransaction = {
        id: uuidv4(),
        categoryType: selectedOption,
        title: formTitle,
        amount: parseFloat(formAmount),
        categoryId: category.id,
        categoryName: category.title,
        userId: category.userId,
      };

      if (selectedOption === 'income') {
        setIncomeList([...incomeList, newTransaction]);
      } else if (selectedOption === 'expense') {
        setExpenseList([...expenseList, newTransaction]);
      }

      set(ref(db, `transaction/${newTransaction.id}`), newTransaction);
    }

    // Clear form fields and reset state
    setFormTitle('');
    setFormAmount('');
    setSelectedOption(null);
    setIsFormVisible(false);
  };

  const options = [
    { label: 'Income', value: 'income' },
    { label: 'Expense', value: 'expense' },
  ];
  return (
    <>
      <View className="flex-1 bg-orange-400 ">

        <ScrollView className="bg-gray-300">
          <View>
            <View className="flex flex-row p-2 justify-between items-center">
              <Text className="text-3xl font-bold">{category.title}</Text>
              <Text className="text-xl font-bold">Total Balance : {totalBalance}</Text>

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
    </>
  );

};
export default CategoryPage;