import { withFormik } from 'formik';
import { Dispatch } from 'redux';
import * as Yup from 'yup';

import { fetchAddSliders, fetchUpdateSliders } from '../../../store/actions';
import InnerForm from './Inner-form';
import { IFormValues } from '../../../interfaces/slider-form';

interface SliderFormProps {
  dispatch: Dispatch;
  handleClose: () => void;
  initialId?: number;
  initialName?: string;
  initialText?: string;
  initialImage?: string;
  initialHref?: string;
  initialIsShown?: boolean;
  initialPriority?: number;
}

const FILE_SIZE = 9000 * 1024;
const SUPPORTED_FORMATS = [
  "image/jpg",
  "image/jpeg",
  "image/gif",
  "image/png"
];

const sliderValidationShema = Yup.object().shape({
  name: Yup.string().min(2, 'Minimum 2 symbols').max(50, 'Too long').required('Required'),
  text: Yup.string().min(2, 'Minimum 2 symbols').max(360, 'Too long').required('Required'),
  image: Yup
    .mixed()
    .test(
      "fileSize",
      "File too large",
      value => value && (typeof value === "string" || value.size <= FILE_SIZE)
    )
    .test(
      "fileFormat",
      "Unsupported Format",
      value => value && (typeof value === "string" || SUPPORTED_FORMATS.includes(value.type))
    ),
  href: Yup.string().min(2, 'Minimum 2 symbols').max(360, 'Too long').required('Required'),
  priority: Yup.number().min(1, 'The number must been more 0').max(360, 'Too long').required('Required')
})

const SliderForm = withFormik<SliderFormProps, IFormValues>({
    mapPropsToValues: props => {
      return {
        id: props.initialId || -1,
        name: props.initialName || "",
        text: props.initialText || "",
        image: props.initialImage || "",
        href: props.initialHref || "",
        isShown: props.initialIsShown || false,
        priority: props.initialPriority || 1,
      };
    },
    validationSchema: sliderValidationShema,
    handleSubmit: (values: IFormValues, {setSubmitting, props}) => {
      console.log(values.image)
      setSubmitting(false);
      console.log(props.initialId)
      if (props.initialId === undefined) {
        props.dispatch(fetchAddSliders(values.id, values.name, values.text, values.image, values.href, values.isShown, values.priority));
      } else {
        props.dispatch(fetchUpdateSliders(values.id, values.name, values.text, values.image, values.href, values.isShown, values.priority));
      }
      props.handleClose();
    },
  }
)(InnerForm);

export default SliderForm;
