import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '../../../../store/store';
import { getCategoryByIdRequest } from '../../../../store/actions/categories.actions';
import { ICategoryResponse } from '../../../../interfaces/ICategory';
import { IGetProductById } from '../../../../interfaces/IProducts';
import useCategories from '../../../../hooks/useCategories';
import { getValue } from './getValue';
import styles from './ProductCharacteristics.module.scss';

interface IProductChar {
  categoryName: string;
}

const ProductCharacteristics: React.FC<IProductChar> = ({ categoryName }) => {
  const dispatch: AppDispatch = useDispatch();

  const { data: categories } = useCategories();

  const category: ICategoryResponse = useSelector(
    (state: RootState) => state.categories.currentCategory
  );

  const product: IGetProductById = useSelector((state: RootState) => state.products.currentProduct);

  const { darkMode } = useSelector((state: RootState) => state.theme);

  // CATEGORY
  useEffect(() => {
    const category = categories.find((category) => category.name === categoryName);

    category && dispatch(getCategoryByIdRequest(category.id));
  }, [categoryName, dispatch, categories]);

  return (
    <>
      {category ? (
        <div className={darkMode ? styles['additional-info-block-dark'] : ''}>
          {category?.characteristicGroup.map((group) => (
            <div key={group.id}>
              <div className={darkMode ? styles['group-wrapper-dark'] : styles['group-wrapper']}>
                <span className={styles['group-name']}>{group.name}</span>
              </div>

              <div>
                {group.characteristic
                  .sort((a, b) => a.id - b.id)
                  .map((char) => (
                    <div
                      key={char.id}
                      className={darkMode ? styles['char-wrapper-dark'] : styles['char-wrapper']}
                    >
                      <div className={styles['char-block']}>
                        <div className={styles['char-name-wrapper']}>
                          <p key={char.id} className={styles['char-name']}>
                            {char.name}:
                          </p>
                          {getValue(char, product.characteristicValue) ? (
                            <>{getValue(char, product.characteristicValue)}</>
                          ) : (
                            <div className={styles['char-values-empty']}>-</div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
};

export default ProductCharacteristics;
