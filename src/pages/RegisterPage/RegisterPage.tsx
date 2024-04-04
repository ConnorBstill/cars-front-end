import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { register } from '../../ApiServices/AuthService';
import { setUser } from '../../ApiServices/UserService';
import { setJwt } from '../../ApiServices/JwtService';

import './RegisterPage.css';

const RegisterPage = () => {
  const [username, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [userIsAdmin, setUserIsAdmin] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleUsernameChange = (event: any) => {
    setUserName(event.target.value);
  }

  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
  }

  const handleRegisterClick = async () => {
    const { jwt, success } = await register({ username, password, userIsAdmin });

    if (success) {
      setJwt(jwt);
      setUser(jwt);
      navigate('/home');
    } else {
      alert('Error registering');
    }
  }

  const handleCheckboxClick = (event: any) => {
    console.log(event);
    setUserIsAdmin(event.target.value);
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

        <div className='checkbox-container'>
          <label>Are you registering as a teacher?</label>
          <input type='checkbox' onChange={(e) => handleCheckboxClick(e)} />
        </div>

        <button className='register-button' onClick={() => handleRegisterClick()}>Register</button>

        <Link to='/login'>Click here to log in if you already have an account.</Link>
      </div>
    </div>
  )
}

export default RegisterPage;
