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

export const FILE_SIZE = 9000 * 1024;
export const FILE_SIZE_MOBILE = 1000 * 1024;
// leave it till basic is implemented
// https://stackoverflow.com/questions/65002123/validating-images-aspect-ratio-width-height-with-yup-formik
// const FILE_WH_MOBILE = {"widthMax": 400, "heightMax": 200};
export const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];

export const slideValidationShema = Yup.object().shape({
  name: Yup.string().min(2, 'Мінімум 2 символи').max(50, 'Забагато симвлів').required('Введіть назву слайду'),
  text: Yup.string().min(2, 'Мінімум 2 символи').max(360, 'Забагато симвлів').required('Введіть опис'),
  image: Yup.mixed()
    .required('Потрібно додати зображення')
    .test('fileSize', 'Занадто великий файл', (value) => {
      return value && (typeof value === 'string' || value.size <= FILE_SIZE);
    })
    .test(
      'fileFormat',
      'Формат не підтримується',
      (value) => {
        return value && (typeof value === 'string' || SUPPORTED_FORMATS.includes(value.type))
      }),
  imageMobile: Yup.mixed()
    .required('Потрібно додати зображення')
    .test(
      'fileSize',
      'Занадто великий файл',
      (value) => value && (typeof value === 'string' || value.size <= FILE_SIZE_MOBILE)
    )
    .test(
      'fileFormat',
      'Формат не підтримується',
      (value) => value && (typeof value === 'string' || SUPPORTED_FORMATS.includes(value.type))
    ),
  href: Yup.string().min(2, 'Мінімум 2 символи').max(360, 'Забагато симвлів').required('Добавте посилання'),
  priority: Yup.number()
    .min(1, 'Число повинно бути більше 0')
    .max(360, 'Занодто високий')
    .required('Введіть пріорітет'),
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
      if (typeof values.image !== props.initialImage) formData.append('image', values.image);
      if (typeof values.imageMobile !== values.imageMobile)
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
