import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Mutation } from "react-apollo";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import { ADD_TEAM_MEMBER } from "../../services/teamService";

class InvitePeopleModal extends React.Component {
  state = {
    userEmail: "",
    errors: []
  };

  resetErrors = () => {
    this.setState(() => ({
      errors: []
    }));
  };

  renderErrors = errors => {
    return errors.map((err, i) => (
      <span key={`${err.path}-${i}`}>
        {err.message} <br />
      </span>
    ));
  };

  handleOnChange = e => {
    const { value } = e.target;

    if (value.length < 0) return;
    /* eslint no-useless-escape:0 */
    const regex = /^([A-Za-z0-9_\-\.]){1,}\@([A-Za-z]){1,}\.([a-z]{2,4})$/;

    if (regex.test(value)) {
      this.setState(() => ({
        userEmail: value
      }));
    }
  };

  render() {
    const { isOpen, handleModalVisiblity, teamId } = this.props;
    const { userEmail, errors } = this.state;

    return (
      <Mutation
        mutation={ADD_TEAM_MEMBER}
        update={(cache, { data: { addTeamMember } }) => {
          const { ok, errors } = addTeamMember;
          if (!ok) {
            this.setState(() => ({
              errors
            }));
            return;
          }
          handleModalVisiblity();
        }}
      >
        {addTeamMember => (
          <React.Fragment>
            <Dialog
              open={isOpen}
              onClose={handleModalVisiblity}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Invite People</DialogTitle>
              <DialogContent>
                <form
                  autoComplete="off"
                  onSubmit={e => {
                    e.preventDefault();
                    if (userEmail.length > 0) {
                      addTeamMember({
                        variables: {
                          teamId,
                          email: userEmail
                        }
                      });
                    }
                  }}
                >
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Enter E-mail"
                    type="email"
                    fullWidth
                    onChange={this.handleOnChange}
                  />

                  <DialogActions>
                    <Button onClick={handleModalVisiblity} color="primary">
                      Cancel
                    </Button>
                    <Button type="submit" color="primary">
                      Invite
                    </Button>
                  </DialogActions>
                </form>
              </DialogContent>
            </Dialog>
            <Snackbar
              anchorOrigin={{
                vertical: "top",
                horizontal: "center"
              }}
              open={errors.length > 0}
              autoHideDuration={6000}
              onClose={this.resetErrors}
              ContentProps={{
                "aria-describedby": "message-id"
              }}
              message={this.renderErrors(errors)}
              action={[
                <IconButton
                  key="close"
                  aria-label="Close"
                  color="inherit"
                  onClick={this.resetErrors}
                >
                  <CloseIcon />
                </IconButton>
              ]}
            />
          </React.Fragment>
        )}
      </Mutation>
    );
  }
}

export default InvitePeopleModal;
