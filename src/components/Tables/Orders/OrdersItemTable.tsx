import { useSelector, useDispatch } from 'react-redux';
import React, { FC } from 'react';

import { updateOrderQuantityRequest } from '../../../store/actions/orders.actions';
import AppDataTable from '../../../components/AppDataTable/AppDataTable';
import OrdersEditQuantity from '../../../components/Tables/Orders/OrdersEditQuantity';
import OrdersItemTableHeader from './OrdersItemTableHeader';
import { ICurrentOrder } from '../../../interfaces/IOrders';
import OrdersSelector from './OrdersSelector';
import { RootState } from '../../../store/store';

interface OrdersItemTableProps {
  order: ICurrentOrder;
}

const OrdersItemTable: FC<OrdersItemTableProps> = ({ order }) => {
  const loading = useSelector((state: RootState) => state.orders.loading);
  const dispatch = useDispatch();

  const currentOrderData = order.productToOrder.map((item) => {
    return { ...item, delivery: order.delivery };
  });

  const handleChange =
    ({ productId, field }: { productId: number; field: 'color' | 'size' }) =>
    (e) => {
      const target = e.target as HTMLSelectElement;
      e.stopPropagation();
      dispatch(updateOrderQuantityRequest(order.id, productId, { [field]: target.value }));
    };

  const getCharEnumByName = ({
    characteristicValue,
    charName,
  }: {
    characteristicValue: Array<any>;
    charName: 'sizes' | 'colors';
  }) => {
    if (!characteristicValue.length) return null;
    const charEnum = characteristicValue.find((val) => val.name === charName);
    if (!charEnum || !charEnum.enumValue.length) return null;
    return charEnum.enumValue;
  };

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
        const { characteristicValue } = row.product;
        const sizeEnum = getCharEnumByName({ characteristicValue, charName: 'sizes' });
        if (!sizeEnum) return null;
        return (
          <OrdersSelector
            value={sizeEnum.find((val) => val === row.size)}
            handleChange={handleChange({ productId: row.product.id, field: 'size' })}
            menuItems={sizeEnum}
            disabled={loading}
          />
        );
      },
    },
    {
      name: 'Колір',
      selector: (row) => row.color,
      sortable: false,
      cell: function (row) {
        const { characteristicValue } = row.product;
        const colorEnum = getCharEnumByName({ characteristicValue, charName: 'colors' });
        if (!colorEnum) return null;
        return (
          <OrdersSelector
            value={colorEnum.find((val) => val === row.color)}
            handleChange={handleChange({ productId: row.product.id, field: 'color' })}
            menuItems={colorEnum}
            disabled={loading}
          />
        );
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
