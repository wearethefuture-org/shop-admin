import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSliders } from '../store/actions';
import { RootState } from '../store/store';

const useSliders = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSliders());
  }, [dispatch]);

  const data = useSelector((state: RootState) => state.sliders.list);
  return {data, dispatch};
}

export default useSliders;
