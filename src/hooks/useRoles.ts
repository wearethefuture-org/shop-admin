import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '../store/store';
import { getRolesRequest } from '../store/actions/roles.actions';

const useRoles = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getRolesRequest());
  }, [dispatch]);

  const data = useSelector((state: RootState) => state.roles.list);
  return { data, dispatch };
};

export default useRoles;
