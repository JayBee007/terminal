import React from "react";
import { Mutation } from "react-apollo";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AttachFile from "@material-ui/icons/AttachFile";
import DropZone from "react-dropzone";

import { UPLOAD_FILE } from "../services/fileService";

const FileUpload = ({ classes }) => {
  return (
    <Mutation mutation={UPLOAD_FILE}>
      {singleUpload => {
        return (
          <DropZone
            className="ignore"
            onDrop={([file]) => singleUpload({ variables: { file } })}
            // onDrop={({
            //   target: {
            //     validity,
            //     files: [file]
            //   }
            // }) => {
            //   console.log("files", file);
            //   return validity.valid && singleUpload({ variables: { file } });
            // }}
          >
            <Button variant="outlined" className={classes.uploadBtn}>
              <AttachFile />
            </Button>
          </DropZone>
        );
      }}
    </Mutation>
  );
};

const styles = {
  uploadBtn: {
    padding: 0,
    minWidth: "35px",
    minHeight: "34px"
  }
};

export default withStyles(styles)(FileUpload);
