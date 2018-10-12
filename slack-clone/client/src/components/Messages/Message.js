import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import MessageMedia from "./MessageMedia";

const Message = props => {
  const {
    text,
    user: { username },
    created_at,
    classes,
    file
  } = props;
  const { header, content, root, paragraph } = classes;
  return (
    <Card className={root} elevation={0}>
      <CardHeader
        className={header}
        avatar={
          <Avatar aria-label="User">
            {username.slice(0, 1).toUpperCase()}
          </Avatar>
        }
        title={username}
        subheader={created_at}
      />
      <CardContent className={content}>
        <Typography paragraph className={paragraph}>
          {text}
        </Typography>
        <MessageMedia file={file} />
      </CardContent>
    </Card>
  );
};

const styles = {
  root: {
    marginBottom: "5px",
    border: "1px solid lightblue",
    flexShrink: 0,
    overflow: "-moz-scrollbars-none"
  },
  header: {
    padding: "5px"
  },
  content: {
    padding: "5px !important"
  },
  paragraph: {
    marginBottom: 0
  }
};

export default withStyles(styles)(Message);
