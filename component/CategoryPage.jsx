import React, { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import { db } from '../firebase'
import { onValue, ref, set } from 'firebase/database'
import { v4 as uuidv4 } from 'uuid';
import { useAppContext } from '../AppProvider';
import CategoryList from './CategoryList';
import CategoryForm from './CategoryForm';

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
  const { updateTotalBalance } = useAppContext();

  const totalBalance = totalIncome - totalExpense;

  useEffect(() => {
    updateTotalBalance(totalBalance);
  }, [totalBalance, updateTotalBalance]);


  useEffect(() => {
    const categoryRef = ref(db, 'transaction');
    const onDataChange = (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const incomeTransactions = Object.values(data).filter(transaction => transaction.categoryType === 'income' && transaction.categoryId === category.id && transaction.userId === category.userId);
        const expenseTransactions = Object.values(data).filter(transaction => transaction.categoryType === 'expense' && transaction.categoryId === category.id && transaction.userId === category.userId);
        setIncomeList(incomeTransactions);
        setExpenseList(expenseTransactions);
      }
    };
    const categoryListener = onValue(categoryRef, onDataChange);

    return () => {
      categoryListener();
    };
  }, [category.id, category.userId]);
  console.log('income:', incomeList);
  console.log('expense:', expenseList);

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

 

  const handleCloseForm = () => {
    setIsFormVisible(false);
  };

  const handleSaveForm = () => {

    if (!selectedOption || !formTitle || !formAmount) return;

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
        <CategoryList
          category={category}
          totalBalance={totalBalance}
          expenseList={expenseList}
          totalExpense={totalExpense}
          incomeList={incomeList}
          totalIncome={totalIncome}
          setIsFormVisible={setIsFormVisible}
        />
      </View>


      <CategoryForm
        isFormVisible={isFormVisible}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        setFormTitle={setFormTitle}
        formTitle={formTitle}
        setFormAmount={setFormAmount}
        formAmount={formAmount}
        handleCloseForm={handleCloseForm}
        handleSaveForm={handleSaveForm}
        options={options}
      />
    </>
  );

};
export default CategoryPage;