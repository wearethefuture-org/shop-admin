import React, { FC, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { api } from '../../api/api';
import CategoriesItems from './CategoriesItems/CategoriesItems';

const SearchPage: FC = () => {
  const history = useHistory();
  const { searchValue, searchOption } = Object(history.location.state);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchResults, setSearchResult] = useState<any>();

  useEffect(() => {
    setLoading(true);
    const getItemsSearch = async () => {
      if (!searchOption || !searchValue) {
        history.push('/');
        return;
      }
      const { data: response } = await api.search.getSearchItems(
        searchOption,
        searchValue,
        page,
        7
      );
      setSearchResult(response.data);
      setTotalPages(response.totalPages);
      setLoading(false);
    };
    getItemsSearch();
  }, [searchValue, page, history, searchOption]);

  return (
    <>
      {searchOption === 'categories' && (
        <CategoriesItems
          searchResults={searchResults}
          searchValue={searchValue}
          page={page}
          setPage={setPage}
          totalPages={totalPages}
          loading={loading}
        />
      )}
    </>
  );
};

export default SearchPage;
