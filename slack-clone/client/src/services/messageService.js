import gql from 'graphql-tag';

export const CREATE_MESSAGE = gql`
  mutation createMessage($channelId: Int!, $text: String!) {
    createMessage(channelId: $channelId, text: $text)
  }
`;
