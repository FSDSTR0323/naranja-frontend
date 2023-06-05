import React, { useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap';
import '../Register/Register.css'
import axios from 'axios';


const Register = () => {

    const [email, setEmail] = useState('');
    // const [name, setName] = useState('');
    const [password, setPasword] = useState('');
    const [error, setError] = useState('')
    const [selectedGender, setSelectedGender] = useState('');


    const handleGenderChange = (event) => {
        setSelectedGender(event.target.value);
      };

    const  AuthRegister = async () => {
        try{
          const response = await axios.post('https://localhost:5000/register', {email, password})
        }catch ({error}) {
          console.log('This is error', error)
          setError(error.response.data.result)
        }
      }
 
    return (
        <div className='form__register'>
        <Container className='register__container'>
        <Form className='custom__form__register'>
            <div className='avatar__register__title'>
                {/* <img className="mb-3 register__logo" 
                src="https://cdn1.iconfinder.com/data/icons/vibrancie-action/30/action_081-account-user-profile-avatar-512.png" 
                alt="Bootstrap 5"/> */}
                <h1 className="mb-1 fs-2 fw-normal register__title">Register</h1>
            </div>
            {/* // FALTA CREAR LAS VALIDACIONES DE ERRORES!!!!!******************************************* */}
            <Form.Group hasvalidation className="mb-1">
                <Form.Label className='text-danger'>* Name:</Form.Label>
                {/* //isInvalid sirve para crear la validacion***** */}
                <Form.Control required className='name' type='text' size="lg" /> 
                <Form.Control.Feedback type="invalid">
                    Please add a name.
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-1">
                <Form.Label  className='text-danger'>* Surname:</Form.Label>
                <Form.Control required className='surName' type='text' size="lg" />
            </Form.Group>

            <Form.Group>
                <Form.Label  className='text-danger'>* Add your birthdate:</Form.Label>
                <Form.Control size='lg' required className='birthdate' type='date' placeholder=""/>
            </Form.Group>

            <Form.Group>
            <Form.Label  className='text-danger'>* Select gender:</Form.Label>
                <Form.Check label="Male" checked={selectedGender === 'male'} value='male' size='lg' required className='gender' type='radio' onChange={handleGenderChange}/>
                <Form.Check label="Female" checked={selectedGender === 'female'} value='female' size='lg' required className='gender' type='radio' onChange={handleGenderChange}/>
                <Form.Check label="Other" checked={selectedGender === 'other'} value='other' size='lg' required className='gender' type='radio' onChange={handleGenderChange}/>
            </Form.Group>

            <Form.Group controlId="register__email__address">
                <Form.Label  className="text-danger">* Add your email:</Form.Label>
                <Form.Control required  type="email" size="lg" className="position-relative" />
            </Form.Group>

            <Form.Group controlId="register__confirm__email__address">
                <Form.Label  className="text-danger">* Confirm email:</Form.Label>
                <Form.Control required value={email} onChange={e => setEmail(e.currentTarget.value)} type="email" size="lg" className="position-relative" />
            </Form.Group>

            <Form.Group className="mb-1" controlId="register__password">
                <Form.Label  className="text-danger">* Password:</Form.Label>
                <Form.Control required type="password" size="lg" className="position-relative" />
            </Form.Group>

            <Form.Group className="mb-4" controlId="register__confirm__password">
                <Form.Label  className="text-danger">* Confirm password:</Form.Label>
                <Form.Control required value={password} onChange={e => setPasword(e.currentTarget.value)} type="password" size="lg" className="position-relative" />
            </Form.Group>

            <Button  onClick={AuthRegister} className='btn__register' size='lg' variant="outline-primary">Sign Up</Button>
        </Form>
        </Container>
        </div>
      )
    }

export default Register
