import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { register } from '../../ApiServices/AuthService';

import './RegisterPage.css';

const RegisterPage = () => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleUsernameChange = (event: any) => {
    setUserName(event.target.value);
  }

  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
  }

  const handleRegisterClick = async () => {
    const { jwt, success } = await register({ username, password });

    if (success) {
      localStorage.setItem('car-app-jwt', jwt);
      navigate('/home');
    } else {
      alert('Error registering')
    }
  }

  return (
    <div className='register-page-container'>
      <div className='register-form-container'>
        <h1>Register</h1>

        <input 
          onChange={(event) => handleUsernameChange(event)} 
          className='username-input' 
          placeholder='Username' />

        <input 
          onChange={(event) => handlePasswordChange(event)} 
          className='password-input' 
          placeholder='Password'
          type='password' />

        <button className='register-button' onClick={() => handleRegisterClick()}>Register</button>

        <Link to='/login'>Click here to log in if you already have an account.</Link>
      </div>
    </div>
  )
}

export default RegisterPage;
