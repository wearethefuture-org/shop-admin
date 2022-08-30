
import { Alert, Button, Popover, PopoverBody } from "reactstrap";
import { ErrorMessage, Field, Form, FormikProvider, useFormik } from "formik"
import React, { useContext, useEffect, useState} from "react"
import { useHistory } from "react-router-dom";
import * as Yup from 'yup';
import { api } from "../../../api/api";
import { ResendMessageButton } from "../../buttons/resend-message-btn";
import GoBackBtn from "../../GoBackBtn/GoBackBtn";
import styles from './ResetPasswordForm.module.scss'
import { IUserItem } from '../../../interfaces/IUsers'

interface IUserContext {
  user: IUserItem | null;
  setGlobalUser: React.Dispatch<any>;
}
  
const validationSchema = Yup.object().shape({
    email: Yup.string().email('Неправильна адреса!').required('Це поле не повинно бути пустим!'),
  });

const ResetPasswordForm: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState('');
  const [isVisibleResend, setVisibleResend] = useState(false);
  const [isTimer, setIsTimer] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [popoverState, setPopoverState] = useState(
    'Користувач з такою електронною поштою не зареєстрований!'
  );

  const onShow = () => setVisible(true);
  const togglePop = () => setPopoverOpen(!popoverOpen);

  const history = useHistory();
  const handleGoBack = () => {
    history.push('/users');
  };

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const { data } = await api.user.requestPasswordInstall(values);
        
      if (isVisibleResend) {
        setIsTimer(true);
      }

      if (!data.success) {
        setPopoverState(data.message);
        togglePop();
        setTimeout(() => {
          setPopoverOpen(false);
        }, 10000);
        return;
      }

      resetForm();
      onShow();
      setVisibleResend(true);
    }
  });

  const UserContext = React.createContext<IUserContext>({
    user: null,
    setGlobalUser: () => { },
  });

  const { user } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user]);


  useEffect(() => {
    formik.errors.email ? setInvalidEmail('reset_password__invalid') : setInvalidEmail('reset_password__valid')
  }, [formik.errors]);

  return (
    <div className={styles.reset_password}>
      <GoBackBtn handleGoBack={handleGoBack}></GoBackBtn>
      <FormikProvider value={formik}>
        <Form onSubmit={formik.handleSubmit} className={styles.reset_password__form}>
          <h5 className={styles.reset_password__title}>
            Будь ласка, введіть адресу електронної пошти, для
            відновлення паролю:
          </h5>
          <div className={styles.reset_password__inp} >
            <Field type="email" name="email" placeholder="Введіть пошту"
              className={`${styles.reset_password__field} ${styles[invalidEmail]}`} />
            <Alert  className={styles.reset_password__succes} isOpen={visible}>
              Дякуємо! Лист з посиланням на встановлення паролю
              відправлено на пошту!</Alert>
            <ErrorMessage name="email" render={msg => <div className={styles.error}>{msg}</div>}/>
          </div>
          <Popover placement="bottom" isOpen={popoverOpen} target="Popover">
            <PopoverBody>{popoverState}</PopoverBody>
          </Popover>
          {!isVisibleResend
            ? <Button id="Popover" type="submit" color="primary" variant="contained">Відправити</Button>
            : <ResendMessageButton
              isTimer={isTimer}
              title="Надіслати лист ще раз"
              action={() => setIsTimer(false)}
              submit={formik.handleSubmit}
              type="submit"
              spinnerColor="light"
            />
          }
        </Form>
      </FormikProvider>
    </div>
  );
};

export default ResetPasswordForm