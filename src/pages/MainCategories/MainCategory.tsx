import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, LinearProgress } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import useMainCategories from '../../hooks/useMainCategories';
import FormDialog from '../../components/Modals/MainCategory-modal';
import useCategoriesModal from '../../hooks/useCategoriesModal';
import MainCategoriesTable from '../../components/Tables/MainCategory/MainCategoriesTable';
import { RootState } from '../../store/store';
import ColumnsMenu from '../../components/ColumnsMenu/ColumnsMenu';
import ColumnsBtn from '../../components/ColumnsBtn/ColumnsBtn';
import styles from './MainCategories.module.scss';

enum cols {
  id = 'ID',
  name = 'Назва',
  description = 'Опис',
  key = 'URL ключ',
  category = 'Кількість Під-категорій',
  createdAt = 'Створено',
  updatedAt = 'Оновлено',
}

const MainCategories: React.FC = () => {
  const { data, dispatch } = useMainCategories();
  const categoriesCreateModalData = useCategoriesModal();
  

  const list = useSelector((state: RootState) => state.mainCategories.list);
  const loading = useSelector((state: RootState) => state.mainCategories.loading);

  // ACTIVE COLUMNS
  const [showColumnsMenu, setShowColumnsMenu] = useState<boolean>(false);
  const [activeColumns, setActiveColumns] = useState<string[]>([
    cols.id,
    cols.name,
    cols.description,
    cols.category,
    cols.key,    
  ]);

  const handleColumns = (column: string) =>
    activeColumns.includes(column)
      ? setActiveColumns(activeColumns.filter((col) => col !== column))
      : setActiveColumns([...activeColumns, column]);

  return (
    <>
      {loading && <LinearProgress />}

      {showColumnsMenu && (
        <ColumnsMenu
          allColumns={cols}
          activeColumns={activeColumns}
          showColumnsMenu={showColumnsMenu}
          setShowColumnsMenu={setShowColumnsMenu}
          handleColumns={handleColumns}
        />
      )}

      <div className={styles['btns-wrapper']}>
        <Button
          variant="contained"
          color="primary"
          onClick={categoriesCreateModalData.handleClickOpen}
        >
          <AddIcon /> Додати
        </Button>
        <ColumnsBtn handleClick={() => setShowColumnsMenu(true)} />
      </div>

      <div className={styles['content-wrapper']}>
        <FormDialog
          dispatch={dispatch}
          categoriesLength={data?.length}
          modalData={categoriesCreateModalData}
        />

        {list ? <MainCategoriesTable list={list} activeColumns={activeColumns} /> : null}
      </div>
    </>
  );
};

export default MainCategories;
