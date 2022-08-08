import React from 'react';
import { Button, createStyles, makeStyles, ThemeOptions } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';

interface IBtnProps {
  handleClick: () => void;
}

const useStyles = makeStyles(
  (): ThemeOptions =>
    createStyles({
      btn: {
        borderRadius: '30px',
      },
    })
);

const ColumnsBtn: React.FC<IBtnProps> = ({ handleClick }) => {
  const classes = useStyles();

  return (
    <Button
      variant="outlined"
      color="default"
      type="button"
      className={classes.btn}
      onClick={handleClick}
      endIcon={<SettingsIcon />}
    >
      Колонки
    </Button>
  );
};

export default ColumnsBtn;
