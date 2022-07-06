import React from 'react';
import { Button, createStyles, makeStyles, ThemeOptions } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { COLORS } from '../../values/colors';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

interface IBtnProps {
  handleGoBack: () => void;
}

const useStyles = makeStyles(
  (): ThemeOptions =>
    createStyles({
      btn: {
        'borderRadius': '30px',
        'padding': '5px 15px 5px 15px',
        'color': COLORS.primaryLight,
        'backgroundColor': COLORS.primaryGray,
        '&:hover': {
          backgroundColor: COLORS.secondaryGray,
        },
      },
      btnDark: {
        'borderRadius': '30px',
        'padding': '5px 15px 5px 15px',
        'color': COLORS.primaryLight,
        'backgroundColor': COLORS.secondaryDarkGray,
        '&:hover': {
          backgroundColor: COLORS.darkGray,
        },
      },
    })
);

const GoBackBtn: React.FC<IBtnProps> = ({ handleGoBack }) => {
  const classes = useStyles();
  const { darkMode } = useSelector((state: RootState) => state.theme);

  return (
    <Button
      className={darkMode ? classes.btnDark : classes.btn}
      startIcon={<ArrowBackIosIcon />}
      onClick={handleGoBack}
    >
      Назад
    </Button>
  );
};

export default GoBackBtn;
