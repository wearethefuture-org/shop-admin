import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LinearProgress } from '@material-ui/core';
import AddBtn from '../../components/AddBtn/AddBtn';
import ColumnsBtn from '../../components/ColumnsBtn/ColumnsBtn';
import ColumnsMenu from '../../components/ColumnsMenu/ColumnsMenu';
import styles from '../Products/ProductsPage.module.scss';
import LotteryTable from '../../components/Tables/Lottery/LotteryTable';
import useLottery from '../../hooks/useLottery';

enum cols {
  id = 'ID',
  mainImg = 'Головне зображення',
  lotteryName = 'Назва',
  description = 'Опис',
  files = 'Зображення',
  createdAt = 'Створено',
  updatedAt = 'Оновлено',
  lotteryStatus = 'Статус'
}

const Lottery: React.FC = () => {
  const location = useLocation();

  const { list, loading } = useLottery();
  console.log(list);

  const [showColumnsMenu, setShowColumnsMenu] = useState<boolean>(false);
  const [activeColumns, setActiveColumns] = useState<string[]>([
    cols.id,
    cols.mainImg,
    cols.lotteryName,
    cols.description,
    cols.files,
    cols.createdAt,
    cols.updatedAt,
    cols.lotteryStatus
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
        <div className={styles['table-wrapper']}>
          {list && <LotteryTable list={list} activeColumns={activeColumns} />}
        </div>
      </div>
    </>
  );
};

export default Lottery;