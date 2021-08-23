import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, LinearProgress } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import useTreeCategories from '../../hooks/useTreeCategories';
import FormDialog from '../../components/Modals/MainCategory-modal';
import useCategoriesModal from '../../hooks/useCategoriesModal';
import TreeCategoriesCards from './Cards/TreeCategoriesCards';
//import MainCategoriesTable from '../../components/Tables/MainCategory/MainCategoriesTable';
import { RootState } from '../../store/store';
import styles from './TreeCategories.module.scss';

const TreeCategory: React.FC = () => {
  const { data, dispatch } = useTreeCategories();
  const categoriesCreateModalData = useCategoriesModal();

  const list = useSelector((state: RootState) => state.treeCategories.list);
  const loading = useSelector((state: RootState) => state.treeCategories.loading);

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
        <FormDialog
          dispatch={dispatch}
          categoriesLength={data?.length}
          modalData={categoriesCreateModalData}
        />

        {list ? <TreeCategoriesCards list={list} /> : null}
      </div>
    </>
  );
};

export default TreeCategory;
