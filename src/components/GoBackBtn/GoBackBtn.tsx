import React from 'react';
import { Button } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

interface IBtnProps {
  handleGoBack: () => void;
}

const GoBackBtn: React.FC<IBtnProps> = ({ handleGoBack }) => {
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
