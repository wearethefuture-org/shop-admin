import React from 'react';
import style from './Paginator.module.scss';
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsRequest } from '../../store/actions/products.actions';
import { RootState } from '../../store/store';

const getNumberOfPages = (count: number, rowsPerPage: number): number => {
    return Math.ceil(count/rowsPerPage)
}

function TablePaginationActions({ count, page, rowsPerPage, onPageChange }) {
    const dispatch = useDispatch()
    const { paginationLimit, sort, sortDirect } = useSelector(
        (state: RootState) => state.products
      );

    const handleFirstPageButtonClick = () => {
        onPageChange(1);
        dispatch(getProductsRequest(1, paginationLimit, sort, sortDirect));
    };

    const handleBackButtonClick = () => {
        onPageChange(page);
        dispatch(getProductsRequest(page, paginationLimit, sort, sortDirect));
    };

    const handleNextButtonClick = () => {
        onPageChange(page + 2);
        dispatch(getProductsRequest(page + 2, paginationLimit, sort, sortDirect));
    };

    const handleLastPageButtonClick = () => {
        onPageChange(getNumberOfPages(count, rowsPerPage));
        dispatch(getProductsRequest(getNumberOfPages(count, rowsPerPage), paginationLimit, sort, sortDirect));
    };

    return (
        <>
            <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label="first page">
                <FirstPageIcon />
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                <KeyboardArrowLeft />
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= getNumberOfPages(count, rowsPerPage) - 1}
                aria-label="next page"
            >
                <KeyboardArrowRight />
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= getNumberOfPages(count, rowsPerPage) - 1}
                aria-label="last page"
            >
                <LastPageIcon />
            </IconButton>
        </>
    );
}

const CustomProductsTablePaginator = ({paginationRowsPerPageOptions, rowsPerPage, rowCount, onChangePage, onChangeRowsPerPage, currentPage }) => (
    <TablePagination
        className={style.paginator}
        component="nav"
        count={rowCount}
        rowsPerPage={rowsPerPage}
        page={currentPage - 1}
        onPageChange={onChangePage}
        onRowsPerPageChange={({ target }) => onChangeRowsPerPage(Number(target.value))}
        ActionsComponent={TablePaginationActions}
        labelRowsPerPage='Рядків на сторінці:'
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} з ${count}`}
        rowsPerPageOptions={paginationRowsPerPageOptions}
    />
);

export default CustomProductsTablePaginator;