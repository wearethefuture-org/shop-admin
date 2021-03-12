import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchSettings } from '../store/actions/settings.actions';
import { AppDispatch, RootState } from '../store/store';

const useSettings = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSettings());
  }, [dispatch]);

  const data = useSelector((state: RootState) => state.settings.list);

  return { data, dispatch };
};

export default useSettings;
