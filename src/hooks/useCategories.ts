import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../store/actions/categories.actions';
import { RootState } from '../store/store';

const useCategories = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const { list: data } = useSelector((state: RootState) => state.categories);
  return { data, dispatch };
};

export default useCategories;
