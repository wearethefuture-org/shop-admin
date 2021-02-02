import { useDispatch, useSelector } from 'react-redux';

import { closeSnackBar } from '../store/actions';
import { RootState } from '../store/store';

const useSnackBar = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.snackBar.isOpen);
  const typeSnackBar = useSelector((state: RootState) => state.snackBar.type);
  const errorMessage = useSelector((state: RootState) => state.snackBar.errorMessage);

  const handleClick = () => {
    if (isOpen) {
      dispatch(closeSnackBar());
    }
  };

  const handleClose = (
    event: React.SyntheticEvent | MouseEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(closeSnackBar());
  };

  return {
    errorMessage,
    isOpen,
    handleClose,
    typeSnackBar,
    handleClick,
  };
};

export default useSnackBar;
