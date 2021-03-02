import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '../../../../store/store';
import { getCategoryByIdRequest } from '../../../../store/actions/categories.actions';
import { ICategoryResponse, ICharResponse } from '../../../../interfaces/ICategory';
import { IGetProductById, IProductCharResponse } from '../../../../interfaces/IProducts';
import useCategories from '../../../../hooks/useCategories';
import styles from './ProductCharacteristics.module.scss';

const getValue = (char: ICharResponse, productValues: IProductCharResponse[]) => {
  const charValue = productValues?.find(({ name }) => name === char.name);

  if (!charValue) return;

  const {
    stringValue,
    numberValue,
    enumValue,
    rangeValue,
    booleanValue,
    jsonValue,
    dateValue,
  } = charValue;

  const getTypeValue = () => {
    if (stringValue) {
      return (
        <div className={styles['char-values']}>
          <span>{stringValue}</span>
        </div>
      );
    } else if (numberValue) {
      return (
        <div className={styles['char-values']}>
          <span>{numberValue}</span>
        </div>
      );
    } else if (enumValue && enumValue.length) {
      return (
        <div className={styles['char-values']}>
          <ul className={styles['enum-values']}>
            {enumValue.map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      );
    } else if (rangeValue) {
      return (
        <div className={styles['char-values']}>
          <span>{rangeValue}</span>
        </div>
      );
    } else if (booleanValue) {
      return (
        <div className={styles['char-values']}>
          <span>{booleanValue === true ? 'Так' : 'Ні'}</span>
        </div>
      );
    } else if (dateValue) {
      return (
        <div className={styles['char-values']}>
          <span>{dateValue}</span>
        </div>
      );
    } else if (jsonValue) {
      return (
        <>
          {Object.values(jsonValue).length ? (
            <div className={styles['char-values']}>
              <p className={styles.jsonValue}>
                <span>{Object.values(jsonValue).join(' / ')}</span>
              </p>
            </div>
          ) : (
            <div className={styles['char-values-empty']}>-</div>
          )}
        </>
      );
    } else {
      return null;
    }
  };

  return getTypeValue();
};

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
