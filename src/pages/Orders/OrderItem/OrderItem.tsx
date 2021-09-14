import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../../store/store';
import OrdersItemTable from '../../../components/Tables/Orders/OrdersItemTable';
import { ICurrentOrder } from '../../../interfaces/IOrders';

const OrderItem = () => {
  const order = useSelector((state: RootState): ICurrentOrder => state.orders.currentOrder);

  return <OrdersItemTable order={order} />;
};

export default OrderItem;
