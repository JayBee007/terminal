import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

import DirectMessage from "./DirectMessage";

class DirectMessages extends React.Component {
  componentDidMount() {
    this.unsubscribe = this.props.subscribeToDirectMessages();
  }

  componentDidUpdate({ teamId, userId }) {
    if( this.props.teamId !== teamId || this.props.userId !== userId) {
      if (this.unsubscribe) {
        this.unsubscribe();
      }

      this.unsubscribe = this.props.subscribeToDirectMessages();
    }
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { messages, classes } = this.props;
    return (
      <Grid container direction="column" className={classes.container}>
        {messages.map(message => (
          <DirectMessage key={message.id} {...message} />
        ))}
      </Grid>
    );
  }
}

const styles = {
  container: {
    overflowY: "auto",
    flexWrap: "nowrap"
  }
};

export default withStyles(styles)(DirectMessages);
