import { withFormik } from 'formik';
import { Dispatch } from 'redux';
import * as Yup from 'yup';
import InnerForm from './Inner-form';
import { fetchUpdateSettings } from '../../../../store/actions/settings.actions';

const validationSchema = Yup.object({
  ollaParserLimit: Yup.number()
    .min(1, 'Min value can be 1')
    .max(100, 'Max value can be 100')
    .required('Is required'),
});

const ParserForm = withFormik<ParserFormProps, IFormParserValues>({
  mapPropsToValues: ({parameters}) => {
    let fieldNameObject: IFormParserValues | any;
    Object.values(parameters).forEach((parser, index) => {
      Object.keys(parser).forEach((element) => {
        const fullName = Object.keys(parameters)[index] + element.replace(element.charAt(0), element.charAt(0).toUpperCase())
        fieldNameObject = {
          ...fieldNameObject,
          [fullName]: {...parameters[Object.keys(parameters)[index]]}[element]
        }
      })
    })
    return {
      ...fieldNameObject,
      parameters
    }
  },
  validationSchema: validationSchema,
  handleSubmit: (values: IFormParserValues, { setSubmitting, props }) => {
    setSubmitting(false);
    props.handleClick();

    const parameters = {...values.parameters}

    for (const parser of Object.keys(values.parameters)) {
      for (const setting of Object.keys(values.parameters[parser])) {
        const fieldName = parser + setting.replace(setting.charAt(0), setting.charAt(0).toUpperCase())
        const selectedParser = parameters[parser]
        if (selectedParser[setting] !== values[fieldName]) {
          selectedParser[setting] = values[fieldName]
        }
      }
    }

    props.dispatch(fetchUpdateSettings(props.name, parameters));
  },
})(InnerForm);

export default ParserForm;

interface IParserSettings {
  bazzillaId: {
    updatePhoto: boolean,
    createNewProducts: boolean,
  },
  fashionGirl: {
    updatePhoto: boolean,
    createNewProducts: boolean,
  },
  olla: {
    updatePhoto: boolean,
    createNewProducts: boolean,
    updateOldProducts?: boolean,
    parserLimit?: string
  },
}

interface ParserFormProps {
  dispatch: Dispatch;
  handleClick: () => void;
  parameters: IParserSettings;
  name: string;
}

export interface IFormParserValues {
  parameters: ParserFormProps["parameters"]
}
