import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDrawsRequest } from '../store/actions/draws.actions';
import { AppDispatch, RootState } from '../store/store';
import { IDrawsState } from '../interfaces/IDraw';

const useDraws = (currentPage: number, limit: number) => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getDrawsRequest(currentPage, limit));
  }, [dispatch, currentPage, limit]);

  const { list, count, page, totalPages, loading, error }: IDrawsState = useSelector(
    (state: RootState) => state.draws
  );

  return { list, count, page, totalPages, loading, error };
};

export default useDraws;
