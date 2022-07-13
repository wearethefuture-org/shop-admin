import React from 'react';
import { Button, createStyles, makeStyles, ThemeOptions } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { COLORS } from '../../values/colors';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import classNames from 'classnames';

interface IBtnProps {
  handleClick: () => void;
}

const useStyles = makeStyles(
  (): ThemeOptions =>
    createStyles({
      btn: {
        borderRadius: '30px',
        color: COLORS.primaryLight,
        padding: '5px 15px 5px 15px',
      },
      btnLight: {
        'backgroundColor': COLORS.primaryBlue,
        '&:hover': {
          backgroundColor: COLORS.secondaryBlue,
        },
      },
      btnDark: {
        'backgroundColor': COLORS.darkBlue,
        '&:hover': {
          backgroundColor: COLORS.secondaryDarkBlue,
        },
      },
    })
);

const EditBtn: React.FC<IBtnProps> = ({ handleClick }) => {
  const classes = useStyles();
  const { darkMode } = useSelector((state: RootState) => state.theme);

  return (
    <Button
      className={classNames(classes.btn, darkMode ? classes.btnDark : classes.btnLight)}
      type="button"
      startIcon={<EditIcon />}
      onClick={handleClick}
    >
      Редагувати
    </Button>
  );
};

export default EditBtn;
