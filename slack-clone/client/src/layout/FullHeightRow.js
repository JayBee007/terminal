import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

const FullHeightRow = props => (
  <Grid
    item
    xs={props.gridSize}
    className={`${props.classes.item} ${
      props.className ? props.className : ""
    }`}
  >
    {props.children}
  </Grid>
);

const styles = {
  item: {
    padding: "1rem"
  }
};

export default withStyles(styles)(FullHeightRow);
