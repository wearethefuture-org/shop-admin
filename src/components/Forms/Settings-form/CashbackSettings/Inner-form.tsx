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

import { IFormCashbackValues } from '../../../../interfaces/widget-form';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { COLORS } from '../../../../values/colors';
import classNames from 'classnames';

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
      btn: {
        padding: '6px 15px 6px 15px',
        borderRadius: '30px',
        color: COLORS.primaryLight,
      },
      btnLight: {
        'backgroundColor': COLORS.primaryGreen,
        '&:hover': {
          backgroundColor: COLORS.secondaryGreen,
        },
      },
      btnDark: {
        'backgroundColor': COLORS.darkGreen,
        '&:hover': {
          backgroundColor: COLORS.secondaryDarkGreen,
        },
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
      switchDark: {
        '& .MuiSwitch-switchBase.Mui-checked': {
          'color': COLORS.darkGreen,
          '&:hover': {
            backgroundColor: alpha(COLORS.darkGreen, theme.palette.action.hoverOpacity),
          },
        },
        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
          backgroundColor: COLORS.darkGreen,
        },
        'margin': 'left',
      },
    })
);

const InnerForm: React.FC<FormikProps<IFormCashbackValues>> = (props) => {
  const classes = useStyles();

  const { darkMode } = useSelector((state: RootState) => state.theme);

  const [state, setState] = React.useState({
    switchActiveCashback: props.values.switchActiveCashback,
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
          className={darkMode ? classes.switchDark : classes.switch}
          checked={state.switchActiveCashback}
          onChange={handleChange}
          name="switchActiveCashback"
        />
      </div>
      <DialogActions>
        <Button
          className={classNames(classes.btn, darkMode ? classes.btnDark : classes.btnLight)}
          variant="contained"
          type="submit"
          disabled={!props.isValid}
        >
          Зберегти
        </Button>
      </DialogActions>
    </Form>
  );
};

export default InnerForm;
