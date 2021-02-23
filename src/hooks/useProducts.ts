import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsRequest } from '../store/actions/products.actions';
import { RootState } from '../store/store';

const useProducts = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsRequest());
  }, [dispatch]);

  const data = useSelector((state: RootState) => state.products);
  return { data, dispatch };
};

export default useProducts;
