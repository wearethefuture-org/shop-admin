import React, { FC, useState, ReactNode } from 'react';
import { IChildren } from '../../../interfaces/ITreeCategory';
import styles from './ChildrenCard.module.scss';
import { AiOutlineExclamation } from 'react-icons/ai';

interface ChildrenCategoriesDataProps {
  children: IChildren | undefined;
}

const ChildrenCard: FC<ChildrenCategoriesDataProps> = ({ children }) => {
  console.log(typeof children);
  return (
    <>
      {children ? (
        <div className={styles.childrenCard}>
          <div className={styles.childrenBody}>
            <span className={styles.title}>{children.name}</span>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ChildrenCard;
