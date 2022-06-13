import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import React, { ChangeEvent, useState } from 'react';
import { TableColumn } from 'react-data-table-component';

import { updateOrderStatusRequest } from '../../../store/actions/orders.actions';
import AppDataTable from '../../../components/AppDataTable/AppDataTable';
import { getOrdersRequest } from '../../../store/actions/orders.actions';
import { Status as enumStatus } from '../../../enums/orderStatus';
import { AppDispatch, RootState } from '../../../store/store';
import { ICurrentOrder } from '../../../interfaces/IOrders';
import OrdersSelector from './OrdersSelector';

interface OrdersTableProps {
  list: ICurrentOrder[];
  activeColumns: Array<string>;
}

const OrdersTable: React.FC<OrdersTableProps> = ({ list, activeColumns }) => {
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const count = useSelector((state: RootState) => state.orders.count);

  const loading = useSelector((state: RootState) => state.orders.loading);

  const onChangeStatus = (orderdId: number) => (e: ChangeEvent<{ value: unknown }>) => {
    e.stopPropagation();
    dispatch(updateOrderStatusRequest(orderdId, { status: `${e.target.value}` }));
  };

  const onChangePage = (page) => {
    setPage(page);
    dispatch(getOrdersRequest(page, limit));
  };

  const onChangeLimit = (limit) => {
    setLimit(limit);
    dispatch(getOrdersRequest(page, limit));
  };

  const ordersColumns: TableColumn<ICurrentOrder>[] = [
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
      selector: (row) => row.user?.id,
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
      selector: (row) => (row.additionalEmail ? row.additionalEmail : row.user.email),
      omit: !activeColumns.includes('Email'),
    },
    {
      name: "Ім'я",
      maxWidth: '150px',
      selector: (row) =>
        `${row.additionalFirstName ? row.additionalFirstName : row.user.firstName} 
         ${row.additionalLastName ? row.additionalLastName : row.user.lastName}`,
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
      name: 'Коментар',
      selector: (row) => `${row.comment ? row.comment : 'Відсутній'}`,
      maxWidth: '600px',
      sortable: true,
      omit: !activeColumns.includes('Коментар'),
    },
    {
      name: 'Не передзвонювати',
      selector: (row) => `${row.notcall ? 'true' : 'false'}`,
      maxWidth: '300px',
      sortable: true,
      omit: !activeColumns.includes('Не передзвонювати'),
    },
    {
      name: 'Спосіб доставки',
      selector: (row) => row.delivery.deliveryMethod,
      maxWidth: '300px',
      sortable: true,
      omit: !activeColumns.includes('Спосіб доставки'),
    },
    {
      name: 'Адреса для доставки',
      selector: (row) =>
        row.delivery.courierDeliveryAddress ? row.delivery.courierDeliveryAddress : '-',
      maxWidth: '400px',
      sortable: true,
      omit: !activeColumns.includes("Адреса для кур'єрської доставки"),
    },
    {
      name: 'Сума',
      selector: (row) => row.amount,
      maxWidth: '100px',
      sortable: true,
      omit: !activeColumns.includes('Сума'),
    },
    {
      name: 'Спосіб оплати',
      selector: (row) => (row.liqpayOrderId ? 'LiqPay' : 'Післяплата'),
      maxWidth: '110px',
      omit: !activeColumns.includes('Спосіб оплати'),
    },
    {
      name: 'Статус',
      selector: (row) => row.status,
      sortable: true,
      cell: (row) => {
        return (
          <OrdersSelector
            disabled={loading}
            handleChange={onChangeStatus(row.id)}
            value={row.status}
            menuItems={Object.values(enumStatus)}
          />
        );
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
