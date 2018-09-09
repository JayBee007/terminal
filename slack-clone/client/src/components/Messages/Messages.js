import React from 'react';
import { Query } from 'react-apollo';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles'

import Message from './Message';
import Loader from '../Loader';

import { GET_MESSAGES } from '../../services/messageService';


const Messages = (props) => (
  <Query query={GET_MESSAGES} variables={{channelId: props.channelId}}>
  {({ loading, error, data: {getMessages }}) => {

    if(loading) return <Loader />
    if(error) return <p>Error: {error}</p>

    return (
      <Grid container direction='column' className={props.classes.container} >
        {
          getMessages.map(message => (
            <Message key={message.id} {...message} />
          ))
        }
      </Grid>
    )
  }}
  </Query>
)

const styles = {
  container: {
    overflowY: 'auto',
    flexWrap: 'nowrap'
  }
}

export default withStyles(styles)(Messages);
