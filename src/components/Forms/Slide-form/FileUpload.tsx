import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import grey from '@material-ui/core/colors/grey';
import { ErrorMessage } from 'formik';

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
  const [error, setError] = useState('');

  function imgRequired() {
    return (
      !imageSrc
          && <div className={classes.errorMy}>
              <ErrorMessage name='image' />
            </div>
          && <div className={classes.errorMy}>
              <ErrorMessage name='imageMobile' />
            </div>
    )
  }

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
    const imageSize = event.target.files[0]?.size;
  // const imageType = event.target.files[0]?.type;
  const file = event.currentTarget.files[0];
    if (imageSize && imageSize > 30000 && fieldId === 'file') {
      setError('Required')
      return
    }
    if (imageSize && imageSize > 1000 && fieldId === 'fileMobile') {
      setError('Required')
      return
    }
    // if (imageType && imageType !== ['image/jpg', 'image/jpeg', 'image/gif', 'image/png']) {
    //   setError('required')
    //   return
    // }
    
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
    errorMy: {
      color: 'red'
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
          {(!error && <span className={classes.title}>{caption}</span>) || (
            error && <span className={classes.errorMy}>{caption}</span>
          )}
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
        {imgRequired()}
      </div>
    </div>
  );
};

export default FileUpload;
