import React from 'react';
import { Button, createStyles, makeStyles, ThemeOptions } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { COLORS } from '../../values/colors';

interface IBtnProps {
  title: string;
  handleAdd: (() => void) | undefined;
}

const useStyles = makeStyles(
  (): ThemeOptions =>
    createStyles({
      btn: {
        'borderRadius': '30px',
        'color': COLORS.primaryLight,
        'backgroundColor': COLORS.primaryBlue,
        '&:hover': {
          backgroundColor: COLORS.secondaryBlue,
        },
      },
    })
);

const AddBtn: React.FC<IBtnProps> = ({ title, handleAdd }) => {
  const classes = useStyles();

  return (
    <Button className={classes.btn} startIcon={<AddIcon />} type="button" onClick={handleAdd}>
      {title}
    </Button>
  );
};

export default AddBtn;
