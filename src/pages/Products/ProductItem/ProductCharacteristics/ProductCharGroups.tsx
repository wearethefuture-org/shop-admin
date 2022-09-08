import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { Button, createStyles, makeStyles, ThemeOptions } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import ProductChar from './ProductChar/ProductChar';
import { AppDispatch, RootState } from '../../../../store/store';
import { getTreeCategoryByIdRequest } from '../../../../store/actions/treeCategories.actions';
import { IGetTreeCategoriesResponse } from '../../../../interfaces/ITreeCategory';
import useTreeCategories from '../../../../hooks/useTreeCategories';
import styles from './ProductCharGroups.module.scss';
import classNames from 'classnames';
import { COLORS } from '../../../../values/colors';

interface IProductChar {
  categoryId: number;
}

const useStyles = makeStyles(
  (): ThemeOptions =>
    createStyles({
      btn: {
        borderRadius: '30px',
        color: COLORS.primaryLight,
      },
      addCharBtn: {
        'backgroundColor': COLORS.primaryBlue,
        '&:hover': {
          backgroundColor: COLORS.secondaryBlue,
        },
      },
      addCharBtnDark: {
        'backgroundColor': COLORS.darkBlue,
        '&:hover': {
          backgroundColor: COLORS.secondaryDarkBlue,
        },
      },
    })
);

const ProductCharGroups: React.FC<IProductChar> = ({ categoryId }) => {
  const dispatch: AppDispatch = useDispatch();
  const location = useLocation();

  const { darkMode } = useSelector((state: RootState) => state.theme);
  const classes = useStyles();

  const { data: categories } = useTreeCategories();

  const category: IGetTreeCategoriesResponse = useSelector(
    (state: RootState) => state.treeCategories.currentTreeCategory
  );

  // CATEGORY
  useEffect(() => {
    dispatch(getTreeCategoryByIdRequest(categoryId));
  }, [categoryId, dispatch, categories]);

  return (
    <>
      {category ? (
        <>
          {!category.characteristicGroup.length && (
            <div>
              <p>Відсутні характеристики для даної категорії</p>
              <Link
                to={{
                  pathname: `/tree-category/${category.id}`,
                  state: { from: `${location.pathname}` },
                }}
              >
                <Button
                  className={classNames(classes.btn, darkMode ? classes.addCharBtnDark : classes.addCharBtn)}
                  variant="contained"
                  startIcon={<AddIcon />}
                  type="button"
                >
                  Додати характеристики
                </Button>
              </Link>
            </div>
          )}
          <div className={styles['additional-info-block-wrapper']}>
            {category?.characteristicGroup
              .sort((a, b) => a.id - b.id)
              .map((group) => (
                <div key={group.id}>
                  <p className={styles['group-wrapper']}>{group.name}</p>

                  {group.characteristic
                    .sort((a, b) => a.id - b.id)
                    .map((char) => (
                      <ProductChar key={char.id} char={char} />
                    ))}
                </div>
              ))}
          </div>
        </>
      ) : null}
    </>
  );
};

export default ProductCharGroups;
