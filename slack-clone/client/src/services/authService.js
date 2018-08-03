import gql from 'graphql-tag';

export const REGISTER = gql`
  mutation register($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      id
      token
    }
  }
`;

export const SET_USER = gql`
  mutation setUser($id: Int!, $token: String!) {
    setUser(id: $id, token: $token) @client
  }
`
export const setUserToLocalStorage = (id, token) => {
  const user = window.localStorage.getItem('user');
  if(user) return;
  const data = JSON.stringify({id, token});
  window.localStorage.setItem('user',data);
}

export const unsetUserFromLocalStorage = () => {
  window.localStorage.removeItem('user');
}

export const getUserFromLocalStorage = () => {
  return window.localStorage.getItem('user');
}
