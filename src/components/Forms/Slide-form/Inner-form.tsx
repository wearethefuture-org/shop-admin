import React from 'react';
import { Button, DialogActions, LinearProgress } from '@material-ui/core';
import { Field, Form, FormikProps } from 'formik';
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
      <Field fullWidth component={TextField} type="name" label="Name" name="name" />
      <Field fullWidth multiline component={TextField} type="text" label="Text" name="text" />
      <Field
        fullWidth
        multiline
        component={FileUpload}
        type="file"
        label="Image"
        name="image"
        caption="An image for desktop. Allowed formats: jpg, png, gif. Max size: 9 MB. Optimal aspect ratio: 3.5 (e.g., 1920x548 etc.)"
        fieldId="file"
      />
      <Field
        fullWidth
        multiline
        component={FileUpload}
        type="file"
        label="ImageMobile"
        name="imageMobile"
        caption="An image for mobile. Allowed formats: jpg, png, gif. Max size: 1 MB. Optimal aspect ratio: 3.5 (e.g., 382x109 or 330x94  etc.)"
        fieldId="fileMobile"
      />
      <div className={classes.linkField}>
        <Field
          fullWidth
          multiline
          component={TextField}
          type="href"
          label="Href"
          name="href"
          value={values.href}
        />
      </div>
      <Field
        fullWidth
        multiline
        component={TextField}
        type="priority"
        label="Priority"
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
          Cancel
        </Button>
        <Button
          className={classes.customBtn}
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
