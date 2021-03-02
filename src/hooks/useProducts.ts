import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IGetProducts } from '../interfaces/IProducts';
import { getProductsRequest } from '../store/actions/products.actions';
import { AppDispatch, RootState } from '../store/store';

const useProducts = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsRequest());
  }, [dispatch]);

  const list: IGetProducts[] = useSelector((state: RootState) => state.products.list);

  return { list, dispatch };
};

export default useProducts;
