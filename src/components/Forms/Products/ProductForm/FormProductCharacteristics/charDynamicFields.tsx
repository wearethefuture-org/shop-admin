import React from 'react';
import { Field } from 'formik';
import { Checkbox, FormControlLabel, IconButton, Radio, RadioGroup } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';

import TextFieldWrapped from '../../../../../hocs/TextFieldHOC';
import styles from './FormProductCharacteristics.module.scss';

export const charDynamicFields = (char, formik, product) => {
  if (!char) return;
  const { name, type, defaultValues } = char;

  if (type === 'enum') {
    formik.initialValues.subForm[name] = [];
  } else if (type === 'string' || type === 'number') {
    formik.initialValues.subForm[name] =
      defaultValues && defaultValues.values ? defaultValues?.values[0] : '';
  } else if (type === 'json') {
    formik.initialValues.subForm[name] = { 'value-1': '' };
  } else {
    formik.initialValues.subForm[name] = '';
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
        if (type === 'string') {
          formik.initialValues.subForm[name] =
            stringValue || (defaultValues && defaultValues.values ? defaultValues?.values[0] : '');
        } else if (type === 'enum') {
          formik.initialValues.subForm[name] = enumValue || [];
        } else if (type === 'boolean') {
          formik.initialValues.subForm[name] = String(booleanValue) || '';
        } else if (type === 'date') {
          formik.initialValues.subForm[name] = dateValue || '';
        } else if (type === 'json') {
          formik.initialValues.subForm[name] = Object.keys(jsonValue).length
            ? jsonValue
            : { 'value-1': '' };
        } else {
          formik.initialValues.subForm[name] =
            numberValue ||
            (defaultValues && defaultValues.values ? Number(defaultValues?.values[0]) : '');
        }
      }
    );

  const subFormObj = {
    errors: formik.errors?.subForm,
    values: formik.values?.subForm,
    initialValues: formik.initialValues?.subForm,
    touched: formik.touched?.subForm,
  };

  switch (char.type) {
    case 'number':
      return (
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
                      subForm: { ...formik.values.subForm, [name]: Number(e.target.value) },
                    }),
                }}
                form={{ ...form, ...subFormObj }}
                meta={meta}
              />
            )}
          </Field>
        </div>
      );

    case 'range':
      return (
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
                      subForm: { ...formik.values.subForm, [name]: Number(e.target.value) },
                    }),
                }}
                form={{ ...form, ...subFormObj }}
                meta={meta}
              />
            )}
          </Field>
        </div>
      );

    case 'enum':
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
                  subForm: { ...formik.values.subForm, [name]: [] },
                })
              }
            >
              <ClearIcon />
            </IconButton>
            <div role="group" aria-labelledby="checkbox-group">
              {char.defaultValues &&
                char.defaultValues.values &&
                char.defaultValues.values.length &&
                char.defaultValues.values.map((value) => (
                  <div key={value}>
                    <Field
                      component={Checkbox}
                      type="checkbox"
                      name={name}
                      value={value}
                      checked={!!formik.values.subForm[name].includes(value)}
                      onChange={(e: { target: { value } }) => {
                        formik.values.subForm[name].includes(value)
                          ? formik.setValues({
                              ...formik.values,
                              subForm: {
                                ...formik.values.subForm,
                                [name]: formik.values.subForm[name].filter((val) => val !== value),
                              },
                            })
                          : formik.setValues({
                              ...formik.values,
                              subForm: {
                                ...formik.values.subForm,
                                [name]: formik.values.subForm[name].concat(value),
                              },
                            });
                      }}
                    />
                    {value}
                  </div>
                ))}
            </div>
          </div>

          {formik.errors.subForm && formik.errors.subForm[name] ? (
            <p className={styles.error}>{formik.errors.subForm[name]}</p>
          ) : null}
        </>
      );

    case 'boolean':
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

    case 'date':
      return (
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
        </div>
      );

    case 'json':
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
        </div>
      );
  }
};
