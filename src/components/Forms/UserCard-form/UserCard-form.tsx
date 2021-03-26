import React, {useState} from 'react';
import {
    Button,
    Form,
    FormGroup,
    Input,
    FormFeedback,
    Row,

} from 'reactstrap';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {AppDispatch} from '../../../store/store';
import classes from './UserCard-form.module.scss'
import {useDispatch} from "react-redux";
import {addUserRequest, getUsersRequest, updateUserRequest} from "../../../store/actions/users.actions";
import {IUserItem} from "../../../interfaces/IUsers";


interface FormDialogProps {
    isNew: boolean;
    user: IUserItem | null
    closeModal: () => void
}

const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/

const roles = [
    {id: 0, name: "user", description: "lorem ipsum"},
    {id: 1, name: "admin", description: "lorem ipsum"},
    {id: 2, name: "moderator", description: "lorem ipsum"}
];


const UserCardForm: React.FC<FormDialogProps> = ({isNew, user, closeModal}) => {
    const validationSchema = Yup.object().shape({
        firstName: Yup.string().min(3, 'Введіть коректне ім\'я').required('Це поле не повинно бути пустим!'),
        lastName: Yup.string().min(2, 'Введіть коректне прізвище').required('Це поле не повинно бути пустим!'),
        tel: Yup.string().matches(phoneRegExp, 'Неправильний номер').max(13, 'Неправильний номер'),
        email: Yup.string().email('Неправальна адреса!').required('Це поле не повинно бути пустим!'),
        creditCard: Yup.string().required('Це поле не повинно бути пустим!'),
        role_id: Yup.string().required('Це поле не повинно бути пустим!'),
        password: isNew ? Yup.string().min(6, 'Пароль занадто короткий!').required('Це поле не повинно бути пустим!') :
            Yup.string().min(6, 'Пароль занадто короткий!'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Пароль не співпадає')
    });
    const [isEdit, setIsEdt] = useState(isNew );
    const dispatch: AppDispatch = useDispatch();
    const initialValues = {
        firstName: isNew ? '' : user?.firstName,
        lastName: isNew ? '' : user?.lastName,
        tel: isNew ? '' : user?.tel,
        creditCard: isNew ? '' : user?.creditCard,
        email: isNew ? '' : user?.email,
        role_id: isNew ? 0 : user?.role.id,
        password: '',
        confirmPassword: '',
    }
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema,
        onSubmit: async (_values, {setSubmitting}) => {
            setSubmitting(false);
            isNew ? dispatch(addUserRequest({
                firstName: _values.firstName ? _values.firstName : '',
                lastName: _values.lastName ? _values.lastName : '',
                creditCard: _values.creditCard ? _values.creditCard : '',
                tel: _values.tel ? _values.tel : '',
                role_id: _values.role_id ? _values.role_id : 0,
                password: _values.password ? _values.password : '',
                email: _values.email ? _values.email : '',


            })) : dispatch(updateUserRequest(user?.id ? user?.id : 0, {
                id: user?.id?user?.id:0,
                firstName: _values.firstName ? _values.firstName : '',
                lastName: _values.lastName ? _values.lastName : '',
                creditCard: _values.creditCard ? _values.creditCard : '',
                tel: _values.tel ? _values.tel : '',
                role_id: _values.role_id ? _values.role_id : 0,
                password: _values.password ? _values.password : '',
                email: _values.email ? _values.email : '',


            }));
            dispatch(getUsersRequest());
            closeModal();
        }
    });
    const edit = () => {
        setIsEdt(true);
    }

    return (
        <Form onSubmit={formik.handleSubmit} className={classes.form}>
            <FormGroup>
                <Input
                    value={formik.values.firstName}
                    disabled={!isEdit}
                    type='text'
                    name='firstName'
                    id='firstName-field'
                    placeholder='Iм&#39;я'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    invalid={!!(formik.errors.firstName && formik.touched.firstName)}
                />
                <FormFeedback>{formik.errors.firstName}</FormFeedback>
            </FormGroup>
            <FormGroup>
                <Input
                    value={formik.values.lastName}
                    disabled={!isEdit}
                    type='text'
                    name='lastName'
                    id='lastName-field'
                    placeholder='Прізвище'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    invalid={!!(formik.errors.lastName && formik.touched.lastName)}
                />
                <FormFeedback>
                    {formik.errors.lastName}
                </FormFeedback>
            </FormGroup>
            <FormGroup>
                <Input
                    value={formik.values.tel}
                    disabled={!isEdit}
                    type="tel"
                    name="tel"
                    id="tel-field"
                    placeholder="Номер телефону"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    invalid={!!(formik.errors.tel && formik.touched.tel)}
                />
                <FormFeedback>
                    {formik.errors.tel}
                </FormFeedback>
            </FormGroup>
            <FormGroup>
                <Input
                    value={formik.values.email}
                    disabled={!isEdit}
                    type="email"
                    name="email"
                    id="email-field"
                    placeholder="Електронна пошта"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    invalid={!!(formik.errors.email && formik.touched.email)}
                />
                <FormFeedback>
                    {formik.errors.email}
                </FormFeedback>
            </FormGroup>
            <FormGroup>
                <Input
                    value={formik.values.role_id}
                    className={classes.inputSelect}
                    disabled={!isEdit}
                    type="select"
                    name="role_id"
                    id={"role_id-field"}
                    placeholder={'роль'}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    invalid={!!(formik.errors.email && formik.touched.email)}
                >
                    {
                        roles.map(role => {
                            return (<option key={'option' + role.id} value={role.id}>{role.name}</option>)
                        })
                    }
                </Input>
                <FormFeedback>
                    {formik.errors.role_id}
                </FormFeedback>

            </FormGroup>
            <FormGroup>
                <Input
                    value={formik.values.creditCard}
                    disabled={!isEdit}
                    type="text"
                    name="creditCard"
                    id="creditCard-field"
                    placeholder="ВВедить кредтну картку"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    invalid={!!(formik.errors.creditCard && formik.touched.creditCard)}
                />
                <FormFeedback>
                    {formik.errors.creditCard}
                </FormFeedback>
            </FormGroup>
            <FormGroup>
                <Input
                    autoComplete={"false"}
                    disabled={!isEdit}
                    type="password"
                    name="password"
                    id="password-field"
                    placeholder="Пароль (6 символів)"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    invalid={!!(formik.errors.password && formik.touched.password)}
                />
                <FormFeedback>
                    {formik.errors.password}
                </FormFeedback>
            </FormGroup>
            <FormGroup>
                <Input
                    autoComplete={"false"}
                    disabled={!isEdit}
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword-field"
                    placeholder="Підтвердіть пароль"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    invalid={!!(formik.errors.confirmPassword && formik.touched.confirmPassword)}
                />
                <FormFeedback>
                    {formik.errors.confirmPassword}
                </FormFeedback>
            </FormGroup>
            <Row>
                {isEdit ?
                    <Button
                        className={classes.form__register}
                        type="submit"
                        disabled={formik.isSubmitting}>
                        Змінити
                    </Button> :
                    <Button
                        className={classes.form__register}
                        onClick={edit}
                    >
                        Редагувати
                    </Button>
                }
            </Row>
        </Form>
    )
}

export default UserCardForm;
