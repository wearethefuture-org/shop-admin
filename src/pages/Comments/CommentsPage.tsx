import { LinearProgress } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ColumnsBtn from '../../components/ColumnsBtn/ColumnsBtn';
import ColumnsMenu from '../../components/ColumnsMenu/ColumnsMenu';
import CustomConfirm from '../../components/CustomConfirm/CustomConfirm';
import CommentsTable from '../../components/Tables/Comments/CommentsTable';
import { deleteCommentRequest, getCommentsRequest } from '../../store/actions/comments.actions';
import { AppDispatch, RootState } from '../../store/store';
import styles from './CommentsPage.module.scss';

export enum cols {
  id = 'ID',
  text = 'Відгук',
  author = 'Автор',
  productId = 'ID продукту',
  createdAt = 'Створено',
  updatedAt = 'Оновлено',
}

export default function CommentsPage() {
  const dispatch: AppDispatch = useDispatch();

  const { list, loading } = useSelector((state: RootState) => state.comments);

  // ACTIVE COLUMNS
  const [showColumnsMenu, setShowColumnsMenu] = useState<boolean>(false);
  const [activeColumns, setActiveColumns] = useState<string[]>([
    cols.id,
    cols.text,
    cols.author,
    cols.productId,
    cols.createdAt,
    cols.updatedAt,
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
            allColumns={cols}
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
              activeColumns={activeColumns}
              setOpenDeleteCommentDialog={setOpenDeleteCommentDialog}
              setCommentToDelete={setCommentToDelete}
            />
          )}
        </div>
      </div>
    </>
  );
}
