import React from "react";
import Grid from "@material-ui/core/Grid";
import { Query } from "react-apollo";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import DirectMessages from "./DirectMessages";
import SendDirectMessage from "./SendDirectMessage";
import Loader from "../Loader";

import { GET_DIRECT_MESSAGES } from "../../services/directMessageService";
import { GET_USER_BY_ID } from "../../services/userService";

const DirectMessagesContainer = ({ receiverId, team, ...props }) => (
  <Query
    query={GET_DIRECT_MESSAGES}
    variables={{ teamId: team.id, userId: receiverId }}
    fetchPolicy="network-only"
  >
    {({ loading, error, data: { directMessages } }) => {
      if (loading) return <Loader />;
      if (error) return <p>Error: {JSON.stringify(error)}</p>;
      return (
        <Query
          query={GET_USER_BY_ID}
          variables={{ userId: parseInt(receiverId, 10) }}
        >
          {({loading, error, data: { getUserById }}) => {

            if (loading) return <Loader />;
            if (error) return <p>Error: {JSON.stringify(error)}</p>;


            return (
              <Grid
                container
                direction="column"
                className={props.classes.container}
              >
                <Typography className={props.classes.channelName}>
                  #{getUserById.username}
                </Typography>
                <DirectMessages messages={directMessages} />
                <SendDirectMessage
                  receiverId={receiverId}
                  receiverName={getUserById.username}
                  team={team}
                  className={props.classes.sendMessage}
                />
              </Grid>
            );
          }}
        </Query>
      )
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
    flexShrink: 0,
    fontSize: '1.5rem',
    textAlign: 'center'
  },
  sendMessage: {
    flexShrink: 0,
    marginTop: "auto",
    paddingTop: "5px"
  }
};

export default withStyles(styles)(DirectMessagesContainer);
