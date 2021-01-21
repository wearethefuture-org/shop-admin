import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../store/actions';
import { RootState } from '../store/store';

const testdata = [
  {
    "id": 46,
    "createdAt": "1-1-2020",
    "updatedAt": "1-1-2020",
    "email": "123@gmail.com",
    "password": "123123",
    "role" : 'admin'
  },
  {
    "id": 49,
    "createdAt": "1-1-2020",
    "updatedAt": "1-1-2020",
    "email": "1234@gmail.com",
    "password": "123123",
    "role" : 'admin'
  },
  {
    "id": 41,
    "createdAt": "1-1-2020",
    "updatedAt": "1-1-2020",
    "email": "123@gmail.com",
    "password": "123123",
    "role" : 'admin'
  },
  {
    "id": 43,
    "createdAt": "1-1-2020",
    "updatedAt": "1-1-2020",
    "email": "1234@gmail.com",
    "password": "123123",
    "role" : 'admin'
  },
]

const useUsers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // const data =  useSelector((state: RootState) => state.users.list);
  const data =  useSelector((state: RootState) => testdata)
  return { data, dispatch };
}

export default useUsers;