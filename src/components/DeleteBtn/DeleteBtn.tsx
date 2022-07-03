import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button, createStyles, makeStyles, ThemeOptions } from '@material-ui/core';
import { COLORS } from '../../values/colors';

interface IBtnProps {
  handleDelete: () => void;
}

const useStyles = makeStyles(
  (): ThemeOptions =>
    createStyles({
      btn: {
        'borderRadius': '30px',
        'color': COLORS.primaryLight,
        'backgroundColor': COLORS.primaryRed,
        'padding': '5px 15px 5px 15px',
        '&:hover': {
          backgroundColor: COLORS.secondaryRed,
        },
      },
    })
);

const DeleteBtn: React.FC<IBtnProps> = ({ handleDelete }) => {
  const classes = useStyles();

  return (
    <Button className={classes.btn} startIcon={<DeleteIcon />} onClick={handleDelete} type="button">
      Видалити
    </Button>
  );
};

export default DeleteBtn;
