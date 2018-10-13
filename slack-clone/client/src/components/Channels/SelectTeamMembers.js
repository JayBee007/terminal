import React from "react";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import Chip from "@material-ui/core/Chip";

const SelectTeamMembers = props => {
  const { handleSelectTeamMembers, members, member, classes } = props;
  const { root } = classes;
  return (
    <FormControl className={root}>
      <Select
        multiple
        value={member}
        onChange={handleSelectTeamMembers}
        input={<Input id="select-multiple-chip" />}
        renderValue={selected => (
          <div className={classes.chips}>
            {selected.map(value => (
              <Chip key={value.id} label={value.username} />
            ))}
          </div>
        )}
      >
        {members.map(member => (
          <MenuItem key={member.id} value={member}>
            {member.username}{" "}
          </MenuItem>
        ))}{" "}
      </Select>
    </FormControl>
  );
};

const styles = {
  root: {
    width: "100%"
  }
};

export default withStyles(styles)(SelectTeamMembers);
