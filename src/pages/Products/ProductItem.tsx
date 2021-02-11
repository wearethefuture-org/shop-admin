import React from 'react';
import useProductById from '../../hooks/useProductById';
import Item from '../../components/Item/Item';
import { LinearProgress } from '@material-ui/core';

const ProductItem: React.FC = (props: any) => {
  const { data } = useProductById(props.id);
  const { id, name, price, description, category, key, files, mainImg, createdAt, updatedAt } = data;
  const complexGrid = {
    id, name, price, description, category, url_key: key, files, mainImg, createdAt, updatedAt
  }
  if (!data.id) {
    return (
      <LinearProgress />
    )
  }
  return (
    <Item {...complexGrid} />
  )
}

export default ProductItem;