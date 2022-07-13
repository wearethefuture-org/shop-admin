import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button, createStyles, makeStyles, ThemeOptions } from '@material-ui/core';
import { COLORS } from '../../values/colors';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import classNames from 'classnames';

interface IBtnProps {
  handleDelete: () => void;
}

const useStyles = makeStyles(
  (): ThemeOptions =>
    createStyles({
      btn: {
        padding: '5px 15px 5px 15px',
        borderRadius: '30px',
        color: COLORS.primaryLight,
      },
      btnLight: {
        'backgroundColor': COLORS.primaryRed,
        '&:hover': {
          backgroundColor: COLORS.secondaryRed,
        },
      },
      btnDark: {
        'backgroundColor': COLORS.darkRed,
        '&:hover': {
          backgroundColor: COLORS.secondaryDarkRed,
        },
      },
    })
);

const DeleteBtn: React.FC<IBtnProps> = ({ handleDelete }) => {
  const classes = useStyles();
  const { darkMode } = useSelector((state: RootState) => state.theme);

  return (
    <Button
      className={classNames(classes.btn, darkMode ? classes.btnDark : classes.btnLight)}
      startIcon={<DeleteIcon />}
      onClick={handleDelete}
      type="button"
    >
      Видалити
    </Button>
  );
};

export default DeleteBtn;
