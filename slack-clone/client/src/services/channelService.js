import gql from "graphql-tag";

export const CREATE_CHANNEL = gql`
  mutation createChannel(
    $teamId: Int!
    $name: String!
    $public: Boolean!
    $members: [UserInput]
  ) {
    createChannel(
      teamId: $teamId
      name: $name
      public: $public
      members: $members
    ) {
      ok
      errors {
        path
        message
      }
      channel {
        id
        name
      }
    }
  }
`;
