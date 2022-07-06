import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import useTreeCategories from '../../hooks/useTreeCategories';
import useCategoriesModal from '../../hooks/useCategoriesModal';

import FormDialog from '../../components/Modals/MainTreeCategoryAddModal';
import TreeCategoriesCards from './Cards/TreeCategoriesCards';
import { LinearProgress } from '@material-ui/core';
import styles from './TreeCategories.module.scss';
import AddBtn from '../../components/AddBtn/AddBtn';

const TreeCategories: React.FC = () => {
  const { data, dispatch } = useTreeCategories();
  const categoriesCreateModalData = useCategoriesModal();

  const list = useSelector((state: RootState) => state.treeCategories.list);
  const loading = useSelector((state: RootState) => state.treeCategories.loading);

  return (
    <>
      {loading && <LinearProgress />}

      <div className={styles['btns-wrapper']}>
        <AddBtn title="Додати" handleAdd={categoriesCreateModalData.handleClickOpen} />
      </div>

      <div className={styles['content-wrapper']}>
        <FormDialog
          dispatch={dispatch}
          categoriesLength={data?.length}
          modalData={categoriesCreateModalData}
        />

        {list ? <TreeCategoriesCards dispatch={dispatch} list={list} /> : null}
      </div>
    </>
  );
};

export default TreeCategories;
