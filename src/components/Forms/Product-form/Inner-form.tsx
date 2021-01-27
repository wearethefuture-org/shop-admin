import React from 'react'
import { Button, DialogActions, LinearProgress } from '@material-ui/core';
import { Field, Form, FormikProps } from 'formik';
import { TextField } from 'formik-material-ui';
import { makeStyles } from '@material-ui/core/styles';

import { IProductFormData, ProductFormProps } from '../../../interfaces/IProducts';


const InnerForm: React.FC<ProductFormProps & FormikProps<IProductFormData>> = (
  { submitForm, isSubmitting, handleClose, currencies, buttonName, id, categoryName }) => {
  const useStyles = makeStyles({
    customBtn: {
      marginTop: "15px",
    },
  });
  const uploadScreenshotFile = (event: any) => {
    for (let size = 0; size < event.target.files.length; size++) {
      console.log('Selected file:', event.target.files[size]);
      let file = event.target.files[size];
      console.log("uploading screenshot file...");

      // Do necessary request to upload here.......

    }
  }
  const classes = useStyles();
  return (
    <Form>
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
        type="number"
        label="Price"
        name="price"
      />
      <Field
        fullWidth
        multiline
        rowsMax={6}
        component={TextField}
        type="description"
        label="Description"
        name="description"
      />
      <Field
        select
        fullWidth
        component={TextField}
        type="select"
        label="Category Name"
        name="categoryName"
        SelectProps={{
          native: true,
        }}>
        {currencies.map((option: any) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Field>
      <input type="file" multiple
        name="myImage" accept=".png, .jpeg" className="multiple-upload"
        onChange={uploadScreenshotFile} />

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
          color="primary"
          disabled={isSubmitting}
          onClick={submitForm}
        >
          {buttonName}
        </Button>
      </DialogActions>
    </Form>
  );
}

export default InnerForm;
