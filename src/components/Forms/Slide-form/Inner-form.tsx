import React, { useState } from 'react'
import { Button, DialogActions, LinearProgress, CircularProgress } from '@material-ui/core';
import { Field, Form, FormikProps } from 'formik';
import { TextField } from 'formik-material-ui';
import { makeStyles } from '@material-ui/core/styles';
import { ISlideFormValues, InnerSlideFormProps } from '../../../interfaces/ISlides';
import FileUpload from "./FileUpload";

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
  {submitForm, isSubmitting, handleClose, values, ...props}) => {

  const classes = useStyles();
  const [sliderLink, setSliderLink] = useState(values.href);
  const [loading, setLoading] = useState(false);

  const dragOverHandler = (event: React.DragEvent<HTMLFormElement>) => {
    event.preventDefault();
  }
  React.useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      const defaultLink = 'shop.waf.com.ua'
      let currentLink: any = sliderLink;
      if(currentLink.trim() != '') {
        switch(true) {
          case currentLink[0] === '/':
            values.href = currentLink
            break;

          case !currentLink.includes('http'):
            currentLink = 'http://' + currentLink;
            values.href = currentLink;
            break;

          case currentLink.includes(defaultLink):
            values.href = new URL(currentLink).pathname
            break;

          default:
            values.href = currentLink
        }

      }
      setLoading(false);
    }, 2000)

    return () => clearTimeout(timeout)
  }, [sliderLink])


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
          onKeyUp={() => { setSliderLink(values.href) }}
        />
        { loading && <span><CircularProgress size={30} className={classes.progress} /></span> }
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
          disabled={isSubmitting || loading}
          onClick={submitForm}
        >
          Save
        </Button>
      </DialogActions>
    </Form>
  );
}
export default InnerForm;
