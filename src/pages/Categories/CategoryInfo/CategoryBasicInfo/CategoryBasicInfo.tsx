import React from 'react';
import { useSelector } from 'react-redux';
import { Card } from '@material-ui/core';

import { ICategoryResponse } from '../../../../interfaces/ICategory';
import { RootState } from '../../../../store/store';
import { formatISODate } from '../../../../utils/formatISODate';
import styles from './CategoryBasicInfo.module.scss';


const CategoryBasicInfo = () => {
  const category: ICategoryResponse = useSelector(
    (state: RootState) => state.categories.currentCategory
  );
  const { darkMode } = useSelector((state: RootState) => state.theme);

  return (
    <>
      { category ? (
        <div className={ darkMode ? styles['description-dark'] : styles.description }>
          <Card>
            <div className={ styles.field }>
              <p className={ styles.title }>ID:</p>
              <p className={ styles.value }>{ category.id }</p>
            </div>
            <div className={ styles.field }>
              <p className={ styles.title }>Назва:</p>
              <p className={ styles.value }>{ category.name }</p>
            </div>
            <div className={ styles.field }>
              <p className={ styles.title }>Ключ:</p>
              <p className={ styles.value }>{ category.key }</p>
            </div>
            <div className={ styles.field }>
              <p className={ styles.title }>Головна категорія:</p>
              <p
                className={ styles.value }>{ category.mainCategory ? category.mainCategory.name : 'Без основної категорїї' }</p>
            </div>
            <div className={ styles.field }>
              <p className={ styles.title }>Опис:</p>
              <p className={ styles.value }>{ category.description }</p>
            </div>
            <div className={ styles.field }>
              <p className={ styles.title }>Створено:</p>
              <p className={ styles.value }>{ formatISODate(category.createdAt) }</p>
            </div>
            <div className={ styles.field }>
              <p className={ styles.title }>Оновлено:</p>
              <p className={ styles.value }>{ formatISODate(category.updatedAt) }</p>
            </div>
          </Card>
        </div>
      ) : null }
    </>
  );
};

export default CategoryBasicInfo;
