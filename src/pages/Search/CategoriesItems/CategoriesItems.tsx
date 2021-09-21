import React, { FC, Dispatch, SetStateAction, useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../../store/store';
import { getTreeCategoriesRequest } from '../../../store/actions/treeCategories.actions';

import { LinearProgress } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import styles from './CategoriesItems.module.scss';
import Pagination from '@material-ui/lab/Pagination';

import { useHistory } from 'react-router-dom';
import { IGetTreeCategoriesResponse } from '../../../interfaces/ITreeCategory';

interface CategoriesItemsProps {
  searchResults: IGetTreeCategoriesResponse[];
  searchValue: string;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  totalPages: number;
  loading: boolean;
}

const CategoriesItems: FC<CategoriesItemsProps> = ({
  searchResults,
  searchValue,
  page,
  setPage,
  totalPages,
  loading,
}) => {
  const handleChange = (event, value) => {
    setPage(value);
  };
  const [updatedResults, setResults] = useState<any>();
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();
  const list = useSelector((state: RootState) => state.treeCategories.list);

  const handleClick = (id: number, mpath: string) => {
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
        const mpath = category?.mpath?.split('.');
        let breadcrumbs = '';
        mpath?.forEach((n) => {
          if (!n) {
            breadcrumbs = breadcrumbs.substring(0, breadcrumbs.length - 3);
            return;
          }
          breadcrumbs += `${categoriesMap[n].name} > `;
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
              <div className={styles.resultsBlock}>
                <List>
                  {updatedResults?.length && !loading ? (
                    <>
                      {updatedResults.map((res) => {
                        return (
                          <ListItem key={res.id}>
                            <span
                              className={styles.listItem}
                              onClick={() => handleClick(res.id, res.mpath)}
                            >
                              {res.name}
                            </span>
                          </ListItem>
                        );
                      })}
                    </>
                  ) : (
                    <p>Нажаль, нічого не знайдено.</p>
                  )}
                </List>
              </div>
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

export default CategoriesItems;
