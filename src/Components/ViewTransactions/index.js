import React, { useEffect, useState } from 'react';
import '../ViewTransactions/Transactions.css';
import axios from 'axios';
import Menu from '../Menu';
import { dateFormat } from '../utils/dateFormat';
const backendUrl = process.env.REACT_APP_BACKEND_URL;

const TransactionList = ({ refresh }) => {
  const [transactionList, setTransactionList] = useState([]);

  const transactionsGetter = async () => {
    const userId = window.localStorage.getItem('userId');

    console.log(userId);
    try {
      const { data } = await axios.get(`${backendUrl}/api/v1/get-transaction/${userId}`);
      setTransactionList(data);
      console.log('esto es data', data);
    } catch (error) {
      console.log('Error get Transaction', error);
    }
  };

  useEffect(() => {
    transactionsGetter();
  }, [refresh]);

  const TransactionCard = ({ title, amount, date, category, description, _id, type }) => {
    const textColor = type === 'Expense' ? 'red' : 'green';

    return (
      <tr key={_id}>
        <td>{/* Icono */}</td>
        <td style={{ color: textColor }}>{title}</td>
        <td style={{ color: textColor }}>{dateFormat(date)}</td>
        <td style={{ color: textColor }}>{category}</td>
        <td style={{ color: textColor }}>{amount}</td>
        <td style={{ color: textColor }}>{description}</td>
      </tr>
    );
  };

  return (
    <>
      <Menu />

      <div className='transactions__container'>
        <div className='title_transaction'>
          <h2>Transactions</h2>
        </div>
        <table className='table'>
          <thead>
            <tr>
              <th>Icon</th>
              <th>Title</th>
              <th>Date</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {transactionList.map((transaction) => (
              <TransactionCard
                key={transaction._id}
                _id={transaction._id}
                title={transaction.title}
                amount={transaction.amount}
                date={transaction.date}
                category={transaction.category}
                description={transaction.description}
                type={transaction.type}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TransactionList;