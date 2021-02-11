import React, { useState, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import ProductForm from '../Forms/Product-form/Product-form';
import { IActions } from '../../interfaces/actions';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Modal, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import useCategories from '../../hooks/useCategories';

interface IModalData {
  buttonName: string,
  modalTitle: string,
  fetchFun: (...props: any) => IActions,
  action?: string,
  classEdit?: string,
  props?: any
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      maxWidth: '60vw',
      overflowX: 'auto'
    },
    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginLeft: theme.spacing(1),
    },

  }),
);
const ProductModal: React.FC<IModalData> = ({ buttonName, modalTitle, action, classEdit, props, fetchFun }) => {

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { data } = useCategories();
  const currencies = data.map((item: any) => {
    return { value: item.name, label: item.name }
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <Button
        variant="contained"
        color="primary"
        size="large"
        className={`${classes.margin} ${classEdit}`}
        startIcon={action === 'edit' ? <EditIcon /> : <AddIcon />}
        onClick={handleOpen}
      >
        {buttonName}
      </Button>
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
      >
        <div className={classes.paper}>
          <h2 id="simple-modal-title" style={{ textAlign: 'center' }}>{modalTitle}</h2>
          <ProductForm
            dispatch={dispatch}
            handleClose={handleClose}
            currencies={currencies}
            buttonName={buttonName}
            fetchFun={fetchFun}
            {...props} />
        </div>
      </Modal>
    </Fragment>
  );
};

export default ProductModal;