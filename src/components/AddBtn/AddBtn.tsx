import React from 'react';
import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

interface IBtnProps {
  title: string;
  handleAdd: (() => void) | undefined;
}

const AddBtn: React.FC<IBtnProps> = ({ title, handleAdd }) => {
  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={<AddIcon />}
      type="button"
      onClick={handleAdd}
    >
      {title}
    </Button>
  );
};

export default AddBtn;
