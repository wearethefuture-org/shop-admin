import React from 'react';
import { Button, createStyles, makeStyles, ThemeOptions } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { COLORS } from '../../values/colors';

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
    })
);

const GoBackBtn: React.FC<IBtnProps> = ({ handleGoBack }) => {
  const classes = useStyles();
  return (
    <Button className={classes.btn} startIcon={<ArrowBackIosIcon />} onClick={handleGoBack}>
      Назад
    </Button>
  );
};

export default GoBackBtn;
