import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import Messages from './Messages';
import SendMessage from './SendMessage';

const MessagesContainer = ({channelName, channelId, ...props}) => (
  <Grid container direction="column" className={props.classes.container}>
    <Typography variant="headline">
      #{channelName}
    </Typography>
    <Messages />
    <SendMessage channelName={channelName} channelId={channelId} />
  </Grid>
);

const styles = {
  container: {
    height: '100%'
  }
}

export default withStyles(styles)(MessagesContainer);
