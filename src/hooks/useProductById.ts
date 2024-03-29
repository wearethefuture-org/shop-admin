import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductByIdRequest } from '../store/actions/products.actions';
import { AppDispatch, RootState } from '../store/store';

const useProductById = (id: number) => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductByIdRequest(id));
  }, [dispatch, id]);

  const data = useSelector((state: RootState) => state.products.currentProduct);

  return { data };
};

export default useProductById;
