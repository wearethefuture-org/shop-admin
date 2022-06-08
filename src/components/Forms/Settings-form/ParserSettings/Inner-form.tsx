import React from 'react';
import { Field, Form, FormikProps } from 'formik';
import { makeStyles, ThemeOptions } from '@material-ui/core/styles';
import { alpha, Button, createStyles, DialogActions, Switch, Theme, Typography } from '@material-ui/core';

import { IFormParserValues } from '../../../../interfaces/widget-form';
import { TextField } from 'formik-material-ui';

const useStyles = makeStyles((theme: Theme): ThemeOptions =>
  createStyles({
    form: {
      width: '100%',
    },
    inputContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'left',
      marginBottom: '30px',
    },
    lineItem: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: '10px',
    },
    parserName: {
      width: '250px',
      marginRight: '10px',
      fontWeight: 'bold',
      fontSize: '130%',
    },
    title: {
      width: '250px',
      marginRight: '10px',
    },
    switch: {
      '& .MuiSwitch-switchBase.Mui-checked': {
        color: '#006400',
        '&:hover': {
          backgroundColor: alpha('#006400', theme.palette.action.hoverOpacity),
        }
      },
      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
        backgroundColor: '#006400'
      },
      margin: 'left',
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

const InnerForm: React.FC<FormikProps<IFormParserValues>> = (props) => {
  const classes = useStyles();

  const [state, setState] = React.useState({
    bazzilaIdUpdatePhoto: props.values.bazzilaIdUpdatePhoto,
    fashionGirlUpdatePhoto: props.values.fashionGirlUpdatePhoto,
    ollaUpdatePhoto: props.values.ollaUpdatePhoto,
    bazzilaIdCreateNewProducts: props.values.bazzilaIdCreateNewProducts,
    fashionGirlCreateNewProducts: props.values.fashionGirlCreateNewProducts,
    ollaCreateNewProducts: props.values.ollaCreateNewProducts,
    ollaUpdateOldProducts: props.values.ollaUpdateOldProducts,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    props.setFieldValue(event.target.name, event.target.checked);
  };

  return (
    <Form className={classes.form}>
      <div>
        <Typography className={classes.parserName}>Парсер Basilla:</Typography>
      </div>
      <div className={classes.inputContainer}>
        <div className={classes.lineItem}>
          <Typography className={classes.title}>Оновлювати фото:</Typography>
          <Switch
            className={classes.switch}
            checked={state.bazzilaIdUpdatePhoto}
            onChange={handleChange}
            name="bazzilaIdUpdatePhoto"
          />
        </div>
        <div className={classes.lineItem}>
          <Typography className={classes.title}>Створювати новий продукт:</Typography>
          <Switch
            className={classes.switch}
            checked={state.bazzilaIdCreateNewProducts}
            onChange={handleChange}
            name="bazzilaIdCreateNewProducts"
          />
        </div>
      </div>
      <div>
        <Typography className={classes.parserName}>Парсер FashionGirl:</Typography>
      </div>
      <div className={classes.inputContainer}>
        <div className={classes.lineItem}>
          <Typography className={classes.title}>Оновлювати фото:</Typography>
          <Switch
            className={classes.switch}
            checked={state.fashionGirlUpdatePhoto}
            onChange={handleChange}
            name="fashionGirlUpdatePhoto"
          />
        </div>
        <div className={classes.lineItem}>
          <Typography className={classes.title}>Створювати новий продукт:</Typography>
          <Switch
            className={classes.switch}
            checked={state.fashionGirlCreateNewProducts}
            onChange={handleChange}
            name="fashionGirlCreateNewProducts"
          />
        </div>
      </div>
      <div>
        <Typography className={classes.parserName}>Парсер Olla:</Typography>
      </div>
      <div className={classes.inputContainer}>
        <div className={classes.lineItem}>
          <Typography className={classes.title}>Оновлювати фото:</Typography>
          <Switch
            className={classes.switch}
            checked={state.ollaUpdatePhoto}
            onChange={handleChange}
            name="ollaUpdatePhoto"
          />
        </div>
        <div className={classes.lineItem}>
          <Typography className={classes.title}>Створювати новий продукт:</Typography>
          <Switch
            className={classes.switch}
            checked={state.ollaCreateNewProducts}
            onChange={handleChange}
            name="ollaCreateNewProducts"
          />
        </div>
        <div className={classes.lineItem}>
          <Typography className={classes.title}>Оновлювати старий продукт:</Typography>
          <Switch
            className={classes.switch}
            checked={state.ollaUpdateOldProducts}
            onChange={handleChange}
            name="ollaUpdateOldProducts"
          />
        </div>
        <div className={classes.lineItem}>
          <Typography className={classes.title}>Відсоток для парсигу:</Typography>
          <Field
            component={TextField}
            className={classes.input}
            type="number"
            name="ollaParserLimit"
          />
        </div>
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
