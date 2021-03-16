import React, { useState } from 'react';

import axios from 'axios';

import { LoginForm } from '../../components';

import './LogIn.scss';

function LogIn({ history }) {
  const [formData, setFormData] = useState({
    email: { value: null, error: false, errorText: null },
    password: { value: null, error: false, errorText: null },
  });
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (event) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;

    setFormData((previousData) => ({
      ...previousData,
      [fieldName]: { ...previousData[fieldName], value: fieldValue, error: false, errorText: null },
    }));
  };

  const validateFields = () => {
    let isValid = true;

    // Email
    if (!formData.email.value || !formData.email.value.length) {
      isValid = false;

      setFormData((previousData) => ({
        ...previousData,
        email: { 
          ...previousData.email, 
          error: true, 
          errorText: 'Invalid email',
        },
      }));
    } 

    // Password
    if (!formData.password.value || formData.password.value.length < 6) {
      isValid = false;

      setFormData((previousData) => ({
        ...previousData,
        password: {
          ...previousData.password, 
          error: true, 
          errorText: 'The password must contain at least 6 characters.',
        },
      }));
    } 

    return isValid;
  };

  const onLogin = () => {
    const isValid = validateFields();

    if (!isValid) return;

    async function getRegistration() {
      try {
        const response = await axios.post(
          'https://test-api.updivision.work/api/login',
          {
            email: formData.email.value,
            password: formData.password.value,
          },
          { headers: {
              Accept: 'application/json'
            }
        });
        const { data: { accessToken } } = response;
        localStorage.setItem('token', accessToken);
        history.push('/products');
      } catch ({ response }) {
      
        const { data: { message, errors } } = response;
        const newFormDataFields = errors 
          ? Object.fromEntries(
            Object.entries(errors).map(([key, value]) => {
              return [key, { value: formData[key].value, error: true, errorText: value[0]}]
            })
          )
          : {};

        setFormData((previousData) => ({
          ...previousData,
          ...newFormDataFields,
        }));

        setErrorMessage(message);
      }
    };

    getRegistration();
  };

  return (
    <div className="login">
      <LoginForm 
        formData={ formData }
        errorMessage={ errorMessage }
        handleChange={ handleChange }
        onLogin={ onLogin }
      />
    </div>
  );
}

export default LogIn
