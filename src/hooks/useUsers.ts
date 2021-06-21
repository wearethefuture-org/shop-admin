import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersRequest } from '../store/actions/users.actions';
import { AppDispatch, RootState } from '../store/store';

const useUsers = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsersRequest(1, 10));
  }, [dispatch]);

  const data = useSelector((state: RootState) => state.users.list);
  return { data, dispatch };
};

export default useUsers;
