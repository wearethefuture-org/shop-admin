import { withFormik } from 'formik';
import { Dispatch } from 'redux';
import * as Yup from 'yup';

import InnerForm from './Inner-form';
import { IFormWidgetValues } from '../../../../interfaces/widget-form';
import { ISettingsParams } from '../../../../interfaces/ISettings';
import { fetchUpdateSettings } from '../../../../store/actions/settings.actions';

interface WidgetFormProps {
  dispatch: Dispatch;
  handleClick: () => void;
  parameters: ISettingsParams;
  name: string;
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
  mapPropsToValues: ({ parameters: { newArrivals, popularItems } }) => {
    return {
      quantityNewArrivals: newArrivals.quantity,
      quantityPopularItems: popularItems.quantity,
      isWidgetActiveNewArrivals: newArrivals.isWidgetActive,
      isWidgetActivePopularItems: popularItems.isWidgetActive,
    };
  },
  validationSchema: validationSchema,
  handleSubmit: (values: IFormWidgetValues, { setSubmitting, props }) => {
    setSubmitting(false);
    props.handleClick();

    const parameters: ISettingsParams = {
      newArrivals: {
        quantity: values.quantityNewArrivals,
        isWidgetActive: values.isWidgetActiveNewArrivals,
      },
      popularItems: {
        quantity: values.quantityPopularItems,
        isWidgetActive: values.isWidgetActivePopularItems,
      },
    };

    props.dispatch(fetchUpdateSettings(props.name, parameters));
  },
})(InnerForm);

export default WidgetForm;
