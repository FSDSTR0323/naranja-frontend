import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button} from 'react-bootstrap'
import '../ExpenseList/ExpenseList.css'
import jwt_decode from 'jwt-decode';
const jwtSecret = process.env.JWT_SECRET;
const token = window.localStorage.getItem("token");
const backendUrl = process.env.REACT_APP_BACKEND_URL;




const ExpenseList = ({refresh}) => {

  const [expenseList, setExpenseList] = useState([])
  console.log("funciona?");

  const expensesGetter = async ()=> {
    console.log("expense getter?");
    const decoded = jwt_decode(token, jwtSecret);
    let userId = decoded.id
    // const userId = window.localStorage.getItem("userId");
    console.log(userId)
      try {
          const {data} = await axios.get(`${backendUrl}/api/v1/get-expense/${userId}`);
          setExpenseList(data); 
          console.log("esto es data", data)
         
      }catch ( error ){
          console.log('Error get Expense', error)
      }
  };   

  const handleDeleteExpense = async (_id) => {
      try {
          await axios.delete(`${backendUrl}/api/v1/delete-expense/${_id}`);
          expensesGetter()
      } catch (error){
          console.log(error)
      }
  }
  
  useEffect(()=>{
      expensesGetter()
  },[refresh]) 
   

  const ExpenseCard = ({title, amount, date, category, description, _id }) => (
      
      <div className='expenseList__container'>
          <div id='items__expenses'>
                  <div className='icon'>
                  </div>
                  <h5>{title}</h5>
                  <p>{amount}</p>
                  <date>{date}</date>
                  <p>{category}</p>
                  <p>{description}</p>
                  <Button type='submit' id='dltExpense' onClick={()=> handleDeleteExpense(_id)}>Delete</Button>
          </div>
      
      </div>
  )


return (

  <div className='expense_card'>
      {expenseList.map(expense => <ExpenseCard key={expense._id} _id={expense._id} title={expense.title} amount={expense.amount} date={expense.date} category={expense.category} description={expense.description} > </ExpenseCard>)}      
  </div>
)}


export default ExpenseList
