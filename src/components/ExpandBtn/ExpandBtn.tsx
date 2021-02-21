import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import styles from './ExpandBtn.module.scss';

const ExpandBtn = ({ expandBlock, handleExpand }) => {
  return (
    <button className={styles['expand-btn']} type="button" onClick={handleExpand}>
      {expandBlock ? <RemoveIcon /> : <AddIcon />}
    </button>
  );
};

export default ExpandBtn;
