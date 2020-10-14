import { useSelector, useDispatch } from 'react-redux';

import {RootState} from '../store/store';
import { toggleModal } from '../store/actions';


const useModal = () => {
  const dispatch = useDispatch();

  return {
    isModalOpened: useSelector(
      (state: RootState) => state.common.isModalOpened
    ),
    toggleModalHandler: (state: boolean) => {
      dispatch(toggleModal(state));
    },
  };
};

export default useModal;
