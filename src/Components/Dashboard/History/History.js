import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { dateFormat } from '../../utils/dateFormat';
import '../History/History.css';
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

const HistoryList = ({ refresh }) => {
  const [historyList, setHistoryList] = useState([]);

  const historysGetter = async () => {
    const userId = window.localStorage.getItem('userId');
    console.log(userId);
    try {
      const { data } = await axios.get(`${backendUrl}/api/v1/get-history/${userId}`);
      setHistoryList(data);
      console.log('esto es data', data);
    } catch (error) {
      console.log('Error get History', error);
    }
  };

  useEffect(() => {
    historysGetter();
  }, [refresh]);

  const getIconByCategory = (category) => {
    switch (category) {
      case 'Education':
        return <FontAwesomeIcon className='icon' icon='graduation-cap' />;
      case 'Groceries':
        return <FontAwesomeIcon className='icon' icon='shopping-basket' />;
      case 'Health':
        return <FontAwesomeIcon className='icon' icon='briefcase-medical' />;
        case 'Subscriptions':
        return <FontAwesomeIcon className='icon' icon='tv' />;
      case 'Takeaways':
        return <FontAwesomeIcon className='icon' icon='burger' />;
      case 'Clothing':
        return <FontAwesomeIcon className='icon' icon='tshirt' />;
      case 'Travelling':
        return <FontAwesomeIcon className='icon' icon='plane' />;
      default:
        return <FontAwesomeIcon className='icon' icon='ellipsis-h' />;
    }
  };

  return (
    <div id='history__card'>
      <h3 id='title__recent__history'>Recent History</h3>
      
      {historyList.map(({ _id, title, amount, date, category, description, type }) => (
        <div key={_id} id='items__historys' style={{ color: type === 'Expense' ? 'red' : 'green' }}>
          {getIconByCategory(category)}
          <h5>{title}</h5>
          <p>{amount}</p>
          <date>{dateFormat(date)}</date>
          <p>{category}</p>
          <p>{description}</p>
        </div>
      ))}
    </div>
  );
};

export default HistoryList;