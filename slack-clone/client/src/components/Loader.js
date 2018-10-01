import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

const Loader = props => (
  <Grid
    container
    className={props.classes.container}
    justify="center"
    alignItems="center"
  >
    <Grid item>
      <CircularProgress size={50} />
    </Grid>
  </Grid>
);

const styles = {
  container: {
    height: "100vh"
  }
};

export default withStyles(styles)(Loader);
