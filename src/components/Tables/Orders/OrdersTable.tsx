import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import AppDataTable from '../../../components/AppDataTable/AppDataTable';
import { getOrdersRequest } from '../../../store/actions/orders.actions';
import { AppDispatch, RootState } from '../../../store/store';
import OrdersEditStatus from './OrdersEditStatus';
import { IGetOrders } from '../../../interfaces/IOrders';

interface OrdersTableProps {
  list: IGetOrders[];
  activeColumns: Array<string>;
}

const OrdersTable: React.FC<OrdersTableProps> = ({ list, activeColumns }) => {
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const count = useSelector((state: RootState) => state.orders.count);

  const onChangePage = (page) => {
    setPage(page);
    dispatch(getOrdersRequest(page, limit));
  };

  const onChangeLimit = (limit) => {
    setLimit(limit);
    dispatch(getOrdersRequest(page, limit));
  };

  const ordersColumns = [
    {
      name: 'OrderID',
      selector: (row) => row.id,
      sortable: true,
      maxWidth: '100px',
      minWidth: '60px',
      omit: !activeColumns.includes('OrderId'),
    },
    {
      name: 'UserID',
      selector: (row) => row.user.id,
      sortable: true,
      maxWidth: '100px',
      minWidth: '60px',
      omit: !activeColumns.includes('UserId'),
    },
    {
      name: 'Створено',
      selector: (row) => row.createdAt,
      sortable: true,
      maxWidth: '100px',
      id: 'created',
      format: (row) => {
        return new Date(row.createdAt).toLocaleDateString(undefined, {
          day: 'numeric',
          month: 'numeric',
          year: 'numeric',
        });
      },
      omit: !activeColumns.includes('Створено'),
    },
    {
      name: 'Оновлено',
      selector: (row) => row.updatedAt,
      sortable: true,
      maxWidth: '100px',
      format: (row) => {
        return new Date(row.updatedAt).toLocaleDateString(undefined, {
          day: 'numeric',
          month: 'numeric',
          year: 'numeric',
        });
      },
      omit: !activeColumns.includes('Оновлено'),
    },
    {
      name: 'Телефон',
      selector: (row) => (row.additionalNumber ? row.additionalNumber : row.user.phoneNumber),
      sortable: true,
      maxWidth: '140px',
      omit: !activeColumns.includes('Телефон'),
    },
    {
      name: 'Email',
      maxWidth: '250px',
      selector: (row) => row.user.email,
      omit: !activeColumns.includes('Email'),
    },
    {
      name: "Ім'я",
      maxWidth: '150px',
      selector: (row) => `${row.user.firstName} ${row.user.lastName}`,
      sortable: true,
      omit: !activeColumns.includes("Ім'я"),
    },
    {
      name: 'Відділення',
      selector: (row) => row.delivery.streetName,
      maxWidth: '700px',
      sortable: true,
      omit: !activeColumns.includes('Відділення'),
    },
    {
      name: 'Сума',
      selector: (row) => row.amount,
      maxWidth: '100px',
      sortable: true,
      omit: !activeColumns.includes('Сума'),
    },
    {
      name: 'Статус',
      selector: (row) => row.status,
      sortable: true,
      cell: (row) => {
        return <OrdersEditStatus row={row} />;
      },
      omit: !activeColumns.includes('Статус'),
    },
  ];

  return (
    <AppDataTable
      data={list}
      columns={ordersColumns}
      title="Замовлення"
      defaultSortFieldId={'created'}
      onRowClicked={(row) => {
        history.push(`/order/${row.id}`);
      }}
      setLimit={(e) => onChangeLimit(e)}
      setPage={(e) => onChangePage(e)}
      paginationServer={true}
      count={count}
    />
  );
};

export default OrdersTable;
