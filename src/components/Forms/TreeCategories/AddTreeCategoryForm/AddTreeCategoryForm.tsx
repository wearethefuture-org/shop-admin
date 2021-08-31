import { withFormik } from 'formik';
import { Dispatch } from 'redux';
import { AppDispatch } from '../../../../store/store';

import { addTreeCategory } from '../../../../store/actions/treeCategories.actions';
import InnerForm from './InnerForm';
import { IAddTreeCategory } from '../../../../interfaces/ITreeCategory';
import { treeCategoryValidationShema } from '../../../../pages/TreeCategories/TreeCategoryInfo/treeCategoryValidationShema';

interface TreeCategoryFormProps {
  dispatch: Dispatch;
  parentId: number;
  closeModal: () => void;
}

const AddTreeCategoryForm = withFormik<TreeCategoryFormProps, IAddTreeCategory>({
  validationSchema: treeCategoryValidationShema,
  handleSubmit: (values: IAddTreeCategory, { setSubmitting, props }) => {
    setSubmitting(false);

    const { closeModal, parentId, dispatch } = props;
    const { name, key, description } = values;

    dispatch(addTreeCategory({ name, key, description, parentId }));
    closeModal();
  },
})(InnerForm);

export default AddTreeCategoryForm;
