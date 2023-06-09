import React, { useState } from 'react'
import { Button, Container, Form, Navbar} from 'react-bootstrap'
import './Login.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const backendUrl = process.env.REACT_APP_BACKEND_URL;



const Login = () => {

  const [error, setError] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPasword] = useState('');

  const  AuthLogin = async () => {
   
    try{
      const response = await axios.post(`${backendUrl}/login`, {email, password})
      console.log('vemos response', response)
      //Autentification
      const token = response.data.token;
      const imageUrl = response.data.user.image
      const userId = response.data.user.id
      // console.log('response data: ', response.data)
      console.log('response data user: ', response.data.user.image)
      window.localStorage.setItem('token', token);
      window.localStorage.setItem("userId", userId)
      window.localStorage.setItem("imageUrl", imageUrl)
      navigate("/dashboard")

    }catch (error) {
      console.log('This is error', error.response.data.error)
      setError(error.response.data.error)
    }
      
  }
  const navigate = useNavigate();
 async function handleClick(){
    await AuthLogin()
    
  }
  return (
    <>
    
    <Container id='main-container' className='container__login'>
    <Form id='sign-in-form' className='text-center p-4 w-100'>
      <img className='mb-3 bootstrap-logo' 
            src='https://cdn1.iconfinder.com/data/icons/vibrancie-action/30/action_081-account-user-profile-avatar-512.png' 
            alt='Bootstrap 5'/>
      <h1 className='mb-3 fs-4 fw-normal enterAccount__title'>Enter Account</h1>
      <Form.Group controlId='sign-in-email-address'>
        <Form.Control value={email} onChange={e => setEmail(e.currentTarget.value)} type='email' size='lg' placeholder='Email address' autoComplete='username' className='inputsRegister' />
      </Form.Group><br/>
      <Form.Group className="mb-3" controlId="sign-in-password">
        <Form.Control value={password} onChange={e => setPasword(e.currentTarget.value)} type='password' size='lg' placeholder='Password' autoComplete='current-password' className='inputsRegister' />
      </Form.Group>
      <Form.Group className='d-flex justify-content-center mb-4' controlId='remember-me'>
        <Form.Check label='Remember me' className='rememberMe'/>
      </Form.Group>
      <Form.Group className='d-flex justify-content-center mb-4'>
          <Navbar.Text ><a className='create__account' href='/register'>Create Account</a></Navbar.Text>
      </Form.Group>
      
      <div className='d-grid'>
        <Button onClick={handleClick} variant='primary' size='lg' className='btn__signIn'>Sign In</Button>
      </div>
      
      {error &&  <p id='err__msg'>{error}</p>}
      <p className='mt-5 text-muted'>&copy; 2023-2023</p>
    </Form>
  </Container>
  </>
  )
}

export default Login

