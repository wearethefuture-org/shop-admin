import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInvoicesList } from '../store/actions/invoice.actions';
import { AppDispatch, RootState } from '../store/store';

const useInvoices = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchInvoicesList());
  }, [dispatch]);

  const invoiceList = useSelector((state: RootState) => state.invoice.invoicesList);

  return { invoiceList, dispatch };
};

export default useInvoices;
