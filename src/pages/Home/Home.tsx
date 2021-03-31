import React from 'react';
import { Button, TextField } from '@material-ui/core';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AppDispatch } from '../../store/store';

import { useDispatch } from 'react-redux';
import { signInUserRequest } from '../../store/actions/user.action';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  input: {
    width: '270px',
    height: '44px',
    border: '1px solid #e2e6e7',
    boxSizing: 'border-box',
    borderRadius: ' 60px',
    padding: '11px',
    outline: 'none',
    margin: '10px',
  },
  row: {
    margin: '10px',
  },
  login: {
    background: '#424D52',
    borderRadius: ' 60px',
    color: ' #fff',
    border: ' none',
    width: '270px',
    height: '44px',
    margin: '10px',
  },
  home_div: {
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'white',
    maxHeight: '100%',
    minHeight: '100%',
    minWidth: '100%',
    maxWidth: '100%',
    verticalAlign: 'middle',
    zIndex: 50,
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Неправальна адреса!').required('Це поле не повинно бути пустим!'),
  password: Yup.string()
    .min(6, 'Пароль занадто короткий!')
    .required('Це поле не повинно бути пустим!'),
});

const Home: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const classes = useStyles();

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(false);
      dispatch(signInUserRequest(values));
    },
  });

  return (
    <div className={classes.home_div}>
      <form onSubmit={formik.handleSubmit}>
        <div className={classes.row}>
          <TextField
            className={classes.input}
            type="email"
            name="email"
            id="email-field"
            placeholder="Введіть електронну пошту"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </div>
        <div className={classes.row}>
          <TextField
            className={classes.input}
            autoComplete={'false'}
            type="password"
            name="password"
            id="password-field"
            placeholder="Введіть пароль"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </div>
        <div className={classes.row}>
          <Button
            className={classes.login}
            variant="contained"
            type={'submit'}
            color="primary"
            disabled={formik.isSubmitting}
          >
            Увійти
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Home;
