import React from 'react';
import { useHistory } from 'react-router-dom';

import AppDataTable from '../../../components/AppDataTable/AppDataTable';
import OrdersEditStatus from './OrdersEditStatus';

const OrdersTable = ({ list }) => {
  const history = useHistory();

  const ordersColumns = [
    {
      name: 'OrderID',
      selector: (row) => row.id,
      sortable: true,
      maxWidth: '100px',
      minWidth: '60px',
    },
    {
      name: 'UserID',
      selector: (row) => row.user.id,
      sortable: true,
      maxWidth: '100px',
      minWidth: '60px',
    },
    {
      name: 'Створено',
      selector: (row) => row.createdAt,
      sortable: true,
      id: 'created',
      format: (row) => {
        return new Date(row.createdAt).toLocaleDateString(undefined, {
          day: 'numeric',
          month: 'numeric',
          year: 'numeric',
        });
      },
    },
    {
      name: 'Оновлено',
      selector: (row) => row.updatedAt,
      sortable: true,
      format: (row) => {
        return new Date(row.updatedAt).toLocaleDateString(undefined, {
          day: 'numeric',
          month: 'numeric',
          year: 'numeric',
        });
      },
    },
    {
      name: 'Телефон',
      selector: (row) => row.user.phoneNumber,
      sortable: true,
    },
    {
      name: 'Email',
      selector: (row) => row.user.email,
    },
    {
      name: "Ім'я",
      selector: (row) => `${row.user.firstName} ${row.user.lastName}`,
      sortable: true,
    },
    {
      name: 'Сума',
      selector: (row) => row.amount,
      maxWidth: '100px',
      sortable: true,
    },
    {
      name: 'Статус',
      selector: (row) => row.status,
      sortable: true,
      cell: (row) => {
        return <OrdersEditStatus row={row} />;
      },
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
    />
  );
};

export default OrdersTable;
