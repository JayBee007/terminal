import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Mutation } from "react-apollo";
import findIndex from "lodash/findIndex";

import { CREATE_CHANNEL } from "../../services/channelService";
import { GET_USER } from "../../services/userService";

class CreateChannelModal extends React.Component {
  state = {
    channelName: ""
  };

  handleOnChange = e => {
    const { value } = e.target;

    if (value.length < 0) return;
    this.setState(() => ({
      channelName: value
    }));
  };

  render() {
    const { isOpen, handleModalVisiblity, teamId } = this.props;
    const { channelName } = this.state;

    return (
      <Mutation
        mutation={CREATE_CHANNEL}
        update={(cache, { data: { createChannel } }) => {
          const { ok, channel } = createChannel;
          if (ok) {
            const data = cache.readQuery({ query: GET_USER });
            const teamIdx = findIndex(data.getUser.teams, ["id", teamId]);

            data.getUser.teams[teamIdx].channels.push(channel);

            cache.writeQuery({
              query: GET_USER,
              data
            });
          }
        }}
      >
        {createChannel => (
          <React.Fragment>
            <Dialog
              open={isOpen}
              onClose={handleModalVisiblity}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Create Channel</DialogTitle>
              <DialogContent>
                <form
                  autoComplete="off"
                  onSubmit={e => {
                    e.preventDefault();
                    if (channelName.length > 0) {
                      handleModalVisiblity();
                      createChannel({
                        variables: {
                          teamId,
                          name: channelName
                        },
                        optimisticResponse: {
                          __typename: "Mutation",
                          createChannel: {
                            __typename: "",
                            ok: true,
                            errors: {
                              __typename: "",
                              path: null,
                              message: null
                            },
                            channel: {
                              __typename: "",
                              id: 1,
                              name: channelName
                            }
                          }
                        }
                      });
                    }
                  }}
                >
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Enter Channel Name"
                    type="text"
                    fullWidth
                    onChange={this.handleOnChange}
                  />
                  <DialogActions>
                    <Button onClick={handleModalVisiblity} color="primary">
                      Cancel
                    </Button>
                    <Button type="submit" color="primary">
                      Add Channel
                    </Button>
                  </DialogActions>
                </form>
              </DialogContent>
            </Dialog>
          </React.Fragment>
        )}
      </Mutation>
    );
  }
}

export default CreateChannelModal;
