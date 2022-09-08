import React, { useEffect, useState } from 'react';
import { createStyles, IconButton, makeStyles, ThemeOptions } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import queryString from 'query-string';
import { useHistory, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';

import { CommentsTableProps } from '../../../interfaces/IComment';
import AppDataTable from '../../AppDataTable/AppDataTable';
import DateMoment from '../../Common/Date-moment';
import styles from './CommentsTable.module.scss';
import { COLORS } from '../../../values/colors';
import { RootState } from '../../../store/store';
import { getCommentsRequest } from '../../../store/actions/comments.actions';
import Preloader from '../../Preloader/Preloader';
import { cols } from '../../../pages/Comments/CommentsPage';

const useStyles = makeStyles(
  (): ThemeOptions =>
    createStyles({
      icon: {
        cursor: 'pointer',
        transition: '0.3s all',
      },
      iconLight: {
        'color': COLORS.primaryRed,
        '&:hover': {
          color: COLORS.secondaryRed,
        },
      },
      iconDark: {
        'color': COLORS.darkRed,
        '&:hover': {
          color: COLORS.secondaryDarkRed,
        },
      },
    })
);

type QueryTypes = {
  page?: string;
  limit?: string;
  sort?: string;
  sortDirect?: string;
};

const CommentsTable: React.FC<CommentsTableProps> = ({
  activeColumns,
  setOpenDeleteCommentDialog,
  setCommentToDelete,
}) => {
  const classes = useStyles();
  const [expandedComments, setExpandedComments] = useState<number[]>([]);
  const { darkMode } = useSelector((state: RootState) => state.theme);

  const { list, loading, count, paginationPage, paginationLimit, sort, sortDirect } = useSelector(
    (state: RootState) => state.comments
  );
  const defaultSortFieldId = Object.keys(cols).indexOf(sort as string) + 1;
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const parsed = queryString.parse(location.search) as QueryTypes;
    let actualPage = paginationPage;
    if (parsed.page) actualPage = Number(parsed.page);
    let actualLimit = paginationLimit;
    if (parsed.limit) actualLimit = Number(parsed.limit);
    let actualSort = sort;
    if (parsed.sort) actualSort = parsed.sort;
    let actualSortDirect = sortDirect;
    if (parsed.sortDirect) actualSortDirect = parsed.sortDirect;
    dispatch(getCommentsRequest(actualPage, actualLimit, actualSort, actualSortDirect));
  }, []);

  useEffect(() => {
    const querySearch = {} as QueryTypes;
    if (!!paginationPage && paginationPage !== 1) querySearch.page = String(paginationPage);
    if (!!paginationLimit && paginationLimit !== 10) querySearch.limit = String(paginationLimit);
    if (!!sort && sort !== 'id') querySearch.sort = sort;
    if (!!sortDirect && sortDirect !== 'asc') querySearch.sortDirect = sortDirect;
    history.push({
      pathname: '/comments',
      search: queryString.stringify(querySearch),
      state: { update: true },
    });
  }, [paginationPage, paginationLimit, sort, sortDirect]);

  const onChangeLimit = (limit) => {
    const newPage = Math.ceil(((paginationPage - 1) * paginationLimit + 1) / limit);
    dispatch(getCommentsRequest(newPage, limit, sort, sortDirect));
  };

  const onChangePage = (page) => {
    if (paginationPage !== page) dispatch(getCommentsRequest(page, paginationLimit, sort, sortDirect));
  };

  const setSortColumn = (column: any, direction: any) => {
    const fieldName = Object.keys(cols)[Object.values(cols).indexOf(column.name)];
    dispatch(getCommentsRequest(paginationPage, paginationLimit, fieldName, direction));
  };

  const handleExpandedComments = (id) => {
    expandedComments.includes(id)
      ? setExpandedComments(expandedComments.filter((commentId) => commentId !== id))
      : setExpandedComments(expandedComments.concat(id));
  };

  const commentsColumns = [
    {
      name: 'ID',
      selector: (row) => row.id,
      sortable: true,
      maxWidth: '7%',
      minWidth: '5%',
      omit: !activeColumns.includes('ID'),
    },
    {
      name: 'Коментар',
      selector: (row) => row.text,
      wrap: true,
      format: (row) =>
        row.text.length <= 100 ? (
          <p className={styles.comment}>{row.text}</p>
        ) : (
          <p className={styles.comment}>
            {!expandedComments.includes(row.id) ? (
              <span>{row.text.slice(0, 100)}...</span>
            ) : (
              <span>{row.text}</span>
            )}
            <span className={styles['expand-btn']} onClick={() => handleExpandedComments(row.id)}>
              {expandedComments.includes(row.id) ? 'Менше' : 'Повністю'}
            </span>
          </p>
        ),
      omit: !activeColumns.includes('Відгук'),
    },
    {
      name: 'Автор',
      selector: (row) => `${row.author.firstName} ${row.author.lastName}`,
      wrap: true,
      sortable: true,
      maxWidth: '20%',
      omit: !activeColumns.includes('Автор'),
    },
    {
      name: 'ID продукту',
      selector: (row) => row.product.id,
      sortable: true,
      maxWidth: '11%',
      omit: !activeColumns.includes('ID продукту'),
    },
    {
      name: 'Створено',
      selector: (row) => row.createdAt,
      sortable: true,
      maxWidth: '10%',
      format: (row) => <DateMoment date={row.createdAt} column />,
      omit: !activeColumns.includes('Створено'),
    },
    {
      name: 'Оновлено',
      selector: (row) => row.updatedAt,
      sortable: true,
      maxWidth: '10%',
      format: (row) => <DateMoment date={row.updatedAt} column />,
      omit: !activeColumns.includes('Оновлено'),
    },
    {
      name: 'Видалити',
      maxWidth: '10%',
      cell: (row) => (
        <IconButton
          aria-label="delete"
          type="button"
          onClick={() => {
            setOpenDeleteCommentDialog(true);
            setCommentToDelete(row.id);
          }}
        >
          <DeleteIcon className={classNames(classes.icon, darkMode ? classes.iconDark : classes.iconLight)} />
        </IconButton>
      ),
    },
  ];

  return (
    <>
      {loading ? (
        <Preloader />
      ) : (
        <AppDataTable
          data={list}
          columns={commentsColumns}
          title="Коментарі"
          count={count}
          limit={paginationLimit}
          setLimit={(e) => onChangeLimit(e)}
          setPage={(e) => onChangePage(e)}
          setSortColumn={(column, direction) => setSortColumn(column, direction)}
          paginationServer={true}
          paginationPage={paginationPage}
          defaultSortFieldId={defaultSortFieldId}
          sortDirect={sortDirect}
        />
      )}
    </>
  );
};

export default CommentsTable;
