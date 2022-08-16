import { FormControl, Select, MenuItem, TextField, Button } from '@material-ui/core';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import EditIcon from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import Avatar from 'react-avatar';
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
import style from './Profile.module.scss';
import { root } from './../../api/config';

export default function Profile() {
  const dispatch = useDispatch();
  const { roles } = useRoles();
  const { user, avatarLink } = useSelector((state: RootState) => state.user);
  const [isBeingEdited, setIsBeingEdited] = React.useState<boolean>(false);
  const phoneRegExp = /\+\d\d\d\s\d\d\s\d\d\d\s\d\d\s\d\d/;
  const formik = useFormik({
    initialValues: {
      id: user!.id,
      lastName: `${user!.lastName}`,
      firstName: `${user!.firstName}`,
      phoneNumber: `${user!.phoneNumber}`,
      email: `${user!.email}`,
      roleId: user!.role.id,
    },
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
    onSubmit: (values) => onSaveSubmit(values),
  });
  const inputs = [
    {
      title: 'Призвіще',
      name: 'lastName',
      type: 'text',
      fullWidth: false,
    },
    {
      title: "Ім'я",
      name: 'firstName',
      type: 'text',
      fullWidth: false,
    },
    {
      title: 'Номер Телефону',
      name: 'phoneNumber',
      type: 'tel',
      fullWidth: false,
    },
    {
      title: 'Пошта',
      name: 'email',
      type: 'email',
      fullWidth: true,
    },
  ];

  const handleOnEdited = () => {
    setIsBeingEdited(!isBeingEdited);
    if (isBeingEdited) formik.resetForm();
  };
  const onSaveSubmit = (formikValues) => {
    dispatch(updateProfileUserReq(formikValues));
    setIsBeingEdited(false);
  };
  const onChangeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const availableFormats = ['png', 'jpg', 'jpeg', 'gif'];
    const imageFormat = e.target.files![0].type.replace(/image[/]/, '');
    if (!availableFormats.includes(imageFormat)) {
      dispatch(failSnackBar('Підтримувані формати фото: png, jpg, jpeg, gif'));
      return;
    }
    const imageSize = e.target.files![0]?.size;
    if (imageSize > 10000000) {
      dispatch(failSnackBar('Розмір зображення не повинен перевищувати 10 Мб'));
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

  return (
    <div className={style.page}>
      <div className={style.leftSide}>
        {isBeingEdited ? (
          <form onSubmit={formik.handleSubmit}>
            <div className={style.cancelSave}>
              <Button type="submit" variant="contained" color="primary" size="small">
                Зберегти
              </Button>
              <Button onClick={handleOnEdited} variant="contained" color="secondary" size="small">
                Скасувати
              </Button>
            </div>
            {inputs.map((input, index) => (
              <div className={style.wrapper} key={`${input.title}_${index}`}>
                <div className={style.greayWords}>{input.title}</div>
                <TextField
                  size="small"
                  variant="standard"
                  type={input.type}
                  {...formik.getFieldProps(input.name)}
                  error={formik.touched[input.name] && Boolean(formik.errors[input.name])}
                  helperText={formik.touched[input.name] && formik.errors[input.name]}
                  fullWidth={input.fullWidth}
                />
              </div>
            ))}
            <div className={style.wrapper}>
              <div className={style.greayWords}>Роль</div>
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
            <EditIcon onClick={handleOnEdited} className={style.editIcon} />
            {inputs.map((input, index) => (
              <div className={style.wrapper} key={`${input.title}_${index}`}>
                <div className={style.greayWords}>{input.title}</div>
                <div className={style.normalWords}>{formik.values[input.name]}</div>
              </div>
            ))}
            <div className={style.wrapper}>
              <div className={style.greayWords}>Роль</div>
              <div className={style.normalWords}>{user!.role.name}</div>
            </div>
          </>
        )}
      </div>

      <div className={style.rightSide}>
        <div className={style.rightBody}>
          <div className={style.imageContainer}>
            <Delete onClick={onDeleteAvatar} className={style.deleteImg} />
            <label htmlFor="avatar" className={style.avatarOverlay}>
              <span>
                <AddAPhotoIcon style={{ color: 'white' }} />
              </span>
              <input id="avatar" type="file" onChange={onChangeAvatar} />
            </label>
            {avatarLink ? (
              <Avatar
                size="150"
                name={`${user?.lastName} ${user?.firstName}`}
                round={true}
                src={`${root}/users/avatar/${avatarLink}`}
              />
            ) : (
              <Avatar
                size="150"
                name={`${user?.lastName} ${user?.firstName}`}
                round={true}
              />
            )}
          </div>
          <div className={style.possibleImgParams}>
            <div className={style.possibleImgParamsText}>*Розмір фото не має перевищувати 10 Мб</div>
            <div className={style.possibleImgParamsText}>*Підтримувані формати фото: png, jpg, jpeg, gif</div>
          </div>
        </div>
      </div>
    </div>
  );
}
