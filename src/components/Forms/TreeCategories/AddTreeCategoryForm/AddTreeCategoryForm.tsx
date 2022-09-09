import { withFormik } from 'formik';
import { Dispatch } from 'redux';

import { addTreeCategoryRequest } from '../../../../store/actions/treeCategories.actions';
import InnerForm from './InnerForm';
import { IAddTreeCategory } from '../../../../interfaces/ITreeCategory';
import { treeCategoryValidationShema } from '../../../../pages/TreeCategories/TreeCategoryInfo/treeCategoryValidationShema';

interface TreeCategoryFormProps {
  dispatch: Dispatch;
  parentId?: number;
  closeModal: () => void;
}

const AddTreeCategoryForm = withFormik<TreeCategoryFormProps, IAddTreeCategory>({
  validationSchema: treeCategoryValidationShema,
  handleSubmit: (values: IAddTreeCategory, { setSubmitting, props }) => {
    setSubmitting(false);

    const { closeModal, parentId, dispatch } = props;
    const { name, key, description, icon } = values;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('key', key);
    formData.append('description', description);
    formData.append('parent', parentId);
    formData.append('icon', icon);

    dispatch(addTreeCategoryRequest(formData));
    closeModal();
  },
})(InnerForm);

export default AddTreeCategoryForm;
