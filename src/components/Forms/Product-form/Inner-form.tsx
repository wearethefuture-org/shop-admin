import React from 'react';
import { Button, DialogActions, LinearProgress, Grid } from '@material-ui/core';
import { Field, Form, FormikProps } from 'formik';
import { TextField } from 'formik-material-ui';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { IProductFormData, ProductFormProps } from '../../../interfaces/IProducts';
import ProductAddImagesModal from '../../Modals/Product-add-images-modal';
import ProductAddMainImagesModal from '../../Modals/Product-add-main-img';



const InnerForm: React.FC<ProductFormProps & FormikProps<IProductFormData>> = (
  { submitForm, handleChange, isSubmitting, handleClose, currencies, buttonName, files, mainImg, ...props }) => {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        maxWidth: 345,
      },
      media: {
        height: 140,
      },
      customBtn: {
        marginTop: "15px",
      },
      formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
      image: {
        width: 200,
      },
      img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
      },
    })
  );

  const classes = useStyles();
  return (
    <Grid
      container
      direction="row"
      justify="space-around"
      alignItems="center"
      spacing={2}>

      <Grid item xs={10} container spacing={2}>
        <Form>
          <Field
            fullWidth
            component={TextField}
            type="text"
            label="Name"
            name="name"
          />
          <Field
            fullWidth
            component={TextField}
            type="number"
            label="Price"
            name="price"
          />
          <Field
            fullWidth
            component={TextField}
            type="text"
            label="Product key"
            name="key"
          />
          <Field
            fullWidth
            multiline
            rowsMax={6}
            component={TextField}
            type="textarea"
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
          <Grid
            item
            xs={12}
            sm
            container
            justify="space-around"
            alignItems="center"
            spacing={5}>
            <Grid item>
              {props.id && <ProductAddImagesModal id={props.id} />}
            </Grid>
            <Grid item>
              {files!.length > 0 && < ProductAddMainImagesModal id={props.id} files={files} mainImg={mainImg} />}
            </Grid>
          </Grid>
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

      </Grid>
    </Grid>
  );
}

export default InnerForm;
