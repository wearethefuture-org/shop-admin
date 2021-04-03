import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Redirect, useLocation } from 'react-router-dom';

const InitRedirect: React.FC = () => {
  const userState = useSelector((state: RootState) => {
    return state.user;
  });
  const existPath = [
    /\/dashboard/i,
    /\/dashboard/i,
    /\/categories/i,
    /\/products/i,
    /\/statistic/i,
    /\/users/i,
    /\/slides/i,
    /\/settings/i,
    /\/settings/i,
    /\/product\/add/i,
    /\/product\/\d*/i,
    /\/category\/\d*/i,
  ];
  const location = useLocation();
  const [user, setUser] = useState(userState);

  useEffect(() => {
    const initState = () => {
      setUser(userState);
    };
    initState();
  });

  return (
    <Redirect
      to={
        !user.isLoggedIn
          ? '/home'
          : user.isLoggedIn && user.isLoggedNow
          ? '/dashboard'
          : location.pathname === '/home' ||
            existPath.findIndex((path) => {
              return path.exec(location.pathname);
            })
          ? '/dashboard'
          : location.pathname
      }
    />
  );
};
export default InitRedirect;
