import React, { Dispatch, SetStateAction } from 'react';
import { Field, Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Dialog } from '@material-ui/core';

import TextFieldWrapped from '../../../hocs/TextFieldHOC';
import {
  CategoryToDispalayAction,
  CategoryToDisplayActionTypes,
  GroupToDisplay,
} from '../../../pages/Categories/CategoryInfo/categoryToDisplayReducer';
import {
  CategoryAction,
  CategoryActionTypes,
} from '../../../pages/Categories/CategoryInfo/categoryReducer';
import styles from './CategoryGroupModal.module.scss';

interface IModalProps {
  openGroupModal: boolean;
  setOpenGroupModal: (b: boolean) => void;
  categoryDispatch: Dispatch<CategoryAction>;
  categoryDisplayDispatch: Dispatch<CategoryToDispalayAction>;
  charGroup: GroupToDisplay[];
  groupToEdit: GroupToDisplay | null;
  setGroupToEdit: Dispatch<SetStateAction<GroupToDisplay | null>>;
}

interface IGroupValues {
  groupName: string;
}

const CategoryGroupModal: React.FC<IModalProps> = ({
  openGroupModal,
  setOpenGroupModal,
  categoryDispatch,
  categoryDisplayDispatch,
  charGroup,
  groupToEdit,
  setGroupToEdit,
}) => {
  const formik = useFormik({
    initialValues: {
      groupName: (groupToEdit && groupToEdit.name) || '',
    },

    validationSchema: Yup.object().shape({
      groupName: Yup.string()
        .trim()
        .min(2, 'Мінімальна довжина 2 символа')
        .max(50, 'Максимальна довжина 50 символів')
        .required('Обов`язкове поле'),
    }),

    onSubmit: ({ groupName }: IGroupValues): void => {
      if (groupToEdit && groupToEdit.name) {
        const existingGroup = charGroup
          .filter(
            (group) => group.name?.toLowerCase().trim() !== groupToEdit.name?.toLowerCase().trim()
          )
          .find((group) => group.name?.toLowerCase().trim() === groupName?.toLowerCase().trim());

        if (existingGroup) {
          formik.setFieldError('groupName', 'Група з такою назвою вже існує');
          formik.setSubmitting(false);
          return;
        }

        categoryDispatch({
          type: CategoryActionTypes.editGroup,
          prevGroup: groupToEdit,
          editedGroup: {
            id: groupToEdit.id && groupToEdit.id,
            name: groupName,
          },
        });
        categoryDisplayDispatch({
          type: CategoryToDisplayActionTypes.editGroup,
          prevGroupName: groupToEdit.name,
          editedGroup: { ...groupToEdit, name: groupName },
        });
      } else {
        const existingGroup = charGroup.find(
          (group) => group.name?.toLowerCase().trim() === groupName?.toLowerCase().trim()
        );

        if (existingGroup) {
          formik.setFieldError('groupName', 'Група з такою назвою вже існує');
          formik.setSubmitting(false);
          return;
        }

        categoryDispatch({
          type: CategoryActionTypes.addGroup,
          groupName,
        });
        categoryDisplayDispatch({
          type: CategoryToDisplayActionTypes.addGroup,
          groupName,
        });
      }

      groupToEdit && setGroupToEdit(null);
      setOpenGroupModal(false);
    },
  });

  return (
    <Dialog open={openGroupModal} onClose={() => setOpenGroupModal(false)}>
      <div className={styles['modal-container']}>
        <h5>{groupToEdit ? 'Редагувати ' : 'Додати '}групу</h5>
        <FormikProvider value={formik}>
          <Form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
            <Field
              fullWidth
              component={TextFieldWrapped}
              label="Група *"
              name="groupName"
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
