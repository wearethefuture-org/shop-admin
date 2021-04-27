import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FieldProps } from 'formik';
import Input, { InputProps } from '@material-ui/core/Input';
import { root } from '../../../api/config';
import grey from '@material-ui/core/colors/grey';

export interface SimpleFileUploadProps extends FieldProps {
  label: string;
  accept: string;
  disabled?: boolean;
  InputProps?: Omit<InputProps, 'name' | 'type' | 'label'>;
}

const FileUpload = ({
  field,
  form: { setFieldValue },
  InputProps: inputProps,
}: SimpleFileUploadProps) => {
  const image = field.value;

  const [imageSrc, setImageSrc] = useState(image);
  if (typeof image !== 'string') {
    if (image?.size > 100) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(image);
    }
  } else if (!imageSrc.includes(root) && image.length > 2) {
    setImageSrc(`${root}/slide/img/${image}`);
  }

  // @ts-ignore
  const useStyles = makeStyles({
    form_group: {
      cursor: 'pointer',
      margin: '1em',
    },
    label: {
      'border': '2px dashed grey',
      'borderRadius': 5,
      'padding': 5,
      'cursor': 'pointer',
      'textAlign': 'center',
      '&:hover': {
        border: '2px solid #ffff',
      },
    },
    title: {
      color: grey,
    },
    image: {
      zIndex: 1000,
      height: 100,
    },
    inputCss: {
      opacity: 0,
    },
  });

  const classes = useStyles();

  return (
    <div>
      <div className={classes.form_group}>
        <label htmlFor="file" className={classes.label}>
          <span className={classes.title}>Add file</span>
          <Input
            inputProps={{
              id: 'file',
              type: 'file',
              name: field.name,
              onChange: (event: React.ChangeEvent<any>) => {
                const file = event.currentTarget.files[0];
                setFieldValue(field.name, file);
              },
            }}
            {...inputProps}
            className={classes.inputCss}
          />
          <img className={classes.image} src={imageSrc} alt={imageSrc} />
        </label>
      </div>
    </div>
  );
};

export default FileUpload;
