import { LinearProgress } from '@material-ui/core';
import React, { lazy, Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch, Switch, Route } from 'react-router-dom';

import { getProductByIdRequest } from '../../store/actions';
import { RootState } from '../../store/store';

interface MatchParams {
  id: string;
}

const ProductItemLazy = lazy(() => import('./ProductItem/ProductItem'));
const EditProductLazy = lazy(
  () => import('../../components/Forms/Products/EditProduct/EditProduct')
);

const ViewProduct: React.FC = () => {
  const match = useRouteMatch<MatchParams>();
  const dispatch = useDispatch();

  useEffect(() => {
    match.params.id && dispatch(getProductByIdRequest(Number(match.params.id)));
  }, [dispatch, match]);

  const { currentProduct: product, loading } = useSelector((state: RootState) => state.products);

  return (
    <>
      {loading && <LinearProgress />}

      {product ? (
        <Suspense fallback={null}>
          <Switch>
            <Route path={`${match.url}/edit`} component={EditProductLazy} />
            <Route path={`${match.url}`} component={ProductItemLazy} />
          </Switch>
        </Suspense>
      ) : null}
    </>
  );
};

export default ViewProduct;
