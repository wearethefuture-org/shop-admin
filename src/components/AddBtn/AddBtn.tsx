import React from 'react';
import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const AddBtn = ({ handleAdd }) => {
  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={<AddIcon />}
      onClick={handleAdd}
      type="button"
    >
      Додати
    </Button>
  );
};

export default AddBtn;
