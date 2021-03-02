import React from 'react';
import { useDispatch } from 'react-redux';
import { Field, Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Dialog } from '@material-ui/core';

import TextFieldWrapped from '../../../hocs/TextFieldHOC';
import { updateCategoryRequest } from '../../../store/actions/categories.actions';
import { ICategoryResponse, IGroupResponse } from '../../../interfaces/ICategory';
import { AppDispatch } from '../../../store/store';
import styles from './CategoryGroupModal.module.scss';

interface IModalProps {
  openGroupModal: boolean;
  setOpenGroupModal: (b: boolean) => void;
  category: ICategoryResponse;
  editGroupName: boolean;
  setEditGroupName: (b: boolean) => void;
  groupNameEditId: number;
}

interface IGroupValues {
  group: string;
}

const CategoryGroupModal: React.FC<IModalProps> = ({
  openGroupModal,
  setOpenGroupModal,
  category,
  editGroupName,
  setEditGroupName,
  groupNameEditId,
}) => {
  const dispatch: AppDispatch = useDispatch();

  const group: IGroupResponse | undefined =
    editGroupName && groupNameEditId
      ? category.characteristicGroup.find((group) => group.id === groupNameEditId)
      : undefined;

  const formik = useFormik({
    initialValues: {
      group: (group && group.name) || '',
    },

    validationSchema: Yup.object().shape({
      group: Yup.string()
        .trim()
        .min(2, 'Мінімальна довжина 2 символа')
        .max(50, 'Максимальна довжина 50 символів')
        .required('Обов`язкове поле'),
    }),

    onSubmit: (values: IGroupValues): void => {
      editGroupName
        ? group &&
          dispatch(
            updateCategoryRequest({
              id: category.id,
              characteristicGroups: [
                {
                  id: group.id,
                  name: values.group,
                  characteristics: [],
                },
              ],
            })
          )
        : dispatch(
            updateCategoryRequest({
              id: category.id,
              characteristicGroups: [
                {
                  name: values.group,
                  characteristics: [],
                },
              ],
            })
          );

      editGroupName && setEditGroupName(false);
      setOpenGroupModal(false);
    },
  });

  return (
    <Dialog open={openGroupModal} onClose={() => setOpenGroupModal(false)}>
      <div className={styles['modal-container']}>
        <h5>{editGroupName ? 'Редагувати ' : 'Додати '}групу</h5>
        <FormikProvider value={formik}>
          <Form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
            <Field
              fullWidth
              component={TextFieldWrapped}
              label="Група *"
              name="group"
              makegreen="true"
            />

            <Button variant="contained" color="primary" type="submit">
              Зберегти
            </Button>
          </Form>
        </FormikProvider>
      </div>
    </Dialog>
  );
};

export default CategoryGroupModal;
