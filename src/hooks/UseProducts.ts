import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/actions';
import { RootState } from '../store/store';


const UseProducts = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return useSelector((state: RootState) => state.products.list);
}

export default UseProducts;
