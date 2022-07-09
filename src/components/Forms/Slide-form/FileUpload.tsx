import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import grey from '@material-ui/core/colors/grey';
import { root } from '../../../api/config';
import { SimpleFileUploadProps } from '../../../interfaces/SimpleFileUploadProps';

const FileUpload = ({
  field,
  form: { setFieldValue },
  InputProps: inputProps,
  caption,
  fieldId,
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
    setImageSrc(`${root}/static/uploads/${image}`);
  }

  const onUpload = async (event: React.ChangeEvent<any>) => {
    if (!event.target.files) return;
    const file = event.currentTarget.files[0];
    setFieldValue(field.name, file);
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
        <label htmlFor={fieldId} className={classes.label}>
          <span className={classes.title}>{caption}</span>
          <Input
            inputProps={{
              id: fieldId,
              type: 'file',
              name: field.name,
            }}
            onChange={onUpload}
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
