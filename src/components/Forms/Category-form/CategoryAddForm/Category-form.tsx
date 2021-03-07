import { withFormik } from 'formik';
import { Dispatch } from 'redux';
import * as Yup from 'yup';

import { fetchAddCategories } from '../../../../store/actions/categories.actions';
import InnerForm from './Inner-form';
import { IAddCategory } from '../../../../interfaces/ICategory';

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

const CategoryForm = withFormik<CategoryFormProps, IAddCategory>({
  mapPropsToValues: (props) => {
    return {
      name: props.initialName || '',
      key: props.initialKeyLink || '',
      description: props.initialDescription || '',
    };
  },
  validationSchema: categoryValidationShema,
  handleSubmit: (values: IAddCategory, { setSubmitting, props }) => {
    setSubmitting(false);

    const { name, key, description } = values;
    props.dispatch(fetchAddCategories({ name, key, description }));
    props.handleClose();
  },
})(InnerForm);

export default CategoryForm;
