import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../../store/store';
import OrdersItemTable from '../../../components/Tables/Orders/OrdersItemTable';

const OrderItem = () => {
  const order = useSelector((state: RootState) => state.orders.currentOrder);

  return (
    <OrdersItemTable order={order} />
  );
};

export default OrderItem;
