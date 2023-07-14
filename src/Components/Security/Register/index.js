import React, { useState } from 'react'
import { Button, Container, Form} from 'react-bootstrap';
import './Register.css'
import axios from 'axios';
import useForm from '../../hooks/useForm';
import { useNavigate } from 'react-router-dom';
const backendUrl = process.env.REACT_APP_BACKEND_URL;

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

        const regexList = {
            name: /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/,
            surName: /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/,
            birthdate: /^(?:0?[1-9]|1[0-2])\/(?:0?[1-9]|[12][0-9]|3[01])\/(?:19|20)\d{2}$/,
            email: /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/,
            password: /^(?=.*[A-Z])(?=.*\d).{8,}$/
        };  

        const {email, password, name, surName, gender, birthdate, image} = form

        for (const [key,value] of Object.entries(form)) { // Object.entries:  Nos devuelve una array con la key y value.
                if(!value.trim()){
                    errors[key] = `The "${key}" field must not be empty.`
                    isError = true;
                }else if (!regexList[key].test(value)){
                    errors[key] = `The "${key}" field only accepts letters and numbers.`
                }
                
            }
      
          return isError ? errors : null
        }

        const {form, errors, handleChange, handleSubmit} = useForm(initialData, onValidate)


    const  AuthRegister = async () => {

        try{
         const response = await axios.post(`${backendUrl}/register`, {email, password, name, surName, gender, birthdate, image })
          const token = response.data.token;
          const userId = response.data.user.id
          const imageUrl = image
          window.localStorage.setItem('token', token);
          window.localStorage.setItem("userId", userId)
          window.localStorage.setItem("imageUrl", imageUrl)
          navigate("/dashboard")
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
       
      }


      
    return (
        <div id='form__register'>
    

            <Form className='custom__form__register' noValidate onSubmit={handleSubmit}>
                

                <div className='avatar__register__title'>
                    <h1 className="mb-1 fs-2 fw-normal register__title">Register</h1> 
                    <p className='msg__create__account'>Create your account. It's free and only takes a minute.</p>
                </div>

                <div id='container__avatar__register'>
                    <label className="file-input-label__register">
                        <span className='span__img__register'>Add an image here:</span>
                            {!image && <input type="file" id='input__img__register' onChange={UploadAvatar} />}
                        
                            {image && (
                                <div id='image__container__register'>
                                    <img className='newImg__avatar__register' src={image} alt='' />
                                </div>
                            )}
                    </label>
                </div>
                <Form.Group className="mb-1">
                    <Form.Label className='text-danger' >* Name:</Form.Label>
                    <Form.Control required  name='name' onChange={e => setName(e.currentTarget.value)}  className='inputsRegister' type='text' size="lg" /> 
                    {errors.name && <div className="alert alert-warning p-1">{errors.name}</div>}
                </Form.Group>

                <Form.Group className="mb-1">
                    <Form.Label  className='text-danger'>* Surname:</Form.Label>
                    <Form.Control required className='surName inputsRegister'  onChange={e => setSurname(e.currentTarget.value)} name='surName' type='text' size="lg" />
                    {errors.surName && <div className="alert alert-warning p-1">{errors.surName}</div>}
                </Form.Group>

                <Form.Group>
                    <Form.Label  className='text-danger'>* Add your birthdate:</Form.Label>
                    <Form.Control size='lg' required className='birthdate inputsRegister' onChange={e => setBirthdate(e.currentTarget.value)} type='date' name='birthdate' />
                    {errors.birthdate && <div className="alert alert-warning p-1">{errors.birthdate}</div>}
                </Form.Group>

                <Form.Group>
                    <Form.Label  className='text-danger' id='label'>Gender:</Form.Label>
                        <Form.Select id='gender__profile' className='inputsRegister' size='lg'>
                            <option label="Male" value='male' onChange={e => setGender(e.currentTarget.value)}  required className='gender' name='gender'/>
                            <option label="Female" value='female' onChange={e => setGender(e.currentTarget.value)} required className='gender' name='gender'/>
                            <option label="Other" value='other' onChange={e => setGender(e.currentTarget.value)} required className='gender' name='gender'/>
                            {errors.gender && <div className="alert alert-warning p-1">{errors.gender}</div>}
                        </Form.Select>
                </Form.Group>

                <Form.Group controlId="register__email__address">
                    <Form.Label  className="text-danger">* Add your email:</Form.Label>
                    <Form.Control required value={form.email}  type="email" size="lg" className="inputsRegister" autoComplete='user-name' name='email' onChange={handleChange} />
                    {errors.email && <div className="alert alert-warning p-1">{errors.email}</div>}
                </Form.Group>

                <Form.Group controlId="register__confirm__email__address">
                    <Form.Label  className="text-danger">* Confirm email:</Form.Label>
                    <Form.Control required value={email} onChange={e => setEmail(e.currentTarget.value)} type="email" size="lg"  name='email' autoComplete='user-name' className="inputsRegister" />
                    {errors.email && <div className="alert alert-warning p-1">{errors.email}</div>}
                </Form.Group>

                <Form.Group className="mb-1" controlId="register__password">
                    <Form.Label  className="text-danger">* Password:</Form.Label>
                    <Form.Control required value={form.password} type="password" size="lg"  className="inputsRegister" name='password' autoComplete="new-password" onChange={handleChange}/>
                    {errors.password && <div className="alert alert-warning p-1">{errors.password}</div>}
                </Form.Group>

                <Form.Group className="mb-4" controlId="register__confirm__password">
                    <Form.Label  className="text-danger">* Confirm password:</Form.Label>
                    <Form.Control required value={password}  type="password" size="lg" onChange={e => setPassword(e.currentTarget.value)} name='password' autoComplete="new-password" className="inputsRegister" />
                    {errors.password && <div className="alert alert-warning p-1">{errors.password}</div>}
                </Form.Group>

                
                <Button type='submit' onClick={handleClick} className='btn__register' size='lg'  variant="outline-primary">Register Now</Button>
                {error &&  <p id='err__msg'>{error}</p>}
                <Form.Text className='msg__create__account'>Already have an account? <a className='signin__register' href='/'>Sign in</a></Form.Text>
            </Form>
        </div>
      )
    }

export default Register
