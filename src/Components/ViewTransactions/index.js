import React, { useEffect, useState } from 'react';
import '../ViewTransactions/Transactions.css';
import axios from 'axios';
import Menu from '../Menu';
import { dateFormat } from '../utils/dateFormat';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faGraduationCap,
  faShoppingBasket,
  faBriefcaseMedical,
  faHamburger,
  faTshirt,
  faPlane,
  faEllipsisH,
  faTv
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faBars,
  faTimes,
  faGraduationCap,
  faShoppingBasket,
  faBriefcaseMedical,
  faHamburger,
  faTshirt,
  faPlane,
  faEllipsisH,
  faTv
);

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
    let icon = null;

    switch (category) {
      case 'Education':
        icon = <FontAwesomeIcon className='icon' icon='graduation-cap' />;
        break;
      case 'Groceries':
        icon = <FontAwesomeIcon className='icon' icon='shopping-basket' />;
        break;
      case 'Health':
        icon = <FontAwesomeIcon className='icon' icon='briefcase-medical' />;
        break;
        case 'Subscriptions':
        icon = <FontAwesomeIcon className='icon' icon='tv' />;
        break;
      case 'Takeaways':
        icon = <FontAwesomeIcon className='icon' icon='burger' />;
        break;
      case 'Clothing':
        icon = <FontAwesomeIcon className='icon' icon='tshirt' />;
        break;
      case 'Travelling':
        icon = <FontAwesomeIcon className='icon' icon='plane' />;
        break;
      default:
        icon = <FontAwesomeIcon className='icon' icon='ellipsis-h' />;
    }
  

    return (
      <tr key={_id}>
        <td>{icon}</td>
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
        <div className='title__transaction'>
          <h2 id='title__transactions'>Transactions</h2>
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