import { useNavigate } from 'react-router-dom';

import { removeJwt } from '../../ApiServices/JwtService';

import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate()

  const logOut = () => {
    removeJwt();
    navigate('/login');
  }

  return (
    <div className='navbar-container'>
      <button onClick={logOut}>Log Out</button>
    </div>
  );
}

export default Navbar;
