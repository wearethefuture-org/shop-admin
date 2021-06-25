import React, { useState } from 'react'
import { Button, DialogActions, LinearProgress, CircularProgress } from '@material-ui/core';
import { Field, Form, FormikProps } from 'formik';
import { TextField } from 'formik-material-ui';
import { makeStyles } from '@material-ui/core/styles';
import { ISlideFormValues, InnerSlideFormProps } from '../../../interfaces/ISlides';
import FileUpload from "./FileUpload";
import clientUrl from '../../../api/config';

const useStyles = makeStyles({
  customBtn: {
    marginTop: "15px",
  },
  linkField: {
    display: "flex",
    flexDirection: "row"
  },
  progress: {
    color: "green"
  }
});

const InnerForm: React.FC<InnerSlideFormProps & FormikProps<ISlideFormValues>> = (
  {submitForm, isSubmitting, handleChange, handleClose, values, ...props}) => {

  const classes = useStyles();
  const [isValidate, setValidate] = useState(false);
  const [fieldStatus, setFieldStatus] = useState(false);
  const [slideLink, setSlideLink] = useState(values.href);


  const validateSliderLink = (e: any) => {
    let currentLink: any = e.target.value;
    setValidate(true);
    const timeout = setTimeout(() => {
      if(currentLink.trim() != '') {
        if(currentLink.includes(clientUrl) && !currentLink.includes('http')) {
          currentLink = new URL('http://' + currentLink).pathname
        }
        else if(currentLink.includes(clientUrl) && currentLink.includes('http://')) {
          currentLink = new URL(currentLink).pathname
        }
      }
      values.href = currentLink.toString();
      setValidate(false);
      setFieldStatus(false);
    }, 500)
  }

  const dragOverHandler = (event: React.DragEvent<HTMLFormElement>) => {
    event.preventDefault();
  }
  


  const dropHandler = (event: React.DragEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (event.dataTransfer.items) {
      for (let i = 0; i < event.dataTransfer.items.length; i++) {
        if (event.dataTransfer.items[i].kind === 'file') {
          let file = event.dataTransfer.items[i].getAsFile();
          props.setFieldValue("image", file)
        }
      }
    }
  }

  return (
    <Form
      onDrop={dropHandler}
      onDragOver={dragOverHandler}
    >
      <Field
        fullWidth
        component={TextField}
        type="name"
        label="Name"
        name="name"
      />
      <Field
        fullWidth
        multiline
        component={TextField}
        type="text"
        label="Text"
        name="text"
      />
      <Field
        fullWidth
        multiline
        component={FileUpload}
        type="file"
        label="Image"
        name="image"
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
          onKeyUp={() => setFieldStatus(true)}
          onBlur={(e) => {
            validateSliderLink(e)
          }}
        />
        { isValidate && <span><CircularProgress size={30} className={classes.progress} /></span> }
      </div>
      <Field
        fullWidth
        multiline
        component={TextField}
        type="priority"
        label="Priority"
        name="priority"
      />
      {isSubmitting && <LinearProgress/>}
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
          disabled={isSubmitting || isValidate || fieldStatus}
          onClick={submitForm}
        >
          Save
        </Button>
      </DialogActions>
    </Form>
  );
}
export default InnerForm;
