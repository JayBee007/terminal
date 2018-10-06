import gql from "graphql-tag";

export const UPLOAD_FILE = gql`
  mutation singleUpload($channelId: Int!, $file: Upload!) {
    singleUpload(channelId: $channelId, file: $file)
  }
`;
