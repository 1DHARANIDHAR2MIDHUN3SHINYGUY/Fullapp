import React, { useContext, useState, useEffect } from 'react';
import '../Login/Login.css';
import IconButton from '@mui/material/IconButton';
import { TextField } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { NavLink, useNavigate } from 'react-router-dom';
import validator from 'validator';
import axios from 'axios';
import UserContext from '../Context/UserContext';
import { Link } from 'react-router-dom';
import { TokenContext } from '../Context/TokenProvider';

const Login = () => {
  const { user, login } = useContext(UserContext);
  const {token}=useContext(TokenContext);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginType, setLoginType] = useState('user');
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();

  useEffect(() => {
    const fetchUserData = async () => {
      const url =
        loginType === 'admin'
          ? `http://localhost:8000/admins/`
          : `http://localhost:8000/users/`;

      try {
        const response = await axios.get(url, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [loginType]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailValue = email.trim();
    const passwordValue = password.trim();

    if (emailValue === '') {
      setEmailError('Fill the Mail-ID');
      return;
    }
    if (passwordValue === '') {
      setPasswordError('Fill the Password');
      return;
    }

    const user = userData.find(
      (user) => user.email === emailValue && user.password === passwordValue
    );

    if (user) {
      console.log('Login successful');
      login(user);
      if (loginType === 'admin') {
        navigate('/admin');
      } else {
        navigate('/organizer');
      }
    } else {
      setEmailError('Invalid email or password');
      setPasswordError('Invalid email or password');
    }
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

  const validateEmail = (value) => {
    if (validator.isEmail(value)) {
      setEmailError('');
    } else {
      setEmailError('Invalid email address');
    }
  };

  const validatePassword = (value) => {
    if (value.trim() !== '') {
      setPasswordError('');
    } else {
      setPasswordError('Password is required');
    }
  };

  return (
    <div className="BB">
      <form className="logForm" onSubmit={handleSubmit}>
        <label>
          <h3 className="logh3">{loginType === 'admin' ? 'Admin' : 'User'} Login</h3>
        </label>

        <TextField
          type="email"
          label="Email"
          inputProps={{
            sx: {
              color: 'black',
              paddingLeft: '25px',
              fontSize: '15px',
              width: '300px',
            },
          }}
          InputLabelProps={{
            sx: {
              textTransform: 'capitalize',
            },
          }}
          id="filled-basic"
          variant="outlined"
          onChange={handleEmailChange}
        />
        <div style={{ color: 'red' }}>{emailError}</div>
        <br />
        <FormControl sx={{ m: 1, width: '320px' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
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
            onChange={handlePasswordChange}
          />
          <div style={{ color: 'red' }}>{passwordError}</div>
        </FormControl>
        <button
          className="logBtn"
          type="submit"
          onClick={() => setLoginType('user')}
        >
          User Login
        </button>
        <button
          className="logBtn"
          type="submit"
          onClick={() => setLoginType('admin')}
        >
          Admin Login
        </button>
        <div className="lll">Sign in using</div>
        <div className="awes">
          <a className="anch2" href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
            <svg className="svg1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
            </svg>
          </a>
          <a className="anch2" href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer">
            <svg className="svg1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M512 97.2c-19.8 8.8-41 14.8-63.3 17.6 22.8-13.6 40.3-35.2 48.6-60.8-21.3 12.6-44.8 21.6-69.8 26.4-20.2-21.6-48.8-35.2-80.6-35.2-61 0-110.4 49.4-110.4 110.4 0 8.6 1 17.2 2.8 25.4C77.7 191.6 41.1 161 19 120.4 14.8 133 13 146.6 13 160.8c0 38.2 19.4 71.8 48.8 91.6-18-0.4-35-5.4-49.8-13.4v1.4c0 53.4 38 97.8 88.2 108-9.2 2.6-18.8 4-28.8 4-7.2 0-14-0.8-20.8-2 14 44.4 54.6 76.6 102.4 77.6-37.6 29.4-85.2 47-136.8 47-8.8 0-17.4-0.4-26-1.6 48.8 31.4 106.6 50 168.8 50 202.6 0 313.4-168 313.4-313.4 0-4.8 0-9.4-0.2-14 21.6-15.6 40.2-35 55-57.4z"/>
            </svg>
          </a>
          <a className="anch2" href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
            <svg className="svg1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path d="M100.28 448H7.4V148.9h92.88zm-46.44-347a53.76 53.76 0 1 1 0 107.2 53.76 53.76 0 0 1 0-107.2zm356.41 347h-92.88V302.4c0-34.7-12.36-58.4-43.23-58.4-23.54 0-37.58 15.83-43.73 31.13-2.24 5.43-2.79 13-2.79 20.6V448h-92.88V148.9h92.88v40.8h1.32c12.29-19.2 34.12-46.4 83.23-46.4 60.74 0 106.23 39.9 106.23 125.6V448z"/>
            </svg>
          </a>
        </div>
        <pre></pre>
        <div className="donta">
          Don't have an account? <NavLink className="anch2" to="/register">Register</NavLink>
        </div>
      </form>
    </div>
  );
};

export default Login;
