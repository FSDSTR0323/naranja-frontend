import React, { useEffect, useState } from 'react'
import Menu from '../Menu'
import '../Dashboard/Dashboard.css'
import LinesChart from './Chart/Chart'
import HistoryList from './History/History';
import axios from 'axios';
import  Pie  from './Chart/PiesChart';
// import { useGlobalContext } from '../context/globalContext';
const backendUrl = process.env.REACT_APP_BACKEND_URL;



const Dashboard = () => {
  // const {totalExpenses, totalIncome, totalBalance} = useGlobalContext()

  const [incomeList, setIncomeList] = useState([])
  const [expenseList, setExpenseList] = useState([])

 


  //INCOMES GET**
  const incomesGetter = async ()=> {
    const userId = window.localStorage.getItem("userId");
    console.log(userId)
    try {
        const {data} = await axios.get(`${backendUrl}/api/v1/get-income/${userId}`);
        setIncomeList(data); 
        console.log("esto es data", data)
    }catch ( error ){
        console.log('Error get Income', error)
    }
  };   

  useEffect(()=>{
    incomesGetter()
  },[]) 

  //EXPENSE GET**

  const expensesGetter = async ()=> {
    console.log("expense getter?");
    const userId = window.localStorage.getItem("userId");
    // const userId = window.localStorage.getItem("userId");
    console.log(userId)
      try {
          const {data} = await axios.get(`${backendUrl}/api/v1/get-expense/${userId}`); 
          setExpenseList(data); 
          console.log("esto es data", data)
          console.log('esto es data.type', data[0].type)
          
         
      }catch ( error ){
          console.log('Error get Expense', error)
      }
  };   
  useEffect(()=>{
    expensesGetter()
  },[]) 

 

  //AÑADIR REPLACE CON ( POSITIVO O NEGATIVO) *****  

//TOTAL INCOME
  const totalIncome = incomeList.reduce((total, income) => {
    const amount = income.amount.replace(/[$€]/g,''); 
    return total + Number(amount);
  }, 0);

  
//TOTAL EXPENSES
  const totalExpenses = expenseList.reduce((total, expense) => {
    const amount = expense.amount.replace(/[$€]/g,''); 
    return total + Number(amount);
  }, 0);
//TOTAL BALANCE
  const totalBalance = totalIncome - totalExpenses;
  

  return (
    <>
  <Menu />

  <div className='dashboard__container'>
    <h2 className='title__all__transactions'>All transactions</h2>
    <div className='amount__container'>
      <div className='total__incomes'>
        <h2>Total Incomes:</h2>
        <p className='totalIncomeResult' style={{ color: 'green' }}>{totalIncome}</p>
      </div>

      <div className='total__expenses'>
        <h2>Total Expenses:</h2>
        <p className='totalExpenseResult' style={{ color: 'red' }}>{totalExpenses}</p>
      </div>

      <div className='total__balance'>
        <h2>Total Balance:</h2>
        <p className='totalBlanceResult' style={{ color: totalBalance < 0 ? 'red' : 'green' }}>{totalBalance}</p>
      </div>
    </div>
    <div className='lineChartAndHistory'>
      <div className='lineChart__container'>
        <LinesChart />
      </div>
      <div className='history__container'>
        <HistoryList />
      </div>
    </div>

    <label>Category chart</label>
    <div className='pieChart__container'>
      <Pie />
    </div>
  </div>
</>
  );
};

export default Dashboard;
