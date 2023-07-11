import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import '../ExpenseList/ExpenseList.css';
import { dateFormat } from '../../utils/dateFormat';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const ExpenseList = ({ refresh }) => {
  const [expenseList, setExpenseList] = useState([]);
  const [showModal, setShowModal] = useState(false); // Estado para controlar la visibilidad del pop-up
  const [selectedExpense, setSelectedExpense] = useState(null); // Estado para almacenar el gasto seleccionado

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

  const handleDeleteExpense = async (_id) => {
    try {
      await axios.delete(`${backendUrl}/api/v1/delete-expense/${_id}`);
      expensesGetter();
    } catch (error) {
      console.log(error);
    }
  };

  const handleModifyExpense = (_id) => {
    const expense = expenseList.find((item) => item._id === _id);
    setSelectedExpense(expense);
    setShowModal(true);
  };

  const totalExpenses = expenseList.reduce((total, expense) => {
    const amount = expense.amount.replace(/[$€]/g,''); 
    console.log('amount:', amount)
    return total + Number(amount);
  }, 0);

  const ExpenseCard = ({ title, amount, date, category, description, _id }) => (
    <div className='expenseList__container'>
      <div id='items__expenses'>
        <div className='icon'></div>
        <h5>{title}</h5>
        <p>{amount}</p>
        <date>{dateFormat(date)}</date>
        <p>{category}</p>
        <p>{description}</p>
        <Button type='submit'variant='secondary' id='mdfyIncome' onClick={() => handleModifyExpense(_id)}>
          Modify
        </Button>
        <Button type='submit' id='dltExpense' onClick={() => handleDeleteExpense(_id)}>
          Delete
        </Button>
      </div>
    </div>
  );

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedExpense(null);
  };

  const handleSaveChanges = async () => {
    try {
      await axios.put(`${backendUrl}/api/v1/update-expense/${selectedExpense._id}`, selectedExpense);
      handleCloseModal();
      expensesGetter();
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    setSelectedExpense({ ...selectedExpense, [e.target.name]: e.target.value });
  };

  return (
    <div id='expense__card'>
      {expenseList.map((expense) => (
        <ExpenseCard
          key={expense._id}
          _id={expense._id}
          title={expense.title}
          amount={expense.amount}
          date={expense.date}
          category={expense.category}
          description={expense.description}
        />
      ))}
    
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton className='modal__header'>
          <Modal.Title className='title__popup'>Modify Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body className='modal__body'>
          <div>
            <label className='label__popup'>Title:</label>
            <Form.Control
              type='text'
              name='title'
              className='input__popup'
              value={selectedExpense?.title || ''}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className='label__popup'>Amount:</label>
            <Form.Control
              type='text'
              name='amount'
              className='input__popup'
              value={selectedExpense?.amount || ''}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className='label__popup'>Date:</label>
            <Form.Control
              type='date'
              name='date'
              className='input__popup'
              value={selectedExpense?.date || ''}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className='label__popup'>Category:</label>
            <Form.Control
              type='text'
              name='category'
              className='input__popup'
              value={selectedExpense?.category || ''}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className='label__popup'>Description:</label>
            <Form.Control
              type='text'
              name='description'
              className='input__popup'
              value={selectedExpense?.description || ''}
              onChange={handleInputChange}
            />
          </div>
        </Modal.Body>
        <Modal.Footer id='modal__footer'>
          <Button variant='secondary' onClick={handleCloseModal}>
            Close
          </Button>
          <Button  id='btn__saveChanges' onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ExpenseList;