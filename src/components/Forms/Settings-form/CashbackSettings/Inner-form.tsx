import React from 'react';
import { Field, Form, FormikProps } from 'formik';
import { TextField } from 'formik-material-ui';
import { makeStyles, ThemeOptions } from '@material-ui/core/styles';
import { Button, createStyles, DialogActions, Switch, Theme, Typography } from '@material-ui/core';

import { IFormCashbackValues } from '../../../../interfaces/widget-form';

const useStyles = makeStyles((theme: Theme): ThemeOptions =>
  createStyles({
    form: {
      width: '100%',
    },
    inputContainer: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '20px',
    },
    title: {
      width: '210px',
      marginRight: '10px',
    },
    input: {
      width: '150px',
    },
    switch: {
      marginLeft: 'auto',
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

const InnerForm: React.FC<FormikProps<IFormCashbackValues>> = (props) => {
  const classes = useStyles();

  const [state, setState] = React.useState({
    switchActiveCashback: props.values.switchActiveCashback
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    props.setFieldValue(event.target.name, event.target.checked);
  };

  return (
    <Form className={classes.form}>
      <div className={classes.inputContainer}>
        <Typography className={classes.title}>Встановлення значення кешбеку:</Typography>
        <Field
          component={TextField}
          className={classes.input}
          type="number"
          id="currentPercentCashback"
          name="currentPercentCashback"
          label="Відсоток кешбеку"
        />
        <Typography className={classes.secondaryHeading}>Від: 1-35%</Typography>
        <Switch
            className={classes.switch}
            checked={state.switchActiveCashback}
            onChange={handleChange}
            name="switchActiveCashback"
          />
      </div>
      <DialogActions>
        <Button color="primary" variant="contained" type="submit" disabled={!props.isValid}>
          Зберегти
        </Button>
      </DialogActions>
    </Form>
  );
};

export default InnerForm;
