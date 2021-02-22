import React from 'react';
import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const AddBtn: React.FC = () => {
  return (
    <Button variant="contained" color="primary" startIcon={<AddIcon />} type="button">
      Додати
    </Button>
  );
};

export default AddBtn;
