import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import ProductChar from './ProductChar/ProductChar';
import { AppDispatch, RootState } from '../../../../store/store';
import { getCategoryByIdRequest } from '../../../../store/actions/categories.actions';
import { ICategoryResponse } from '../../../../interfaces/ICategory';
import useCategories from '../../../../hooks/useCategories';
import styles from './ProductCharGroups.module.scss';

interface IProductChar {
  categoryName: string;
}

const ProductCharGroups: React.FC<IProductChar> = ({ categoryName }) => {
  const dispatch: AppDispatch = useDispatch();
  const location = useLocation();

  const { data: categories } = useCategories();

  const category: ICategoryResponse = useSelector(
    (state: RootState) => state.categories.currentCategory
  );

  // CATEGORY
  useEffect(() => {
    const category = categories.find((category) => category.name === categoryName);

    category && dispatch(getCategoryByIdRequest(category.id));
  }, [categoryName, dispatch, categories]);

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
