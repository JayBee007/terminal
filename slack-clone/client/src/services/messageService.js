import gql from 'graphql-tag';

export const CREATE_MESSAGE = gql`
  mutation createMessage($channelId: Int!, $text: String!) {
    createMessage(channelId: $channelId, text: $text)
  }
`;

export const GET_MESSAGES = gql`
  query getMessages($channelId: Int!) {
    getMessages(channelId: $channelId) {
      id
      text
      user {
        username
      }
      created_at
    }
  }
`;
// const newChannelMessageSubscription = gql`
//   subscription($channelId: Int!) {
//     newChannelMessage(channelId: $channelId) {
//       id
//       text
//       user {
//         username
//       }
//       created_at
//     }
//   }
// `;

export const SUBSCRIBE_MESSAGE = gql`
  subscription($channelId: Int!) {
    messageAdded(channelId: $channelId) {
      id
      text
      user {
        username
      }
      created_at
    }
  }
`;
