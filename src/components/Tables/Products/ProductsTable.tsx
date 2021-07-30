import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import AppDataTable from '../../AppDataTable/AppDataTable';
import { IGetProducts, ProductsTableProps } from '../../../interfaces/IProducts';
import DateMoment from '../../Common/Date-moment';
import { root } from '../../../api/config';
import { priceFormat } from '../../../utils/priceFormat';
import styles from './ProductsTable.module.scss';

const placeholder = `${root}/static/uploads/empty-preview.png`;

const MainImgName = () => (
  <p className={styles['table-header-cell']}>
    <span>Головне</span>
    <span>зображення</span>
  </p>
);

const ProductsTable: React.FC<ProductsTableProps> = ({ list, activeColumns }) => {
  const productsColumns = [
    {
      name: 'ID',
      selector: (row) => row.id,
      sortable: true,
      maxWidth: '6%',
      minWidth: '5%',
      omit: !activeColumns.includes('ID'),
    },
    {
      name: <MainImgName />,
      selector: (row) => row.mainImg,
      format: (row) =>
        row.mainImg ? (
          <div className={styles.mainImg}>
            <img src={`${root}/static/uploads/${row.mainImg.name}`} alt={row.mainImg.name} />
          </div>
        ) : (
          <div className={styles.mainImg}>
            <img src={placeholder} alt="placeholder" />
          </div>
        ),
      maxWidth: '12%',
      minWidth: '12%',
      omit: !activeColumns.includes('Головне зображення'),
    },
    {
      name: 'Назва',
      selector: (row) => row.name,
      sortable: true,
      minWidth: '200px',
      cell: (row) => (
        <Link
          to={{
            pathname: `/product/${row.id}`,
            state: { from: '/product' },
          }}
        >
          <span className={styles['product-name']}>
            {row.name.length <= 30 ? row.name : `${row.name.slice(0, 30)}...`}
          </span>
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
      minWidth: '150px',
      format: (row) =>
        row.description.length <= 30 ? row.description : `${row.description.slice(0, 30)}...`,
      omit: !activeColumns.includes('Опис'),
    },
    {
      name: 'Категорія',
      selector: (row) => (row.category?.name ? row.category.name : 'Без категорії'),
      sortable: true,
      minWidth: '12%',
      omit: !activeColumns.includes('Категорія'),
    },
    {
      name: 'URL ключ',
      selector: (row) => row.key,
      omit: !activeColumns.includes('URL ключ'),
    },
    {
      name: 'Зображення',
      selector: (row) => row.files,
      minWidth: '10%',
      maxWidth: '12%',
      format: (row) => (
        <span className={styles.quantity}>{row?.files?.length ? row?.files?.length / 2 : 0}</span>
      ),
      omit: !activeColumns.includes('Зображення'),
    },
    {
      name: 'Створено',
      selector: (row) => row.createdAt,
      sortable: true,
      format: (row) => <DateMoment date={row.createdAt} column />,
      omit: !activeColumns.includes('Створено'),
    },
    {
      name: 'Оновлено',
      selector: (row) => row.updatedAt,
      sortable: true,
      format: (row) => <DateMoment date={row.updatedAt} column />,
      omit: !activeColumns.includes('Оновлено'),
    },
  ];

  const history = useHistory();
  const [sortedList, setSortedList] = useState<IGetProducts[]>([]);

  useEffect(() => {
    const sortedList: IGetProducts[] = list.length ? list.sort((a, b) => b.id - a.id) : [];
    setSortedList(sortedList);
  }, [list]);

  const onRowClicked = (id) => {
    history.push(`/product/${id}`);
  };

  return (
    <AppDataTable
      data={sortedList}
      columns={productsColumns}
      title="Продукти"
      onRowClicked={(row) => onRowClicked(row.id)}
    />
  );
};

export default ProductsTable;
