import React from 'react';
import { Redirect } from 'react-router-dom';

import { getUserFromLocalStorage } from '../services/authService';


const UnAuth = (props) => {
  const user = getUserFromLocalStorage();

  if(user) {
    return <Redirect to='/' />
  }

  const { Component, ...rest } = props;
  return <Component {...rest} />

}


export default UnAuth;
