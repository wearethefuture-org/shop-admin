import { useDispatch, useSelector } from 'react-redux';

import { closeSnackBar } from '../store/actions/snackbar.actions';
import { RootState } from '../store/store';

const useSnackBar = () => {
  const dispatch = useDispatch();
  const { isOpen, errorMessage, typeSnackbar } = useSelector((state: RootState) => state.snackBar);

  const handleClick = () => {
    if (isOpen) {
      dispatch(closeSnackBar());
    }
  };

  const handleClose = (event: React.SyntheticEvent | MouseEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(closeSnackBar());
  };

  return {
    errorMessage,
    isOpen,
    handleClose,
    typeSnackbar,
    handleClick,
  };
};

export default useSnackBar;
