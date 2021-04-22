import React from 'react';

import useOrders from '../../hooks/useOrders';
import OrdersTable from '../../components/Tables/Orders/OrdersTable';

const OrdersPage: React.FC = () => {
  const { list } = useOrders();

  return (
    <>
      <OrdersTable list={list} />
    </>
  );
};

export default OrdersPage;
