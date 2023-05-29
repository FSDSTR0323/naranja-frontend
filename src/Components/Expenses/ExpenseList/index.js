import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Form, ListGroup, ListGroupItem } from 'react-bootstrap'

const ExpenseList = () => {

    const ExpenseCard = ({title, amount, date, option, description }) => (
        
        <div className='expenseList__container'>
        <ListGroup as={'ul'}>
            {/* AÑADIR ICONO EN REFERENCIA A LA OPCIÓN DEL GASTO  */}
            <ListGroupItem as={'li'}>{title}</ListGroupItem>
            <ListGroupItem as={'li'}>{amount}</ListGroupItem>
            <ListGroupItem as={'li'}>{date}</ListGroupItem>
            <ListGroupItem as={'li'}>{option}</ListGroupItem>
            <ListGroupItem as={'li'}>{description}</ListGroupItem>
            <Button type='submit' className='dltExpense'>Delete</Button>
        </ListGroup>
        </div>
    )

        const [expenseList, setExpenseList] = useState([])

        const expenseGetter = async () => {
            // AÑADIR LA RUTA GET PARA REFRESCAR AL ADD GASTO
            const {data} = await axios.get('');
            setExpenseList(data);
        };

        useEffect(() => {
            expenseGetter()
        },[])
   

  return (
    <div className='expense_card'>
      <Form.Control>
        {expenseList.map(expense => <ExpenseCard key={expense.id} title={expense.title} amount={expense.amount} date={expense.date} option={expense.option} description={expense.description} > </ExpenseCard>)}
      </Form.Control>
    </div>
)}


export default ExpenseList
