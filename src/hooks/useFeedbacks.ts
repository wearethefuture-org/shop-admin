import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IFeedbacksState } from '../interfaces/IFeedback';
import { getFeedbacksRequest } from '../store/actions/feedbacks.actions';
import { AppDispatch, RootState } from '../store/store';

const useFeedbacks = (currentPage: number, limit: number) => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getFeedbacksRequest(currentPage, limit));
  }, [dispatch, currentPage, limit]);

  const { list, count, page, totalPages, loading, error }: IFeedbacksState = useSelector(
    (state: RootState) => state.feedbacks
  );

  return { list, count, page, totalPages, loading, error };
};

export default useFeedbacks;
