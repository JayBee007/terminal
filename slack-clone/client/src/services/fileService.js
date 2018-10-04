import gql from "graphql-tag";

export const UPLOAD_FILE = gql`
  mutation singleUpload($file: Upload!) {
    singleUpload(file: $file) {
      filename
      mimetype
      encoding
    }
  }
`;
