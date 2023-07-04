import React, { useEffect, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import Menu from '../Menu';
import '../Profile/Profile.css'
import axios from 'axios';
import useForm from '../hooks/useForm';
import { NavLink } from 'react-router-dom';
const backendUrl = process.env.REACT_APP_BACKEND_URL;


 //mortadela


const Profile = ({refresh}) => {
    
    const [userInfo, setUserInfo] = useState([])
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

    const logout = () => {
        localStorage.removeItem('token')
    }


    const  updateUser = async () => {
            
        const userId = window.localStorage.getItem("userId");
       console.log(userId)

        try{
            const {data} = await axios.post(`http://localhost:5000/profile/modify/${userId}`, { email, password, name, surName, gender, birthdate, phone, city, country, address, number, postCode, image })
          // window.location.href = '/dashboard';
          setUserInfo(data)
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
    const avatarGetter = async ()=> {
        let userId = window.localStorage.getItem('userId') 
       console.log(userId)
        try {
            const {data} = await axios.get(`http://localhost:5000/user/${userId}`);
            setUserInfo(data); 
            console.log('esto es data', data)
        }catch ( error ){
            console.log('Error get Income', error)
        }
    };   

    useEffect(() => {
      avatarGetter()
        console.log('avatar get')
    }, [])
    
    
 

    const initialData = {
        userImage:'',
        name: '',
        surName: '',
        birthdate: '',
        gender: '',
        email: '',
        address: '',
        number:'',
        city: '',
        country: '',
        postCode: ''
    }
   

    const onValidate = (form) => {
        let isError = false;
        let errors = {};
        // let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
        // let regexsurName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
        // let regexBirthdate = /^(?:0?[1-9]|1[0-2])\/(?:0?[1-9]|[12][0-9]|3[01])\/(?:19|20)\d{2}$/;
        // let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
        // let regexPassword = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
        // let regexAddress = '';
        // let regexNumber = '';
        // let regexCity = '';
        // let regexCountry = '';
        // let regexPostCode = '';

        const regexList = {
            name: /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/,
            surName: /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/,
            birthdate: /^(?:0?[1-9]|1[0-2])\/(?:0?[1-9]|[12][0-9]|3[01])\/(?:19|20)\d{2}$/,
            email: /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/,
            password: /^(?=.*[A-Z])(?=.*\d).{8,}$/
        };

        console.log('esto es form', form)

        const {email, password, name, surName, gender, birthdate, city, country, address, number, postCode, image} = form

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



    return (
        <>
        <Menu/>
      
        <div className='user__container'>

            <div className='profile__title'>
                <h1>Profile</h1> 
            </div>
       
        <Form className='custom__form__user' noValidate onSubmit={handleSubmit}>

            <div id='container__avatar'>
                <p id='texto'>Add File</p>
                <input type="file" id='input__img' onChange={UploadAvatar}/>
                {(<img className='newImg__avatar' value={userInfo.image} onChange={e => setUserImage(e.currentTarget.value)} src={image} alt=''/>)} 
            </div>
     
        <div className='form__user'>

            <div className='container__group'>
                <Form.Group className="mb-1" id='name__profile' controlId="formInlineInputName">
                    <Form.Label className='text-danger' id='label' >Name:</Form.Label>
                    <Form.Control required  name='name' placeholder={userInfo.name} onChange={e => setName(e.currentTarget.value)}  className='name' type='text' size='md' /> 
                    {errors.name && <div className="alert alert-warning p-1">{errors.name}</div>}
                </Form.Group>

                <Form.Group className="mb-1" id='surName__profile' controlId="formInlineInputsurName">
                    <Form.Label  className='text-danger' id='label'>Surname:</Form.Label>
                    <Form.Control required className='surName' placeholder={userInfo.surName} onChange={e => setSurname(e.currentTarget.value)} name='surName' type='text' size='md' />
                    {errors.surName && <div className="alert alert-warning p-1">{errors.surName}</div>}
                </Form.Group>

            </div>

            <div className='container__group'>
                <Form.Group controlId="formInlineInputBirthdate">
                    <Form.Label  className='text-danger' id='label'>Birthdate:</Form.Label>
                    <Form.Control size='md' required className='birthdate' placeholder={userInfo.birthdate} onChange={e => setBirthdate(e.currentTarget.value)} type='date' name='birthdate' />
                    {errors.birthdate && <div className="alert alert-warning p-1">{errors.birthdate}</div>}
                </Form.Group>

                <Form.Group className='gender__group'>
                <Form.Label  className='text-danger' controlId="formInlineInputGender" id='label'>Gender:</Form.Label>
                <Form.Select >
                    <option label="Male" value={userInfo.gender} onChange={e => setGender(e.currentTarget.value)}  required className='gender' name='gender'/>
                    <option label="Female" value={userInfo.gender} onChange={e => setGender(e.currentTarget.value)} required className='gender' name='gender'/>
                    <option label="Other" value={userInfo.gender} onChange={e => setGender(e.currentTarget.value)} required className='gender' name='gender'/>
                    {errors.gender && <div className="alert alert-warning p-1">{errors.gender}</div>}
                </Form.Select>
                </Form.Group>
            </div>
           
            <div className='container__group'>
                <Form.Group id="user__email__address" controlId="formInlineInputEmail">
                    <Form.Label  className="text-danger" id='label'>Email:</Form.Label>
                    <Form.Control required  placeholder={userInfo.email} type="email" size='md'  autoComplete='user-name' name='email' onChange={e => setEmail(e.currentTarget.value)} />
                    {errors.email && <div className="alert alert-warning p-1">{errors.email}</div>}
                </Form.Group>

                <Form.Group className="mb-1" controlId="formInlineInputPassword" >
                    <Form.Label  className="text-danger" id='label'>Password:</Form.Label>
                    <Form.Control required type="password" size='md'  name='password' autoComplete="new-password" onChange={e => setPassword(e.currentTarget.value)}/>
                    {errors.password && <div className="alert alert-warning p-1">{errors.password}</div>}
                </Form.Group>
            </div>
        

            <div className='container__group'>
                <Form.Group id='address__user' controlId="formInlineInputAddress">
                    <Form.Label  className='text-danger' id='label'>Address:</Form.Label>
                    <Form.Control placeholder={userInfo.address} onChange={e => setAddress(e.currentTarget.value)} type='text' size='md'  autoComplete='address'  />
                    {errors.address && <div className="alert alert-warning p-1">{errors.address}</div>}
                </Form.Group>

                <Form.Group id='postCode__user' controlId="formInlineInputPostCode">
                    <Form.Label  className='text-danger' id='label'>PostCode:</Form.Label>
                    <Form.Control placeholder={userInfo.postCode}  onChange={e => setPostCode(e.currentTarget.value)} type='text' size='md' />
                    {errors.postCode && <div className="alert alert-warning p-1">{errors.postCode}</div>}
                </Form.Group>
            </div>
            
            <div className='container__last__group'> 
                <Form.Group id='city__user' controlId="formInlineInputCity">
                    <Form.Label  className='text-danger' id='label'>City:</Form.Label>
                    <Form.Control placeholder={userInfo.city} onChange={e => setCity(e.currentTarget.value)} type='text' size='md'/>
                    {errors.city && <div className="alert alert-warning p-1">{errors.city}</div>}
                </Form.Group>

                <Form.Group id='country__user' controlId="formInlineInputCountry">
                    <Form.Label  className='text-danger' id='label'>Country:</Form.Label>
                    <Form.Control placeholder={userInfo.country} onChange={e => setCountry(e.currentTarget.value)} type='text' size='md' />
                    {errors.country && <div className="alert alert-warning p-1">{errors.country}</div>}
                </Form.Group>
            </div>
            <Button type='submit' onClick={updateUser} className='btn__user' size='lg'  variant="outline-primary">Save All</Button>
            {error &&  <p id='err__msg'>{error}</p>}
            <Form.Text className='msg__signout__account'>Would you like to log out of your account?<NavLink className='signout__register routes' to='/' onClick={logout}>Sign Out</NavLink> </Form.Text>
        </div>
        </Form>
        </div>

        </>
      )
    }

export default Profile
