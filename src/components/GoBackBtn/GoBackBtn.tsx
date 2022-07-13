import React from 'react';
import { Button, createStyles, makeStyles, ThemeOptions } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { COLORS } from '../../values/colors';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import classNames from 'classnames';

interface IBtnProps {
  handleGoBack: () => void;
}

const useStyles = makeStyles(
  (): ThemeOptions =>
    createStyles({
      btn: {
        borderRadius: '30px',
        padding: '6px 15px 6px 15px',
        color: COLORS.primaryLight,
      },
      btnLight: {
        'backgroundColor': COLORS.primaryGray,
        '&:hover': {
          backgroundColor: COLORS.secondaryGray,
        },
      },
      btnDark: {
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
      className={classNames(classes.btn, darkMode ? classes.btnDark : classes.btnLight)}
      onClick={handleGoBack}
    >
      <ArrowBackIosIcon fontSize="small" />
      Назад
    </Button>
  );
};

export default GoBackBtn;
