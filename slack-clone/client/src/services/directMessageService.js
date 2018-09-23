import gql from 'graphql-tag';

export const CREATE_DIRECT_MESSAGE = gql`
  mutation createDirectMessage($receiverId: Int!, $text: String!, $teamId: Int!) {
    createDirectMessage(receiverId: $receiverId, text: $text, teamId: $teamId)
  }
`;


export const GET_DIRECT_MESSAGES = gql`
  query directMessages($teamId: Int!, $userId: Int!) {
    directMessages(teamId: $teamId, userId: $userId) {
      id
      sender {
        username
      }
      text
      created_at
    }
  }
`;
