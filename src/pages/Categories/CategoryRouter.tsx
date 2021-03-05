import { LinearProgress } from '@material-ui/core';
import React, { lazy, Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch, Switch, Route } from 'react-router-dom';

import { getCategoryByIdRequest } from '../../store/actions/categories.actions';
import { AppDispatch, RootState } from '../../store/store';
import { ICategoryResponse } from '../../interfaces/ICategory';

interface MatchParams {
  id: string;
}

const CategoryInfoLazy = lazy(() => import('./CategoryInfo/CategoryInfo'));

const CategoryRouter: React.FC = () => {
  const match = useRouteMatch<MatchParams>();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    match.params.id && dispatch(getCategoryByIdRequest(Number(match.params.id)));
  }, [dispatch, match.params.id]);

  const category: ICategoryResponse = useSelector(
    (state: RootState) => state.categories.currentCategory
  );
  const loading = useSelector((state: RootState) => state.categories.loading);

  return (
    <>
      {loading && <LinearProgress />}

      {category ? (
        <Suspense fallback={null}>
          <Switch>
            <Route path={`${match.url}`} component={CategoryInfoLazy} />
          </Switch>
        </Suspense>
      ) : null}
    </>
  );
};

export default CategoryRouter;
