import React from 'react';
import { Field, Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Dialog } from '@material-ui/core';

import TextFieldWrapped from '../../../hocs/TextFieldHOC';
import { IGroup } from '../../../interfaces/ICategory';
import styles from './CategoryGroupModal.module.scss';

interface IModalProps {
  openGroupModal: boolean;
  setOpenGroupModal: (b: boolean) => void;
  editGroup: boolean;
  setEditGroup: (b: boolean) => void;
  groupToEdit: IGroup | null;
  handleAddGroup: (g: string) => void;
  handleEditGroup: (g: IGroup) => void;
  charGroup: IGroup[];
}

interface IGroupValues {
  group: string;
}

const CategoryGroupModal: React.FC<IModalProps> = ({
  openGroupModal,
  setOpenGroupModal,
  editGroup,
  setEditGroup,
  groupToEdit,
  handleAddGroup,
  handleEditGroup,
  charGroup,
}) => {
  const formik = useFormik({
    initialValues: {
      group: (groupToEdit && groupToEdit.name) || '',
    },

    validationSchema: Yup.object().shape({
      group: Yup.string()
        .trim()
        .min(2, 'Мінімальна довжина 2 символа')
        .max(50, 'Максимальна довжина 50 символів')
        .required('Обов`язкове поле'),
    }),

    onSubmit: ({ group }: IGroupValues): void => {
      if (charGroup.find((g) => g.name === group)) {
        formik.setFieldError('group', 'Група з такою назвою вже існує');
        formik.setSubmitting(false);
      } else {
        !editGroup && !groupToEdit
          ? handleAddGroup(group)
          : handleEditGroup({ ...groupToEdit, name: group });

        editGroup && setEditGroup(false);
        setOpenGroupModal(false);
      }
    },
  });

  return (
    <Dialog open={openGroupModal} onClose={() => setOpenGroupModal(false)}>
      <div className={styles['modal-container']}>
        <h5>{editGroup ? 'Редагувати ' : 'Додати '}групу</h5>
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
