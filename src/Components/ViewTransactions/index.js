import React, { useEffect, useState } from 'react'
import '../ViewTransactions/Transactions.css'
import axios from 'axios'
import Menu from '../Menu'
import { Button} from 'react-bootstrap'
const backendUrl = process.env.REACT_APP_BACKEND_URL;




const TransactionList = ({refresh}) => {

  const [transactionList, setTransactionList] = useState([])
  console.log("funciona?");

  const transactionsGetter = async ()=> {
    console.log("transaction getter?");
    const userId = window.localStorage.getItem("userId");
    
    console.log(userId)
      try {
          const {data} = await axios.get(`${backendUrl}/api/v1/get-transaction/${userId}`);
          setTransactionList(data); 
          console.log("esto es data", data)
         
      }catch ( error ){
          console.log('Error get Transaction', error)
      }
  };   

  const handleDeleteTransaction = async (_id) => {
      try {
          await axios.delete(`${backendUrl}/api/v1/delete-transaction/${_id}`);
          transactionsGetter()
      } catch (error){
          console.log(error)
      }
  }
  
  useEffect(()=>{
      transactionsGetter()
  },[refresh]) 
   

  const TransactionCard = ({title, amount, date, category, description, _id }) => (
      
      <div className='transactionList__container'>
          <div id='items__transactions'>
                  <div className='icon'>
                  </div>
                  <h5>{title}</h5>
                  <p>{amount}</p>
                  <date>{date}</date>
                  <p>{category}</p>
                  <p>{description}</p>
                  <Button type='submit' id='dltTransaction' onClick={()=> handleDeleteTransaction(_id)}>Delete</Button>
          </div>
      
      </div>
  )


return (
  
  <>
    <Menu />

    <div className='main__container'>
      <div className='title_transaction'>
        <h2>Transactions</h2>
      </div>

      <div className='total__transactions'></div>

      <div className='transaction_card'>
        {transactionList.map(transaction => (
          <TransactionCard
            key={transaction._id}
            _id={transaction._id}
            title={transaction.title}
            amount={transaction.amount}
            date={transaction.date}
            category={transaction.category}
            description={transaction.description}
          />
        ))}
      </div>
    </div>
  </>
)}


export default TransactionList