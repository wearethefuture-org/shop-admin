import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { getOrdersRequest } from '../store/actions/orders.actions';

const useOrders = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrdersRequest(1,10));
  }, [dispatch]);

  const list = useSelector((state: RootState) => state.orders.list);

  return { list, dispatch };
};

export default useOrders;
