import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../store/actions';
import { RootState } from '../store/store';


const useUsers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return useSelector((state: RootState) => state.users.list);
}

export default useUsers;