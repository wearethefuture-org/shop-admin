import React from 'react';
import { Button, createStyles, makeStyles, ThemeOptions } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { COLORS } from '../../values/colors';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

interface IBtnProps {
  title: string;
  handleAdd: (() => void) | undefined;
  style?: any;
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
      btnDark: {
        'borderRadius': '30px',
        'color': COLORS.primaryLight,
        'backgroundColor': COLORS.darkBlue,
        '&:hover': {
          backgroundColor: COLORS.secondaryDarkBlue,
        },
      },
    })
);

const AddBtn: React.FC<IBtnProps> = ({ title, handleAdd, style }) => {
  const classes = useStyles();

  const { darkMode } = useSelector((state: RootState) => state.theme);

  return (
    <Button
      style={style}
      className={darkMode ? classes.btnDark : classes.btn}
      startIcon={<AddIcon />}
      type="button"
      onClick={handleAdd}
    >
      {title}
    </Button>
  );
};

export default AddBtn;
