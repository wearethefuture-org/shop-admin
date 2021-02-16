import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import { IProductItem } from '../../../../interfaces/IProducts';

import { withRouter, RouteComponentProps } from 'react-router-dom';
import DateMoment from '../../../Common/Date-moment';
import { imgPath } from '../../../../api/config';

interface TableBodyProps {
  rows: IProductItem[],
  rowsPerPage: number,
  page: number,
  emptyRows: number
}

const useTableStyles = makeStyles({
  row: {
    cursor: 'pointer',
    '&:hover': {
      background: "#f5f5f5",
    },
    '& > td': {
      wordBreak: 'break-word',
    }
  }
});

const ProductsTableBody: React.FC<TableBodyProps & RouteComponentProps<any>> = ({ rows, rowsPerPage, page, emptyRows, history }) => {

  const classes = useTableStyles();

  return (
    <TableBody>
      {(rowsPerPage > 0
        ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        : rows
      ).map((row) => (
        <TableRow className={classes.row} key={row.id} onClick={() => history.push(`/product/${row.id}`)}>
          <TableCell component="th" scope="row">{row.id}</TableCell>
          <TableCell >{row.name}</TableCell>
          <TableCell >{row.price}</TableCell>
          <TableCell  >{row.description}</TableCell>
          <TableCell >{row.category}</TableCell>
          <TableCell ><DateMoment date={row.createdAt} /></TableCell>
          <TableCell ><DateMoment date={row.updatedAt} /></TableCell>
          <TableCell >{row.files ? row.files.length : '0'}</TableCell>
          <TableCell >{row.key}</TableCell>
          {row.mainImg ? <TableCell ><img src={`${imgPath}${row.mainImg.name}`} alt={row.mainImg.name} width="100" /></TableCell> : <TableCell >no</TableCell>}
        </TableRow>
      ))}
      {emptyRows > 0 && (
        <TableRow style={{ height: 53 * emptyRows }}>
          <TableCell colSpan={6} />
        </TableRow>
      )}
    </TableBody>
  );
}

export default withRouter(ProductsTableBody);