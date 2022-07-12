import React from 'react';
import { Button, DialogActions, LinearProgress } from '@material-ui/core';
import { ErrorMessage, Field, Form, FormikProps } from 'formik';
import { TextField } from 'formik-material-ui';
import { makeStyles } from '@material-ui/core/styles';
import { ISlideFormValues, InnerSlideFormProps } from '../../../interfaces/ISlides';
import FileUpload from './FileUpload';
import { COLORS } from '../../../values/colors';
import TextFieldWrapped from '../../../hocs/TextFieldHOC';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

const useStyles = makeStyles({
  linkField: {
    display: 'flex',
    flexDirection: 'row',
  },
  progress: {
    color: COLORS.secondaryGray,
  },
  input: {
    marginBottom: '20px',
  },
  errorMy: {
    color: 'red',
  },
  saveBtn: {
    'marginTop': '15px',
    'backgroundColor': COLORS.primaryGreen,
    'borderRadius': '30px',
    'color': COLORS.primaryLight,
    '&:hover': {
      backgroundColor: COLORS.secondaryGreen,
    },
  },
  saveBtnDark: {
    'marginTop': '15px',
    'backgroundColor': COLORS.darkGreen,
    'borderRadius': '30px',
    'color': COLORS.primaryLight,
    '&:hover': {
      backgroundColor: COLORS.secondaryDarkGreen,
    },
  },
  cancelBtn: {
    'marginTop': '15px',
    'backgroundColor': COLORS.primaryGray,
    'borderRadius': '30px',
    'color': COLORS.primaryLight,
    '&:hover': {
      backgroundColor: COLORS.secondaryGray,
    },
  },
  cancelBtnDark: {
    'marginTop': '15px',
    'backgroundColor': COLORS.darkGray,
    'borderRadius': '30px',
    'color': COLORS.primaryLight,
    '&:hover': {
      backgroundColor: COLORS.secondaryDarkGray,
    },
  },
});

const InnerForm: React.FC<InnerSlideFormProps & FormikProps<ISlideFormValues>> = ({
  submitForm,
  isSubmitting,
  handleChange,
  handleClose,
  values,
  ...props
}) => {
  const classes = useStyles();
  const { darkMode } = useSelector((state: RootState) => state.theme);

  const dragOverHandler = (event: React.DragEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const dropHandler = (event: React.DragEvent<HTMLElement>) => {
    event.preventDefault();
    if (event.dataTransfer.items) {
      // todo SnackBar (redux dispatch action) if 2+ files
      let file = event.dataTransfer.items[0].getAsFile();
      const domNode = event.target as HTMLElement;
      const labelElement = domNode.closest('label') as HTMLElement;
      const inputElement = labelElement.querySelector('input') as HTMLInputElement;
      if (inputElement != null) {
        props.setFieldValue(inputElement.name, file);
      }
    }
  };

  return (
    <Form onDrop={dropHandler} onDragOver={dragOverHandler}>
      <Field
        className={classes.input}
        fullWidth
        component={TextField}
        type="name"
        label="Назва"
        name="name"
      />
      <Field
        className={classes.input}
        fullWidth
        multiline
        component={TextField}
        type="text"
        label="Опис"
        name="text"
      />
      <Field
        fullWidth
        multiline
        component={FileUpload}
        type="file"
        label="Image"
        name="image"
        caption="Картинка для компютера. Дозволені формати: jpg, png, gif. Максимальний розмір: 9 МБ. Оптимальне співвідношення сторін: 3,5 (наприклад, 1920x548 тощо)"
        fieldId="file"
      />
      <ErrorMessage name="image" component="div" className={classes.errorMy} />
      <Field
        fullWidth
        multiline
        component={FileUpload}
        type="file"
        label="ImageMobile"
        name="imageMobile"
        caption="Картинка для мобільного. Дозволені формати: jpg, png, gif. Максимальний розмір: 1 Мб. Оптимальне співвідношення сторін: 3,5 (наприклад, 382x109 або 330x94 тощо)."
        fieldId="fileMobile"
      />
      <ErrorMessage name="imageMobile" component="div" className={classes.errorMy} />
      <div className={classes.linkField}>
        <Field
          fullWidth
          multiline
          component={TextFieldWrapped}
          type="href"
          label="Посилання"
          name="href"
          value={values.href}
          makegreen={true}
          className={classes.input}
        />
      </div>
      <Field
        fullWidth
        multiline
        component={TextFieldWrapped}
        type="priority"
        label="Пріоритет"
        name="priority"
        makegreen={true}
        className={classes.input}
      />
      {isSubmitting && <LinearProgress />}
      <DialogActions>
        <Button
          onClick={handleClose}
          color="primary"
          variant="contained"
          className={darkMode ? classes.cancelBtnDark : classes.cancelBtn}
        >
          Cancel
        </Button>
        <Button
          className={darkMode ? classes.saveBtnDark : classes.saveBtn}
          variant="contained"
          color="secondary"
          disabled={isSubmitting}
          onClick={submitForm}
        >
          Save
        </Button>
      </DialogActions>
    </Form>
  );
};
export default InnerForm;
