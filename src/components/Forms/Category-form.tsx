import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, LinearProgress } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { Dispatch } from 'redux';
import DialogActions from '@material-ui/core/DialogActions';
import { makeStyles } from '@material-ui/core/styles';


import { addCategory } from '../../store/actions';
import { ICategoryItem } from '../../interfaces/category-Item';

interface Values {
  name: string;
}

interface CategoryFormProps {
  dispatch: Dispatch,
  categoriesLength: number,
  handleClose: () => void
}

const CategoryForm:React.FC<CategoryFormProps> = ({dispatch, categoriesLength, handleClose}) => {
  const useStyles = makeStyles({
    customBtn: {
      marginTop: '15px'
    },
  });

  const classes = useStyles();

  const newCategory: ICategoryItem = {
    id: categoriesLength + 1,
    createdAt: '2020-10-14T16:10:05.018Z',
    updatedAt: '2020-10-14T16:10:05.018Z',
    name: '',
    products: [],
  };
   return (
     <Formik
       initialValues={{
         name: "",
       }}
       validate={(values) => {
         const errors: Partial<Values> = {};
         if (!values.name) {
           errors.name = "Required";
         } else if (values.name.trim().length < 3) {
           errors.name = "Category name must contain at least 3 characters";
         }
         return errors;
       }}
       onSubmit={(values, { setSubmitting }) => {
         setTimeout(() => {
           setSubmitting(false);
           newCategory.name = values.name;
           dispatch(addCategory(newCategory));
           handleClose();
         }, 500);
       }}
     >
       {({ submitForm, isSubmitting }) => (
         <Form>
           <Field
             fullWidth
             component={TextField}
             type="name"
             label="Name"
             name="name"
           />
           {isSubmitting && <LinearProgress />}
           <DialogActions>
             <Button
               onClick={handleClose}
               color="primary"
               variant="contained"
               className={classes.customBtn}
             >
               Cancel
             </Button>
             <Button
               className={classes.customBtn}
               variant="contained"
               color="primary"
               disabled={isSubmitting}
               onClick={submitForm}
             >
               Create
             </Button>
           </DialogActions>
         </Form>
       )}
     </Formik>
   );
 };

export default CategoryForm;