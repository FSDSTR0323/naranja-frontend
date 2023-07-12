import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import '../Expenses/style.css';
import axios from 'axios';
import Menu from '../Menu';
import ExpenseList from './ExpenseList';


const backendUrl = process.env.REACT_APP_BACKEND_URL;

const FormExpense = () => {
  const [expenseList, setExpenseList] = useState([]);
  const [refresh, toggle] = useState(false);
  const [error, setError] = useState('');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
//   const [totalExpense, setTotalExpense] = useState(0); // Estado para almacenar la suma de los 'amount' de expenses

 

  const addExpense = async () => {
    let userId = window.localStorage.getItem('userId');

    try {
      await axios.post(`${backendUrl}/api/v1/add-expense/${userId}`, {title, amount, description, category, date});
      toggle(!refresh);
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  const expensesGetter = async () => {
    const userId = window.localStorage.getItem('userId');
    try {
      const { data } = await axios.get(`${backendUrl}/api/v1/get-expense/${userId}`);
      setExpenseList(data);
    } catch (error) {
      console.log('Error get Expense', error);
    }
  };

  useEffect(() => {
    expensesGetter();
  }, []);

  const totalExpenses = expenseList.reduce((total, expense) => {
    const amount = expense.amount.replace(/[$€]/g, '');
    return total + Number(amount);
  }, 0);




  return (
    <>
      <Menu />

      <div id='expense__container'>
        <div className='title__expense'>
          <h2>Expenses</h2>
        </div>

        <div id='amount__totalExpenses'>
          <h4 className='title__totalExpense'>Total Expense:</h4>
          <h1 id='total__expense'>{totalExpenses}</h1>
        </div>

        <div id='form__container__expense'>
          <Form className='custom__form__expense'>
            <Form.Group>
              <Form.Label className='title__label__expense'>Title Expense:</Form.Label>
              <Form.Control
                value={title}
                onChange={(e) => setTitle(e.currentTarget.value)}
                required
                className='add__expense'
                type='text'
                placeholder='Add Expense'
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                value={amount}
                onChange={(e) => setAmount(e.currentTarget.value)}
                required
                className='amount'
                type='text'
                placeholder='Add Amount'
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                value={date}
                onChange={(e) => setDate(e.currentTarget.value)}
                className='date'
                type='date'
              />
            </Form.Group>
            <Form.Group className='select__category__expense'>
              <Form.Select value={category} onChange={(e) => setCategory(e.currentTarget.value)}>
                <option>Select category</option>
                <option value='Education'>Education</option>
                <option value='Groceries'>Groceries</option>
                <option value='Health'>Health</option>
                <option value='Subscriptions'>Subscriptions</option>
                <option value='Takeaways'>Takeaways</option>
                <option value='Clothing'>Clothing</option>
                <option value='Travelling'>Travelling</option>
                <option value='Other'>Other</option>
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Control
                value={description}
                onChange={(e) => setDescription(e.currentTarget.value)}
                className='amount'
                as='textarea'
                placeholder='Add description'
              />
            </Form.Group>{' '}
            <br />
            <Button type='submit'
                onClick={addExpense}
                id='button__add' 
                variant='outline-primary'>
              Add Expense
            </Button>
            {error && <p id='err__msg'>{error}</p>}
          </Form>

          <div id='expense__list__container'>
            <ExpenseList refresh={refresh} setExpenseList={setExpenseList} />
          </div>
        </div>
      </div>
    </>
  );
};

export default FormExpense;