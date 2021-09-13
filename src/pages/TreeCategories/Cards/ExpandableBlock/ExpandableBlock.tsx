import React, { FC, ReactNode } from 'react';

import styles from './ExpandableBlock.module.scss';
import Accordion from '@material-ui/core/Accordion';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AccountTreeOutlinedIcon from '@material-ui/icons/AccountTreeOutlined';

interface ExpandableBlockProps {
  darkMode: boolean;
  toggleOpen: (section: string) => void;
  openSections: string[];
  title: string;
  id: string;
  hasTree: boolean;
  children: ReactNode;
}

const ExpandableBlock: FC<ExpandableBlockProps> = ({
  darkMode,
  toggleOpen,
  openSections,
  title,
  id,
  hasTree,
  children,
}) => {
  return (
    <Accordion
      className={darkMode ? styles['expandBlock-dark'] : styles['expandBlock']}
      expanded={openSections.includes(id)}
    >
      <div onClick={() => toggleOpen(id)}>
        <span className={styles.expandBlockArrow}>
          {openSections.includes(id) ? (
            <ExpandMoreIcon fontSize="large" style={{ color: 'green' }} />
          ) : (
            <ChevronRightIcon fontSize="large" />
          )}
        </span>
        <h5>{title}</h5>
      </div>
      <div className={styles.treeHeader}>
        {hasTree ? (
          <div>
            <span className={styles.title}>
              <span className={styles.forkIcon}>
                <AccountTreeOutlinedIcon />
              </span>
              <span>Дерево категорій</span>
            </span>
          </div>
        ) : (
          <span className={styles.emptyTitle}>Дерево категорій пусте</span>
        )}
      </div>
      <div className={styles.children}>{children}</div>
    </Accordion>
  );
};

export default ExpandableBlock;
