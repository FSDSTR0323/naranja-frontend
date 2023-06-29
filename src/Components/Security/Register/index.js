import React, { useState } from 'react'
import { Button, Container, Form} from 'react-bootstrap';
import './Register.css'
import axios from 'axios';
import useForm from '../../hooks/useForm';
import { useNavigate } from 'react-router-dom';

const Register = () => {

  const [image, setImage] = useState('')

  const [userImage, setUserImage] = useState();

    const [name, setName] = useState('');
    const [surName, setSurname] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [gender, setGender] = useState('');
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
 

    const initialData = {
        name: '',
        surName: '',
        birthdate: '',
        gender: '',
        email: '',
        password:'',
        image: '',
    }
   

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

        const {form, errors, handleChange, handleSubmit} = useForm(initialData, onValidate)


    const  AuthRegister = async () => {

        try{
         const response = await axios.post('http://localhost:5000/register', {email, password, name, surName, gender, birthdate,image })
          const token = response.data.token;
          window.localStorage.setItem('token', token);
        }catch (error) {
          setError(error.response.data.error)
        }
      }

      const UploadAvatar = async (e) => {
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'OrangeTracker');
        const res = await fetch ('https://api.cloudinary.com/v1_1/dq0r13g4u/image/upload',
        {
            method: 'POST',
            body: data,
        }
        )
            const file = await res.json();
            setImage(file.secure_url)
    }
      

      const navigate = useNavigate();
      async function handleClick(){
         await AuthRegister()
         navigate("/dashboard")

      }
    return (
        <div className='form__register'>
        <Container className='register__container'>

        <Form.Group controlId="formFileSm" className="mb-3">
            <Form.Control type="file" size="sm"  onChange={UploadAvatar} />
            {(<img className='newImg__avatar' onChange={e => setUserImage(e.currentTarget.value)} src={image} alt=''/>)} 
        </Form.Group>


        <Form className='custom__form__register' noValidate onSubmit={handleSubmit}>
            <div className='avatar__register__title'>
                <h1 className="mb-1 fs-2 fw-normal register__title">Register</h1> 
                <p className='msg__create__account'>Create your account. It's free and only takes a minute.</p>
            </div>
            
            <Form.Group className="mb-1">
                <Form.Label className='text-danger' >* Name:</Form.Label>
                <Form.Control required  name='name' onChange={e => setName(e.currentTarget.value)}  className='name' type='text' size="lg" /> 
                {errors.name && <div className="alert alert-warning p-1">{errors.name}</div>}
            </Form.Group>

            <Form.Group className="mb-1">
                <Form.Label  className='text-danger'>* Surname:</Form.Label>
                <Form.Control required className='surName'  onChange={e => setSurname(e.currentTarget.value)} name='surName' type='text' size="lg" />
                {errors.surName && <div className="alert alert-warning p-1">{errors.surName}</div>}
            </Form.Group>

            <Form.Group>
                <Form.Label  className='text-danger'>* Add your birthdate:</Form.Label>
                <Form.Control size='lg' required className='birthdate' onChange={e => setBirthdate(e.currentTarget.value)} type='date' name='birthdate' />
                {errors.birthdate && <div className="alert alert-warning p-1">{errors.birthdate}</div>}
            </Form.Group>

            <Form.Group>
            <Form.Label  className='text-danger'>* Select gender:</Form.Label>
                <Form.Check label="Male" onChange={e => setGender(e.currentTarget.value)} value='male' size='lg' required className='gender' name='gender' type='radio'/>
                <Form.Check label="Female" onChange={e => setGender(e.currentTarget.value)} value='female' size='lg' required className='gender' name='gender' type='radio' />
                <Form.Check label="Other" onChange={e => setGender(e.currentTarget.value)} value='other' size='lg' required className='gender' name='gender' type='radio' />
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
                <Form.Control required value={form.password} type="password" size="lg"  className="position-relative" name='password' autoComplete="new-password" onChange={handleChange}/>
                {errors.password && <div className="alert alert-warning p-1">{errors.password}</div>}
            </Form.Group>

            <Form.Group className="mb-4" controlId="register__confirm__password">
                <Form.Label  className="text-danger">* Confirm password:</Form.Label>
                <Form.Control required value={password}  type="password" size="lg" onChange={e => setPassword(e.currentTarget.value)} name='password' autoComplete="new-password" className="position-relative" />
                {errors.password && <div className="alert alert-warning p-1">{errors.password}</div>}
            </Form.Group>

            
            <Button type='submit' onClick={handleClick} className='btn__register' size='lg'  variant="outline-primary">Register Now</Button>
            {error &&  <p id='err__msg'>{error}</p>}
            <Form.Text className='msg__create__account'>Already have an account? <a className='signin__register' href='/'>Sign in</a></Form.Text>
        </Form>
        </Container>
        </div>
      )
    }

export default Register
