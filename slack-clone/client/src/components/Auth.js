import React from "react";
import { graphql } from "react-apollo";
import { Redirect } from "react-router-dom";
import jwtDecode from "jwt-decode";

import {
  SET_USER,
  getUserFromLocalStorage,
  unsetUserFromLocalStorage
} from "../services/authService";

const Auth = props => {
  const user = getUserFromLocalStorage();

  if (!user) {
    return <Redirect to="/login" />;
  }

  const { id, token, username } = JSON.parse(user);

  try {
    jwtDecode(token);
  } catch (e) {
    unsetUserFromLocalStorage();
    return <Redirect to="/login" />;
  }

  const { Component, mutate } = props;
  mutate({
    variables: {
      id,
      token,
      username
    }
  });
  return <Component {...props} />;
};

export default graphql(SET_USER)(Auth);
