import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/actions';
import { RootState } from '../store/store';


const useProducts = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const data = useSelector((state: RootState) => state.products);
  return { data }
}

export default useProducts;
