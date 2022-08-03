import React from 'react';

import { ICharResponse } from '../../../../../interfaces/ITreeCategory';
import { IProductCharResponse, Type } from '../../../../../interfaces/IProducts';
import styles from './ProductChar.module.scss';

export const getValue = (char: ICharResponse, productValues: IProductCharResponse[]) => {
  const value = productValues?.find(({ name }) => name === char.name);

  if (!value) return;

  const {
    type,
    stringValue,
    numberValue,
    enumValue,
    rangeValue,
    booleanValue,
    jsonValue,
    dateValue,
  } = value;

  switch (type) {
    case Type.string:
      if (stringValue) {
        return (
          <div className={styles['char-values']}>
            <span>{stringValue}</span>
          </div>
        );
      }
      break;

    case Type.number:
      if (numberValue) {
        return (
          <div className={styles['char-values']}>
            <span>{numberValue}</span>
          </div>
        );
      }
      break;

    case Type.enum:
      if (enumValue && enumValue.length) {
        return (
          <div className={styles['char-values']}>
            <ul className={styles['enum-values']}>
              {enumValue.map((value) => (
                <li key={value}>{value}</li>
              ))}
            </ul>
          </div>
        );
      }
      break;

    case Type.range:
      if (rangeValue) {
        return (
          <div className={styles['char-values']}>
            <span>{rangeValue}</span>
          </div>
        );
      }
      break;

    case Type.boolean:
      if (String(booleanValue)) {
        return (
          <div className={styles['char-values']}>
            <span>{String(booleanValue) === 'true' ? 'Так' : 'Ні'}</span>
          </div>
        );
      }
      break;

    case Type.date:
      if (dateValue) {
        return (
          <div className={styles['char-values']}>
            <span>{dateValue}</span>
          </div>
        );
      }
      break;

    case Type.json:
      if (jsonValue) {
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
      }
      break;

    default:
      return null;
  }
};
