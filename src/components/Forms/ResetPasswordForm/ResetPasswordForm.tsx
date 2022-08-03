
import { Button } from "@material-ui/core";
import { ErrorMessage, Field, Form, FormikProvider, useFormik } from "formik"
import React, { useEffect, useState} from "react"
import { useHistory} from "react-router-dom";
import * as Yup from 'yup';
import { api } from "../../../api/api";
import GoBackBtn from "../../GoBackBtn/GoBackBtn";
import styles from './ResetPasswordForm.module.scss'

  
const validationSchema = Yup.object().shape({
    email: Yup.string().email('Неправильна адреса!').required('Це поле не повинно бути пустим!'),
  });

const ResetPasswordForm:React.FC = () => {
    const [successSendPassword, setSuccessSendPassword] = useState(false)
    const [invalidEmail, setInvalidEmail] = useState('')

    const history = useHistory();
    const handleGoBack = () => {
        history.push('/users');
      };

    const formik = useFormik({
        initialValues: {
            email: '',
          },
          validationSchema,
            onSubmit: async values => {
            try{
                setSuccessSendPassword(true)
                const res = await api.user.requestPasswordInstall(values)
                if(!res){
                  throw new SyntaxError("Помилка в даних");
                }
            }catch(e){
                throw e
            }
        },
      });

      useEffect(() => {
        formik.errors.email ? setInvalidEmail('reset_password__invalid') : setInvalidEmail('reset_password__valid')
      },[formik.errors])

    return(<div className={styles.reset_password}>
        <GoBackBtn handleGoBack={handleGoBack}></GoBackBtn>     
       <FormikProvider value={formik}>
           <Form onSubmit={formik.handleSubmit} className={styles.reset_password__form}>
          <h5 className={styles.reset_password__title}>
            Будь ласка, введіть адресу електронної пошти, для
            відновлення паролю:
          </h5>
            <div className={styles.reset_password__inp} >
               <Field type="email" name="email" placeholder="Write email" 
               className={`${styles.reset_password__field} ${styles[invalidEmail]}`}/>
               {successSendPassword ? 
               <h6 className={styles.reset_password__succes}>
                   Дякуємо! Лист з посиланням на встановлення паролю
                    відправлено на пошту!</h6> : 
               <ErrorMessage name="email">{msg => <div className={styles.error}>{msg}</div>}</ErrorMessage>}
               </div>
               <Button type="submit" color="primary" variant="contained">Відправити</Button>
           </Form>
       </FormikProvider>
    </div>
    )
}

export default ResetPasswordForm