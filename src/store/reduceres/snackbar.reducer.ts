import { IActions } from '../../interfaces/actions';
import { ISnackBar } from '../../interfaces/ISnackBar';
import { CLOSE_SNACKBAR, FAIL_SNACKBAR, SUCCESS_SNACKBAR } from '../types';

const data: ISnackBar = {
  isOpen: false,
  errorMessage: "",
  typeSnackbar: "success",
};

const snackBar = (state = data, action: IActions) => {
  switch (action.type) {
    case SUCCESS_SNACKBAR: {
      return { ...state, isOpen: true, typeSnackbar: "success" };
    }
    case FAIL_SNACKBAR: {
      return {
        ...state,
        isOpen: true,
        errorMessage: action.data,
        typeSnackbar: "error",
      };
    }
    case CLOSE_SNACKBAR: {
      return { ...state, isOpen: false, errorMessage: "" };
    }
    default:
      return state;
  }
};

export default snackBar;
