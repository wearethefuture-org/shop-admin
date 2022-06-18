import { useSelector, useDispatch } from 'react-redux';
import React, { FC, } from 'react';

import { updateProductInOrderRequest } from '../../../store/actions/orders.actions';
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
  const dispatch = useDispatch();
  const ref = React.createRef();
  const loading = useSelector((state: RootState) => state.orders.loading);
  const currentOrderData = order.productToOrder.map((item) => {
    return { ...item, delivery: order.delivery };
  });

  const handleChange = (e, field: string, productId: number) => {
    dispatch(updateProductInOrderRequest(e.target.value, field, productId, order.id));
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
      name: 'Спосіб доставки',
      selector: (row) => row.delivery.deliveryMethod,
      sortable: true,
    },
    {
      name: 'Адреса для доставки',
      selector: (row) =>
        row.delivery.courierDeliveryAddress ? row.delivery.courierDeliveryAddress : '-',
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
        const colorAndSize = getColorsAndSize(row.product.characteristicValue);
        const allSizesWithoutRepeat = getSizesWithoutRepeat(colorAndSize[1]);
        return (
          <OrdersSelector
            value={row.size}
            handleChange={(e) => handleChange(e, "size", row.product.id)}
            menuItems={allSizesWithoutRepeat}
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
        const colorAndSize = getColorsAndSize(row.product.characteristicValue);
        return (
          <OrdersSelector
            value={row.color}
            handleChange={(e) => handleChange(e, "color", row.product.id)}
            menuItems={colorAndSize[0]}
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
      onRowClicked={() => { }}
    />
  );
};

function getColorsAndSize(arr): [string[], string[]] {
  let allColors: string[] = [];
  let allSizes: string[] = [];
  for (let index of arr) {
    if (index.name === "Кольори та розміри") {
      allColors = Object.keys(index.jsonValue)
      allSizes = Object.values(index.jsonValue);
    }
  }
  return [allColors, allSizes];
}

function getSizesWithoutRepeat(arr): string[] {
  const allSizesWithoutRepeat: string[] = [];

  const allSizes = arr.reduce((acc, item) => {
    return [...acc, ...item]
  }, [])

  for (let index of allSizes) {
    if (!allSizesWithoutRepeat.includes(index)) {
      allSizesWithoutRepeat.push(index);
    }
  }

  return allSizesWithoutRepeat;
}

export default OrdersItemTable;