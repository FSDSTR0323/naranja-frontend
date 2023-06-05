import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Form, ListGroup, ListGroupItem } from 'react-bootstrap'

const IncomeList = () => {

    const IncomeCard = ({title, amount, date, category, description }) => (
        
        <div className='incomeList__container'>
        <ListGroup as={'ul'}>
            {/* AÑADIR ICONO EN REFERENCIA A LA OPCIÓN DEL GASTO  */}
            <ListGroupItem as={'li'}>{title}</ListGroupItem>
            <ListGroupItem as={'li'}>{amount}</ListGroupItem>
            <ListGroupItem as={'li'}>{date}</ListGroupItem>
            <ListGroupItem as={'li'}>{category}</ListGroupItem>
            <ListGroupItem as={'li'}>{description}</ListGroupItem>
            <Button type='submit' className='dltIncome'>Delete</Button>
        </ListGroup>
        </div>
    )

        const [incomeList, setIncomeList] = useState([])

       
    const incomesGetter = async ()=> {
        const {data} = await axios.get('http://localhost:5000/');
        setIncomeList(data); // Nos podriamos quedar solo con data pasandolo como objeto en el await pero asi me parece más sencillo de entender.
    };   

    useEffect(()=>{
            incomesGetter()
        },[]) 
   

  return (
    <div className='income_card'>
      <Form.Control>
        {incomeList.map(income => <IncomeCard key={income.id} title={income.title} amount={income.amount} date={income.date} category={income.category} description={income.description} > </IncomeCard>)}
      </Form.Control>
    </div>
)}


export default IncomeList
