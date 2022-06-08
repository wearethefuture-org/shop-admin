import { withFormik } from 'formik';
import { Dispatch } from 'redux';
import * as Yup from 'yup';

import InnerForm from './Inner-form';
import { IFormParserValues } from '../../../../interfaces/widget-form';
import { fetchUpdateSettings } from '../../../../store/actions/settings.actions';

interface ParserFormProps {
  dispatch: Dispatch;
  handleClick: () => void;
  parameters: {
    bazzillaId: {
      updatePhoto: boolean,
      createNewProducts: boolean
    },
    fashionGirl: {
      updatePhoto: boolean,
      createNewProducts: boolean
    },
    olla: {
      updatePhoto: boolean,
      createNewProducts: boolean,
      updateOldProducts: boolean,
      parserLimit: string
    }
  };
  name: string;
}

const validationSchema = Yup.object({
  ollaParserLimit: Yup.number()
    .min(1, 'Min value can be 1')
    .max(100, 'Max value can be 100')
    .required('Is required'),
});

const ParserForm = withFormik<ParserFormProps, IFormParserValues>({
  mapPropsToValues: ({parameters: {bazzillaId, fashionGirl, olla}}) => {
    return {
      bazzilaIdUpdatePhoto:  bazzillaId.updatePhoto,
      fashionGirlUpdatePhoto: fashionGirl.updatePhoto,
      ollaUpdatePhoto: olla.updatePhoto,
      bazzilaIdCreateNewProducts: bazzillaId.createNewProducts,
      fashionGirlCreateNewProducts: fashionGirl.createNewProducts,
      ollaCreateNewProducts: olla.createNewProducts,
      ollaUpdateOldProducts: olla.updateOldProducts,
      ollaParserLimit: olla.parserLimit,
    }
  },
  validationSchema: validationSchema,
  handleSubmit: (values: IFormParserValues, { setSubmitting, props }) => {
    setSubmitting(false);
    props.handleClick();

    const parameters: ParserFormProps["parameters"] = {
      bazzillaId: {
        updatePhoto: values.bazzilaIdUpdatePhoto,
        createNewProducts: values.bazzilaIdCreateNewProducts,
      },
      fashionGirl: {
        updatePhoto: values.fashionGirlUpdatePhoto,
        createNewProducts: values.fashionGirlCreateNewProducts,
      },
      olla: {
        updatePhoto: values.ollaUpdatePhoto,
        createNewProducts: values.ollaCreateNewProducts,
        updateOldProducts: values.ollaUpdateOldProducts,
        parserLimit: values.ollaParserLimit,
      },
    };

    props.dispatch(fetchUpdateSettings(props.name, parameters));
  },
})(InnerForm);

export default ParserForm;
