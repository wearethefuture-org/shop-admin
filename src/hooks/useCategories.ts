import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IGetCategoriesResponse } from '../interfaces/ICategory';
import { fetchCategories } from '../store/actions/categories.actions';
import { AppDispatch, RootState } from '../store/store';

const useCategories = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const data: IGetCategoriesResponse[] = useSelector((state: RootState) => state.categories.list);

  return { data, dispatch };
};

export default useCategories;
