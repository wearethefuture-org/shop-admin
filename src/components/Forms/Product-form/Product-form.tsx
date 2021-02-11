import { withFormik } from 'formik';
import * as Yup from 'yup';
import InnerForm from './Inner-form';
import { IProductFormData, ProductFormProps } from '../../../interfaces/IProducts';


const productValidationShema = Yup.object().shape({
  name: Yup.string().min(2, 'Too short').max(50, 'Too long').required('Required'),
  price: Yup.number().positive().required('Required'),
  description: Yup.string().min(40, 'Too shot').max(360, 'Too long').required('Required'),
  categoryName: Yup.string().required('Required'),
  key: Yup.string()
    .min(2, 'Minimum 2 symbols')
    .max(30, 'Too long')
    .matches(/(^[a-zA-Z-]+$)/, 'Please enter a valid string')
    .required('Required'),
})


const ProductForm = withFormik<ProductFormProps, IProductFormData>({
  mapPropsToValues: props => {
    return {
      id: props.id,
      name: props.name || "",
      price: props.price || 0,
      description: props.description || "",
      categoryName: props.categoryName || props.currencies[0].value,
      buttonName: props.buttonName || "",
      currencies: props.currencies,
      files: props.files || [],
      key: props.url_key || '',
      mainImg: props.mainImg || null,
      images: props.images,
      url_key: props.url_key || '',
    };
  },

  validationSchema: productValidationShema,
  handleSubmit: (values: IProductFormData, { setSubmitting, props }) => {
    const { name, price, description, categoryName, key } = values
    setSubmitting(false);
    props.id
      ? props.dispatch(props.fetchFun({ name, price, description, categoryName, key }, props.id))
      : props.dispatch(props.fetchFun({ name, price, description, categoryName, key }))

    props.handleClose();
  }
})(InnerForm);

export default ProductForm;