import gql from 'graphql-tag';

export const CREATE_TEAM = gql`
  mutation createTeam($name: String!) {
    createTeam(name: $name) {
      ok
      errors {
        path
        message
      }
    }

  }
`;
