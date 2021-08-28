import React from 'react';
import { useSelector } from 'react-redux';
import { Card } from '@material-ui/core';

import { IGetTreeCategoriesResponse } from '../../../../interfaces/ITreeCategory';
import { RootState } from '../../../../store/store';
import { formatISODate } from '../../../../utils/formatISODate';
import styles from './TreeCategoryBasicInfo.module.scss';

const TreeCategoryBasicInfo = () => {
  const treeCategory: IGetTreeCategoriesResponse = useSelector(
    (state: RootState) => state.treeCategories.currentTreeCategory
  );
  const { darkMode } = useSelector((state: RootState) => state.theme);

  return (
    <>
      {treeCategory ? (
        <div className={darkMode ? styles['description-dark'] : styles.description}>
          <Card>
            <div className={styles.field}>
              <p className={styles.title}>ID:</p>
              <p className={styles.value}>{treeCategory.id}</p>
            </div>
            <div className={styles.field}>
              <p className={styles.title}>Назва:</p>
              <p className={styles.value}>{treeCategory.name}</p>
            </div>
            <div className={styles.field}>
              <p className={styles.title}>Ключ:</p>
              <p className={styles.value}>{treeCategory.key}</p>
            </div>
            <div className={styles.field}>
              <p className={styles.title}>Опис:</p>
              <p className={styles.value}>{treeCategory.description}</p>
            </div>
            <div className={styles.field}>
              <p className={styles.title}>Створено:</p>
              <p className={styles.value}>{formatISODate(treeCategory.createdAt)}</p>
            </div>
            <div className={styles.field}>
              <p className={styles.title}>Оновлено:</p>
              <p className={styles.value}>{formatISODate(treeCategory.updatedAt)}</p>
            </div>
          </Card>
        </div>
      ) : null}
    </>
  );
};

export default TreeCategoryBasicInfo;
