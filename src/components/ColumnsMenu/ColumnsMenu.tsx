import React from 'react';
import { Checkbox, Dialog, DialogTitle, List, ListItem } from '@material-ui/core';

import styles from './ColumnsMenu.module.scss';

interface IColumnsProps {
  allColumns: string[];
  activeColumns: string[];
  showColumnsMenu: boolean;
  setShowColumnsMenu: () => void;
  handleColumns: () => void;
}

const ColumnsMenu = ({
  allColumns,
  activeColumns,
  showColumnsMenu,
  setShowColumnsMenu,
  handleColumns,
}) => {
  const columnsKeys = Object.keys(allColumns);

  return (
    <Dialog
      onClose={() => setShowColumnsMenu(false)}
      aria-labelledby="simple-dialog-title"
      open={showColumnsMenu}
    >
      <DialogTitle id="simple-dialog-title">Активні колонки</DialogTitle>
      <List className={styles.list}>
        {columnsKeys
          .filter((colunm) => { return colunm !== 'notcall' })
          .map((column) => (
          <ListItem key={column}>
            <Checkbox
              color="primary"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
              checked={activeColumns.includes(allColumns[column])}
              onChange={() => handleColumns(allColumns[column])}
            />
            <span>{allColumns[column]}</span>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
};

export default ColumnsMenu;
