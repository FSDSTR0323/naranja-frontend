import React, { useState } from 'react'
import '../UploadImage/UploadImg.css'

const UploadImage = (props) => {

    const [image, setImage] = useState('')
    const [loading, setLoading] = useState(false)

const upload = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'OrangeTracker');
    setLoading(true)
    const res = await fetch ('https://api.cloudinary.com/v1_1/dq0r13g4u/image/upload',
        {
            method: 'POST',
            body: data,
        }
    )
    const file = await res.json();
    setImage(file.secure_url)
    setLoading(false)
}


    return (

        <div id='uploadimg__container'>
            {loading ? (<h3 >Loading image...</h3>) : (<img className='newImg__avatar' src={image} alt=''/>)} 
            <input id='field__uploadImg' type='file' name='file'  onChange={upload}></input>           
        </div>
    )
} 
export default UploadImage
