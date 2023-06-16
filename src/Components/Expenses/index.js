import React from 'react'
import { Button, Form } from 'react-bootstrap'
import '../Expenses/style.css';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Menu from '../Menu/index'

const FormExpense = () => {
    const {register, handleSubmit} = useForm();

    const onSubmit = FormData => {
        addExpense(FormData)
    }

    // RUTA POST PARA AÑADIR GASTO ***********
    const addExpense = async (newExpense) => {
        try {
            await axios.post('', newExpense);
        } catch (error) {
            console.error('Error create Expense', error)
        }
    };


  return (
    
    
    <>
      <Menu/>
      <span className='border__animation'> 
    <div className='expense__container'>
     
    
    
        

        <div className='title_expense'>
            <h2>Expenses</h2>
        </div>
        <div className='total__expense'>
        <Form.Control as='input'  size='lg' disabled readOnly/>
        </div>
       {/* ARREGLAR ANIMACION BORDES*********** */}
    <Form onSubmit={handleSubmit(onSubmit)} className='custom__form__expense'>
        <Form.Group>
            <Form.Label className='title__label__expense'>Title Expense:</Form.Label>
            <Form.Control required className='add__expense' type='text' placeholder='Add Expense' {...register('expense', {required:true})} />
        </Form.Group>
        <Form.Group>
            <Form.Control required className='amount' type='number' placeholder='Add Amount' {...register('amount')} />
        </Form.Group>
        <Form.Group>
            <Form.Control  className='date' type='date' {...register('date')} />
        </Form.Group>
        <Form.Group className='select__category__expense' {...register('category')}>
        <Form.Select>
            <option>Select category</option>
            <option value='1'>Education</option>
            <option value='2'>Groceries</option>
            <option value='3'>Health</option>
            <option value='4'>Subscriptions</option>
            <option value='5'>Takeaways</option>
            <option value='6'>Clothing</option>
            <option value='7'>Travelling</option>
            <option value='8'>Other</option>
        </Form.Select>
        </Form.Group>
        <Form.Group>
            <Form.Control className='amount' as='textarea' placeholder='Add description' {...register('description')}/>
        </Form.Group> <br/>
        <Button type='submit' onClick={() => addExpense(register)} id='button__add' variant="outline-primary">Add Expense</Button>
    </Form>
    
    <span></span>
    
   </div>
   </span>
    </>
    
   
  )
}

export default FormExpense
