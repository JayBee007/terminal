import gql from 'graphql-tag';

export const REGISTER = gql`
  mutation register($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      id
      token
      username
      errors {
        path
        message
      }
    }
  }
`;

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      token
      username
      errors {
        path
        message
      }
    }
  }
`;

export const SET_USER = gql`
  mutation setUser($id: Int!, $token: String!, $username: String!) {
    setUser(id: $id, token: $token, username: $username) @client
  }
`
export const setUserToLocalStorage = (id, token, username) => {
  const user = window.localStorage.getItem('user');
  if(user) return;
  const data = JSON.stringify({id, token, username});
  window.localStorage.setItem('user',data);
}

export const unsetUserFromLocalStorage = () => {
  window.localStorage.removeItem('user');
}

export const getUserFromLocalStorage = () => {
  return window.localStorage.getItem('user') || undefined;
}
