export default `
  scalar Upload
  type File {
    type: String
    filepath: String
    filename: String
  }

  type Mutation {
    singleUpload(channelId: Int!, file: Upload!): Boolean!
  }
`;
