import React, { Dispatch, SetStateAction } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog, DialogContent, DialogTitle, Button } from '@material-ui/core';

import { IAddCategory, ICategoryResponse } from '../../../interfaces/ICategory';
import { fetchAddCategories } from '../../../store/actions/categories.actions';
import { AppDispatch, RootState } from '../../../store/store';
import { Field, Form, FormikProvider, useFormik } from 'formik';
import { categoryValidationShema } from '../../../pages/Categories/CategoryInfo/categoryValidationShema';
import TextFieldWrapped from '../../../hocs/TextFieldHOC';
import styles from './AddCategoryModal.module.scss';

interface FormDialogProps {
  openAddModal: boolean;
  setOpenAddModal: Dispatch<SetStateAction<boolean>>;
}

const AddCategoryModal: React.FC<FormDialogProps> = ({ openAddModal, setOpenAddModal }) => {
  const dispatch: AppDispatch = useDispatch();

  const categoryList: ICategoryResponse[] = useSelector(
    (state: RootState) => state.categories.list
  );

  const initialValues: IAddCategory = {
    name: '',
    description: '',
    key: '',
    mainCategory: ''
  };

  const formik = useFormik({
    initialValues,
    validationSchema: categoryValidationShema,
    enableReinitialize: true,
    onSubmit: (values): void => {
      const { name, key, description, mainCategory } = values;

      const existingName =
        categoryList.length &&
        categoryList.find((cat) => cat.name.toLowerCase() === name.trim().toLowerCase());

      const existingKey =
        categoryList.length &&
        categoryList.find((cat) => cat.key.toLowerCase() === key.trim().toLowerCase());

      if (existingName) {
        formik.setFieldError('name', 'Така категорія вже існує');
        formik.setSubmitting(false);
        return;
      }

      if (existingKey) {
        formik.setFieldError('key', 'Такий URL-ключ вже існує');
        formik.setSubmitting(false);
        return;
      }

      dispatch(fetchAddCategories({ name, key, description, mainCategory }));
      formik.setSubmitting(false);
      setOpenAddModal(false);
    },
  });

  return (
    <Dialog
      open={openAddModal}
      onClose={() => setOpenAddModal(false)}
      aria-labelledby="form-dialog-title"
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle id="form-dialog-title">Нова категорія</DialogTitle>
      <DialogContent>
        <FormikProvider value={formik}>
          <Form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
            <Field
              fullWidth
              component={TextFieldWrapped}
              className={styles['form-field']}
              label="Назва *"
              name="name"
              makegreen="true"
            />
            <Field
              fullWidth
              component={TextFieldWrapped}
              className={styles['form-field']}
              label="URL ключ *"
              name="key"
              placeholder="url-example"
              makegreen="true"
            />
            <Field
              fullWidth
              multiline
              rowsMax={6}
              component={TextFieldWrapped}
              className={styles['form-field']}
              label="Опис *"
              name="description"
              makegreen="true"
            />

            <div className={styles['form-btn-wrapper']}>
              <Button
                onClick={() => setOpenAddModal(false)}
                color="secondary"
                variant="contained"
                type="button"
              >
                Закрити
              </Button>
              <Button
                variant="contained"
                color="primary"
                disabled={formik.isSubmitting || !(formik.dirty && formik.isValid)}
                type="submit"
              >
                Створити
              </Button>
            </div>
          </Form>
        </FormikProvider>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategoryModal;
