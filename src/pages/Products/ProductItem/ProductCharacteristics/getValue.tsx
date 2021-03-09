import React from 'react';

import { ICharResponse } from '../../../../interfaces/ICategory';
import { IProductCharResponse } from '../../../../interfaces/IProducts';
import styles from './ProductCharacteristics.module.scss';

export const getValue = (char: ICharResponse, productValues: IProductCharResponse[]) => {
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
