import React from 'react'
import { Button, DialogActions, LinearProgress } from '@material-ui/core';
import { Field, Form, FormikProps } from 'formik';
import { TextField, SimpleFileUpload } from 'formik-material-ui';
import { makeStyles } from '@material-ui/core/styles';

import { IFormValues, InnerSliderFormProps } from '../../../interfaces/slider-form';


const InnerForm: React.FC<InnerSliderFormProps & FormikProps<IFormValues>> = (
    { submitForm, isSubmitting, handleClose }) => {
    const useStyles = makeStyles({
        customBtn: {
            marginTop: "15px",
        },
    });

    const classes = useStyles();

    return (
        <Form>
            <Field
                fullWidth
                component={TextField}
                type="name"
                label="Name"
                name="name"
            />
            <Field
                fullWidth
                multiline
                component={TextField}
                type="text"
                label="Text"
                name="text"
            />
            <Field
                fullWidth
                multiline
                component={SimpleFileUpload}
                type="file"
                label="Image"
                name="image"
            />
            <Field
                fullWidth
                multiline
                component={TextField}
                type="href"
                label="Href"
                name="href"
            />
            <Field
                fullWidth
                multiline
                component={TextField}
                type="isShown"
                label="IsShown"
                name="isShown"
            />
            <Field
                fullWidth
                multiline
                component={TextField}
                type="priority"
                label="Priority"
                name="priority"
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
    );
}

export default InnerForm;
