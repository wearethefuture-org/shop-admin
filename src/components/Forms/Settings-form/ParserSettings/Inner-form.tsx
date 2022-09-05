import React from 'react';
import { Field, Form, FormikProps } from 'formik';
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
import { TextField } from 'formik-material-ui';
import { IFormParserValues } from './Parser-form';
import { COLORS } from '../../../../values/colors';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import classNames from 'classnames';

const useStyles = makeStyles(
  (theme: Theme): ThemeOptions =>
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
        marginBottom: '10px',
        fontWeight: 'bold',
        fontSize: '130%',
      },
      title: {
        width: '250px',
        marginRight: '10px',
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
        'margin': 'left',
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
      input: {
        width: '130px',
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
    })
);

enum ParserSettingsDescription {
  updatePhoto = 'Оновлювати фото',
  createNewProducts = 'Створювати новий продукт',
  updateOldProducts = 'Оновлювати старий продукт',
  parserLimit = 'Відсоток для парсигу',
  updateOldCharacteristics = 'Оновлювати характеристики існуючих товарів',
}

const InnerForm: React.FC<FormikProps<IFormParserValues>> = (props) => {
  const classes = useStyles();

  const { darkMode } = useSelector((state: RootState) => state.theme);

  const [state, setState] = React.useState({ ...props.values });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    props.setFieldValue(event.target.name, event.target.checked);
  };

  const validateNumber = (value: number) => {
    if (typeof value !== 'number') {
      return 'Must be number';
    }
    if (value < 1) {
      return 'Must be greater than 1';
    }
    if (value > 100) {
      return 'Must be less than 100';
    }
  };

  const validateString = (value: string) => {
    if (value.length < 3) {
      return 'To short...';
    }
    if (value.length > 200) {
      return 'To long...';
    }
  };

  const mappedElements = Object.values(props.values.parameters).map((item: any, index) => {
    return (
      <div key={index}>
        <div>
          <Typography className={classes.parserName}>
            Парсер {Object.keys(props.values.parameters)[index].toUpperCase()}
          </Typography>
        </div>
        <div className={classes.inputContainer}>
          {Object.values(item).map((element: any, childrenIndex) => {
            let secondNamePart = Object.keys(item)[childrenIndex];
            secondNamePart = secondNamePart.replace(
              secondNamePart.charAt(0),
              secondNamePart.charAt(0).toUpperCase()
            );
            const firstNamePart = Object.keys(props.values.parameters)[index];
            const fullName = firstNamePart + secondNamePart;
            const fieldName = ParserSettingsDescription[Object.keys(item)[childrenIndex]];
            return (
              <div className={classes.lineItem} key={childrenIndex}>
                <Typography className={classes.title}>
                  {fieldName ? fieldName : Object.keys(item)[childrenIndex]}:
                </Typography>
                {typeof element === 'boolean' && (
                  <Switch
                    className={darkMode ? classes.switchDark : classes.switch}
                    checked={state[fullName]}
                    onChange={handleChange}
                    name={fullName}
                  />
                )}
                {typeof element === 'number' && (
                  <Field
                    component={TextField}
                    className={classes.input}
                    validate={validateNumber}
                    type="number"
                    name={fullName}
                  />
                )}
                {typeof element === 'string' && (
                  <Field
                    component={TextField}
                    className={classes.input}
                    validate={validateString}
                    type="string"
                    name={fullName}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  });

  return (
    <Form className={classes.form}>
      {mappedElements}
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
