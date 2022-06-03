import React from 'react';
import { Field } from 'formik';
import {
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  Checkbox,
  FormGroup,
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';

import TextFieldWrapped from '../../../../../hocs/TextFieldHOC';
import { Type } from '../../../../../interfaces/IProducts';
import styles from './FormProductCharacteristics.module.scss';

export const charDynamicFields = (char, formik, product) => {
  const changeEnum = (e) => {
    const { value, checked } = e.target;

    const values = [...formik.values.subForm[name]];

    if (checked) {
      values.push(value);
    } else {
      const find = values.findIndex((item) => item === value);
      values.splice(find, 1);
    }

    formik.setValues({
      ...formik.values,
      subForm: {
        ...formik.values.subForm,
        [name]: values,
      },
    });
  };

  if (!char) return;
  const { name, type, defaultValues } = char;

  switch (type) {
    case Type.enum:
      formik.initialValues.subForm[name] = '';
      break;

    case Type.json:
      formik.initialValues.subForm[name] = { 'value-1': '' };
      break;

    case Type.string:
    case Type.number:
      formik.initialValues.subForm[name] =
        defaultValues && defaultValues.values ? defaultValues?.values[0] : '';
      break;

    default:
      formik.initialValues.subForm[name] = '';
      break;
  }

  product &&
    product.characteristicValue.forEach(
      ({
        name,
        type,
        stringValue,
        numberValue,
        enumValue,
        booleanValue,
        dateValue,
        jsonValue,
        defaultValues,
      }) => {
        switch (type) {
          case Type.string:
            formik.initialValues.subForm[name] =
              stringValue ||
              (defaultValues && defaultValues.values ? defaultValues?.values[0] : '');
            break;

          case Type.enum:
            formik.initialValues.subForm[name] = enumValue || [];
            break;

          case Type.boolean:
            formik.initialValues.subForm[name] = String(booleanValue) || '';
            break;

          case Type.date:
            formik.initialValues.subForm[name] = dateValue || '';
            break;

          case Type.json:
            formik.initialValues.subForm[name] = jsonValue ? jsonValue : { 'value-1': '' };
            break;

          default:
            formik.initialValues.subForm[name] =
              numberValue ||
              (defaultValues && defaultValues.values ? Number(defaultValues?.values[0]) : '') ||
              '';
            break;
        }
      }
    );

  const subFormObj = {
    errors: formik.errors?.subForm,
    values: formik.values?.subForm,
    initialValues: formik.initialValues?.subForm,
    touched: formik.touched?.subForm,
  };

  switch (type) {
    case Type.number:
      return (
        <div className={styles['field-wrapper']}>
          <Field>
            {({ field, form, meta }) => (
              <TextFieldWrapped
                type="number"
                field={{
                  ...field,
                  name,
                  value: formik.values.subForm[name],
                  onChange: (e) =>
                    formik.setValues({
                      ...formik.values,
                      subForm: { ...formik.values.subForm, [name]: e.target.value },
                    }),
                }}
                form={{ ...form, ...subFormObj }}
                meta={meta}
              />
            )}
          </Field>
          <IconButton
            type="button"
            aria-label="delete"
            color="secondary"
            title="Видалити значення"
            disabled={!formik.values?.subForm[name]}
            onClick={() =>
              formik.setValues({
                ...formik.values,
                subForm: { ...formik.values?.subForm, [name]: '' },
              })
            }
          >
            <ClearIcon />
          </IconButton>
        </div>
      );

    case Type.range:
      return (
        <div className={styles['field-wrapper']}>
          <Field>
            {({ field, form, meta }) => (
              <TextFieldWrapped
                type="number"
                field={{
                  ...field,
                  name,
                  value: formik.values.subForm[name],
                  onChange: (e) =>
                    formik.setValues({
                      ...formik.values,
                      subForm: { ...formik.values.subForm, [name]: e.target.value },
                    }),
                }}
                form={{ ...form, ...subFormObj }}
                meta={meta}
              />
            )}
          </Field>
          <IconButton
            type="button"
            aria-label="delete"
            color="secondary"
            title="Видалити значення"
            disabled={!formik.values?.subForm[name]}
            onClick={() =>
              formik.setValues({
                ...formik.values,
                subForm: { ...formik.values?.subForm, [name]: '' },
              })
            }
          >
            <ClearIcon />
          </IconButton>
        </div>
      );

    case Type.enum:
      return (
        <>
          <div className={styles['field-wrapper']}>
            <IconButton
              type="button"
              aria-label="delete"
              color="secondary"
              title="Видалити значення"
              disabled={!formik.values?.subForm[name].length}
              onClick={() =>
                formik.setValues({
                  ...formik.values,
                  subForm: { ...formik.values.subForm, [name]: '' },
                })
              }
            >
              <ClearIcon />
            </IconButton>
            <FormGroup>
              {char.defaultValues &&
                char.defaultValues.values &&
                char.defaultValues.values.length &&
                char.defaultValues.values.map((value) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        value={value}
                        checked={
                          !formik.values?.subForm[name]
                            ? false
                            : formik.values.subForm[name].find((item) => item === value)
                        }
                        onChange={changeEnum}
                      />
                    }
                    label={value}
                  />
                ))}
            </FormGroup>
          </div>

          {formik.errors.subForm && formik.errors.subForm[name] ? (
            <p className={styles.error}>{formik.errors.subForm[name]}</p>
          ) : null}
        </>
      );

    case Type.boolean:
      return (
        <>
          <div className={styles['field-wrapper']}>
            <IconButton
              type="button"
              aria-label="delete"
              color="secondary"
              title="Видалити значення"
              disabled={!formik.values?.subForm[name]}
              onClick={() =>
                formik.setValues({
                  ...formik.values,
                  subForm: { ...formik.values?.subForm, [name]: '' },
                })
              }
            >
              <ClearIcon />
            </IconButton>
            <RadioGroup
              name={name}
              value={formik.values.subForm[name]}
              onChange={(e) =>
                formik.setValues({
                  ...formik.values,
                  subForm: {
                    ...formik.values.subForm,
                    [name]: e.target.value,
                  },
                })
              }
            >
              <FormControlLabel value={'true'} control={<Radio />} label="Так" />
              <FormControlLabel value={'false'} control={<Radio />} label="Ні" />
            </RadioGroup>
          </div>

          {formik.errors.subForm && formik.errors.subForm[name] ? (
            <p className={styles.error}>{formik.errors.subForm[name]}</p>
          ) : null}
        </>
      );

    case Type.date:
      return (
        <div className={styles['field-wrapper']}>
          <Field>
            {({ field, form, meta }) => (
              <TextFieldWrapped
                type="date"
                field={{
                  ...field,
                  name,
                  value: formik.values.subForm[name].split('T')[0],
                  onChange: (e) =>
                    formik.setValues({
                      ...formik.values,
                      subForm: {
                        ...formik.values.subForm,
                        [name]: new Date(e.target.value).toISOString(),
                      },
                    }),
                }}
                form={{ ...form, ...subFormObj }}
                meta={meta}
              />
            )}
          </Field>
          <IconButton
            type="button"
            aria-label="delete"
            color="secondary"
            title="Видалити значення"
            disabled={!formik.values?.subForm[name]}
            onClick={() =>
              formik.setValues({
                ...formik.values,
                subForm: { ...formik.values?.subForm, [name]: '' },
              })
            }
          >
            <ClearIcon />
          </IconButton>
        </div>
      );

    case Type.json:
      return (
        <>
          {formik.values.subForm[name] &&
            Object.entries(formik.values.subForm[name]).map(([key], idx) => {
              return (
                <Field key={idx}>
                  {({ field, form, meta }) => (
                    <TextFieldWrapped
                      label="Значення"
                      fullWidth
                      field={{
                        ...field,
                        name,
                        value: formik.values.subForm[name][key],
                        onChange: (e) => {
                          formik.setValues({
                            ...formik.values,
                            subForm: {
                              ...formik.values.subForm,
                              [name]: { ...formik.values.subForm[name], [key]: e.target.value },
                            },
                          });
                        },
                      }}
                      form={{ ...form, ...subFormObj }}
                      meta={meta}
                    />
                  )}
                </Field>
              );
            })}
          {formik.errors.subForm && formik.errors.subForm[name] ? (
            <p className={styles.error}>{formik.errors.subForm[name]}</p>
          ) : null}
        </>
      );

    default:
      return (
        <div className={styles['field-wrapper']}>
          <Field>
            {({ field, form, meta }) => (
              <TextFieldWrapped
                fullWidth
                field={{
                  ...field,
                  name,
                  value: formik.values.subForm[name],
                  onChange: (e) => {
                    formik.setValues({
                      ...formik.values,
                      subForm: { ...formik.values.subForm, [name]: e.target.value },
                    });
                  },
                }}
                form={{ ...form, ...subFormObj }}
                meta={meta}
              />
            )}
          </Field>
          <IconButton
            type="button"
            aria-label="delete"
            color="secondary"
            title="Видалити значення"
            disabled={!formik.values?.subForm[name]}
            onClick={() =>
              formik.setValues({
                ...formik.values,
                subForm: { ...formik.values?.subForm, [name]: '' },
              })
            }
          >
            <ClearIcon />
          </IconButton>
        </div>
      );
  }
};
