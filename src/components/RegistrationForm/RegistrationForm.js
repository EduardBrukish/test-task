import React from 'react';

import { KeyboardDatePicker } from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import LockIcon from '@material-ui/icons/Lock';
import { ColorButton, CustomCheckbox } from './themes/themes';

import './RegistrationForm.scss';

function Form({ onSave, formData, handleDateChange, handleChange, handleCheckbox, errorMessage }) {
  return (
    <div className="registration-form">
      <p className="registration-form__heading">Register</p>
      <Grid container spacing={1} alignItems="flex-start">
        <Grid item>
          <AccountCircle color="action" style={ { marginTop: 26 } } />
        </Grid>
        <Grid item  style={{ width: '85%' }} >
          <TextField 
            id="name"
            name="name" 
            label="Name"  
            margin="dense"
            fullWidth
            value={ formData.name.value || '' }
            error={ formData.name.error }
            helperText={ formData.name.errorText || null }
            onChange={ handleChange }
          />
        </Grid>
      </Grid>
      <Grid container spacing={1} alignItems="flex-start">
        <Grid item>
          <EmailIcon color="action" style={ { marginTop: 35 } } />
        </Grid>
        <Grid item style={{ width: '85%' }}>
          <TextField 
            id="email" 
            name="email" 
            label="Email"  
            margin="normal"
            fullWidth
            value={ formData.email.value || '' }
            error={ formData.email.error }
            helperText={ formData.email.errorText || null }
            onChange={ handleChange }
          />
        </Grid>
      </Grid>
      <Grid container spacing={1} alignItems="flex-start">
        <Grid item>
          <CalendarTodayIcon color="action" style={ { marginTop: 35 } } />
        </Grid>
        <Grid item style={{ width: '85%' }} >
          <KeyboardDatePicker
            margin="normal"
            id="start"
            label="Education Start Date"
            minDate={ new Date('2021-02-20') }
            error={ formData.education_start_date.error }
            helperText={ formData.education_start_date.errorText || null }
            format="MM/dd/yyyy"
            value={ formData.education_start_date.value }
            onChange={ (date) => handleDateChange(date, 'education_start_date')}
            fullWidth
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </Grid>
      </Grid>
      <Grid container spacing={1} alignItems="flex-start">
        <Grid item>
          <CalendarTodayIcon color="action" style={ { marginTop: 35 } } />
        </Grid>
        <Grid item style={{ width: '85%' }}>
          <KeyboardDatePicker
            margin="normal"
            id="end"
            label="Education End Date"
            minDate={ new Date('2021-02-20') }
            error={ formData.education_end_date.error }
            helperText={ 
              (formData.education_end_date.error && formData.education_end_date.errorText) 
                ? formData.education_end_date.errorText 
                : null 
            }
            format="MM/dd/yyyy"
            value={ formData.education_end_date.value }
            onChange={ (date) => handleDateChange(date, 'education_end_date')}
            fullWidth
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </Grid>
      </Grid>
      <Grid container spacing={1} alignItems="flex-start">
        <Grid item>
          <LockIcon color="action" style={ { marginTop: 35 } } />
        </Grid>
        <Grid item style={{ width: '85%' }}>
          <TextField
            id="password"
            label="Password"
            name="password"
            type="password"
            margin="normal"
            fullWidth
            value={ formData.password.value || '' }
            error={ formData.password.error }
            helperText={ formData.password.errorText || null }
            onChange={ handleChange }
          />
        </Grid>
      </Grid>
      <Grid container spacing={1} alignItems="flex-start">
        <Grid item>
          <LockIcon color="action" style={ { marginTop: 35 } } />
        </Grid>
        <Grid item style={{ width: '85%' }}>
          <TextField
            id="password-confirmation"
            label="Confirm Password"
            name="password_confirmation"
            type="password"
            margin="normal"
            fullWidth
            value={ formData.password_confirmation.value || '' } 
            error={ formData.password_confirmation.error }
            helperText={ formData.password_confirmation.errorText || null }
            onChange={ handleChange }
          />
        </Grid>
      </Grid>
      <FormControlLabel
        control={<CustomCheckbox checked={ formData.terms.value } onChange={ handleCheckbox } name="terms" />}
        label="I agree to the terms and conditions"
      />
      {
        formData.terms.error && <p className="checkbox-helper-text">{ formData.terms.errorText }</p>
      }
      { errorMessage && <p className="error-message">{ errorMessage }</p> }
      <ColorButton variant="contained" color="primary" onClick={ () => onSave() }>
        GET STARTED
      </ColorButton>
    </div>
  );
}

export default Form;
