import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSlides } from '../store/actions/slides.actions';
import { RootState } from '../store/store';

const useSlides = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSlides());
  }, [dispatch]);

  const data = useSelector((state: RootState) => state.slides.list);
  return {data, dispatch};
}

export default useSlides;
