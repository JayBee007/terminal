import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Loader from '../components/Loader';

const GET_ALL_USERS = gql`
  {
    allUsers {
      id
      username
    }
  }
`;


const Home = () => (
  <Query query={GET_ALL_USERS}>
    {({loading, error, data}) => {

      if(loading) return <Loader />
      if(error) return <p>Error: {error}</p>

      return data.allUsers.map(({id, username}) => (
        <div key={id}>
          <h1>{username}</h1>
        </div>
      ));

    }}
  </Query>

);



export default Home;
