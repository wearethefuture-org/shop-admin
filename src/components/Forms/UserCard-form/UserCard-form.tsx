import React, { useState } from 'react';
import { Button, TextField, Select, MenuItem } from '@material-ui/core';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import InputMask from 'react-input-mask';

import { AppDispatch } from '../../../store/store';
import { addUserRequest, updateUserRequest } from '../../../store/actions/users.actions';
import { IUserItem } from '../../../interfaces/IUsers';
import { failSnackBar } from '../../../store/actions/snackbar.actions';
import useRoles from '../../../hooks/useRoles';

// todo
// how to avoid code duplication in input and inputError fields?
// see input, inputError
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
  inputError: {
    width: '270px',
    height: '44px',
    border: '1px solid #ff0000',
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

const phoneRegExp =
  /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

const UserCardForm: React.FC<FormDialogProps> = ({ isNew, user, closeModal }) => {
  const classes = useStyles();
  const { data: roles } = useRoles();

  const baseScheme = {
    firstName: Yup.string()
      .min(3, "Введіть коректне ім'я")
      .required('Це поле не повинно бути пустим!'),
    lastName: Yup.string()
      .min(2, 'Введіть коректне прізвище')
      .required('Це поле не повинно бути пустим!'),
    phoneNumber: Yup.string()
      .required('Це поле не повинно бути пустим!')
      .test(
        'length',
        'Неправильний номер телефону',
        (value: string | null | undefined): boolean => {
          if (typeof value === 'string') {
            const lengthOnlyNumbers = value.replace(/-|_/g, '').length;
            return lengthOnlyNumbers === 17;
          }
          return false;
        }
      ),
    email: Yup.string().email('Неправильна адреса!').required('Це поле не повинно бути пустим!'),
    telegramId: Yup.string().notRequired().nullable(),
    roleId: Yup.string().required('Це поле не повинно бути пустим!'),
    newPassword: Yup.string()
      .min(6, 'Пароль занадто короткий!')
      .required('Це поле не повинно бути пустим!')
      .matches(
        /^(?=.*[A-ZА-Я])(?=.*\d).*$/,
        'Пароль має бути не менше 6 символів, містити цифри та великі літери'
      ),
    confirmNewPassword: Yup.string().oneOf([Yup.ref('newPassword')], 'Пароль не співпадає'),
  };

  const newScheme = {
    ...baseScheme,
    currentPassword: Yup.string().min(6, 'Пароль занадто короткий!').notRequired(),
    newPassword: Yup.string().when(['currentPassword'], {
      is: true,
      then: Yup.string()
        .min(6, 'Пароль занадто короткий!')
        .matches(
          /^(?=.*[A-ZА-Я])(?=.*\d).*$/,
          'Пароль має бути не менше 6 символів, містити цифри та великі літери'
        ),
      otherwise: Yup.string().notRequired(),
    }),
  };

  const validationSchema = isNew ? Yup.object().shape(baseScheme) : Yup.object().shape(newScheme);

  const [isEdit, setIsEdit] = useState(true);
  const dispatch: AppDispatch = useDispatch();
  const initialValues = {
    firstName: isNew ? '' : user?.firstName,
    lastName: isNew ? '' : user?.lastName,
    phoneNumber: isNew ? '' : user?.phoneNumber,
    email: isNew ? '' : user?.email,
    roleId: isNew ? 1 : user?.role.id,
    telegramId: isNew ? '' : user?.telegramId,
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
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
            phoneNumber: _values.phoneNumber ? _values.phoneNumber : '',
            roleId: _values.roleId ? _values.roleId : 1,
            password: _values.newPassword ? _values.newPassword : '',
            confirmPassword: _values.confirmNewPassword ? _values.confirmNewPassword : '',
            email: _values.email ? _values.email : '',
            telegramId: _values.telegramId ? _values.telegramId : '',
          })
        );
      } else if (user) {
        let sendData: { id: number; [key: string]: any } = { id: user.id };
        for (let key in _values) {
          if (_values[key] && _values[key] !== initialValues[key]) {
            sendData[key] = _values[key];
          }
        }
        sendData['roleId'] = _values['roleId'];
        if (Object.keys(sendData).length > 1) {
          dispatch(updateUserRequest(user.id, sendData));
        } else {
          dispatch(failSnackBar('Ви нічого не змінили'));
        }
      }
      closeModal();
    },
  });

  const getInputClass = (fieldName): string => {
    return formik.touched[fieldName] && Boolean(formik.errors[fieldName])
      ? classes.inputError
      : classes.input;
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className={classes.formDiv}
      onClick={(e) => e.stopPropagation()}
    >
      <div className={classes.row}>
        <TextField
          className={getInputClass('firstName')}
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
          InputProps={{ disableUnderline: true }}
          margin="dense"
        />
      </div>
      <div className={classes.row}>
        <TextField
          className={getInputClass('lastName')}
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
          InputProps={{ disableUnderline: true }}
          margin="dense"
        />
      </div>
      <div className={classes.row}>
        <InputMask
          className={getInputClass('phoneNumber')}
          value={formik.values.phoneNumber}
          disabled={!isEdit}
          type="tel"
          name="phoneNumber"
          id="tel-field"
          mask="+380\ 99 999 99 99"
          placeholder="+380 __ ___ __ __"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
          helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
          InputProps={{ disableUnderline: true }}
          margin="dense"
        />
      </div>
      <div className={classes.row}>
        <TextField
          className={getInputClass('email')}
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
          InputProps={{ disableUnderline: true }}
          margin="dense"
        />
      </div>
      <div className={classes.row}>
        <TextField
          className={getInputClass('telegramId')}
          value={formik.values.telegramId}
          disabled={!isEdit}
          type="text"
          name="telegramId"
          id="telegramId-field"
          placeholder="Telegram Id"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.telegramId && Boolean(formik.errors.telegramId)}
          helperText={formik.touched.telegramId && formik.errors.telegramId}
          InputProps={{ disableUnderline: true }}
          margin="dense"
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
          disableUnderline
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
      {!isNew ? (
        <div className={classes.row}>
          <TextField
            className={getInputClass('currentPassword')}
            autoComplete={'false'}
            disabled={!isEdit}
            type="password"
            name="currentPassword"
            id="currentPassword-field"
            placeholder="Поточний пароль"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.currentPassword && Boolean(formik.errors.currentPassword)}
            helperText={formik.touched.currentPassword && formik.errors.currentPassword}
            InputProps={{ disableUnderline: true }}
            margin="dense"
          />
        </div>
      ) : null}
      <div className={classes.row}>
        <TextField
          className={getInputClass('newPassword')}
          autoComplete={'false'}
          disabled={!isEdit}
          type="password"
          name="newPassword"
          id="newPassword-field"
          placeholder="Новий пароль"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
          helperText={formik.touched.newPassword && formik.errors.newPassword}
          InputProps={{ disableUnderline: true }}
          margin="dense"
        />
      </div>
      <div className={classes.row}>
        <TextField
          className={getInputClass('confirmNewPassword')}
          autoComplete={'false'}
          disabled={!isEdit}
          type="password"
          name="confirmNewPassword"
          id="confirmNewPassword-field"
          placeholder="Підтвердіть пароль"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.confirmNewPassword && Boolean(formik.errors.confirmNewPassword)}
          helperText={formik.touched.confirmNewPassword && formik.errors.confirmNewPassword}
          InputProps={{ disableUnderline: true }}
          margin="dense"
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
