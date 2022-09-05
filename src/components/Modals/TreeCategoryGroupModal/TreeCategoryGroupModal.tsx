import React, { Dispatch, SetStateAction } from 'react';
import { Field, Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';

import { Button, createStyles, Dialog, makeStyles, ThemeOptions } from '@material-ui/core';
import TextFieldWrapped from '../../../hocs/TextFieldHOC';
import {
  TreeCategoryToDispalayAction,
  TreeCategoryToDisplayActionTypes,
  GroupToDisplay,
} from '../../../pages/TreeCategories/TreeCategoryInfo/treeCategoryToDisplayReducer';
import {
  TreeCategoryAction,
  TreeCategoryActionTypes,
} from '../../../pages/TreeCategories/TreeCategoryInfo/treeCategoryReducer';
import styles from './TreeCategoryGroupModal.module.scss';
import classNames from 'classnames';
import { COLORS } from '../../../values/colors';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

interface IModalProps {
  openGroupModal: boolean;
  setOpenGroupModal: (b: boolean) => void;
  treeCategoryDispatch: Dispatch<TreeCategoryAction>;
  treeCategoryDisplayDispatch: Dispatch<TreeCategoryToDispalayAction>;
  charGroup: GroupToDisplay[];
  groupToEdit: GroupToDisplay | null;
  setGroupToEdit: Dispatch<SetStateAction<GroupToDisplay | null>>;
}

interface IGroupValues {
  groupName: string;
}

const useStyles = makeStyles(
  (): ThemeOptions =>
    createStyles({
      btn: {
        borderRadius: '30px',
        color: COLORS.primaryLight,
      },
      btnSubmitLight: {
        'backgroundColor': COLORS.primaryGreen,
        '&:hover': {
          backgroundColor: COLORS.secondaryGreen,
        },
      },
      btnSubmitDark: {
        'backgroundColor': COLORS.darkGreen,
        '&:hover': {
          backgroundColor: COLORS.secondaryDarkGreen,
        },
      },
    })
);

const TreeCategoryGroupModal: React.FC<IModalProps> = ({
  openGroupModal,
  setOpenGroupModal,
  treeCategoryDispatch,
  treeCategoryDisplayDispatch,
  charGroup,
  groupToEdit,
  setGroupToEdit,
}) => {
  const classes = useStyles();

  const { darkMode } = useSelector((state: RootState) => state.theme);

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
          .filter((group) => group.name?.toLowerCase().trim() !== groupToEdit.name?.toLowerCase().trim())
          .find((group) => group.name?.toLowerCase().trim() === groupName?.toLowerCase().trim());

        if (existingGroup) {
          formik.setFieldError('groupName', 'Група з такою назвою вже існує');
          formik.setSubmitting(false);
          return;
        }

        treeCategoryDispatch({
          type: TreeCategoryActionTypes.editGroup,
          prevGroup: groupToEdit,
          editedGroup: {
            id: groupToEdit.id && groupToEdit.id,
            name: groupName,
          },
        });
        treeCategoryDisplayDispatch({
          type: TreeCategoryToDisplayActionTypes.editGroup,
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

        treeCategoryDispatch({
          type: TreeCategoryActionTypes.addGroup,
          groupName,
        });
        treeCategoryDisplayDispatch({
          type: TreeCategoryToDisplayActionTypes.addGroup,
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
            <Field fullWidth component={TextFieldWrapped} label="Група *" name="groupName" makegreen="true" />

            <Button
              className={classNames(classes.btn, darkMode ? classes.btnSubmitDark : classes.btnSubmitLight)}
              variant="contained"
              type="submit"
            >
              Зберегти
            </Button>
          </Form>
        </FormikProvider>
      </div>
    </Dialog>
  );
};

export default TreeCategoryGroupModal;
