import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles'

import Message from './Message';

class Messages extends React.Component {

  componentDidMount() {
    this.props.subscribeToNewMessages();
  }

  render() {
    const { messages, classes } = this.props;
    return (
      <Grid container direction='column' className={classes.container} >
        {
          messages.map(message => (
            <Message key={message.id} {...message} />
          ))
        }
      </Grid>
    )
  }
}


const styles = {
  container: {
    overflowY: 'auto',
    flexWrap: 'nowrap'
  }
}

export default withStyles(styles)(Messages);
