import { onValue, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react'
import { Text } from 'react-native'
import { db } from '../firebase';

function GetTotalBalance({ cateId }) {
    const [incomeList, setIncomeList] = useState([]);
    const [expenseList, setExpenseList] = useState([]);
    const [totalExpense, setTotalExpense] = useState(0);
    const [totalIncome, setTotalIncome] = useState(0);

   
    useEffect(() => {
        const categoryRef = ref(db, 'transaction');
        const onDataChange = (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const incomeTransactions = Object.values(data).filter(transaction => transaction.categoryType === 'income' && transaction.categoryId === cateId);
                const expenseTransactions = Object.values(data).filter(transaction => transaction.categoryType === 'expense' && transaction.categoryId === cateId);
                setIncomeList(incomeTransactions);
                setExpenseList(expenseTransactions);
            }
        };
        const categoryListener = onValue(categoryRef, onDataChange);
        return () => {
            categoryListener();
        };
    }, [cateId]);

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

    const totalBalance = totalIncome - totalExpense;
    // console.log('getTotalBalance:', totalBalance);

    return (
        <>
            <Text className="text-2xl">
                {totalBalance}
            </Text>
        </>
    )
}

export default GetTotalBalance