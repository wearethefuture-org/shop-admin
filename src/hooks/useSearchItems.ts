import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ISearchItems, ISearchState } from '../interfaces/ISearch';
import { getSearchItemsRequest } from '../store/actions/search.action';
import { AppDispatch, RootState } from '../store/store';

const useSearchItems = (fields: ISearchItems) => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getSearchItemsRequest({
        query: fields.query,
        option: fields.option,
        page: fields.page,
        limit: fields.limit,
      })
    );
  }, [dispatch, fields.query, fields.option, fields.page, fields.limit]);

  const { list, totalPages, loading, error }: ISearchState = useSelector(
    (state: RootState) => state.search
  );

  return { list, totalPages, loading, error };
};

export default useSearchItems;
