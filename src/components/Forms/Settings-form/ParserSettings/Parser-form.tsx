import { withFormik } from 'formik';
import { Dispatch } from 'redux';
// import * as Yup from 'yup';

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
    }
  };
  name: string;
}

const ParserForm = withFormik<ParserFormProps, IFormParserValues>({
  mapPropsToValues: ({ parameters: { bazzillaId, fashionGirl } }) => {
    return {
      bazzilaIdUpdatePhoto: bazzillaId.updatePhoto,
      fashionGirlUpdatePhoto: fashionGirl.updatePhoto,
      bazzilaIdCreateNewProducts: bazzillaId.createNewProducts,
      fashionGirlCreateNewProducts: fashionGirl.createNewProducts,
    };
  },
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
    };

    props.dispatch(fetchUpdateSettings(props.name, parameters));
  },
})(InnerForm);

export default ParserForm;
