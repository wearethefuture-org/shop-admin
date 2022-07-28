import React, { useState } from 'react';
import { Button, DialogActions, LinearProgress } from '@material-ui/core';
import { ErrorMessage, Field, Form, FormikProps } from 'formik';
import { TextField } from 'formik-material-ui';
import { makeStyles } from '@material-ui/core/styles';
import { ISlideFormValues, InnerSlideFormProps } from '../../../interfaces/ISlides';
import FileUpload from './FileUpload';

const useStyles = makeStyles({
  customBtn: {
    marginTop: '15px',
  },
  linkField: {
    display: 'flex',
    flexDirection: 'row',
  },
  progress: {
    color: 'green',
  },
  errorMy: {
    color: 'red'
  }
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
      <Field fullWidth component={TextField} type="name" label="Назва" name="name" />
      <Field fullWidth multiline component={TextField} type="text" label="Опис" name="text" />
      <Field
        fullWidth
        multiline
        component={FileUpload}
        type="file"
        label="Image"
        name="image"
        caption="Картинка для комп'ютера. Дозволені формати: jpg, png, gif. Максимальний розмір: 9 МБ. Оптимальне співвідношення сторін: 3,5 (наприклад, 1920x548 тощо)"
        fieldId="file"
      />
      <ErrorMessage name='image' component="div" className={classes.errorMy} />
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
      <ErrorMessage name='imageMobile' component="div" className={classes.errorMy} />
      <div className={classes.linkField}>
        <Field
          fullWidth
          multiline
          component={TextField}
          type="href"
          label="Посилання"
          name="href"
          value={values.href}
        />
      </div>
      <Field
        fullWidth
        multiline
        component={TextField}
        type="priority"
        label="Пріоритет"
        name="priority"
      />
      {isSubmitting && <LinearProgress />}
      <DialogActions>
        <Button
          onClick={handleClose}
          color="primary"
          variant="contained"
          className={classes.customBtn}
        >
          Скасувати
        </Button>
        <Button
          className={classes.customBtn}
          variant="contained"
          color="secondary"
          disabled={isSubmitting}
          onClick={submitForm}
        >
          Зберегти
        </Button>
      </DialogActions>
    </Form>
  );
};
export default InnerForm;

