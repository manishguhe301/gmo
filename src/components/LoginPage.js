import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    name: '',
    phone: '',
    email: '',
  });
  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let errors = {};
    if (!formValues.name) errors.name = 'Name is required';
    if (!formValues.phone) errors.phone = 'Phone is required';
    if (!formValues.email) errors.email = 'Email is required';
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      Object.entries(formValues).forEach(([key, value]) => {
        localStorage.setItem(key, value);
      });
      navigate('/main');
    }
  };

  return (
    <div className='login-form-container'>
      <form onSubmit={handleSubmit}>
        <TextField
          name='name'
          label='Name'
          value={formValues.name}
          onChange={handleInputChange}
          error={!!formErrors.name}
          helperText={formErrors.name}
        />
        <br />
        <TextField
          name='phone'
          label='Phone'
          value={formValues.phone}
          onChange={handleInputChange}
          error={!!formErrors.phone}
          helperText={formErrors.phone}
        />
        <br />
        <TextField
          name='email'
          label='Email'
          value={formValues.email}
          onChange={handleInputChange}
          error={!!formErrors.email}
          helperText={formErrors.email}
        />
        <br />
        <Button type='submit' variant='contained'>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;
