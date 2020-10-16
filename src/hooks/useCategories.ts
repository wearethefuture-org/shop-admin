import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { fetchCategories } from '../store/actions';
import {RootState} from '../store/store';


const UseCategories = () => {
   const dispatch = useDispatch();

   useEffect(() => {
           dispatch(fetchCategories());
   }, [dispatch]);

   return useSelector((state: RootState) => state.categories.list);
}

export default UseCategories;
