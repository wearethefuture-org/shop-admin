import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IGetMainCategoriesResponse } from '../interfaces/IMainCategory';
import { fetchMainCategories } from '../store/actions/mainCategories.actions';
import { AppDispatch, RootState } from '../store/store';

const useMainCategories = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMainCategories());
  }, [dispatch]);

  const data: IGetMainCategoriesResponse[] = useSelector((state: RootState) => state.mainCategories.list);

  return { data, dispatch };
};

export default useMainCategories;
