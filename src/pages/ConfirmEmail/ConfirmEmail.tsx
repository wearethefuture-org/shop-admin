import React from 'react';
import { Button } from '@material-ui/core';
import { useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import s from './ConfirmEmail.module.scss';
import { confirmChangeEmail } from './../../store/actions/user.action';
import { RootState } from './../../store/store';

export default function ConfirmEmail() {
  const dispatch = useDispatch();
  const push = useHistory().push;
  const params = useLocation().search;
  const { error, emailСhanged } = useSelector((state: RootState) => state.user);

  React.useEffect(() => {
    const [code, email, userId] = params.split('&').map((str) => str.split('=')[1]);
    dispatch(confirmChangeEmail(code, email, +userId));
  }, []);

  const goToProfile = () => push('/profile');
  const GoProfileButton = () => (
    <Button onClick={goToProfile} variant="contained" color="primary" size="large">
      Повернутися до профілю
    </Button>
  );

  const Content = ({ message }) => (
    <div className={s.page}>
      <div className={s.text}>{message}</div>
      {emailСhanged || error ? <GoProfileButton /> : null}
    </div>
  );

  if (emailСhanged) return <Content message="Ваш Email успішно змінено :)" />;
  if (error) return <Content message="Трапилась Помилка :(" />;
  return <Content message="Намагаюся змінити Email ;)" />;
}
