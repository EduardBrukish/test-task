import React, { useState } from 'react';
import axios from 'axios';


import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

import { RegistrationForm } from '../../components';
import { isValidEmail, isValidPassword } from './helpers';

import './Registration.scss';

function Registration({ history }) {
  const [formData, setFormData] = useState({
    name: { value: null, error: false, errorText: null },
    email: { value: null, error: false, errorText: null },
    password: { value: null, error: false, errorText: null },
    password_confirmation: { value: null, error: false, errorText: null },
    education_start_date: { value: null, error: false, errorText: null },
    education_end_date: { value: null, error: false, errorText: null },
    terms: { value: false, error: false, errorText: null },
  });
  const [errorMessage, setErrorMessage] = useState(null);

  const handleDateChange = (date, name) => {
    setFormData((previousData) => ({
      ...previousData,
      [name]: { ...previousData[name], value: date, error: false, errorText: null },
    }));
  };

  const handleChange = (event) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;

    setFormData((previousData) => ({
      ...previousData,
      [fieldName]: { ...previousData[fieldName], value: fieldValue, error: false, errorText: null },
    }));
  };

  const handleCheckbox = (event) => {
    const fieldName = event.target.name;

    setFormData((previousData) => ({
      ...previousData,
      [fieldName]: { ...previousData[fieldName], value: event.target.checked, error: false, errorText: null },
    }));
  };

  const validateFields = () => {
    let isValid = true;
    // Name
    if (!formData.name.value || formData.name.value.length < 2) {
      isValid = false;

      setFormData((previousData) => ({
        ...previousData,
        name: {
          ...previousData.name, 
          error: true, 
          errorText: 'Name should contain at least two characters',
        },
      }));
    } 

    // Email
    if (!formData.email.value || !formData.email.value.length || !isValidEmail(formData.email.value)) {
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

    // Education Start Date
    if (!formData.education_start_date.value) {
      isValid = false;

      setFormData((previousData) => ({
        ...previousData,
        education_start_date: { 
          ...previousData.education_start_date, 
          error: true, 
          errorText: 'Fill in this field',
        },
      }));
    } 

    // Education End Date
    if (!formData.education_end_date.value) {
      isValid = false;

      setFormData((previousData) => ({
        ...previousData,
        education_end_date: { 
          ...previousData.education_end_date, 
          error: true, 
          errorText: 'Fill in this field',
        },
      }));
    } 

    // Password
    if (!formData.password.value || !isValidPassword(formData.password.value) ) {
      isValid = false;

      setFormData((previousData) => ({
        ...previousData,
        password: {
          ...previousData.password, 
          error: true, 
          errorText: 'The password must contain at least 6 characters. At least 1 uppercase char, 1 lowercase char, and a number.',
        },
      }));
    } 

    // Password
    if (!formData.password_confirmation.value || (formData.password.value !== formData.password_confirmation.value)) {
      isValid = false;

      setFormData((previousData) => ({
        ...previousData,
        password_confirmation: {
          ...previousData.password_confirmation, 
          error: true, 
          errorText: 'The verification password must match the selected password',
        },
      }));
    } 

    // Terms
    if (!formData.terms.value) {
      isValid = false;

      setFormData((previousData) => ({
        ...previousData,
        terms: {
          ...previousData.terms, 
          error: true, 
          errorText: 'The terms field is required',
        },
      }));
    } 

    return isValid;
  };

  const onSave = () => {
    const isValid = validateFields();

    if (!isValid) return;

    async function getRegistration() {
      try {
        const response = await axios.post(
          'https://test-api.updivision.work/api/register',
          {
            name: formData.name.value,
            email: formData.email.value,
            password: formData.password.value,
            password_confirmation: formData.password_confirmation.value,
            education_start_date: formData.education_start_date.value,
            education_end_date: formData.education_end_date.value,
            terms: formData.terms.value,
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
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div className="registration">
        <RegistrationForm 
          formData={ formData }
          errorMessage={ errorMessage }
          handleDateChange={ handleDateChange }
          handleChange={ handleChange }
          handleCheckbox={ handleCheckbox }
          onSave={ onSave }
        />
      </div>
    </MuiPickersUtilsProvider>
  );
}

export default Registration;
