import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, LinearProgress } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import useCategories from '../../hooks/useCategories';
import FormDialog from '../../components/Modals/Category-modal';
import useCategoriesModal from '../../hooks/useCategoriesModal';
import CategoriesTable from '../../components/Tables/Categories/CategoriesTable';
import { RootState } from '../../store/store';
import ColumnsMenu from '../../components/ColumnsMenu/ColumnsMenu';
import ColumnsBtn from '../../components/ColumnsBtn/ColumnsBtn';
import styles from './Categories.module.scss';

enum cols {
  id = 'ID',
  name = 'Назва',
  description = 'Опис',
  key = 'URL ключ',
  mainCategory = 'Головна категорія',
  createdAt = 'Створено',
  updatedAt = 'Оновлено',
  products = 'Кількість продуктів',
}

const Categories: React.FC = () => {
  const { data, dispatch } = useCategories();
  const categoriesCreateModalData = useCategoriesModal();
  

  const list = useSelector((state: RootState) => state.categories.list);
  const loading = useSelector((state: RootState) => state.categories.loading);

  // ACTIVE COLUMNS
  const [showColumnsMenu, setShowColumnsMenu] = useState<boolean>(false);
  const [activeColumns, setActiveColumns] = useState<string[]>([
    cols.id,
    cols.name,
    cols.description,
    cols.mainCategory,
    cols.key,
    cols.products,    
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

        {list ? <CategoriesTable list={list} activeColumns={activeColumns} /> : null}
      </div>
    </>
  );
};

export default Categories;
