import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2';
import Chart from '../Chart/Chart.css'
// import { dateFormat } from '../../utils/dateFormat';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import axios from 'axios';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);




 

const backendUrl = process.env.REACT_APP_BACKEND_URL;

export default function LinesChart() {

    const [expenseAmountData, setExpenseAmountData] = useState([])
    const [getDateExpense, setGetDateExpense] = useState([])
 
    const [incomeAmountData, setIncomeAmountData] = useState([])
    const [getDateIncome, setGetDateIncome] = useState([])

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const incomeDataGetter = async ()=> {
    
    const userId = window.localStorage.getItem('userId') 
    try {
        const response = await axios.get(`${backendUrl}/api/v1/get-income/${userId}`);
        const amountData = response.data.map((item) => (item.amount))
        const dates = response.data.map((item) => (item.date));
    
        console.log('esto es amountData', amountData)
        console.log('esto es getDate', getDateExpense)
        setIncomeAmountData(amountData);
        setGetDateIncome(dates)
    }catch ( error ){
        console.log('Error get Transactions', error)
    }
};  
    
useEffect(() => {
    incomeDataGetter();
}, []);


const expenseDataGetter = async ()=> {
    
    const userId = window.localStorage.getItem('userId') 
    try {
        const response = await axios.get(`${backendUrl}/api/v1/get-expense/${userId}`);
        const amountData = response.data.map((item) => (item.amount))
        const dates = response.data.map((item) => (item.date));

        console.log('esto es amountData', amountData)
        console.log('esto es getDate', getDateExpense)
        setExpenseAmountData(amountData);
        setGetDateExpense(dates)
    }catch ( error ){
        console.log('Error get Transactions', error)
    }
};  

useEffect(() => {
    expenseDataGetter();
  }, []);

  

  //EXPENSES
  const formatDataByMonthExpense = () => {
    const dataByMonthExpense = Array(12).fill(0);

    getDateExpense.forEach((date, index) => {
      const expenseMonth = new Date(date).getMonth();
      dataByMonthExpense[expenseMonth] += +expenseAmountData[index].replace(/[$€]/g,'');
    });

    return dataByMonthExpense;
  };

  const dataByMonthExpense = formatDataByMonthExpense();

  //INCOMES
  const formatDataByMonthIncome = () => {
    const dataByMonthIncome = Array(12).fill(0);
  
    getDateIncome.forEach((date, index) => {
      const incomeMonth = new Date(date).getMonth();
      dataByMonthIncome[incomeMonth] += +incomeAmountData[index].replace(/[$€]/g,'');
      console.log('esto es incomeAmountData', incomeAmountData[index])
    });
  
    return dataByMonthIncome;
  };

  const dataByMonthIncome = formatDataByMonthIncome();
  
  const midata = {
    labels: months,
    datasets: [
    {
        label: 'Incomes',
        data: dataByMonthIncome,
        fill : true,
        borderColor: 'rgba(18, 181, 0)',
        backgroundColor: 'rgba(22, 231, 0, 0.5)',
        pointRadius: 3,
        pointBorderColor: 'rgba(18, 181, 0)',
        pointBackgroundColor: 'rgba(18, 181, 0)',
        
    },
    {
        label: 'Expenses',
        data: dataByMonthExpense,
        fill : true,
        borderColor: 'rgb(254, 27, 27)',
        backgroundColor: 'rgba(178, 1, 1, 0.5)',
        pointRadius: 3,
        pointBorderColor: 'rgba(254, 53, 53)',
        pointBackgroundColor: 'rgba(254, 53, 53)',
       

    },
       
    ],
};

let misoptions = {
    scales : {
        y : {
            min : 0
        },
        x: {
            ticks: { color: 'rgb(247, 162, 14)'},
        }
    }

};

    return <Line className='chart' data={midata} options={misoptions}/>
}