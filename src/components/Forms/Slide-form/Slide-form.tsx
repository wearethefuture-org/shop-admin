import { withFormik } from 'formik';
import { Dispatch } from 'redux';
import * as Yup from 'yup';

import { fetchAddSlides, fetchUpdateSlides } from '../../../store/actions/slides.actions';
import InnerForm from './Inner-form';
import { ISlideFormValues } from '../../../interfaces/ISlides';

interface SlideFormProps {
  dispatch: Dispatch;
  handleClose: () => void;
  initialId?: number;
  initialName?: string;
  initialText?: string;
  initialImage?: string;
  initialImageMobile?: string;
  initialHref?: string;
  initialIsShown?: boolean;
  initialPriority?: number;
}

const FILE_SIZE = 9000 * 1024;
const FILE_SIZE_MOBILE = 1000 * 1024;
// leave it till basic is implemented
// https://stackoverflow.com/questions/65002123/validating-images-aspect-ratio-width-height-with-yup-formik
// const FILE_WH_MOBILE = {"widthMax": 400, "heightMax": 200};
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];

const slideValidationShema = Yup.object().shape({
  name: Yup.string().min(2, 'Minimum 2 symbols').max(50, 'Too long').required('Required'),
  text: Yup.string().min(2, 'Minimum 2 symbols').max(360, 'Too long').required('Required'),
  image: Yup.mixed()
    .test('fileSize', 'File too large', (value) => {
      return value && (typeof value === 'string' || value.size <= FILE_SIZE);
    })
    .test(
      'fileFormat',
      'Unsupported Format',
      (value) => value && (typeof value === 'string' || SUPPORTED_FORMATS.includes(value.type))
    ),
  imageMobile: Yup.mixed()
    .test(
      'fileSize',
      'File too large',
      (value) => value && (typeof value === 'string' || value.size <= FILE_SIZE_MOBILE)
    )
    .test(
      'fileFormat',
      'Unsupported Format',
      (value) => value && (typeof value === 'string' || SUPPORTED_FORMATS.includes(value.type))
    ),
  href: Yup.string().min(2, 'Minimum 2 symbols').max(360, 'Too long').required('Required'),
  priority: Yup.number()
    .min(1, 'The number must been more 0')
    .max(360, 'Too long')
    .required('Required'),
});

const SlideForm = withFormik<SlideFormProps, ISlideFormValues>({
  mapPropsToValues: (props) => {
    return {
      id: props.initialId || -1,
      name: props.initialName || '',
      text: props.initialText || '',
      image: props.initialImage || '',
      imageMobile: props.initialImageMobile || '',
      href: props.initialHref || '',
      isShown: props.initialIsShown || false,
      priority: props.initialPriority || 1,
    };
  },
  validationSchema: slideValidationShema,
  handleSubmit: (values: ISlideFormValues, { setSubmitting, props }) => {
    setSubmitting(false);
    if (props.initialId === undefined) {
      const formData = new FormData();
      formData.append('image', values.image);
      formData.append('imageMobile', values.imageMobile);
      formData.append('name', values.name);
      formData.append('isShown', '' + values.isShown);
      formData.append('priority', '' + values.priority);
      formData.append('href', values.href);
      formData.append('text', values.text);

      props.dispatch(fetchAddSlides(formData));
    } else {
      const formData = new FormData();
      if (typeof values.image !== 'string') formData.append('image', values.image);
      if (typeof values.imageMobile !== 'string')
        formData.append('imageMobile', values.imageMobile);
      if (values.name !== props.initialName) formData.append('name', values.name);
      if (values.isShown !== props.initialIsShown) formData.append('isShown', '' + values.isShown);
      if (values.priority !== props.initialPriority)
        formData.append('priority', '' + values.priority);
      if (values.href !== props.initialHref) formData.append('href', values.href);
      if (values.text !== props.initialText) formData.append('text', values.text);

      props.dispatch(fetchUpdateSlides({ id: props.initialId, body: formData }));
    }
    props.handleClose();
  },
})(InnerForm);

export default SlideForm;
