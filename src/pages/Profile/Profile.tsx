import React from 'react'
import { useSelector } from 'react-redux';
import EditIcon from '@material-ui/icons/Edit';
import Delete from "@material-ui/icons/Delete";
import { FormControl, Select, MenuItem, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import style from './Profile.module.scss';
import { RootState } from './../../store/store';
import { IUserItem } from './../../interfaces/IUsers';
import { updateProfileUserReq } from './../../store/actions/user.action';

export default function Profile() {
    const dispatch = useDispatch();
    const user = useSelector<RootState, IUserItem | null>((state) => state.user.user);
    const possibleSelectValues = ["admin", "moderator", "user"];
    const [firstName, setFirstName] = React.useState<string>('');
    const [userLastName, setUserLastName] = React.useState<string>('');
    const [userPhone, setUserPhone] = React.useState<string>('');
    const [userEmail, setUserEmail] = React.useState<string>('');
    const [userRole, setUserRole] = React.useState<string>('');
    const [isBeingEdited, setIsBeingEdited] = React.useState<boolean>(false);

    React.useLayoutEffect(() => {
        setFirstName(user!.firstName);
        setUserLastName(user!.lastName);
        setUserPhone(user!.phoneNumber);
        setUserEmail(user!.email);
        setUserRole(user!.role.name);
    }, [isBeingEdited, user])

    const handleRoleChange = (e) => {
        setUserRole(e.target.value);
    }

    const handleUserNameChange = (e) => {
        setFirstName(e.target.value);
    }

    const handleUserLastNameChange = (e) => {
        setUserLastName(e.target.value);
    }

    const handleUserPhoneChange = (e) => {
        setUserPhone(e.target.value);
    }

    const handleUserEmailChange = (e) => {
        setUserEmail(e.target.value);
    }

    const handleOnEdited = () => {
        setIsBeingEdited(!isBeingEdited);
    }

    const onSaveSubmit = () => {
        const userData = {
            id: user!.id,
            firstName,
            lastName: userLastName,
            phoneNumber: userPhone,
            roleId: getRoleId(userRole),
            email: userEmail,
            }
        dispatch(updateProfileUserReq(userData));
        setIsBeingEdited(false);
    }

  return (
    <div className={style.page}>
        <div  className={style.leftSide}>
            {
            isBeingEdited ? 
            <>
                <div className={style.cancelSave}>
                    <Button onClick={onSaveSubmit} variant="contained" color="primary" size="small">Зберегти</Button>
                    <Button onClick={handleOnEdited} variant="contained" color="secondary" size="small">Скасувати</Button>
                </div>
                <div className={style.wrapper}>
                    <div className={style.greayWords}>Призвіще</div>
                    <TextField value={userLastName} onChange={handleUserLastNameChange} size='small' variant="standard" />
                </div>
                <div className={style.wrapper}>
                    <div className={style.greayWords}>Ім'я</div>
                    <TextField value={firstName} onChange={handleUserNameChange} size='small' variant="standard" />
                </div>
                <div className={style.wrapper}>
                    <div className={style.greayWords}>Номер телефону</div>
                    <TextField value={userPhone} onChange={handleUserPhoneChange} size='small' variant="standard" />
                </div>
                <div className={style.wrapper}>
                    <div className={style.greayWords}>Електронна пошла</div>
                    <TextField value={userEmail} onChange={handleUserEmailChange} size='small' variant="standard" />
                </div>
                <div className={style.wrapper}>
                    <div className={style.greayWords}>Роль</div>
                    <FormControl>
                        <Select value={userRole} onChange={handleRoleChange}>
                            {possibleSelectValues.map((item, index) => {
                                return <MenuItem key={`${item}_${index}`} value={item}>
                                            {item}
                                        </MenuItem>
                            })}
                        </Select>
                    </FormControl>
                </div>
            </>
            :
            <>
                <EditIcon onClick={handleOnEdited} className={style.editIcon} />
                <div className={style.wrapper}>
                    <div className={style.greayWords}>Призвіще</div>
                    <div className={style.normalWords}>{userLastName}</div>
                </div>
                <div className={style.wrapper}>
                    <div className={style.greayWords}>Ім'я</div>
                    <div className={style.normalWords}>{firstName}</div>
                </div>
                <div className={style.wrapper}>
                    <div className={style.greayWords}>Номер телефону</div>
                    <div className={style.normalWords}>{userPhone}</div>
                </div>
                <div className={style.wrapper}>
                    <div className={style.greayWords}>Електронна пошла</div>
                    <div className={style.normalWords}>{userEmail}</div>
                </div>
                <div className={style.wrapper}>
                    <div className={style.greayWords}>Роль</div>
                    <div className={style.normalWords}>{userRole}</div>
                </div>
            </>
            }
        </div>

        <div className={style.rightSide}>
            <div className={style.rightBody}>
                <div className={style.imageContainer}>
                    <Delete className={style.deleteImg} />
                    <img className={style.img} />
                </div>
                <div className={style.possibleImgParams}>
                    <div className={style.possibleImgParamsText}>*Розмір фото не має перевищувати 10 Мб</div>
                    <div className={style.possibleImgParamsText}>*Підтримувані формати фото: png, jpg, jpeg, gif</div>
                </div>
            </div>
        </div>
    </div>
  )
}

function getRoleId(roleName: string): number {
    if (roleName === 'user') return 3;
    if (roleName === 'moderator') return 2;
    return 1;
}
