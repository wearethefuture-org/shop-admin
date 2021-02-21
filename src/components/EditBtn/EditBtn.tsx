import React from 'react';
import { Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

const EditBtn = ({ handleClick }) => {
  return (
    <Button
      variant="contained"
      color="primary"
      type="button"
      startIcon={<EditIcon />}
      onClick={handleClick}
    >
      Редагувати
    </Button>
  );
};

export default EditBtn;
