import React from 'react';
import { Link } from 'react-router-dom';

import AppDataTable from '../../../AppDataTable/AppDataTable';
import { IGetProducts } from '../../../../interfaces/IProducts';
import DateMoment from '../../../Common/Date-moment';
import { root } from '../../../../api/config';
import styles from './ProductsTable.module.scss';

const placeholder = `${root}/product/img/empty-preview.png`;

interface ProductsDataProps {
  list: IGetProducts[];
  activeColumns: string[];
}

const priceFormat = (num) => {
  return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
};

const ProductsTable: React.FC<ProductsDataProps> = ({ list, activeColumns }) => {
  const productsColumns = [
    {
      name: 'ID',
      selector: (row) => row.id,
      sortable: true,
      maxWidth: '60px',
      minWidth: '60px',
      omit: !activeColumns.includes('ID'),
    },
    {
      name: 'Головне зображення',
      selector: (row) => row.mainImg,
      format: (row) =>
        row.mainImg ? (
          <div className={styles.mainImg}>
            <img src={`${root}/product/img/${row.mainImg.name}`} alt={row.mainImg.name} />
          </div>
        ) : (
          <div className={styles.placeholder}>
            <img src={placeholder} alt="placeholder" />
          </div>
        ),
      maxWidth: '140px',
      minWidth: '140px',
      omit: !activeColumns.includes('Головне зображення'),
    },
    {
      name: 'Назва',
      selector: (row) => row.name,
      sortable: true,
      cell: (row) => (
        <Link
          to={{
            pathname: `/product/${row.id}`,
            state: { from: '/product' },
          }}
        >
          <span className={styles['product-name']}>{row.name}</span>
        </Link>
      ),
      omit: !activeColumns.includes('Назва'),
    },
    {
      name: 'Ціна',
      selector: (row) => row.price,
      sortable: true,
      format: (row) => <span>&#8372; {priceFormat(row.price)}</span>,
    },
    {
      name: 'Опис',
      selector: (row) => row.description,
      wrap: true,
      sortable: true,
      format: (row) =>
        row.description.length <= 100 ? row.description : `${row.description.slice(0, 100)}...`,
      maxWidth: '200px',
      omit: !activeColumns.includes('Опис'),
    },
    {
      name: 'Категорія',
      selector: (row) => row.category.name,
      sortable: true,
      omit: !activeColumns.includes('Категорія'),
    },
    {
      name: 'URL ключ',
      selector: (row) => row.key,
      omit: !activeColumns.includes('URL ключ'),
    },
    {
      name: 'Зображення продукта',
      selector: (row) => row.files,
      maxWidth: '110px',
      minWidth: '110px',
      format: (row) => <span>{row?.files?.length ? row?.files?.length / 2 : 0}</span>,
      omit: !activeColumns.includes('Зображення продукта'),
    },
    {
      name: 'Створено',
      selector: (row) => row.createdAt,
      sortable: true,
      format: (row) => <DateMoment date={row.createdAt} />,
      omit: !activeColumns.includes('Створено'),
    },
    {
      name: 'Оновлено',
      selector: (row) => row.updatedAt,
      sortable: true,
      format: (row) => <DateMoment date={row.updatedAt} />,
      omit: !activeColumns.includes('Оновлено'),
    },
  ];

  return <AppDataTable data={list} columns={productsColumns} title="Продукти" />;
};

export default ProductsTable;
