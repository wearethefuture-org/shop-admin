import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles, Theme } from "@material-ui/core/styles";
import useSnackBar from "../../hooks/useSnackbar";

const useStyles = makeStyles((theme: Theme) => ({
  snackbarFail: {
    backgroundColor: "#F44336",
  },
  snackbarSuccess: {
    backgroundColor: "#4CAF50",
  },
}));

const SnackBar: React.FC = () => {
  const classes = useStyles();
  const { errorMessage, isOpen, handleClose, typeSnackBar } = useSnackBar();

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={isOpen}
        autoHideDuration={3000}
        onClose={handleClose}
        message={typeSnackBar === "success" ? "Success" : errorMessage}
        ContentProps={{
          className:
            typeSnackBar === "success"
              ? classes.snackbarSuccess
              : classes.snackbarFail,
        }}
        action={
          <React.Fragment>
            <IconButton
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
};

export default SnackBar;
