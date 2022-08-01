import React from 'react';
import { useFormik } from 'formik';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import { api } from '../../../../api/api';
import * as Yup from 'yup';

import { AppDispatch } from '../../../../store/store';
import { ITreeCategory } from '../../../../interfaces/ITreeCategory';
import { updateTreeCategoryRequest } from '../../../../store/actions/treeCategories.actions';

import { Button, createStyles, makeStyles, TextField, ThemeOptions } from '@material-ui/core';
import { failSnackBar } from '../../../../store/actions/snackbar.actions';
import styles from './TreeCategoryEditModalForm.module.scss';
import { COLORS } from '../../../../values/colors';

interface FormDialogProps {
  category: ITreeCategory;
  closeModal: () => void;
}

const useStyles = makeStyles(
  (): ThemeOptions =>
    createStyles({
      saveButton: {
        'borderRadius': '30px',
        'color': COLORS.primaryLight,
        'backgroundColor': COLORS.primaryGreen,
        '&:hover': {
          backgroundColor: COLORS.secondaryGreen,
        },
      },
      closeButton: {
        'borderRadius': '30px',
        'color': COLORS.primaryLight,
        'backgroundColor': COLORS.primaryGray,
        '&:hover': {
          backgroundColor: COLORS.secondaryGray,
        },
      },
      input: {
        'width': '396px',
        'marginBottom': '10px',
        '& label.Mui-focused': {
          color: COLORS.frenchPlum,
        },
        '& .MuiInput-underline:after': {
          borderBottomColor: COLORS.frenchPlum,
        },
      },
    })
);

export const categoryValidation = async (dispatch: Dispatch, parentId?: number) => {
  if (parentId) {
    const { data: parentCategory } = await api.treeCategories.getById(parentId);

    if (parentCategory?.characteristicGroup?.length) {
      dispatch(
        failSnackBar(
          'Неможливо змінити надкатегорію. Надкатегорія містить характеристики, тому не може мати підкатегорії.'
        )
      );
      return false;
    }
  }

  return true;
};

const TreeCategoryEditModalForm: React.FC<FormDialogProps> = ({ category, closeModal }) => {
  const classes = useStyles();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Це поле не повинно бути пустим!'),
    key: Yup.string().required('Це поле не повинно бути пустим!'),
    description: Yup.string().required('Це поле не повинно бути пустим!'),
  });

  const dispatch: AppDispatch = useDispatch();
  const initialValues = {
    name: category?.name ? category.name : '',
    key: category?.key ? category.key : '',
    description: category?.description ? category.description : '',
    parent: category?.parent?.id ? category.parent.id : null,
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit: async (_values, { setSubmitting }) => {
      const validation = await categoryValidation(
        dispatch,
        _values.parent ? _values.parent : category?.parent?.id
      );

      if (!validation) {
        return false;
      }

      dispatch(
        updateTreeCategoryRequest({
          id: category?.id,
          name: _values.name ? _values.name : '',
          key: _values.key ? _values.key : '',
          description: _values.description ? _values.description : '',
          parentCategory: _values.parent ? _values.parent : null,
        })
      );
      setSubmitting(true);
      closeModal();
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      onClick={(e) => e.stopPropagation()}
      className={styles.formContainer}
    >
      <div className={styles.row}>
        <TextField
          className={styles.input + ' ' + classes.input}
          value={formik.values.name}
          type="text"
          name="name"
          label="Ім&#39;я категорії"
          id="name-field"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
      </div>
      <div className={styles.row}>
        <TextField
          className={styles.input + ' ' + classes.input}
          value={formik.values.key}
          type="text"
          name="key"
          id="key-field"
          label="Ключ"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.key && Boolean(formik.errors.key)}
          helperText={formik.touched.key && formik.errors.key}
        />
      </div>
      <div className={styles.row}>
        <TextField
          className={styles.input + ' ' + classes.input}
          value={formik.values.description}
          type="text"
          name="description"
          id="description-field"
          label="Опис"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.description && Boolean(formik.errors.description)}
          helperText={formik.touched.description && formik.errors.description}
        />
      </div>
      {category?.parent?.id ? (
        <div className={styles.row}>
          <TextField
            className={styles.input + ' ' + classes.input}
            value={formik.values.parent}
            type="number"
            name="parent"
            id="parent-field"
            label="ID надкатегорії"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.parent && Boolean(formik.errors.parent)}
            helperText={formik.touched.parent && formik.errors.parent}
          />
        </div>
      ) : null}
      <div className={styles.buttonsRow}>
        <Button
          className={styles.submit + ' ' + classes.saveButton}
          type="submit"
          disabled={formik.isSubmitting}
        >
          Зберегти
        </Button>
        <Button className={classes.closeButton} onClick={closeModal}>
          Закрити
        </Button>
      </div>
    </form>
  );
};

export default TreeCategoryEditModalForm;
