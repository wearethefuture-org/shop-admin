import React from 'react';
import { Button } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';

const ColumnsBtn = ({ handleClick }) => {
  return (
    <Button
      variant="outlined"
      color="default"
      type="button"
      onClick={handleClick}
      endIcon={<SettingsIcon />}
    >
      Колонки
    </Button>
  );
};

export default ColumnsBtn;
