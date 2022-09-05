import { LinearProgress } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import ColumnsBtn from '../../components/ColumnsBtn/ColumnsBtn';
import ColumnsMenu from '../../components/ColumnsMenu/ColumnsMenu';
import CustomConfirm from '../../components/CustomConfirm/CustomConfirm';
import CommentsTable from '../../components/Tables/Comments/CommentsTable';
import useComments from '../../hooks/useComments';
import { deleteCommentRequest, getCommentsRequest } from '../../store/actions/comments.actions';
import { AppDispatch } from '../../store/store';
import styles from './CommentsPage.module.scss';

enum commentsColumns {
  id = 'ID',
  text = 'Відгук',
  author = 'Автор',
  productId = 'ID продукту',
  createdAt = 'Створено',
  updatedAt = 'Оновлено',
}

export default function CommentsPage() {
  const dispatch: AppDispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);

  const { list, count, loading } = useComments(currentPage, limit);

  React.useEffect(() => {
    if (!list.length && count) {
      dispatch(getCommentsRequest(currentPage, limit));
    }
  }, [count, currentPage, dispatch, limit, list]);

  React.useEffect(() => {
    dispatch(getCommentsRequest(currentPage, limit));
  }, [count]);

  // ACTIVE COLUMNS
  const [showColumnsMenu, setShowColumnsMenu] = useState<boolean>(false);
  const [activeColumns, setActiveColumns] = useState<string[]>([
    commentsColumns.id,
    commentsColumns.text,
    commentsColumns.author,
    commentsColumns.productId,
    commentsColumns.createdAt,
    commentsColumns.updatedAt,
  ]);

  const handleColumns = (column: string) =>
    activeColumns.includes(column)
      ? setActiveColumns(activeColumns.filter((col) => col !== column))
      : setActiveColumns([...activeColumns, column]);

  // DELETE COMMENT
  const [openDeleteCommentDialog, setOpenDeleteCommentDialog] = useState<boolean>(false);
  const [commentToDelete, setCommentToDelete] = useState<number>(0);

  const handleDeleteComment = () => {
    commentToDelete && dispatch(deleteCommentRequest(commentToDelete));
    setOpenDeleteCommentDialog(false);
  };

  return (
    <>
      {loading && <LinearProgress />}

      {openDeleteCommentDialog && (
        <CustomConfirm
          openDeleteDialog={openDeleteCommentDialog}
          closeDeleteDialog={() => setOpenDeleteCommentDialog(false)}
          name="коментар"
          warning="Ця операція є незворотньою. Дані буде неможливо відновити"
          handleDelete={handleDeleteComment}
        />
      )}

      <div className={styles.container}>
        {showColumnsMenu && (
          <ColumnsMenu
            allColumns={commentsColumns}
            activeColumns={activeColumns}
            showColumnsMenu={showColumnsMenu}
            setShowColumnsMenu={setShowColumnsMenu}
            handleColumns={handleColumns}
          />
        )}

        <div className={styles['header-btn-wrapper']}>
          <ColumnsBtn handleClick={() => setShowColumnsMenu(true)} />
        </div>
        <div className={styles['table-wrapper']}>
          {list && (
            <CommentsTable
              list={list}
              activeColumns={activeColumns}
              setOpenDeleteCommentDialog={setOpenDeleteCommentDialog}
              setCommentToDelete={setCommentToDelete}
              count={count}
              setPage={setCurrentPage}
              limit={limit}
              setLimit={setLimit}
              paginationServer={true}
            />
          )}
        </div>
      </div>
    </>
  );
}
