import React, { FC, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useSearchItems from '../../hooks/useSearchItems';
import Categories from './Categories/Categories';

const SearchPage: FC = () => {
  const history = useHistory();
  const { searchValue, searchOption } = Object(history.location.state);
  const [page, setCurrentPage] = useState<number>(1);

  if (!searchValue && !searchOption) {
    history.push('/');
  }

  const { list, totalPages, loading } = useSearchItems({
    query: searchValue,
    option: searchOption,
    page,
    limit: 10,
  });

  const onPageChanged = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      {searchOption === 'categories' && (
        <Categories
          searchResults={list}
          searchValue={searchValue}
          page={page}
          onPageChanged={onPageChanged}
          totalPages={totalPages}
          loading={loading}
        />
      )}
    </>
  );
};

export default SearchPage;
