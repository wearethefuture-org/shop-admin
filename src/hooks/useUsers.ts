import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IUserItem, IUsersData } from '../interfaces/IUsers';
import { getUsersByQueryRequest, getUsersRequest } from '../store/actions/users.actions';
import { AppDispatch, RootState } from '../store/store';

const useUsers = (paginationPage: number, paginationPageSearch: number, searchValue: string) => {
  const dispatch: AppDispatch = useDispatch();

  const { list, loading, isSearch }: Partial<IUsersData> = useSelector(
    (state: RootState) => state.users
  );

  useEffect((): void | any => {
    if (isSearch) {
      dispatch(getUsersByQueryRequest(searchValue, paginationPageSearch, 10));
    }
    if (!isSearch) {
      dispatch(getUsersRequest(paginationPage, 10));
    }
  }, [dispatch, isSearch]);

  return { list, loading, isSearch };
};

export default useUsers;
