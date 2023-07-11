import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import '../Chart/Chart.css'
import axios from 'axios';

ChartJS.register(ArcElement, Tooltip, Legend);


const backendUrl = process.env.REACT_APP_BACKEND_URL;

export default function Pies() {


    // const [transactionCategoryData, setTransactionCategoryData] = useState([]);
    // const [transactionAmountData, setTransactionAmountData] = useState([]);
    const [transactionData, setTransactionData] = useState([]);

    const transactionGetter  = async ()=> {
    
        const userId = window.localStorage.getItem('userId') 
        try {
            const response = await axios.get(`${backendUrl}/api/v1/get-transaction/${userId}`);
            const transactions = response.data.map((item) => ({
                category: item.category,
                amount: item.amount,
              }));
              setTransactionData(transactions);
        }catch ( error ){
            console.log('Error get category', error)
        }
    };  

    useEffect(() => {
        transactionGetter();
    }, []);

    const getCategoryTotals = () => {
      const categoryTotals = {};
      transactionData.forEach((transaction) => {
        const { category, amount } = transaction;
        const numericAmount = parseFloat(amount.replace(/[€$]/g, ''));
        if (category in categoryTotals) {
          if (categoryTotals[category].count > 1) {
            categoryTotals[category].total += numericAmount;
          } else {
            categoryTotals[category].total -= numericAmount;
            categoryTotals[category].count++;
          }
        } else {
          categoryTotals[category] = { total: numericAmount, count: 0 };
        }
      });
      return categoryTotals;
    };
      
      const getCategoryLabels = () => {
        const categoryLabels = Object.keys(getCategoryTotals());
        return categoryLabels;
      };
      
      const categoryTotals = getCategoryTotals();
      const dataByCategory = Object.values(categoryTotals).map((value) => Number(value.total));
      console.log('que es databycategory', dataByCategory);
      
      const categoryLabels = getCategoryLabels();

    const options = {
        responsive : true,
        maintainAspectRatio: false,
    };
    
    const data = {
        labels: categoryLabels,
        datasets: [
            {
                label: 'Categories',
                data: dataByCategory,
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(75, 191, 70, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(75, 50, 120, 0.2)',
                    'rgba(180, 100, 120, 0.2)',
                    
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(75, 191, 70, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(75, 50, 120, 1)',
                    'rgba(180, 100, 120, 1)',
                    
                    
                   
                ],
                borderWidth: 1,
            },
        ],
    };

    return <Pie data={data} options={options} />
}