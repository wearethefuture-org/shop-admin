import React from 'react';
import Thumb from './Thumb';
import { Button, DialogActions, LinearProgress } from '@material-ui/core';
import { Field, Form, FormikProps } from 'formik';
import { TextField } from 'formik-material-ui';
import { makeStyles } from '@material-ui/core/styles';

import { IProductFormData, ProductFormProps } from '../../../interfaces/IProducts';


const InnerForm: React.FC<ProductFormProps & FormikProps<IProductFormData>> = (
  { submitForm, isSubmitting, handleClose, currencies, buttonName, file, ...props }) => {
  const useStyles = makeStyles({
    customBtn: {
      marginTop: "15px",
    },
  });

  const [values, setValue] = React.useState<Array<any>>([]);

  const uploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const countFiles = event.currentTarget.files!.length;
    const filesArray = [];
    for (let i = 0; i < countFiles; i++) {
      const file = event.currentTarget.files![i]
      props.values.file.push(file)
      filesArray.push(file)
    }
    setValue(filesArray);
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

      <div className="form-group">
        <label htmlFor="file">File upload</label>
        <input id="file" multiple name="file" type="file" onChange={uploadImage} className="form-control" />
        <Thumb files={values} />
      </div>

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
