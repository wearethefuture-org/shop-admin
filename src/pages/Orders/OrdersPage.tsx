import React, { useState } from 'react';

import useOrders from '../../hooks/useOrders';
import OrdersTable from '../../components/Tables/Orders/OrdersTable';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { LinearProgress } from '@material-ui/core';
import ColumnsMenu from '../../components/ColumnsMenu/ColumnsMenu';
import ColumnsBtn from '../../components/ColumnsBtn/ColumnsBtn';
import AddCategoryModal from '../../components/Modals/AddCategoryModal/AddCategoryModal';

enum cols {
  orderId= 'OrderId',
  userId = 'UserId',
  createdAt = 'Створено',
  updatedAt = 'Оновлено',
  tel = 'Телефон',
  email = 'Email',
  name = "Ім'я",
  sum = 'Сума',
  status = 'Статус',
}

const OrdersPage: React.FC = () => {
  const { list } = useOrders();
  const loading = useSelector((state: RootState) => state.orders.loading);
  const [showColumnsMenu, setShowColumnsMenu] = useState<boolean>(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [activeColumns, setActiveColumns] = useState<string[]>([
    cols.orderId,
    cols.userId,
    cols.createdAt,
    cols.updatedAt,
    cols.tel,
    cols.email,
    cols.name,
    cols.sum,
    cols.status
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

      <div className="btns-wrapper">  
        <ColumnsBtn handleClick={() => setShowColumnsMenu(true)} />
      </div>

      <div className="content-wrapper">
        <AddCategoryModal openAddModal={openAddModal} setOpenAddModal={setOpenAddModal} />

        {list ? <OrdersTable list={list} activeColumns={activeColumns}/> : null}
      </div>
    </>
  );
};

export default OrdersPage;
