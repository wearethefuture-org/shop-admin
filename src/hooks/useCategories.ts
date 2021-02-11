import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../store/actions';
import { RootState } from '../store/store';


const useCategories = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchCategories());
	}, [dispatch]);

	const data = useSelector((state: RootState) => state.categories.list);
	return { data, dispatch };
}

export default useCategories;
