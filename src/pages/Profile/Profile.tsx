import { FormControl, Select, MenuItem, TextField, Button } from '@material-ui/core';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import EditIcon from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Avatar from 'react-avatar';
import React from 'react';

import {
  updateProfileUserReq,
  deleteAvatarRequest,
  addAvatarRequest,
} from './../../store/actions/user.action';
import { failSnackBar } from './../../store/actions/snackbar.actions';
import { RootState } from './../../store/store';
import style from './Profile.module.scss';
import { root } from './../../api/config';

export default function Profile() {
  const dispatch = useDispatch();
  const { user, avatarLink } = useSelector((state: RootState) => state.user);
  const possibleSelectValues = ['admin', 'moderator', 'user'];
  const [userLastName, setUserLastName] = React.useState<string>('');
  const [firstName, setFirstName] = React.useState<string>('');
  const [userPhone, setUserPhone] = React.useState<string>('');
  const [userEmail, setUserEmail] = React.useState<string>('');
  const [userRole, setUserRole] = React.useState<string>('');
  const [isBeingEdited, setIsBeingEdited] = React.useState<boolean>(false);
  const handleUserLastNameChange = (e) => setUserLastName(e.target.value);
  const handleUserNameChange = (e) => setFirstName(e.target.value);
  const handleUserPhoneChange = (e) => setUserPhone(e.target.value);
  const handleUserEmailChange = (e) => setUserEmail(e.target.value);
  const handleRoleChange = (e) => setUserRole(e.target.value);
  const handleOnEdited = () => setIsBeingEdited(!isBeingEdited);
  const identificators = [
    {
      title: 'Призвіще',
      value: userLastName,
      func: handleUserLastNameChange,
      fullWidth: false,
    },
    {
      title: "Ім'я",
      value: firstName,
      func: handleUserNameChange,
      fullWidth: false,
    },
    {
      title: 'Номер телефону',
      value: userPhone,
      func: handleUserPhoneChange,
      fullWidth: false,
    },
    {
      title: 'Електронна пошла',
      value: userEmail,
      func: handleUserEmailChange,
      fullWidth: true,
    },
  ];

  React.useEffect(() => {
    setFirstName(user!.firstName);
    setUserLastName(user!.lastName);
    setUserPhone(user!.phoneNumber);
    setUserEmail(user!.email);
    setUserRole(user!.role.name);
  }, [isBeingEdited, user]);

  const onSaveSubmit = () => {
    const userData = {
      id: user!.id,
      firstName,
      lastName: userLastName,
      phoneNumber: userPhone,
      roleId: getRoleId(userRole),
      email: userEmail,
    };
    dispatch(updateProfileUserReq(userData));
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
          <>
            <div className={style.cancelSave}>
              <Button onClick={onSaveSubmit} variant="contained" color="primary" size="small">
                Зберегти
              </Button>
              <Button onClick={handleOnEdited} variant="contained" color="secondary" size="small">
                Скасувати
              </Button>
            </div>
            {identificators.map((identificator, index) => {
              return (
                <div className={style.wrapper} key={`${identificator.title}_${index}`}>
                  <div className={style.greayWords}>{identificator.title}</div>
                  <TextField
                    value={identificator.value}
                    onChange={identificator.func}
                    size="small"
                    variant="standard"
                    fullWidth={identificator.fullWidth}
                  />
                </div>
              );
            })}
            <div className={style.wrapper}>
              <div className={style.greayWords}>Роль</div>
              <FormControl>
                <Select value={userRole} onChange={handleRoleChange}>
                  {possibleSelectValues.map((item, index) => {
                    return (
                      <MenuItem key={`${item}_${index}`} value={item}>
                        {item}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
          </>
        ) : (
          <>
            <EditIcon onClick={handleOnEdited} className={style.editIcon} />
            {identificators.map((identificator, index) => {
              return (
                <div className={style.wrapper} key={`${identificator.title}_${index}`}>
                  <div className={style.greayWords}>{identificator.title}</div>
                  <div className={style.normalWords}>{identificator.value}</div>
                </div>
              );
            })}
            <div className={style.wrapper}>
              <div className={style.greayWords}>Роль</div>
              <div className={style.normalWords}>{userRole}</div>
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
            <Avatar
              size="150"
              name={`${user?.lastName} ${user?.firstName}`}
              round={true}
              src={user!.avatar ? `${root}/users/avatar/${avatarLink}` : ''}
            />
          </div>
          <div className={style.possibleImgParams}>
            <div className={style.possibleImgParamsText}>
              *Розмір фото не має перевищувати 10 Мб
            </div>
            <div className={style.possibleImgParamsText}>
              *Підтримувані формати фото: png, jpg, jpeg, gif
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getRoleId(roleName: string): number {
  if (roleName === 'user') return 3;
  if (roleName === 'moderator') return 2;
  return 1;
}
