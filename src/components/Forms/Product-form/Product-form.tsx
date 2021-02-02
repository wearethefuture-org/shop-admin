import { withFormik } from 'formik';
import * as Yup from 'yup';
import InnerForm from './Inner-form';
import { IProductFormData, ProductFormProps } from '../../../interfaces/IProducts';


const productValidationShema = Yup.object().shape({
  name: Yup.string().min(2, 'Too short').max(50, 'Too long').required('Required'),
  price: Yup.number().positive().required('Required'),
  description: Yup.string().min(60, 'Too shot').max(360, 'Too long').required('Required'),
  categoryName: Yup.string().required('Required')
})

const filesArr: never[] = [];
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
      file: props.file || filesArr,
    };
  },
  validationSchema: productValidationShema,
  handleSubmit: (values: IProductFormData, { setSubmitting, props }) => {
    const { name, price, description, categoryName, file } = values
    setSubmitting(false);
    console.log(file)
    props.id
    ? props.dispatch(props.fetchFun({ name, price, description, categoryName }, props.id, file))
      : props.dispatch(props.fetchFun({ name, price, description, categoryName }))
    
    props.handleClose();
  }
})(InnerForm);

export default ProductForm;