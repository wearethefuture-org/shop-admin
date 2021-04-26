import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IUserState } from '../../interfaces/IUsers';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const user = useSelector<IUserState>((state) => state.user);

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/home', state: { from: props.location } }} />
        )
      }
    />
  );
};

export default PrivateRoute;
