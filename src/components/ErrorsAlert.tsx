import { useEffect } from 'react';
import { useFormikContext } from 'formik';
import { useDispatch } from 'react-redux';

import { AppDispatch } from '../store/store';
import { failSnackBar } from '../store/actions/snackbar.actions';

export const ErrorsAlert = () => {
  const dispatch: AppDispatch = useDispatch();
  const { isSubmitting, errors } = useFormikContext();

  useEffect(() => {
    const fieldErrors = errors && Object.values(errors).length;

    if (fieldErrors > 0 && isSubmitting) {
      dispatch(failSnackBar('Перевірте правильність заповнення форми'));
    }
  }, [isSubmitting, errors, dispatch]);

  return null;
};
