import React from 'react';
import { TextField, TextFieldProps } from 'formik-material-ui';
import { makeStyles } from '@material-ui/core/styles';

interface TextFieldHOCProps {
  makegreen?: 'true';
}

const useStyles = makeStyles({
  field: {
    color: 'green',
  },
  label: {
    '& label.Mui-focused': {
      color: 'green',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'green',
    },
  },
});

const TextFieldWrapped: React.FC<TextFieldProps & TextFieldHOCProps> = (props) => {
  const {
    field: { name },
    form: { status, errors, dirty, setStatus, setTouched, handleBlur },
    makegreen,
  } = props;

  const classes = useStyles();
  const condition = status && status.everTouched[name] && !errors[name] && dirty;

  const ownHandleFocus = () => {
    setStatus({
      ...(status || {}),
      [name]: true,
      everTouched: { ...(status?.everTouched || {}), [name]: true },
    });
  };

  const ownHandleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    handleBlur(e);
    setStatus({ ...status, [name]: false });

    if (e.target.value === '') {
      setTouched({ [name]: false });
    }
  };

  return (
    <TextField
      InputProps={makegreen && condition ? { className: classes.field } : {}}
      classes={{ root: makegreen && condition ? classes.label : '' }}
      onFocus={ownHandleFocus}
      onBlur={ownHandleBlur}
      spellCheck="false"
      {...props}
    />
  );
};

export default TextFieldWrapped;
