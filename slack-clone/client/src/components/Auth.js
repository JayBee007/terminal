import React from 'react';
import { graphql } from 'react-apollo';
import { Redirect } from 'react-router-dom';

import {SET_USER, getUserFromLocalStorage } from '../services/authService';


const Auth = (props) => {
  const user = getUserFromLocalStorage();

  if(!user) {
    return <Redirect to='/login' />
  }

  const { id, token } = JSON.parse(user);
  const { Component, mutate } = props;
  mutate({variables: {
      id,
      token
    }
  });
  return <Component />

}


export default graphql(SET_USER)(Auth);
