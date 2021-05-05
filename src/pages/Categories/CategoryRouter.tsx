import React, { lazy, Suspense, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch, Switch, Route } from 'react-router-dom';
import { LinearProgress } from '@material-ui/core';

import { fetchCategories, getCategoryByIdRequest } from '../../store/actions/categories.actions';
import { AppDispatch, RootState } from '../../store/store';
import { CategoryToDisplay } from './CategoryInfo/categoryToDisplayReducer';

interface MatchParams {
  id: string;
}

const CategoryInfoLazy = lazy(() => import('./CategoryInfo/CategoryInfo'));

const CategoryRouter: React.FC = () => {
  const match = useRouteMatch<MatchParams>();
  const dispatch: AppDispatch = useDispatch();

  const memoId = useMemo(() => match.params.id, [match.params.id]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    memoId && dispatch(getCategoryByIdRequest(Number(memoId)));
  }, [dispatch, memoId]);

  const category: CategoryToDisplay = useSelector(
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
