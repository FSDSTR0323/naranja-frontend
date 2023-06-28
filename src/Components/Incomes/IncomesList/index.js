import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import '../IncomesList/IncomeList.css'

const IncomeList = ({refresh}) => {

    const [incomeList, setIncomeList] = useState([])

    const incomesGetter = async ()=> {
        try {
            const {data} = await axios.get('http://localhost:5000/api/v1/get-income');
            setIncomeList(data); 
            console.log("esto es data", data)
        }catch ( error ){
            console.log('Error get Income', error)
        }
    };   

    const handleDeleteIncome = async (_id) => {
        try {
            await axios.delete(`http://localhost:5000/api/v1/delete-income/${_id}`);
            incomesGetter()
        } catch (error){
            console.log(error)
        }
    }
    
    useEffect(()=>{
        incomesGetter()
    },[refresh]) 
     

    const IncomeCard = ({title, amount, date, category, description, _id }) => (
        
        <div className='incomeList__container'>
            <div id='items__incomes'>
                    <div className='icon'>
                    </div>
                    <h5>{title}</h5>
                    <p>{amount}</p>
                    <date>{date}</date>
                    <p>{category}</p>
                    <p>{description}</p>
                    <Button type='submit' id='dltIncome' onClick={()=> handleDeleteIncome(_id)}>Delete</Button>
            </div>
        
        </div>
    )

  
  return (

    <div className='income_card'>
        {incomeList.map(income => <IncomeCard key={income._id} _id={income._id} title={income.title} amount={income.amount} date={income.date} category={income.category} description={income.description} > </IncomeCard>)}      
    </div>
)}

export default IncomeList
