import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import Messages from './Messages';
import SendMessage from './SendMessage';

const MessagesContainer = ({channelName, channelId, ...props}) => (
  <Grid container direction="column" className={props.classes.container}>
    <Typography variant="headline" className={props.classes.channelName}>
      #{channelName}
    </Typography>
    <Messages channelId={channelId}/>
    <SendMessage channelName={channelName} channelId={channelId} className={props.classes.sendMessage} />
  </Grid>
);

const styles = {
  container: {
    height: '100%',
    flex: 'auto',
    flexWrap: 'nowrap',
  },
  channelName: {
    flexShrink: 0
  },
  sendMessage: {
    flexShrink: 0,
    marginTop: 'auto',
    paddingTop: '5px',
  }

}

export default withStyles(styles)(MessagesContainer);
