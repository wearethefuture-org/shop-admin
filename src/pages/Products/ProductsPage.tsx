import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  getProductsRequest,
  getProductsByQueryRequest,
} from '../../store/actions/products.actions';
import { AppDispatch } from '../../store/store';
import { LinearProgress } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Search from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';

import ProductsTable from '../../components/Tables/Products/ProductsTable';
import AddBtn from '../../components/AddBtn/AddBtn';
import ColumnsBtn from '../../components/ColumnsBtn/ColumnsBtn';
import ColumnsMenu from '../../components/ColumnsMenu/ColumnsMenu';
import useProducts from '../../hooks/useProducts';
import styles from './ProductsPage.module.scss';

enum cols {
  id = 'ID',
  mainImg = 'Головне зображення',
  name = 'Назва',
  price = 'Ціна',
  description = 'Опис',
  categoryName = 'Категорія',
  key = 'URL ключ',
  files = 'Зображення',
  createdAt = 'Створено',
  updatedAt = 'Оновлено',
}

interface IProps {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  isSearchEnabled: boolean;
  setSearchEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchField: React.FC<IProps> = ({
  searchValue,
  setSearchValue,
  isSearchEnabled,
  setSearchEnabled,
}) => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (searchValue.length < 1 && isSearchEnabled) {
      setSearchEnabled(false);
      dispatch(getProductsRequest(1, 10));
    }
  }, [searchValue]);

  const handleSubmit = (e: React.FormEvent) => {
    if (!searchValue || !searchValue.length) {
      e.preventDefault();
      return;
    }

    e.preventDefault();
    setSearchEnabled(true);
    dispatch(getProductsByQueryRequest(searchValue, 1, 10));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.searchFieldBlock}>
      <TextField
        className={styles.searchField}
        autoFocus
        value={searchValue}
        id="outlined-search"
        placeholder="Пошук по товарам..."
        type="search"
        name="search"
        variant="outlined"
        onChange={handleChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
      />
      <Button
        type="submit"
        className={styles.searchBtn}
        variant="contained"
        size="large"
        color="primary"
      >
        Знайти
      </Button>
    </form>
  );
};

const Products: React.FC = () => {
  const location = useLocation();

  const { list, loading } = useProducts();

  const [searchValue, setSearchValue] = useState<string>('');
  const [isSearchEnabled, setSearchEnabled] = useState<boolean>(false);

  const [showColumnsMenu, setShowColumnsMenu] = useState<boolean>(false);
  const [activeColumns, setActiveColumns] = useState<string[]>([
    cols.id,
    cols.mainImg,
    cols.name,
    cols.price,
    cols.description,
    cols.categoryName,
    cols.key,
    cols.files,
    cols.createdAt,
    cols.updatedAt,
  ]);

  const handleColumns = (column: string) =>
    activeColumns.includes(column)
      ? setActiveColumns(activeColumns.filter((col) => col !== column))
      : setActiveColumns([...activeColumns, column]);

  return (
    <>
      {loading && <LinearProgress />}

      <div className={styles.container}>
        {showColumnsMenu && (
          <ColumnsMenu
            allColumns={cols}
            activeColumns={activeColumns}
            showColumnsMenu={showColumnsMenu}
            setShowColumnsMenu={setShowColumnsMenu}
            handleColumns={handleColumns}
          />
        )}

        <div className={styles['header-btn-wrapper']}>
          <SearchField
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            isSearchEnabled={isSearchEnabled}
            setSearchEnabled={setSearchEnabled}
          />
          <div className={styles.headerButtons}>
            <Link
              to={{
                pathname: '/product/add',
                state: { from: `${location.pathname}` },
              }}
            >
              <AddBtn title="Додати" handleAdd={undefined} />
            </Link>
            <ColumnsBtn handleClick={() => setShowColumnsMenu(true)} />
          </div>
        </div>
        <div className={styles['table-wrapper']}>
          {list && (
            <ProductsTable
              list={list}
              activeColumns={activeColumns}
              isSearchEnabled={isSearchEnabled}
              searchValue={searchValue}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Products;
