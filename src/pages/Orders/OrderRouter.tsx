import React, { Suspense, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch, Switch, Route } from 'react-router-dom';
import { LinearProgress } from '@material-ui/core';

import { getOrderByIdRequest } from '../../store/actions/orders.actions';
import { AppDispatch, RootState } from '../../store/store';
import OrderItem from './OrderItem/OrderItem';

interface MatchParams {
  id: string;
}

const OrderRouter: React.FC = () => {
  const match = useRouteMatch<MatchParams>();
  const dispatch: AppDispatch = useDispatch();

  const memoId = useMemo(() => match.params.id, [match.params.id]);

  useEffect(() => {
    memoId && dispatch(getOrderByIdRequest(Number(memoId)));
  }, [dispatch, memoId]);

  const order = useSelector((state: RootState) => state.orders.currentOrder);
  const loading = useSelector((state: RootState) => state.orders.loading);

  return (
    <>
      {loading && !!!order && <LinearProgress />}

      {order ? (
        <Suspense fallback={null}>
          <Switch>
            <Route path={`${match.url}`} component={OrderItem} />
          </Switch>
        </Suspense>
      ) : null}
    </>
  );
};

export default OrderRouter;
