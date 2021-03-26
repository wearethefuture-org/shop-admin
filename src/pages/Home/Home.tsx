import React from 'react';
import {Button, Form, FormGroup, Input, FormFeedback} from 'reactstrap';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {AppDispatch} from '../../store/store';

import classes from './Home.module.scss';
import {useDispatch} from "react-redux";
import {signInUserRequest} from "../../store/actions/user.action";
import {useHistory} from "react-router-dom";

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Неправальна адреса!').required('Це поле не повинно бути пустим!'),
    password: Yup.string().min(6, 'Пароль занадто короткий!').required('Це поле не повинно бути пустим!')
});


const Home: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const route = useHistory();


    const formik = useFormik({
        initialValues: {email: '', password: ''},
        validationSchema,
        onSubmit: async (_values, {setSubmitting}) => {
            setSubmitting(false);
            dispatch(signInUserRequest(_values, route));
        }
    });


    return (
        <div className={classes.home_div}>
            <Form onSubmit={formik.handleSubmit} className={classes.form}>
                <FormGroup>
                    <Input
                        type="email" name="email" id="email-field" placeholder="Введіть електронну пошту"
                        onChange={formik.handleChange} onBlur={formik.handleBlur}
                        invalid={!!(formik.errors.email && formik.touched.email)}
                    />
                    <FormFeedback>{formik.errors.email}</FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Input
                        type="password" name="password" id="password-field" placeholder="Введіть пароль"
                        onChange={formik.handleChange} onBlur={formik.handleBlur}
                        invalid={!!(formik.errors.password && formik.touched.password)}
                    />
                    <FormFeedback>{formik.errors.password}</FormFeedback>
                </FormGroup>
                <Button className={classes.form__login} type="submit" disabled={formik.isSubmitting}>Увійти</Button>

            </Form>
        </div>
    )
}

export default Home;
