import { LinearProgress } from '@material-ui/core';
import React, { lazy, Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch, Switch, Route, useHistory } from 'react-router-dom';

import { getTreeCategoryByIdRequest } from '../../store/actions/treeCategories.actions';
import { AppDispatch, RootState } from '../../store/store';
import { IGetTreeCategoriesResponse } from '../../interfaces/ITreeCategory';

interface MatchParams {
  id: string;
}

const TreeCategoryInfoLazy = lazy(() => import('./TreeCategoryInfo/TreeCategoryInfo'));

const TreeCategoryRouter: React.FC = () => {
  const match = useRouteMatch<MatchParams>();
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    match.params.id && dispatch(getTreeCategoryByIdRequest(Number(match.params.id)));
  }, [dispatch, match.params.id]);

  const treeCategory: IGetTreeCategoriesResponse = useSelector(
    (state: RootState) => state.treeCategories.currentTreeCategory
  );
  const loading = useSelector((state: RootState) => state.treeCategories.loading);
  const error = useSelector((state: RootState) => state.treeCategories.error);

  useEffect(() => {
    if (!treeCategory && error?.length) {
      history.push('/tree-categories');
    }
  }, [loading, treeCategory]);

  return (
    <>
      {loading && <LinearProgress />}

      {treeCategory ? (
        <Suspense fallback={null}>
          <Switch>
            <Route path={`${match.url}`} component={TreeCategoryInfoLazy} />
          </Switch>
        </Suspense>
      ) : null}
    </>
  );
};

export default TreeCategoryRouter;
