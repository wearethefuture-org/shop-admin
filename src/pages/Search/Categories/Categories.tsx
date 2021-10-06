import React, { FC, useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../../store/store';
import { getTreeCategoriesRequest } from '../../../store/actions/treeCategories.actions';

import { LinearProgress } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import styles from './Categories.module.scss';
import Pagination from '@material-ui/lab/Pagination';

import { useHistory } from 'react-router-dom';
import { IGetTreeCategoriesResponse } from '../../../interfaces/ITreeCategory';
import CategoriesItems from './CategoriesItems/CategoriesItems';

interface CategoriesItemsProps {
  searchResults: IGetTreeCategoriesResponse[];
  searchValue: string;
  page: number;
  onPageChanged: (page: number) => void;
  totalPages: number;
  loading: boolean;
}

const Categories: FC<CategoriesItemsProps> = ({
  searchResults,
  searchValue,
  page,
  onPageChanged,
  totalPages,
  loading,
}) => {
  const handleChange = (event, value) => {
    onPageChanged(value);
  };
  const [updatedResults, setResults] = useState<IGetTreeCategoriesResponse[]>();
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();
  const list = useSelector((state: RootState) => state.treeCategories.list);

  const handleClick = (id: number, mpath?: string) => {
    const mpathSplit = mpath?.split('.');
    history.push({
      pathname: '/tree-categories',
      state: {
        id,
        mpath: mpathSplit,
      },
    });
  };

  const categoriesMap = useMemo(() => {
    const getCategoriesMap = (list) => {
      if (!list.length) {
        dispatch(getTreeCategoriesRequest());
      } else {
        let updatedList: any = [];
        (function pushRecursive(list) {
          list.forEach((item) => {
            updatedList.push(item);
            if (item.children.length) {
              pushRecursive(item.children);
            }
          });
        })(list);

        const categoriesAsObject = {};
        updatedList.forEach((i) => {
          categoriesAsObject[i.id] = i;
        });
        return categoriesAsObject;
      }
    };
    return getCategoriesMap(list);
  }, [list, dispatch]);

  useEffect(() => {
    if (categoriesMap && searchResults) {
      searchResults.forEach((category) => {
        const mpath = category?.mpath?.split('.').slice(0, -1);
        let breadcrumbs = '';
        mpath?.forEach((n, i) => {
          breadcrumbs += `${categoriesMap[n].name}`;
          if (i < mpath.length - 1) {
            breadcrumbs += ' > ';
          }
        });
        category.name = breadcrumbs;
      });
    }
    setResults(searchResults);
  }, [searchResults, categoriesMap]);

  return (
    <>
      {loading ? (
        <LinearProgress />
      ) : (
        <div>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" className={styles.title}>
                Результати пошуку за запитом "{searchValue}" по категоріям:
              </Typography>
              <CategoriesItems list={updatedResults} handleClick={handleClick} />
            </Grid>
          </Grid>
          <Pagination
            className={styles.pagination}
            count={totalPages}
            page={page}
            onChange={handleChange}
          />
        </div>
      )}
    </>
  );
};

export default Categories;
