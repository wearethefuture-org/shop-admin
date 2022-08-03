import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IProductsData } from '../interfaces/IProducts';
import { getProductsRequest, getProductsByQueryRequest } from '../store/actions/products.actions';
import { AppDispatch, RootState } from '../store/store';

const useProducts = () => {
  const dispatch: AppDispatch = useDispatch();

  const { list, loading, isSearch }: Partial<IProductsData> = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    let page = 1;
    if (sessionStorage.getItem('productsCurrentPage')) {
      page = Number(sessionStorage.getItem('productsCurrentPage'));
    }
    if (sessionStorage.getItem('searchValue')) {
      dispatch(getProductsByQueryRequest(String(sessionStorage.getItem('searchValue')), page, 10));
    } else {
      dispatch(getProductsRequest(page, 10));
    }
  }, [dispatch, isSearch]);

  return { list, loading, isSearch };
};

export default useProducts;
