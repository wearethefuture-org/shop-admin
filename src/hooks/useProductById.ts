import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '../store/actions';
import { RootState } from '../store/store';


const useProductById = (id: number) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchProductById(id));
    }, [dispatch, id]);

    const data = useSelector((state: RootState) => state.getProductById);
    return { data }
}

export default useProductById;