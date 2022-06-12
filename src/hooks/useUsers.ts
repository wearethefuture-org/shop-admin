import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getUsersRequest } from '../store/actions/users.actions';
import { AppDispatch, RootState } from '../store/store';
import { IUserItem, IUsersData } from '../interfaces/IUsers';

const useUsers = () => {
  const dispatch: AppDispatch = useDispatch();

  const { list, loading, isSearch }: Partial<IUsersData> = useSelector(
    (state: RootState) => state.users
  );

  useEffect(() => {
    if (!isSearch) {
      dispatch(getUsersRequest(1, 10));
    }
  }, [dispatch, isSearch]);
  return { list, loading, isSearch, dispatch };
};

export default useUsers;
