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
import styles from './UserCard-form.module.scss';
import { NavLink } from 'react-router-dom';
import { COLORS } from '../../../values/colors';

// todo
// how to avoid code duplication in input and inputError fields?
// see input, inputError
const useStyles = makeStyles({
  input: {
    'width': '270px',
    'height': '44px',
    'padding': '11px',
    'marginBottom': '15px',
    '& label.Mui-focused': {
      color: COLORS.frenchPlum,
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: COLORS.frenchPlum,
    },
  },
  inputError: {
    'width': '270px',
    'height': '44px',
    'padding': '11px',
    'marginBottom': '15px',
    '& label.Mui-focused': {
      color: 'red',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'red',
    },
  },
  row: {
    margin: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submit: {
    'background': COLORS.primaryGreen,
    'borderRadius': ' 30px',
    'color': COLORS.primaryLight,
    'border': ' none',
    'width': '270px',
    'height': '44px',
    'marginBottom': '15px',
    '&:hover': {
      backgroundColor: COLORS.secondaryGreen,
    },
  },
  formDiv: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  inputSelect: {
    'width': '270px',
    'height': '50px',
    'marginBottom': '15px',
    'textAlign': 'start',
    '&:hover': {
      backgroundColor: COLORS.primaryOttoman,
    },
  },
  menuItem: {
    '&:hover': {
      backgroundColor: COLORS.primaryOttoman,
    },
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
  const [showCurrentPassword, setShowCurrentPassword] = React.useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = React.useState<boolean>(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = React.useState<boolean>(false);
  const classes = useStyles();
  const { data: roles } = useRoles();

  const onToggleShowCurrentPassword = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const onToggleShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const onToggleShowConfirmNewPassword = () => {
    setShowConfirmNewPassword(!showConfirmNewPassword);
  };

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
    roleId: isNew ? 0 : user?.role.id,
    telegramId: isNew ? '' : user?.telegramId,
    currentPassword: isNew ? '' : user?.password,
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
          style={{ width: '290px' }}
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
          className={getInputClass('lastName')}
          style={{ width: '290px' }}
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
        <InputMask
          className={getInputClass('phoneNumber')}
          style={{ width: '290px' }}
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
        >
          {(inputProps) => <TextField {...inputProps} />}
        </InputMask>
      </div>
      <div className={classes.row}>
        <TextField
          className={getInputClass('email')}
          style={{ width: '290px' }}
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
        <TextField
          style={{ width: '290px' }}
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
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          renderValue={(value) => (value !== 0 ? value : 'Вибрати роль')}
        >
          {roles.map((role) => (
            <MenuItem className={classes.menuItem} key={'option' + role.id} value={role.id}>
              {role.name}
            </MenuItem>
          ))}
        </Select>
      </div>
      {!isNew ? (
        <div className={classes.row}>
          <TextField
            style={{ float: 'right' }}
            className={getInputClass('currentPassword')}
            value={formik.values.currentPassword}
            autoComplete={'false'}
            disabled={!isEdit}
            type={showCurrentPassword ? 'text' : 'password'}
            name="currentPassword"
            id="currentPassword-field"
            placeholder="Поточний пароль"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.currentPassword && Boolean(formik.errors.currentPassword)}
            helperText={formik.touched.currentPassword && formik.errors.currentPassword}
          />
          <svg
            onClick={onToggleShowCurrentPassword}
            className={styles.eye}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
          >
            <path d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z" />
          </svg>
        </div>
      ) : null}
      <div className={classes.row}>
        <TextField
          className={getInputClass('newPassword')}
          autoComplete={'false'}
          disabled={!isEdit}
          type={showNewPassword ? 'text' : 'password'}
          name="newPassword"
          id="newPassword-field"
          placeholder="Новий пароль"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
          helperText={formik.touched.newPassword && formik.errors.newPassword}
        />
        <svg
          onClick={onToggleShowNewPassword}
          className={styles.eye}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 576 512"
        >
          <path d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z" />
        </svg>
      </div>
      <div className={classes.row}>
        <TextField
          className={getInputClass('confirmNewPassword')}
          autoComplete={'false'}
          disabled={!isEdit}
          type={showConfirmNewPassword ? 'text' : 'password'}
          name="confirmNewPassword"
          id="confirmNewPassword-field"
          placeholder="Підтвердіть пароль"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.confirmNewPassword && Boolean(formik.errors.confirmNewPassword)}
          helperText={formik.touched.confirmNewPassword && formik.errors.confirmNewPassword}
        />
        <svg
          onClick={onToggleShowConfirmNewPassword}
          className={styles.eye}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 576 512"
        >
          <path d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z" />
        </svg>
      </div>

      {!isNew && (
        <NavLink to={'/password'} key={'/password'}>
          <div className={styles.form__resetPassword}>
            <span>Змінити пароль</span>
          </div>
        </NavLink>
      )}

      <div className={classes.row}>
        <Button className={classes.submit} type="submit" disabled={formik.isSubmitting}>
          {isNew ? 'Створити' : isEdit ? 'Змінити' : 'Редагувати'}
        </Button>
      </div>
    </form>
  );
};

export default UserCardForm;
