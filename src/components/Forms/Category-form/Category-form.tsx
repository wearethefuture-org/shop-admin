import { FormikErrors, withFormik } from 'formik';
import { Dispatch } from 'redux';


import { fetchAddCategories } from '../../../store/actions';
import InnerForm from './Inner-form';
import { IFormValues } from '../../../interfaces/category-form';


interface CategoryFormProps {
  dispatch: Dispatch;
  handleClose: () => void;
  initialName?: string;
}

const CategoryForm = withFormik<CategoryFormProps, IFormValues>({
  mapPropsToValues: props => {
    return {
      name: props.initialName || ''
    }
  },
  validate: (values: IFormValues) => {
    const errors: FormikErrors<IFormValues> = {};

    if (!values.name) {
      errors.name = "Required";
    } else if (values.name.trim().length < 3) {
      errors.name = "Category name must contain at least 3 characters";
    }

    return errors;
  },
  handleSubmit: (values: IFormValues, { setSubmitting, props }) => {
    setSubmitting(false);
    props.dispatch(fetchAddCategories(values.name));
    props.handleClose();
  }
})(InnerForm);

export default CategoryForm;
