import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

const FullHeight = props => (
  <Grid container className={props.classes.container} {...props}>
    {props.children}
  </Grid>
);

const styles = {
  container: {
    height: "100vh",
    flexWrap: "nowrap"
  }
};

export default withStyles(styles)(FullHeight);
