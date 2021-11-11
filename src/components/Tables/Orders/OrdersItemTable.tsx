import React, { FC } from 'react';

import AppDataTable from '../../../components/AppDataTable/AppDataTable';
import OrdersEditQuantity from '../../../components/Tables/Orders/OrdersEditQuantity';
import OrdersItemTableHeader from './OrdersItemTableHeader';
import { ICurrentOrder } from '../../../interfaces/IOrders';
import OrdersItemEditColor from './OrdersItemEditColor';
import OrdersItemEditSize from './OrdersItemEditSize';

interface OrdersItemTableProps {
  order: ICurrentOrder;
}

const OrdersItemTable: FC<OrdersItemTableProps> = ({ order }) => {
  const currentOrderData = order.productToOrder.map((item) => {
    return { ...item, delivery: order.delivery };
  });

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
      name: 'Група',
      selector: (row) => row.product.category.name,
      sortable: true,
    },
    {
      name: 'Область',
      selector: (row) => row.delivery.areaName,
      sortable: true,
    },
    {
      name: 'Місто',
      selector: (row) => row.delivery.cityName,
      sortable: true,
    },
    {
      name: 'Відділення',
      selector: (row) => row.delivery.streetName,
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
    {
      name: 'Розмір',
      selector: (row) => row.size,
      sortable: false,
      cell: (row) => {
        return <OrdersItemEditSize row={row} orderId={order.id} />;
      },
    },
    {
      name: 'Колір',
      selector: (row) => row.color,
      sortable: false,
      cell: (row) => {
        return <OrdersItemEditColor row={row} orderId={order.id} />;
      },
    },
  ];

  return (
    <AppDataTable
      data={currentOrderData}
      columns={columns}
      title={<OrdersItemTableHeader order={order} />}
      onRowClicked={() => {}}
    />
  );
};

export default OrdersItemTable;
