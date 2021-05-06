import { LinearProgress } from '@material-ui/core';
import React, { lazy, Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch, Switch, Route } from 'react-router-dom';

import { getMainCategoryByIdRequest } from '../../store/actions/mainCategories.actions';
import { AppDispatch, RootState } from '../../store/store';
import { IMainCategoryResponse } from '../../interfaces/IMainCategory';

interface MatchParams {
  id: string;
}

const MainCategoryInfoLazy = lazy(() => import('./MainCategoryInfo/MainCategoryInfo'));

const MainCategoryRouter: React.FC = () => {
  const match = useRouteMatch<MatchParams>();
  const dispatch: AppDispatch = useDispatch();


  useEffect(() => {
    match.params.id && dispatch(getMainCategoryByIdRequest(Number(match.params.id)));
  }, [dispatch, match.params.id]);

  const mainCategory: IMainCategoryResponse = useSelector(
    (state: RootState) => state.mainCategories.currentMainCategory
  );
  const loading = useSelector((state: RootState) => state.mainCategories.loading);

  return (
    <>
      {loading && <LinearProgress />}

      {mainCategory ? (
        <Suspense fallback={null}>
          <Switch>
            <Route path={`${match.url}`} component={MainCategoryInfoLazy} />
          </Switch>
        </Suspense>
      ) : null}
    </>
  );
};

export default MainCategoryRouter;
