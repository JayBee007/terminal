import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

const FullHeight = (props) => (
  <Grid container className={props.classes.container} {...props}>
    {props.children}
  </Grid>
)

const styles = theme => ({
  container: {
    height: '100vh',
    background: theme.palette.primary.dark,
  },
})

export default withStyles(styles)(FullHeight);
