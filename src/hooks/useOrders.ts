import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { getOrdersRequest, getOrdersByParamsRequest } from '../store/actions/orders.actions';

const useOrders = (searchValue: string) => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if(searchValue){
      dispatch(getOrdersByParamsRequest(1,10, searchValue));
    }
    
    if(!searchValue){
      dispatch(getOrdersRequest(1,10));
    }
  }, [dispatch]);

  const list = useSelector((state: RootState) => state.orders.list);

  return { list, dispatch };
};

export default useOrders;
