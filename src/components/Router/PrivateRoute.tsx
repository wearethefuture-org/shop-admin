import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { IUserItem } from '../../interfaces/IUsers';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const user = useSelector<RootState, IUserItem | null>((state) => state.user.user);
  const isFetching = useSelector<RootState>((state) => state.user.isFetching);

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          <Component {...props} />
        ) : (
          !isFetching && <Redirect to={{ pathname: '/home', state: { from: props.location } }} />
        )
      }
    />
  );
};

export default PrivateRoute;
