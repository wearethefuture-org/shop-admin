import React from 'react';
import { Field, Form, FormikProps } from 'formik';
import { TextField } from 'formik-material-ui';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  createStyles,
  DialogActions,
  Theme,
  Typography,
} from '@material-ui/core';

import { IFormWidgetValues } from '../../../../interfaces/widget-form';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      width: '100%',
    },
    inputContainer: {
      display: 'flex',
      alignItems: 'baseline',
      marginBottom: '20px',
    },
    title: {
      width: '210px',
      marginRight: '10px',
    },
    input: {
      width: '150px',
    },
    secondaryHeading: {
      flexGrow: 1,
      marginLeft: '30px',
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
      [theme.breakpoints.down('xs')]: {
        display: 'none',
      },
    },
    errorMessage: {
      color: 'red',
    },
  })
);

const InnerForm: React.FC<FormikProps<IFormWidgetValues>> = (props) => {
  const classes = useStyles();

  return (
    <Form className={classes.form}>
      <div className={classes.inputContainer}>
        <Typography className={classes.title}>
          Слайдер нових товарів:
        </Typography>
        <Field
          component={TextField}
          className={classes.input}
          type="number"
          id="quantityNewArrivals"
          name="quantityNewArrivals"
          label="Кількість"
        />
        <Typography className={classes.secondaryHeading}>
          Кількість слайдів: 4-20
        </Typography>
      </div>
      <div className={classes.inputContainer}>
        <Typography className={classes.title}>
          Слайдер популярних товарів:
        </Typography>
        <Field
          component={TextField}
          className={classes.input}
          type="number"
          id="quantityPopularItems"
          name="quantityPopularItems"
          label="Кількість"
        />
        <Typography className={classes.secondaryHeading}>
          Кількість слайдів: 4-20
        </Typography>
      </div>
      <DialogActions>
        <Button
          color="primary"
          variant="contained"
          type="submit"
          disabled={!(props.isValid && props.dirty)}
        >
          Зберегти
        </Button>
      </DialogActions>
    </Form>
  );
};

export default InnerForm;
