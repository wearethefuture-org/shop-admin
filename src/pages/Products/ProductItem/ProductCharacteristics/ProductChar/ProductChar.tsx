import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import { IGetProductById } from '../../../../../interfaces/IProducts';
import { RootState } from '../../../../../store/store';
import { ICharResponse } from '../../../../../interfaces/ITreeCategory';
import { getValue } from './getValue';
import styles from './ProductChar.module.scss';

interface ProductCharProps {
  char: ICharResponse;
}

const ProductChar: FC<ProductCharProps> = ({ char }) => {
  const product: IGetProductById = useSelector((state: RootState) => state.products.currentProduct);

  const { darkMode } = useSelector((state: RootState) => state.theme);

  return (
    <div key={char.id} className={darkMode ? styles['char-wrapper-dark'] : styles['char-wrapper']}>
      <p key={char.id} className={styles['char-name']}>
        <span>{char.name}</span>
      </p>
      {getValue(char, product.characteristicValue) ? (
        <>{getValue(char, product.characteristicValue)}</>
      ) : (
        <div>-</div>
      )}
    </div>
  );
};

export default ProductChar;
