import React, { useState } from 'react'
import { Button, Container, Form} from 'react-bootstrap';
import './Register.css'
import axios from 'axios';
import useForm from '../../hooks/useForm';

const Register = () => {

    const [email, setEmail] = useState('');
    const [password, setPasword] = useState('');
    const [error, setError] = useState('');

    const initialData = {
        name: '',
        surName: '',
        birthdate: '',
        gender: '',
        email: '',
        password:''
    }
   
// CAMBIAR NAME A FIRSTNAME ******************************
    const onValidate = (form) => {
        let isError = false;
        let errors = {};
        let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
        let regexsurName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
        let regexBirthdate = /^(?:0?[1-9]|1[0-2])\/(?:0?[1-9]|[12][0-9]|3[01])\/(?:19|20)\d{2}$/;
        let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
        let regexPassword = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

        if (!form.name.trim()) {
            errors.name = 'The "Name" field must not be empty.'
            isError = true;
          } else if (!regexName.test(form.name)){
            errors.name = 'The "Name" field only accepts letters and numbers.'
          }

          if (!form.surName.trim()) {
            errors.surName = 'The "surname" field must not be empty.'
            isError = true;
          } else if (!regexsurName.test(form.surName)){
            errors.surName = 'The "surName" field only accepts letters and numbers.'
          }

          if (!form.birthdate.trim()) {
            errors.birthdate = 'The "birthdate" field must not be empty.'
            isError = true;
          } else if (!regexBirthdate.test(form.birthdate)){
            errors.birthdate = 'You must be of legal age.'
          }

          if (!form.email.trim()) {
            errors.email = 'The "email" field must not be empty.'
            isError = true;
          } else if (!regexEmail.test(form.email)){
            errors.email = 'email field must be formatted as "@" email'
          }
      
          if (!form.password.trim()) {
            errors.password = 'The "password" field must not be empty.'
            isError = true;
          } else if (!regexPassword.test(form.password)){
            errors.password = 'The field "password" is not valid, it must contain at least one capital letter, one number and a minimum of 8 characters'
          }
      
          return isError ? errors : null
        }

        const{form, errors, loading, handleChange, handleSubmit} = useForm(initialData, onValidate)


    const  AuthRegister = async () => {

        try{
         const response = await axios.post('http://localhost:5000/register', {email, password})
          // window.location.href = '/dashboard';
        }catch ({errors}) {
          console.log('This is error', errors)
          // setError(error.response.data.error)
        }
      }
 
    return (
        <div className='form__register'>
        <Container className='register__container'>
        <Form className='custom__form__register' noValidate onSubmit={handleSubmit}>
            <div className='avatar__register__title'>
                {/* <img className="mb-3 register__logo" 
                src="https://cdn1.iconfinder.com/data/icons/vibrancie-action/30/action_081-account-user-profile-avatar-512.png" 
                alt="Bootstrap 5"/> */}
                <h1 className="mb-1 fs-2 fw-normal register__title">Register</h1> 
                <p className='msg__create__account'>Create your account. It's free and only takes a minute.</p>
            </div>
            <Form.Group className="mb-1">
                <Form.Label className='text-danger' >* Name:</Form.Label>
                <Form.Control required value={form.name} name='name' onChange={handleChange} className='name' type='text' size="lg" /> 
                {errors.name && <div className="alert alert-warning p-1">{errors.name}</div>}
            </Form.Group>

            <Form.Group className="mb-1">
                <Form.Label  className='text-danger'>* Surname:</Form.Label>
                <Form.Control required className='surName' value={form.surName} name='surName' onChange={handleChange} type='text' size="lg" />
                {errors.surName && <div className="alert alert-warning p-1">{errors.surName}</div>}
            </Form.Group>

            <Form.Group>
                <Form.Label  className='text-danger'>* Add your birthdate:</Form.Label>
                <Form.Control size='lg' required className='birthdate' type='date' value={form.birthdate} name='birthdate' onChange={handleChange}/>
                {errors.birthdate && <div className="alert alert-warning p-1">{errors.birthdate}</div>}
            </Form.Group>

            <Form.Group>
            <Form.Label  className='text-danger'>* Select gender:</Form.Label>
                <Form.Check label="Male"  value='male' size='lg' required className='gender' name='gender' type='radio'/>
                <Form.Check label="Female"  value='female' size='lg' required className='gender' name='gender' type='radio' />
                <Form.Check label="Other"  value='other' size='lg' required className='gender' name='gender' type='radio' />
                {errors.gender && <div className="alert alert-warning p-1">{errors.gender}</div>}
            </Form.Group>

            <Form.Group controlId="register__email__address">
                <Form.Label  className="text-danger">* Add your email:</Form.Label>
                <Form.Control required value={form.email}  type="email" size="lg" className="position-relative" autoComplete='user-name' name='email' onChange={handleChange} />
                {errors.email && <div className="alert alert-warning p-1">{errors.email}</div>}
            </Form.Group>

            <Form.Group controlId="register__confirm__email__address">
                <Form.Label  className="text-danger">* Confirm email:</Form.Label>
                <Form.Control required value={email} onChange={e => setEmail(e.currentTarget.value)} type="email" size="lg"  name='email' autoComplete='user-name' className="position-relative" />
                {errors.email && <div className="alert alert-warning p-1">{errors.email}</div>}
            </Form.Group>

            <Form.Group className="mb-1" controlId="register__password">
                <Form.Label  className="text-danger">* Password:</Form.Label>
                <Form.Control required value={form.password} type="password" size="lg" className="position-relative" name='password' autoComplete="new-password" onChange={handleChange}/>
                {errors.password && <div className="alert alert-warning p-1">{errors.password}</div>}
            </Form.Group>

            <Form.Group className="mb-4" controlId="register__confirm__password">
                <Form.Label  className="text-danger">* Confirm password:</Form.Label>
                <Form.Control required value={password} onChange={e => setPasword(e.currentTarget.value)} type="password" size="lg"  name='password' autoComplete="new-password" className="position-relative" />
                {errors.password && <div className="alert alert-warning p-1">{errors.password}</div>}
            </Form.Group>

            <Button type='submit' onClick={AuthRegister} className='btn__register' size='lg'  variant="outline-primary">Register Now</Button>
            <Form.Text className='msg__create__account'>Already have an account? <a className='signin__register' href='/'>Sign in</a></Form.Text>
        </Form>
        </Container>
        </div>
      )
    }

export default Register
