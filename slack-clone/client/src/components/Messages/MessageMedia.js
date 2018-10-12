import React from "react";
import CardMedia from "@material-ui/core/CardMedia";
import { withStyles } from "@material-ui/core/styles";

const MessageMedia = ({ file, classes }) => {
  if (!file) return null;

  const { type, filepath } = file;
  const { cardMedia } = classes;

  if (type.startsWith("image")) {
    return <CardMedia className={cardMedia} component="img" src={filepath} />;
  }

  return null;
};

const styles = {
  cardMedia: {
    maxWidth: "300px"
  }
};

export default withStyles(styles)(MessageMedia);
