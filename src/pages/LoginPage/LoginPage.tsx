import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { LogIn } from '../../ApiServices/AuthService';

import './LoginPage.css';

const LoginPage = () => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleUsernameChange = (event: any) => {
    setUserName(event.target.value);
  }

  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
  }

  const handleLoginClick = async () => {
    const { jwt, success } = await LogIn({ username, password });

    if (success) {
      localStorage.setItem('car-app-jwt', jwt);
      navigate('/home');
    } else {
      alert('Error logging in')
    }
  }

  return (
    <div className='login-page-container'>
      <div className='login-form-container'>
        <h1>Log In</h1>

        <input 
          onChange={(event) => handleUsernameChange(event)} 
          className='username-input' 
          placeholder='Username' />

        <input 
          onChange={(event) => handlePasswordChange(event)} 
          className='password-input' 
          placeholder='Password'
          type='password' />

        <button className='log-in-button' onClick={() => handleLoginClick()}>Log In</button>

        <Link to='/'>Click here if you don't have an account yet.</Link>


      </div>
    </div>
  )
}

export default LoginPage;
