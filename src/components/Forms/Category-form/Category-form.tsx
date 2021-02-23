import { withFormik } from 'formik';
import { Dispatch } from 'redux';
import * as Yup from 'yup';

import { fetchAddCategories } from '../../../store/actions/categories.actions';
import InnerForm from './Inner-form';
import { IFormValues } from '../../../interfaces/ICategory';

interface CategoryFormProps {
  dispatch: Dispatch;
  handleClose: () => void;
  initialName?: string;
  initialKeyLink?: string;
  initialDescription?: string;
}

const categoryValidationShema = Yup.object().shape({
  name: Yup.string().min(2, 'Minimum 2 symbols').max(50, 'Too long').required('Required'),
  key: Yup.string()
    .min(2, 'Minimum 2 symbols')
    .max(30, 'Too long')
    .matches(/(^[a-zA-Z-]+$)/, 'Please enter a valid string')
    .required('Required'),
  description: Yup.string().min(10, 'Minimum 10 symbols').max(360, 'Too long').required('Required'),
});

const CategoryForm = withFormik<CategoryFormProps, IFormValues>({
  mapPropsToValues: (props) => {
    return {
      name: props.initialName || '',
      key: props.initialKeyLink || '',
      description: props.initialDescription || '',
    };
  },
  validationSchema: categoryValidationShema,
  handleSubmit: (values: IFormValues, { setSubmitting, props }) => {
    setSubmitting(false);
    props.dispatch(fetchAddCategories(values.name, values.key, values.description));
    props.handleClose();
  },
})(InnerForm);

export default CategoryForm;
