import React, { FC, useState, ReactNode } from 'react';
import { IChildren } from '../../../interfaces/ITreeCategory';
import styles from './ChildrenCard.module.scss';
import { AiOutlineExclamation } from 'react-icons/ai';

interface ChildrenCategoriesDataProps {
  childrens: IChildren[] | undefined;
}

const ChildrenCard: FC<ChildrenCategoriesDataProps> = ({ childrens }) => {
  return (
    <>
      {childrens?.map((child) => {
        return (
          <div className={styles.childrenCard}>
            <div className={styles.childrenBody}>
              <span className={styles.title}>{child.name}</span>
            </div>
            {child.children?.length ? (
              <div>
                <span className={styles.forkIcon}>
                  <AiOutlineExclamation />
                </span>
                <ChildrenCard childrens={child && child.children} />
              </div>
            ) : null}
          </div>
        );
      })}
    </>
  );
};

export default ChildrenCard;
