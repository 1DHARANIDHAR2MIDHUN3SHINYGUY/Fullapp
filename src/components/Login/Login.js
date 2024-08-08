import React, { useContext, useState }  from 'react';
import '../Login/Login.css'
import IconButton from '@mui/material/IconButton';
import { TextField } from '@mui/material';
// import { NavLink } from 'react-router-dom';
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

const Login = () => {
  const{user,login}=useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginType, setLoginType] = useState('user');
  const navigate = useNavigate();
  
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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

    
    try {
      const url = loginType === 'admin' 
      ? `http://localhost:8080/admin?email=${emailValue}&password=${passwordValue}`
      : `http://localhost:8080/users?email=${emailValue}&password=${passwordValue}`;
    
      console.log(url);
    const response = await axios.get(url);
    console.log(response);

      if (response.data.length>0) {
        
        console.log('Login successful');
        login(email) 
        if (loginType==="admin"){
          navigate("/admin");
        }else{
          navigate("/organizer");
        }
      } else {
        
        setEmailError('Invalid email or password');
        setPasswordError('Invalid email or password');
      }
    } catch (error) {
      console.error('Error during login:', error);
      
      setEmailError('Error during login');
      setPasswordError('Error during login');
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
    <div className='BB'>
      <form className="logForm" onSubmit={handleSubmit}>
      <label>
            <h3 className='logh3'>{loginType === 'admin' ? 'Admin' : 'User'} Login</h3>
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
            // color: 'black',
            textTransform: 'capitalize',
          },
        }}
        // sx={{
        //   border: '1px solid black'
        // }}
        id="filled-basic"
        // label="Email-ID"
        variant="outlined"
        // fullWidth
        // placeholder="Email"
        // margin="normal"
        onChange={handleEmailChange}
        // inputRef={emailRef}
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
                  // className="btt"
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
      
        {/* <button className="logBtn"type="submit">Login</button> */}
        <button className="logBtn"type="submit"
        onClick={() => setLoginType('user')}>User Login</button>
        <button className="logBtn"type="submit"
        onClick={() => setLoginType('admin')}>Admin Login</button>
        <div className="lll">Sign in using</div>
        <div className="awes">
          <a className="anch2" href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
            <svg className="svg1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
            </svg>
          </a>
          <a className="anch2" href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <svg className="svg1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" />
            </svg>
          </a>
          <a className="anch2" href="https://twitter.com/login?lang=en" target="_blank" rel="noopener noreferrer"><svg className="svg1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" /></svg></a>
          <a className="anch2"href="https://www.google.com/" target="_blank" rel="noopener noreferrer"><svg className="svg1"xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/></svg></a>

        </div>
        <div></div><pre></pre>
        Do not have an account?  
        <Link to="/register"><button className='logSign'>Sign up now</button></Link>
      </form>
    </div>
  )
}
export default Login