import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IProductsData } from '../interfaces/IProducts';
import { getProductsRequest } from '../store/actions/products.actions';
import { AppDispatch, RootState } from '../store/store';

const useProducts = () => {
  const dispatch: AppDispatch = useDispatch();

  const { list, loading, isSearch }: Partial<IProductsData> = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    console.log(isSearch);
    if (!isSearch) {
      dispatch(getProductsRequest(1, 10));
    }
  }, [dispatch, isSearch]);

  return { list, loading, isSearch };
};

export default useProducts;
