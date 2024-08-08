import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link, useNavigate } from 'react-router-dom';
import validator from 'validator';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid'; // Import uuid
import '../Register/Register.css';
import img1 from '../../image/img1.png';

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setName(newName);
    validateName(newName);
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    validateEmail(newEmail);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    validateConfirmPassword(newConfirmPassword);
  };

  const validateName = (value) => {
    if (value.trim() !== '') {
      setNameError('');
    } else {
      setNameError('Name is required');
    }
  };

  const validateEmail = (value) => {
    if (value === '') {
      setEmailError('Fill the Email-ID');
      return;
    }
    if (validator.isEmail(value)) {
      setEmailError('');
    } else {
      setEmailError('Invalid email address');
    }
  };

  const validatePassword = (value) => {
    if (value === '') {
      setPasswordError('Fill the Password');
      return;
    }
    if (
      validator.isStrongPassword(value, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      setPasswordError('');
    } else {
      setPasswordError('Password should be strong');
    }
  };

  const validateConfirmPassword = (value) => {
    if (value === '') {
      setConfirmPasswordError('Fill the Password');
      return;
    }
    if (value === password) {
      setConfirmPasswordError('');
    } else {
      setConfirmPasswordError('Passwords do not match');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateName(name);
    validateEmail(email);
    validatePassword(password);
    validateConfirmPassword(confirmPassword);

    if (!confirmPassword) {
      setConfirmPasswordError('Confirm Password is required');
      return;
    }

    if (!nameError && !emailError && !passwordError && !confirmPasswordError) {
      const handlePost = async () => {
        const data = {
          id: uuidv4(), // Generate a unique ID
          name: name,
          email: email,
          password: password,
        };

        try {
          const response = await axios.post(`http://localhost:8080/users`, data);
          console.log(response);
          navigate('/login');
        } catch (error) {
          console.log(error);
        }
      };

      handlePost();
    }
  };

  return (
    <div className='BBB'>
      <img className="regImage" src={img1} alt="Registration" />
      <form className="regForm" onSubmit={handleSubmit}>
        <p className='regPara'>All-in-one event management software to plan and run in-person, virtual, and hybrid events with greater efficiency and impact.</p>
        <TextField
          type="name"
          label="Name"
          inputProps={{
            sx: {
              color: 'black',
              paddingLeft: '15px',
              fontSize: '15px',
              width: '400px',
            },
          }}
          InputLabelProps={{
            sx: {
              textTransform: 'capitalize',
            },
          }}
          variant="outlined"
          onChange={handleNameChange}
          value={name}
        />
        <div style={{ color: 'red' }}>{nameError}</div>
        <br />
        <TextField
          type="email"
          label="Email"
          inputProps={{
            sx: {
              color: 'black',
              paddingLeft: '15px',
              fontSize: '15px',
              width: '400px',
            },
          }}
          InputLabelProps={{
            sx: {
              textTransform: 'capitalize',
            },
          }}
          variant="outlined"
          onChange={handleEmailChange}
          value={email}
        />
        <div style={{ color: 'red' }}>{emailError}</div>
        <pre></pre>
        <FormControl sx={{ m: 1, width: '410px' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={handlePasswordChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: '410px' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Confirm Password"
          />
        </FormControl>
        <div style={{ color: 'red' }}>{passwordError}</div>
        <div style={{ color: 'red' }}>{confirmPasswordError}</div>
        <button className="regBtn" type="submit">Sign up now</button>
        <pre></pre>
        <Link to="/login"><button className='regLogin'>Already have an account?</button></Link>
      </form>
    </div>
  );
}

export default Register;
