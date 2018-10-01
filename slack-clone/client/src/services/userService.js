import gql from "graphql-tag";

export const GET_USER = gql`
  {
    getUser {
      id
      username
      teams {
        id
        name
        admin
        directMessageMembers {
          id
          username
        }
        channels {
          id
          name
        }
      }
    }
  }
`;

export const GET_USER_BY_ID = gql`
query getUserById($userId: Int!) {
  getUserById(userId: $userId) {
    id
    username
  }
}
`;
