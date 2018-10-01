import React from "react";
import Grid from "@material-ui/core/Grid";
import { Query } from "react-apollo";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import Messages from "./Messages";
import SendMessage from "./SendMessage";

import Loader from "../Loader";

import { GET_MESSAGES, SUBSCRIBE_MESSAGE } from "../../services/messageService";

const MessagesContainer = ({ channelName, channelId, ...props }) => (
  <Query
    query={GET_MESSAGES}
    variables={{ channelId }}
    fetchPolicy="network-only"
  >
    {({ subscribeToMore, loading, error, data: { getMessages } }) => {
      if (loading) return <Loader />;
      if (error) return <p>Error: {JSON.stringify(error)}</p>;

      return (
        <Grid container direction="column" className={props.classes.container}>
          <Typography variant="headline" className={props.classes.channelName}>
            #{channelName}
          </Typography>
          <Messages
            channelId={channelId}
            messages={getMessages}
            subscribeToNewMessages={() =>
              subscribeToMore({
                document: SUBSCRIBE_MESSAGE,
                variables: { channelId },
                updateQuery: (prev, { subscriptionData }) => {
                  if (!subscriptionData.data) return prev;

                  const newMessage = subscriptionData.data.messageAdded;

                  return {
                    ...prev,
                    getMessages: [...prev.getMessages, newMessage]
                  };
                },
                onError: err => {
                  console.error("err", err);
                }
              })
            }
          />
          <SendMessage
            channelName={channelName}
            channelId={channelId}
            className={props.classes.sendMessage}
          />
        </Grid>
      );
    }}
  </Query>
);

const styles = {
  container: {
    height: "100%",
    flex: "auto",
    flexWrap: "nowrap"
  },
  channelName: {
    flexShrink: 0
  },
  sendMessage: {
    flexShrink: 0,
    marginTop: "auto",
    paddingTop: "5px"
  }
};

export default withStyles(styles)(MessagesContainer);
