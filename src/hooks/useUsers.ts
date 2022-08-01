import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IUserItem, IUsersData } from '../interfaces/IUsers';
import { getUsersByQueryRequest, getUsersRequest } from '../store/actions/users.actions';
import { AppDispatch, RootState } from '../store/store';

const useUsers = (paginationPage: number, paginationPageSearch: number, searchValue: string) => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    let page = 1;
    if (sessionStorage.getItem('usersCurrentPage')) {
      page = Number(sessionStorage.getItem('usersCurrentPage'));
    }
    dispatch(getUsersRequest(page, 10));
  }, [dispatch]);

  return { list, loading, isSearch };
};

export default useUsers;
