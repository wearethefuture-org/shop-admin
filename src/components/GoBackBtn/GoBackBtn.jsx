import React from 'react';
import { Button } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const GoBackBtn = ({ handleGoBack }) => {
  return (
    <Button
      variant="contained"
      color="default"
      startIcon={<ArrowBackIosIcon />}
      onClick={handleGoBack}
    >
      Назад
    </Button>
  );
};

export default GoBackBtn;
