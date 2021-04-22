import React from 'react';

import AppDataTable from '../../../components/AppDataTable/AppDataTable';
import OrdersEditQuantity from '../../../components/Tables/Orders/OrdersEditQuantity';

const OrdersItemTable = ({order}) => {

  const columns = [
    {
      name: 'productID',
      selector: (row) => row.product.id,
      sortable: true,
      maxWidth: '130px',
      minWidth: '60px',
    },
    {
      name: 'Створено',
      selector: (row) => row.createdAt,
      sortable: true,
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
      name: 'Товар',
      selector: (row) => row.product.name,
      sortable: true,
    },
    {
      name: 'Ціна',
      selector: (row) => row.product.price,
      sortable: true,
    },
    {
      name: 'Кількість',
      selector: (row) => row.quantity,
      sortable: true,
      cell: (row) => {
        return <OrdersEditQuantity row={row} orderId={order.id} />;
      },
    },
    {
      name: 'Сума',
      selector: (row) => row.amount,
      sortable: true,
    },
  ];

  return (
    <AppDataTable
      data={order.productToOrder}
      columns={columns}
      title={`Рахунок № ${order.id}`}
      onRowClicked={() => {}}
    />
  );
};

export default OrdersItemTable;
