import { withFormik } from 'formik';
import { Dispatch } from 'redux';
import * as Yup from 'yup';

import InnerForm from './Inner-form';
import { IFormWidgetValues } from '../../../../interfaces/widget-form';
import { ISettingsItem } from '../../../../interfaces/ISettings';
import { fetchUpdateSettings } from '../../../../store/actions';

interface WidgetFormProps {
  data: ISettingsItem;
  dispatch: Dispatch;
}

const validationSchema = Yup.object({
  quantityNewArrivals: Yup.number()
    .min(4, 'Min value can be 4')
    .max(20, 'Max value can be 20')
    .required('Is required'),
  quantityPopularItems: Yup.number()
    .min(4, 'Min value can be 4')
    .max(20, 'Max value can be 20')
    .required('Is required'),
});

const WidgetForm = withFormik<WidgetFormProps, IFormWidgetValues>({
  mapPropsToValues: ({ data }) => {
    const {
      settings: { quantityNewArrivals, quantityPopularItems },
    } = data;

    return {
      quantityNewArrivals,
      quantityPopularItems,
    };
  },
  validationSchema: validationSchema,
  handleSubmit: (values: IFormWidgetValues, { setSubmitting, props }) => {
    setSubmitting(false);
    props.dispatch(fetchUpdateSettings(props.data.name, values));
  },
})(InnerForm);

export default WidgetForm;
