import { withFormik } from 'formik';
import * as Yup from 'yup';
import InnerForm from './Inner-form';
import { IProductFormData, ProductFormProps } from '../../../interfaces/IProducts';

const productValidationShema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Мінімальна довжина 2 символа')
    .max(50, 'Максимальна довжина 50 символів')
    .required('Обов`язкове поле'),
  price: Yup.number().positive('Число повинно бути більше нуля').required('Обов`язкове поле'),
  description: Yup.string()
    .min(10, 'Мінімальна довжина 10 символів')
    .max(360, 'Максимальна довжина 360 символів')
    .required('Обов`язкове поле'),
  categoryName: Yup.string().required('Обов`язкове поле'),
  key: Yup.string()
    .min(2, 'Мінімальна довжина 2 символа')
    .max(30, 'Максимальна довжина 30 символів')
    .matches(
      /(^[a-z0-9-]+$)/,
      'Може містити латинські літери в нижньому регістрі (a-z), цифри (0-9), знак тире (-)'
    )
    .required('Обов`язкове поле'),
});

const ProductForm = withFormik<ProductFormProps, IProductFormData>({
  mapPropsToValues: (props) => {
    return {
      id: props.id,
      name: props.name || '',
      price: props.price,
      description: props.description || '',
      categoryName: props.categoryName || '',
      files: props.files || FormData || undefined,
      key: props.url_key || '',
      mainImg: props.mainImg || null,
    };
  },

  validationSchema: productValidationShema,
  handleSubmit: (values: IProductFormData, { setSubmitting, props }) => {
    const { dispatch, fetchFun, toggleModal } = props;

    setSubmitting(false);
    dispatch(fetchFun(values));

    toggleModal();
  },
})(InnerForm);

export default ProductForm;
