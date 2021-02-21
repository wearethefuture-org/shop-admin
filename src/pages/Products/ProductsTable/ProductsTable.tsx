import React from 'react';
import { Link } from 'react-router-dom';

import AppDataTable from '../../../components/AppDataTable/AppDataTable';
import { IProductItem } from '../../../interfaces/IProducts';
import DateMoment from '../../../components/Common/Date-moment';
import { root } from '../../../api/config';
import placeholder from '../../../assets/images/no-product-image.jpg';
import styles from './ProductsTable.module.scss';

interface ProductsDataProps {
  list: Array<IProductItem>;
  loading: boolean;
}

const productsColumns = [
  {
    name: 'ID',
    selector: 'id',
    sortable: true,
    maxWidth: '60px',
    minWidth: '60px',
  },
  {
    name: 'Головне зображення',
    selector: 'mainImg',
    format: (row) =>
      row.mainImg ? (
        <div className={styles.mainImg}>
          <img src={`${root}/product/img/${row.mainImg.name}`} alt={row.mainImg.name} width="100" />
        </div>
      ) : (
        <div>
          <img src={placeholder} alt="placeholder" width="100" height="auto" />
        </div>
      ),
    maxWidth: '140px',
    minWidth: '140px',
    // omit: ,
  },
  {
    name: 'Назва',
    selector: 'name',
    sortable: true,
    cell: (row) => (
      <Link
        to={{
          pathname: `/product/${row.id}/details`,
          state: { from: '/product' },
        }}
      >
        {row.name}
      </Link>
    ),
  },
  {
    name: 'Ціна',
    selector: 'price',
    sortable: true,
  },
  {
    name: 'Опис',
    selector: 'description',
    wrap: true,
    sortable: true,
    format: (row) =>
      row.description.length <= 100 ? row.description : `${row.description.slice(0, 100)}...`,
    maxWidth: '200px',
    // omit: ,
  },
  {
    name: 'Категорія',
    selector: 'category.name',
    sortable: true,
    // omit: ,
  },
  {
    name: 'URL ключ',
    selector: 'key',
    // omit: ,
  },
  {
    name: 'Зображення продукта',
    selector: 'files',
    maxWidth: '110px',
    minWidth: '110px',
    format: (row) => <span>{row?.files?.length ? row?.files?.length / 2 : 0}</span>,
    // omit: ,
  },
  {
    name: 'Створено',
    selector: 'createdAt',
    sortable: true,
    format: (row) => <DateMoment date={row.createdAt} />,
    // omit: ,
  },
  {
    name: 'Оновлено',
    selector: 'updatedAt',
    sortable: true,
    format: (row) => <DateMoment date={row.updatedAt} />,
    // omit: ,
  },
];

const ProductsTable: React.FC<ProductsDataProps> = ({ list }) => {
  return <AppDataTable data={list} columns={productsColumns} title="Продукти" />;
};

export default ProductsTable;
