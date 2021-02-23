import { IActions } from '../../interfaces/actions';
import { SUCCESS_SNACKBAR, FAIL_SNACKBAR, CLOSE_SNACKBAR } from '../types';

export const successSnackBar = (): IActions => ({
  type: SUCCESS_SNACKBAR,
});
export const failSnackBar = (error: string): IActions => ({
  type: FAIL_SNACKBAR,
  data: error,
});
export const closeSnackBar = (): IActions => ({ type: CLOSE_SNACKBAR });
