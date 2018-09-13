import gql from 'graphql-tag';

export const GET_USER = gql`
{
  getUser {
    id
    username
    teams {
      id
      name
      channels {
        id
        name
      }
    }
  }
}
`;