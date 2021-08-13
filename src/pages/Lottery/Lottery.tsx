import React, { useState } from 'react';
import { Button, LinearProgress } from '@material-ui/core';
import ColumnsBtn from '../../components/ColumnsBtn/ColumnsBtn';
import ColumnsMenu from '../../components/ColumnsMenu/ColumnsMenu';
import styles from '../Products/ProductsPage.module.scss';
import LotteryTable from '../../components/Tables/Lottery/LotteryTable';
import useLottery from '../../hooks/useLottery';
import AddIcon from '@material-ui/icons/Add';
import useCategoriesModal from '../../hooks/useCategoriesModal';
import LotteryModal from '../../components/Modals/lotteryModal';

enum cols {
  id = 'ID',
  mainImg = 'Головне зображення',
  lotteryName = 'Назва',
  description = 'Опис',
  files = 'Зображення',
  start = 'Старт',
  finish = 'Фініш',
  lotteryStatus = 'Статус'
}

const Lottery: React.FC = () => {
  const categoriesCreateModalData = useCategoriesModal();
  const { list, loading, dispatch } = useLottery();


  const [showColumnsMenu, setShowColumnsMenu] = useState<boolean>(false);
  const [activeColumns, setActiveColumns] = useState<string[]>([
    cols.id,
    cols.mainImg,
    cols.lotteryName,
    cols.description,
    cols.files,
    cols.start,
    cols.finish,
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
          <LotteryModal
            dispatch={dispatch}
            modalData={categoriesCreateModalData}
          />

        </div>
        <div className={styles['table-wrapper']}>
          {list && <LotteryTable list={list} activeColumns={activeColumns} />}
        </div>
      </div>
    </>
  );
};

export default Lottery;
