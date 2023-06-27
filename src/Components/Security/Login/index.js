import React, { useState } from 'react'
import { Button, Container, Form, Navbar} from 'react-bootstrap'
import './Login.css'
import axios from 'axios';


const Login = () => {

  const [error, setError] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPasword] = useState('');

  const  AuthLogin = async () => {
    try{
      const response = await axios.post('http://localhost:5000/login', {email, password})
      console.log('vemos response', response)
      //Autentification
      const token = response.data.token;
      window.localStorage.setItem('token', token);
    }catch (error) {
      console.log('This is error', error)
      setError(error.response.data.error)
    }
  }
  return (
    <Container id='main-container' className='container__login'>
    <Form id='sign-in-form' className='text-center p-4 w-100'>
      <img className='mb-3 bootstrap-logo' 
            src='https://cdn1.iconfinder.com/data/icons/vibrancie-action/30/action_081-account-user-profile-avatar-512.png' 
            alt='Bootstrap 5'/>
      <h1 className='mb-3 fs-4 fw-normal enterAccount__title'>Enter Account</h1>
      <Form.Group controlId='sign-in-email-address'>
        <Form.Control value={email} onChange={e => setEmail(e.currentTarget.value)} type='email' size='lg' placeholder='Email address' autoComplete='username' className='position-relative' />
      </Form.Group><br/>
      <Form.Group className="mb-3" controlId="sign-in-password">
        <Form.Control value={password} onChange={e => setPasword(e.currentTarget.value)} type='password' size='lg' placeholder='Password' autoComplete='current-password' className='position-relative' />
      </Form.Group>
      <Form.Group className='d-flex justify-content-center mb-4' controlId='remember-me'>
        <Form.Check label='Remember me'/>
      </Form.Group >
      <Form.Group className='d-flex justify-content-center mb-4'>
          <Navbar.Text ><a className='create__account' href='/register'>Create Account</a></Navbar.Text>
      </Form.Group>
      <div className='d-grid'>
        <Button onClick={AuthLogin} variant='primary' size='lg' className='btn__signIn'>Sign In</Button>
      </div>
      {error &&  <p id='err__msg'>{error}</p>}
      <p className='mt-5 text-muted'>&copy; 2023-2023</p>
    </Form>
  </Container>
  )
}

export default Login

