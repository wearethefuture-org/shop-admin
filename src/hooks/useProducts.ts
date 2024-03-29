import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IProductsData } from '../interfaces/IProducts';
import { getProductsRequest, getProductsByQueryRequest } from '../store/actions/products.actions';
import { AppDispatch, RootState } from '../store/store';

const useProducts = (paginationPage: number, paginationPageSearch: number, searchValue: string) => {
  const dispatch: AppDispatch = useDispatch();

  const { list, loading, isSearch }: Partial<IProductsData> = useSelector(
    (state: RootState) => state.products
  );

  useEffect((): void | any => {
    if (isSearch) {
      dispatch(getProductsByQueryRequest(searchValue, paginationPageSearch, 10));
    }
    if(!isSearch){
      dispatch(getProductsRequest(paginationPage, 10));
    }
  }, [dispatch, isSearch]);


  return { list, loading, isSearch };
};

export default useProducts;
