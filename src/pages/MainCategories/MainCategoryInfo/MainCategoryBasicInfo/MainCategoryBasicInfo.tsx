import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Card } from '@material-ui/core';

import { IMainCategoryResponse } from '../../../../interfaces/IMainCategory';
import { RootState } from '../../../../store/store';
import { formatISODate } from '../../../../utils/formatISODate';
import { MainCategoryToDisplay } from '../mainCategoryToDisplayReducer';
import styles from './MainCategoryBasicInfo.module.scss';

interface MainCategoryBasicInfoProps {
  mainCategoryDisplayState: MainCategoryToDisplay;
}

const MainCategoryBasicInfo: FC<MainCategoryBasicInfoProps> = ({ mainCategoryDisplayState }) => {
  const mainCategory: IMainCategoryResponse = useSelector(
    (state: RootState) => state.mainCategories.currentMainCategory
  );
  const { darkMode } = useSelector((state: RootState) => state.theme);

  const { id, name, key, description, category, } = mainCategoryDisplayState; 
  

  return (
    <>
      {mainCategory ? (
        <div className={darkMode ? styles['description-dark'] : styles.description}>
          <Card>
            <div className={styles.field}>
              <p className={styles.title}>ID:</p>
              <p className={styles.value}>{id ? id : mainCategory.id}</p>
            </div>
            <div className={styles.field}>
              <p className={styles.title}>Назва:</p>
              <p className={styles.value}>{name ? name : mainCategory.name}</p>
            </div>
            <div className={styles.field}>
              <p className={styles.title}>Ключ:</p>
              <p className={styles.value}>{key ? key : mainCategory.key}</p>
            </div>            
            <div className={styles.field}>
              <p className={styles.title}>Опис:</p>
              <p className={styles.value}>{description ? description : mainCategory.description}</p>
            </div>
            <div className={styles.field}>
              <p className={styles.title}>Створено:</p>
              <p className={styles.value}>{formatISODate(mainCategory.createdAt)}</p>
            </div>
            <div className={styles.field}>
              <p className={styles.title}>Оновлено:</p>
              <p className={styles.value}>{formatISODate(mainCategory.updatedAt)}</p>
            </div>
            <div className={styles.field}>
              <p className={styles.title}>К-сть під-категорій:</p>
              <p className={styles.value}>{category ? category?.length  : 0}</p>
            </div>
          </Card>
        </div>
      ) : null}
    </>
  );
};

export default MainCategoryBasicInfo;
