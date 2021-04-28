import { withFormik } from 'formik';
import { Dispatch } from 'redux';

import { fetchAddMainCategories } from '../../../../store/actions/mainCategories.actions';
import InnerForm from './Inner-form';
import { IAddMainCategory } from '../../../../interfaces/IMainCategory';
import { mainCategoryValidationShema } from '../../../../pages/MainCategories/MainCategoryInfo/mainCategoryValidationShema';

interface MainCategoryFormProps {
  dispatch: Dispatch;
  handleClose: () => void;
  initialName?: string;
  initialKeyLink?: string;
  initialDescription?: string;
  initialCategory?: any;
}

const MainCategoryForm = withFormik<MainCategoryFormProps, IAddMainCategory>({
  mapPropsToValues: (props) => {
    return {
      name: props.initialName || '',
      key: props.initialKeyLink || '',
      description: props.initialDescription || '',
      category: props.initialCategory || '',
    };
  },
  validationSchema: mainCategoryValidationShema,
  handleSubmit: (values: IAddMainCategory, { setSubmitting, props }) => {
    setSubmitting(false);

    const { name, key, description, } = values;
    props.dispatch(fetchAddMainCategories({ name, key, description,  }));
    props.handleClose();
  },
})(InnerForm);

export default MainCategoryForm;
