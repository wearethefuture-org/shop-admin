import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Card } from '@material-ui/core';

import { ICategoryResponse } from '../../../../interfaces/ICategory';
import { RootState } from '../../../../store/store';
import { formatISODate } from '../../../../utils/formatISODate';
import { CategoryToDisplay } from '../categoryToDisplayReducer';
import styles from './CategoryBasicInfo.module.scss';

interface CategoryBasicInfoProps {
  categoryDisplayState: CategoryToDisplay;
}

const CategoryBasicInfo: FC<CategoryBasicInfoProps> = ({ categoryDisplayState }) => {
  const category: ICategoryResponse = useSelector(
    (state: RootState) => state.categories.currentCategory
  );
  const { darkMode } = useSelector((state: RootState) => state.theme);

  const { id, name, key, description, mainCategory, } = categoryDisplayState;
 

  return (
    <>
      {category ? (
        <div className={darkMode ? styles['description-dark'] : styles.description}>
          <Card>
            <div className={styles.field}>
              <p className={styles.title}>ID:</p>
              <p className={styles.value}>{id ? id : category.id}</p>
            </div>
            <div className={styles.field}>
              <p className={styles.title}>Назва:</p>
              <p className={styles.value}>{name ? name : category.name}</p>
            </div>
            <div className={styles.field}>
              <p className={styles.title}>Ключ:</p>
              <p className={styles.value}>{key ? key : category.key}</p>
            </div>
            <div className={styles.field}>
              <p className={styles.title}>Головна категорія:</p>
              <p className={styles.value}>{mainCategory.name ? mainCategory.name : category.mainCategory.name }</p>
            </div>
            <div className={styles.field}>
              <p className={styles.title}>Опис:</p>
              <p className={styles.value}>{description ? description : category.description}</p>
            </div>
            <div className={styles.field}>
              <p className={styles.title}>Створено:</p>
              <p className={styles.value}>{formatISODate(category.createdAt)}</p>
            </div>
            <div className={styles.field}>
              <p className={styles.title}>Оновлено:</p>
              <p className={styles.value}>{formatISODate(category.updatedAt)}</p>
            </div>
          </Card>
        </div>
      ) : null}
    </>
  );
};

export default CategoryBasicInfo;
