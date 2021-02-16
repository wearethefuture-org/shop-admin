import React from 'react';
import { Button, Paper, Grid } from '@material-ui/core';
import { Field, Form, FormikProps } from 'formik';
import { TextField } from 'formik-material-ui';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { IProductFormData, ProductFormProps } from '../../../interfaces/IProducts';
import TextFieldWrapped from '../../../hocs/TextFieldHOC';



const InnerForm: React.FC<ProductFormProps & FormikProps<IProductFormData>> = (
  { submitForm, isSubmitting, handleClose, currencies, buttonName, files, mainImg, ...props }) => {
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
        marginBottom: "15px",
      },
      formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
      gridListRoot: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
      },
      gridList: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
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
  )
  const classes = useStyles();
  return (
    <Grid
      container
      direction="row"
      justify="space-around"
      alignItems="center"
      spacing={2}>
      <Grid item xs={10} container spacing={2}>
        <Paper>
          <Form>
            <Field
              fullWidth
              component={TextFieldWrapped}
              type="text"
              label="Назва"
              name="name"
              makegreen="true"
            />
            <Field
              fullWidth
              component={TextFieldWrapped}
              type="number"
              label="ціна"
              name="price"
              makegreen="true"
            />
            <Field
              fullWidth
              component={TextFieldWrapped}
              type="text"
              label="URL ключ"
              name="key"
              makegreen="true"
            />
            <Field
              fullWidth
              multiline
              rowsMax={6}
              component={TextField}
              type="textarea"
              label="Опис"
              name="description"
            />
            <Field
              select
              fullWidth
              component={TextFieldWrapped}
              type="select"
              label="Назва категорії"
              name="categoryName"
              makegreen="true"
              SelectProps={{
                native: true,
              }}>
              {currencies.map((option: any) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Field>
            <Button
              className={classes.customBtn}
              variant="contained"
              color="primary"
              disabled={isSubmitting || !(props.dirty && props.isValid)}
              onClick={submitForm}
            >
              {buttonName}
            </Button>

          </Form>
        </Paper>


      </Grid>
    </Grid>
  );
}

export default InnerForm;
