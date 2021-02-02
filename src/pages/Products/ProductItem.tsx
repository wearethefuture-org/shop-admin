import React from 'react';
import useProductById from '../../hooks/useProductById';
import Item from '../../components/Item/Item';
import { LinearProgress } from '@material-ui/core';

const ProductItem: React.FC = (props: any) => {
  const { data } = useProductById(props.id);
  if (!data.id) {
    return (
      <LinearProgress />
    )
  }
  return (
    <Item {...data} />
  )
}

export default ProductItem;