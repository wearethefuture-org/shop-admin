import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import AppDataTable from '../../AppDataTable/AppDataTable';
import DateMoment from '../../Common/Date-moment';
import { root } from '../../../api/config';
import styles from './LotteryTable.module.scss';
import { ILotteryItem, LotteryTableProps } from '../../../interfaces/ILottery';

const placeholder = `${root}/product/img/empty-preview.png`;

const MainImgName = () => (
  <p className={styles['table-header-cell']}>
    <span>Головне</span>
    <span>зображення</span>
  </p>
);

const LotteryTable: React.FC<LotteryTableProps> = ({ list, activeColumns }) => {
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
      name: <MainImgName/>,
      selector: (row) => row.mainImg,
      format: (row) =>
        row.mainImg ? (
          <div className={styles.mainImg}>
            <img src={`${root}uploads/images/${row.mainImg.name}`} alt={row.mainImg.name}/>
          </div>
        ) : (
          <div className={styles.placeholder}>
            <img src={placeholder} alt="placeholder"/>
          </div>
        ),
      maxWidth: '12%',
      minWidth: '12%',
      omit: !activeColumns.includes('Головне зображення'),
    },
    {
      name: 'Назва',
      selector: (row) => row.title,
      sortable: true,
      cell: (row) => (
        <Link
          to={{
            pathname: `/product/${row.id}`,
            state: { from: '/product' },
          }}
        >
          <span className={styles['product-name']}>{row.title}</span>
        </Link>
      ),
      omit: !activeColumns.includes('Назва'),
    },
    {
      name: 'Опис',
      selector: (row) => row.description,
      wrap: true,
      sortable: true,
      format: (row) =>
        row.description.length <= 100 ? row.description : `${row.description.slice(0, 100)}...`,
      omit: !activeColumns.includes('Опис'),
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
      name: 'Старт',
      selector: (row) => row.start,
      sortable: true,
      format: (row) => <DateMoment date={row.createdAt} column/>,
      omit: !activeColumns.includes('Старт'),
    },
    {
      name: 'Фініш',
      selector: (row) => row.updatedAt,
      sortable: true,
      format: (row) => <DateMoment date={row.finish} column/>,
      omit: !activeColumns.includes('Фініш'),
    },
    {
      name: 'Статус',
      selector: (row) => row.active,
      sortable: true,
      format: (row) => (
        <>{row?.active ? <div>активний</div> : <div>завершений</div>}</>
      ),
    },
  ];

  const history = useHistory();
  const [sortedList, setSortedList] = useState<ILotteryItem[]>([]);

  useEffect(() => {
    const sortedList: ILotteryItem[] = list.length ? list.sort((a, b) => b.id - a.id) : [];
    setSortedList(sortedList);
  }, [list]);

  const onRowClicked = (id) => {
    history.push(`/product/${id}`);
  };

  return (
    <AppDataTable
      data={sortedList}
      columns={productsColumns}
      title="Конкурси"
      onRowClicked={(row) => onRowClicked(row.id)}
    />
  );
};

export default LotteryTable;
