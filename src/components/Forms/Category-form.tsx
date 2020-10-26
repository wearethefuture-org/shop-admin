import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, LinearProgress } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { Dispatch } from 'redux';
import DialogActions from '@material-ui/core/DialogActions';
import { makeStyles } from '@material-ui/core/styles';


import { fetchAddCategories } from '../../store/actions';

interface Values {
  name: string;
}

interface CategoryFormProps {
  dispatch: Dispatch,
  handleClose: () => void
}

const CategoryForm:React.FC<CategoryFormProps> = ({dispatch, handleClose}) => {
  const useStyles = makeStyles({
    customBtn: {
      marginTop: '15px'
    },
  });

  const classes = useStyles();

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
           dispatch(fetchAddCategories(values.name))
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