import React from 'react';
import { Field, Form, FormikProps } from 'formik';
import { TextField } from 'formik-material-ui';
import { makeStyles, ThemeOptions } from '@material-ui/core/styles';
import {
  alpha,
  Button,
  createStyles,
  DialogActions,
  Switch,
  Theme,
  Typography,
} from '@material-ui/core';

import { IFormWidgetValues } from '../../../../interfaces/widget-form';
import { COLORS } from '../../../../values/colors';
import styled from 'styled-components';

const SaveBtn = styled(Button)`
  background-color: ${COLORS.primaryBlue};
  border-radius: 30px;
  color: ${COLORS.primaryLight};
  &:hover {
    background-color: ${COLORS.secondaryBlue};
  }
`;

const useStyles = makeStyles(
  (theme: Theme): ThemeOptions =>
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
        '& .MuiSwitch-switchBase.Mui-checked': {
          'color': COLORS.primaryGreen,
          '&:hover': {
            backgroundColor: alpha(COLORS.primaryGreen, theme.palette.action.hoverOpacity),
          },
        },
        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
          backgroundColor: COLORS.primaryGreen,
        },
        'marginLeft': 'auto',
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

  const [state, setState] = React.useState({
    isWidgetActiveNewArrivals: props.values.isWidgetActiveNewArrivals,
    isWidgetActivePopularItems: props.values.isWidgetActivePopularItems,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    props.setFieldValue(event.target.name, event.target.checked);
  };

  return (
    <Form className={classes.form}>
      <div className={classes.inputContainer}>
        <Typography className={classes.title}>Слайдер нових товарів:</Typography>
        <Field
          component={TextField}
          className={classes.input}
          type="number"
          id="quantityNewArrivals"
          name="quantityNewArrivals"
          label="Кількість"
        />
        <Typography className={classes.secondaryHeading}>Кількість слайдів: 4-20</Typography>
        <Switch
          className={classes.switch}
          checked={state.isWidgetActiveNewArrivals}
          onChange={handleChange}
          name="isWidgetActiveNewArrivals"
        />
      </div>
      <div className={classes.inputContainer}>
        <Typography className={classes.title}>Слайдер популярних товарів:</Typography>
        <Field
          component={TextField}
          className={classes.input}
          type="number"
          id="quantityPopularItems"
          name="quantityPopularItems"
          label="Кількість"
        />
        <Typography className={classes.secondaryHeading}>Кількість слайдів: 4-20</Typography>
        <Switch
          className={classes.switch}
          checked={state.isWidgetActivePopularItems}
          onChange={handleChange}
          name="isWidgetActivePopularItems"
        />
      </div>
      <DialogActions>
        <SaveBtn color="primary" variant="contained" type="submit" disabled={!props.isValid}>
          Зберегти
        </SaveBtn>
      </DialogActions>
    </Form>
  );
};

export default InnerForm;
