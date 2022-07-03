import React from 'react';
import { Button, createStyles, makeStyles, ThemeOptions } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { COLORS } from '../../values/colors';

interface IBtnProps {
  handleClick: () => void;
}

const useStyles = makeStyles(
  (): ThemeOptions =>
    createStyles({
      btn: {
        'borderRadius': '30px',
        'color': COLORS.primaryLight,
        'backgroundColor': COLORS.primaryBlue,
        'padding': '5px 15px 5px 15px',
        '&:hover': {
          backgroundColor: COLORS.secondaryBlue,
        },
      },
    })
);

const EditBtn: React.FC<IBtnProps> = ({ handleClick }) => {
  const classes = useStyles();

  return (
    <Button className={classes.btn} type="button" startIcon={<EditIcon />} onClick={handleClick}>
      Редагувати
    </Button>
  );
};

export default EditBtn;
