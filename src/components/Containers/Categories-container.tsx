import React, { useEffect } from 'react';
import CategoriesTable from '../Tables/Categories/Categories-table';

import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import { REQUEST_CATEGORIES } from '../../store/types';

const CategoriesContainer:React.FC = () => {
  const data = useSelector((state: RootState) => state.categories.list);
  const dispatch = useDispatch();

  useEffect(() => {
          dispatch({type: REQUEST_CATEGORIES});
  }, []);


  return <CategoriesTable data={data} />
}

export default CategoriesContainer;