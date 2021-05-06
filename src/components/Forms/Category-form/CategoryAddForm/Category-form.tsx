import { withFormik } from 'formik';
import { Dispatch } from 'redux';

import { fetchAddCategories } from '../../../../store/actions/categories.actions';
import InnerForm from './Inner-form';
import { IAddCategory } from '../../../../interfaces/ICategory';
import { categoryValidationShema } from '../../../../pages/Categories/CategoryInfo/categoryValidationShema';

interface CategoryFormProps {
  dispatch: Dispatch;
  handleClose: () => void;
  initialName?: string;
  initialKeyLink?: string;
  initialDescription?: string;
  initialMainCategory?: string;
}

const CategoryForm = withFormik<CategoryFormProps, IAddCategory>({
  mapPropsToValues: (props) => {
    return {
      name: props.initialName || '',
      key: props.initialKeyLink || '',
      description: props.initialDescription || '',
      mainCategory: props.initialMainCategory || '',
    };
  },
  validationSchema: categoryValidationShema,
  handleSubmit: (values: IAddCategory, { setSubmitting, props }) => {
    setSubmitting(false);

    const { name, key, description, mainCategory } = values;
    props.dispatch(fetchAddCategories({ name, key, description, mainCategory }));
    props.handleClose();
  },
})(InnerForm);

export default CategoryForm;
