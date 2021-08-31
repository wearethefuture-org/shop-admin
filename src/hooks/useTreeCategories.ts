import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IGetTreeCategoriesResponse } from '../interfaces/ITreeCategory';
import { getTreeCategoriesRequest } from '../store/actions/treeCategories.actions';
import { AppDispatch, RootState } from '../store/store';

const useTreeCategories = () => {
	const dispatch: AppDispatch = useDispatch();

	useEffect(() => {
		dispatch(getTreeCategoriesRequest());
	}, [dispatch]);

	const data: IGetTreeCategoriesResponse[] = useSelector(
		(state: RootState) => state.treeCategories.list
	);

	return { data, dispatch };
};

export default useTreeCategories;
