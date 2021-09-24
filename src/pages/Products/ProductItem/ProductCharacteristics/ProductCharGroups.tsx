import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import ProductChar from './ProductChar/ProductChar';
import { AppDispatch, RootState } from '../../../../store/store';
import { getTreeCategoryByIdRequest } from '../../../../store/actions/treeCategories.actions';
import { IGetTreeCategoriesResponse } from '../../../../interfaces/ITreeCategory';
import useTreeCategories from '../../../../hooks/useTreeCategories';
import styles from './ProductCharGroups.module.scss';

interface IProductChar {
  categoryId: number;
}

const ProductCharGroups: React.FC<IProductChar> = ({ categoryId }) => {
  const dispatch: AppDispatch = useDispatch();
  const location = useLocation();

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
                  pathname: `/category/${category.id}`,
                  state: { from: `${location.pathname}` },
                }}
              >
                <Button variant="contained" color="primary" startIcon={<AddIcon />} type="button">
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
