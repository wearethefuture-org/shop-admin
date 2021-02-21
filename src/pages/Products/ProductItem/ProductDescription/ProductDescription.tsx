import React from 'react';

import styles from './ProductDescription.module.scss';

const ProductDescription = ({ product }) => {
  return (
    <div className={styles.description}>
      <div className={styles.field}>
        <p className={styles.title}>ID:</p>
        <p className={styles.value}>{product.id}</p>
      </div>
      <div className={styles.field}>
        <p className={styles.title}>Назва:</p>
        <p className={styles.value}>{product.name}</p>
      </div>
      <div className={styles.field}>
        <p className={styles.title}>Ключ:</p>
        <p className={styles.value}>{product.key}</p>
      </div>
      <div className={styles.field}>
        <p className={styles.title}>Ціна:</p>
        <p className={styles.value}>{product.price}</p>
      </div>
      <div className={styles.field}>
        <p className={styles.title}>Опис:</p>
        <p className={styles.value}>{product.description}</p>
      </div>
      <div className={styles.field}>
        <p className={styles.title}>Створено:</p>
        <p className={styles.value}>{product.createdAt}</p>
      </div>
      <div className={styles.field}>
        <p className={styles.title}>Оновлено:</p>
        <p className={styles.value}>{product.updatedAt}</p>
      </div>
    </div>
  );
};

export default ProductDescription;
