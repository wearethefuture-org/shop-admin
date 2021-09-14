import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import styles from './ExpandBtn.module.scss';

interface IBtnProps {
  expandBlock: boolean;
  handleExpand: () => void;
  disabled: boolean;
}

const ExpandBtn: React.FC<IBtnProps> = ({ expandBlock, handleExpand, disabled, children }) => {
  return (
    <div onClick={handleExpand} className={styles['expandable-field']}>
      <button className={styles['expand-btn']} type="button" disabled={disabled}>
        {expandBlock ? <RemoveIcon /> : <AddIcon />}
      </button>
      {children}
    </div>
  );
};

export default ExpandBtn;
