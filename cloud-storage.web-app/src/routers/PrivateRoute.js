import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { LoginContext } from '../contexts/loginContext';

const PrivateRoute = () => {
  const { userData } = useContext(LoginContext);
  console.log(userData);
  return !!userData.user ? (
    <Outlet />
  ) : (
    <Navigate to='/login' state={{ needToLogin: true }} />
  );
};

export default PrivateRoute;
