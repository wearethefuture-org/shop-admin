import React, { useState } from 'react';
import { Button, TextField, Select, MenuItem } from '@material-ui/core';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AppDispatch } from '../../../store/store';
import { useDispatch } from 'react-redux';
import {
  addUserRequest,
  updateUserRequest,
} from '../../../store/actions/users.actions';
import { IUserItem } from '../../../interfaces/IUsers';
import { failSnackBar } from '../../../store/actions/snackbar.actions';
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
  submit: {
    background: '#424D52',
    borderRadius: ' 60px',
    color: ' #fff',
    border: ' none',
    width: '270px',
    height: '44px',
    margin: '10px',
  },
  formDiv: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  inputSelect: {
    width: '270px',
    height: '50px',
    border: '1px solid #e2e6e7',
    boxSizing: 'border-box',
    borderRadius: '60px',
    outline: 'none',
    backgroundSize: 'calc(.75em + .375rem) calc(.75em + .375rem)',
    backgroundPosition: '10px 10px',
    backgroundRepeat: 'no-repeat',
    padding: '12px 20px 15px 40px',
  },
});

interface FormDialogProps {
  isNew: boolean;
  user: IUserItem | null;
  closeModal: () => void;
}

const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

const roles = [
  { id: 1, name: 'admin', description: 'lorem ipsum' },
  { id: 2, name: 'moderator', description: 'lorem ipsum' },
  { id: 3, name: 'user', description: 'lorem ipsum' },
];

const UserCardForm: React.FC<FormDialogProps> = ({ isNew, user, closeModal }) => {
  const classes = useStyles();

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(3, "Введіть коректне ім'я")
      .required('Це поле не повинно бути пустим!'),
    lastName: Yup.string()
      .min(2, 'Введіть коректне прізвище')
      .required('Це поле не повинно бути пустим!'),
    tel: Yup.string().matches(phoneRegExp, 'Неправильний номер').max(13, 'Неправильний номер'),
    email: Yup.string().email('Неправальна адреса!').required('Це поле не повинно бути пустим!'),
    creditCard: Yup.string().required('Це поле не повинно бути пустим!'),
    roleId: Yup.string().required('Це поле не повинно бути пустим!'),
    password: isNew
      ? Yup.string().min(6, 'Пароль занадто короткий!').required('Це поле не повинно бути пустим!')
      : Yup.string().min(6, 'Пароль занадто короткий!'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Пароль не співпадає'),
  });
  const [isEdit, setIsEdit] = useState(true);
  const dispatch: AppDispatch = useDispatch();
  const initialValues = {
    firstName: isNew ? '' : user?.firstName,
    lastName: isNew ? '' : user?.lastName,
    phoneNumber: isNew ? '' : user?.phoneNumber,
    creditCard: isNew ? '' : user?.creditCard,
    email: isNew ? '' : user?.email,
    roleId: isNew ? 0 : user?.role.id,
    password: '',
    confirmPassword: '',
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit: async (_values, { setSubmitting }) => {
      if (!isEdit) {
        setIsEdit(true);
        return;
      }
      setSubmitting(true);

      if (isNew) {
        dispatch(
          addUserRequest({
            firstName: _values.firstName ? _values.firstName : '',
            lastName: _values.lastName ? _values.lastName : '',
            creditCard: _values.creditCard ? _values.creditCard : '',
            phoneNumber: _values.phoneNumber ? _values.phoneNumber : '',
            roleId: _values.roleId ? _values.roleId : 0,
            password: _values.password ? _values.password : '',
            email: _values.email ? _values.email : '',
          })
        );
      } else if (user) {
        let sendData: { id: number; [key: string]: any } = { id: user.id };
        for (let key in _values) {
          if (_values[key] && _values[key] !== initialValues[key]) {
            sendData[key] = _values[key];
          }
        }
        if (Object.keys(sendData).length > 1) {
          dispatch(updateUserRequest(user.id, sendData));
        } else {
          dispatch(failSnackBar('Ви нічого не змінили'));
        }
      }
      closeModal();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={classes.formDiv}>
      <div className={classes.row}>
        <TextField
          className={classes.input}
          value={formik.values.firstName}
          disabled={!isEdit}
          type="text"
          name="firstName"
          id="firstName-field"
          placeholder="Iм&#39;я"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
        />
      </div>
      <div className={classes.row}>
        <TextField
          className={classes.input}
          value={formik.values.lastName}
          disabled={!isEdit}
          type="text"
          name="lastName"
          id="lastName-field"
          placeholder="Прізвище"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
        />
      </div>
      <div className={classes.row}>
        <TextField
          className={classes.input}
          value={formik.values.phoneNumber}
          disabled={!isEdit}
          type="tel"
          name="tel"
          id="tel-field"
          placeholder="Номер телефону"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
          helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
        />
      </div>
      <div className={classes.row}>
        <TextField
          className={classes.input}
          value={formik.values.email}
          disabled={!isEdit}
          type="email"
          name="email"
          id="email-field"
          placeholder="Електронна пошта"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
      </div>
      <div className={classes.row}>
        <Select
          value={formik.values.roleId}
          className={classes.inputSelect}
          disabled={!isEdit}
          type="select"
          name="roleId"
          id={'role_id-field'}
          placeholder={'роль'}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          {roles.map((role) => {
            return (
              <MenuItem key={'option' + role.id} value={role.id}>
                {role.name}
              </MenuItem>
            );
          })}
        </Select>
      </div>
      <div className={classes.row}>
        <TextField
          className={classes.input}
          value={formik.values.creditCard}
          disabled={!isEdit}
          type="text"
          name="creditCard"
          id="creditCard-field"
          placeholder="ВВедить кредтну картку"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.creditCard && Boolean(formik.errors.creditCard)}
          helperText={formik.touched.creditCard && formik.errors.creditCard}
        />
      </div>
      <div className={classes.row}>
        <TextField
          className={classes.input}
          autoComplete={'false'}
          disabled={!isEdit}
          type="password"
          name="password"
          id="password-field"
          placeholder="Пароль (6 символів)"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
      </div>
      <div className={classes.row}>
        <TextField
          className={classes.input}
          autoComplete={'false'}
          disabled={!isEdit}
          type="password"
          name="confirmPassword"
          id="confirmPassword-field"
          placeholder="Підтвердіть пароль"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
          helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
        />
      </div>
      <div className={classes.row}>
        <Button className={classes.submit} type="submit" disabled={formik.isSubmitting}>
          {isNew ? 'Створити' : isEdit ? 'Змінити' : 'Редагувати'}
        </Button>
      </div>
    </form>
  );
};

export default UserCardForm;
