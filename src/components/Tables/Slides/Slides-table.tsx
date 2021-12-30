import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import TableHeader from './Header/Table-header';
import SlideTableBody from './Body/Table-body';
import SlideTableFooter from './Footer/Table-footer';
import TableContainer from '@material-ui/core/TableContainer';
import { ISlideItem } from '../../../interfaces/ISlides';
import { Dispatch } from 'redux';
import { ISlidesModal } from '../../../interfaces/modals';

interface SlideDataProps {
  data: Array<ISlideItem>;
  dispatch: Dispatch;
  modalData: ISlidesModal;
}

function createData(
  id: number,
  createdAt: string,
  updatedAt: string,
  name: string,
  text: string,
  image: string,
  imageMobile: string,
  href: string,
  isShown: boolean,
  priority: number
) {
  return { id, name, createdAt, updatedAt, text, image, imageMobile, href, isShown, priority };
}

const useTableStyles = makeStyles({
  table: {
    minWidth: 500,
  },
});

const SlidesTable: React.FC<SlideDataProps> = ({ data, dispatch, modalData }) => {
  const classes = useTableStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const rows: Array<ISlideItem> = data.map((slide: ISlideItem) => {
    return createData(
      slide.id,
      slide.createdAt,
      slide.updatedAt,
      slide.name,
      slide.text,
      slide.image as string,
      slide.imageMobile as string,
      slide.href,
      slide.isShown,
      slide.priority
    );
  });

  rows.sort((a, b) => a.priority - b.priority);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="custom pagination table">
        <TableHeader />
        <SlideTableBody
          data={data}
          dispatch={dispatch}
          modalData={modalData}
          rows={rows}
          rowsPerPage={rowsPerPage}
          page={page}
          emptyRows={emptyRows}
        />
        <SlideTableFooter
          rows={rows}
          rowsPerPage={rowsPerPage}
          page={page}
          setPage={setPage}
          setRowsPerPage={setRowsPerPage}
        />
      </Table>
    </TableContainer>
  );
};

export default SlidesTable;
