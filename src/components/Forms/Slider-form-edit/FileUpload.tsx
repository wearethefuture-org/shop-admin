import React, {useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {FieldProps} from "formik";
import Input, {InputProps} from '@material-ui/core/Input';
import FormControl, {FormControlProps} from '@material-ui/core/FormControl';
import InputLabel, {InputLabelProps} from '@material-ui/core/InputLabel';

export interface SimpleFileUploadProps extends FieldProps {
    label: string;
    accept: string;
    disabled?: boolean;
    InputProps?: Omit<InputProps, 'name' | 'type' | 'label'>;
    InputLabelProps?: InputLabelProps;
    FormControlProps?: FormControlProps;
}

//TODO types
const FileUpload = ({
                        field,
                        form: {isSubmitting, touched, errors, setFieldValue},
                        label,
                        accept,
                        disabled = false,
                        InputProps: inputProps,
                        InputLabelProps: inputLabelProps,
                        FormControlProps: formControlProps,
                    }: SimpleFileUploadProps) => {

    const image = field.value;

    const [imageSrc, setImageSrc] = useState(image);
    if (typeof image !== "string") {
        if(image?.size > 100) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setImageSrc(reader.result);
            }
            reader.readAsDataURL(image);
        }
    }

    const useStyles = makeStyles({
            image: {
                opacity: "0.5",
                zIndex: 1000,
                with: 100,
                height: 100,
            },
            inputCss: {
                color: "transparent",
                border: "none",
            },
        }
    );

    const classes = useStyles();

    return (
        <div>
            <Input
                inputProps={{
                    type: 'file',
                    name: field.name,
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onChange: (event: React.ChangeEvent<any>) => {
                        if (inputProps?.onChange) {
                            inputProps.onChange(event);
                        } else {
                            const file = event.currentTarget.files[0];
                            setFieldValue(field.name, file);
                        }
                    },
                }}
                {...inputProps}
                className={classes.inputCss}
            />
            <img
                className={classes.image}
                src={imageSrc}
            />
        </div>
    )
}

export default FileUpload;