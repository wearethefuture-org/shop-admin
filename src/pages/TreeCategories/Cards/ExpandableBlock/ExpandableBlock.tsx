import React, { FC, ReactNode } from 'react';

import styles from './ExpandableBlock.module.scss';
import Accordion from '@material-ui/core/Accordion';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { ImTree } from 'react-icons/im';
import Button from '@material-ui/core/Button';
import { VscAdd } from 'react-icons/vsc';

interface ExpandableBlockProps {
  darkMode: boolean;
  toggleOpen: (section: number) => void;
  openSections: number[];
  title: string;
  id: number;
  hasTree: boolean;
  showAddCategoryModal: (id: number, name: string) => void;
  children: ReactNode;
}

const ExpandableBlock: FC<ExpandableBlockProps> = ({
  darkMode,
  toggleOpen,
  openSections,
  title,
  id,
  hasTree,
  showAddCategoryModal,
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
            <IoIosArrowUp size={23} style={{ color: 'green' }} />
          ) : (
            <IoIosArrowDown size={23} />
          )}
        </span>
        <h5>{title}</h5>
      </div>
      <div className={styles.treeHeader}>
        {hasTree ? (
          <div>
            <span className={styles.title}>
              <span className={styles.forkIcon}>
                <ImTree />
              </span>
              <span>Дерево категорій</span>
            </span>
          </div>
        ) : (
          <span className={styles.emptyTitle}>Дерево категорій пусте</span>
        )}
        <div>
          <Button
            variant="contained"
            className={styles.addSubBtn}
            onClick={() => showAddCategoryModal(id, title)}
          >
            <VscAdd />
            Створити підкатегорію
          </Button>
        </div>
      </div>
      <div className={styles.children}>{children}</div>
    </Accordion>
  );
};

export default ExpandableBlock;
