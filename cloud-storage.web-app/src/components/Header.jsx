import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutAction } from '../actions/loginActions';
import { LoginContext } from '../contexts/loginContext';
import { deleteUserFromCookie } from '../cookies/userDataCookie';

const Header = () => {
  const { userData, dispatchUserData } = useContext(LoginContext);
  const navigate = useNavigate();

  console.log(userData);

  return (
    <div className='header'>
      {!!userData.token ? (
        <span
          onClick={() => {
            dispatchUserData(logoutAction());
            deleteUserFromCookie();
          }}>
          Logout
        </span>
      ) : (
        <span
          onClick={() => {
            navigate('/login');
          }}>
          Login
        </span>
      )}
    </div>
  );
};

export default Header;
