import React, {useState} from 'react'
import {Button, DialogActions, LinearProgress} from '@material-ui/core';
import {Field, Form, FormikProps} from 'formik';
import {TextField, SimpleFileUpload, Switch} from 'formik-material-ui';
import {makeStyles} from '@material-ui/core/styles';

import {IFormValues, InnerSliderFormProps} from '../../../interfaces/slider-form';
import FileUpload from "./FileUpload";
import axios from "axios";
import {root} from "../../../api/config";

const InnerForm: React.FC<InnerSliderFormProps & FormikProps<IFormValues>> = (
    {submitForm, /*saveImage,*/ isSubmitting, handleClose, ...props}) => {

    const useStyles = makeStyles({
            customBtn: {
                marginTop: "15px",
            },
            image: {
                opacity: "0.5",
                zIndex: 1000,
            },
        }
    );
    const classes = useStyles();

    const dragOverHandler = (event: React.DragEvent<HTMLFormElement>) =>  {
        console.log('File(s) in drop zone');

        // Prevent default behavior (Prevent file from being opened)
        event.preventDefault();
    }

    const dropHandler =(event: React.DragEvent<HTMLFormElement>) =>{
        console.log('File(s) dropped');

        // Prevent default behavior (Prevent file from being opened)
        event.preventDefault();

        if (event.dataTransfer.items) {
            // Use DataTransferItemList interface to access the file(s)
            for (var i = 0; i < event.dataTransfer.items.length; i++) {
                // If dropped items aren't files, reject them
                if (event.dataTransfer.items[i].kind === 'file') {
                    var file = event.dataTransfer.items[i].getAsFile();
                    console.log('... file[' + i + '].name = ' + file?.name);
                    props.setFieldValue("image", file)
                    //saveImage( event.dataTransfer.files[i]);
                }
            }
        } else {
            // Use DataTransfer interface to access the file(s)
            for (var i = 0; i < event.dataTransfer.files.length; i++) {
                console.log('... file[' + i + '].name = ' + event.dataTransfer.files[i].name);

            }
        }
    }

    return (
        <Form
            onDrop={dropHandler}
            onDragOver={dragOverHandler}
            onDragEnd={event => {
                event.stopPropagation();
                event.preventDefault();
            }}
        >
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
                component={FileUpload}
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
            {/*<Field*/}
            {/*    fullWidth*/}
            {/*    multiline*/}
            {/*    component={Switch}*/}
            {/*    enableReinitialize*/}
            {/*    type="checkbox"*/}
            {/*    label="IsShown"*/}
            {/*    name="isShown"*/}
            {/*/>*/}
            <Field
                fullWidth
                multiline
                component={TextField}
                type="priority"
                label="Priority"
                name="priority"
            />
            {isSubmitting && <LinearProgress/>}
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
                    Save
                </Button>
            </DialogActions>
        </Form>
    );
}
export default InnerForm;
