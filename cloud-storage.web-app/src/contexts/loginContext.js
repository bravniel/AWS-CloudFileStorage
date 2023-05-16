import React, { createContext, useReducer } from 'react';
import { getUserFromCookie } from '../cookies/userDataCookie';
import loginReducer, { userDataInitialState } from '../reducers/loginReduser';

export const LoginContext = createContext();

const LoginContextProvider = (props) => {
  const userDataCookie = getUserFromCookie();
  const [userData, dispatchUserData] = useReducer(
    loginReducer,
    userDataCookie || userDataInitialState
  );

  return (
    <LoginContext.Provider value={{ userData, dispatchUserData }}>
      {props.children}
    </LoginContext.Provider>
  );
};

export default LoginContextProvider;
