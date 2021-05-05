import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, LinearProgress } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import AddCategoryModal from '../../components/Modals/AddCategoryModal/AddCategoryModal';
import CategoriesTable from '../../components/Tables/Categories/CategoriesTable';
import { AppDispatch, RootState } from '../../store/store';
import ColumnsMenu from '../../components/ColumnsMenu/ColumnsMenu';
import ColumnsBtn from '../../components/ColumnsBtn/ColumnsBtn';
import useCategories from '../../hooks/useCategories';
import { clearCurrentCategory } from '../../store/actions/categories.actions';
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
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(clearCurrentCategory());
  }, [dispatch]);

  const [openAddModal, setOpenAddModal] = useState(false);

  const { data: list } = useCategories();

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
        <Button variant="contained" color="primary" onClick={() => setOpenAddModal(true)}>
          <AddIcon /> Додати
        </Button>
        <ColumnsBtn handleClick={() => setShowColumnsMenu(true)} />
      </div>

      <div className={styles['content-wrapper']}>
        <AddCategoryModal openAddModal={openAddModal} setOpenAddModal={setOpenAddModal} />

        {list ? <CategoriesTable list={list} activeColumns={activeColumns} /> : null}
      </div>
    </>
  );
};

export default Categories;
