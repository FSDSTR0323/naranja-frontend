import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import '../IncomesList/IncomeList.css'
import { dateFormat } from '../../utils/dateFormat';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const IncomeList = ({refresh}) => {

    const [incomeList, setIncomeList] = useState([])

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
    },[refresh]) 

    const handleDeleteIncome = async (_id) => {
        try {
            await axios.delete(`${backendUrl}/api/v1/delete-income/${_id}`);
            incomesGetter()
        } catch (error){
            console.log(error)
        }
    }

    //MODIFY INCOME PENDIENTE ***
    const handleModifyIncome = async (_id) => {
        try {
            await axios.put(`${backendUrl}/api/v1/delete-income/${_id}`);
            incomesGetter()
        } catch (error){
            console.log(error)
        }
    }
    
   
     

    const IncomeCard = ({title, amount, date, category, description, _id }) => (
        
        <div className='incomeList__container'>
            <div id='items__incomes'>
                    <div className='icon'>
                    </div>
                    <h5>{title}</h5>
                    <p>{amount}</p>
                    <date>{dateFormat(date)}</date>
                    <p>{category}</p>
                    <p>{description}</p>
                    <Button type='submit' id='dltIncome' onClick={()=> handleDeleteIncome(_id)}>Delete</Button>
                    <Button type='submit' id='mdfyIncome' onClick={()=> handleModifyIncome(_id)}>Modify</Button> 
            </div>
        
        </div>
    )

  
  return (

    <div className='income_card'>
        {incomeList.map(income => <IncomeCard key={income._id} _id={income._id} title={income.title} amount={income.amount} date={income.date} category={income.category} description={income.description} > </IncomeCard>)}      
    </div>
)}

export default IncomeList