import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IProductsData } from '../interfaces/IProducts';
import { getProductsRequest } from '../store/actions/products.actions';
import { AppDispatch, RootState } from '../store/store';

const useProducts = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsRequest(1, 10));
  }, [dispatch]);

  const { list, loading }: Partial<IProductsData> = useSelector(
    (state: RootState) => state.products
  );

  return { list, loading };
};

export default useProducts;
