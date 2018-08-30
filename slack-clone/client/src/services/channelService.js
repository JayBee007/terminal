import gql from 'graphql-tag';

export const CREATE_CHANNEL = gql`
  mutation createChannel($teamId: Int!, $name: String!) {
    createChannel(teamId: $teamId, name: $name)
  }
`;
