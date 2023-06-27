import React, { useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import Menu from '../Menu';
import '../Profile/Profile.css'
import axios from 'axios';
import useForm from '../hooks/useForm';


const Profile = ({refresh}) => {

    const [setUserList] = useState([])
    const [image, setImage] = useState('')

    const [userImage, setUserImage] = useState();
    const [name, setName] = useState('');
    const [surName, setSurname] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [number, setNumber] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [postCode, setPostCode] = useState('');
    const [error, setError] = useState('')
 

    const initialData = {
        userImage:'',
        name: '',
        surName: '',
        birthdate: '',
        gender: '',
        email: '',
        phone: '',
        address: '',
        number:'',
        city: '',
        country: '',
        postCode: ''
    }
   

    const onValidate = (form) => {
        let isError = false;
        let errors = {};
        let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
        let regexsurName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
        let regexBirthdate = /^(?:0?[1-9]|1[0-2])\/(?:0?[1-9]|[12][0-9]|3[01])\/(?:19|20)\d{2}$/;
        let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
        let regexPassword = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
        // let regexPhone = '';
        // let regexAddress = '';
        // let regexNumber = '';
        // let regexCity = '';
        // let regexCountry = '';
        // let regexPostCode = '';

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


    const  updateUser = async () => {
    
        try{
            const {data} = await axios.post('http://localhost:5000/register', {image, name, surName, birthdate, gender, email, phone, address, number, city, country, postCode })
          // window.location.href = '/dashboard';
          setUserList(data)
        }catch (error) {
          setError(error.response.data.error)
        }
      }
    
//Cargar avatar profile
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

// Traer datos del back
    const avatarGetter = async (_id)=> {
        try {
            const {data} = await axios.get(`http://localhost:5000/user/${_id}`);
            setUserList(data); 
        }catch ( error ){
            console.log('Error get Income', error)
        }
    };   
        

    return (
        <>
        <Menu/>

        <div className='form__user'>
        <Container className='user__container'>
       
        <Form className='custom__form__user' noValidate onSubmit={handleSubmit}>
            <div className='avatar__user__title'>
                <h1 className="mb-1 fs-2 fw-normal user__title">Profile</h1> 
            </div>

        <Form.Group controlId="formFileSm" className="mb-3">
            <Form.Control type="file" size="sm" onChange={UploadAvatar} />
            {(<img className='newImg__avatar' onChange={e => setUserImage(e.currentTarget.value)} src={image} alt=''/>)} 
        </Form.Group>

            <Form.Group className="mb-1">
                <Form.Label className='text-danger' >* Name:</Form.Label>
                <Form.Control required  name='name' onChange={e => setName(e.currentTarget.value)}  className='name' type='text' size='md' /> 
                {errors.name && <div className="alert alert-warning p-1">{errors.name}</div>}
            </Form.Group>

            <Form.Group className="mb-1">
                <Form.Label  className='text-danger'>* Surname:</Form.Label>
                <Form.Control required className='surName'  onChange={e => setSurname(e.currentTarget.value)} name='surName' type='text' size='md' />
                {errors.surName && <div className="alert alert-warning p-1">{errors.surName}</div>}
            </Form.Group>

            <Form.Group>
                <Form.Label  className='text-danger'>* Add your birthdate:</Form.Label>
                <Form.Control size='md' required className='birthdate' onChange={e => setBirthdate(e.currentTarget.value)} type='date' name='birthdate' />
                {errors.birthdate && <div className="alert alert-warning p-1">{errors.birthdate}</div>}
            </Form.Group>

            <Form.Group>
            <Form.Label  className='text-danger'>* Select gender:</Form.Label>
                <Form.Check label="Male" onChange={e => setGender(e.currentTarget.value)} value='male' size='md' required className='gender' name='gender' type='radio'/>
                <Form.Check label="Female" onChange={e => setGender(e.currentTarget.value)} value='female' size='md' required className='gender' name='gender' type='radio' />
                <Form.Check label="Other" onChange={e => setGender(e.currentTarget.value)} value='other' size='md' required className='gender' name='gender' type='radio' />
                {errors.gender && <div className="alert alert-warning p-1">{errors.gender}</div>}
            </Form.Group>

            <Form.Group controlId="user__email__address">
                <Form.Label  className="text-danger">* Add your email:</Form.Label>
                <Form.Control required value={form.email}  type="email" size='md' className="position-relative" autoComplete='user-name' name='email' onChange={handleChange} />
                {errors.email && <div className="alert alert-warning p-1">{errors.email}</div>}
            </Form.Group>

            <Form.Group controlId="user__confirm__email__address">
                <Form.Label  className="text-danger">* Confirm email:</Form.Label>
                <Form.Control required value={email} onChange={e => setEmail(e.currentTarget.value)} type="email" size='md'  name='email' autoComplete='user-name' className="position-relative" />
                {errors.email && <div className="alert alert-warning p-1">{errors.email}</div>}
            </Form.Group>

            <Form.Group className="mb-1" controlId="user__password">
                <Form.Label  className="text-danger">* Password:</Form.Label>
                <Form.Control required value={form.password} type="password" size='md'  className="position-relative" name='password' autoComplete="new-password" onChange={handleChange}/>
                {errors.password && <div className="alert alert-warning p-1">{errors.password}</div>}
            </Form.Group>

            <Form.Group className="mb-4" controlId="user__confirm__password">
                <Form.Label  className="text-danger">* Confirm password:</Form.Label>
                <Form.Control required value={password}  type="password" size='md' onChange={e => setPassword(e.currentTarget.value)} name='password' autoComplete="new-password" className="position-relative" />
                {errors.password && <div className="alert alert-warning p-1">{errors.password}</div>}
            </Form.Group>

            <Form.Group id='phone__user'>
                <Form.Label   className='text-danger'>Phone:</Form.Label>
                <Form.Control onChange={e => setPhone(e.currentTarget.value)} value={phone} type='text' size='md'  autoComplete='username' />
                {errors.phone && <div className="alert alert-warning p-1">{errors.phone}</div>}
            </Form.Group>

            <Form.Group id='address__user'>
                <Form.Label  className='text-danger'>Address:</Form.Label>
                <Form.Control onChange={e => setAddress(e.currentTarget.value)} value={address} type='text' size='md'  autoComplete='address'  />
                {errors.address && <div className="alert alert-warning p-1">{errors.address}</div>}
            </Form.Group>

            <Form.Group>
                <Form.Label  className='text-danger'>Number:</Form.Label>
                <Form.Control onChange={e => setNumber(e.currentTarget.value)} value={number} type='text' size='md'  autoComplete='address' />
                {errors.number && <div className="alert alert-warning p-1">{errors.number}</div>}
            </Form.Group>

            <Form.Group id='city__user'>
                <Form.Label  className='text-danger'>City:</Form.Label>
                <Form.Control onChange={e => setCity(e.currentTarget.value)} value={city} type='text' size='md'/>
                {errors.city && <div className="alert alert-warning p-1">{errors.city}</div>}
            </Form.Group>

            <Form.Group id='country__user'>
                <Form.Label  className='text-danger'>Country:</Form.Label>
                <Form.Control onChange={e => setCountry(e.currentTarget.value)} value={country} type='text' size='md' />
                {errors.country && <div className="alert alert-warning p-1">{errors.country}</div>}
            </Form.Group>

            <Form.Group id='postCode__user'>
                <Form.Label  className='text-danger'>Post code:</Form.Label>
                <Form.Control onChange={e => setPostCode(e.currentTarget.value)} value={postCode} type='text' size='md' />
                {errors.postCode && <div className="alert alert-warning p-1">{errors.postCode}</div>}
            </Form.Group>

            <Button type='submit' onClick={updateUser} className='btn__user' size='lg'  variant="outline-primary">Save All</Button>
            {error &&  <p id='err__msg'>{error}</p>}
            <Form.Text className='msg__signout__account'>Would you like to log out of your account? <a className='signout__register' href='/'>Sign Out</a></Form.Text>
        </Form>
        </Container>
        </div>

        </>
      )
    }

export default Profile
