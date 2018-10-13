import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Downshift from "downshift";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import deburr from "lodash/deburr";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "react-apollo";
import { withRouter } from "react-router-dom";

class DirectMessageModal extends React.Component {
  handleChange = value => {
    const { history, teamId, channelId, handleModalVisiblity } = this.props;
    history.push(`/team/view-team/${teamId}/${channelId}/user/${value.id}`);
    handleModalVisiblity();
  };

  handleItemToString = item => {
    return item ? item.username : "";
  };

  renderInput = inputProps => {
    const { InputProps, classes, ref, ...other } = inputProps;

    return (
      <TextField
        InputProps={{
          inputRef: ref,
          classes: {
            root: classes.inputRoot
          },
          ...InputProps
        }}
        {...other}
      />
    );
  };

  renderSuggestion = ({
    suggestion,
    index,
    itemProps,
    highlightedIndex,
    selectedItem
  }) => {
    const isHighlighted = highlightedIndex === index;
    const isSelected = (selectedItem || "").indexOf(suggestion.label) > -1;

    return (
      <MenuItem
        {...itemProps}
        key={suggestion.id}
        selected={isHighlighted}
        component="div"
        style={{
          fontWeight: isSelected ? 500 : 400
        }}
      >
        {suggestion.username}
      </MenuItem>
    );
  };

  getSuggestions = (value, teamMembers) => {
    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0
      ? []
      : teamMembers.filter(teamMember => {
          const keep =
            count < 5 &&
            teamMember.username.slice(0, inputLength).toLowerCase() ===
              inputValue;
          if (keep) {
            count += 1;
          }

          return keep;
        });
  };

  render() {
    const { isOpen, handleModalVisiblity, classes, teamMembers } = this.props;

    return (
      <React.Fragment>
        <Dialog
          open={isOpen}
          onClose={handleModalVisiblity}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Find Team Member</DialogTitle>
          <DialogContent>
            <Downshift
              onChange={this.handleChange}
              itemToString={this.handleItemToString}
            >
              {({
                getInputProps,
                getItemProps,
                getMenuProps,
                highlightedIndex,
                inputValue,
                isOpen,
                selectedItem
              }) => (
                <div className={classes.container}>
                  {this.renderInput({
                    fullWidth: true,
                    classes,
                    InputProps: getInputProps({
                      placeholder: "Search Team Members"
                    })
                  })}
                  <div {...getMenuProps()}>
                    {isOpen ? (
                      <Paper className={classes.paper} square>
                        {this.getSuggestions(inputValue, teamMembers).map(
                          (suggestion, index) =>
                            this.renderSuggestion({
                              suggestion,
                              index,
                              itemProps: getItemProps({
                                item: suggestion
                              }),
                              highlightedIndex,
                              selectedItem
                            })
                        )}
                      </Paper>
                    ) : null}
                  </div>
                </div>
              )}
            </Downshift>
            <DialogActions>
              <Button onClick={handleModalVisiblity} color="primary">
                Cancel
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      </React.Fragment>
    );
  }
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 250
  },
  container: {
    flexGrow: 1,
    position: "relative"
  },
  paper: {
    position: "absolute",
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`
  },
  inputRoot: {
    flexWrap: "wrap"
  },
  divider: {
    height: theme.spacing.unit * 2
  }
});

export default compose(
  withStyles(styles),
  withRouter
)(DirectMessageModal);
