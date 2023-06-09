import React from 'react'
import { useState } from 'react'

const useForm = (initialData, onValidate) => {
    const [form, setForm] = useState(initialData)
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})

    const handleChange = (event) => {
        const {name, value } = event.target
        setForm({...form, [name]: value})

        setErrors({
            ...errors,
            [name]: ''
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault()
        const err = onValidate(form)

        if(err === null) {
            console.log('Send form...')
        }else {
            setErrors(err)
        }
    }
  
    return {form, errors, loading, handleChange, handleSubmit}
}

export default useForm
