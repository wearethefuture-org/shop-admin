import { useEffect } from 'react';
import { useFormikContext } from 'formik';

export const ErrorFocus = () => {
  const { isSubmitting, isValidating, errors } = useFormikContext();

  useEffect(() => {
    //@ts-ignore
    const keys = errors && Object.keys(errors);

    if (keys.length > 0 && isSubmitting && !isValidating) {
      const errorElement = document.querySelector(`input[name="${keys[0]}"]`);

      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [isSubmitting, isValidating, errors]);

  return null;
};

export const ErrorSubFormFocus = () => {
  const { isSubmitting, isValidating, errors } = useFormikContext();

  useEffect(() => {
    //@ts-ignore
    const keys = errors && errors.subForm && Object.keys(errors.subForm);

    if (keys && keys.length > 0 && isSubmitting && !isValidating) {
      const errorElement = document.querySelector(`input[name="${keys[0]}"]`);

      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [isSubmitting, isValidating, errors]);

  return null;
};
