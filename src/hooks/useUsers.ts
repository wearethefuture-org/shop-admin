import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getUsersRequest } from '../store/actions/users.actions';
import { AppDispatch, RootState } from '../store/store';
import { IUserItem } from '../interfaces/IUsers';

const useUsers = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    let page = 1;
    if (sessionStorage.getItem('usersCurrentPage')) {
      page = Number(sessionStorage.getItem('usersCurrentPage'));
    }
    dispatch(getUsersRequest(page, 10));
  }, [dispatch]);

  const data: IUserItem[] = useSelector((state: RootState) => state.users.list);
  return { data, dispatch };
};

export default useUsers;
