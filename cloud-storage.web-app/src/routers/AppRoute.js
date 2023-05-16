import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import LoginContextProvider from '../contexts/loginContext';
import FileTasksContextProvider from '../contexts/imagesContext';
import Header from '../components/Header';
import PrivateRoute from './PrivateRoute';
import Home from '../components/Home';
import LoginRoute from './LoginRoute';
import Login from '../components/Login';


const AppRouter = () => (
  <BrowserRouter>
    <LoginContextProvider>
      <FileTasksContextProvider>
        <Header />
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path='/' element={<Navigate to='/home' />} />
            <Route path='/home' element={<Home />} />
          </Route>

          <Route element={<LoginRoute />}>
            <Route path='/login' element={<Login />} />
          </Route>

          {/* <Route path='*' element={<PageNotFound />} /> */}
        </Routes>
      </FileTasksContextProvider>
    </LoginContextProvider>
  </BrowserRouter>
);

export default AppRouter;
