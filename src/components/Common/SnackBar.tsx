import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Theme, makeStyles, ThemeOptions } from '@material-ui/core/styles';

import useSnackBar from '../../hooks/useSnackbar';

const useStyles = makeStyles((theme: Theme): ThemeOptions => ({
  snackbarFail: {
    backgroundColor: "#F44336",
  },
  snackbarSuccess: {
    backgroundColor: "#4CAF50",
  },
}));

const SnackBar: React.FC = () => {
  const classes = useStyles();
  const { errorMessage, isOpen, handleClose, typeSnackbar } = useSnackBar();

  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={isOpen}
        autoHideDuration={3000}
        onClose={handleClose}
        message={typeSnackbar === "success" ? "Success" : errorMessage}
        ContentProps={{
          className:
          typeSnackbar === "success"
              ? classes.snackbarSuccess
              : classes.snackbarFail,
        }}
        action={
          <>
            <IconButton
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          </>
        }
      />
    </>
  );
};

export default SnackBar;
