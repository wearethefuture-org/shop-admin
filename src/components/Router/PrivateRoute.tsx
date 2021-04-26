import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const user = useSelector<RootState>((state) => state.user.user);

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
