import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, LinearProgress } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import useMainCategories from '../../hooks/useMainCategories';
//import FormDialog from '../../components/Modals/TreeCategoryModal/TreeCategoryModal';
import useCategoriesModal from '../../hooks/useCategoriesModal';
import MainCategoriesCards from './Cards/MainCategoriesCards';
//import MainCategoriesTable from '../../components/Tables/MainCategory/MainCategoriesTable';
import { RootState } from '../../store/store';
import styles from './MainCategories.module.scss';

enum cols {
  id = 'ID',
  name = 'Назва',
  description = 'Опис',
  key = 'URL ключ',
  category = 'Кількість під-категорій',
  createdAt = 'Створено',
  updatedAt = 'Оновлено',
}

const MainCategories: React.FC = () => {
  const { data, dispatch } = useMainCategories();
  const categoriesCreateModalData = useCategoriesModal();

  const list = useSelector((state: RootState) => state.mainCategories.list);
  const loading = useSelector((state: RootState) => state.mainCategories.loading);

  return (
    <>
      {loading && <LinearProgress />}

      <div className={styles['btns-wrapper']}>
        <Button
          variant="contained"
          color="primary"
          onClick={categoriesCreateModalData.handleClickOpen}
        >
          <AddIcon /> Додати
        </Button>
      </div>

      <div className={styles['content-wrapper']}>
        {list ? <MainCategoriesCards list={list} /> : null}
      </div>
    </>
  );
};

export default MainCategories;
