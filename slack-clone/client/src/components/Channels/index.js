import React from "react";
import { Link, withRouter } from "react-router-dom";
import { compose } from "react-apollo";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Icon from "@material-ui/core/Icon";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ExitToApp from "@material-ui/icons/ExitToApp";

import CreateChannelModal from "./CreateChannelModal";
import InvitePeopleModal from "./InvitePeopleModal";
import DirectMessageModal from "./DirectMessageModal";

import { unsetUserFromLocalStorage } from "../../services/authService";

class ChannelsContainer extends React.Component {
  state = {
    createChannelModalVisible: false,
    invitePeopleModalVisible: false,
    directMessageModalVisible: false
  };

  handleLogout = () => {
    try {
      unsetUserFromLocalStorage();
      this.props.history.push("/login");
    } catch (e) {
      console.log("unable to unset user ", e);
    }
  };

  handleModalVisiblity = () => {
    this.setState(prevState => ({
      createChannelModalVisible: !prevState.createChannelModalVisible
    }));
  };

  handleInvitePeopleModal = () => {
    this.setState(prevState => ({
      invitePeopleModalVisible: !prevState.invitePeopleModalVisible
    }));
  };

  handleDirectMessageModal = () => {
    this.setState(prevState => ({
      directMessageModalVisible: !prevState.directMessageModalVisible
    }));
  };

  renderChannel = ({ id, name }, teamId) => (
    <ListItem
      key={`channel-${id}`}
      button
      className={this.props.classes.listItem}
    >
      <ListItemText classes={{ primary: this.props.classes.listText }}>
        <Link to={`/team/view-team/${teamId}/${id}`}>{`#${name}`}</Link>
      </ListItemText>
    </ListItem>
  );

  renderUser = ({ id, username, status }) => {
    const { team, currentChannel } = this.props;
    return (
      <Link
        to={`/team/view-team/${team.id}/${currentChannel.id}/user/${id}`}
        key={`user-${id}`}
      >
        <ListItem button className={this.props.classes.listItem}>
          <ListItemText classes={{ primary: this.props.classes.listText }}>
            <span
              className={`${this.props.classes.status} ${
                status === "online"
                  ? this.props.classes.online
                  : this.props.classes.offline
              }`}
            />{" "}
            {username}
          </ListItemText>
        </ListItem>
      </Link>
    );
  };

  render() {
    const {
      users,
      classes,
      channels,
      team,
      owner,
      user,
      currentChannel
    } = this.props;
    const {
      createChannelModalVisible,
      invitePeopleModalVisible,
      directMessageModalVisible
    } = this.state;

    return (
      <Grid container direction="column" style={{ height: "100%" }}>
        <div>
          <Typography variant="headline" className={classes.teamName}>
            {team.name}
          </Typography>
          <Typography>{user.username}</Typography>
        </div>
        <div style={{ marginRight: "-1rem", marginLeft: "-1rem" }}>
          <Divider />
          <List>
            <ListItem button className={classes.channelItem}>
              <ListItemText
                classes={{
                  primary: classes.channelText
                }}
              >
                Channels
                {owner && (
                  <Icon
                    color="action"
                    className={classes.icon}
                    onClick={this.handleModalVisiblity}
                  >
                    add_circle
                  </Icon>
                )}
              </ListItemText>
            </ListItem>
            {channels.map(channel => this.renderChannel(channel, team.id))}
          </List>
        </div>
        <div style={{ marginRight: "-1rem", marginLeft: "-1rem" }}>
          <Divider />
          <List>
            <ListItem button className={classes.channelItem}>
              <ListItemText
                classes={{
                  primary: classes.channelText
                }}
              >
                Direct Messages
                <Icon
                  color="action"
                  className={classes.icon}
                  onClick={this.handleDirectMessageModal}
                >
                  add_circle
                </Icon>
              </ListItemText>
            </ListItem>
            {users.map(this.renderUser)}
          </List>
        </div>
        <div style={{ marginRight: "-1rem", marginLeft: "-1rem" }}>
          <Divider />
          {owner && (
            <Link
              to="#"
              style={{
                paddingLeft: "0.7rem",
                paddingTop: "0.5rem",
                display: "block"
              }}
              onClick={this.handleInvitePeopleModal}
            >
              + Invite People
            </Link>
          )}
        </div>
        <div
          style={{
            marginRight: "-1rem",
            marginLeft: "-1rem",
            marginTop: "auto",
            textAlign: "center"
          }}
        >
          <Button variant="outlined" onClick={this.handleLogout}>
            Logout
            <ExitToApp />
          </Button>
        </div>
        <CreateChannelModal
          isOpen={createChannelModalVisible}
          handleModalVisiblity={this.handleModalVisiblity}
          teamId={team.id}
        />
        <InvitePeopleModal
          isOpen={invitePeopleModalVisible}
          handleModalVisiblity={this.handleInvitePeopleModal}
          teamId={team.id}
        />
        <DirectMessageModal
          isOpen={directMessageModalVisible}
          handleModalVisiblity={this.handleDirectMessageModal}
          teamId={team.id}
          channelId={currentChannel.id}
        />
      </Grid>
    );
  }
}

const styles = {
  teamName: {
    color: "#fff"
  },
  listItem: {
    padding: "0 0 0 1rem"
  },
  listText: {
    color: "#ddd"
  },
  channelItem: {
    padding: "0 0 0 0.7rem"
  },
  channelText: {
    color: "#ddd"
  },
  status: {
    display: "inline-block",
    height: "8px",
    width: "8px",
    borderRadius: "50%"
  },
  online: {
    background: "#38978d"
  },
  offline: {
    border: "1px solid #ddd"
  },
  icon: {
    fontSize: "16px",
    marginLeft: "5px",
    display: "inline-block",
    lineHeight: "20px"
  }
};

export default compose(
  withStyles(styles),
  withRouter
)(ChannelsContainer);
