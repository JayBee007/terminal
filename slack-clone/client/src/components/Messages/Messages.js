import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles'

const Messages = (props) => (
  <Grid container className={props.classes.container} >
    Messages
  </Grid>
)

const styles = {
  container: {
    flex: '1',
    background: 'yellowgreen',
  }
}

export default withStyles(styles)(Messages);
