import { withFormik } from 'formik';
import { Dispatch } from 'redux';
import * as Yup from 'yup';

import InnerForm from './Inner-form';
import { IFormCashbackValues } from '../../../../interfaces/widget-form';
import { fetchUpdateSettings } from '../../../../store/actions/settings.actions';

interface CashbackFormProps {
  dispatch: Dispatch;
  handleClick: () => void;
  parameters: {
    currentCashback: {
      percent: number,
    },
  };
  name: string;
}

const validationSchema = Yup.object({
  currentPercentCashback: Yup.number()
    .min(1, 'Min value can be 1')
    .max(35, 'Max value can be 35')
    .required('Is required'),
});

const CashbackFrom = withFormik<CashbackFormProps, IFormCashbackValues>({
  mapPropsToValues: ({ parameters: { currentCashback } }) => {
    return {
      currentPercentCashback: currentCashback.percent
    };
  },
  validationSchema: validationSchema,
  handleSubmit: (values: IFormCashbackValues, { setSubmitting, props }) => {
    setSubmitting(false);
    props.handleClick();

    const parameters: CashbackFormProps["parameters"] = {
      currentCashback: {
        percent: values.currentPercentCashback
      }
    };

    props.dispatch(fetchUpdateSettings(props.name, parameters));
  },
})(InnerForm);

export default CashbackFrom;
