import React from 'react';
import { Link } from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import { CustomButton } from './themes/themes';

import './LoginForm.scss';

function LoginForm({ onLogin, formData, handleChange, errorMessage }) {
  return (
    <div className="login-form">
      <p className="login-header">Login</p>
      <Grid container spacing={1} alignItems="flex-start">
        <Grid item>
          <EmailIcon color="action" style={ { marginTop: 26 } } />
        </Grid>
        <Grid item>
          <TextField 
            id="email" 
            name="email" 
            label="Email"  
            margin="dense"
            style={{width: 250}} 
            value={ formData.email.value || '' }
            error={ formData.email.error }
            helperText={ formData.email.errorText || null }
            onChange={ handleChange }
          />
        </Grid>
      </Grid>
      <Grid container spacing={1} alignItems="flex-start">
        <Grid item>
          <LockIcon color="action" style={ { marginTop: 26 } } />
        </Grid>
        <Grid item>
          <TextField
            id="password"
            label="Password"
            name="password"
            type="password"
            margin="dense"
            style={{width: 250}} 
            value={ formData.password.value || '' }
            error={ formData.password.error }
            helperText={ formData.password.errorText || null }
            onChange={ handleChange }
          />
        </Grid>
      </Grid>
      { errorMessage && <p className="error-message">{ errorMessage }</p> }
      <CustomButton color="secondary" onClick={ () => onLogin() }>Lets Go</CustomButton>
      <Link to="/registration" className="signin-button">Sign In</Link>
    </div>
  );
}

export default LoginForm;
