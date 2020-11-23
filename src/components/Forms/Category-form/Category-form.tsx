import { withFormik } from 'formik';
import { Dispatch } from 'redux';
import * as Yup from 'yup';

import { fetchAddCategories } from '../../../store/actions';
import InnerForm from './Inner-form';
import { IFormValues } from '../../../interfaces/category-form';


interface CategoryFormProps {
  dispatch: Dispatch;
  handleClose: () => void;
  initialName?: string;
  initialDescription?: string;
}

const categoryValidationShema = Yup.object().shape({
  name: Yup.string().min(2, 'Too short').max(50, 'Too long').required('Required'),
  description: Yup.string().min(60, 'Too shot').max(360, 'Too long').required('Required')
})

const CategoryForm = withFormik<CategoryFormProps, IFormValues>({
  mapPropsToValues: props => {
    return {
      name: props.initialName || "",
      description: props.initialDescription || "",
    };
  },
  validationSchema: categoryValidationShema,
  handleSubmit: (values: IFormValues, { setSubmitting, props }) => {
    setSubmitting(false);
    props.dispatch(fetchAddCategories(values.name, values.description));
    props.handleClose();
  }
})(InnerForm);

export default CategoryForm;
