import React from 'react';
import { TextField, TextFieldProps } from 'formik-material-ui';
import { makeStyles } from '@material-ui/core/styles';
import { COLORS } from '../values/colors';

interface TextFieldHOCProps {
  makegreen?: 'true';
}

const useStyles = makeStyles({
  field: {
    color: COLORS.salem,
  },
  label: {
    '& label.Mui-focused': {
      color: COLORS.salem,
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: COLORS.salem,
    },
  },
  labelSecondary: {
    '& label.Mui-focused': {
      color: COLORS.frenchPlum,
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: COLORS.frenchPlum,
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
  const condition =
    status && errors && status.everTouched && status.everTouched[name] && !errors[name] && dirty;

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
      classes={{ root: makegreen && condition ? classes.label : classes.labelSecondary }}
      onFocus={ownHandleFocus}
      onBlur={ownHandleBlur}
      spellCheck="false"
      {...props}
    />
  );
};

export default TextFieldWrapped;
