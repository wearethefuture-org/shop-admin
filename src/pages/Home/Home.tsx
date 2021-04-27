import React from 'react';
import { Button, TextField } from '@material-ui/core';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AppDispatch } from '../../store/store';

import { useDispatch } from 'react-redux';
import { signInUserRequest } from '../../store/actions/user.action';
import styles from './Home.module.scss';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Неправальна адреса!').required('Це поле не повинно бути пустим!'),
  password: Yup.string()
    .min(6, 'Пароль занадто короткий!')
    .required('Це поле не повинно бути пустим!'),
});

const Home: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(false);
      dispatch(signInUserRequest(values));
    },
  });

  return (
    <div className={styles.backDrop}>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <div className={styles.group}>
          <TextField
            className={styles.input}
            type="email"
            name="email"
            id="email-field"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            label="Електронна пошта"
            fullWidth={true}
          />
        </div>
        <div className={styles.group}>
          <TextField
            className={styles.input}
            autoComplete={'false'}
            type="password"
            name="password"
            id="password-field"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            label="Пароль"
            fullWidth={true}
          />
        </div>
        <div className={styles.btn_group}>
          <Button
            className={styles.login}
            variant="contained"
            type={'submit'}
            color="primary"
            disabled={formik.isSubmitting}
            fullWidth={true}
          >
            Увійти
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Home;
