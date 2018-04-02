import C from '../constant';

export const loginRequest = (accessToken) => ({
  type: C.LOGIN_REQUESTING,
  accessToken
})

export const loginError = (errors) => ({
  type: C.LOGIN_ERROR,
  errors
});

export const authenticated = (token) => ({
  type: C.AUTHENTICATED,
  token
})

export const unauthenticated = (token) => ({
  type: C.UNAUTHENTICATED
})
