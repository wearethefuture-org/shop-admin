import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ICommentsState } from '../interfaces/IComment';
import { getCommentsRequest } from '../store/actions/comments.actions';
import { AppDispatch, RootState } from '../store/store';

const useComments = (currentPage: number, limit: number) => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    let page = 1;
    if (sessionStorage.getItem('commentsCurrentPage')) {
      page = Number(sessionStorage.getItem('commentsCurrentPage'));
    }
    dispatch(getCommentsRequest(page, limit));
  }, [dispatch, currentPage, limit]);

  const { list, count, page, totalPages, loading, error }: ICommentsState = useSelector(
    (state: RootState) => state.comments
  );

  return { list, count, page, totalPages, loading, error };
};

export default useComments;
