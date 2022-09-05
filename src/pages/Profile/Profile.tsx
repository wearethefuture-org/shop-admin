import { FormControl, Select, MenuItem, TextField, Button, Avatar } from '@material-ui/core';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import { useFormik } from 'formik';
import * as yup from 'yup';
import React from 'react';

import {
  updateProfileUserReq,
  deleteAvatarRequest,
  addAvatarRequest,
} from './../../store/actions/user.action';
import { failSnackBar } from './../../store/actions/snackbar.actions';
import { IRole } from './../../interfaces/IRoles';
import { RootState } from './../../store/store';
import useRoles from './../../hooks/useRoles';
import { root } from './../../api/config';
import s from './Profile.module.scss';

export default function Profile() {
  const dispatch = useDispatch();
  const { roles } = useRoles();
  const { user, avatarLink } = useSelector((state: RootState) => state.user);
  const [isBeingEdited, setIsBeingEdited] = React.useState<boolean>(false);
  const [pastLength, setPastLength] = React.useState<number>(0);
  const phoneRegExp = /\+\d\d\d\s\d\d\s\d\d\d\s\d\d\s\d\d/;
  const useStyles = makeStyles(() => ({ large: { width: 150, height: 150 } }));
  const classes = useStyles();
  const inputs = [
    { title: 'Призвіще', name: 'lastName', type: 'text', fullWidth: false },
    { title: "Ім'я", name: 'firstName', type: 'text', fullWidth: false },
    { title: 'Номер Телефону', name: 'phoneNumber', type: 'tel', fullWidth: false },
    { title: 'Пошта', name: 'email', type: 'email', fullWidth: true },
  ];
  const initValue = {
    id: user!.id,
    lastName: user!.lastName,
    firstName: user!.firstName,
    phoneNumber: user!.phoneNumber,
    email: user!.email,
    roleId: user!.role.id,
  };
  React.useEffect(() => {
    formik.setValues(initValue);
  }, [user]);
  const onSaveSubmit = (formikValues) => {
    dispatch(
      updateProfileUserReq({
        ...formikValues,
        currentEmail: user!.email,
        currentPhoneNumber: user!.phoneNumber,
      })
    );
    formik.resetForm();
    setIsBeingEdited(false);
  };
  const formik = useFormik({
    initialValues: initValue,
    validationSchema: yup.object({
      lastName: yup.string().max(30, 'Не більше 30 символів!').required("Обов'язкове поле!"),
      firstName: yup.string().max(20, 'Не більше 20 символів!').required("Обов'язкове поле!"),
      phoneNumber: yup
        .string()
        .matches(phoneRegExp, 'Приклад валідного номера телефону: +380 11 222 33 44')
        .min(17, 'Приклад валідного номера телефону: +380 11 222 33 44')
        .max(17, 'Приклад валідного номера телефону: +380 11 222 33 44'),
      email: yup.string().email('Некорректний email!'),
      roleId: yup.number().required(),
    }),
    onSubmit: onSaveSubmit,
  });
  const addSpacesAndPlus = (value: string): string | undefined => {
    const array = value.split('');
    const l = array.length;
    const lastItem = array[l - 1];
    if (pastLength > l) {
      setPastLength(pastLength - 1);
      return;
    }
    const newString = [];
    const p = (...a: Array<string>) => newString.push(...a);
    const s = (a: number, b?: number) => array.slice(a, b);
    if (l === 1) {
      p('+', lastItem);
    } else if (l === 2) {
      p('+', lastItem);
    } else if (l === 3) {
      p(...s(0, 3));
    } else if (l === 4) {
      p(...s(0, 4));
    } else if (l === 5) {
      p(...s(0, 4), ' ', lastItem);
    } else if (l === 6 || l === 7) {
      p(...s(0, 4), ' ', ...s(5));
    } else if (l === 8 || l === 9) {
      p(...s(0, 4), ' ', ...s(5, 7), ' ', lastItem);
    } else if (l === 10 || l === 11) {
      p(...s(0, 4), ' ', ...s(5, 7), ' ', ...s(8));
    } else if (l === 12 || l === 13) {
      p(...s(0, 4), ' ', ...s(5, 7), ' ', ...s(8, 11), ' ', lastItem);
    } else if (l === 14) {
      p(...s(0, 4), ' ', ...s(5, 7), ' ', ...s(8, 11), ' ', ...s(12));
    } else if (l === 15 || l === 16) {
      p(...s(0, 4), ' ', ...s(5, 7), ' ', ...s(8, 11), ' ', ...s(12, 14), ' ', lastItem);
    } else if (l === 17) {
      p(...s(0, 4), ' ', ...s(5, 7), ' ', ...s(8, 11), ' ', ...s(12, 14), ' ', ...s(15));
    }
    setPastLength(newString.length);
    return newString.join('');
  };
  const customOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    let value = e.target.value;
    if (name === 'phoneNumber') {
      if (value.length > 17) return;
      const newPhone = addSpacesAndPlus(value);
      if (newPhone) value = newPhone;
    }
    const newValue = {
      ...formik.values,
      [name]: value,
    };
    formik.setValues(newValue);
  };
  React.useEffect(() => {
    formik.setValues(initValue);
  }, [user]);
  const onChangeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const availableFormats = ['png', 'jpg', 'jpeg', 'gif'];
    const imageFormat = e.target.files![0].type.replace(/image[/]/, '');
    if (!availableFormats.includes(imageFormat)) {
      dispatch(failSnackBar('Підтримувані формати фото: png, jpg, jpeg, gif'));
      return;
    }
    const imageSize = e.target.files![0]?.size;
    if (imageSize > 10000000) {
      dispatch(failSnackBar('Розмір аватара перевищює 10 Мб'));
      return;
    }
    const imageFD = new FormData();
    imageFD.append('image', e.target.files![0]);
    dispatch(addAvatarRequest(imageFD));
  };
  const onDeleteAvatar = () => {
    if (!avatarLink) {
      dispatch(failSnackBar('Ви не маете аватара.'));
      return;
    }
    dispatch(deleteAvatarRequest);
  };
  const handleOnEdited = () => {
    setIsBeingEdited(!isBeingEdited);
    if (isBeingEdited) formik.setValues(initValue);
  };
  return (
    <div className={s.page}>
      <div className={s.leftSide}>
        {isBeingEdited ? (
          <form onSubmit={formik.handleSubmit} noValidate>
            <div className={s.cancelSave}>
              <Button type="submit" variant="contained" color="primary" size="small">
                Зберегти
              </Button>
              <Button onClick={handleOnEdited} variant="contained" color="secondary" size="small">
                Скасувати
              </Button>
            </div>
            {inputs.map((input, index) => {
              const { value, name, onBlur } = formik.getFieldProps(input.name);
              return (
                <div className={s.wrapper} key={`${input.title}_${index}`}>
                  <div className={s.greayWords}>{input.title}</div>
                  <TextField
                    size="small"
                    variant="standard"
                    type={input.type}
                    value={value}
                    name={name}
                    onBlur={onBlur}
                    onChange={customOnChange}
                    error={formik.touched[input.name] && Boolean(formik.errors[input.name])}
                    helperText={formik.touched[input.name] && formik.errors[input.name]}
                    fullWidth={input.fullWidth}
                  />
                </div>
              );
            })}
            <div className={s.wrapper}>
              <div className={s.greayWords}>Роль</div>
              <FormControl>
                <Select name="roleId" value={formik.values.roleId} onChange={formik.handleChange}>
                  {roles.map((role: IRole, index: number) => (
                    <MenuItem key={`${role.name}_${index}`} value={role.id}>
                      {role.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </form>
        ) : (
          <>
            <EditIcon onClick={handleOnEdited} className={s.editIcon} />
            {inputs.map((input, index) => (
              <div className={s.wrapper} key={`${input.title}_${index}`}>
                <div className={s.greayWords}>{input.title}</div>
                <div className={s.normalWords}>{formik.values[input.name]}</div>
              </div>
            ))}
            <div className={s.wrapper}>
              <div className={s.greayWords}>Роль</div>
              <div className={s.normalWords}>{user!.role.name}</div>
            </div>
          </>
        )}
      </div>

      <div className={s.rightSide}>
        <div className={s.rightBody}>
          <div className={s.imageContainer}>
            <Delete onClick={onDeleteAvatar} className={s.deleteImg} />
            <label htmlFor="avatar" className={s.avatarOverlay}>
              <span>
                <AddAPhotoIcon style={{ color: 'white' }} />
              </span>
              <input id="avatar" type="file" onChange={onChangeAvatar} />
            </label>
            {avatarLink ? (
              <Avatar alt="avatar" src={`${root}/users/avatar/${avatarLink}`} className={classes.large} />
            ) : (
              <Avatar alt="avatar" className={classes.large}>
                {`${user!.lastName.charAt(0)} ${user!.firstName.charAt(0)}`}
              </Avatar>
            )}
          </div>
          <div className={s.possibleImgParams}>
            <div className={s.possibleImgParamsText}>*Розмір фото не має перевищувати 10 Мб</div>
            <div className={s.possibleImgParamsText}>*Підтримувані формати фото: png, jpg, jpeg, gif</div>
          </div>
        </div>
      </div>
    </div>
  );
}
