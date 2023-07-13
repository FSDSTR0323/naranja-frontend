import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import Menu from '../Menu';
import '../Profile/Profile.css'
import axios from 'axios';
import useForm from '../hooks/useForm';
import { NavLink } from 'react-router-dom';
const backendUrl = process.env.REACT_APP_BACKEND_URL;




const Profile = ({refresh}) => {
    
    const [userInfo, setUserInfo] = useState([])
    const [image, setImage] = useState(false)

    // const [userImage, setUserImage] = useState();
    const [name, setName] = useState('');
    const [surName, setSurname] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [postCode, setPostCode] = useState('');
    const [error, setError] = useState('')

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('imageUrl')
        localStorage.removeItem('userId')
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
        const userId = window.localStorage.getItem('userId') 
       console.log(userId)
        try {
            const {data} = await axios.get(`${backendUrl}/user/${userId}`);
            setUserInfo(data); 
        }catch ( error ){
            console.log('Error get Income', error)
        }
    };   

    useEffect(() => {
        avatarGetter()
          console.log('avatar get')
      }, [])

    const  updateUser = async () => {
        const userId = window.localStorage.getItem("userId");
        console.log(userId)

        try{
            const {data} = await axios.post(`${backendUrl}/profile/modify/${userId}`, { email, password, name, surName, gender, birthdate, city, country, address, postCode, image })
            const imageUrl = image
            console.log('imageurl', imageUrl)
            window.localStorage.setItem('imageUrl', imageUrl)
            setUserInfo(data)
            setError('')
        }catch (error) {
            setError(error.response.data.error)
        }
      }

    //   const getImage = window.localStorage.getItem("imageUrl");



      
    const deleteImage = async (_id) => {
        localStorage.removeItem('imageUrl');

        try {
        await axios.delete(`${backendUrl}/api/v1/delete-avatar/${_id}`);
        setImage(false);
        avatarGetter();
        window.location.reload(); // Actualizar la página
        } catch (error) {
        console.log(error);
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
            <label className="file-input-label">
                <span className='span__img'>Drag an image here:</span>
                    {!image && <input type="file" id='input__img' onChange={UploadAvatar} />}
                
                    {image && (
                        <div id='image__container'>
                            <img className='newImg__avatar__profile' src={image} alt='' />
                        </div>
                    )}
                
            </label>
        </div>
            <div id='dltImg__container'>
                <Button variant='secondary' id='dltImg' onClick={deleteImage} >Delete</Button>
            </div>

        <div className='form__user'>
            
                <Form.Group>
                    <Form.Label className='text-danger labels__profile' >Name:</Form.Label>
                    <Form.Control required  name='name' placeholder={userInfo.name} onChange={e => setName(e.currentTarget.value)}  className='name' type='text' size='md' /> 
                    {errors.name && <div className="alert alert-warning p-1">{errors.name}</div>}
                </Form.Group>

                <Form.Group>
                    <Form.Label  className='text-danger labels__profile'>Surname:</Form.Label>
                    <Form.Control id='surName' required  placeholder={userInfo.surName} onChange={e => setSurname(e.currentTarget.value)} name='surName' type='text' size='md' />
                    {errors.surName && <div className="alert alert-warning p-1">{errors.surName}</div>}
                </Form.Group>

                <Form.Group>
                    <Form.Label  className='text-danger' >Birthdate:</Form.Label>
                    <Form.Control id='birthdate' size='md' required className='birthdate' placeholder={userInfo.birthdate} onChange={e => setBirthdate(e.currentTarget.value)} type='date' name='birthdate' />
                    {errors.birthdate && <div className="alert alert-warning p-1">{errors.birthdate}</div>}
                </Form.Group>

                <Form.Group>
                    <Form.Label  className='text-danger'>Gender:</Form.Label>
                        <Form.Select id='gender'>
                            <option label="Male" value={userInfo.gender} onChange={e => setGender(e.currentTarget.value)}  required className='gender' name='gender'/>
                            <option label="Female" value={userInfo.gender} onChange={e => setGender(e.currentTarget.value)} required className='gender' name='gender'/>
                            <option label="Other" value={userInfo.gender} onChange={e => setGender(e.currentTarget.value)} required className='gender' name='gender'/>
                            {errors.gender && <div className="alert alert-warning p-1">{errors.gender}</div>}
                        </Form.Select>
                </Form.Group>
    
                <Form.Group>
                    <Form.Label  className="text-danger">Email:</Form.Label>
                    <Form.Control id="email" required  placeholder={userInfo.email} type="email" size='md'  autoComplete='user-name' name='email' onChange={e => setEmail(e.currentTarget.value)} />
                    {errors.email && <div className="alert alert-warning p-1">{errors.email}</div>}
                </Form.Group>

                <Form.Group>
                    <Form.Label  className="text-danger" >Password:</Form.Label>
                    <Form.Control id='password' required type="password" size='md'  name='password' autoComplete="new-password" onChange={e => setPassword(e.currentTarget.value)}/>
                    {errors.password && <div className="alert alert-warning p-1">{errors.password}</div>}
                </Form.Group>

                <Form.Group>
                    <Form.Label className='text-danger' >Address:</Form.Label>
                    <Form.Control id='address' placeholder={userInfo.address} onChange={e => setAddress(e.currentTarget.value)} type='text' size='md'  autoComplete='address'  />
                    {errors.address && <div className="alert alert-warning p-1">{errors.address}</div>}
                </Form.Group>

                <Form.Group>
                    <Form.Label  className='text-danger' >Postcode:</Form.Label>
                    <Form.Control id='postCode' placeholder={userInfo.postCode}  onChange={e => setPostCode(e.currentTarget.value)} type='text' size='md' />
                    {errors.postCode && <div className="alert alert-warning p-1">{errors.postCode}</div>}
                </Form.Group>
     
            
          
                <Form.Group >
                    <Form.Label  className='text-danger'>City:</Form.Label>
                    <Form.Control id='city' placeholder={userInfo.city} onChange={e => setCity(e.currentTarget.value)} type='text' size='md'/>
                    {errors.city && <div className="alert alert-warning p-1">{errors.city}</div>}
                </Form.Group>

                <Form.Group>
                    <Form.Label  className='text-danger' >Country:</Form.Label>
                    <Form.Control id='country' placeholder={userInfo.country} onChange={e => setCountry(e.currentTarget.value)} type='text' size='md' />
                    {errors.country && <div className="alert alert-warning p-1">{errors.country}</div>}
                </Form.Group>
       
            <Button type='submit' onClick={updateUser} id='btn__saveAll' size='lg'>Save All</Button>
            {error &&  <p id='err__msg'>{error}</p>}
            <Form.Text className='msg__signout__account'>Would you like to log out of your account?<NavLink className='signout__register routes' to='/' onClick={logout}>Sign Out</NavLink> </Form.Text>
        </div>
        </Form>

        </div>

        </>
      )
    }

export default Profile
