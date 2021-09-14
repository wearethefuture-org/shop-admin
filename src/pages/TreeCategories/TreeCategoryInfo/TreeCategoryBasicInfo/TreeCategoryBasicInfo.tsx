import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { formatISODate } from '../../../../utils/formatISODate';
import { IChildren } from '../../../../interfaces/ITreeCategory';

import { Card } from '@material-ui/core';
import styles from './TreeCategoryBasicInfo.module.scss';

interface TreeCategoryBasicInfoProps {
  category?: IChildren;
}

const TreeCategoryBasicInfo: FC<TreeCategoryBasicInfoProps> = ({ category }) => {
  let displayCategory;

  const stateTreeCategory: IChildren = useSelector(
    (state: RootState) => state.treeCategories.currentTreeCategory
  );

  displayCategory = stateTreeCategory;

  if (category) {
    displayCategory = category;
  }

  const { darkMode } = useSelector((state: RootState) => state.theme);

  return (
    <>
      {displayCategory ? (
        <div className={darkMode ? styles['description-dark'] : styles.description}>
          <Card>
            <div className={styles.field}>
              <p className={styles.title}>ID:</p>
              <p className={styles.value}>{displayCategory.id}</p>
            </div>
            <div className={styles.field}>
              <p className={styles.title}>Назва:</p>
              <p className={styles.value}>{displayCategory.name}</p>
            </div>
            <div className={styles.field}>
              <p className={styles.title}>Ключ:</p>
              <p className={styles.value}>{displayCategory.key}</p>
            </div>
            <div className={styles.field}>
              <p className={styles.title}>Опис:</p>
              <p className={styles.value}>{displayCategory.description}</p>
            </div>
            <div className={styles.field}>
              <p className={styles.title}>Створено:</p>
              <p className={styles.value}>{formatISODate(displayCategory.createdAt)}</p>
            </div>
            <div className={styles.field}>
              <p className={styles.title}>Оновлено:</p>
              <p className={styles.value}>{formatISODate(displayCategory.updatedAt)}</p>
            </div>
          </Card>
        </div>
      ) : null}
    </>
  );
};

export default TreeCategoryBasicInfo;
