import React from 'react'
import { Button, Form } from 'react-bootstrap'
import '../Incomes/style.css';
import { useForm } from 'react-hook-form';
import axios from 'axios';


const FormIncome = () => {
    const {register, handleSubmit} = useForm();

    const onSubmit = FormData => {
        addIncome(FormData)
    }

    const addIncome = async (newIncome) => {
        try {
            await axios.post('http://localhost:5000/add-income', newIncome);
        } catch (error) {
            console.error('Error create Income', error)
        }
    };



  return (
    <div className='main__container'>
        <div className='title_income'>
            <h2>Incomes</h2>
        </div>

        <div className='total__income'>
        <Form.Control as='input'  size='lg' disabled readOnly/>
        </div>
    
    <Form onSubmit={handleSubmit(onSubmit)} className='custom__form__income'>
        <Form.Group>
            <Form.Label>Title Income:</Form.Label>
            <Form.Control required className='add__income' type='text' placeholder='Add Income' {...register('income', {required:true})} />
        </Form.Group>
        <Form.Group>
            <Form.Control required className='amount' type='number' placeholder='Add Amount' {...register('amount')} />
        </Form.Group>
        <Form.Group>
            <Form.Control  className='date' type='date' {...register('date')} />
        </Form.Group>
        <Form.Group className='select__category__income' {...register('category')}>
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
        <Button type='submit' onClick={addIncome} className='button__add' variant="outline-primary">Add Income</Button>
    </Form>
    </div>
  )
}

export default FormIncome
