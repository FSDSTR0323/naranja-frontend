import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { dateFormat } from '../../utils/dateFormat';
import '../History/History.css'

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





  return (
    
    <div id='history__card'>

      <h3 id='title__recent__history'>Recent History</h3>
      
      {historyList.map(({ _id, title, amount, date, category, description, type}) => (
        <div key={_id} id='items__historys'>
          <div className='icon'></div>
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
