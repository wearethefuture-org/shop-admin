import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button } from '@material-ui/core';

const DeleteBtn = ({ handleDelete }) => {
  return (
    <Button
      variant="contained"
      color="secondary"
      startIcon={<DeleteIcon />}
      onClick={handleDelete}
      type="button"
    >
      Видалити
    </Button>
  );
};

export default DeleteBtn;
